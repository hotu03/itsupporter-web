import { Search, Plus } from "lucide-react";
import { useCustomers } from "../components/customers/hooks/useCustomers";
import { DateFilterBar } from "../components/customers/DateFilterBar";
import { StatsCards } from "../components/customers/StatsCards";
import { CustomerTable } from "../components/customers/CustomerTable";
import { CustomerFormModal } from "../components/customers/CustomerFormModal";
import { RedeemModal } from "../components/customers/RedeemModal";
import { HistoryModal } from "../components/customers/HistoryModal";
import { usePagination } from "../components/Pagination";
import { useAuth } from "../contexts/AuthContext";
import { isAdmin } from "../data/users";

export default function Customers() {
  const { user } = useAuth();
  const {
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
    setSearchQuery,
    setStartDate,
    setEndDate,
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
    setFormData,
  } = useCustomers();

  const { page, pageSize, handlePageChange, handlePageSizeChange } = usePagination(10);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Đang tải...</p>
      </div>
    );
  }

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
          {isAdmin(user) && (
            <button
              onClick={() => openForm()}
              className="flex items-center gap-2 px-4 py-2.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors shadow-sm"
            >
              <Plus size={18} />
              Thêm khách hàng
            </button>
          )}
        </div>

        {/* Date Filter */}
        <DateFilterBar
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          onReset={resetDateFilter}
        />

        {/* Stats */}
        <StatsCards
          stats={stats}
          isFiltered={!!(startDate || endDate)}
        />

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
        <CustomerTable
          customers={pagedCustomers}
          searchQuery={searchQuery}
          page={page}
          pageSize={pageSize}
          total={filteredCustomers.length}
          onEdit={openForm}
          onDelete={handleDelete}
          onRedeem={openRedeem}
          onHistory={openHistory}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      </div>

      {/* Modals */}
      <CustomerFormModal
        isOpen={showForm}
        customer={editingCustomer}
        formData={formData}
        onClose={closeForm}
        onSave={handleSave}
        onFormChange={setFormData}
      />

      <RedeemModal
        customer={selectedCustomer}
        isOpen={showRedeem}
        onClose={closeRedeem}
        onRedeem={handleRedeem}
      />

      <HistoryModal
        customer={historyCustomer}
        isOpen={showHistory}
        onClose={closeHistory}
      />
    </div>
  );
}
