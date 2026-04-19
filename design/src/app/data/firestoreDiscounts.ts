import { collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';
import { db } from '../utils/firebase';
import type { DiscountCode } from './discounts';

const COLLECTION_NAME = 'discounts';

// Default discount codes
export const DEFAULT_DISCOUNTS: DiscountCode[] = [
  {
    id: "1",
    code: "SAVE20",
    discountPercent: 20,
    maxDiscount: 200000,
    usageLimit: 50,
    usageCount: 5,
    validFrom: "2024-01-01",
    validUntil: "2024-12-31",
    description: "Giảm 20% tối đa 200k",
  },
  {
    id: "2",
    code: "NEWCUST",
    discountPercent: 15,
    maxDiscount: 150000,
    usageLimit: 100,
    usageCount: 12,
    validFrom: "2024-01-01",
    validUntil: "2024-06-30",
    description: "Ưu đãi khách hàng mới",
  },
];

// Get all discounts from Firestore
export async function getFirestoreDiscounts(): Promise<DiscountCode[]> {
  const snapshot = await getDocs(collection(db, COLLECTION_NAME));
  if (snapshot.empty) {
    return DEFAULT_DISCOUNTS;
  }
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as DiscountCode));
}

// Get discount by code
export async function getFirestoreDiscountByCode(code: string): Promise<DiscountCode | null> {
  const q = query(collection(db, COLLECTION_NAME), where('code', '==', code.toUpperCase()));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  const docSnap = snapshot.docs[0];
  return { id: docSnap.id, ...docSnap.data() } as unknown as DiscountCode;
}

// Get discount by ID
export async function getFirestoreDiscountById(id: string): Promise<DiscountCode | null> {
  const snapshot = await getDoc(doc(db, COLLECTION_NAME, id));
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() } as unknown as DiscountCode;
}

// Add new discount
export async function addFirestoreDiscount(discount: Omit<DiscountCode, 'id'>): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), discount);
  return docRef.id;
}

// Update discount
export async function updateFirestoreDiscount(id: string, updates: Partial<DiscountCode>): Promise<void> {
  await updateDoc(doc(db, COLLECTION_NAME, id), {
    ...updates,
    updatedAt: new Date().toISOString(),
  });
}

// Delete discount
export async function deleteFirestoreDiscount(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION_NAME, id));
}

// Seed default discounts to Firestore (one-time setup)
export async function seedDefaultDiscounts(): Promise<void> {
  for (const discount of DEFAULT_DISCOUNTS) {
    await addFirestoreDiscount(discount);
  }
}

// Validate and apply discount code
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

  // Check usage limit
  if (discount.usageCount >= discount.usageLimit) {
    return { valid: false, error: "Mã giảm giá đã hết lượt sử dụng" };
  }

  // Check date validity
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

  // Calculate discount
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

// Increment usage count when discount is applied (returns updated discount)
export async function useFirestoreDiscount(code: string): Promise<boolean> {
  const discount = await getFirestoreDiscountByCode(code);
  if (!discount) return false;

  await updateFirestoreDiscount(discount.id, {
    usageCount: discount.usageCount + 1,
  });
  return true;
}
