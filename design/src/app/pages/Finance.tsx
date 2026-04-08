import { useState, useMemo, useEffect } from "react";
import { Pagination, usePagination } from "../components/Pagination";
import {
  Search,
  Plus,
  DollarSign,
  X,
  Pencil,
  Trash2,
  TrendingUp,
  Users,
  CreditCard,
  CalendarRange,
  FileText,
  Settings,
  Ticket,
  Award,
  Star,
} from "lucide-react";
import {
  ServiceData,
  getServices,
  saveServices,
  formatCurrency as formatCurr,
} from "../data/services";
import {
  DiscountCode,
  getDiscounts,
  saveDiscounts,
} from "../data/discounts";
import PointRulesTab from "../components/PointRulesTab";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Transaction {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  service: string;
  amount: number; // 0 = free
  date: string;
  notes?: string;
  paymentStatus: "paid" | "pending" | "free";
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: "1",
    customerId: "0912345678",
    customerName: "Nguyễn Văn An",
    customerPhone: "0912345678",
    service: "Sửa chữa laptop",
    amount: 500000,
    date: "2024-03-20",
    paymentStatus: "paid",
    notes: "Thay màn hình, bàn phím",
  },
  {
    id: "2",
    customerId: "0987654321",
    customerName: "Trần Thị Bình",
    customerPhone: "0987654321",
    service: "Cài đặt phần mềm",
    amount: 0,
    date: "2024-03-15",
    paymentStatus: "free",
    notes: "Hỗ trợ miễn phí cho sinh viên",
  },
  {
    id: "3",
    customerId: "0976543210",
    customerName: "Phạm Minh Dũng",
    customerPhone: "0976543210",
    service: "Nâng cấp RAM",
    amount: 800000,
    date: "2024-03-25",
    paymentStatus: "paid",
  },
  {
    id: "4",
    customerId: "0901234567",
    customerName: "Lê Hoàng Cường",
    customerPhone: "0901234567",
    service: "Vệ sinh laptop",
    amount: 150000,
    date: "2024-03-10",
    paymentStatus: "pending",
  },
  {
    id: "5",
    customerId: "0965432109",
    customerName: "Hoàng Thị Vy",
    customerPhone: "0965432109",
    service: "Sửa nguồn laptop",
    amount: 350000,
    date: "2024-03-12",
    paymentStatus: "paid",
  },
];

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Finance() {
  const [activeTab, setActiveTab] = useState<"transactions" | "services" | "discounts" | "point_rules">("transactions");
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [services, setServices] = useState<ServiceData[]>([]);
  const [discounts, setDiscounts] = useState<DiscountCode[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [editingService, setEditingService] = useState<ServiceData | null>(null);
  const [editingDiscount, setEditingDiscount] = useState<DiscountCode | null>(null);

  // Pagination per tab
  const txPag = usePagination(10);
  const svcPag = usePagination(10);
  const discPag = usePagination(10);

  // Load services and discounts from localStorage
  useEffect(() => {
    setServices(getServices());
    setDiscounts(getDiscounts());
  }, []);

  // Date filter state
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Transaction form state
  const [formData, setFormData] = useState({
    customerPhone: "",
    customerName: "",
    service: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    paymentStatus: "paid" as "paid" | "pending" | "free",
    notes: "",
  });

  // Service form state
  const [serviceFormData, setServiceFormData] = useState({
    name: "",
    price: "",
  });

  // Discount form state
  const [discountFormData, setDiscountFormData] = useState({
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

  // Helper function to check if date is in range
  const isInDateRange = (dateStr: string, start: string, end: string) => {
    if (!start && !end) return true;
    const date = new Date(dateStr);
    const startDt = start ? new Date(start) : null;
    const endDt = end ? new Date(end) : null;

    if (startDt && endDt) {
      return date >= startDt && date <= endDt;
    } else if (startDt) {
      return date >= startDt;
    } else if (endDt) {
      return date <= endDt;
    }
    return true;
  };

  // Stats with date filter
  const stats = useMemo(() => {
    const filtered = transactions.filter((t) => isInDateRange(t.date, startDate, endDate));

    const totalRevenue = filtered
      .filter((t) => t.paymentStatus === "paid")
      .reduce((sum, t) => sum + t.amount, 0);

    const pendingRevenue = filtered
      .filter((t) => t.paymentStatus === "pending")
      .reduce((sum, t) => sum + t.amount, 0);

    const paidCustomers = new Set(
      filtered.filter((t) => t.amount > 0).map((t) => t.customerId)
    ).size;

    const freeCustomers = new Set(
      filtered.filter((t) => t.amount === 0).map((t) => t.customerId)
    ).size;

    const totalTransactions = filtered.length;

    return { totalRevenue, pendingRevenue, paidCustomers, freeCustomers, totalTransactions };
  }, [transactions, startDate, endDate]);

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
          t.customerPhone.includes(q) ||
          t.service.toLowerCase().includes(q)
      );
    }

    return result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [transactions, searchQuery, startDate, endDate]);

  const pagedTransactions = txPag.paginate(filteredTransactions);

  // Filtered services
  const filteredServices = useMemo(() => {
    if (!searchQuery.trim()) return services;
    const q = searchQuery.toLowerCase();
    return services.filter((s) => s.name.toLowerCase().includes(q));
  }, [services, searchQuery]);

  const pagedServices = svcPag.paginate(filteredServices);

  // Filtered discounts
  const filteredDiscounts = useMemo(() => {
    if (!searchQuery.trim()) return discounts;
    const q = searchQuery.toLowerCase();
    return discounts.filter((d) =>
      d.code.toLowerCase().includes(q) ||
      d.description?.toLowerCase().includes(q)
    );
  }, [discounts, searchQuery]);

  const pagedDiscounts = discPag.paginate(filteredDiscounts);

  // Reset date filter
  const handleResetDateFilter = () => {
    setStartDate("");
    setEndDate("");
  };

  // Transaction handlers
  const handleOpenModal = (transaction?: Transaction) => {
    if (transaction) {
      setEditingTransaction(transaction);
      setFormData({
        customerPhone: transaction.customerPhone,
        customerName: transaction.customerName,
        service: transaction.service,
        amount: transaction.amount.toString(),
        date: transaction.date,
        paymentStatus: transaction.paymentStatus,
        notes: transaction.notes || "",
      });
    } else {
      setEditingTransaction(null);
      setFormData({
        customerPhone: "",
        customerName: "",
        service: "",
        amount: "",
        date: new Date().toISOString().split("T")[0],
        paymentStatus: "paid",
        notes: "",
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingTransaction(null);
    setFormData({
      customerPhone: "",
      customerName: "",
      service: "",
      amount: "",
      date: new Date().toISOString().split("T")[0],
      paymentStatus: "paid",
      notes: "",
    });
  };

  const handleSave = () => {
    if (
      !formData.customerPhone.trim() ||
      !formData.customerName.trim() ||
      !formData.service.trim()
    ) {
      alert("Vui lòng nhập đầy đủ thông tin khách hàng và dịch vụ");
      return;
    }

    const amount = parseFloat(formData.amount) || 0;
    const paymentStatus = amount === 0 ? "free" : formData.paymentStatus;

    if (editingTransaction) {
      setTransactions((prev) =>
        prev.map((t) =>
          t.id === editingTransaction.id
            ? {
                ...t,
                service: formData.service,
                amount,
                date: formData.date,
                paymentStatus,
                notes: formData.notes || undefined,
              }
            : t
        )
      );
    } else {
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        customerId: formData.customerPhone,
        customerName: formData.customerName,
        customerPhone: formData.customerPhone,
        service: formData.service,
        amount,
        date: formData.date,
        paymentStatus,
        notes: formData.notes || undefined,
      };
      setTransactions((prev) => [newTransaction, ...prev]);
    }
    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    if (confirm("Bạn có chắc muốn xoá giao dịch này?")) {
      setTransactions((prev) => prev.filter((t) => t.id !== id));
    }
  };

  // Service handlers
  const handleOpenServiceModal = (service?: ServiceData) => {
    if (service) {
      setEditingService(service);
      setServiceFormData({
        name: service.name,
        price: service.price.toString(),
      });
    } else {
      setEditingService(null);
      setServiceFormData({
        name: "",
        price: "",
      });
    }
    setShowServiceModal(true);
  };

  const handleCloseServiceModal = () => {
    setShowServiceModal(false);
    setEditingService(null);
    setServiceFormData({
      name: "",
      price: "",
    });
  };

  const handleSaveService = () => {
    if (!serviceFormData.name.trim()) {
      alert("Vui lòng nhập tên dịch vụ");
      return;
    }

    const price = parseFloat(serviceFormData.price) || 0;

    if (editingService) {
      const updated = services.map((s) =>
        s.id === editingService.id
          ? { ...s, name: serviceFormData.name, price }
          : s
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
    handleCloseServiceModal();
  };

  const handleDeleteService = (id: string) => {
    if (confirm("Bạn có chắc muốn xoá dịch vụ này?")) {
      const updated = services.filter((s) => s.id !== id);
      setServices(updated);
      saveServices(updated);
    }
  };

  // Discount handlers
  const handleOpenDiscountModal = (discount?: DiscountCode) => {
    if (discount) {
      setEditingDiscount(discount);
      setDiscountFormData({
        code: discount.code,
        discountPercent: discount.discountPercent.toString(),
        maxDiscount: discount.maxDiscount.toString(),
        usageLimit: discount.usageLimit.toString(),
        validFrom: discount.validFrom,
        validUntil: discount.validUntil,
        description: discount.description || "",
        isRedeemable: discount.isRedeemable || false,
        pointsRequired: discount.pointsRequired?.toString() || "",
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
  };

  const handleCloseDiscountModal = () => {
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
  };

  const handleSaveDiscount = () => {
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

    // Validation for redeemable discounts
    if (discountFormData.isRedeemable) {
      const pointsRequired = parseInt(discountFormData.pointsRequired) || 0;
      if (pointsRequired <= 0) {
        alert("Vui lòng nhập số điểm yêu cầu để đổi mã");
        return;
      }
    }

    // Check if code already exists (for new discounts only)
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
    handleCloseDiscountModal();
  };

  const handleDeleteDiscount = (id: string) => {
    if (confirm("Bạn có chắc muốn xoá mã giảm giá này?")) {
      const updated = discounts.filter((d) => d.id !== id);
      setDiscounts(updated);
      saveDiscounts(updated);
    }
  };

  const formatCurrency = (amount: number) => formatCurr(amount);

  const getStatusBadge = (status: Transaction["paymentStatus"]) => {
    switch (status) {
      case "paid":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
            Đã thanh toán
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700">
            Chờ thanh toán
          </span>
        );
      case "free":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
            Miễn phí
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Quản lý Tài chính</h1>
            <p className="text-sm text-gray-500 mt-1">
              Theo dõi dịch vụ và doanh thu từ khách hàng
            </p>
          </div>
          {activeTab !== "point_rules" && (
            <button
              onClick={() =>
                activeTab === "transactions"
                  ? handleOpenModal()
                  : activeTab === "services"
                  ? handleOpenServiceModal()
                  : handleOpenDiscountModal()
              }
              className="flex items-center gap-2 px-4 py-2.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors shadow-sm"
            >
              <Plus size={18} />
              {activeTab === "transactions"
                ? "Thêm giao dịch"
                : activeTab === "services"
                ? "Thêm dịch vụ"
                : "Thêm mã giảm giá"}
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("transactions")}
              className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === "transactions"
                  ? "border-b-2 border-orange-500 text-orange-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <FileText size={16} />
              Giao dịch
            </button>
            <button
              onClick={() => setActiveTab("services")}
              className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === "services"
                  ? "border-b-2 border-orange-500 text-orange-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Settings size={16} />
              Quản lý Dịch vụ
            </button>
            <button
              onClick={() => setActiveTab("discounts")}
              className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === "discounts"
                  ? "border-b-2 border-orange-500 text-orange-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Ticket size={16} />
              Mã giảm giá
            </button>
            <button
              onClick={() => setActiveTab("point_rules")}
              className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === "point_rules"
                  ? "border-b-2 border-orange-500 text-orange-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Award size={16} />
              Quy tắc điểm
            </button>
          </div>
        </div>

        {/* Transactions Tab */}
        {activeTab === "transactions" && (
          <>
            {/* Date Filter */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-gray-600">
                  <CalendarRange size={18} className="text-orange-500" />
                  <span className="text-sm font-medium">Lọc theo thời gian:</span>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all"
                  />
                  <span className="text-gray-400 text-sm">đến</span>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all"
                  />

                  {(startDate || endDate) && (
                    <button
                      onClick={handleResetDateFilter}
                      className="ml-2 px-3 py-1.5 text-sm text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                    >
                      Xóa bộ lọc
                    </button>
                  )}
                </div>

                {(startDate || endDate) && (
                  <div className="ml-auto">
                    <span className="text-xs text-gray-500 bg-orange-50 px-3 py-1.5 rounded-full">
                      {startDate && endDate
                        ? `${new Date(startDate).toLocaleDateString("vi-VN")} - ${new Date(
                            endDate
                          ).toLocaleDateString("vi-VN")}`
                        : startDate
                        ? `Từ ${new Date(startDate).toLocaleDateString("vi-VN")}`
                        : `Đến ${new Date(endDate).toLocaleDateString("vi-VN")}`}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">Doanh thu</p>
                    <p className="text-xl font-bold text-gray-900 mt-1">
                      {formatCurrency(stats.totalRevenue)}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center">
                    <DollarSign size={24} className="text-green-500" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">Chờ thu</p>
                    <p className="text-xl font-bold text-gray-900 mt-1">
                      {formatCurrency(stats.pendingRevenue)}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-yellow-50 flex items-center justify-center">
                    <TrendingUp size={24} className="text-yellow-500" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">KH trả phí</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stats.paidCustomers}</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                    <CreditCard size={24} className="text-blue-500" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">KH miễn phí</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stats.freeCustomers}</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center">
                    <Users size={24} className="text-purple-500" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">Tổng giao dịch</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {stats.totalTransactions}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-orange-50 flex items-center justify-center">
                    <FileText size={24} className="text-orange-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* Search */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Tìm kiếm theo tên, số điện thoại, dịch vụ..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all"
                />
              </div>
            </div>

            {/* Transactions Table */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                        Ngày
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                        Khách hàng
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                        Dịch vụ
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                        Số tiền
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                        Trạng thái
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wide">
                        Thao tác
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {pagedTransactions.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-4 py-12 text-center">
                          <div className="flex flex-col items-center gap-2">
                            <FileText size={32} className="text-gray-300" />
                            <p className="text-sm text-gray-500">
                              {searchQuery
                                ? "Không tìm thấy giao dịch nào"
                                : "Chưa có giao dịch nào"}
                            </p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      pagedTransactions.map((transaction) => (
                        <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3">
                            <span className="text-sm text-gray-900">
                              {new Date(transaction.date).toLocaleDateString("vi-VN")}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-gray-900">
                                {transaction.customerName}
                              </span>
                              <span className="text-xs text-gray-400">
                                {transaction.customerPhone}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex flex-col">
                              <span className="text-sm text-gray-900">{transaction.service}</span>
                              {transaction.notes && (
                                <span className="text-xs text-gray-400 line-clamp-1">
                                  {transaction.notes}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`text-sm font-semibold ${
                                transaction.amount === 0
                                  ? "text-blue-600"
                                  : transaction.paymentStatus === "paid"
                                  ? "text-green-600"
                                  : "text-yellow-600"
                              }`}
                            >
                              {transaction.amount === 0
                                ? "Miễn phí"
                                : formatCurrency(transaction.amount)}
                            </span>
                          </td>
                          <td className="px-4 py-3">{getStatusBadge(transaction.paymentStatus)}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleOpenModal(transaction)}
                                className="p-1.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-orange-600 transition-colors"
                                title="Chỉnh sửa"
                              >
                                <Pencil size={16} />
                              </button>
                              <button
                                onClick={() => handleDelete(transaction.id)}
                                className="p-1.5 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
                                title="Xoá"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              <div className="px-4 pb-3 border-t border-gray-100">
                <Pagination
                  total={filteredTransactions.length}
                  page={txPag.page}
                  pageSize={txPag.pageSize}
                  onPageChange={txPag.handlePageChange}
                  onPageSizeChange={txPag.handlePageSizeChange}
                />
              </div>
            </div>
          </>
        )}

        {/* Services Tab */}
        {activeTab === "services" && (
          <>
            {/* Search */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Tìm kiếm dịch vụ..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all"
                />
              </div>
            </div>

            {/* Services Table */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                        STT
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                        Tên dịch vụ
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                        Giá tiền
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wide">
                        Thao tác
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {pagedServices.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-4 py-12 text-center">
                          <div className="flex flex-col items-center gap-2">
                            <Settings size={32} className="text-gray-300" />
                            <p className="text-sm text-gray-500">
                              {searchQuery ? "Không tìm thấy dịch vụ nào" : "Chưa có dịch vụ nào"}
                            </p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      pagedServices.map((service, index) => (
                        <tr key={service.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3">
                            <span className="text-sm text-gray-500">
                              {(svcPag.page - 1) * svcPag.pageSize + index + 1}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-sm font-medium text-gray-900">
                              {service.name}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`text-sm font-semibold ${
                                service.price === 0 ? "text-blue-600" : "text-green-600"
                              }`}
                            >
                              {service.price === 0 ? "Miễn phí" : formatCurrency(service.price)}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleOpenServiceModal(service)}
                                className="p-1.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-orange-600 transition-colors"
                                title="Chỉnh sửa"
                              >
                                <Pencil size={16} />
                              </button>
                              <button
                                onClick={() => handleDeleteService(service.id)}
                                className="p-1.5 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
                                title="Xoá"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              <div className="px-4 pb-3 border-t border-gray-100">
                <Pagination
                  total={filteredServices.length}
                  page={svcPag.page}
                  pageSize={svcPag.pageSize}
                  onPageChange={svcPag.handlePageChange}
                  onPageSizeChange={svcPag.handlePageSizeChange}
                />
              </div>
            </div>
          </>
        )}

        {/* Discounts Tab */}
        {activeTab === "discounts" && (
          <>
            {/* Search */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Tìm kiếm mã giảm giá..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all"
                />
              </div>
            </div>

            {/* Discounts Table */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                        Mã
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                        Giảm giá
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                        Giảm tối đa
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                        Sử dụng
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                        Thời gian
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                        Trạng thái
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wide">
                        Thao tác
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {pagedDiscounts.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-4 py-12 text-center">
                          <div className="flex flex-col items-center gap-2">
                            <Ticket size={32} className="text-gray-300" />
                            <p className="text-sm text-gray-500">
                              {searchQuery ? "Không tìm thấy mã giảm giá nào" : "Chưa có mã giảm giá nào"}
                            </p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      pagedDiscounts.map((discount) => {
                        const now = new Date();
                        const validFrom = new Date(discount.validFrom);
                        const validUntil = new Date(discount.validUntil);
                        const isActive = now >= validFrom && now <= validUntil;
                        const isExpired = now > validUntil;
                        const isUpcoming = now < validFrom;
                        const isAvailable = isActive && discount.usageCount < discount.usageLimit;

                        return (
                          <tr key={discount.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3">
                              <div className="flex flex-col gap-1">
                                <span className="text-sm font-bold text-orange-600 font-mono">
                                  {discount.code}
                                </span>
                                <div className="flex items-center gap-2">
                                  {discount.description && (
                                    <span className="text-xs text-gray-400">
                                      {discount.description}
                                    </span>
                                  )}
                                  {discount.isRedeemable && discount.pointsRequired && (
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                      <Star size={10} className="fill-yellow-500" />
                                      {discount.pointsRequired} điểm
                                    </span>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <span className="text-sm font-semibold text-gray-900">
                                {discount.discountPercent}%
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <span className="text-sm font-semibold text-green-600">
                                {formatCurrency(discount.maxDiscount)}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex flex-col">
                                <span className="text-sm text-gray-900">
                                  {discount.usageCount}/{discount.usageLimit}
                                </span>
                                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                                  <div
                                    className={`h-1.5 rounded-full ${
                                      discount.usageCount >= discount.usageLimit
                                        ? "bg-red-500"
                                        : "bg-orange-500"
                                    }`}
                                    style={{
                                      width: `${Math.min(
                                        (discount.usageCount / discount.usageLimit) * 100,
                                        100
                                      )}%`,
                                    }}
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex flex-col text-xs text-gray-600">
                                <span>Từ: {new Date(discount.validFrom).toLocaleDateString("vi-VN")}</span>
                                <span>Đến: {new Date(discount.validUntil).toLocaleDateString("vi-VN")}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              {isAvailable ? (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                                  Khả dụng
                                </span>
                              ) : isExpired ? (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-50 text-gray-500">
                                  Hết hạn
                                </span>
                              ) : isUpcoming ? (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                                  Sắp tới
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700">
                                  Hết lượt
                                </span>
                              )}
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => handleOpenDiscountModal(discount)}
                                  className="p-1.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-orange-600 transition-colors"
                                  title="Chỉnh sửa"
                                >
                                  <Pencil size={16} />
                                </button>
                                <button
                                  onClick={() => handleDeleteDiscount(discount.id)}
                                  className="p-1.5 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
                                  title="Xoá"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
              <div className="px-4 pb-3 border-t border-gray-100">
                <Pagination
                  total={filteredDiscounts.length}
                  page={discPag.page}
                  pageSize={discPag.pageSize}
                  onPageChange={discPag.handlePageChange}
                  onPageSizeChange={discPag.handlePageSizeChange}
                />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Transaction Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                {editingTransaction ? "Chỉnh sửa giao dịch" : "Thêm giao dịch mới"}
              </h2>
              <button
                onClick={handleCloseModal}
                className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.customerPhone}
                    onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                    disabled={!!editingTransaction}
                    placeholder="0912345678"
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 disabled:bg-gray-50 disabled:cursor-not-allowed transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tên khách hàng <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    disabled={!!editingTransaction}
                    placeholder="Nguyễn Văn A"
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 disabled:bg-gray-50 disabled:cursor-not-allowed transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dịch vụ <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all"
                >
                  <option value="">Chọn dịch vụ</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.name}>
                      {service.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số tiền (VNĐ)
                  </label>
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    placeholder="0 = Miễn phí"
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all"
                  />
                  <p className="text-xs text-gray-400 mt-1">Nhập 0 để miễn phí</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ngày</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all"
                  />
                </div>
              </div>

              {parseFloat(formData.amount || "0") > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Trạng thái thanh toán
                  </label>
                  <select
                    value={formData.paymentStatus}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        paymentStatus: e.target.value as "paid" | "pending",
                      })
                    }
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all"
                  >
                    <option value="paid">Đã thanh toán</option>
                    <option value="pending">Chờ thanh toán</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ghi chú</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Mô tả chi tiết về dịch vụ..."
                  rows={3}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all resize-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
              >
                Huỷ
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-orange-500 text-white hover:bg-orange-600 transition-colors shadow-sm"
              >
                {editingTransaction ? "Cập nhật" : "Thêm mới"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Point Rules Tab */}
      {activeTab === "point_rules" && (
        <>
          <PointRulesTab />
        </>
      )}

      {/* Discount Modal */}
      {showDiscountModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                {editingDiscount ? "Chỉnh sửa mã giảm giá" : "Thêm mã giảm giá mới"}
              </h2>
              <button
                onClick={handleCloseDiscountModal}
                className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mã giảm giá <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={discountFormData.code}
                  onChange={(e) =>
                    setDiscountFormData({
                      ...discountFormData,
                      code: e.target.value.toUpperCase()
                    })
                  }
                  disabled={!!editingDiscount}
                  placeholder="VD: SAVE20, NEWCUST"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm font-mono focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 disabled:bg-gray-50 disabled:cursor-not-allowed transition-all uppercase"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Chỉ chữ, số, không dấu. Tự động viết hoa.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phần trăm giảm (%) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={discountFormData.discountPercent}
                    onChange={(e) =>
                      setDiscountFormData({ ...discountFormData, discountPercent: e.target.value })
                    }
                    placeholder="VD: 20"
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Giảm tối đa (VNĐ) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={discountFormData.maxDiscount}
                    onChange={(e) =>
                      setDiscountFormData({ ...discountFormData, maxDiscount: e.target.value })
                    }
                    placeholder="VD: 200000"
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số lượt sử dụng <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="1"
                  value={discountFormData.usageLimit}
                  onChange={(e) =>
                    setDiscountFormData({ ...discountFormData, usageLimit: e.target.value })
                  }
                  placeholder="VD: 50"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all"
                />
                <p className="text-xs text-gray-400 mt-1">Tổng số lần mã có thể được sử dụng</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ngày bắt đầu <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={discountFormData.validFrom}
                    onChange={(e) =>
                      setDiscountFormData({ ...discountFormData, validFrom: e.target.value })
                    }
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ngày kết thúc <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={discountFormData.validUntil}
                    onChange={(e) =>
                      setDiscountFormData({ ...discountFormData, validUntil: e.target.value })
                    }
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả</label>
                <textarea
                  value={discountFormData.description}
                  onChange={(e) =>
                    setDiscountFormData({ ...discountFormData, description: e.target.value })
                  }
                  placeholder="Mô tả về mã giảm giá..."
                  rows={2}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all resize-none"
                />
              </div>

              {/* Checkbox: Có thể đổi điểm */}
              <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <input
                  type="checkbox"
                  id="isRedeemable"
                  checked={discountFormData.isRedeemable}
                  onChange={(e) =>
                    setDiscountFormData({
                      ...discountFormData,
                      isRedeemable: e.target.checked,
                      pointsRequired: e.target.checked ? discountFormData.pointsRequired : "",
                    })
                  }
                  className="mt-0.5 w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                />
                <div className="flex-1">
                  <label htmlFor="isRedeemable" className="block text-sm font-medium text-gray-700 cursor-pointer">
                    Có thể đổi bằng điểm thưởng
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    Khách hàng có thể dùng điểm tích lũy để đổi mã giảm giá này
                  </p>
                </div>
              </div>

              {/* Số điểm yêu cầu (chỉ hiện nếu isRedeemable = true) */}
              {discountFormData.isRedeemable && (
                <div className="animate-fadeIn">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số điểm yêu cầu <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={discountFormData.pointsRequired}
                    onChange={(e) =>
                      setDiscountFormData({ ...discountFormData, pointsRequired: e.target.value })
                    }
                    placeholder="VD: 20"
                    min="1"
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Khách hàng cần có ít nhất số điểm này để đổi mã
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
              <button
                onClick={handleCloseDiscountModal}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
              >
                Huỷ
              </button>
              <button
                onClick={handleSaveDiscount}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-orange-500 text-white hover:bg-orange-600 transition-colors shadow-sm"
              >
                {editingDiscount ? "Cập nhật" : "Thêm mới"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Service Modal */}
      {showServiceModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                {editingService ? "Chỉnh sửa dịch vụ" : "Thêm dịch vụ mới"}
              </h2>
              <button
                onClick={handleCloseServiceModal}
                className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tên dịch vụ <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={serviceFormData.name}
                  onChange={(e) =>
                    setServiceFormData({ ...serviceFormData, name: e.target.value })
                  }
                  placeholder="VD: Sửa chữa laptop"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Giá tiền (VNĐ)
                </label>
                <input
                  type="number"
                  value={serviceFormData.price}
                  onChange={(e) =>
                    setServiceFormData({ ...serviceFormData, price: e.target.value })
                  }
                  placeholder="0 = Miễn phí"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all"
                />
                <p className="text-xs text-gray-400 mt-1">Nhập 0 nếu dịch vụ miễn phí</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
              <button
                onClick={handleCloseServiceModal}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
              >
                Huỷ
              </button>
              <button
                onClick={handleSaveService}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-orange-500 text-white hover:bg-orange-600 transition-colors shadow-sm"
              >
                {editingService ? "Cập nhật" : "Thêm mới"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
