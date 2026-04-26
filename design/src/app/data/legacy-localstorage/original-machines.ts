// ORIGINAL LOCALSTORAGE IMPLEMENTATION - MOVED TO LEGACY FOR REFERENCE
// This is the complete original version before migration to Firestore

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

// Update a machine (immutable)
export function updateMachine(id: number, updates: Partial<Machine>): void {
  const machines = getMachines();
  let hasChanged = false;
  const updatedMachines = machines.map((m) => {
    if (m.id === id) {
      const updated = { ...m, ...updates };
      if (JSON.stringify(m) !== JSON.stringify(updated)) hasChanged = true;
      return updated;
    }
    return m;
  });

  if (hasChanged) {
    saveMachines(updatedMachines);
  }
}

// Delete a machine
export function deleteMachine(id: number): void {
  const machines = getMachines();
  const filtered = machines.filter((m) => m.id !== id);
  saveMachines(filtered);
}

// Get machine by ID
export function getMachineById(id: number): Machine | undefined {
  return getMachines().find((m) => m.id === id);
}

// Get machines by status
export function getMachinesByStatus(status: Status): Machine[] {
  return getMachines().filter((m) => m.status === status);
}

// Get machines by customer phone
export function getMachinesByCustomerPhone(phone: string): Machine[] {
  return getMachines().filter((m) => m.phone === phone);
}

// Get machines by registration type
export function getMachinesByRegistrationType(type: "online" | "in-person"): Machine[] {
  return getMachines().filter((m) => m.registrationType === type);
}
