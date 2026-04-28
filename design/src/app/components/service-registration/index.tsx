import { useState, useEffect } from "react";
import { getServices, formatCurrency as formatCurr, type ServiceData } from "../../data/services";
import { validateFirestoreDiscount } from "../../data/firestoreDiscounts";
import { calculatePoints, type PointRule } from "../../data/points";
import { getFirestorePointRules } from "../../data/firestorePoints";
import { createFirebaseCustomer, sendCustomerPasswordReset } from "../../data/firebase-auth";
import { submitOnlineRegistrationTransaction } from "../../data/onlineRegistrationOrchestrator";
import { buildOperationId } from "../../data/operationKeys";
import { getErrorMessage } from "../../utils/errors";

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
      try {
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
      } catch (error) {
        if (!isMounted) return;
        setDiscountApplied(false);
        setDiscountError(getErrorMessage(error, "Không thể kiểm tra mã giảm giá lúc này"));
        setForm(prev => ({ ...prev, discountAmount: 0 }));
      }
    };

    void syncDiscount();

    return () => {
      isMounted = false;
    };
  }, [discountApplied, form.discountCode, form.serviceAmount, form.discountAmount]);

  const handleApplyDiscount = async () => {
    try {
      const result = await validateFirestoreDiscount(form.discountCode, form.serviceAmount);
      if (!result.valid) {
        setDiscountError(result.error || "Mã giảm giá không hợp lệ");
        setDiscountApplied(false);
        setForm(prev => ({ ...prev, discountAmount: 0 }));
        return;
      }

      setForm(prev => ({ ...prev, discountAmount: result.discountAmount ?? 0 }));
      setDiscountError("Mã được kiểm tra, chỉ trừ lượt khi hoàn tất đăng ký.");
      setDiscountApplied(true);
    } catch (error) {
      setDiscountApplied(false);
      setForm(prev => ({ ...prev, discountAmount: 0 }));
      setDiscountError(getErrorMessage(error, "Không thể áp dụng mã giảm giá lúc này"));
    }
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
      const result = await submitOnlineRegistrationTransaction({
        operationId: buildOperationId("checkout"),
        customerName: form.customerName,
        customerEmail: form.customerEmail,
        phone: form.phone,
        machineCondition: form.machineCondition,
        warranty: form.warranty,
        needs: form.needs,
        password: form.password,
        charger: form.charger,
        appointmentTime: form.appointmentTime,
        dropOffTime: form.dropOffTime,
        category: form.category,
        additionalServices: form.additionalServices,
        services: form.additionalServices.map((serviceName) => {
          const service = availableServices.find((s) => s.name === serviceName);
          return { name: serviceName, price: service?.price || 0 };
        }),
        serviceAmount: form.serviceAmount,
        discountCode: discountApplied ? form.discountCode : "",
        discountAmount: discountApplied ? form.discountAmount : 0,
        finalAmount: form.finalAmount,
        pointsEarned,
      });

      let authWarning = "";
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
          } catch (resetError) {
            authWarning = getErrorMessage(resetError, "Đơn đã được tạo nhưng chưa thể gửi email đặt lại mật khẩu.");
          }
        } else {
          authWarning = getErrorMessage(err, "Đơn đã được tạo nhưng chưa thể tạo tài khoản khách hàng lúc này.");
        }
      }

      toast.success("Đã thêm khách hàng!");
      toast.success("Đã thêm giao dịch!");
      toast.success("Đã thêm hóa đơn!");
      if (authWarning) {
        toast.warning(authWarning);
      }
      setReceiptId(result.machineId);
      setShowReceipt(true);
    } catch (err) {
      toast.error(getErrorMessage(err, "Đã xảy ra lỗi khi đăng ký dịch vụ. Vui lòng thử lại."));
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