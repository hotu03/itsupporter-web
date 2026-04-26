/**
 * @deprecated Use firestoreMachines.ts instead.
 * This file is kept as a deprecated stub for backward compatibility.
 * All data operations are redirected to the Firestore implementation.
 * Pure types are kept.
 */

import {
  getFirestoreMachines,
  addFirestoreMachine,
  updateFirestoreMachine,
  getNextFirestoreMachineId,
} from './firestoreMachines';

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

// ─── Deprecated Data Stubs (redirect to Firestore) ──────────────────────────

export async function getMachines(): Promise<Machine[]> {
  console.warn("[DEPRECATED] getMachines() from machines.ts → Use getFirestoreMachines() from firestoreMachines.ts");
  return getFirestoreMachines();
}

export async function addMachine(machine: Omit<Machine, "id">): Promise<Machine> {
  console.warn("[DEPRECATED] addMachine() from machines.ts → Use addFirestoreMachine() from firestoreMachines.ts");
  const id = await addFirestoreMachine(machine as any);
  return { ...machine, id } as Machine;
}

export async function updateMachine(id: string | number, updates: Partial<Machine>): Promise<void> {
  console.warn("[DEPRECATED] updateMachine() from machines.ts → Use updateFirestoreMachine() from firestoreMachines.ts");
  await updateFirestoreMachine(String(id), updates as any);
}

export async function getNextMachineId(): Promise<number> {
  console.warn("[DEPRECATED] getNextMachineId() from machines.ts → Use getNextFirestoreMachineId() from firestoreMachines.ts");
  return getNextFirestoreMachineId();
}

// Legacy sequential ID function (for backward compatibility with old code)
export function ensureSequentialId(machines: Machine[]): number {
  console.warn("[DEPRECATED] ensureSequentialId() from machines.ts - This is now handled by Firestore getNextFirestoreMachineId()");
  if (machines.length === 0) return 1;
  const maxId = machines.reduce((max, m) => {
    const id = typeof m.id === 'number' && !isNaN(m.id as any) && (m.id as number) < 1000000000 ? (m.id as number) : 0;
    return id > max ? id : max;
  }, 0);
  return maxId + 1;
}

export function getMachineById(id: string | number): Machine | undefined {
  console.warn("[DEPRECATED] getMachineById() from machines.ts");
  return undefined;
}

export function getMachinesByStatus(status: Status): Machine[] {
  console.warn("[DEPRECATED] getMachinesByStatus() from machines.ts");
  return [];
}

export function getMachinesByCustomerPhone(phone: string): Machine[] {
  console.warn("[DEPRECATED] getMachinesByCustomerPhone() from machines.ts");
  return [];
}

export function deleteMachine(id: string | number): void {
  console.warn("[DEPRECATED] deleteMachine() from machines.ts");
}

// UI styling constants (kept in stub for backward compatibility with MachineCard and MachineRow)
export const STATUS_STYLES = {
  COMPLETE: "bg-green-100 text-green-700",
  RUNNING: "bg-blue-100 text-blue-700",
  WAITING: "bg-yellow-100 text-yellow-700",
  RETURNING: "bg-purple-100 text-purple-700",
  RETESTING: "bg-orange-100 text-orange-700",
  RETURNED: "bg-gray-100 text-gray-700",
};