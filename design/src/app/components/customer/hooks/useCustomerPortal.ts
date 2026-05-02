import { useState, useEffect } from "react";
import { getFirestoreMachinesByEmail } from "../../../data/firestoreMachines";
import { getFirestoreCustomerByEmail, updateFirestoreCustomer, type Customer } from "../../../data/firestoreCustomers";
import { getFirestoreCustomerPointHistoryByEmail, addFirestorePointHistory, type PointHistory } from "../../../data/firestorePoints";
import { getFirestoreDiscounts, type DiscountCode } from "../../../data/firestoreDiscounts";
import { getFirestoreInvoicesByEmail, type Invoice } from "../../../data/firestoreInvoices";
import {
  getFirestoreCustomerRedeemedVouchersByEmail,
  isFirestoreVoucherRedeemedByCustomerEmail,
  addFirestoreRedeemedVoucher,
  getCustomerVouchersWithStatusByEmail,
  type RedeemedVoucher,
  type VoucherWithStatus,
} from "../../../data/firestoreRedeemedVouchers";
import type { Machine } from "../../../data/machines";
import { toast } from "sonner";

export interface CustomerPortalData {
  customer: Customer | null;
  machines: Machine[];
  pointHistory: PointHistory[];
  redeemableVouchers: DiscountCode[];
  redeemedVouchers: RedeemedVoucher[];
  vouchersWithStatus: VoucherWithStatus[];
  invoices: Invoice[];
  loading: boolean;
}

export function useCustomerPortal(email: string): CustomerPortalData {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [machines, setMachines] = useState<Machine[]>([]);
  const [pointHistory, setPointHistory] = useState<PointHistory[]>([]);
  const [redeemableVouchers, setRedeemableVouchers] = useState<DiscountCode[]>([]);
  const [redeemedVouchers, setRedeemedVouchers] = useState<RedeemedVoucher[]>([]);
  const [vouchersWithStatus, setVouchersWithStatus] = useState<VoucherWithStatus[]>([]);
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

        // Get customer's machines (filtered by email at Firestore level)
        const customerMachines = await getFirestoreMachinesByEmail(email);
        setMachines(customerMachines);

        // Get point history (by email only - email is the primary key)
        const historyByEmail = await getFirestoreCustomerPointHistoryByEmail(email);
        setPointHistory(historyByEmail.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));

        // Get customer's invoices (by email or phone)
        const invoicesByEmail = await getFirestoreInvoicesByEmail(email);
        setInvoices(invoicesByEmail);

        // Get redeemed vouchers (by email or phone) - needed for filtering redeemable
        const redeemedByEmail = await getFirestoreCustomerRedeemedVouchersByEmail(email);
        setRedeemedVouchers(redeemedByEmail);

        // Get vouchers with status for display (filtered by email at Firestore level)
        const withStatus = await getCustomerVouchersWithStatusByEmail(email);
        setVouchersWithStatus(withStatus);

        // Get redeemable vouchers (exclude already redeemed codes AND expired vouchers)
        const allDiscounts = await getFirestoreDiscounts();
        const redeemedCodes = new Set(redeemedByEmail.map((rv) => rv.voucherCode.toUpperCase()));
        const now = new Date();
        const redeemable = allDiscounts.filter((d) => {
          const voucherValidUntil = new Date(d.validUntil);
          voucherValidUntil.setHours(23, 59, 59, 999);
          return (
            d.isRedeemable &&
            d.pointsRequired &&
            d.pointsRequired <= foundCustomer.points &&
            !redeemedCodes.has(d.code.toUpperCase()) &&
            voucherValidUntil > now
          );
        });
        setRedeemableVouchers(redeemable);

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
    vouchersWithStatus,
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
