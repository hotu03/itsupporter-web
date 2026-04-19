import { useState, useEffect, useMemo } from "react";
import { getMachines } from "../../../data/machines";
import { getCustomers } from "../../../data/customers";
import { getTransactions } from "../../../data/finance";
import { getMembers } from "../../../data/members";
import type { Machine } from "../../../data/machines";
import type { Customer } from "../../../data/customers";
import type { Transaction } from "../../../data/finance";
import type { Member } from "../../../data/members";

export interface MachineStats {
  total: number;
  complete: number;
  running: number;
  waiting: number;
  retesting: number;
  returning: number;
  returned: number;
}

export interface FinanceStats {
  totalRevenue: number;
  pendingRevenue: number;
  totalTransactions: number;
  paidCount: number;
  freeCount: number;
  pendingCount: number;
}

export interface RevenueTrendItem {
  month: string;
  revenue: number;
  transactions: number;
}

export interface PersonnelStats {
  totalApproved: number;
  technicians: number;
  testers: number;
  active: number;
  inactive: number;
  pending: number;
}

export interface DashboardData {
  // Raw data
  machines: Machine[];
  customers: Customer[];
  transactions: Transaction[];
  members: Member[];

  // Computed stats
  machineStats: MachineStats;
  financeStats: FinanceStats;
  revenueTrend: RevenueTrendItem[];

  // Personnel
  topTechnicians: Member[];
  topTesters: Member[];
  pendingMembers: Member[];
  personnelStats: PersonnelStats;

  // Customers
  topCustomers: Customer[];
  customerStats: {
    total: number;
    totalRepairs: number;
    totalPoints: number;
  };

  // Recent lists
  recentMachines: Machine[];
  recentTransactions: Transaction[];
}

function computeMachineStats(machines: Machine[]): MachineStats {
  return {
    total: machines.length,
    complete: machines.filter(m => m.status === "COMPLETE").length,
    running: machines.filter(m => m.status === "RUNNING").length,
    waiting: machines.filter(m => m.status === "WAITING").length,
    retesting: machines.filter(m => m.status === "RETESTING").length,
    returning: machines.filter(m => m.status === "RETURNING").length,
    returned: machines.filter(m => m.status === "RETURNED").length,
  };
}

function computeFinanceStats(transactions: Transaction[]): FinanceStats {
  const totalRevenue = transactions
    .filter(t => t.paymentStatus === "paid")
    .reduce((sum, t) => sum + t.amount, 0);

  const pendingRevenue = transactions
    .filter(t => t.paymentStatus === "pending")
    .reduce((sum, t) => sum + t.amount, 0);

  return {
    totalRevenue,
    pendingRevenue,
    totalTransactions: transactions.length,
    paidCount: transactions.filter(t => t.amount > 0 && t.paymentStatus === "paid").length,
    freeCount: transactions.filter(t => t.paymentStatus === "free" || t.amount === 0).length,
    pendingCount: transactions.filter(t => t.paymentStatus === "pending").length,
  };
}

function computeRevenueTrend(transactions: Transaction[]): RevenueTrendItem[] {
  const now = new Date();
  const months: RevenueTrendItem[] = [];

  // Build last 6 months
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const monthLabel = `T${d.getMonth() + 1}`;

    const monthTx = transactions.filter(t => t.date && t.date.startsWith(monthKey) && t.paymentStatus === "paid");
    const revenue = monthTx.reduce((sum, t) => sum + t.amount, 0);

    months.push({
      month: monthLabel,
      revenue,
      transactions: monthTx.length,
    });
  }

  return months;
}

function computePersonnelStats(members: Member[]) {
  const approved = members.filter(m => m.approvalStatus === "approved");
  return {
    totalApproved: approved.length,
    technicians: approved.filter(m => m.type === "technician").length,
    testers: approved.filter(m => m.type === "tester").length,
    active: approved.filter(m => m.status === "active").length,
    inactive: approved.filter(m => m.status === "inactive").length,
    pending: members.filter(m => m.approvalStatus === "pending").length,
  };
}

export function useDashboardData(): DashboardData {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    setMachines(getMachines());
    setCustomers(getCustomers());
    setTransactions(getTransactions());
    setMembers(getMembers());
  }, []);

  // Re-compute whenever any data changes
  const machineStats = useMemo(() => computeMachineStats(machines), [machines]);
  const financeStats = useMemo(() => computeFinanceStats(transactions), [transactions]);
  const revenueTrend = useMemo(() => computeRevenueTrend(transactions), [transactions]);
  const personnelStats = useMemo(() => computePersonnelStats(members), [members]);

  const topTechnicians = useMemo(() => {
    return [...members]
      .filter(m => m.type === "technician" && m.approvalStatus === "approved")
      .sort((a, b) => b.machinesDone - a.machinesDone)
      .slice(0, 5);
  }, [members]);

  const topTesters = useMemo(() => {
    return [...members]
      .filter(m => m.type === "tester" && m.approvalStatus === "approved")
      .sort((a, b) => b.testsRun - a.testsRun)
      .slice(0, 5);
  }, [members]);

  const pendingMembers = useMemo(() => {
    return members
      .filter(m => m.approvalStatus === "pending")
      .slice(0, 5);
  }, [members]);

  const topCustomers = useMemo(() => {
    return [...customers]
      .sort((a, b) => b.points - a.points)
      .slice(0, 5);
  }, [customers]);

  const customerStats = useMemo(() => {
    return {
      total: customers.length,
      totalRepairs: customers.reduce((sum, c) => sum + (c.totalRepairs || 0), 0),
      totalPoints: customers.reduce((sum, c) => sum + (c.points || 0), 0),
    };
  }, [customers]);

  // Sort machines by time (newest first) for recent list
  const recentMachines = useMemo(() => {
    return [...machines]
      .sort((a, b) => a.time.localeCompare(b.time))
      .slice(0, 5);
  }, [machines]);

  // Sort transactions by date (newest first) for recent list
  const recentTransactions = useMemo(() => {
    return [...transactions]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
  }, [transactions]);

  return {
    machines,
    customers,
    transactions,
    members,
    machineStats,
    financeStats,
    revenueTrend,
    topTechnicians,
    topTesters,
    pendingMembers,
    personnelStats,
    topCustomers,
    customerStats,
    recentMachines,
    recentTransactions,
  };
}
