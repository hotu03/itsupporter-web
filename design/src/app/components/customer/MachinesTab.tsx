import { useState } from "react";
import { useNavigate } from "react-router";
import { Laptop, Calendar, X } from "lucide-react";
import CustomerMachineCard from "../CustomerMachineCard";
import type { Machine } from "../../data/machines";

interface MachinesTabProps {
  machines: Machine[];
}

export function MachinesTab({ machines }: MachinesTabProps) {
  const navigate = useNavigate();
  const [filterDate, setFilterDate] = useState<string>("");

  const filteredMachines = filterDate
    ? machines.filter((machine) => {
        const machineDate = new Date(machine.time).toISOString().split("T")[0];
        return machineDate === filterDate;
      })
    : machines;

  if (machines.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
        <Laptop className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="font-semibold text-gray-900 mb-2">Chưa có máy nào</h3>
        <p className="text-gray-600 mb-6">Bạn chưa đăng ký sửa chữa máy nào</p>
        <button
          onClick={() => navigate("/dang-ky-dich-vu")}
          className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors shadow-lg hover:shadow-xl"
        >
          <Laptop className="w-5 h-5" />
          Đăng ký sửa máy ngay
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Date Filter */}
      <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-orange-600" />
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Lọc theo ngày đăng ký
            </label>
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          {filterDate && (
            <button
              onClick={() => setFilterDate("")}
              className="mt-6 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              title="Xóa bộ lọc"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        {filterDate && (
          <div className="mt-3 flex items-center gap-2 text-sm">
            <span className="text-gray-600">Hiển thị:</span>
            <span className="font-semibold text-orange-600">
              {filteredMachines.length} máy
            </span>
            <span className="text-gray-500">vào ngày {new Date(filterDate).toLocaleDateString("vi-VN")}</span>
          </div>
        )}
      </div>

      {/* Machine List */}
      <div className="grid gap-4">
        {filteredMachines.map((machine) => (
          <CustomerMachineCard key={machine.id} machine={machine} />
        ))}
      </div>

      {/* Add new machine CTA */}
      <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-6 border-2 border-dashed border-orange-300 hover:border-orange-400 transition-all">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">Cần sửa máy khác?</h4>
            <p className="text-sm text-gray-600">Đăng ký thêm máy mới để được hỗ trợ</p>
          </div>
          <button
            onClick={() => navigate("/dang-ky-dich-vu")}
            className="px-5 py-2.5 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <Laptop className="w-4 h-4" />
            Đăng ký ngay
          </button>
        </div>
      </div>
    </div>
  );
}
