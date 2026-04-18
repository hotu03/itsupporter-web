import { Users, Cpu, FlaskConical, TrendingUp, Shield, Trophy, Star } from "lucide-react";
import type { Member } from "../../data/members";
import { POSITION_COLORS } from "../../data/members";

interface OverviewTabProps {
  members: Member[];
  courses: string[];
}

export function OverviewTab({ members, courses }: OverviewTabProps) {
  const approvedMembers = members.filter((m) => m.approvalStatus === "approved");
  const technicians = approvedMembers.filter((m) => m.type === "technician");
  const testers = approvedMembers.filter((m) => m.type === "tester");
  const activeCount = approvedMembers.filter((m) => m.status === "active").length;
  const adminCount = approvedMembers.filter((m) => m.isAdmin).length;
  const topTech = [...technicians].sort((a, b) => b.machinesDone - a.machinesDone).slice(0, 5);
  const topTesters = [...testers].sort((a, b) => b.testsRun - a.testsRun).slice(0, 5);

  const courseGroups = approvedMembers.reduce<Record<string, number>>((acc, m) => {
    acc[m.course] = (acc[m.course] || 0) + 1;
    return acc;
  }, {});

  // Use dynamic courses list from "Quản lý khóa" management
  const sortedCourses = [...courses].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  const courseData = sortedCourses
    .map((course) => ({ course, count: courseGroups[course] || 0 }));

  const maxCount = Math.max(...courseData.map((d) => d.count), 1);
  // Colors: gray for empty, orange gradient (dark→light) for populated
  const BAR_COLORS = ["#94a3b8", "#ea580c", "#f97316", "#fb923c", "#fdba74", "#fed7aa"];
  const MIN_HEIGHT_PCT = 10; // minimum bar height as percentage

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {[
          { label: "Tổng thành viên", value: approvedMembers.length, icon: Users, color: "bg-orange-50 text-orange-500" },
          { label: "Technicians", value: technicians.length, icon: Cpu, color: "bg-blue-50 text-blue-500" },
          { label: "Testers", value: testers.length, icon: FlaskConical, color: "bg-purple-50 text-purple-500" },
          { label: "Đang hoạt động", value: activeCount, icon: TrendingUp, color: "bg-green-50 text-green-500" },
          { label: "Quản trị viên", value: adminCount, icon: Shield, color: "bg-amber-50 text-amber-500" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${color}`}><Icon size={20} /></div>
            <div>
              <p className="text-2xl text-gray-900" style={{ fontWeight: 700 }}>{value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Bar chart */}
        <div className="lg:col-span-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-7 h-7 rounded-lg bg-orange-50 flex items-center justify-center"><Users size={14} className="text-orange-500" /></div>
            <p className="text-gray-700 text-sm" style={{ fontWeight: 600 }}>Thành viên theo khoá</p>
          </div>
          <div className="flex items-end justify-center gap-3 h-[160px] px-2">
            {courseData.map(({ course, count }, i) => (
              <div key={course} className="flex flex-col items-center gap-1 group relative" style={{ width: "40px" }}>
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] rounded-lg px-2 py-1 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  {course}: {count} người
                </div>
                <span className="text-[11px] text-gray-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">{count}</span>
                <div
                  className="w-full rounded-t-lg transition-all cursor-pointer hover:opacity-80"
                  style={{
                    height: `${count > 0 ? Math.max((count / maxCount) * 140, 20) : 4}px`,
                    backgroundColor: BAR_COLORS[i % BAR_COLORS.length],
                  }}
                />
                <span className="text-[10px] text-gray-400 mt-1">{course}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-col gap-1.5 border-t border-gray-50 pt-3">
            {courseData.map(({ course, count }, i) => (
              <div key={course} className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: BAR_COLORS[i % BAR_COLORS.length] }} />
                  {course}
                </div>
                <span className="text-gray-700" style={{ fontWeight: 600 }}>{count} người</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Technicians */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center"><Trophy size={14} className="text-blue-500" /></div>
            <p className="text-gray-700 text-sm" style={{ fontWeight: 600 }}>BXH Technician (máy)</p>
          </div>
          <div className="flex flex-col gap-3">
            {topTech.map((m, i) => <RankingEntry key={m.id} member={m} rank={i + 1} value={m.machinesDone} MetricIcon={Cpu} valueColor="text-blue-600" />)}
          </div>
        </div>

        {/* Top Testers */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-purple-50 flex items-center justify-center"><Star size={14} className="text-purple-500" /></div>
            <p className="text-gray-700 text-sm" style={{ fontWeight: 600 }}>BXH Tester (lần test)</p>
          </div>
          <div className="flex flex-col gap-3">
            {topTesters.map((m, i) => <RankingEntry key={m.id} member={m} rank={i + 1} value={m.testsRun} MetricIcon={FlaskConical} valueColor="text-purple-600" />)}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Ranking Entry ────────────────────────────────────────────────────────────
function RankingEntry({ member, rank, value, MetricIcon, valueColor }: {
  member: Member;
  rank: number;
  value: number;
  MetricIcon: typeof Cpu;
  valueColor: string;
}) {
  const initials = member.name.split(" ").slice(-2).map((w) => w[0]).join("").toUpperCase();
  const gradient = POSITION_COLORS[member.position] ?? "from-orange-400 to-orange-500";
  const rankClass = rank === 1 ? "bg-yellow-400 text-white"
    : rank === 2 ? "bg-gray-300 text-white"
    : rank === 3 ? "bg-amber-600/80 text-white"
    : "bg-gray-100 text-gray-500";

  return (
    <div className="flex items-center gap-3">
      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${rankClass}`}>{rank}</span>
      <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center shrink-0`}>
        <span className="text-white text-xs font-bold">{initials}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-gray-800 text-xs truncate" style={{ fontWeight: 600 }}>{member.name}</p>
        <p className="text-gray-400 text-[10px]">{member.course} · {member.class}</p>
      </div>
      <div className="flex items-center gap-1 shrink-0">
        <MetricIcon size={11} className="text-blue-400" />
        <span className={`${valueColor} text-xs font-bold`}>{value}</span>
      </div>
    </div>
  );
}
