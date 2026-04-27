import { useState, useMemo, useEffect } from "react";
import {
  Search,
  X,
  Pencil,
  Trash2,
  ToggleRight,
  ToggleLeft,
  Award,
  TrendingUp,
  Plus,
} from "lucide-react";
import {
  PointRule,
  formatCurrency,
} from "../data/points";
import { getFirestorePointRules, saveFirestorePointRules } from "../data/firestorePoints";
import { Pagination, usePagination } from "./Pagination";

export default function PointRulesTab() {
  const [rules, setRules] = useState<PointRule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFirestorePointRules()
      .then(setRules)
      .catch(err => {
        console.error("Error loading point rules:", err);
        setRules([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingRule, setEditingRule] = useState<PointRule | null>(null);
  const {
    page,
    pageSize,
    handlePageChange,
    handlePageSizeChange,
    paginate,
  } = usePagination(10);

  const [formData, setFormData] = useState({
    name: "",
    type: "per_order" as "per_order" | "amount_threshold",
    points: "",
    threshold: "",
    description: "",
  });

  const filteredRules = useMemo(() => {
    if (!searchQuery.trim()) return rules;
    const q = searchQuery.toLowerCase();
    return rules.filter((rule) =>
      rule.name.toLowerCase().includes(q) || rule.description?.toLowerCase().includes(q)
    );
  }, [rules, searchQuery]);

  const pagedRules = paginate(filteredRules);

  const handleOpenModal = (rule?: PointRule) => {
    if (rule) {
      setEditingRule(rule);
      setFormData({
        name: rule.name,
        type: rule.type,
        points: rule.points.toString(),
        threshold: rule.threshold?.toString() || "",
        description: rule.description || "",
      });
    } else {
      setEditingRule(null);
      setFormData({
        name: "",
        type: "per_order",
        points: "",
        threshold: "",
        description: "",
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingRule(null);
    setFormData({
      name: "",
      type: "per_order",
      points: "",
      threshold: "",
      description: "",
    });
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      alert("Vui lòng nhập tên quy tắc");
      return;
    }

    const points = parseInt(formData.points) || 0;
    if (points <= 0) {
      alert("Số điểm phải lớn hơn 0");
      return;
    }

    if (formData.type === "amount_threshold") {
      const threshold = parseFloat(formData.threshold) || 0;
      if (threshold <= 0) {
        alert("Ngưỡng tiền phải lớn hơn 0");
        return;
      }
    }

    if (editingRule) {
      const updated = rules.map((rule) =>
        rule.id === editingRule.id
          ? {
              ...rule,
              name: formData.name,
              type: formData.type,
              points,
              threshold:
                formData.type === "amount_threshold"
                  ? parseFloat(formData.threshold)
                  : undefined,
              description: formData.description || undefined,
            }
          : rule
      );
      setRules(updated);
      await saveFirestorePointRules(updated);
    } else {
      const newRule: PointRule = {
        id: Date.now().toString(),
        name: formData.name,
        type: formData.type,
        points,
        threshold:
          formData.type === "amount_threshold"
            ? parseFloat(formData.threshold)
            : undefined,
        enabled: true,
        description: formData.description || undefined,
      };
      const updated = [...rules, newRule];
      setRules(updated);
      await saveFirestorePointRules(updated);
    }
    handleCloseModal();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Bạn có chắc muốn xoá quy tắc này?")) {
      const updated = rules.filter((rule) => rule.id !== id);
      setRules(updated);
      await saveFirestorePointRules(updated);
    }
  };

  const handleToggle = async (id: string) => {
    const updated = rules.map((rule) =>
      rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
    );
    setRules(updated);
    await saveFirestorePointRules(updated);
  };

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Tìm kiếm quy tắc..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all"
            />
          </div>

          <button
            onClick={() => handleOpenModal()}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-sm font-semibold bg-orange-500 text-white hover:bg-orange-600 transition-colors"
          >
            <Plus size={16} />
            Thêm quy tắc
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Quy tắc
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Loại
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Điểm
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Điều kiện
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Trạng thái
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <Award size={32} className="text-gray-300 animate-pulse" />
                      <p className="text-sm text-gray-500">Đang tải...</p>
                    </div>
                  </td>
                </tr>
              ) : pagedRules.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <Award size={32} className="text-gray-300" />
                      <p className="text-sm text-gray-500">
                        {searchQuery
                          ? "Không tìm thấy quy tắc nào"
                          : "Chưa có quy tắc nào"}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                pagedRules.map((rule) => (
                  <tr key={rule.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900">
                          {rule.name}
                        </span>
                        {rule.description && (
                          <span className="text-xs text-gray-400">
                            {rule.description}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {rule.type === "per_order" ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                          Mỗi đơn hàng
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-700">
                          Theo ngưỡng tiền
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <TrendingUp size={14} className="text-green-500" />
                        <span className="text-sm font-semibold text-green-600">
                          +{rule.points} điểm
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {rule.threshold ? (
                        <span className="text-sm text-gray-600">
                          ≥ {formatCurrency(rule.threshold)}
                        </span>
                      ) : (
                        <span className="text-sm text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => handleToggle(rule.id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          rule.enabled
                            ? "bg-green-50 text-green-700 hover:bg-green-100"
                            : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                        }`}
                      >
                        {rule.enabled ? (
                          <>
                            <ToggleRight size={16} />
                            Đang bật
                          </>
                        ) : (
                          <>
                            <ToggleLeft size={16} />
                            Đã tắt
                          </>
                        )}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenModal(rule)}
                          className="p-1.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-orange-600 transition-colors"
                          title="Chỉnh sửa"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(rule.id)}
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
            total={filteredRules.length}
            page={page}
            pageSize={pageSize}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                {editingRule ? "Chỉnh sửa quy tắc" : "Thêm quy tắc mới"}
              </h2>
              <button
                onClick={handleCloseModal}
                className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tên quy tắc <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="VD: Đơn hàng trên 100K"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loại quy tắc <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      type: e.target.value as "per_order" | "amount_threshold",
                    })
                  }
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all"
                >
                  <option value="per_order">Mỗi đơn hàng</option>
                  <option value="amount_threshold">Theo ngưỡng tiền</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  {formData.type === "per_order"
                    ? "Cộng điểm cho mỗi đơn hàng, không phụ thuộc số tiền"
                    : "Cộng điểm khi đơn hàng đạt ngưỡng tiền nhất định"}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số điểm cộng <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.points}
                  onChange={(e) => setFormData({ ...formData, points: e.target.value })}
                  placeholder="VD: 5"
                  min="1"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all"
                />
              </div>

              {formData.type === "amount_threshold" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ngưỡng tiền (VND) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.threshold}
                    onChange={(e) =>
                      setFormData({ ...formData, threshold: e.target.value })
                    }
                    placeholder="VD: 100000"
                    min="1"
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Đơn hàng phải lớn hơn hoặc bằng giá trị này
                  </p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mô tả
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Mô tả chi tiết về quy tắc..."
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
                {editingRule ? "Cập nhật" : "Thêm mới"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
