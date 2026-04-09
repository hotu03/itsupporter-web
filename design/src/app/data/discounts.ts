// Shared discount codes data for Finance and Machines pages

export interface DiscountCode {
  id: string;
  code: string; // Unique code (e.g., "SAVE20", "FREESHIP")
  discountPercent: number; // Percentage discount (0-100)
  maxDiscount: number; // Maximum discount amount in VND
  usageLimit: number; // Total number of times it can be used
  usageCount: number; // How many times it has been used
  validFrom: string; // ISO date string
  validUntil: string; // ISO date string
  description?: string; // Optional description
  isRedeemable?: boolean; // Can be redeemed with points
  pointsRequired?: number; // Points needed to redeem
}

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
  {
    id: "3",
    code: "VIP10",
    discountPercent: 10,
    maxDiscount: 100000,
    usageLimit: 200,
    usageCount: 0,
    validFrom: "2024-01-01",
    validUntil: "2026-12-31",
    description: "Giảm 10% cho khách VIP",
    isRedeemable: true,
    pointsRequired: 5,
  },
  {
    id: "4",
    code: "VIP15",
    discountPercent: 15,
    maxDiscount: 150000,
    usageLimit: 150,
    usageCount: 0,
    validFrom: "2024-01-01",
    validUntil: "2026-12-31",
    description: "Giảm 15% cho khách VIP",
    isRedeemable: true,
    pointsRequired: 10,
  },
  {
    id: "5",
    code: "VIP25",
    discountPercent: 25,
    maxDiscount: 250000,
    usageLimit: 100,
    usageCount: 0,
    validFrom: "2024-01-01",
    validUntil: "2026-12-31",
    description: "Giảm 25% tối đa 250k",
    isRedeemable: true,
    pointsRequired: 20,
  },
  {
    id: "6",
    code: "PLATINUM",
    discountPercent: 30,
    maxDiscount: 300000,
    usageLimit: 50,
    usageCount: 0,
    validFrom: "2024-01-01",
    validUntil: "2026-12-31",
    description: "Voucher Platinum - Giảm 30%",
    isRedeemable: true,
    pointsRequired: 30,
  },
];

// Get discount codes from localStorage or return default
export function getDiscounts(): DiscountCode[] {
  if (typeof window === "undefined") return DEFAULT_DISCOUNTS;

  const stored = localStorage.getItem("its_discounts");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return DEFAULT_DISCOUNTS;
    }
  }
  return DEFAULT_DISCOUNTS;
}

// Save discount codes to localStorage
export function saveDiscounts(discounts: DiscountCode[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("its_discounts", JSON.stringify(discounts));
}

// Validate and apply discount code
export function validateDiscount(
  code: string,
  originalAmount: number
): {
  valid: boolean;
  discount?: DiscountCode;
  discountAmount?: number;
  finalAmount?: number;
  error?: string;
} {
  if (!code.trim()) {
    return { valid: false, error: "Vui lòng nhập mã giảm giá" };
  }

  const discounts = getDiscounts();
  const discount = discounts.find((d) => d.code.toUpperCase() === code.toUpperCase());

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

// Increment usage count when discount is applied
export function useDiscount(code: string): boolean {
  const discounts = getDiscounts();
  const index = discounts.findIndex((d) => d.code.toUpperCase() === code.toUpperCase());

  if (index === -1) return false;

  discounts[index].usageCount += 1;
  saveDiscounts(discounts);
  return true;
}

// Format currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}