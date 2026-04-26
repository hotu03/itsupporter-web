/**
 * @deprecated Use firestoreServices.ts instead.
 * This file is kept as a deprecated stub for backward compatibility.
 * All calls are redirected to the Firestore implementation.
 */

import {
  getFirestoreServices,
  DEFAULT_SERVICES,
} from './firestoreServices';

export interface ServiceData {
  id: string;
  name: string;
  price: number;
}

// Re-export DEFAULT_SERVICES from firestoreServices for backward compatibility
export { DEFAULT_SERVICES } from './firestoreServices';

// ─── Deprecated Stubs (redirect to Firestore) ───────────────────────────────

export async function getServices(): Promise<ServiceData[]> {
  console.warn("[DEPRECATED] getServices() from services.ts → Use getFirestoreServices() from firestoreServices.ts");
  return getFirestoreServices();
}

let cachedServices: ServiceData[] | null = null;

export async function getServicePrice(serviceName: string): Promise<number> {
  console.warn("[DEPRECATED] getServicePrice() from services.ts → Use getFirestoreServicePrice() from firestoreServices.ts (async version available)");

  if (!serviceName) return 0;

  // Cache services from Firestore on first call
  if (!cachedServices) {
    try {
      cachedServices = await getFirestoreServices();
    } catch (err) {
      console.error("Failed to load services for price lookup, using defaults", err);
      cachedServices = DEFAULT_SERVICES;
    }
  }

  const normalizedName = serviceName.trim().toLowerCase();

  // Robust lookup - case insensitive, trim, and partial match
  let service = cachedServices.find(s => s.name.trim().toLowerCase() === normalizedName);
  if (!service) {
    service = cachedServices.find(s =>
      s.name.toLowerCase().includes(normalizedName) ||
      normalizedName.includes(s.name.toLowerCase())
    );
  }

  return service?.price ?? 0;
}

// Sync version for backward compatibility (uses cache if available)
export function getServicePriceSync(serviceName: string): number {
  if (!serviceName) return 0;

  const normalizedName = serviceName.trim().toLowerCase();

  // Use cached if available, otherwise fallback to DEFAULT
  const services = cachedServices || DEFAULT_SERVICES;
  let service = services.find(s => s.name.trim().toLowerCase() === normalizedName);
  if (!service) {
    service = services.find(s =>
      s.name.toLowerCase().includes(normalizedName) ||
      normalizedName.includes(s.name.toLowerCase())
    );
  }

  return service?.price ?? 0;
}

export async function saveServices(_services: ServiceData[]): Promise<void> {
  console.warn("[DEPRECATED] saveServices() from services.ts - This function is no longer needed with Firestore");
  // No-op - Firestore handles persistence automatically
}

// Pure function - can keep
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}
