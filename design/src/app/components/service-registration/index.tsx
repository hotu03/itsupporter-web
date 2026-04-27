import { useState, useEffect } from "react";
import { getServices, formatCurrency as formatCurr, type ServiceData } from "../../data/services";
import { validateFirestoreDiscount, useFirestoreDiscount } from "../../data/firestoreDiscounts";
import { addFirestoreMachine } from "../../data/firestoreMachines";
import { addFirestoreCustomer } from "../../data/firestoreCustomers";
import { addFirestoreTransaction } from "../../data/firestoreTransactions";
import { calculatePoints, type PointRule } from "../../data/points";
import { getFirestorePointRules } from "../../data/firestorePoints";
import { addFirestoreInvoice } from "../../data/firestoreInvoices";
import { createFirebaseCustomer, sendCustomerPasswordReset } from "../../data/firebase-auth";

import { toast } from "sonner";
import { ServiceRegistrationReceipt } from "./ServiceRegistrationReceipt";
import { ServiceRegistrationForm } from "./ServiceRegistrationForm";

interface ServiceRegistrationFormData {
  customerName: string;
  customerEmail: string;
  phone: string;
  machineCondition: string;
  warranty: "con" | "het";
  needs: string;
  password: string;
  charger: "co" | "khong";
  appointmentTime: string;
  dropOffTime: string;
  category: string;
  additionalServices: string[];
  serviceAmount: number;
  discountCode: string;
  discountAmount: number;
  finalAmount: number;
}

const initialForm: ServiceRegistrationFormData = {
  customerName: "",
  customerEmail: "",
  phone: "",
  machineCondition: "",
  warranty: "het",
  needs: "",
  password: "",
  charger: "khong",
  appointmentTime: "",
  dropOffTime: "",
  category: "Hardware",
  additionalServices: [],
  serviceAmount: 0,
  discountCode: "",
  discountAmount: 0,
  finalAmount: 0,
};

export default function ServiceRegistration() {
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptId, setReceiptId] = useState("");
  const [form, setForm] = useState<ServiceRegistrationFormData>(initialForm);
  const [discountError, setDiscountError] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availableServices, setAvailableServices] = useState<ServiceData[]>([]);
  const [servicesLoadError, setServicesLoadError] = useState("");
  const [pointRules, setPointRules] = useState<PointRule[]>([]);

  useEffect(() => {
    let isMounted = true;

    const loadServices = async () => {
      try {
        const services = await getServices();
        if (!isMounted) return;
        setAvailableServices(services);
        setServicesLoadError("");
      } catch {
        if (!isMounted) return;
        setAvailableServices([]);
        setServicesLoadError("Không thể tải danh sách dịch vụ");
      }
    };

    void loadServices();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadPointRules = async () => {
      try {
        const rules = await getFirestorePointRules();
        if (!isMounted) return;
        setPointRules(rules.filter((rule) => rule.enabled));
      } catch {
        if (!isMounted) return;
        setPointRules([]);
      }
    };

    void loadPointRules();

    return () => {
      isMounted = false;
    };
  }, []);

  // Auto-calculate service amount
  useEffect(() => {
    const total = form.additionalServices.reduce((sum, serviceName) => {
      const service = availableServices.find((s) => s.name === serviceName);
      return sum + (service?.price || 0);
    }, 0);
    setForm(prev => ({ ...prev, serviceAmount: total }));
  }, [form.additionalServices, availableServices]);

  // Auto-calculate final amount
  useEffect(() => {
    const final = Math.max(0, form.serviceAmount - form.discountAmount);
    setForm(prev => ({ ...prev, finalAmount: final }));
  }, [form.serviceAmount, form.discountAmount]);

  // Keep applied discount in sync when service total changes
  useEffect(() => {
    if (!discountApplied || !form.discountCode.trim()) return;

    let isMounted = true;

    const syncDiscount = async () => {
      const result = await validateFirestoreDiscount(form.discountCode, form.serviceAmount);
      if (!isMounted) return;

      if (!result.valid) {
        setDiscountApplied(false);
        setDiscountError(result.error || "Mã giảm giá không hợp lệ");
        setForm(prev => ({ ...prev, discountAmount: 0 }));
        return;
      }

      setDiscountError("");
      const nextDiscountAmount = result.discountAmount ?? 0;
      if (nextDiscountAmount !== form.discountAmount) {
        setForm(prev => ({ ...prev, discountAmount: nextDiscountAmount }));
      }
    };

    void syncDiscount();

    return () => {
      isMounted = false;
    };
  }, [discountApplied, form.discountCode, form.serviceAmount, form.discountAmount]);

  const handleApplyDiscount = async () => {
    const result = await validateFirestoreDiscount(form.discountCode, form.serviceAmount);
    if (!result.valid) {
      setDiscountError(result.error || "Mã giảm giá không hợp lệ");
      setDiscountApplied(false);
      setForm(prev => ({ ...prev, discountAmount: 0 }));
      return;
    }

    const used = await useFirestoreDiscount(form.discountCode);
    if (!used) {
      setDiscountError("Không thể ghi nhận lượt sử dụng mã giảm giá");
      setDiscountApplied(false);
      setForm(prev => ({ ...prev, discountAmount: 0 }));
      return;
    }

    setForm(prev => ({ ...prev, discountAmount: result.discountAmount ?? 0 }));
    setDiscountError("");
    setDiscountApplied(true);
  };

  const handleSubmit = async () => {
    if (servicesLoadError && form.additionalServices.length > 0) {
      toast.error("Không thể gửi đăng ký khi chưa tải được giá dịch vụ đã chọn");
      return;
    }

    if (!form.customerName || !form.phone || !form.customerEmail) {
      alert("Vui lòng điền đầy đủ thông tin khách hàng (tên, email, SĐT)!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.customerEmail)) {
      alert("Vui lòng nhập email hợp lệ!");
      return;
    }

    setIsSubmitting(true);

    try {
      const pointsEarned = calculatePoints(form.finalAmount, pointRules);
      const now = new Date();
      const currentTime = now.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }) + " " + now.toLocaleDateString("vi-VN").replace(/\//g, "/");
      const currentDate = now.toISOString().split("T")[0];

      const expiry = new Date(now.getTime() + 3 * 60 * 60 * 1000);
      const expiryTime = expiry.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });

      const serviceNames = form.additionalServices.length > 0
        ? form.additionalServices.join(", ")
        : (form.needs || "Dịch vụ khác");

      const id = await addFirestoreMachine({
        status: "WAITING",
        customerName: form.customerName,
        customerEmail: form.customerEmail,
        phone: form.phone,
        time: currentTime,
        description: serviceNames,
        expired: form.appointmentTime || expiryTime,
        category: form.category,
        tester: "",
        technician: "",
        warranty: form.warranty,
        password: form.password || "",
        charger: form.charger === "co",
        appointmentTime: form.appointmentTime || "",
        dropOffTime: form.dropOffTime || "",
        testerBefore: "",
        testerAfter: "",
        registrationType: "online",
        isApproved: false,
        machineCondition: form.machineCondition || "",
        needs: form.needs || "",
        additionalServices: form.additionalServices,
        serviceAmount: form.serviceAmount,
        discountCode: form.discountCode || "",
        discountAmount: form.discountAmount,
        paymentStatus: form.finalAmount === 0 ? "free" : "pending",
        finalAmount: form.finalAmount,
        pointsEarned: pointsEarned,
      });

      await addFirestoreCustomer({
        name: form.customerName,
        phone: form.phone,
        email: form.customerEmail,
        createdAt: currentDate,
        totalRepairs: 0,
        points: 0,
      });
      toast.success("Đã thêm khách hàng!");

      try {
        const tempPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
        await createFirebaseCustomer(form.customerEmail, tempPassword);
        await sendCustomerPasswordReset(form.customerEmail);
        toast.success("Tài khoản đã được tạo! Vui lòng kiểm tra email để đặt mật khẩu.");
      } catch (err: any) {
        if (err.code === 'auth/email-already-in-use') {
          try {
            await sendCustomerPasswordReset(form.customerEmail);
            toast.success("Tài khoản đã tồn tại! Vui lòng kiểm tra email để đặt mật khẩu.");
          } catch {
            // Ignore email sending error
          }
        } else {
          console.error("Firebase Auth error:", err);
        }
      }

      try {
        await addFirestoreTransaction({
          machineId: id,
          customerName: form.customerName,
          phone: form.phone,
          service: serviceNames,
          amount: form.finalAmount,
          paymentStatus: form.finalAmount === 0 ? "free" : "pending",
          date: currentDate,
          discountCode: form.discountCode || "",
          discountAmount: form.discountAmount > 0 ? form.discountAmount : 0,
        });
        toast.success("Đã thêm giao dịch!");
      } catch (err) {
        console.error("Add transaction error:", err);
        toast.error("Lỗi khi thêm giao dịch: " + (err as Error).message);
      }

      try {
        await addFirestoreInvoice({
          machineId: id,
          customerName: form.customerName,
          customerEmail: form.customerEmail,
          phone: form.phone,
          registrationType: "online",
          services: form.additionalServices.map(serviceName => {
            const service = availableServices.find((s) => s.name === serviceName);
            return { name: serviceName, price: service?.price || 0 };
          }),
          machineCondition: form.machineCondition || "",
          needs: form.needs || "",
          category: form.category,
          warranty: form.warranty,
          charger: form.charger === "co",
          password: form.password || "",
          createdAt: currentDate,
          createdTime: currentTime,
          dropOffTime: form.dropOffTime || "",
          appointmentTime: form.appointmentTime || "",
          serviceAmount: form.serviceAmount,
          discountCode: form.discountCode || "",
          discountAmount: form.discountAmount,
          finalAmount: form.finalAmount,
          paymentStatus: form.finalAmount === 0 ? "free" : "pending",
          pointsEarned: pointsEarned,
          createdBy: "Khách hàng (Online)",
        });
        toast.success("Đã thêm hóa đơn!");
      } catch (err) {
        console.error("Add invoice error:", err);
        toast.error("Lỗi khi thêm hóa đơn: " + (err as Error).message);
      }

      setReceiptId(id);
      setShowReceipt(true);
    } catch (err) {
      console.error("Submit error:", err);
      toast.error("Đã xảy ra lỗi khi đăng ký dịch vụ. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewRegistration = () => {
    setShowReceipt(false);
    setForm(initialForm);
    setDiscountError("");
    setDiscountApplied(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const currentDate = new Date().toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const currentTime = new Date().toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (showReceipt) {
    return (
      <ServiceRegistrationReceipt
        receiptId={receiptId}
        form={form}
        currentDate={currentDate}
        currentTime={currentTime}
        availableServices={availableServices}
        formatCurr={formatCurr}
        onNewRegistration={handleNewRegistration}
        onPrint={handlePrint}
      />
    );
  }

  return (
    <ServiceRegistrationForm
      form={form}
      setForm={setForm}
      availableServices={availableServices}
      discountError={discountError}
      discountApplied={discountApplied}
      onApplyDiscount={handleApplyDiscount}
      onSubmit={handleSubmit}
      formatCurr={formatCurr}
      isSubmitting={isSubmitting}
    />
  );
}