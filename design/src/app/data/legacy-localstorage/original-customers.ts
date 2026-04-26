// ORIGINAL LOCALSTORAGE IMPLEMENTATION - ARCHIVED FOR REFERENCE ONLY
// This file contains the complete original localStorage-based customer management before migration to Firestore.
// It is NO LONGER USED in production. All active code uses firestoreCustomers.ts.

export interface Customer {
  id: string | number;
  name: string;
  phone: string;
  email?: string;
  createdAt: string;
  totalRepairs: number;
  lastRepair?: string;
  notes?: string;
  points: number;
  passwordHash?: string;
}

// Simple hash function for demo (not secure for production)
function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(16);
}

const STORAGE_KEY = "its_customers";

export function getCustomers(): Customer[] {
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

export function saveCustomers(customers: Customer[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(customers));
}

export function getCustomerByPhone(phone: string): Customer | undefined {
  return getCustomers().find((c) => c.phone === phone);
}

export function getCustomerByEmail(email: string): Customer | undefined {
  const normalized = email.trim().toLowerCase();
  return getCustomers().find((c) => c.email?.toLowerCase() === normalized);
}

export function addOrUpdateCustomer(
  name: string,
  phone: string,
  pointsToAdd: number = 0,
  email: string = ""
): Customer {
  const customers = getCustomers();
  const existing = customers.find((c) => c.phone === phone);

  if (existing) {
    const updated = customers.map((c) =>
      c.phone === phone
        ? { ...c, totalRepairs: c.totalRepairs + 1, points: c.points + pointsToAdd, email: email || c.email }
        : c
    );
    saveCustomers(updated);
    return updated.find((c) => c.phone === phone)!;
  } else {
    const newId = customers.length > 0 ? Math.max(...customers.map((c) => Number(c.id))) + 1 : 1;
    const newCustomer: Customer = {
      id: newId,
      name,
      phone,
      email,
      totalRepairs: 1,
      points: pointsToAdd,
      createdAt: new Date().toISOString().split("T")[0],
    };
    saveCustomers([...customers, newCustomer]);
    return newCustomer;
  }
}

// Additional legacy functions (complete original file)
export function hasPassword(email: string): boolean {
  const customer = getCustomerByEmail(email);
  return !!customer?.passwordHash;
}

export function setCustomerPassword(email: string, password: string): boolean {
  const customers = getCustomers();
  const index = customers.findIndex((c) => c.email?.toLowerCase() === email.trim().toLowerCase());
  if (index === -1) return false;

  customers[index].passwordHash = simpleHash(password);
  saveCustomers(customers);
  return true;
}

export function verifyCustomerPassword(email: string, password: string): boolean {
  const customer = getCustomerByEmail(email);
  if (!customer?.passwordHash) return false;
  return customer.passwordHash === simpleHash(password);
}

export function addCustomer(customer: Omit<Customer, "id">): Customer {
  const customers = getCustomers();
  const newId = customers.length > 0 ? Math.max(...customers.map((c) => Number(c.id))) + 1 : 1;
  const newCustomer: Customer = { ...customer, id: newId };
  saveCustomers([...customers, newCustomer]);
  return newCustomer;
}

export function updateCustomer(phone: string, updates: Partial<Omit<Customer, "id" | "phone">>): Customer | undefined {
  const customers = getCustomers();
  const index = customers.findIndex((c) => c.phone === phone);
  if (index === -1) return undefined;

  const updated = customers.map((c, i) =>
    i === index ? { ...c, ...updates } : c
  );
  saveCustomers(updated);
  return updated[index];
}

export function deleteCustomer(phone: string): void {
  const customers = getCustomers();
  saveCustomers(customers.filter((c) => c.phone !== phone));
}

export function registerCustomer(name: string, phone: string, email: string = ""): Customer {
  const customers = getCustomers();
  const existing = customers.find((c) => c.phone === phone);
  if (existing) return existing;

  const newId = customers.length > 0 ? Math.max(...customers.map((c) => Number(c.id))) + 1 : 1;
  const newCustomer: Customer = {
    id: newId,
    name,
    phone,
    email,
    totalRepairs: 0,
    points: 0,
    createdAt: new Date().toISOString().split("T")[0],
  };
  saveCustomers([...customers, newCustomer]);
  return newCustomer;
}
