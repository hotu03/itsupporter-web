import { useState } from "react";
import { useNavigate } from "react-router";
import { Mail, Lock, ArrowRight, ArrowLeft } from "lucide-react";
import { getFirestoreCustomerByEmail, updateFirestoreCustomer } from "../data/firestoreCustomers";
import { signInCustomer } from "../data/firebase-auth";
import { toast } from "sonner";

export default function CustomerLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [step, setStep] = useState<"email" | "password">("email");
  const [customerEmail, setCustomerEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Vui lòng nhập email");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError("Email không hợp lệ");
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();
    setCustomerEmail(normalizedEmail);
    setStep("password");
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!password) {
      setError("Vui lòng nhập mật khẩu");
      setLoading(false);
      return;
    }

    try {
      await signInCustomer(customerEmail, password);

      sessionStorage.setItem(
        "customer_auth",
        JSON.stringify({ email: customerEmail, timestamp: Date.now() })
      );

      try {
        const customer = await getFirestoreCustomerByEmail(customerEmail);
        if (customer?.id) {
          await updateFirestoreCustomer(String(customer.id), {
            lastLoginAt: new Date().toISOString(),
          });
        }
      } catch (updateErr) {
        console.error("Update customer login timestamp error:", updateErr);
      }

      toast.success("Đăng nhập thành công!");
      navigate("/portal");
    } catch (err: unknown) {
      const authError = err as { code?: string };
      if (authError.code === 'auth/user-not-found' || authError.code === 'auth/wrong-password' || authError.code === 'auth/invalid-credential') {
        setError("Email hoặc mật khẩu không chính xác");
      } else if (authError.code === 'auth/too-many-requests') {
        setError("Quá nhiều yêu cầu. Vui lòng thử lại sau.");
      } else if (authError.code === 'auth/invalid-email') {
        setError("Email không hợp lệ");
      } else {
        setError("Có lỗi xảy ra. Vui lòng thử lại.");
        console.error("Login error:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setStep("email");
    setPassword("");
    setError("");
  };

  if (step === "password") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Back button */}
          <button
            onClick={handleBack}
            className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Quay lại</span>
          </button>

          {/* Logo/Brand */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-lg mb-4">
              <Lock className="w-10 h-10 text-white" />
            </div>
            <h1 className="font-bold text-gray-900 text-xl mb-2">Đăng nhập</h1>
            <p className="text-gray-600">Nhập mật khẩu để tiếp tục</p>
          </div>

          {/* Email display (read-only) */}
          <div className="bg-gray-100 rounded-lg p-3 mb-6 text-center">
            <span className="text-gray-600 text-sm">Email: </span>
            <span className="text-gray-900 font-medium">{customerEmail}</span>
          </div>

          {/* Password reminder */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                <span className="text-xl">📧</span>
              </div>
              <div>
                <p className="text-blue-800 font-semibold text-sm mb-1">Hãy kiểm tra email của bạn!</p>
                <p className="text-blue-700 text-xs leading-relaxed">
                  Nếu bạn chưa đặt mật khẩu hoặc đã quên mật khẩu, vui lòng vào <strong>Quên mật khẩu</strong> để nhận
                  <strong> liên kết đặt mật khẩu</strong> qua email.
                </p>
                <p className="text-blue-600 text-xs mt-2 italic">
                  💡 Không thấy email? Hãy kiểm tra <strong>hộp thư rác (Spam/Junk)</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <div>
                <label htmlFor="password" className="block font-medium text-gray-700 mb-2">
                  Mật khẩu
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    placeholder="Nhập mật khẩu"
                    className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    disabled={loading}
                    autoFocus
                  />
                </div>
                {error && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                    {error}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium py-3.5 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Đang đăng nhập...
                  </>
                ) : (
                  <>
                    Đăng nhập
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            {/* Forgot password link */}
            <div className="mt-4 text-center">
              <button
                onClick={() => navigate("/customer/forgot")}
                className="text-sm text-orange-600 hover:text-orange-700 underline"
              >
                Quên mật khẩu?
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Step 1: Email input
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-lg mb-4">
            <Mail className="w-10 h-10 text-white" />
          </div>
          <h1 className="font-bold text-gray-900 text-xl mb-2">Tra cứu máy sửa chữa</h1>
          <p className="text-gray-600">Nhập email đã đăng ký để đăng nhập</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={handleEmailSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  placeholder="email@example.com"
                  className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                />
              </div>
              {error && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium py-3.5 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              Tiếp tục
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </div>

        {/* Footer note */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Chưa có tài khoản? Liên hệ cửa hàng để đăng ký dịch vụ
        </p>
      </div>
    </div>
  );
}
