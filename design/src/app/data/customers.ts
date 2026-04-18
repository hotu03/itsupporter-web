// Customer data management

export interface Customer {
  id: number;
  name: string;
  phone: string;
  email?: string;
  createdAt: string;
  totalRepairs: number;
  lastRepair?: string;
  notes?: string;
  points: number;
}

// Get customers from localStorage
export function getCustomers(): Customer[] {
  if (typeof window === "undefined") return [];

  const stored = localStorage.getItem("its_customers");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  }
  return [];
}

// Save customers to localStorage
export function saveCustomers(customers: Customer[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("its_customers", JSON.stringify(customers));
}

// Get customer by phone
export function getCustomerByPhone(phone: string): Customer | undefined {
  return getCustomers().find((c) => c.phone === phone);
}

// Add new customer
export function addCustomer(customer: Omit<Customer, "id">): Customer {
  const customers = getCustomers();
  const newId = customers.length > 0 ? Math.max(...customers.map((c) => c.id)) + 1 : 1;
  const newCustomer: Customer = { ...customer, id: newId };
  saveCustomers([...customers, newCustomer]);
  return newCustomer;
}

// Update existing customer
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

// Delete customer by phone
export function deleteCustomer(phone: string): void {
  const customers = getCustomers();
  saveCustomers(customers.filter((c) => c.phone !== phone));
}

// Legacy function — kept for backwards compatibility
export function addOrUpdateCustomer(
  name: string,
  phone: string,
  pointsToAdd: number = 0
): Customer {
  const customers = getCustomers();
  const existing = customers.find((c) => c.phone === phone);

  if (existing) {
    const updated = customers.map((c) =>
      c.phone === phone
        ? { ...c, totalRepairs: c.totalRepairs + 1, points: c.points + pointsToAdd }
        : c
    );
    saveCustomers(updated);
    return updated.find((c) => c.phone === phone)!;
  } else {
    const newId = customers.length > 0 ? Math.max(...customers.map((c) => c.id)) + 1 : 1;
    const newCustomer: Customer = {
      id: newId,
      name,
      phone,
      totalRepairs: 1,
      points: pointsToAdd,
      createdAt: new Date().toISOString().split("T")[0],
    };
    saveCustomers([...customers, newCustomer]);
    return newCustomer;
  }
}

// Register customer at registration time (no points yet, no repair count)
export function registerCustomer(name: string, phone: string): Customer {
  const customers = getCustomers();
  const existing = customers.find((c) => c.phone === phone);
  if (existing) return existing;

  const newId = customers.length > 0 ? Math.max(...customers.map((c) => c.id)) + 1 : 1;
  const newCustomer: Customer = {
    id: newId,
    name,
    phone,
    totalRepairs: 0,
    points: 0,
    createdAt: new Date().toISOString().split("T")[0],
  };
  saveCustomers([...customers, newCustomer]);
  return newCustomer;
}
