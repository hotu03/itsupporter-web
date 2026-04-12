// Shared machine data management

export type Status = "COMPLETE" | "RUNNING" | "WAITING" | "RETURNING" | "RETESTING" | "RETURNED";

export interface Machine {
  id: number;
  status: Status;
  customerName: string;
  phone: string;
  time: string;
  description: string;
  expired: string;
  category: string;
  tester: string;
  technician: string;
  warranty: "con" | "het";
  password: string;
  charger: boolean;
  appointmentTime: string;
  dropOffTime?: string;
  testerBefore: string;
  testerAfter: string;
  registrationType: "online" | "in-person"; // online = đăng ký trực tuyến, in-person = đăng ký tại quầy
  isApproved?: boolean; // true = đã duyệt vào hệ thống chính (chỉ dùng cho online)
  machineCondition?: string;
  needs?: string;
  checklistBefore?: boolean[];
  checklistAfter?: boolean[];
  notesBefore?: string[];
  notesAfter?: string[];
  techChecklist?: boolean[];
  techNotes?: string;
  adminConfirmNote?: string;
  customerSignature?: string;
  additionalServices?: string[];
  serviceAmount?: number;
  discountCode?: string;
  discountAmount?: number;
  paymentStatus?: "paid" | "pending" | "free";
  finalAmount?: number;
  pointsEarned?: number;
}

// Get machines from localStorage
export function getMachines(): Machine[] {
  if (typeof window === "undefined") return [];

  const stored = localStorage.getItem("its_machines");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  }
  return [];
}

// Save machines to localStorage
export function saveMachines(machines: Machine[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("its_machines", JSON.stringify(machines));
}

// Add a new machine - always use next sequential ID = max(current IDs) + 1
export function addMachine(machine: Omit<Machine, "id">): Machine {
  const machines = getMachines();

  // Find the highest existing sequential ID safely (ignore old timestamp IDs)
  let maxId = 0;
  if (machines.length > 0) {
    maxId = machines.reduce((max, m) => {
      const id = typeof m.id === 'number' && !isNaN(m.id) && m.id < 1000000000 ? m.id : 0;
      return id > max ? id : max;
    }, 0);
  }

  const newId = maxId + 1;

  const newMachine: Machine = {
    ...machine,
    id: newId,
    time: new Date().toLocaleString('vi-VN'),
    isApproved: machine.registrationType === "online" ? false : true,
  };

  const updatedMachines = [...machines, newMachine];
  saveMachines(updatedMachines);

  console.log(`Created machine with sequential ID: ${newId}`); // for debugging

  return newMachine;
}

// Update a machine (immutable - per coding-style.md CRITICAL rule; uses map for new array + scoped change detection)
export function updateMachine(id: number, updates: Partial<Machine>): void {
  const machines = getMachines();
  let hasChanged = false;
  const updatedMachines = machines.map((m) => {
    if (m.id === id) {
      const updated = { ...m, ...updates };
      // Scoped comparison to avoid full array stringify issues
      if (JSON.stringify(m) !== JSON.stringify(updated)) hasChanged = true;
      return updated;
    }
    return m;
  });

  if (hasChanged) {
    saveMachines(updatedMachines);
  }
}

// Helper to convert a potential timestamp ID to a clean sequential ID
export function ensureSequentialId(machines: Machine[], currentId?: number): number {
  if (typeof currentId === 'number' && currentId < 1000000000) {
    return currentId; // Already a sequential ID
  }

  // Generate new sequential ID
  let maxId = 0;
  if (machines.length > 0) {
    maxId = machines.reduce((max, m) => {
      const id = typeof m.id === 'number' && !isNaN(m.id) && m.id < 1000000000 ? m.id : 0;
      return id > max ? id : max;
    }, 0);
  }
  return maxId + 1;
}

// Delete a machine (already immutable with filter)
export function deleteMachine(id: number): void {
  const machines = getMachines();
  const filtered = machines.filter((m) => m.id !== id);
  saveMachines(filtered);
}

// Find machine by ID (added for repository pattern completeness per patterns.md)
export function findMachineById(id: number): Machine | undefined {
  return getMachines().find((m) => m.id === id);
}

// Status styles for UI (immutable const per coding-style.md CRITICAL rule, shared across MachineCard, MachineRow)
export const STATUS_STYLES: Record<Status, string> = {
  COMPLETE: "bg-orange-500 text-white",
  RUNNING: "bg-blue-500 text-white",
  WAITING: "bg-yellow-400 text-white",
  RETURNING: "bg-purple-500 text-white",
  RETESTING: "bg-teal-500 text-white",
  RETURNED: "bg-green-500 text-white",
};

export function getStatusStyle(status: Status): string {
  return STATUS_STYLES[status] || "bg-gray-500 text-white";
}
