import React, { useState, useEffect } from "react";
import {
  Monitor,
  Users,
  DollarSign,
  UserCheck,
  Clock,
  TrendingUp,
  TrendingDown,
  Wrench,
  Star,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Bell,
  Search,
  ChevronRight,
  Cpu,
  FlaskConical,
  UserCircle,
  ArrowRight,
  Ticket,
  Package,
  CreditCard,
  Activity,
} from "lucide-react";
import { getMachines } from "../data/machines";
import { getCustomers } from "../data/customers";
import { getTransactions } from "../data/finance";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// ─── Mock Data aligned with all modules ───────────────────────────────────────

// From Machines module
const MACHINE_STATS = {
  total: 8,
  complete: 7,
  running: 1,
  waiting: 0,
  retesting: 0,
  returning: 0,
  returned: 0,
};

const RECENT_MACHINES = [
  { id: 7, customerName: "Hoàng Minh Khôi", phone: "0971252805", status: "RUNNING", description: "Vệ sinh trong ngoài + keo thường", technician: "Hoàng Minh Khôi", time: "09:49" },
  { id: 8, customerName: "Khả Trọng Nghĩa", phone: "0346616520", status: "COMPLETE", description: "Cài lại win (ảnh → backup)", technician: "Nguyễn Bá Mạnh", time: "09:50" },
  { id: 6, customerName: "Nguyễn Hoàng Hùng", phone: "0355254763", status: "COMPLETE", description: "Vệ sinh trong ngoài + tra keo xịn", technician: "Nguyễn Công Sáng", time: "09:49" },
  { id: 5, customerName: "Tú Anh", phone: "0338388918", status: "COMPLETE", description: "Vệ sinh ngoài", technician: "Phạm Ngọc Tú Anh", time: "08:56" },
  { id: 4, customerName: "Hồ Nam Tú", phone: "0933937448", status: "COMPLETE", description: "Vệ sinh trong, ngoài, tra keo xịn", technician: "Nguyễn Bá Mạnh", time: "08:46" },
];

// From Personnel module
const PERSONNEL_STATS = {
  totalApproved: 20,
  technicians: 12,
  testers: 8,
  active: 16,
  inactive: 4,
  pending: 3,
};

const TOP_TECHNICIANS = [
  { name: "Nguyễn Mạnh Cường", username: "nguyenmanhcuong", course: "K15", machinesDone: 91, status: "active" },
  { name: "Phạm Việt Anh", username: "vietanh", course: "K15", machinesDone: 63, status: "active" },
  { name: "Trần Đức Minh", username: "tranducminh151102", course: "K15", machinesDone: 55, status: "active" },
  { name: "Hà Gia Linh", username: "halinhit", course: "K15", machinesDone: 48, status: "active" },
  { name: "Nguyễn Tuấn Đạt", username: "datngdev", course: "K15", machinesDone: 44, status: "active" },
];

const TOP_TESTERS = [
  { name: "Hoàng Thúy Linh", username: "linhht.check", course: "K15", testsRun: 118, status: "inactive" },
  { name: "Phạm Thu Hà", username: "hapt.tester", course: "K15", testsRun: 102, status: "active" },
  { name: "Ngô Hải Đăng", username: "dang.nh.test", course: "K15", testsRun: 87, status: "active" },
  { name: "Vũ Đình Khải", username: "khaivd.qa", course: "K16", testsRun: 75, status: "active" },
  { name: "Đinh Văn Nam", username: "namdv.qa15", course: "K15", testsRun: 64, status: "active" },
];

const PENDING_MEMBERS = [
  { id: 101, name: "Trần Minh Hiếu", type: "technician", course: "K17", registeredAt: "07/04/2026 14:30" },
  { id: 102, name: "Nguyễn Thảo Linh", type: "tester", course: "K17", registeredAt: "07/04/2026 09:15" },
  { id: 103, name: "Lê Quang Duy", type: "technician", course: "K17", registeredAt: "06/04/2026 16:45" },
];

// From Customers module
const CUSTOMER_STATS = {
  total: 5,
  totalRepairs: 19,
  totalPoints: 95,
};

const TOP_CUSTOMERS = [
  { name: "Phạm Minh Dũng", phone: "0976543210", totalRepairs: 8, points: 40 },
  { name: "Nguyễn Văn An", phone: "0912345678", totalRepairs: 5, points: 25 },
  { name: "Trần Thị Bình", phone: "0987654321", totalRepairs: 3, points: 15 },
  { name: "Hoàng Thị Vy", phone: "0965432109", totalRepairs: 2, points: 10 },
  { name: "Lê Hoàng Cường", phone: "0901234567", totalRepairs: 1, points: 5 },
];

// From Finance module
const FINANCE_STATS = {
  totalRevenue: 1650000,
  pendingRevenue: 150000,
  totalTransactions: 5,
  paidCount: 3,
  freeCount: 1,
  pendingCount: 1,
};

const RECENT_TRANSACTIONS = [
  { id: "3", customerName: "Phạm Minh Dũng", service: "Nâng cấp RAM", amount: 800000, paymentStatus: "paid", date: "25/03/2024" },
  { id: "1", customerName: "Nguyễn Văn An", service: "Sửa chữa laptop", amount: 500000, paymentStatus: "paid", date: "20/03/2024" },
  { id: "5", customerName: "Hoàng Thị Vy", service: "Sửa nguồn laptop", amount: 350000, paymentStatus: "paid", date: "12/03/2024" },
  { id: "2", customerName: "Trần Thị Bình", service: "Cài đặt phần mềm", amount: 0, paymentStatus: "free", date: "15/03/2024" },
  { id: "4", customerName: "Lê Hoàng Cường", service: "Vệ sinh laptop", amount: 150000, paymentStatus: "pending", date: "10/03/2024" },
];

// Revenue monthly chart
const REVENUE_TREND = [
  { month: "T10", revenue: 2400000, transactions: 12 },
  { month: "T11", revenue: 1800000, transactions: 9 },
  { month: "T12", revenue: 3200000, transactions: 16 },
  { month: "T1", revenue: 1500000, transactions: 7 },
  { month: "T2", revenue: 2100000, transactions: 10 },
  { month: "T3", revenue: 1650000, transactions: 5 },
];

// Machine status pie chart
const MACHINE_PIE = [
  { name: "Hoàn thành", value: 7, color: "#f97316" },
  { name: "Đang sửa", value: 1, color: "#3b82f6" },
  { name: "Chờ xử lý", value: 0, color: "#facc15" },
  { name: "Kiểm tra lại", value: 0, color: "#14b8a6" },
  { name: "Trả máy", value: 0, color: "#8b5cf6" },
  { name: "Đã trả", value: 0, color: "#22c55e" },
].filter((d) => d.value > 0);

// Machine category bar
const MACHINE_CATEGORY = [
  { name: "Hardware", count: 8 },
  { name: "Software", count: 0 },
  { name: "Network", count: 0 },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatCurrency(amount: number) {
  if (amount === 0) return "Miễn phí";
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount);
}

function formatCurrencyShort(amount: number) {
  if (amount >= 1000000) return `${(amount / 1000000).toFixed(1)}M`;
  if (amount >= 1000) return `${(amount / 1000).toFixed(0)}K`;
  return `${amount}`;
}

const MACHINE_STATUS_STYLE: Record<string, { bg: string; text: string; label: string }> = {
  COMPLETE: { bg: "bg-orange-100", text: "text-orange-600", label: "Hoàn thành" },
  RUNNING: { bg: "bg-blue-100", text: "text-blue-600", label: "Đang sửa" },
  WAITING: { bg: "bg-yellow-100", text: "text-yellow-700", label: "Chờ xử lý" },
  RETESTING: { bg: "bg-teal-100", text: "text-teal-600", label: "Kiểm tra lại" },
  RETURNING: { bg: "bg-purple-100", text: "text-purple-600", label: "Trả máy" },
  RETURNED: { bg: "bg-green-100", text: "text-green-600", label: "Đã trả" },
};

const PAYMENT_STYLE: Record<string, { bg: string; text: string; label: string }> = {
  paid: { bg: "bg-green-100", text: "text-green-700", label: "Đã thanh toán" },
  pending: { bg: "bg-yellow-100", text: "text-yellow-700", label: "Chờ thanh toán" },
  free: { bg: "bg-blue-100", text: "text-blue-700", label: "Miễn phí" },
};

// ─── Sub-components ────────────────────────────────────────────────────────────

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  color,
  trend,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  sub?: string;
  color: string;
  trend?: { dir: "up" | "down"; text: string };
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
      <div className={`w-11 h-11 rounded-xl ${color} flex items-center justify-center shrink-0`}>
        <Icon size={20} className="text-white" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-gray-400 text-xs mb-1">{label}</p>
        <p className="text-gray-900" style={{ fontSize: "1.6rem", fontWeight: 700, lineHeight: 1 }}>
          {value}
        </p>
        {sub && <p className="text-gray-400 text-xs mt-1">{sub}</p>}
        {trend && (
          <div className="flex items-center gap-1 mt-1">
            {trend.dir === "up" ? (
              <TrendingUp size={11} className="text-green-500" />
            ) : (
              <TrendingDown size={11} className="text-red-400" />
            )}
            <span className={`text-[11px] ${trend.dir === "up" ? "text-green-500" : "text-red-400"}`}>{trend.text}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function SectionTitle({ title, sub, action }: { title: string; sub?: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-end justify-between mb-3">
      <div>
        <h2 className="text-gray-800" style={{ fontWeight: 600, fontSize: "0.875rem" }}>{title}</h2>
        {sub && <p className="text-gray-400 text-xs mt-0.5">{sub}</p>}
      </div>
      {action}
    </div>
  );
}

// ─── Custom Tooltip for recharts ──────────────────────────────────────────────

function RevenueTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-lg px-4 py-3 text-xs">
      <p className="text-gray-600 font-semibold mb-1">{label}</p>
      <p className="text-orange-500">Doanh thu: {formatCurrency(payload[0]?.value)}</p>
      {payload[1] && <p className="text-blue-500 mt-0.5">Giao dịch: {payload[1]?.value}</p>}
    </div>
  );
}

// ─── 5-Step Machine Workflow ───────────────────────────────────────────────────

const WORKFLOW_STEPS = [
  { step: "P1", label: "Tiếp nhận", sublabel: "Nhận máy từ KH", icon: Package, color: "bg-yellow-400", count: 0 },
  { step: "P2", label: "Kiểm tra trước", sublabel: "Test tình trạng", icon: Activity, color: "bg-blue-500", count: 1 },
  { step: "P3", label: "Sửa chữa", sublabel: "Kỹ thuật viên", icon: Wrench, color: "bg-orange-500", count: 1 },
  { step: "P4", label: "Kiểm tra sau", sublabel: "Xác nhận hoàn thành", icon: RefreshCw, color: "bg-teal-500", count: 0 },
  { step: "P5", label: "Hoàn trả", sublabel: "Trả máy & thanh toán", icon: CheckCircle2, color: "bg-green-500", count: 7 },
];

// ─── Main Dashboard ────────────────────────────────────────────────────────────

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<"technician" | "tester">("technician");
  const [realMachines, setRealMachines] = useState<any[]>([]);
  const [realCustomers, setRealCustomers] = useState<any[]>([]);
  const [realTransactions, setRealTransactions] = useState<any[]>([]);

  // Load real data from localStorage
  useEffect(() => {
    const machines = getMachines();
    const customers = getCustomers();
    const transactions = getTransactions();

    setRealMachines(machines);
    setRealCustomers(customers);
    setRealTransactions(transactions);
  }, []);

  // Calculate real stats
  const realMachineStats = {
    total: realMachines.length,
    complete: realMachines.filter(m => m.status === "COMPLETE").length,
    running: realMachines.filter(m => m.status === "RUNNING").length,
    waiting: realMachines.filter(m => m.status === "WAITING").length,
    retesting: realMachines.filter(m => m.status === "RETESTING").length,
    returning: realMachines.filter(m => m.status === "RETURNING").length,
    returned: realMachines.filter(m => m.status === "RETURNED").length,
  };

  // Use real data if available, otherwise use mock data
  const displayMachineStats = realMachines.length > 0 ? realMachineStats : MACHINE_STATS;
  const displayRecentMachines = realMachines.length > 0 ? realMachines.slice(0, 5) : RECENT_MACHINES;

  // Update workflow steps with real data
  const workflowSteps = [
    { step: "P1", label: "Tiếp nhận", sublabel: "Nhận máy từ KH", icon: Package, color: "bg-yellow-400", count: displayMachineStats.waiting },
    { step: "P2", label: "Kiểm tra trước", sublabel: "Test tình trạng", icon: Activity, color: "bg-blue-500", count: 0 },
    { step: "P3", label: "Sửa chữa", sublabel: "Kỹ thuật viên", icon: Wrench, color: "bg-orange-500", count: displayMachineStats.running },
    { step: "P4", label: "Kiểm tra sau", sublabel: "Xác nhận hoàn thành", icon: RefreshCw, color: "bg-teal-500", count: displayMachineStats.retesting },
    { step: "P5", label: "Hoàn trả", sublabel: "Trả máy & thanh toán", icon: CheckCircle2, color: "bg-green-500", count: displayMachineStats.complete + displayMachineStats.returned },
  ];

  // Update machine pie chart with real data
  const machinePie = [
    { name: "Hoàn thành", value: displayMachineStats.complete, color: "#f97316" },
    { name: "Đang sửa", value: displayMachineStats.running, color: "#3b82f6" },
    { name: "Chờ xử lý", value: displayMachineStats.waiting, color: "#facc15" },
    { name: "Kiểm tra lại", value: displayMachineStats.retesting, color: "#14b8a6" },
    { name: "Trả máy", value: displayMachineStats.returning, color: "#8b5cf6" },
    { name: "Đã trả", value: displayMachineStats.returned, color: "#22c55e" },
  ].filter((d) => d.value > 0);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <h1 className="text-orange-500" style={{ fontSize: "1.1rem", fontWeight: 700 }}>
          Dashboard
        </h1>
        <div className="flex items-center gap-3">
          <div className="relative hidden sm:block">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="bg-gray-100 rounded-full pl-9 pr-4 py-2 text-sm text-gray-600 placeholder-gray-400 outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white transition-all w-44"
            />
          </div>
          <button className="relative w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-orange-50 transition-colors">
            <Bell size={15} className="text-gray-500" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full border border-white" />
          </button>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-sm cursor-pointer">
            <span className="text-white text-xs font-bold">AD</span>
          </div>
        </div>
      </header>

      <div className="flex-1 p-5 flex flex-col gap-5">

        {/* ── Pending Approval Banner ── */}
        {PENDING_MEMBERS.length > 0 && (
          <div className="bg-orange-50 border border-orange-200 rounded-xl px-5 py-3.5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center shrink-0">
                <UserCheck size={16} className="text-orange-500" />
              </div>
              <div>
                <p className="text-orange-700 text-sm font-semibold">
                  {PENDING_MEMBERS.length} thành viên đang chờ phê duyệt
                </p>
                <p className="text-orange-500 text-xs mt-0.5">
                  {PENDING_MEMBERS.map((m) => m.name).join(", ")}
                </p>
              </div>
            </div>
            <a
              href="/dashboard/nhan-su"
              className="flex items-center gap-1.5 bg-orange-500 text-white px-3.5 py-2 rounded-lg text-xs font-semibold hover:bg-orange-600 transition-colors shrink-0"
            >
              Xem ngay <ChevronRight size={13} />
            </a>
          </div>
        )}

        {/* ── KPI Cards ── */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
          <StatCard
            icon={Monitor}
            label="Tổng máy hôm nay"
            value={displayMachineStats.total}
            sub={`${displayMachineStats.running} đang sửa · ${displayMachineStats.complete} xong`}
            color="bg-orange-500"
            trend={{ dir: "up", text: "+2 so với hôm qua" }}
          />
          <StatCard
            icon={Wrench}
            label="Đang xử lý"
            value={displayMachineStats.running + displayMachineStats.waiting + displayMachineStats.retesting + displayMachineStats.returning}
            sub="RUNNING + WAITING"
            color="bg-blue-500"
          />
          <StatCard
            icon={CheckCircle2}
            label="Hoàn thành"
            value={displayMachineStats.complete + displayMachineStats.returned}
            sub={`Tỷ lệ ${displayMachineStats.total > 0 ? Math.round(((displayMachineStats.complete + displayMachineStats.returned) / displayMachineStats.total) * 100) : 0}%`}
            color="bg-green-500"
            trend={{ dir: "up", text: "Cao hơn TB" }}
          />
          <StatCard
            icon={DollarSign}
            label="Doanh thu tháng"
            value={`${formatCurrencyShort(FINANCE_STATS.totalRevenue)}`}
            sub={`Chờ: ${formatCurrencyShort(FINANCE_STATS.pendingRevenue)}`}
            color="bg-emerald-500"
            trend={{ dir: "down", text: "-21% vs T2" }}
          />
          <StatCard
            icon={UserCircle}
            label="Khách hàng"
            value={CUSTOMER_STATS.total}
            sub={`${CUSTOMER_STATS.totalRepairs} lượt sửa · ${CUSTOMER_STATS.totalPoints} điểm`}
            color="bg-violet-500"
            trend={{ dir: "up", text: "+1 tuần này" }}
          />
          <StatCard
            icon={Users}
            label="Thành viên"
            value={PERSONNEL_STATS.totalApproved}
            sub={`${PERSONNEL_STATS.active} hoạt động · ${PERSONNEL_STATS.pending} chờ duyệt`}
            color="bg-sky-500"
          />
        </div>

        {/* ── Machine Workflow 5 Steps ── */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <SectionTitle title="Quy trình xử lý máy" sub="Trạng thái luồng 5 bước hôm nay" />
          <div className="flex items-stretch gap-0 overflow-x-auto pb-1">
            {workflowSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <React.Fragment key={step.step}>
                  <div className="flex flex-col items-center flex-1 min-w-[100px]">
                    <div className={`w-12 h-12 ${step.color} rounded-xl flex items-center justify-center mb-2 shadow-sm relative`}>
                      <Icon size={20} className="text-white" />
                      {step.count > 0 && (
                        <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold border border-white">
                          {step.count}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-700 text-xs font-semibold text-center">{step.step} · {step.label}</p>
                    <p className="text-gray-400 text-[11px] text-center mt-0.5">{step.sublabel}</p>
                    <div className={`mt-2 px-3 py-1 rounded-full text-xs font-bold ${step.count > 0 ? `${step.color} text-white` : "bg-gray-100 text-gray-400"}`}>
                      {step.count}
                    </div>
                  </div>
                  {idx < workflowSteps.length - 1 && (
                    <div className="flex items-center px-1 pt-2">
                      <ArrowRight size={16} className="text-gray-300" />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* ── Charts Row ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* Revenue Trend */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <SectionTitle
              title="Doanh thu theo tháng"
              sub="6 tháng gần đây (VNĐ)"
              action={
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-orange-400 inline-block" />Doanh thu</span>
                </div>
              }
            />
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={REVENUE_TREND} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.18} />
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis
                  tickFormatter={(v) => formatCurrencyShort(v)}
                  tick={{ fontSize: 10, fill: "#94a3b8" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<RevenueTooltip />} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#f97316"
                  strokeWidth={2.5}
                  fill="url(#revenueGrad)"
                  dot={{ r: 3, fill: "#f97316", strokeWidth: 0 }}
                  activeDot={{ r: 5, fill: "#f97316", stroke: "white", strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
            {/* Summary row */}
            <div className="flex items-center gap-6 mt-3 pt-3 border-t border-gray-50">
              <div className="text-center">
                <p className="text-gray-400 text-[11px]">Tổng 6 tháng</p>
                <p className="text-gray-800 text-sm font-bold mt-0.5">{formatCurrencyShort(REVENUE_TREND.reduce((s, r) => s + r.revenue, 0))}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-400 text-[11px]">Giao dịch</p>
                <p className="text-gray-800 text-sm font-bold mt-0.5">{REVENUE_TREND.reduce((s, r) => s + r.transactions, 0)}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-400 text-[11px]">TB/giao dịch</p>
                <p className="text-gray-800 text-sm font-bold mt-0.5">
                  {formatCurrencyShort(
                    Math.round(
                      REVENUE_TREND.reduce((s, r) => s + r.revenue, 0) /
                      REVENUE_TREND.reduce((s, r) => s + r.transactions, 0)
                    )
                  )}
                </p>
              </div>
              <div className="text-center">
                <p className="text-gray-400 text-[11px]">Tháng cao nhất</p>
                <p className="text-gray-800 text-sm font-bold mt-0.5">{formatCurrencyShort(Math.max(...REVENUE_TREND.map((r) => r.revenue)))}</p>
              </div>
            </div>
          </div>

          {/* Machine Status Distribution */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <SectionTitle title="Phân bổ trạng thái máy" sub="Hôm nay" />
            <div className="flex flex-col items-center">
              <ResponsiveContainer width="100%" height={150}>
                <PieChart>
                  <Pie
                    data={machinePie}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={65}
                    paddingAngle={3}
                    dataKey="value"
                    isAnimationActive={false}
                  >
                    {machinePie.map((entry, index) => (
                      <Cell key={`pie-cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number, name: string) => [`${value} máy`, name]}
                    contentStyle={{ borderRadius: 10, border: "1px solid #f1f5f9", fontSize: 12 }}
                  />
                </PieChart>
              </ResponsiveContainer>
              {/* Legend */}
              <div className="flex flex-col gap-1.5 w-full mt-1">
                {machinePie.map((entry, index) => (
                  <div key={`legend-${index}`} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
                      <span className="text-gray-600 text-xs">{entry.name}</span>
                    </div>
                    <span className="text-gray-800 text-xs font-semibold">{entry.value}</span>
                  </div>
                ))}
              </div>
              {/* Total */}
              <div className="w-full mt-3 pt-3 border-t border-gray-50 flex items-center justify-between">
                <span className="text-gray-400 text-xs">Tổng hôm nay</span>
                <span className="text-gray-800 text-sm font-bold">{displayMachineStats.total} máy</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom Row: Transactions + Personnel + Customers ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

          {/* Recent Transactions */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
              <div>
                <h2 className="text-gray-800" style={{ fontWeight: 600, fontSize: "0.875rem" }}>Giao dịch gần đây</h2>
                <p className="text-gray-400 text-xs mt-0.5">Finance · {FINANCE_STATS.totalTransactions} giao dịch</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400">Tổng: <span className="text-emerald-500 font-semibold">{formatCurrencyShort(FINANCE_STATS.totalRevenue)}</span></span>
              </div>
            </div>
            <div className="divide-y divide-gray-50">
              {RECENT_TRANSACTIONS.map((t) => {
                const s = PAYMENT_STYLE[t.paymentStatus];
                return (
                  <div key={t.id} className="px-5 py-3 hover:bg-gray-50/60 transition-colors flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
                      <CreditCard size={13} className="text-orange-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-800 text-xs font-semibold truncate">{t.customerName}</p>
                      <p className="text-gray-400 text-[11px] truncate">{t.service}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-gray-800 text-xs font-semibold">
                        {t.amount > 0 ? formatCurrencyShort(t.amount) : "Miễn phí"}
                      </p>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${s.bg} ${s.text}`}>
                        {s.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Finance summary */}
            <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 grid grid-cols-3 gap-2">
              <div className="text-center">
                <p className="text-[10px] text-gray-400">Đã thanh toán</p>
                <p className="text-xs font-bold text-green-600 mt-0.5">{FINANCE_STATS.paidCount}</p>
              </div>
              <div className="text-center border-x border-gray-200">
                <p className="text-[10px] text-gray-400">Chờ thanh toán</p>
                <p className="text-xs font-bold text-yellow-600 mt-0.5">{FINANCE_STATS.pendingCount}</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-gray-400">Miễn phí</p>
                <p className="text-xs font-bold text-blue-600 mt-0.5">{FINANCE_STATS.freeCount}</p>
              </div>
            </div>
          </div>

          {/* Top Personnel */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
              <div>
                <h2 className="text-gray-800" style={{ fontWeight: 600, fontSize: "0.875rem" }}>Thành viên nổi bật</h2>
                <p className="text-gray-400 text-xs mt-0.5">Personnel · {PERSONNEL_STATS.totalApproved} thành viên</p>
              </div>
              {/* Toggle */}
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
              {activeTab === "technician"
                ? TOP_TECHNICIANS.map((m, idx) => (
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
                      <p className="text-orange-500 text-xs font-bold">{m.machinesDone}</p>
                      <p className="text-gray-400 text-[11px]">máy</p>
                    </div>
                  </div>
                ))
                : TOP_TESTERS.map((m, idx) => (
                  <div key={m.username} className="px-5 py-3 flex items-center gap-3 hover:bg-gray-50/60 transition-colors">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 ${idx === 0 ? "bg-orange-500 text-white" : idx === 1 ? "bg-orange-300 text-white" : "bg-gray-100 text-gray-500"}`}>
                      {idx + 1}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center shrink-0">
                      <FlaskConical size={14} className="text-teal-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-800 text-xs font-semibold truncate">{m.name}</p>
                      <p className="text-gray-400 text-[11px]">{m.course}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-teal-500 text-xs font-bold">{m.testsRun}</p>
                      <p className="text-gray-400 text-[11px]">lần test</p>
                    </div>
                  </div>
                ))
              }
            </div>
            {/* Stats footer */}
            <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 grid grid-cols-3 gap-2">
              <div className="text-center">
                <p className="text-[10px] text-gray-400">Technicians</p>
                <p className="text-xs font-bold text-orange-500 mt-0.5">{PERSONNEL_STATS.technicians}</p>
              </div>
              <div className="text-center border-x border-gray-200">
                <p className="text-[10px] text-gray-400">Testers</p>
                <p className="text-xs font-bold text-teal-500 mt-0.5">{PERSONNEL_STATS.testers}</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-gray-400">Chờ duyệt</p>
                <p className="text-xs font-bold text-red-500 mt-0.5">{PERSONNEL_STATS.pending}</p>
              </div>
            </div>
          </div>

          {/* Top Customers */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-50">
              <h2 className="text-gray-800" style={{ fontWeight: 600, fontSize: "0.875rem" }}>Khách hàng thân thiết</h2>
              <p className="text-gray-400 text-xs mt-0.5">Customers · Xếp hạng theo điểm</p>
            </div>
            <div className="divide-y divide-gray-50">
              {TOP_CUSTOMERS.map((c, idx) => (
                <div key={c.phone} className="px-5 py-3 flex items-center gap-3 hover:bg-gray-50/60 transition-colors">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 ${idx === 0 ? "bg-violet-500 text-white" : idx === 1 ? "bg-violet-300 text-white" : "bg-gray-100 text-gray-500"}`}>
                    {idx + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-800 text-xs font-semibold truncate">{c.name}</p>
                    <p className="text-gray-400 text-[11px]">{c.totalRepairs} lần sửa</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Star size={11} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-gray-700 text-xs font-bold">{c.points}</span>
                  </div>
                </div>
              ))}
            </div>
            {/* Points summary */}
            <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-gray-400">Tổng điểm đã tích</span>
                <div className="flex items-center gap-1">
                  <Star size={11} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-bold text-gray-700">{CUSTOMER_STATS.totalPoints}</span>
                </div>
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-[11px] text-gray-400">Tổng lượt sửa</span>
                <span className="text-sm font-bold text-gray-700">{CUSTOMER_STATS.totalRepairs}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Recent Machines Table ── */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
            <div>
              <h2 className="text-gray-800" style={{ fontWeight: 600, fontSize: "0.875rem" }}>Máy gần đây</h2>
              <p className="text-gray-400 text-xs mt-0.5">Machines · Cập nhật mới nhất</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400">{displayMachineStats.total} máy hôm nay</span>
              <a href="/dashboard/machines" className="text-xs text-orange-500 font-medium hover:text-orange-600 transition-colors flex items-center gap-0.5">
                Xem tất cả <ChevronRight size={12} />
              </a>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left px-5 py-3 text-gray-400 text-xs font-semibold">STT</th>
                  <th className="text-left px-4 py-3 text-gray-400 text-xs font-semibold">Khách hàng</th>
                  <th className="text-left px-4 py-3 text-gray-400 text-xs font-semibold">SĐT</th>
                  <th className="text-left px-4 py-3 text-gray-400 text-xs font-semibold">Mô tả</th>
                  <th className="text-left px-4 py-3 text-gray-400 text-xs font-semibold">Kỹ thuật viên</th>
                  <th className="text-left px-4 py-3 text-gray-400 text-xs font-semibold">Giờ nhận</th>
                  <th className="text-left px-4 py-3 text-gray-400 text-xs font-semibold">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {displayRecentMachines.map((m) => {
                  const s = MACHINE_STATUS_STYLE[m.status];
                  return (
                    <tr key={m.id} className="hover:bg-gray-50/60 transition-colors">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <Monitor size={13} className="text-gray-400 shrink-0" />
                          <span className="text-gray-700 text-xs font-semibold">#{m.id}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-800 text-xs font-medium">{m.customerName}</td>
                      <td className="px-4 py-3 text-gray-500 text-xs">{m.phone}</td>
                      <td className="px-4 py-3 text-gray-500 text-xs max-w-[200px]">
                        <span className="truncate block">{m.description}</span>
                      </td>
                      <td className="px-4 py-3 text-gray-600 text-xs">{m.technician || "Chưa chỉ định"}</td>
                      <td className="px-4 py-3 text-gray-500 text-xs">
                        <div className="flex items-center gap-1">
                          <Clock size={11} className="text-gray-300" />
                          {m.time}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${s.bg} ${s.text}`}>
                          {s.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}