import { useState, useCallback, useMemo, useEffect } from "react";
import type { Customer } from "../../../data/customers";
import {
  getFirestoreCustomers,
  addFirestoreCustomer,
  updateFirestoreCustomer,
  deleteFirestoreCustomer,
} from "../../../data/firestoreCustomers";
import {
  getFirestoreDiscounts,
  updateFirestoreDiscount,
} from "../../../data/firestoreDiscounts";
import {
  getCustomerPointHistory,
  addPointHistory,
} from "../../../data/points";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface CustomerStats {
  total: number;
  active: number;
  totalRepairs: number;
  newInPeriod: number;
}

export interface UseCustomersReturn {
  // State
  customers: Customer[];
  loading: boolean;
  searchQuery: string;
  startDate: string;
  endDate: string;
  formData: CustomerFormData;
  editingCustomer: Customer | null;
  showForm: boolean;
  selectedCustomer: Customer | null;
  showRedeem: boolean;
  historyCustomer: Customer | null;
  showHistory: boolean;
  filteredCustomers: Customer[];
  pagedCustomers: Customer[];
  stats: CustomerStats;
  page: number;
  pageSize: number;

  // Actions
  setSearchQuery: (q: string) => void;
  setStartDate: (d: string) => void;
  setEndDate: (d: string) => void;
  setFormData: (data: CustomerFormData) => void;
  resetDateFilter: () => void;
  openForm: (customer?: Customer) => void;
  closeForm: () => void;
  openRedeem: (customer: Customer) => void;
  closeRedeem: () => void;
  openHistory: (customer: Customer) => void;
  closeHistory: () => void;
  handleSave: () => void;
  handleDelete: (phone: string) => void;
  handleRedeem: (discountId: string) => void;
  setPage: (p: number) => void;
  setPageSize: (s: number) => void;
}

export interface CustomerFormData {
  phone: string;
  name: string;
  email: string;
  notes: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function isInDateRange(
  dateStr: string,
  start: string,
  end: string
): boolean {
  if (!start && !end) return true;
  const date = new Date(dateStr);
  const startDt = start ? new Date(start) : null;
  const endDt = end ? new Date(end) : null;

  if (startDt && endDt) return date >= startDt && date <= endDt;
  if (startDt) return date >= startDt;
  if (endDt) return date <= endDt;
  return true;
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useCustomers(): UseCustomersReturn {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [formData, setFormData] = useState<CustomerFormData>({
    phone: "",
    name: "",
    email: "",
    notes: "",
  });
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showRedeem, setShowRedeem] = useState(false);
  const [historyCustomer, setHistoryCustomer] = useState<Customer | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Load from Firestore
  useEffect(() => {
    getFirestoreCustomers().then(data => {
      setCustomers(data);
      setLoading(false);
    }).catch(err => {
      console.error('Failed to load customers:', err);
      setLoading(false);
    });
  }, []);

  // Persist when customers change (Firestore auto-persists)
  useEffect(() => {
    // No-op for Firestore - data is already persisted
  }, [customers, loading]);

  // Filtered customers
  const filteredCustomers = useMemo(() => {
    let result = customers;

    if (startDate || endDate) {
      result = result.filter(
        (c) =>
          isInDateRange(c.createdAt, startDate, endDate) ||
          (c.lastRepair && isInDateRange(c.lastRepair, startDate, endDate))
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          c.phone.includes(q) ||
          c.name.toLowerCase().includes(q) ||
          c.email?.toLowerCase().includes(q)
      );
    }

    return result;
  }, [customers, searchQuery, startDate, endDate]);

  // Paged customers
  const pagedCustomers = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredCustomers.slice(start, start + pageSize);
  }, [filteredCustomers, page, pageSize]);

  // Stats
  const stats = useMemo((): CustomerStats => {
    const filtered = customers.filter((c) =>
      isInDateRange(c.createdAt, startDate, endDate)
    );

    const total = filtered.length;
    const active = filtered.filter(
      (c) => c.lastRepair && isInDateRange(c.lastRepair, startDate, endDate)
    ).length;
    const totalRepairs = filtered.reduce((sum, c) => sum + c.totalRepairs, 0);

    let newInPeriod = 0;
    if (startDate || endDate) {
      newInPeriod = filtered.length;
    } else {
      const now = new Date();
      newInPeriod = filtered.filter((c) => {
        const date = new Date(c.createdAt);
        return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
      }).length;
    }

    return { total, active, totalRepairs, newInPeriod };
  }, [customers, startDate, endDate]);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [searchQuery, startDate, endDate, pageSize]);

  // Actions
  const openForm = useCallback((customer?: Customer) => {
    if (customer) {
      setEditingCustomer(customer);
      setFormData({
        phone: customer.phone,
        name: customer.name,
        email: customer.email || "",
        notes: customer.notes || "",
      });
    } else {
      setEditingCustomer(null);
      setFormData({ phone: "", name: "", email: "", notes: "" });
    }
    setShowForm(true);
  }, []);

  const closeForm = useCallback(() => {
    setShowForm(false);
    setEditingCustomer(null);
    setFormData({ phone: "", name: "", email: "", notes: "" });
  }, []);

  const handleSave = useCallback(async () => {
    if (!formData.phone.trim() || !formData.name.trim()) {
      alert("Vui lòng nhập số điện thoại và tên khách hàng");
      return;
    }

    if (editingCustomer) {
      await updateFirestoreCustomer(editingCustomer.id, {
        name: formData.name,
        email: formData.email || undefined,
        notes: formData.notes || undefined,
      });
      const updated = { ...editingCustomer, name: formData.name, email: formData.email || undefined, notes: formData.notes || undefined };
      setCustomers((prev) =>
        prev.map((c) => (c.phone === editingCustomer.phone ? updated : c))
      );
    } else {
      const exists = customers.find((c) => c.phone === formData.phone);
      if (exists) {
        alert("Số điện thoại này đã tồn tại");
        return;
      }
      const newCustomer = {
        phone: formData.phone,
        name: formData.name,
        email: formData.email || undefined,
        notes: formData.notes || undefined,
        createdAt: new Date().toISOString().split("T")[0],
        totalRepairs: 0,
        points: 0,
      };
      const id = await addFirestoreCustomer(newCustomer);
      setCustomers((prev) => [{ ...newCustomer, id }, ...prev]);
    }
    closeForm();
  }, [formData, editingCustomer, customers, closeForm]);

  const handleDelete = useCallback(async (phone: string) => {
    if (confirm("Bạn có chắc muốn xoá khách hàng này?")) {
      const customer = customers.find(c => c.phone === phone);
      if (customer?.id) {
        await deleteFirestoreCustomer(String(customer.id));
      }
      setCustomers((prev) => prev.filter((c) => c.phone !== phone));
    }
  }, [customers]);

  const openRedeem = useCallback((customer: Customer) => {
    setSelectedCustomer(customer);
    setShowRedeem(true);
  }, []);

  const closeRedeem = useCallback(() => {
    setShowRedeem(false);
    setSelectedCustomer(null);
  }, []);

  const handleRedeem = useCallback(async (discountId: string) => {
    if (!selectedCustomer) return;

    const discounts = await getFirestoreDiscounts();
    const discount = discounts.find((d) => d.id === discountId);
    if (!discount) return;

    if (selectedCustomer.points < (discount.pointsRequired || 0)) {
      alert("Không đủ điểm để đổi mã này");
      return;
    }

    if (discount.usageCount >= discount.usageLimit) {
      alert("Mã giảm giá đã hết lượt sử dụng");
      return;
    }

    const now = new Date();
    const validFrom = new Date(discount.validFrom);
    const validUntil = new Date(discount.validUntil);

    if (now < validFrom || now > validUntil) {
      alert("Mã giảm giá không còn hiệu lực");
      return;
    }

    const newPoints = selectedCustomer.points - (discount.pointsRequired || 0);

    setCustomers((prev) =>
      prev.map((c) =>
        c.phone === selectedCustomer.phone ? { ...c, points: newPoints } : c)
    );

    await updateFirestoreDiscount(discount.id, { usageCount: discount.usageCount + 1 });

    addPointHistory({
      id: Date.now().toString(),
      customerPhone: selectedCustomer.phone,
      customerName: selectedCustomer.name,
      type: "redeem",
      points: -(discount.pointsRequired || 0),
      date: new Date().toISOString(),
      description: `Đổi mã ${discount.code}`,
      relatedId: discount.id,
    });

    setSelectedCustomer({ ...selectedCustomer, points: newPoints });
    alert(
      `✅ Đổi điểm thành công!\n\nMã giảm giá cá nhân của bạn:\n${discount.code}-${selectedCustomer.phone.slice(-4)}\n\nĐã trừ ${discount.pointsRequired} điểm. Còn lại: ${newPoints} điểm`
    );
  }, [selectedCustomer]);

  const openHistory = useCallback((customer: Customer) => {
    setHistoryCustomer(customer);
    setShowHistory(true);
  }, []);

  const closeHistory = useCallback(() => {
    setShowHistory(false);
    setHistoryCustomer(null);
  }, []);

  const resetDateFilter = useCallback(() => {
    setStartDate("");
    setEndDate("");
  }, []);

  return {
    customers,
    loading,
    searchQuery,
    startDate,
    endDate,
    formData,
    editingCustomer,
    showForm,
    selectedCustomer,
    showRedeem,
    historyCustomer,
    showHistory,
    filteredCustomers,
    pagedCustomers,
    stats,
    page,
    pageSize,

    setSearchQuery,
    setStartDate,
    setEndDate,
    setFormData,
    resetDateFilter,
    openForm,
    closeForm,
    openRedeem,
    closeRedeem,
    openHistory,
    closeHistory,
    handleSave,
    handleDelete,
    handleRedeem,
    setPage,
    setPageSize,
  };
}

// Re-export for convenience
export { getCustomerPointHistory };
