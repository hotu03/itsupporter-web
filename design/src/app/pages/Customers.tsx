import { useState, useMemo } from "react";
import {
  Search,
  Plus,
  Phone,
  User,
  Mail,
  Calendar,
  X,
  Pencil,
  Trash2,
  Monitor,
  TrendingUp,
  Users,
  UserCheck,
  CalendarRange,
  Star,
  Gift,
  History,
  Award,
} from "lucide-react";
import {
  PointHistory,
  getCustomerPointHistory,
  addPointHistory,
  formatCurrency,
} from "../data/points";
import {
  DiscountCode,
  getDiscounts,
  saveDiscounts,
} from "../data/discounts";
import { Pagination, usePagination } from "../components/Pagination";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Customer {
  phone: string; // Primary key
  name: string;
  email?: string;
  createdAt: string;
  totalRepairs: number;
  lastRepair?: string;
  notes?: string;
  points: number; // Loyalty points
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const INITIAL_CUSTOMERS: Customer[] = [
  {
    phone: "0912345678",
    name: "Nguyễn Văn An",
    email: "nva@email.com",
    createdAt: "2024-01-15",
    totalRepairs: 5,
    lastRepair: "2024-03-20",
    notes: "Khách hàng VIP, ưu tiên xử lý",
    points: 25,
  },
  {
    phone: "0987654321",
    name: "Trần Thị Bình",
    email: "ttb@email.com",
    createdAt: "2024-02-10",
    totalRepairs: 3,
    lastRepair: "2024-03-15",
    points: 15,
  },
  {
    phone: "0901234567",
    name: "Lê Hoàng Cường",
    createdAt: "2024-03-01",
    totalRepairs: 1,
    lastRepair: "2024-03-10",
    points: 5,
  },
  {
    phone: "0976543210",
    name: "Phạm Minh Dũng",
    email: "pmd@email.com",
    createdAt: "2024-01-20",
    totalRepairs: 8,
    lastRepair: "2024-03-25",
    notes: "Thường xuyên sửa laptop Dell",
    points: 40,
  },
  {
    phone: "0965432109",
    name: "Hoàng Thị Vy",
    email: "htv@email.com",
    createdAt: "2024-02-25",
    totalRepairs: 2,
    lastRepair: "2024-03-12",
    points: 10,
  },
];

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  
  // Redeem modal state
  const [showRedeemModal, setShowRedeemModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  
  // History modal state
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [historyCustomer, setHistoryCustomer] = useState<Customer | null>(null);
  
  // Date filter state
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Pagination
  const { page, pageSize, handlePageChange, handlePageSizeChange, paginate } = usePagination(10);

  // Form state
  const [formData, setFormData] = useState({
    phone: "",
    name: "",
    email: "",
    notes: "",
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
    const filtered = customers.filter((c) => 
      isInDateRange(c.createdAt, startDate, endDate)
    );
    
    const total = filtered.length;
    const active = filtered.filter((c) => 
      c.lastRepair && isInDateRange(c.lastRepair, startDate, endDate)
    ).length;
    const totalRepairs = filtered.reduce((sum, c) => sum + c.totalRepairs, 0);
    
    // Calculate "new" based on date range or current month
    let newInPeriod = 0;
    if (startDate || endDate) {
      newInPeriod = filtered.length;
    } else {
      newInPeriod = customers.filter((c) => {
        const date = new Date(c.createdAt);
        const now = new Date();
        return (
          date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
        );
      }).length;
    }

    return { total, active, totalRepairs, newInPeriod };
  }, [customers, startDate, endDate]);

  // Filtered customers with search and date
  const filteredCustomers = useMemo(() => {
    let result = customers;
    
    // Apply date filter
    if (startDate || endDate) {
      result = result.filter((c) => 
        isInDateRange(c.createdAt, startDate, endDate) ||
        (c.lastRepair && isInDateRange(c.lastRepair, startDate, endDate))
      );
    }
    
    // Apply search filter
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

  const pagedCustomers = paginate(filteredCustomers);

  // Get redeemable discounts for customer
  const getRedeemableDiscounts = (customer: Customer): DiscountCode[] => {
    const discounts = getDiscounts();
    return discounts.filter((d) => d.isRedeemable && d.pointsRequired);
  };

  // Reset date filter
  const handleResetDateFilter = () => {
    setStartDate("");
    setEndDate("");
  };

  // Customer CRUD handlers
  const handleOpenModal = (customer?: Customer) => {
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
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCustomer(null);
    setFormData({ phone: "", name: "", email: "", notes: "" });
  };

  const handleSave = () => {
    if (!formData.phone.trim() || !formData.name.trim()) {
      alert("Vui lòng nhập số điện thoại và tên khách hàng");
      return;
    }

    if (editingCustomer) {
      // Update existing
      setCustomers((prev) =>
        prev.map((c) =>
          c.phone === editingCustomer.phone
            ? {
                ...c,
                name: formData.name,
                email: formData.email || undefined,
                notes: formData.notes || undefined,
              }
            : c
        )
      );
    } else {
      // Create new
      const exists = customers.find((c) => c.phone === formData.phone);
      if (exists) {
        alert("Số điện thoại này đã tồn tại");
        return;
      }
      const newCustomer: Customer = {
        phone: formData.phone,
        name: formData.name,
        email: formData.email || undefined,
        notes: formData.notes || undefined,
        createdAt: new Date().toISOString().split("T")[0],
        totalRepairs: 0,
        points: 0,
      };
      setCustomers((prev) => [newCustomer, ...prev]);
    }
    handleCloseModal();
  };

  const handleDelete = (phone: string) => {
    if (confirm("Bạn có chắc muốn xoá khách hàng này?")) {
      setCustomers((prev) => prev.filter((c) => c.phone !== phone));
    }
  };

  // Redeem points handlers
  const handleOpenRedeemModal = (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowRedeemModal(true);
  };

  const handleCloseRedeemModal = () => {
    setShowRedeemModal(false);
    setSelectedCustomer(null);
  };

  const handleRedeem = (discount: DiscountCode) => {
    if (!selectedCustomer) return;

    // Validate
    if (selectedCustomer.points < (discount.pointsRequired || 0)) {
      alert("Không đủ điểm để đổi mã này");
      return;
    }

    if (discount.usageCount >= discount.usageLimit) {
      alert("Mã giảm giá đã hết lượt sử dụng");
      return;
    }

    // Check date validity
    const now = new Date();
    const validFrom = new Date(discount.validFrom);
    const validUntil = new Date(discount.validUntil);

    if (now < validFrom || now > validUntil) {
      alert("Mã giảm giá không còn hiệu lực");
      return;
    }

    // Subtract points from customer
    const newPoints = selectedCustomer.points - (discount.pointsRequired || 0);
    setCustomers((prev) =>
      prev.map((c) =>
        c.phone === selectedCustomer.phone
          ? { ...c, points: newPoints }
          : c
      )
    );

    // Increment usage count
    const discounts = getDiscounts();
    const updated = discounts.map((d) =>
      d.id === discount.id
        ? { ...d, usageCount: d.usageCount + 1 }
        : d
    );
    saveDiscounts(updated);

    // Save to point history
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

    // Create personal code
    const personalCode = `${discount.code}-${selectedCustomer.phone.slice(-4)}`;
    alert(`✅ Đổi điểm thành công!\n\nMã giảm giá cá nhân của bạn:\n${personalCode}\n\nĐã trừ ${discount.pointsRequired} điểm. Còn lại: ${newPoints} điểm`);

    // Update selected customer for UI
    setSelectedCustomer({ ...selectedCustomer, points: newPoints });
  };

  // History modal handlers
  const handleOpenHistoryModal = (customer: Customer) => {
    setHistoryCustomer(customer);
    setShowHistoryModal(true);
  };

  const handleCloseHistoryModal = () => {
    setShowHistoryModal(false);
    setHistoryCustomer(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Quản lý Khách hàng</h1>
            <p className="text-sm text-gray-500 mt-1">
              Danh sách và thông tin khách hàng
            </p>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 px-4 py-2.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors shadow-sm"
          >
            <Plus size={18} />
            Thêm khách hàng
          </button>
        </div>

        {/* Date Filter */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-gray-600">
              <CalendarRange size={18} className="text-orange-500" />
              <span className="text-sm font-medium">Lọc theo thời gian:</span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="relative">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all"
                />
              </div>
              
              <span className="text-gray-400 text-sm">đến</span>
              
              <div className="relative">
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all"
                />
              </div>
              
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
                    ? `${new Date(startDate).toLocaleDateString("vi-VN")} - ${new Date(endDate).toLocaleDateString("vi-VN")}`
                    : startDate
                    ? `Từ ${new Date(startDate).toLocaleDateString("vi-VN")}`
                    : `Đến ${new Date(endDate).toLocaleDateString("vi-VN")}`}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Tổng khách hàng</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                <Users size={24} className="text-blue-500" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Đã sử dụng dịch vụ</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.active}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center">
                <UserCheck size={24} className="text-green-500" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Tổng lượt sửa chữa</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.totalRepairs}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-orange-50 flex items-center justify-center">
                <Monitor size={24} className="text-orange-500" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">
                  {startDate || endDate ? "Trong khoảng thời gian" : "Mới tháng này"}
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stats.newInPeriod}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center">
                <TrendingUp size={24} className="text-purple-500" />
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
              placeholder="Tìm kiếm theo tên, số điện thoại, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Số điện thoại
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Tên khách hàng
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Lượt sửa
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Điểm
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Lần cuối
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {pagedCustomers.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <User size={32} className="text-gray-300" />
                        <p className="text-sm text-gray-500">
                          {searchQuery
                            ? "Không tìm thấy khách hàng nào"
                            : "Chưa có khách hàng nào"}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  pagedCustomers.map((customer) => (
                    <tr
                      key={customer.phone}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Phone size={14} className="text-gray-400" />
                          <span className="text-sm font-medium text-gray-900">
                            {customer.phone}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col">
                          <span className="text-sm text-gray-900">{customer.name}</span>
                          {customer.notes && (
                            <span className="text-xs text-gray-400 line-clamp-1">
                              {customer.notes}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {customer.email ? (
                          <div className="flex items-center gap-2">
                            <Mail size={14} className="text-gray-400" />
                            <span className="text-sm text-gray-600">
                              {customer.email}
                            </span>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-300">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-50 text-orange-700">
                          {customer.totalRepairs} lần
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <Star size={14} className="text-yellow-500 fill-yellow-500" />
                          <span className="text-sm font-semibold text-gray-900">
                            {customer.points}
                          </span>
                          <span className="text-xs text-gray-500">điểm</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {customer.lastRepair ? (
                          <div className="flex items-center gap-2">
                            <Calendar size={14} className="text-gray-400" />
                            <span className="text-sm text-gray-600">
                              {new Date(customer.lastRepair).toLocaleDateString("vi-VN")}
                            </span>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-300">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenRedeemModal(customer)}
                            disabled={customer.points === 0}
                            className="p-1.5 rounded-lg text-gray-600 hover:bg-yellow-50 hover:text-yellow-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                            title="Đổi điểm"
                          >
                            <Gift size={16} />
                          </button>
                          <button
                            onClick={() => handleOpenHistoryModal(customer)}
                            className="p-1.5 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                            title="Lịch sử điểm"
                          >
                            <History size={16} />
                          </button>
                          <button
                            onClick={() => handleOpenModal(customer)}
                            className="p-1.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-orange-600 transition-colors"
                            title="Chỉnh sửa"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(customer.phone)}
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
          {/* Pagination */}
          <div className="px-4 pb-3 border-t border-gray-100">
            <Pagination
              total={filteredCustomers.length}
              page={page}
              pageSize={pageSize}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
            />
          </div>
        </div>
      </div>

      {/* Edit/Create Customer Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                {editingCustomer ? "Chỉnh sửa khách hàng" : "Thêm khách hàng mới"}
              </h2>
              <button
                onClick={handleCloseModal}
                className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số điện thoại <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  disabled={!!editingCustomer}
                  placeholder="0912345678"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 disabled:bg-gray-50 disabled:cursor-not-allowed transition-all"
                />
                {editingCustomer && (
                  <p className="text-xs text-gray-400 mt-1">
                    Số điện thoại không thể thay đổi
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tên khách hàng <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Nguyễn Văn A"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="example@email.com"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ghi chú
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Ghi chú về khách hàng..."
                  rows={3}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all resize-none"
                />
              </div>
            </div>

            {/* Footer */}
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
                {editingCustomer ? "Cập nhật" : "Thêm mới"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Redeem Points Modal */}
      {showRedeemModal && selectedCustomer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Đổi điểm thưởng</h2>
                <p className="text-sm text-gray-500 mt-0.5">{selectedCustomer.name}</p>
              </div>
              <button
                onClick={handleCloseRedeemModal}
                className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Current Points */}
            <div className="px-6 py-4 bg-gradient-to-r from-yellow-50 to-orange-50 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <Award size={24} className="text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Điểm hiện tại</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {selectedCustomer.points} <span className="text-base font-normal text-gray-500">điểm</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Redeemable Codes */}
            <div className="p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Mã giảm giá có thể đổi</h3>
              <div className="space-y-3">
                {getRedeemableDiscounts(selectedCustomer).length === 0 ? (
                  <div className="text-center py-8">
                    <Gift size={32} className="text-gray-300 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Chưa có mã giảm giá nào để đổi</p>
                    <p className="text-xs text-gray-400 mt-1">Vui lòng thêm mã giảm giá đổi điểm trong trang Tài chính</p>
                  </div>
                ) : (
                  getRedeemableDiscounts(selectedCustomer).map((discount) => {
                    const canRedeem = selectedCustomer.points >= (discount.pointsRequired || 0);
                    const isAvailable = discount.usageCount < discount.usageLimit;
                    const now = new Date();
                    const validFrom = new Date(discount.validFrom);
                    const validUntil = new Date(discount.validUntil);
                    const isValid = now >= validFrom && now <= validUntil;
                    const isEnabled = canRedeem && isAvailable && isValid;

                    return (
                      <div
                        key={discount.id}
                        className={`border rounded-xl p-4 transition-all ${
                          isEnabled
                            ? "border-orange-200 bg-orange-50/50"
                            : "border-gray-200 bg-gray-50/50 opacity-60"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-mono font-bold text-orange-600">
                                {discount.code}
                              </span>
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                <Star size={12} className="fill-yellow-500 text-yellow-500" />
                                {discount.pointsRequired} điểm
                              </span>
                            </div>
                            {discount.description && (
                              <p className="text-sm text-gray-600 mb-2">{discount.description}</p>
                            )}
                            <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                              <span>Giảm {discount.discountPercent}%</span>
                              <span>Tối đa {formatCurrency(discount.maxDiscount)}</span>
                              <span>Còn {discount.usageLimit - discount.usageCount}/{discount.usageLimit} lượt</span>
                            </div>
                            {!isValid && (
                              <p className="text-xs text-red-500 mt-2">
                                {now < validFrom
                                  ? `Chưa có hiệu lực (từ ${validFrom.toLocaleDateString("vi-VN")})`
                                  : `Đã hết hạn (đến ${validUntil.toLocaleDateString("vi-VN")})`}
                              </p>
                            )}
                            {!isAvailable && isValid && (
                              <p className="text-xs text-red-500 mt-2">Đã hết lượt sử dụng</p>
                            )}
                          </div>
                          <button
                            onClick={() => handleRedeem(discount)}
                            disabled={!isEnabled}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                              isEnabled
                                ? "bg-orange-500 text-white hover:bg-orange-600 shadow-sm"
                                : "bg-gray-200 text-gray-400 cursor-not-allowed"
                            }`}
                          >
                            <Gift size={16} />
                            {canRedeem ? "Đổi ngay" : "Chưa đủ điểm"}
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
              <button
                onClick={handleCloseRedeemModal}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Point History Modal */}
      {showHistoryModal && historyCustomer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Lịch sử điểm thưởng</h2>
                <p className="text-sm text-gray-500 mt-0.5">
                  {historyCustomer.name} - {historyCustomer.phone}
                </p>
              </div>
              <button
                onClick={handleCloseHistoryModal}
                className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Current Points Banner */}
            <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <Star size={24} className="text-yellow-500 fill-yellow-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tổng điểm hiện tại</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {historyCustomer.points} <span className="text-base font-normal text-gray-500">điểm</span>
                  </p>
                </div>
              </div>
            </div>

            {/* History List */}
            <div className="p-6">
              {(() => {
                const history = getCustomerPointHistory(historyCustomer.phone);
                if (history.length === 0) {
                  return (
                    <div className="text-center py-12">
                      <History size={32} className="text-gray-300 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">Chưa có lịch sử điểm</p>
                    </div>
                  );
                }

                return (
                  <div className="space-y-3">
                    {history.map((entry) => (
                      <div
                        key={entry.id}
                        className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                      >
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                            entry.type === "earn"
                              ? "bg-green-50"
                              : "bg-red-50"
                          }`}
                        >
                          {entry.type === "earn" ? (
                            <TrendingUp size={20} className="text-green-600" />
                          ) : (
                            <Gift size={20} className="text-red-600" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <p className="text-sm font-medium text-gray-900">
                              {entry.description}
                            </p>
                            <span
                              className={`text-sm font-bold whitespace-nowrap ${
                                entry.type === "earn"
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {entry.type === "earn" ? "+" : ""}
                              {entry.points} điểm
                            </span>
                          </div>
                          <p className="text-xs text-gray-500">
                            {new Date(entry.date).toLocaleString("vi-VN", {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
              <button
                onClick={handleCloseHistoryModal}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}