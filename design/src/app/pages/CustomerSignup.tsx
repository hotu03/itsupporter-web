import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Mail, Lock, User, Phone, ArrowRight, ArrowLeft } from "lucide-react";
import { signInWithGoogle, type GoogleSignInResult } from "../data/firebase-auth";
import { getFirestoreCustomerByEmail, addFirestoreCustomer } from "../data/firestoreCustomers";
import { toast } from "sonner";

interface SignupFormData {
  name: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function CustomerSignup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [googleUser, setGoogleUser] = useState<GoogleSignInResult | null>(null);
  const [formData, setFormData] = useState<SignupFormData>({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Partial<SignupFormData>>({});

  // Check if already logged in with Google and has account
  useEffect(() => {
    const auth = sessionStorage.getItem("customer_auth");
    if (auth) {
      try {
        const { email } = JSON.parse(auth);
        if (email) {
          navigate("/portal");
        }
      } catch {
        sessionStorage.removeItem("customer_auth");
      }
    }
  }, [navigate]);

  const validateForm = (): boolean => {
    const newErrors: Partial<SignupFormData> = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = "Tên phải có ít nhất 2 ký tự";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    } else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!googleUser) {
      if (!formData.password) {
        newErrors.password = "Vui lòng nhập mật khẩu";
      } else if (formData.password.length < 6) {
        newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setErrors({});

    try {
      const result = await signInWithGoogle();

      // Check if customer exists in Firestore
      const existingCustomer = await getFirestoreCustomerByEmail(result.email);

      if (existingCustomer) {
        // Customer exists - store auth and go to portal
        sessionStorage.setItem(
          "customer_auth",
          JSON.stringify({ email: result.email, timestamp: Date.now() })
        );
        toast.success("Đăng nhập thành công!");
        navigate("/portal");
      } else {
        // New Google user - show registration form with pre-filled data
        setGoogleUser(result);
        setFormData((prev) => ({
          ...prev,
          name: result.name || "",
          email: result.email,
        }));
      }
    } catch (err: unknown) {
      const authError = err as { code?: string };
      if (authError.code === "auth/popup-closed-by-user") {
        // User closed popup - do nothing
      } else if (authError.code === "auth/account-exists-with-different-credential") {
        setErrors({ email: "Email này đã được đăng ký với phương thức khác" });
      } else {
        setErrors({ email: "Đăng nhập Google thất bại. Vui lòng thử lại." });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      if (googleUser) {
        // Google user completing registration
        await addFirestoreCustomer({
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim().toLowerCase(),
          points: 0,
          totalRepairs: 0,
          source: "online",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });

        sessionStorage.setItem(
          "customer_auth",
          JSON.stringify({ email: formData.email, timestamp: Date.now() })
        );

        toast.success("Đăng ký thành công!");
        navigate("/portal");
      } else {
        // Check if email already exists in Firestore before creating auth account
        const existingCustomer = await getFirestoreCustomerByEmail(formData.email.trim().toLowerCase());
        if (existingCustomer) {
          setErrors({ email: "Email này đã được đăng ký. Vui lòng đăng nhập hoặc sử dụng email khác." });
          setLoading(false);
          return;
        }

        // Email/password registration
        const { createFirebaseCustomer } = await import("../data/firebase-auth");
        await createFirebaseCustomer(formData.email.trim().toLowerCase(), formData.password);

        await addFirestoreCustomer({
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim().toLowerCase(),
          points: 0,
          totalRepairs: 0,
          source: "online",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });

        toast.success("Đăng ký thành công! Vui lòng đăng nhập.");
        navigate("/login");
      }
    } catch (err: unknown) {
      const authError = err as { code?: string };
      if (authError.code === "auth/email-already-in-use") {
        setErrors({ email: "Email này đã được đăng ký" });
      } else if (authError.code === "auth/weak-password") {
        setErrors({ password: "Mật khẩu phải có ít nhất 6 ký tự" });
      } else {
        toast.error("Có lỗi xảy ra. Vui lòng thử lại.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Đăng ký tài khoản</h1>
          <p className="text-gray-600">Tạo tài khoản để tra cứu trạng thái máy của bạn</p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            {/* Left Column - Google Sign-In */}
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-8 flex flex-col">
              <h2 className="text-xl font-bold text-white mb-4">Đăng ký nhanh</h2>
              <p className="text-orange-100 mb-8">
                Sử dụng tài khoản Google để đăng ký và đăng nhập nhanh chóng
              </p>

              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="mt-auto w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl bg-white text-gray-700 font-medium hover:bg-gray-50 transition-all shadow-lg disabled:opacity-50"
              >
                <svg width="20" height="20" viewBox="0 0 48 48" fill="none">
                  <path d="M43.611 20.083H42V20H24v8h11.303C33.927 32.657 29.418 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039L37.618 9.39C34.21 6.226 29.337 4 24 4 12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20c0-1.341-.138-2.65-.389-3.917z" fill="#FFC107"/>
                  <path d="M6.306 14.691L11.09 18.307C12.419 14.914 15.927 12 20 12c3.059 0 5.842 1.154 7.961 3.039L33.618 9.39C30.21 6.226 25.337 4 20 4 14.21 4 9.157 7.166 6.306 14.691z" fill="#FF3D00"/>
                  <path d="M24 44c5.166 0 9.86-1.977 13.409-5.192L32.73 35.109C30.745 36.647 28.484 37.5 26 37.5 20.635 37.5 16.142 34.202 14.74 29.604L9.886 33.37C12.653 39.411 17.941 44 24 44z" fill="#4CAF50"/>
                  <path d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l4.677 3.899C39.35 35.19 44 30.183 44 24c0-1.341-.138-2.65-.389-3.917z" fill="#1976D2"/>
                </svg>
                <span>{loading ? "Đang xử lý..." : "Đăng ký với Google"}</span>
              </button>

              {googleUser && (
                <div className="mt-4 p-3 bg-white/20 rounded-lg text-white text-sm">
                  <p>👋 Xin chào, {googleUser.email}</p>
                  <p className="text-orange-100 text-xs mt-1">Vui lòng nhập thêm thông tin để hoàn tất đăng ký</p>
                </div>
              )}
            </div>

            {/* Right Column - Email/Password Form */}
            <div className="p-8">
              <div className="flex items-center gap-2 mb-6">
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span className="text-sm">Quay lại</span>
                </button>
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-2">Đăng ký với Email</h2>
              <p className="text-gray-600 mb-6 text-sm">Tạo tài khoản với email và mật khẩu</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Họ và tên <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Nhập họ và tên"
                      className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all ${
                        errors.name ? "border-red-500" : "border-gray-200"
                      }`}
                    />
                  </div>
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Nhập số điện thoại"
                      className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all ${
                        errors.phone ? "border-red-500" : "border-gray-200"
                      }`}
                    />
                  </div>
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Nhập email"
                      disabled={!!googleUser}
                      className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all ${
                        errors.email ? "border-red-500" : "border-gray-200"
                      } ${googleUser ? "bg-gray-100 cursor-not-allowed" : ""}`}
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* Password (only for non-Google users) */}
                {!googleUser && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Mật khẩu <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="password"
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          placeholder="Ít nhất 6 ký tự"
                          className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all ${
                            errors.password ? "border-red-500" : "border-gray-200"
                          }`}
                        />
                      </div>
                      {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Xác nhận mật khẩu <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="password"
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                          placeholder="Nhập lại mật khẩu"
                          className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all ${
                            errors.confirmPassword ? "border-red-500" : "border-gray-200"
                          }`}
                        />
                      </div>
                      {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                    </div>
                  </>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Đang xử lý...
                    </>
                  ) : (
                    <>
                      {googleUser ? "Hoàn tất đăng ký" : "Đăng ký"}
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>

              <p className="text-center text-sm text-gray-500 mt-6">
                Đã có tài khoản?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-orange-500 font-semibold hover:text-orange-600"
                >
                  Đăng nhập ngay
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}