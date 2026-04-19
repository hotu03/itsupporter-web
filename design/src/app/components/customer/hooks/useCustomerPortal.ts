import { useState, useEffect } from "react";
import { getFirestoreMachines } from "../../../data/firestoreMachines";
import { getFirestoreCustomers, getFirestoreCustomerByEmail, updateFirestoreCustomer, type Customer } from "../../../data/firestoreCustomers";
import { getFirestoreCustomerPointHistoryByEmail, getFirestoreCustomerPointHistory, addFirestorePointHistory, type PointHistory } from "../../../data/firestorePoints";
import { getFirestoreDiscounts, type DiscountCode } from "../../../data/firestoreDiscounts";
import { getFirestoreInvoicesByEmail, type Invoice } from "../../../data/firestoreInvoices";
import {
  getFirestoreCustomerRedeemedVouchersByEmail,
  isFirestoreVoucherRedeemedByCustomerEmail,
  addFirestoreRedeemedVoucher,
  type RedeemedVoucher,
} from "../../../data/firestoreRedeemedVouchers";
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

    async function loadCustomerData() {
      try {
        // Get customer by email
        const foundCustomer = await getFirestoreCustomerByEmail(email);
        if (!foundCustomer) {
          setLoading(false);
          return;
        }
        setCustomer(foundCustomer);

        // Get customer's machines
        const allMachines = await getFirestoreMachines();
        const customerMachines = allMachines.filter((m) => m.phone === foundCustomer.phone);
        setMachines(customerMachines);

        // Get point history (by email or fallback to phone)
        const historyByEmail = await getFirestoreCustomerPointHistoryByEmail(email);
        const historyByPhone = await getFirestoreCustomerPointHistory(foundCustomer.phone);
        const combinedHistory = [...historyByEmail];
        historyByPhone.forEach((h) => {
          if (!combinedHistory.find((c) => c.id === h.id)) {
            combinedHistory.push(h);
          }
        });
        setPointHistory(combinedHistory.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));

        // Get redeemable vouchers
        const allDiscounts = await getFirestoreDiscounts();
        const redeemable = allDiscounts.filter(
          (d) => d.isRedeemable && d.pointsRequired && d.pointsRequired <= foundCustomer.points
        );
        setRedeemableVouchers(redeemable);

        // Get customer's invoices (by email or phone)
        const invoicesByEmail = await getFirestoreInvoicesByEmail(email);
        setInvoices(invoicesByEmail);

        // Get redeemed vouchers (by email or phone)
        const redeemedByEmail = await getFirestoreCustomerRedeemedVouchersByEmail(email);
        setRedeemedVouchers(redeemedByEmail);

        setLoading(false);
      } catch (err) {
        console.error("Error loading customer portal data:", err);
        setLoading(false);
      }
    }

    loadCustomerData();
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
  const handleRedeem = async (voucher: DiscountCode) => {
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
    const byEmail = await isFirestoreVoucherRedeemedByCustomerEmail(customer.email, voucher.code);
    if (byEmail) {
      toast.error("Bạn đã đổi voucher này rồi");
      return;
    }

    try {
      // Add redeemed voucher
      const redeemedVoucher: Omit<RedeemedVoucher, 'id'> = {
        customerPhone: customer.phone,
        customerEmail: customer.email,
        customerName: customer.name,
        voucherCode: voucher.code,
        voucherName: voucher.description || voucher.code,
        pointsSpent: voucher.pointsRequired,
        redeemedAt: new Date().toISOString(),
      };
      await addFirestoreRedeemedVoucher(redeemedVoucher);

      // Add point history (spend points) to Firestore
      await addFirestorePointHistory({
        customerPhone: customer.phone,
        customerEmail: customer.email,
        customerName: customer.name,
        type: "spend",
        points: voucher.pointsRequired,
        date: new Date().toISOString(),
        description: `Đổi voucher ${voucher.code}`,
        relatedId: voucher.id,
      });

      // Update customer points in Firestore
      await updateFirestoreCustomer(String(customer.id), {
        points: customer.points - voucher.pointsRequired,
      });

      toast.success(`Đã đổi voucher ${voucher.code} thành công!`);
      onSuccess();
    } catch (err) {
      console.error("Error redeeming voucher:", err);
      toast.error("Đã xảy ra lỗi khi đổi voucher");
    }
  };

  return { handleRedeem };
}
