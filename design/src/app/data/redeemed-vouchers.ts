// Redeemed vouchers management

export interface RedeemedVoucher {
  id: string;
  customerPhone: string;
  customerName: string;
  voucherCode: string;
  voucherName: string;
  pointsSpent: number;
  redeemedAt: string; // ISO date string
}

const STORAGE_KEY = "its_redeemed_vouchers";

// Get all redeemed vouchers
export function getRedeemedVouchers(): RedeemedVoucher[] {
  if (typeof window === "undefined") return [];

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  }
  return [];
}

// Save redeemed vouchers
export function saveRedeemedVouchers(vouchers: RedeemedVoucher[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(vouchers));
}

// Add a redeemed voucher
export function addRedeemedVoucher(voucher: RedeemedVoucher): void {
  const vouchers = getRedeemedVouchers();
  vouchers.push(voucher);
  saveRedeemedVouchers(vouchers);
}

// Get redeemed vouchers by customer phone
export function getCustomerRedeemedVouchers(customerPhone: string): RedeemedVoucher[] {
  return getRedeemedVouchers().filter((v) => v.customerPhone === customerPhone);
}

// Check if a specific voucher code is redeemed by customer
export function isVoucherRedeemedByCustomer(customerPhone: string, voucherCode: string): boolean {
  return getRedeemedVouchers().some(
    (v) => v.customerPhone === customerPhone && v.voucherCode === voucherCode
  );
}
