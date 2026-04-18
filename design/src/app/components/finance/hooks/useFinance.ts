import { useState, useCallback, useMemo, useEffect } from "react";
import type { ServiceData } from "../../../data/services";
import { getServices, saveServices } from "../../../data/services";
import type { DiscountCode } from "../../../data/discounts";
import { getDiscounts, saveDiscounts } from "../../../data/discounts";

// ─── Types ───────────────────────────────────────────────────────────────────

// Transaction schema matches data/finance.ts
export interface Transaction {
  id: string;
  machineId?: number;
  customerName: string;
  phone: string;
  service: string;
  amount: number;
  date: string;
  paymentStatus: "paid" | "pending" | "free";
  discountCode?: string;
  discountAmount?: number;
}

export interface TransactionStats {
  totalRevenue: number;
  pendingRevenue: number;
  paidCustomers: number;
  freeCustomers: number;
  totalTransactions: number;
}

export interface UseFinanceReturn {
  // Transaction state
  transactions: Transaction[];
  txPage: number;
  txPageSize: number;
  filteredTransactions: Transaction[];
  pagedTransactions: Transaction[];
  txStats: TransactionStats;

  // Service state
  services: ServiceData[];
  svcPage: number;
  svcPageSize: number;
  filteredServices: ServiceData[];
  pagedServices: ServiceData[];

  // Discount state
  discounts: DiscountCode[];
  discPage: number;
  discPageSize: number;
  filteredDiscounts: DiscountCode[];
  pagedDiscounts: DiscountCode[];

  // Shared filters
  searchQuery: string;
  startDate: string;
  endDate: string;

  // Transaction form
  showTransactionModal: boolean;
  editingTransaction: Transaction | null;
  transactionFormData: TransactionFormData;
  setTransactionFormData: (data: TransactionFormData) => void;

  // Service form
  showServiceModal: boolean;
  editingService: ServiceData | null;
  serviceFormData: ServiceFormData;
  setServiceFormData: (data: ServiceFormData) => void;

  // Discount form
  showDiscountModal: boolean;
  editingDiscount: DiscountCode | null;
  discountFormData: DiscountFormData;
  setDiscountFormData: (data: DiscountFormData) => void;

  // Actions - filters
  setSearchQuery: (q: string) => void;
  setStartDate: (d: string) => void;
  setEndDate: (d: string) => void;
  resetDateFilter: () => void;

  // Actions - transactions
  setTxPage: (p: number) => void;
  setTxPageSize: (s: number) => void;
  openTransactionModal: (tx?: Transaction) => void;
  closeTransactionModal: () => void;
  saveTransaction: () => void;
  deleteTransaction: (id: string) => void;

  // Actions - services
  setSvcPage: (p: number) => void;
  setSvcPageSize: (s: number) => void;
  openServiceModal: (svc?: ServiceData) => void;
  closeServiceModal: () => void;
  saveService: () => void;
  deleteService: (id: string) => void;

  // Actions - discounts
  setDiscPage: (p: number) => void;
  setDiscPageSize: (s: number) => void;
  openDiscountModal: (disc?: DiscountCode) => void;
  closeDiscountModal: () => void;
  saveDiscount: () => void;
  deleteDiscount: (id: string) => void;
}

export interface TransactionFormData {
  customerPhone: string;
  customerName: string;
  service: string;
  amount: string;
  date: string;
  paymentStatus: "paid" | "pending" | "free";
  notes: string;
}

export interface ServiceFormData {
  name: string;
  price: string;
}

export interface DiscountFormData {
  code: string;
  discountPercent: string;
  maxDiscount: string;
  usageLimit: string;
  validFrom: string;
  validUntil: string;
  description: string;
  isRedeemable: boolean;
  pointsRequired: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function isInDateRange(dateStr: string, start: string, end: string): boolean {
  if (!start && !end) return true;
  const date = new Date(dateStr);
  const startDt = start ? new Date(start) : null;
  const endDt = end ? new Date(end) : null;

  if (startDt && endDt) return date >= startDt && date <= endDt;
  if (startDt) return date >= startDt;
  if (endDt) return date <= endDt;
  return true;
}

function getTransactions(): Transaction[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem("its_transactions");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  }
  return [];
}

function saveTransactions(transactions: Transaction[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("its_transactions", JSON.stringify(transactions));
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useFinance(): UseFinanceReturn {
  // Transaction state
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [txPage, setTxPage] = useState(1);
  const [txPageSize, setTxPageSize] = useState(10);

  // Service state
  const [services, setServices] = useState<ServiceData[]>([]);
  const [svcPage, setSvcPage] = useState(1);
  const [svcPageSize, setSvcPageSize] = useState(10);

  // Discount state
  const [discounts, setDiscounts] = useState<DiscountCode[]>([]);
  const [discPage, setDiscPage] = useState(1);
  const [discPageSize, setDiscPageSize] = useState(10);

  // Shared filters
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Transaction form
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [transactionFormData, setTransactionFormData] = useState<TransactionFormData>({
    customerPhone: "",
    customerName: "",
    service: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    paymentStatus: "paid",
    notes: "",
  });

  // Service form
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [editingService, setEditingService] = useState<ServiceData | null>(null);
  const [serviceFormData, setServiceFormData] = useState<ServiceFormData>({
    name: "",
    price: "",
  });

  // Discount form
  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const [editingDiscount, setEditingDiscount] = useState<DiscountCode | null>(null);
  const [discountFormData, setDiscountFormData] = useState<DiscountFormData>({
    code: "",
    discountPercent: "",
    maxDiscount: "",
    usageLimit: "",
    validFrom: "",
    validUntil: "",
    description: "",
    isRedeemable: false,
    pointsRequired: "",
  });

  // Load data
  useEffect(() => {
    setTransactions(getTransactions());
    setServices(getServices());
    setDiscounts(getDiscounts());
  }, []);

  // Persist transactions
  useEffect(() => {
    if (transactions.length > 0 || getTransactions().length > 0) {
      saveTransactions(transactions);
    }
  }, [transactions]);

  // Filtered transactions
  const filteredTransactions = useMemo(() => {
    let result = transactions;

    if (startDate || endDate) {
      result = result.filter((t) => isInDateRange(t.date, startDate, endDate));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.customerName.toLowerCase().includes(q) ||
          t.phone.includes(q) ||
          t.service.toLowerCase().includes(q)
      );
    }

    return result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [transactions, searchQuery, startDate, endDate]);

  const pagedTransactions = useMemo(() => {
    const start = (txPage - 1) * txPageSize;
    return filteredTransactions.slice(start, start + txPageSize);
  }, [filteredTransactions, txPage, txPageSize]);

  // Transaction stats
  const txStats = useMemo((): TransactionStats => {
    const filtered = transactions.filter((t) => isInDateRange(t.date, startDate, endDate));

    const totalRevenue = filtered
      .filter((t) => t.paymentStatus === "paid")
      .reduce((sum, t) => sum + t.amount, 0);

    const pendingRevenue = filtered
      .filter((t) => t.paymentStatus === "pending")
      .reduce((sum, t) => sum + t.amount, 0);

    const paidCustomers = new Set(
      filtered.filter((t) => t.amount > 0).map((t) => t.phone)
    ).size;

    const freeCustomers = new Set(
      filtered.filter((t) => t.amount === 0).map((t) => t.phone)
    ).size;

    return {
      totalRevenue,
      pendingRevenue,
      paidCustomers,
      freeCustomers,
      totalTransactions: filtered.length,
    };
  }, [transactions, startDate, endDate]);

  // Filtered services
  const filteredServices = useMemo(() => {
    if (!searchQuery.trim()) return services;
    const q = searchQuery.toLowerCase();
    return services.filter((s) => s.name.toLowerCase().includes(q));
  }, [services, searchQuery]);

  const pagedServices = useMemo(() => {
    const start = (svcPage - 1) * svcPageSize;
    return filteredServices.slice(start, start + svcPageSize);
  }, [filteredServices, svcPage, svcPageSize]);

  // Filtered discounts
  const filteredDiscounts = useMemo(() => {
    if (!searchQuery.trim()) return discounts;
    const q = searchQuery.toLowerCase();
    return discounts.filter(
      (d) =>
        d.code.toLowerCase().includes(q) ||
        d.description?.toLowerCase().includes(q)
    );
  }, [discounts, searchQuery]);

  const pagedDiscounts = useMemo(() => {
    const start = (discPage - 1) * discPageSize;
    return filteredDiscounts.slice(start, start + discPageSize);
  }, [filteredDiscounts, discPage, discPageSize]);

  // Reset pages when filters change
  useEffect(() => {
    setTxPage(1);
  }, [searchQuery, startDate, endDate, txPageSize]);

  // Transaction actions
  const openTransactionModal = useCallback((tx?: Transaction) => {
    if (tx) {
      setEditingTransaction(tx);
      setTransactionFormData({
        customerPhone: tx.phone,
        customerName: tx.customerName,
        service: tx.service,
        amount: tx.amount.toString(),
        date: tx.date,
        paymentStatus: tx.paymentStatus,
        notes: "",
      });
    } else {
      setEditingTransaction(null);
      setTransactionFormData({
        customerPhone: "",
        customerName: "",
        service: "",
        amount: "",
        date: new Date().toISOString().split("T")[0],
        paymentStatus: "paid",
        notes: "",
      });
    }
    setShowTransactionModal(true);
  }, []);

  const closeTransactionModal = useCallback(() => {
    setShowTransactionModal(false);
    setEditingTransaction(null);
    setTransactionFormData({
      customerPhone: "",
      customerName: "",
      service: "",
      amount: "",
      date: new Date().toISOString().split("T")[0],
      paymentStatus: "paid",
      notes: "",
    });
  }, []);

  const saveTransaction = useCallback(() => {
    if (
      !transactionFormData.customerPhone.trim() ||
      !transactionFormData.customerName.trim() ||
      !transactionFormData.service.trim()
    ) {
      alert("Vui lòng nhập đầy đủ thông tin khách hàng và dịch vụ");
      return;
    }

    const amount = parseFloat(transactionFormData.amount) || 0;
    const paymentStatus = amount === 0 ? "free" : transactionFormData.paymentStatus;

    if (editingTransaction) {
      setTransactions((prev) =>
        prev.map((t) =>
          t.id === editingTransaction.id
            ? {
                ...t,
                service: transactionFormData.service,
                amount,
                date: transactionFormData.date,
                paymentStatus,
              }
            : t
        )
      );
    } else {
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        customerName: transactionFormData.customerName,
        phone: transactionFormData.customerPhone,
        service: transactionFormData.service,
        amount,
        date: transactionFormData.date,
        paymentStatus,
      };
      setTransactions((prev) => [newTransaction, ...prev]);
    }
    closeTransactionModal();
  }, [transactionFormData, editingTransaction, closeTransactionModal]);

  const deleteTransaction = useCallback((id: string) => {
    if (confirm("Bạn có chắc muốn xoá giao dịch này?")) {
      setTransactions((prev) => prev.filter((t) => t.id !== id));
    }
  }, []);

  // Service actions
  const openServiceModal = useCallback((svc?: ServiceData) => {
    if (svc) {
      setEditingService(svc);
      setServiceFormData({ name: svc.name, price: svc.price.toString() });
    } else {
      setEditingService(null);
      setServiceFormData({ name: "", price: "" });
    }
    setShowServiceModal(true);
  }, []);

  const closeServiceModal = useCallback(() => {
    setShowServiceModal(false);
    setEditingService(null);
    setServiceFormData({ name: "", price: "" });
  }, []);

  const saveService = useCallback(() => {
    if (!serviceFormData.name.trim()) {
      alert("Vui lòng nhập tên dịch vụ");
      return;
    }

    const price = parseFloat(serviceFormData.price) || 0;

    if (editingService) {
      const updated = services.map((s) =>
        s.id === editingService.id ? { ...s, name: serviceFormData.name, price } : s
      );
      setServices(updated);
      saveServices(updated);
    } else {
      const newService: ServiceData = {
        id: Date.now().toString(),
        name: serviceFormData.name,
        price,
      };
      const updated = [...services, newService];
      setServices(updated);
      saveServices(updated);
    }
    closeServiceModal();
  }, [serviceFormData, editingService, services, closeServiceModal]);

  const deleteService = useCallback((id: string) => {
    if (confirm("Bạn có chắc muốn xoá dịch vụ này?")) {
      const updated = services.filter((s) => s.id !== id);
      setServices(updated);
      saveServices(updated);
    }
  }, [services]);

  // Discount actions
  const openDiscountModal = useCallback((disc?: DiscountCode) => {
    if (disc) {
      setEditingDiscount(disc);
      setDiscountFormData({
        code: disc.code,
        discountPercent: disc.discountPercent.toString(),
        maxDiscount: disc.maxDiscount.toString(),
        usageLimit: disc.usageLimit.toString(),
        validFrom: disc.validFrom,
        validUntil: disc.validUntil,
        description: disc.description || "",
        isRedeemable: disc.isRedeemable || false,
        pointsRequired: disc.pointsRequired?.toString() || "",
      });
    } else {
      setEditingDiscount(null);
      setDiscountFormData({
        code: "",
        discountPercent: "",
        maxDiscount: "",
        usageLimit: "",
        validFrom: "",
        validUntil: "",
        description: "",
        isRedeemable: false,
        pointsRequired: "",
      });
    }
    setShowDiscountModal(true);
  }, []);

  const closeDiscountModal = useCallback(() => {
    setShowDiscountModal(false);
    setEditingDiscount(null);
    setDiscountFormData({
      code: "",
      discountPercent: "",
      maxDiscount: "",
      usageLimit: "",
      validFrom: "",
      validUntil: "",
      description: "",
      isRedeemable: false,
      pointsRequired: "",
    });
  }, []);

  const saveDiscount = useCallback(() => {
    if (!discountFormData.code.trim()) {
      alert("Vui lòng nhập mã giảm giá");
      return;
    }

    const discountPercent = parseFloat(discountFormData.discountPercent) || 0;
    const maxDiscount = parseFloat(discountFormData.maxDiscount) || 0;
    const usageLimit = parseInt(discountFormData.usageLimit) || 0;

    if (discountPercent <= 0 || discountPercent > 100) {
      alert("Phần trăm giảm giá phải từ 1-100");
      return;
    }

    if (!discountFormData.validFrom || !discountFormData.validUntil) {
      alert("Vui lòng nhập thời gian áp dụng");
      return;
    }

    if (discountFormData.isRedeemable) {
      const pointsRequired = parseInt(discountFormData.pointsRequired) || 0;
      if (pointsRequired <= 0) {
        alert("Vui lòng nhập số điểm yêu cầu để đổi mã");
        return;
      }
    }

    if (!editingDiscount) {
      const codeExists = discounts.some(
        (d) => d.code.toUpperCase() === discountFormData.code.toUpperCase()
      );
      if (codeExists) {
        alert("Mã giảm giá này đã tồn tại");
        return;
      }
    }

    if (editingDiscount) {
      const updated = discounts.map((d) =>
        d.id === editingDiscount.id
          ? {
              ...d,
              code: discountFormData.code.toUpperCase(),
              discountPercent,
              maxDiscount,
              usageLimit,
              validFrom: discountFormData.validFrom,
              validUntil: discountFormData.validUntil,
              description: discountFormData.description || undefined,
              isRedeemable: discountFormData.isRedeemable,
              pointsRequired: discountFormData.isRedeemable
                ? parseInt(discountFormData.pointsRequired)
                : undefined,
            }
          : d
      );
      setDiscounts(updated);
      saveDiscounts(updated);
    } else {
      const newDiscount: DiscountCode = {
        id: Date.now().toString(),
        code: discountFormData.code.toUpperCase(),
        discountPercent,
        maxDiscount,
        usageLimit,
        usageCount: 0,
        validFrom: discountFormData.validFrom,
        validUntil: discountFormData.validUntil,
        description: discountFormData.description || undefined,
        isRedeemable: discountFormData.isRedeemable,
        pointsRequired: discountFormData.isRedeemable
          ? parseInt(discountFormData.pointsRequired)
          : undefined,
      };
      const updated = [...discounts, newDiscount];
      setDiscounts(updated);
      saveDiscounts(updated);
    }
    closeDiscountModal();
  }, [discountFormData, editingDiscount, discounts, closeDiscountModal]);

  const deleteDiscount = useCallback((id: string) => {
    if (confirm("Bạn có chắc muốn xoá mã giảm giá này?")) {
      const updated = discounts.filter((d) => d.id !== id);
      setDiscounts(updated);
      saveDiscounts(updated);
    }
  }, [discounts]);

  const resetDateFilter = useCallback(() => {
    setStartDate("");
    setEndDate("");
  }, []);

  return {
    // Transaction state
    transactions,
    txPage,
    txPageSize,
    filteredTransactions,
    pagedTransactions,
    txStats,

    // Service state
    services,
    svcPage,
    svcPageSize,
    filteredServices,
    pagedServices,

    // Discount state
    discounts,
    discPage,
    discPageSize,
    filteredDiscounts,
    pagedDiscounts,

    // Shared filters
    searchQuery,
    startDate,
    endDate,

    // Transaction form
    showTransactionModal,
    editingTransaction,
    transactionFormData,
    setTransactionFormData,

    // Service form
    showServiceModal,
    editingService,
    serviceFormData,
    setServiceFormData,

    // Discount form
    showDiscountModal,
    editingDiscount,
    discountFormData,
    setDiscountFormData,

    // Actions - filters
    setSearchQuery,
    setStartDate,
    setEndDate,
    resetDateFilter,

    // Actions - transactions
    setTxPage,
    setTxPageSize,
    openTransactionModal,
    closeTransactionModal,
    saveTransaction,
    deleteTransaction,

    // Actions - services
    setSvcPage,
    setSvcPageSize,
    openServiceModal,
    closeServiceModal,
    saveService,
    deleteService,

    // Actions - discounts
    setDiscPage,
    setDiscPageSize,
    openDiscountModal,
    closeDiscountModal,
    saveDiscount,
    deleteDiscount,
  };
}