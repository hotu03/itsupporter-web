export interface CustomerIdentityInput {
  email?: string;
  phone?: string;
}

function normalizeKeyPart(value: string | undefined): string {
  return (value ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9@._|-]/g, "");
}

export function normalizePhoneKey(phone: string | undefined): string {
  const digitsOnly = (phone ?? "").replace(/\D+/g, "");
  return digitsOnly || normalizeKeyPart(phone) || "unknown";
}

export function normalizeEmailKey(email: string | undefined): string {
  return normalizeKeyPart(email) || "unknown";
}

export function buildCustomerDocumentId(input: CustomerIdentityInput): string {
  // Email is the primary key - if email exists, use it
  if (input.email?.trim()) {
    return `cust_email_${normalizeEmailKey(input.email)}`;
  }

  // Fallback to phone only if email is not available
  if (input.phone?.trim()) {
    return `cust_phone_${normalizePhoneKey(input.phone)}`;
  }

  // Should not happen in practice - both email and phone are required for customers
  return `cust_unknown_${normalizePhoneKey(input.phone) || normalizeEmailKey(input.email) || 'unknown'}`;
}

export function buildTransactionDocumentId(machineId: string): string {
  return `tx_${machineId}`;
}

export function buildInvoiceDocumentId(machineId: string): string {
  return `inv_${machineId}`;
}

export function buildPointHistoryEarnId(machineId: string): string {
  return `ph_earn_${machineId}`;
}

export function buildDiscountUsageLedgerId(discountId: string, operationId: string): string {
  return `du_${discountId}_${operationId}`;
}

export function buildOperationId(prefix: string): string {
  return `${prefix}_${crypto.randomUUID()}`;
}
