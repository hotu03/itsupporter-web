import { useState } from "react";
import {
  Plus,
  FileText,
  Settings,
  Ticket,
  Award,
} from "lucide-react";
import { useFinance } from "../components/finance/hooks/useFinance";
import { TransactionTable } from "../components/finance/TransactionTable";
import { TransactionModal } from "../components/finance/TransactionModal";
import { ServiceTable } from "../components/finance/ServiceTable";
import { ServiceModal } from "../components/finance/ServiceModal";
import { DiscountTable } from "../components/finance/DiscountTable";
import { DiscountModal } from "../components/finance/DiscountModal";
import PointRulesTab from "../components/PointRulesTab";
import { useAuth } from "../contexts/AuthContext";
import { isAdmin } from "../data/users";

type TabType = "transactions" | "services" | "discounts" | "point_rules";

export default function Finance() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>("transactions");

  const {
    txPage,
    txPageSize,
    filteredTransactions,
    pagedTransactions,
    txStats,
    services,
    svcPage,
    svcPageSize,
    filteredServices,
    pagedServices,
    discPage,
    discPageSize,
    filteredDiscounts,
    pagedDiscounts,
    searchQuery,
    startDate,
    endDate,
    approvalFilter,
    showTransactionModal,
    editingTransaction,
    transactionFormData,
    showServiceModal,
    editingService,
    serviceFormData,
    showDiscountModal,
    editingDiscount,
    discountFormData,
    setSearchQuery,
    setStartDate,
    setEndDate,
    resetDateFilter,
    setApprovalFilter,
    setTxPage,
    setTxPageSize,
    openTransactionModal,
    closeTransactionModal,
    saveTransaction,
    deleteTransaction,
    setSvcPage,
    setSvcPageSize,
    openServiceModal,
    closeServiceModal,
    saveService,
    deleteService,
    setDiscPage,
    setDiscPageSize,
    openDiscountModal,
    closeDiscountModal,
    saveDiscount,
    deleteDiscount,
    setTransactionFormData,
    setServiceFormData,
    setDiscountFormData,
    machines,
  } = useFinance();

  const handleAdd = () => {
    if (activeTab === "transactions") {
      openTransactionModal();
    } else if (activeTab === "services") {
      openServiceModal();
    } else if (activeTab === "discounts") {
      openDiscountModal();
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
          {activeTab !== "point_rules" && isAdmin(user) && (
            <button
              onClick={handleAdd}
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

        {/* Tab Content */}
        {activeTab === "transactions" && (
          <TransactionTable
            transactions={filteredTransactions}
            filteredTransactions={filteredTransactions}
            pagedTransactions={pagedTransactions}
            stats={txStats}
            searchQuery={searchQuery}
            startDate={startDate}
            endDate={endDate}
            approvalFilter={approvalFilter}
            page={txPage}
            pageSize={txPageSize}
            machines={machines}
            onSearchChange={setSearchQuery}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
            onResetDateFilter={resetDateFilter}
            onApprovalFilterChange={setApprovalFilter}
            onPageChange={setTxPage}
            onPageSizeChange={setTxPageSize}
            onEdit={openTransactionModal}
            onDelete={deleteTransaction}
          />
        )}

        {activeTab === "services" && (
          <ServiceTable
            services={services}
            filteredServices={filteredServices}
            pagedServices={pagedServices}
            searchQuery={searchQuery}
            page={svcPage}
            pageSize={svcPageSize}
            onSearchChange={setSearchQuery}
            onPageChange={setSvcPage}
            onPageSizeChange={setSvcPageSize}
            onEdit={openServiceModal}
            onDelete={deleteService}
          />
        )}

        {activeTab === "discounts" && (
          <DiscountTable
            discounts={filteredDiscounts}
            filteredDiscounts={filteredDiscounts}
            pagedDiscounts={pagedDiscounts}
            searchQuery={searchQuery}
            page={discPage}
            pageSize={discPageSize}
            onSearchChange={setSearchQuery}
            onPageChange={setDiscPage}
            onPageSizeChange={setDiscPageSize}
            onEdit={openDiscountModal}
            onDelete={deleteDiscount}
          />
        )}

        {activeTab === "point_rules" && <PointRulesTab />}
      </div>

      {/* Modals */}
      <TransactionModal
        isOpen={showTransactionModal}
        editing={!!editingTransaction}
        formData={transactionFormData}
        services={services}
        onClose={closeTransactionModal}
        onChange={setTransactionFormData}
        onSave={saveTransaction}
      />

      <ServiceModal
        isOpen={showServiceModal}
        editing={!!editingService}
        formData={serviceFormData}
        onClose={closeServiceModal}
        onChange={setServiceFormData}
        onSave={saveService}
      />

      <DiscountModal
        isOpen={showDiscountModal}
        editing={!!editingDiscount}
        formData={discountFormData}
        onClose={closeDiscountModal}
        onChange={setDiscountFormData}
        onSave={saveDiscount}
      />
    </div>
  );
}