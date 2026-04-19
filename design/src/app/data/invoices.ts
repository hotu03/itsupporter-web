// Invoice data management

export interface Invoice {
  id: string;
  invoiceNumber: string; // Mã hóa đơn (VD: HD-001, HD-002)
  machineId?: string | number; // ID máy liên kết
  customerName: string;
  customerEmail: string;
  phone: string;
  registrationType: "online" | "in-person"; // Loại đăng ký

  // Thông tin dịch vụ
  services: {
    name: string;
    price: number;
  }[];
  machineCondition?: string;
  needs?: string;
  category: string;
  warranty: "con" | "het";
  charger: boolean;
  password?: string;

  // Thông tin thời gian
  createdAt: string; // Ngày tạo hóa đơn
  createdTime: string; // Giờ tạo hóa đơn
  dropOffTime?: string; // Thời gian đưa máy đến
  appointmentTime?: string; // Thời gian hẹn nhận

  // Thông tin thanh toán
  serviceAmount: number; // Tổng tiền dịch vụ
  discountCode?: string;
  discountAmount: number;
  finalAmount: number; // Thành tiền
  paymentStatus: "paid" | "pending" | "free";

  // Thông tin điểm thưởng
  pointsEarned?: number;

  // Thông tin nhân viên (cho đăng ký trực tiếp)
  tester?: string; // Tên tester tạo hóa đơn
  createdBy?: string; // Người tạo hóa đơn

  // Ghi chú
  notes?: string;
}

// Get invoices from localStorage
export function getInvoices(): Invoice[] {
  if (typeof window === "undefined") return [];

  const stored = localStorage.getItem("its_invoices");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  }
  return [];
}

// Save invoices to localStorage
export function saveInvoices(invoices: Invoice[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("its_invoices", JSON.stringify(invoices));
}

// Generate invoice number
function generateInvoiceNumber(): string {
  const invoices = getInvoices();
  const nextNumber = invoices.length + 1;
  return `HD-${nextNumber.toString().padStart(4, "0")}`;
}

// Add a new invoice
export function addInvoice(invoice: Omit<Invoice, "id" | "invoiceNumber">): Invoice {
  const invoices = getInvoices();
  const newId = `INV-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  const invoiceNumber = generateInvoiceNumber();

  const newInvoice: Invoice = {
    ...invoice,
    id: newId,
    invoiceNumber,
  };

  invoices.push(newInvoice);
  saveInvoices(invoices);

  return newInvoice;
}

// Get invoice by ID
export function getInvoiceById(id: string): Invoice | undefined {
  const invoices = getInvoices();
  return invoices.find(inv => inv.id === id);
}

// Get invoices by phone number
export function getInvoicesByPhone(phone: string): Invoice[] {
  const invoices = getInvoices();
  return invoices.filter(inv => inv.phone === phone);
}

// Get invoices by email
export function getInvoicesByEmail(email: string): Invoice[] {
  const invoices = getInvoices();
  return invoices.filter(inv => inv.customerEmail?.toLowerCase() === email.toLowerCase());
}

// Get invoices by customer name
export function getInvoicesByCustomerName(customerName: string): Invoice[] {
  const invoices = getInvoices();
  return invoices.filter(inv =>
    inv.customerName.toLowerCase().includes(customerName.toLowerCase())
  );
}

// Update invoice payment status
export function updateInvoicePaymentStatus(id: string, paymentStatus: "paid" | "pending" | "free"): void {
  const invoices = getInvoices();
  const index = invoices.findIndex(inv => inv.id === id);

  if (index !== -1) {
    invoices[index].paymentStatus = paymentStatus;
    saveInvoices(invoices);
  }
}

// Update invoice
export function updateInvoice(id: string, updates: Partial<Invoice>): void {
  const invoices = getInvoices();
  const index = invoices.findIndex(inv => inv.id === id);

  if (index !== -1) {
    invoices[index] = { ...invoices[index], ...updates };
    saveInvoices(invoices);
  }
}

// Delete invoice
export function deleteInvoice(id: string): void {
  const invoices = getInvoices();
  const filtered = invoices.filter(inv => inv.id !== id);
  saveInvoices(filtered);
}

// Format currency helper
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}
