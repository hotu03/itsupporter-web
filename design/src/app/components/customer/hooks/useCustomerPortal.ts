import { useState, useEffect } from "react";
import { getMachines, type Machine } from "../../../data/machines";
import { getCustomers, getCustomerByEmail, type Customer } from "../../../data/customers";
import { getCustomerPointHistoryByEmail, type PointHistory } from "../../../data/points";
import { getDiscounts, type DiscountCode } from "../../../data/discounts";
import { getInvoicesByEmail, type Invoice } from "../../../data/invoices";
import {
  getCustomerRedeemedVouchersByEmail,
  isVoucherRedeemedByCustomerEmail,
  addRedeemedVoucher,
  type RedeemedVoucher,
} from "../../../data/redeemed-vouchers";
import { getCustomerPointHistory } from "../../../data/points";
import { addPointHistory } from "../../../data/points";
import { saveCustomers } from "../../../data/customers";
import { toast } from "sonner";

export interface CustomerPortalData {
  customer: Customer | null;
  machines: Machine[];
  pointHistory: PointHistory[];
  redeemableVouchers: DiscountCode[];
  redeemedVouchers: RedeemedVoucher[];
  invoices: Invoice[];
  loading: boolean;
}

export function useCustomerPortal(email: string): CustomerPortalData {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [machines, setMachines] = useState<Machine[]>([]);
  const [pointHistory, setPointHistory] = useState<PointHistory[]>([]);
  const [redeemableVouchers, setRedeemableVouchers] = useState<DiscountCode[]>([]);
  const [redeemedVouchers, setRedeemedVouchers] = useState<RedeemedVoucher[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!email) {
      setLoading(false);
      return;
    }

    // Get customer by email
    const foundCustomer = getCustomerByEmail(email);
    if (!foundCustomer) {
      setLoading(false);
      return;
    }
    setCustomer(foundCustomer);

    // Get customer's machines
    const allMachines = getMachines();
    const customerMachines = allMachines.filter((m) => m.phone === foundCustomer.phone);
    setMachines(customerMachines);

    // Get point history (by email or fallback to phone)
    const historyByEmail = getCustomerPointHistoryByEmail(email);
    const historyByPhone = getCustomerPointHistory(foundCustomer.phone);
    const combinedHistory = [...historyByEmail];
    historyByPhone.forEach((h) => {
      if (!combinedHistory.find((c) => c.id === h.id)) {
        combinedHistory.push(h);
      }
    });
    setPointHistory(combinedHistory.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));

    // Get redeemable vouchers
    const allDiscounts = getDiscounts();
    const redeemable = allDiscounts.filter(
      (d) => d.isRedeemable && d.pointsRequired && d.pointsRequired <= foundCustomer.points
    );
    setRedeemableVouchers(redeemable);

    // Get customer's invoices (by email or phone)
    const invoicesByEmail = getInvoicesByEmail(email);
    setInvoices(invoicesByEmail);

    // Get redeemed vouchers (by email or phone)
    const redeemedByEmail = getCustomerRedeemedVouchersByEmail(email);
    setRedeemedVouchers(redeemedByEmail);

    setLoading(false);
  }, [email]);

  return {
    customer,
    machines,
    pointHistory,
    redeemableVouchers,
    redeemedVouchers,
    invoices,
    loading,
  };
}

export function useRedeemVoucher(
  customer: Customer | null,
  onSuccess: () => void
) {
  const handleRedeem = (voucher: DiscountCode) => {
    if (!customer || !voucher.pointsRequired) return;

    if (customer.points < voucher.pointsRequired) {
      toast.error("Bạn không đủ điểm để đổi voucher này");
      return;
    }

    // Check if already redeemed (by email or phone)
    if (!customer.email) {
      toast.error("Không tìm thấy email khách hàng");
      return;
    }
    const byEmail = isVoucherRedeemedByCustomerEmail(customer.email, voucher.code);
    if (byEmail) {
      toast.error("Bạn đã đổi voucher này rồi");
      return;
    }

    // Add redeemed voucher
    const redeemedVoucher: RedeemedVoucher = {
      id: `RV-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      customerPhone: customer.phone,
      customerEmail: customer.email,
      customerName: customer.name,
      voucherCode: voucher.code,
      voucherName: voucher.description || voucher.code,
      pointsSpent: voucher.pointsRequired,
      redeemedAt: new Date().toISOString(),
    };
    addRedeemedVoucher(redeemedVoucher);

    // Add point history (spend points)
    const pointHistoryEntry: PointHistory = {
      id: `PH-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      customerPhone: customer.phone,
      customerEmail: customer.email,
      customerName: customer.name,
      type: "spend",
      points: voucher.pointsRequired,
      date: new Date().toISOString(),
      description: `Đổi voucher ${voucher.code}`,
      relatedId: voucher.id,
    };
    addPointHistory(pointHistoryEntry);

    // Update customer points
    const customers = getCustomers();
    const customerIndex = customers.findIndex((c) => c.phone === customer.phone);
    if (customerIndex !== -1) {
      customers[customerIndex].points -= voucher.pointsRequired;
      saveCustomers(customers);
    }

    toast.success(`Đã đổi voucher ${voucher.code} thành công!`);
    onSuccess();
  };

  return { handleRedeem };
}
