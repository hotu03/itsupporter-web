import { useState, useEffect, useMemo } from "react";
import {
  Search,
  ChevronDown,
  LayoutGrid,
  List,
  Plus,
} from "lucide-react";
import { toast } from "sonner";
import { Machine, Status } from "../data/machines";
import { getFirestoreMachines, addFirestoreMachine, updateFirestoreMachine } from "../data/firestoreMachines";
import { addFirestoreCustomer, updateFirestoreCustomer, getFirestoreCustomerByPhone, upsertFirestoreCustomerByIdentity } from "../data/firestoreCustomers";
import { addFirestoreInvoice } from "../data/firestoreInvoices";
import { addFirestoreTransaction, updateFirestoreTransactionByMachineId } from "../data/firestoreTransactions";
import { addFirestorePointHistoryEarnOnce } from "../data/firestorePoints";
import { calculatePoints } from "../data/points";
import { createFirebaseCustomer, sendCustomerPasswordReset } from "../data/firebase-auth";
import { getServicePrice } from "../data/services";
import { getFirestoreMembers } from "../data/firestoreMembers";
import { getErrorMessage } from "../utils/errors";
import type { Member } from "../data/members";
import { CreateDrawer } from "../components/machines/CreateDrawer";
import { MachineCard } from "../components/machines/MachineCard";
import { MachineRow } from "../components/machines/MachineRow";
import { useAuth } from "../contexts/AuthContext";
import { isAdmin, canEditMachine, canCreateMachine } from "../data/users";
import { buildOperationId } from "../data/operationKeys";

const CHECKLIST_ITEMS = [
  "Hình thức máy (Ngoại hình, ốc vít, bảo hành)",
  "Bàn phím",
  "Touchpad",
  "Màn hình",
  "Loa",
  "Wifi, Bluetooth",
  "Camera",
  "Cổng kết nối (USB)",
  "Quạt tản nhiệt",
  "Kiểm tra nguồn/pin",
];

const TECHNICIAN_CHECKLIST = [
  "Đối chiếu thông tin máy",
  "Hoàn thành yêu cầu của khách",
  "Vệ sinh máy",
];

function toMemberDisplayName(member: Member): string {
  const course = member.course?.trim();
  return course ? `${member.name} - ${course}` : member.name;
}

function isMemberActiveApproved(member: Member): boolean {
  return member.approvalStatus === "approved" && member.status !== "inactive";
}

export default function Machines() {
  const { user } = useAuth();
  const [machines, setMachines] = useState<Machine[]>([]);
  const [search, setSearch] = useState("");
  const [gridView, setGridView] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [orderBy, setOrderBy] = useState<string>("Newest");
  const [editMachine, setEditMachine] = useState<Machine | null>(null);
  const [viewMode, setViewMode] = useState<"main" | "online">("main");
  const [approvedMembers, setApprovedMembers] = useState<Member[]>([]);
  const [approvingMachineId, setApprovingMachineId] = useState<string | number | null>(null);

  const getDefaultDate = () => {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };
  const [selectedDate, setSelectedDate] = useState(getDefaultDate());

  useEffect(() => {
    getFirestoreMachines().then(data => {
      setMachines(data as unknown as Machine[]);
    }).catch((error) => {
      toast.error(getErrorMessage(error, "Không thể tải danh sách máy lúc này."));
    });

    getFirestoreMembers().then((members) => {
      setApprovedMembers(members.filter(isMemberActiveApproved));
    }).catch((error) => {
      toast.warning(getErrorMessage(error, "Không thể tải danh sách thành viên lúc này."));
      setApprovedMembers([]);
    });
  }, []);

  const testerMembers = useMemo(() => {
    return approvedMembers
      .filter((member) => member.type === "tester")
      .map(toMemberDisplayName);
  }, [approvedMembers]);

  const technicianMembers = useMemo(() => {
    return approvedMembers
      .filter((member) => member.type === "technician")
      .map(toMemberDisplayName);
  }, [approvedMembers]);

  const parseMachineDate = (timeStr: string): string | null => {
    if (!timeStr) return null;
    // Try ISO format first (yyyy-mm-ddThh:mm or yyyy-mm-dd)
    const isoMatch = timeStr.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (isoMatch) {
      return `${isoMatch[1]}-${isoMatch[2]}-${isoMatch[3]}`;
    }
    // Fall back to Vietnamese format (dd/mm/yyyy)
    const match = timeStr.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
    if (!match) return null;
    const dd = match[1].padStart(2, "0");
    const mm = match[2].padStart(2, "0");
    const yyyy = match[3];
    return `${yyyy}-${mm}-${dd}`;
  };

  const baseFiltered = machines.filter((m) => {
    const matchSearch =
      m.customerName.toLowerCase().includes(search.toLowerCase()) ||
      m.phone.includes(search);

    let matchFilter = true;
    if (filterStatus === "All") {
      matchFilter = true;
    } else if (filterStatus === "PENDING_APPROVAL") {
      matchFilter = m.registrationType === "online" && !m.isApproved;
    } else if (filterStatus === "APPROVED") {
      matchFilter = m.isApproved === true;
    } else {
      matchFilter = m.status === filterStatus;
    }

    if (viewMode === "online") {
      return matchSearch && matchFilter && m.registrationType === "online" && !m.isApproved;
    }

    const machineDate = parseMachineDate(m.dropOffTime || m.time);
    const matchDate = machineDate === selectedDate;

    return matchSearch && matchFilter && matchDate && (m.registrationType === "in-person" || m.isApproved);
  });

  const chronological = [...baseFiltered].sort((a, b) => a.time.localeCompare(b.time));
  const sttMap = new Map<string | number, number>();
  chronological.forEach((m, idx) => sttMap.set(m.id, idx + 1));

  const filtered = [...baseFiltered].map(m => ({ ...m, _stt: sttMap.get(m.id)! })).sort((a, b) => {
    if (orderBy === "Oldest") return a.time.localeCompare(b.time);
    if (orderBy === "Newest") return b.time.localeCompare(a.time);
    if (orderBy === "Name A-Z") return a.customerName.localeCompare(b.customerName);
    return b.time.localeCompare(a.time);
  });

  const handleSave = async (machine: Machine) => {
    if (editMachine) {
      await updateFirestoreMachine(String(machine.id), machine);
      const updated = machines.map(m => m.id === machine.id ? machine : m);
      setMachines(updated);
    } else {
      const id = await addFirestoreMachine({
        ...machine,
        operationId: buildOperationId("machine"),
        source: machine.registrationType === "in-person" ? "in_person" : "online",
      } as Machine & { operationId: string; source: "online" | "in_person" });
      const newMachine = { ...machine, id };
      setMachines([newMachine, ...machines]);

      if (machine.registrationType === "in-person") {
        const now = new Date();
        const operationId = buildOperationId("inperson");
        const invoiceServices = await Promise.all(
          (machine.additionalServices || []).map(async (name) => ({
            name,
            price: await getServicePrice(name),
          })),
        );

        await addFirestoreInvoice({
          machineId: id,
          customerName: machine.customerName,
          customerEmail: machine.customerEmail || "",
          phone: machine.phone,
          registrationType: "in-person",
          services: invoiceServices,
          machineCondition: machine.machineCondition,
          needs: machine.needs,
          category: machine.category,
          warranty: machine.warranty,
          charger: machine.charger,
          password: machine.password,
          createdAt: now.toLocaleDateString("vi-VN"),
          createdTime: now.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
          dropOffTime: machine.dropOffTime,
          appointmentTime: machine.appointmentTime,
          serviceAmount: machine.serviceAmount || 0,
          discountCode: machine.discountCode,
          discountAmount: machine.discountAmount || 0,
          finalAmount: machine.finalAmount || 0,
          paymentStatus: machine.paymentStatus || "pending",
          pointsEarned: machine.pointsEarned,
          tester: machine.testerBefore || machine.tester,
          createdBy: `Tester (${machine.testerBefore || machine.tester})`,
          operationId,
          source: "in_person",
        });

        if (machine.phone !== "—" && machine.customerName !== "Khách hàng") {
          const pts: number = machine.pointsEarned && machine.pointsEarned > 0
            ? machine.pointsEarned
            : calculatePoints(machine.finalAmount || 0);

          await upsertFirestoreCustomerByIdentity({
            name: machine.customerName,
            phone: machine.phone,
            email: machine.customerEmail || "",
            points: pts,
            totalRepairs: 1,
            createdAt: new Date().toISOString().split('T')[0],
            operationId,
            source: "in_person",
          });

          await addFirestorePointHistoryEarnOnce({
            customerPhone: machine.phone,
            customerEmail: machine.customerEmail || "",
            customerName: machine.customerName,
            type: "earn",
            points: pts,
            date: new Date().toISOString(),
            description: `Đơn hàng #${id} - ${machine.finalAmount || 0}`,
            relatedId: String(id),
          });

          if (machine.customerEmail) {
            const tempPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            try {
              await createFirebaseCustomer(machine.customerEmail, tempPassword);
              await sendCustomerPasswordReset(machine.customerEmail);
            } catch (err: any) {
              if (err.code !== 'auth/email-already-in-use') {
                console.error('Firebase Auth error for customer:', err);
              }
            }
          }
        }

        const serviceNames = machine.additionalServices?.length
          ? machine.additionalServices.join(", ")
          : (machine.description || "Dịch vụ khác");
        await addFirestoreTransaction({
          machineId: id,
          customerName: machine.customerName,
          phone: machine.phone,
          service: serviceNames,
          amount: machine.finalAmount || 0,
          paymentStatus: (machine.finalAmount || 0) === 0 ? "free" : (machine.paymentStatus || "pending"),
          date: new Date().toISOString().split('T')[0],
          discountCode: machine.discountCode || "",
          discountAmount: machine.discountAmount || 0,
          operationId,
          source: "in_person",
        });
      }
    }

    if (editMachine) {
      const operationId = buildOperationId("edit");
      const serviceNames = machine.additionalServices?.length
        ? machine.additionalServices.join(", ")
        : (machine.description || "Dịch vụ khác");

      await updateFirestoreTransactionByMachineId(String(machine.id), {
        paymentStatus: machine.paymentStatus,
        discountCode: machine.discountCode,
        discountAmount: machine.discountAmount || 0,
        service: serviceNames,
        amount: machine.finalAmount || 0,
        operationId,
        source: "edit",
      });

      await addFirestoreInvoice({
        machineId: machine.id,
        customerName: machine.customerName,
        customerEmail: machine.customerEmail || "",
        phone: machine.phone,
        registrationType: machine.registrationType,
        services: (machine.additionalServices || []).map((name) => ({ name, price: 0 })),
        machineCondition: machine.machineCondition || "",
        needs: machine.needs || "",
        category: machine.category,
        warranty: machine.warranty,
        charger: machine.charger,
        password: machine.password,
        createdAt: new Date().toLocaleDateString("vi-VN"),
        createdTime: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
        dropOffTime: machine.dropOffTime || "",
        appointmentTime: machine.appointmentTime,
        serviceAmount: machine.serviceAmount || 0,
        discountCode: machine.discountCode || "",
        discountAmount: machine.discountAmount || 0,
        finalAmount: machine.finalAmount || 0,
        paymentStatus: machine.paymentStatus || "pending",
        pointsEarned: machine.pointsEarned,
        createdBy: `Tester (${machine.testerBefore || machine.tester})`,
        operationId,
        source: "edit",
      });

      if (machine.phone !== "—" && machine.customerName !== "Khách hàng") {
        await upsertFirestoreCustomerByIdentity({
          name: machine.customerName,
          phone: machine.phone,
          email: machine.customerEmail || "",
          points: 0,
          totalRepairs: 0,
          createdAt: new Date().toISOString().split('T')[0],
          operationId,
          source: "edit",
        });
      }

      setEditMachine(null);
    }
  };

  const handleApproveMachine = async (id: number | string) => {
    if (approvingMachineId === id) {
      return;
    }

    if (!window.confirm("Xác nhận khách hàng đã đưa máy đến và duyệt vào hệ thống quản lý chính?")) return;

    const machineToApprove = machines.find(m => m.id === id);
    const previousMachines = machines;
    const now = new Date();
    const intakeTime = now.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }) + " " + now.toLocaleDateString("vi-VN").replace(/\//g, "/");
    const updated = machines.map(m =>
      m.id === id ? {
        ...m,
        isApproved: true,
        status: "WAITING" as Status,
        time: intakeTime,
        dropOffTime: intakeTime,
      } : m
    );
    setApprovingMachineId(id);
    setMachines(updated);

    try {
      if (machineToApprove) {
        await updateFirestoreMachine(String(id), {
          isApproved: true,
          status: "WAITING",
          time: intakeTime,
          dropOffTime: intakeTime,
          approvedAt: now.toISOString(),
        } as Partial<Machine>);

        const pts = machineToApprove.pointsEarned || 0;
        if (pts > 0 && machineToApprove.phone !== "—" && machineToApprove.customerName !== "Khách hàng") {
          const pointHistory = await addFirestorePointHistoryEarnOnce({
            customerPhone: machineToApprove.phone,
            customerEmail: machineToApprove.customerEmail || "",
            customerName: machineToApprove.customerName,
            type: "earn",
            points: pts,
            date: now.toISOString(),
            description: `Đơn hàng #${id} - ${machineToApprove.finalAmount || 0}`,
            relatedId: String(id),
          });

          if (pointHistory.created) {
            const existingCustomer = await getFirestoreCustomerByPhone(machineToApprove.phone);
            if (existingCustomer?.id) {
              await updateFirestoreCustomer(String(existingCustomer.id), {
                points: (existingCustomer.points || 0) + pts,
                totalRepairs: (existingCustomer.totalRepairs || 0) + 1,
              });
            } else {
              await addFirestoreCustomer({
                name: machineToApprove.customerName,
                phone: machineToApprove.phone,
                email: machineToApprove.customerEmail || "",
                points: pts,
                totalRepairs: 1,
                createdAt: now.toISOString().split('T')[0],
                operationId: buildOperationId("approval"),
                source: "approval",
              });
            }
          }
        }
      }
    } catch (error) {
      setMachines(previousMachines);
      toast.error(getErrorMessage(error, "Không thể duyệt đơn online lúc này."));
    } finally {
      setApprovingMachineId(null);
    }
  };

  const pendingOnline = machines.filter(m => m.registrationType === "online" && !m.isApproved).length;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search Products"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-sm text-gray-600 placeholder-gray-400 outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white transition-all"
          />
        </div>
        <div className="ml-auto">
          {canCreateMachine(user) && (
            <button
              onClick={() => setShowCreate(true)}
              className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors shadow-sm"
            >
              <Plus size={15} />
              Create
              <ChevronDown size={13} />
            </button>
          )}
        </div>
      </header>

      <div className="bg-white border-b border-gray-200 px-6 flex items-center gap-1">
        <button
          onClick={() => setViewMode("main")}
          className={`px-4 py-2.5 text-sm font-medium transition-colors relative ${
            viewMode === "main" ? "text-orange-600 border-b-2 border-orange-600" : "text-gray-600 hover:text-gray-800"
          }`}
        >
          Quản lý chính
        </button>
        <button
          onClick={() => setViewMode("online")}
          className={`px-4 py-2.5 text-sm font-medium transition-colors relative ${
            viewMode === "online" ? "text-orange-600 border-b-2 border-orange-600" : "text-gray-600 hover:text-gray-800"
          }`}
        >
          Đăng ký trực tuyến
          {pendingOnline > 0 && (
            <span className="ml-1.5 px-1.5 py-0.5 bg-orange-500 text-white text-[10px] rounded-full">
              {pendingOnline}
            </span>
          )}
        </button>
      </div>

      <div className="bg-white border-b border-gray-200 px-6 py-2.5 flex items-center gap-3">
        <p className="text-gray-700 text-sm font-semibold shrink-0">
          {filtered.length} Machines
        </p>
        <div className="flex-1" />

        <FilterSelect value={filterStatus} onChange={setFilterStatus}>
          <option value="All">Filter</option>
          <option value="WAITING">Waiting</option>
          <option value="RUNNING">Running</option>
          <option value="RETESTING">Retesting</option>
          <option value="COMPLETE">Complete</option>
          <option value="RETURNED">Returned</option>
          <option value="RETURNING">Returning</option>
          <option value="PENDING_APPROVAL">Chờ duyệt</option>
          <option value="APPROVED">Đã duyệt</option>
        </FilterSelect>

        <FilterSelect value={orderBy} onChange={setOrderBy}>
          <option>Order by</option>
          <option>Newest</option>
          <option>Oldest</option>
          <option>Name A-Z</option>
        </FilterSelect>

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-600 outline-none focus:ring-2 focus:ring-orange-400 cursor-pointer bg-white"
          style={{ colorScheme: "light" }}
        />

        <div className="flex border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => setGridView(true)}
            className={`p-1.5 transition-colors ${gridView ? "bg-orange-500 text-white" : "bg-white text-gray-400 hover:bg-gray-50"}`}
          >
            <LayoutGrid size={15} />
          </button>
          <button
            onClick={() => setGridView(false)}
            className={`p-1.5 transition-colors ${!gridView ? "bg-orange-500 text-white" : "bg-white text-gray-400 hover:bg-gray-50"}`}
          >
            <List size={15} />
          </button>
        </div>
      </div>

      <div className="flex-1 p-5">
        {filtered.length === 0 ? (
          <div className="flex items-center justify-center h-64 text-gray-400 text-sm">
            Chưa có máy nào. Nhấn "Tạo" để bắt đầu.
          </div>
        ) : gridView ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {filtered.map((m) => (
              <MachineCard
                key={m.id}
                machine={m}
                stt={m._stt}
                onClick={() => {
                  if (canEditMachine(user, m)) {
                    setEditMachine(m);
                  }
                }}
                onApprove={viewMode === "online" && isAdmin(user) ? handleApproveMachine : undefined}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-4 py-3 text-gray-400 text-xs font-semibold">#</th>
                  <th className="text-left px-4 py-3 text-gray-400 text-xs font-semibold">Status</th>
                  <th className="text-left px-4 py-3 text-gray-400 text-xs font-semibold">Tên KH</th>
                  <th className="text-left px-4 py-3 text-gray-400 text-xs font-semibold">SĐT</th>
                  <th className="text-left px-4 py-3 text-gray-400 text-xs font-semibold">Giờ vào</th>
                  <th className="text-left px-4 py-3 text-gray-400 text-xs font-semibold">Mô tả</th>
                  <th className="text-left px-4 py-3 text-gray-400 text-xs font-semibold">Expired</th>
                  <th className="text-left px-4 py-3 text-gray-400 text-xs font-semibold">Tester</th>
                  <th className="text-left px-4 py-3 text-gray-400 text-xs font-semibold">Technician</th>
                  <th className="text-left px-4 py-3 text-gray-400 text-xs font-semibold">Duyệt</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((m) => (
                  <MachineRow
                    key={m.id}
                    machine={m}
                    stt={m._stt}
                    onClick={() => {
                      if (canEditMachine(user, m)) {
                        setEditMachine(m);
                      }
                    }}
                    onApprove={viewMode === "online" && isAdmin(user) ? handleApproveMachine : undefined}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showCreate && (
        <CreateDrawer
          onClose={() => setShowCreate(false)}
          onSave={handleSave}
          testerMembers={testerMembers}
          technicianMembers={technicianMembers}
          checklistItems={CHECKLIST_ITEMS}
          technicianChecklist={TECHNICIAN_CHECKLIST}
        />
      )}
      {editMachine && (
        <CreateDrawer
          machine={editMachine}
          onClose={() => setEditMachine(null)}
          onSave={handleSave}
          testerMembers={testerMembers}
          technicianMembers={technicianMembers}
          checklistItems={CHECKLIST_ITEMS}
          technicianChecklist={TECHNICIAN_CHECKLIST}
        />
      )}
    </div>
  );
}

function FilterSelect({ value, onChange, children }: {
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-white border border-gray-200 rounded-lg pl-3 pr-7 py-1.5 text-xs text-gray-600 outline-none focus:ring-2 focus:ring-orange-400 cursor-pointer"
      >
        {children}
      </select>
      <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
    </div>
  );
}
