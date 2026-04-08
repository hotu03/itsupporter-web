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

// Add a new machine
export function addMachine(machine: Omit<Machine, "id">): Machine {
  const machines = getMachines();
  const newId = machines.length > 0 ? Math.max(...machines.map(m => m.id)) + 1 : 1;

  const newMachine: Machine = {
    ...machine,
    id: newId,
  };

  machines.push(newMachine);
  saveMachines(machines);

  return newMachine;
}

// Update a machine
export function updateMachine(id: number, updates: Partial<Machine>): void {
  const machines = getMachines();
  const index = machines.findIndex(m => m.id === id);

  if (index !== -1) {
    machines[index] = { ...machines[index], ...updates };
    saveMachines(machines);
  }
}

// Delete a machine
export function deleteMachine(id: number): void {
  const machines = getMachines();
  const filtered = machines.filter(m => m.id !== id);
  saveMachines(filtered);
}
