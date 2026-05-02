import { collection, doc, getDocs, addDoc, query, where, deleteDoc, runTransaction } from 'firebase/firestore';
import { db } from '../utils/firebase';

const COLLECTION_NAME = 'redeemed_vouchers';
const DISCOUNTS_COLLECTION = 'discounts';
const USAGE_LEDGER_COLLECTION = 'discount_usage_ledger';

export interface RedeemedVoucher {
  id: string;
  customerPhone: string;
  customerEmail?: string;
  customerName: string;
  voucherCode: string;
  voucherName: string;
  pointsSpent: number;
  redeemedAt: string;
  usedAt?: string;
  usedMachineId?: string;
}

export async function getFirestoreRedeemedVouchers(): Promise<RedeemedVoucher[]> {
  const snapshot = await getDocs(collection(db, COLLECTION_NAME));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as RedeemedVoucher));
}

export async function addFirestoreRedeemedVoucher(voucher: Omit<RedeemedVoucher, 'id'>): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), voucher);
  return docRef.id;
}

export async function getFirestoreCustomerRedeemedVouchers(customerPhone: string): Promise<RedeemedVoucher[]> {
  console.log('[DEBUG getFirestoreCustomerRedeemedVouchers] phone:', customerPhone);
  const q = query(collection(db, COLLECTION_NAME), where('customerPhone', '==', customerPhone));
  const snapshot = await getDocs(q);
  console.log('[DEBUG getFirestoreCustomerRedeemedVouchers] found:', snapshot.size, 'vouchers');
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as RedeemedVoucher));
}

export async function getFirestoreCustomerRedeemedVouchersByEmail(customerEmail: string): Promise<RedeemedVoucher[]> {
  const normalized = customerEmail.toLowerCase();
  const q = query(collection(db, COLLECTION_NAME), where('customerEmail', '==', normalized));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as RedeemedVoucher));
}

export async function isFirestoreVoucherRedeemedByCustomerEmail(customerEmail: string, voucherCode: string): Promise<boolean> {
  const normalized = customerEmail.toLowerCase();
  const q = query(
    collection(db, COLLECTION_NAME),
    where('customerEmail', '==', normalized),
    where('voucherCode', '==', voucherCode)
  );
  const snapshot = await getDocs(q);
  return !snapshot.empty;
}

export async function deleteFirestoreRedeemedVoucher(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION_NAME, id));
}

// Get a single redeemed voucher by customer phone and voucher code
export async function getRedeemedVoucherByCodeForCustomer(
  customerPhone: string,
  voucherCode: string
): Promise<RedeemedVoucher | null> {
  const q = query(
    collection(db, COLLECTION_NAME),
    where('customerPhone', '==', customerPhone),
    where('voucherCode', '==', voucherCode.toUpperCase())
  );
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  const docSnap = snapshot.docs[0];
  return { id: docSnap.id, ...docSnap.data() } as unknown as RedeemedVoucher;
}

// Voucher status for UI display
export type VoucherStatus = 'available' | 'used' | 'expired' | 'out_of_uses';

export interface VoucherWithStatus extends RedeemedVoucher {
  status: VoucherStatus;
  statusLabel: string;
  discountPercent?: number;
  maxDiscount?: number;
  validUntil?: string;
}

// Get all vouchers for a customer with their status
export async function getCustomerVouchersWithStatus(customerPhone: string): Promise<VoucherWithStatus[]> {
  console.log('[DEBUG getCustomerVouchersWithStatus] phone:', customerPhone);
  const vouchers = await getFirestoreCustomerRedeemedVouchers(customerPhone);
  console.log('[DEBUG getCustomerVouchersWithStatus] vouchers found:', vouchers.length);
  const results: VoucherWithStatus[] = [];

  for (const voucher of vouchers) {
    const discountQ = query(collection(db, DISCOUNTS_COLLECTION), where('code', '==', voucher.voucherCode));
    const discountSnap = await getDocs(discountQ);

    if (discountSnap.empty) {
      results.push({
        ...voucher,
        status: 'expired',
        statusLabel: 'Mã không tồn tại',
      });
      continue;
    }

    const discountData = discountSnap.docs[0].data();
    const now = new Date();
    // Set validUntil to end of day (23:59:59.999) for accurate expiration check
    const validUntil = new Date(discountData.validUntil || 0);
    validUntil.setHours(23, 59, 59, 999);
    console.log('[DEBUG getCustomerVouchersWithStatus] discount validUntil:', discountData.validUntil, 'now:', now.toISOString(), 'isExpired:', now > validUntil);
    const usageCount = discountData.usageCount || 0;
    const usageLimit = discountData.usageLimit || 0;

    if (voucher.usedAt) {
      results.push({
        ...voucher,
        discountPercent: discountData.discountPercent,
        maxDiscount: discountData.maxDiscount,
        validUntil: discountData.validUntil,
        status: 'used',
        statusLabel: 'Đã sử dụng',
      });
    } else if (usageCount >= usageLimit) {
      results.push({
        ...voucher,
        discountPercent: discountData.discountPercent,
        maxDiscount: discountData.maxDiscount,
        validUntil: discountData.validUntil,
        status: 'out_of_uses',
        statusLabel: 'Đã hết lượt sử dụng',
      });
    } else if (now > validUntil) {
      results.push({
        ...voucher,
        discountPercent: discountData.discountPercent,
        maxDiscount: discountData.maxDiscount,
        validUntil: discountData.validUntil,
        status: 'expired',
        statusLabel: 'Đã hết hạn',
      });
    } else {
      results.push({
        ...voucher,
        discountPercent: discountData.discountPercent,
        maxDiscount: discountData.maxDiscount,
        validUntil: discountData.validUntil,
        status: 'available',
        statusLabel: 'Còn dùng được',
      });
    }
  }

  return results;
}

// Apply redeemed voucher to a machine - validates and updates usageCount
export async function applyRedeemedVoucherToMachine(
  customerPhone: string,
  voucherCode: string,
  machineId: string,
  operationId: string
): Promise<{ success: boolean; error?: string }> {
  const voucher = await getRedeemedVoucherByCodeForCustomer(customerPhone, voucherCode);
  if (!voucher) {
    return { success: false, error: 'Voucher không tồn tại trong tài khoản của bạn' };
  }

  if (voucher.usedAt) {
    return { success: false, error: 'Voucher đã được sử dụng' };
  }

  const discountQ = query(collection(db, DISCOUNTS_COLLECTION), where('code', '==', voucherCode.toUpperCase()));
  const discountSnap = await getDocs(discountQ);

  if (discountSnap.empty) {
    return { success: false, error: 'Mã giảm giá không tồn tại' };
  }

  const discountDoc = discountSnap.docs[0];
  const discountData = discountDoc.data();
  const discountId = discountDoc.id;

  const now = new Date();
  const validFrom = new Date(discountData.validFrom || 0);
  validFrom.setHours(0, 0, 0, 0);
  const validUntil = new Date(discountData.validUntil || 0);
  validUntil.setHours(23, 59, 59, 999);
  const usageCount = discountData.usageCount || 0;
  const usageLimit = discountData.usageLimit || 0;

  if (usageCount >= usageLimit) {
    return { success: false, error: 'Mã đã hết lượt sử dụng' };
  }

  if (now < validFrom) {
    return { success: false, error: `Mã chưa có hiệu lực (từ ${validFrom.toLocaleDateString("vi-VN")})` };
  }

  if (now > validUntil) {
    return { success: false, error: 'Mã đã hết hạn' };
  }

  try {
    await runTransaction(db, async (transaction) => {
      const discountRef = doc(db, DISCOUNTS_COLLECTION, discountId);
      const voucherRef = doc(db, COLLECTION_NAME, voucher.id);

      const freshDiscountSnap = await transaction.get(discountRef);
      const freshVoucherSnap = await transaction.get(voucherRef);

      if (!freshDiscountSnap.exists()) throw new Error('Mã giảm giá không tồn tại');
      if (!freshVoucherSnap.exists()) throw new Error('Voucher không tồn tại');

      const currentUsageCount = freshDiscountSnap.data().usageCount || 0;
      const currentUsageLimit = freshDiscountSnap.data().usageLimit || 0;

      if (currentUsageCount >= currentUsageLimit) {
        throw new Error('Mã đã hết lượt sử dụng');
      }

      transaction.update(discountRef, {
        usageCount: currentUsageCount + 1,
        updatedAt: new Date().toISOString(),
      });

      transaction.update(voucherRef, {
        usedAt: new Date().toISOString(),
        usedMachineId: machineId,
      });

      const ledgerId = `${discountId}_${operationId}`;
      const ledgerRef = doc(db, USAGE_LEDGER_COLLECTION, ledgerId);
      transaction.set(ledgerRef, {
        discountId,
        code: voucherCode.toUpperCase(),
        operationId,
        createdAt: new Date().toISOString(),
      });
    });

    return { success: true };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Không thể áp dụng voucher' };
  }
}

// Refund expired unused voucher - returns floor(pointsSpent * 2/3) points to customer
export async function refundExpiredVoucher(
  voucherId: string,
  customerPhone: string
): Promise<{ success: boolean; refundPoints?: number; error?: string }> {
  const voucherRef = doc(db, COLLECTION_NAME, voucherId);
  const customerRef = doc(db, 'customers', customerPhone);

  try {
    const result = await runTransaction(db, async (transaction) => {
      const voucherSnap = await transaction.get(voucherRef);

      if (!voucherSnap.exists()) {
        return { success: false, error: 'Voucher không tồn tại' };
      }

      const voucherData = voucherSnap.data();

      // Verify voucher belongs to this customer
      if (voucherData.customerPhone !== customerPhone) {
        return { success: false, error: 'Không có quyền hoàn điểm voucher này' };
      }

      // Only refund if voucher was never used
      if (voucherData.usedAt) {
        return { success: false, error: 'Voucher đã được sử dụng, không thể hoàn điểm' };
      }

      // Check if voucher is expired by checking validUntil on the discount
      const discountQ = query(
        collection(db, DISCOUNTS_COLLECTION),
        where('code', '==', voucherData.voucherCode)
      );
      const discountSnap = await getDocs(discountQ);

      if (!discountSnap.empty) {
        const discountData = discountSnap.docs[0].data();
        const validUntil = new Date(discountData.validUntil || 0);
        validUntil.setHours(23, 59, 59, 999);
        const now = new Date();

        if (now <= validUntil) {
          return { success: false, error: 'Voucher chưa hết hạn, không thể hoàn điểm' };
        }
      }

      // Calculate refund: floor(pointsSpent * 2/3)
      const pointsSpent = voucherData.pointsSpent || 0;
      const refundPoints = Math.floor(pointsSpent * (2 / 3));

      if (refundPoints <= 0) {
        return { success: false, error: 'Không có điểm để hoàn' };
      }

      // Update customer points
      const customerSnap = await transaction.get(customerRef);
      if (customerSnap.exists()) {
        const currentPoints = customerSnap.data().points || 0;
        transaction.update(customerRef, {
          points: currentPoints + refundPoints,
        });
      }

      // Delete the voucher entry
      transaction.delete(voucherRef);

      // Add point history entry
      const historyRef = doc(collection(db, 'point_history'));
      transaction.set(historyRef, {
        customerPhone: voucherData.customerPhone,
        customerEmail: voucherData.customerEmail || '',
        customerName: voucherData.customerName,
        type: 'earn',
        points: refundPoints,
        date: new Date().toISOString(),
        description: `Hoàn tiền voucher ${voucherData.voucherCode}`,
        relatedId: voucherId,
      });

      return { success: true, refundPoints };
    });

    return result;
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Không thể hoàn điểm' };
  }
}