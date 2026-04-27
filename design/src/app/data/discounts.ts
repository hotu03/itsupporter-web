// Shared type/util module for discount codes.

export interface DiscountCode {
  id: string;
  code: string;
  discountPercent: number;
  maxDiscount: number;
  usageLimit: number;
  usageCount: number;
  validFrom: string;
  validUntil: string;
  description?: string;
  isRedeemable?: boolean;
  pointsRequired?: number;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}
