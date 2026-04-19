import { useState } from "react";
import { Cpu, FlaskConical } from "lucide-react";
import type { Member } from "../../../data/members";
import type { PersonnelStats } from "./hooks/useDashboardData";

interface TopPersonnelProps {
  topTechnicians: Member[];
  topTesters: Member[];
  pendingMembers: Member[];
  personnelStats: PersonnelStats;
}

export function TopPersonnel({ topTechnicians, topTesters, pendingMembers, personnelStats }: TopPersonnelProps) {
  const [activeTab, setActiveTab] = useState<"technician" | "tester">("technician");
  const list = activeTab === "technician" ? topTechnicians : topTesters;

  return (
    <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
        <div>
          <h2 className="text-gray-800" style={{ fontWeight: 600, fontSize: "0.875rem" }}>Thành viên nổi bật</h2>
          <p className="text-gray-400 text-xs mt-0.5">Personnel · {personnelStats.totalApproved} thành viên</p>
        </div>
        <div className="flex bg-gray-100 rounded-lg p-0.5">
          <button
            onClick={() => setActiveTab("technician")}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${activeTab === "technician" ? "bg-white shadow-sm text-orange-500" : "text-gray-400 hover:text-gray-600"}`}
          >
            <Cpu size={11} /> Tech
          </button>
          <button
            onClick={() => setActiveTab("tester")}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${activeTab === "tester" ? "bg-white shadow-sm text-orange-500" : "text-gray-400 hover:text-gray-600"}`}
          >
            <FlaskConical size={11} /> Test
          </button>
        </div>
      </div>
      <div className="divide-y divide-gray-50">
        {list.length === 0 ? (
          <div className="px-5 py-8 text-center text-gray-400 text-sm">Chưa có thành viên nào</div>
        ) : (
          list.map((m, idx) => (
            <div key={m.username} className="px-5 py-3 flex items-center gap-3 hover:bg-gray-50/60 transition-colors">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 ${idx === 0 ? "bg-orange-500 text-white" : idx === 1 ? "bg-orange-300 text-white" : "bg-gray-100 text-gray-500"}`}>
                {idx + 1}
              </span>
              <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
                <Cpu size={14} className="text-orange-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-gray-800 text-xs font-semibold truncate">{m.name}</p>
                <p className="text-gray-400 text-[11px]">{m.course}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-orange-500 text-xs font-bold">
                  {activeTab === "technician" ? m.machinesDone : m.testsRun}
                </p>
                <p className="text-gray-400 text-[11px]">
                  {activeTab === "technician" ? "máy" : "lần test"}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 grid grid-cols-3 gap-2">
        <div className="text-center">
          <p className="text-[10px] text-gray-400">Technicians</p>
          <p className="text-xs font-bold text-orange-500 mt-0.5">{personnelStats.technicians}</p>
        </div>
        <div className="text-center border-x border-gray-200">
          <p className="text-[10px] text-gray-400">Testers</p>
          <p className="text-xs font-bold text-teal-500 mt-0.5">{personnelStats.testers}</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] text-gray-400">Chờ duyệt</p>
          <p className="text-xs font-bold text-red-500 mt-0.5">{personnelStats.pending}</p>
        </div>
      </div>
    </div>
  );
}
