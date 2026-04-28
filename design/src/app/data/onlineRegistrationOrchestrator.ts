import { collection, doc, runTransaction } from 'firebase/firestore';
import { db } from '../utils/firebase';
import { getFirestoreDiscountByCode, type DiscountCode } from './firestoreDiscounts';
import {
  buildCustomerDocumentId,
  buildDiscountUsageLedgerId,
  buildInvoiceDocumentId,
  buildOperationId,
  buildTransactionDocumentId,
} from './operationKeys';

export interface OnlineRegistrationOrchestratorInput {
  operationId?: string;
  customerName: string;
  customerEmail: string;
  phone: string;
  machineCondition: string;
  warranty: 'con' | 'het';
  needs: string;
  password: string;
  charger: 'co' | 'khong';
  appointmentTime: string;
  dropOffTime: string;
  category: string;
  additionalServices: string[];
  services: { name: string; price: number }[];
  serviceAmount: number;
  discountCode: string;
  discountAmount: number;
  finalAmount: number;
  pointsEarned: number;
}

export interface OnlineRegistrationOrchestratorResult {
  machineId: string;
  transactionId: string;
  invoiceId: string;
  customerId: string;
  operationId: string;
  discountConsumed: boolean;
}

function buildInvoiceNumber(machineId: string): string {
  const date = new Date();
  const yy = date.getFullYear().toString().slice(-2);
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `INV-${yy}${mm}${dd}-ONL-${machineId.slice(-6).toUpperCase()}`;
}

function buildCurrentTime() {
  const now = new Date();
  const currentTime =
    now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) +
    ' ' +
    now.toLocaleDateString('vi-VN').replace(/\//g, '/');
  const currentDate = now.toISOString().split('T')[0];
  const expiry = new Date(now.getTime() + 3 * 60 * 60 * 1000);
  const expiryTime = expiry.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });

  return { currentTime, currentDate, expiryTime };
}

async function resolveDiscount(code: string): Promise<DiscountCode | null> {
  if (!code.trim()) {
    return null;
  }

  return getFirestoreDiscountByCode(code);
}

export async function submitOnlineRegistrationTransaction(
  input: OnlineRegistrationOrchestratorInput,
): Promise<OnlineRegistrationOrchestratorResult> {
  const operationId = input.operationId || buildOperationId('checkout');
  const discount = await resolveDiscount(input.discountCode);
  const { currentTime, currentDate, expiryTime } = buildCurrentTime();

  return runTransaction(db, async (transaction) => {
    const operationRef = doc(db, 'operations', operationId);
    const operationSnapshot = await transaction.get(operationRef);
    if (operationSnapshot.exists()) {
      return operationSnapshot.data() as OnlineRegistrationOrchestratorResult;
    }

    const machineRef = doc(collection(db, 'machines'));
    const transactionRef = doc(db, 'transactions', buildTransactionDocumentId(machineRef.id));
    const invoiceRef = doc(db, 'invoices', buildInvoiceDocumentId(machineRef.id));
    const customerRef = doc(db, 'customers', buildCustomerDocumentId({
      phone: input.phone,
      email: input.customerEmail,
    }));

    const customerSnapshot = await transaction.get(customerRef);
    transaction.set(
      customerRef,
      customerSnapshot.exists()
        ? {
            name: input.customerName,
            email: input.customerEmail,
            updatedAt: new Date().toISOString(),
          }
        : {
            name: input.customerName,
            phone: input.phone,
            email: input.customerEmail,
            createdAt: currentDate,
            totalRepairs: 0,
            points: 0,
            updatedAt: new Date().toISOString(),
          },
      { merge: true },
    );

    let discountConsumed = false;
    if (discount?.id && input.discountCode.trim()) {
      const discountRef = doc(db, 'discounts', discount.id);
      const ledgerRef = doc(db, 'discount_usage_ledger', buildDiscountUsageLedgerId(discount.id, operationId));
      const [discountSnapshot, ledgerSnapshot] = await Promise.all([
        transaction.get(discountRef),
        transaction.get(ledgerRef),
      ]);

      if (!ledgerSnapshot.exists()) {
        if (!discountSnapshot.exists()) {
          throw new Error('Mã giảm giá không tồn tại');
        }

        const discountData = discountSnapshot.data() as DiscountCode;
        const usageCount = discountData.usageCount ?? 0;
        const usageLimit = discountData.usageLimit ?? 0;
        const now = new Date();
        const validFrom = new Date(discountData.validFrom);
        const validUntil = new Date(discountData.validUntil);

        if (usageCount >= usageLimit) {
          throw new Error('Mã giảm giá đã hết lượt sử dụng');
        }

        if (now < validFrom) {
          throw new Error(`Mã chưa có hiệu lực (từ ${validFrom.toLocaleDateString('vi-VN')})`);
        }

        if (now > validUntil) {
          throw new Error(`Mã đã hết hạn (đến ${validUntil.toLocaleDateString('vi-VN')})`);
        }

        transaction.update(discountRef, {
          usageCount: usageCount + 1,
          updatedAt: new Date().toISOString(),
        });

        transaction.set(ledgerRef, {
          discountId: discount.id,
          operationId,
          code: input.discountCode.trim().toUpperCase(),
          createdAt: new Date().toISOString(),
        });
      }

      discountConsumed = true;
    }

    const serviceNames = input.additionalServices.length > 0
      ? input.additionalServices.join(', ')
      : (input.needs || 'Dịch vụ khác');

    transaction.set(machineRef, {
      status: 'WAITING',
      customerName: input.customerName,
      customerEmail: input.customerEmail,
      phone: input.phone,
      time: currentTime,
      description: serviceNames,
      expired: input.appointmentTime || expiryTime,
      category: input.category,
      tester: '',
      technician: '',
      warranty: input.warranty,
      password: input.password || '',
      charger: input.charger === 'co',
      appointmentTime: input.appointmentTime || '',
      dropOffTime: input.dropOffTime || '',
      testerBefore: '',
      testerAfter: '',
      registrationType: 'online',
      isApproved: false,
      machineCondition: input.machineCondition || '',
      needs: input.needs || '',
      additionalServices: input.additionalServices,
      serviceAmount: input.serviceAmount,
      discountCode: input.discountCode || '',
      discountAmount: input.discountAmount,
      paymentStatus: input.finalAmount === 0 ? 'free' : 'pending',
      finalAmount: input.finalAmount,
      pointsEarned: input.pointsEarned,
      operationId,
      source: 'online',
      createdAt: new Date().toISOString(),
    });

    transaction.set(transactionRef, {
      machineId: machineRef.id,
      customerName: input.customerName,
      phone: input.phone,
      service: serviceNames,
      amount: input.finalAmount,
      paymentStatus: input.finalAmount === 0 ? 'free' : 'pending',
      date: currentDate,
      discountCode: input.discountCode || '',
      discountAmount: input.discountAmount > 0 ? input.discountAmount : 0,
      operationId,
      source: 'online',
      createdAt: new Date().toISOString(),
    });

    transaction.set(invoiceRef, {
      invoiceNumber: buildInvoiceNumber(machineRef.id),
      machineId: machineRef.id,
      customerName: input.customerName,
      customerEmail: input.customerEmail,
      phone: input.phone,
      registrationType: 'online',
      services: input.services,
      machineCondition: input.machineCondition || '',
      needs: input.needs || '',
      category: input.category,
      warranty: input.warranty,
      charger: input.charger === 'co',
      password: input.password || '',
      createdAt: currentDate,
      createdTime: currentTime,
      dropOffTime: input.dropOffTime || '',
      appointmentTime: input.appointmentTime || '',
      serviceAmount: input.serviceAmount,
      discountCode: input.discountCode || '',
      discountAmount: input.discountAmount,
      finalAmount: input.finalAmount,
      paymentStatus: input.finalAmount === 0 ? 'free' : 'pending',
      pointsEarned: input.pointsEarned,
      createdBy: 'Khách hàng (Online)',
      operationId,
      source: 'online',
    });

    const result: OnlineRegistrationOrchestratorResult = {
      machineId: machineRef.id,
      transactionId: transactionRef.id,
      invoiceId: invoiceRef.id,
      customerId: customerRef.id,
      operationId,
      discountConsumed,
    };

    transaction.set(operationRef, {
      ...result,
      createdAt: new Date().toISOString(),
      source: 'online',
    });

    return result;
  });
}
