// Original localStorage implementation of machines.ts (moved here for reference)
// This file is kept for historical reference only. All active code uses Firestore.

export type Status = "COMPLETE" | "RUNNING" | "WAITING" | "RETURNING" | "RETESTING" | "RETURNED";

export interface Machine {
  id: string | number;
  status: Status;
  customerName: string;
  customerEmail: string;
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
  registrationType: "online" | "in-person";
  isApproved?: boolean;
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
  if (!stored) return [];

  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.warn("Failed to parse machines from localStorage, resetting:", e);
    localStorage.removeItem("its_machines");
    return [];
  }
}

// Save machines to localStorage
export function saveMachines(machines: Machine[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("its_machines", JSON.stringify(machines));
}

// Add a new machine - always use next sequential ID = max(current IDs) + 1
export function addMachine(machine: Omit<Machine, "id">): Machine {
  const machines = getMachines();

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

  saveMachines([newMachine, ...machines]);
  return newMachine;
}

// Additional functions from original file would go here...
// (This is a partial archive for reference)
