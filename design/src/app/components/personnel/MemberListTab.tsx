import { useState, useMemo } from "react";
import { Search, Filter, LayoutGrid, List, Plus } from "lucide-react";
import { Pagination, usePagination } from "../Pagination";
import { MemberCard } from "./MemberCard";
import { MemberRow } from "./MemberRow";
import { CreateMemberModal } from "./CreateMemberModal";
import { EditMemberModal } from "./EditMemberModal";
import type { Member, MemberType } from "../../data/members";

interface MemberListTabProps {
  type: MemberType;
  courses: string[];
  members: Member[];
  onAddMember: (member: Omit<Member, "id">) => void;
  onUpdateMember: (updated: Member) => void;
  onDeleteMember: (id: string | number) => void;
}

export function MemberListTab({ type, courses, members, onAddMember, onUpdateMember, onDeleteMember }: MemberListTabProps) {
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filterCourse, setFilterCourse] = useState("All");
  const [showCreate, setShowCreate] = useState(false);
  const [editMember, setEditMember] = useState<Member | null>(null);
  const { page, pageSize, handlePageChange, handlePageSizeChange, paginate } = usePagination(10);

  const all = members.filter((m) => m.type === type && m.approvalStatus === "approved");
  const filterCourses = ["All", ...courses];

  const filtered = useMemo(() => {
    return all.filter((m) => {
      const q = search.toLowerCase();
      const matchSearch = !q || m.name.toLowerCase().includes(q) || m.username.toLowerCase().includes(q) || m.class.toLowerCase().includes(q);
      const matchCourse = filterCourse === "All" || m.course === filterCourse;
      return matchSearch && matchCourse;
    });
  }, [search, filterCourse, all]);

  const paged = paginate(filtered);

  return (
    <div className="flex flex-col gap-4">
      {/* Toolbar */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Tìm kiếm ${type === "technician" ? "technician" : "tester"}...`}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 bg-white transition-all"
          />
        </div>
        <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-xl px-3 py-1.5">
          <Filter size={13} className="text-gray-400" />
          <select value={filterCourse} onChange={(e) => setFilterCourse(e.target.value)} className="text-sm text-gray-600 outline-none bg-transparent cursor-pointer">
            {filterCourses.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <span className="text-sm text-gray-500 ml-1">
          <span className="font-semibold text-gray-700">{filtered.length}</span> {type === "technician" ? "Technicians" : "Testers"}
        </span>
        <div className="ml-auto flex items-center bg-white border border-gray-200 rounded-xl overflow-hidden">
          <button onClick={() => setViewMode("grid")} className={`p-2 transition-colors ${viewMode === "grid" ? "bg-orange-500 text-white" : "text-gray-400 hover:text-gray-600"}`}>
            <LayoutGrid size={15} />
          </button>
          <button onClick={() => setViewMode("list")} className={`p-2 transition-colors ${viewMode === "list" ? "bg-orange-500 text-white" : "text-gray-400 hover:text-gray-600"}`}>
            <List size={15} />
          </button>
        </div>
        <button onClick={() => setShowCreate(true)} className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2 rounded-xl transition-colors flex items-center gap-1.5 shadow-sm" style={{ fontWeight: 600 }}>
          <Plus size={14} /> Create
        </button>
      </div>

      {/* Grid / List */}
      {viewMode === "grid" ? (
        filtered.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {paged.map((m) => (
                <MemberCard key={m.id} member={m} onEdit={setEditMember} onDelete={onDeleteMember} />
              ))}
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-4">
              <Pagination total={filtered.length} page={page} pageSize={pageSize} onPageChange={handlePageChange} onPageSizeChange={handlePageSizeChange} />
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <Search size={40} className="mb-3 opacity-30" />
            <p className="text-sm">Không tìm thấy thành viên nào</p>
          </div>
        )
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {["Thành viên", "Vị trí", "Khoá", "Lớp", "Giới tính", "SĐT", "Trạng thái", "Thao tác"].map(h => (
                  <th key={h} className="px-4 py-3 text-center text-xs text-gray-400 uppercase tracking-wide first:text-left" style={{ fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paged.map((m) => (
                <MemberRow key={m.id} member={m} onEdit={setEditMember} onDelete={onDeleteMember} />
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="flex items-center justify-center py-16 text-gray-400 text-sm">Không tìm thấy thành viên nào</div>
          )}
          <div className="px-4 border-t border-gray-100">
            <Pagination total={filtered.length} page={page} pageSize={pageSize} onPageChange={handlePageChange} onPageSizeChange={handlePageSizeChange} />
          </div>
        </div>
      )}

      <CreateMemberModal isOpen={showCreate} onClose={() => setShowCreate(false)} techType={type} courses={courses} onAdd={onAddMember} />
      <EditMemberModal member={editMember} onClose={() => setEditMember(null)} onSave={(updated) => { onUpdateMember(updated); setEditMember(null); }} courses={courses} />
    </div>
  );
}
