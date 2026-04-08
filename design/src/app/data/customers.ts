// Customer data management

export interface Customer {
  id: number;
  name: string;
  phone: string;
  totalRepairs: number;
  points: number;
  registeredAt?: string;
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

// Add or update customer
export function addOrUpdateCustomer(name: string, phone: string, pointsToAdd: number = 0): Customer {
  const customers = getCustomers();
  const existing = customers.find(c => c.phone === phone);

  if (existing) {
    // Update existing customer
    existing.totalRepairs += 1;
    existing.points += pointsToAdd;
    saveCustomers(customers);
    return existing;
  } else {
    // Add new customer
    const newId = customers.length > 0 ? Math.max(...customers.map(c => c.id)) + 1 : 1;
    const newCustomer: Customer = {
      id: newId,
      name,
      phone,
      totalRepairs: 1,
      points: pointsToAdd,
      registeredAt: new Date().toISOString(),
    };
    customers.push(newCustomer);
    saveCustomers(customers);
    return newCustomer;
  }
}
