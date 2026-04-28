import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  runTransaction,
} from 'firebase/firestore';
import { db } from '../utils/firebase';
import type { DiscountCode } from './discounts';
import { buildDiscountUsageLedgerId } from './operationKeys';

export type { DiscountCode };

const COLLECTION_NAME = 'discounts';
const USAGE_LEDGER_COLLECTION = 'discount_usage_ledger';

export async function getFirestoreDiscounts(): Promise<DiscountCode[]> {
  const snapshot = await getDocs(collection(db, COLLECTION_NAME));
  if (snapshot.empty) {
    return [];
  }
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as DiscountCode));
}

export async function getFirestoreDiscountByCode(code: string): Promise<DiscountCode | null> {
  const q = query(collection(db, COLLECTION_NAME), where('code', '==', code.toUpperCase()));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  const docSnap = snapshot.docs[0];
  return { id: docSnap.id, ...docSnap.data() } as unknown as DiscountCode;
}

export async function getFirestoreDiscountById(id: string): Promise<DiscountCode | null> {
  const snapshot = await getDoc(doc(db, COLLECTION_NAME, id));
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() } as unknown as DiscountCode;
}

export async function addFirestoreDiscount(discount: Omit<DiscountCode, 'id'>): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), discount);
  return docRef.id;
}

export async function updateFirestoreDiscount(id: string, updates: Partial<DiscountCode>): Promise<void> {
  await updateDoc(doc(db, COLLECTION_NAME, id), {
    ...updates,
    updatedAt: new Date().toISOString(),
  });
}

export async function deleteFirestoreDiscount(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION_NAME, id));
}

export async function validateFirestoreDiscount(
  code: string,
  originalAmount: number
): Promise<{
  valid: boolean;
  discount?: DiscountCode;
  discountAmount?: number;
  finalAmount?: number;
  error?: string;
}> {
  if (!code.trim()) {
    return { valid: false, error: "Vui lòng nhập mã giảm giá" };
  }

  const discount = await getFirestoreDiscountByCode(code);

  if (!discount) {
    return { valid: false, error: "Mã giảm giá không tồn tại" };
  }

  if (discount.usageCount >= discount.usageLimit) {
    return { valid: false, error: "Mã giảm giá đã hết lượt sử dụng" };
  }

  const now = new Date();
  const validFrom = new Date(discount.validFrom);
  const validUntil = new Date(discount.validUntil);

  if (now < validFrom) {
    return {
      valid: false,
      error: `Mã chưa có hiệu lực (từ ${validFrom.toLocaleDateString("vi-VN")})`,
    };
  }

  if (now > validUntil) {
    return {
      valid: false,
      error: `Mã đã hết hạn (đến ${validUntil.toLocaleDateString("vi-VN")})`,
    };
  }

  const calculatedDiscount = (originalAmount * discount.discountPercent) / 100;
  const discountAmount = Math.min(calculatedDiscount, discount.maxDiscount);
  const finalAmount = Math.max(0, originalAmount - discountAmount);

  return {
    valid: true,
    discount,
    discountAmount,
    finalAmount,
  };
}

export async function consumeFirestoreDiscountOnSubmit(
  code: string,
  operationId: string
): Promise<{ success: boolean; discountId?: string; alreadyConsumed?: boolean; error?: string }> {
  const normalizedCode = code.trim().toUpperCase();
  if (!normalizedCode) {
    return { success: false, error: 'Mã giảm giá không hợp lệ' };
  }

  const discount = await getFirestoreDiscountByCode(normalizedCode);
  if (!discount?.id) {
    return { success: false, error: 'Mã giảm giá không tồn tại' };
  }

  const ledgerId = buildDiscountUsageLedgerId(discount.id, operationId);

  try {
    return await runTransaction(db, async (transaction) => {
      const discountRef = doc(db, COLLECTION_NAME, discount.id);
      const ledgerRef = doc(db, USAGE_LEDGER_COLLECTION, ledgerId);
      const [discountSnap, ledgerSnap] = await Promise.all([
        transaction.get(discountRef),
        transaction.get(ledgerRef),
      ]);

      if (ledgerSnap.exists()) {
        return {
          success: true,
          discountId: discount.id,
          alreadyConsumed: true,
        };
      }

      if (!discountSnap.exists()) {
        return { success: false, error: 'Mã giảm giá không tồn tại' };
      }

      const discountData = discountSnap.data() as DiscountCode;
      const usageCount = discountData.usageCount ?? 0;
      const usageLimit = discountData.usageLimit ?? 0;
      const now = new Date();
      const validFrom = new Date(discountData.validFrom);
      const validUntil = new Date(discountData.validUntil);

      if (usageCount >= usageLimit) {
        return { success: false, error: 'Mã giảm giá đã hết lượt sử dụng' };
      }

      if (now < validFrom) {
        return {
          success: false,
          error: `Mã chưa có hiệu lực (từ ${validFrom.toLocaleDateString("vi-VN")})`,
        };
      }

      if (now > validUntil) {
        return {
          success: false,
          error: `Mã đã hết hạn (đến ${validUntil.toLocaleDateString("vi-VN")})`,
        };
      }

      transaction.update(discountRef, {
        usageCount: usageCount + 1,
        updatedAt: new Date().toISOString(),
      });

      transaction.set(ledgerRef, {
        discountId: discount.id,
        code: normalizedCode,
        operationId,
        createdAt: new Date().toISOString(),
      });

      return {
        success: true,
        discountId: discount.id,
        alreadyConsumed: false,
      };
    });
  } catch {
    return { success: false, error: 'Không thể ghi nhận lượt sử dụng mã giảm giá' };
  }
}
