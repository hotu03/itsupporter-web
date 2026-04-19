import { useState, useEffect } from "react";
import { getServices, formatCurrency as formatCurr } from "../../data/services";
import { validateDiscount, useDiscount } from "../../data/discounts";
import { addFirestoreMachine } from "../../data/firestoreMachines";
import { registerCustomer } from "../../data/customers";
import { addTransaction } from "../../data/finance";
import { calculatePoints } from "../../data/points";
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
  const [receiptId, setReceiptId] = useState(0);
  const [form, setForm] = useState<ServiceRegistrationFormData>(initialForm);
  const [discountError, setDiscountError] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);

  const availableServices = getServices();

  // Auto-calculate service amount
  useEffect(() => {
    const total = form.additionalServices.reduce((sum, serviceName) => {
      const service = availableServices.find(s => s.name === serviceName);
      return sum + (service?.price || 0);
    }, 0);
    setForm(prev => ({ ...prev, serviceAmount: total }));
  }, [form.additionalServices, availableServices]);

  // Auto-calculate final amount
  useEffect(() => {
    const final = Math.max(0, form.serviceAmount - form.discountAmount);
    setForm(prev => ({ ...prev, finalAmount: final }));
  }, [form.serviceAmount, form.discountAmount]);

  const handleApplyDiscount = () => {
    const result = validateDiscount(form.discountCode, form.serviceAmount);
    if (!result.valid) {
      setDiscountError(result.error || "Mã giảm giá không hợp lệ");
      setDiscountApplied(false);
      setForm(prev => ({ ...prev, discountAmount: 0 }));
      return;
    }
    useDiscount(form.discountCode);
    setForm(prev => ({ ...prev, discountAmount: result.discountAmount ?? 0 }));
    setDiscountError("");
    setDiscountApplied(true);
  };

  const handleSubmit = async () => {
    if (!form.customerName || !form.phone || !form.customerEmail) {
      alert("Vui lòng điền đầy đủ thông tin khách hàng (tên, email, SĐT)!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.customerEmail)) {
      alert("Vui lòng nhập email hợp lệ!");
      return;
    }

    const pointsEarned = calculatePoints(form.finalAmount);
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
      password: form.password,
      charger: form.charger === "co",
      appointmentTime: form.appointmentTime,
      dropOffTime: form.dropOffTime || undefined,
      testerBefore: "",
      testerAfter: "",
      registrationType: "online",
      isApproved: false,
      machineCondition: form.machineCondition,
      needs: form.needs,
      additionalServices: form.additionalServices,
      serviceAmount: form.serviceAmount,
      discountCode: form.discountCode,
      discountAmount: form.discountAmount,
      paymentStatus: form.finalAmount === 0 ? "free" : "pending",
      finalAmount: form.finalAmount,
      pointsEarned: pointsEarned,
    });

    registerCustomer(form.customerName, form.phone, form.customerEmail);

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

    addTransaction({
      machineId: id,
      customerName: form.customerName,
      phone: form.phone,
      service: serviceNames,
      amount: form.finalAmount,
      paymentStatus: form.finalAmount === 0 ? "free" : "pending",
      date: currentDate,
      discountCode: form.discountCode || undefined,
      discountAmount: form.discountAmount > 0 ? form.discountAmount : undefined,
    });

    addFirestoreInvoice({
      machineId: id,
      customerName: form.customerName,
      customerEmail: form.customerEmail,
      phone: form.phone,
      registrationType: "online",
      services: form.additionalServices.map(serviceName => {
        const service = availableServices.find(s => s.name === serviceName);
        return { name: serviceName, price: service?.price || 0 };
      }),
      machineCondition: form.machineCondition,
      needs: form.needs,
      category: form.category,
      warranty: form.warranty,
      charger: form.charger === "co",
      password: form.password,
      createdAt: currentDate,
      createdTime: currentTime,
      dropOffTime: form.dropOffTime,
      appointmentTime: form.appointmentTime,
      serviceAmount: form.serviceAmount,
      discountCode: form.discountCode,
      discountAmount: form.discountAmount,
      finalAmount: form.finalAmount,
      paymentStatus: form.finalAmount === 0 ? "free" : "pending",
      pointsEarned: pointsEarned,
      createdBy: "Khách hàng (Online)",
    });

    setReceiptId(Number(id));
    setShowReceipt(true);
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
    />
  );
}