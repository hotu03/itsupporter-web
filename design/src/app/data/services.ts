// Shared services data for Finance and Machines pages

export interface ServiceData {
  id: string;
  name: string;
  price: number;
}

// Default services with prices
export const DEFAULT_SERVICES: ServiceData[] = [
  { id: "1", name: "Sửa chữa laptop", price: 500000 },
  { id: "2", name: "Cài đặt phần mềm", price: 100000 },
  { id: "3", name: "Nâng cấp RAM", price: 800000 },
  { id: "4", name: "Thay ổ cứng SSD", price: 1200000 },
  { id: "5", name: "Vệ sinh laptop", price: 150000 },
  { id: "6", name: "Sửa nguồn laptop", price: 350000 },
  { id: "7", name: "Thay màn hình", price: 2000000 },
  { id: "8", name: "Thay bàn phím", price: 400000 },
  { id: "9", name: "Tư vấn kỹ thuật", price: 0 },
  { id: "10", name: "Khác", price: 0 },
];

// Get services from localStorage or return default
export function getServices(): ServiceData[] {
  if (typeof window === "undefined") return DEFAULT_SERVICES;
  
  const stored = localStorage.getItem("its_services");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return DEFAULT_SERVICES;
    }
  }
  return DEFAULT_SERVICES;
}

// Save services to localStorage
export function saveServices(services: ServiceData[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("its_services", JSON.stringify(services));
}

// Get service price by name
export function getServicePrice(serviceName: string): number {
  const services = getServices();
  const service = services.find((s) => s.name === serviceName);
  return service?.price ?? 0;
}

// Format currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}
