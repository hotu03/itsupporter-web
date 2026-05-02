import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Mail, Lock, ArrowRight, ArrowLeft } from "lucide-react";
import { getFirestoreCustomerByEmail, updateFirestoreCustomer } from "../data/firestoreCustomers";
import { signInCustomer, signInWithGoogle } from "../data/firebase-auth";
import { toast } from "sonner";

export default function CustomerLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [step, setStep] = useState<"email" | "password">("email");
  const [customerEmail, setCustomerEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await signInWithGoogle();

      // Check if customer exists in Firestore
      const existingCustomer = await getFirestoreCustomerByEmail(result.email);

      if (!existingCustomer) {
        setError("Tài khoản Google chưa được đăng ký. Vui lòng đăng ký trước.");
        return;
      }

      // Update last login
      if (existingCustomer.id) {
        await updateFirestoreCustomer(String(existingCustomer.id), {
          lastLoginAt: new Date().toISOString(),
        });
      }

      sessionStorage.setItem(
        "customer_auth",
        JSON.stringify({ email: result.email, timestamp: Date.now() })
      );

      toast.success("Đăng nhập thành công!");
      navigate("/portal");
    } catch (err: unknown) {
      const authError = err as { code?: string };
      if (authError.code === "auth/popup-closed-by-user") {
        // User closed popup - do nothing
      } else if (authError.code === "auth/account-exists-with-different-credential") {
        setError("Email này đã được đăng ký với phương thức khác");
      } else {
        setError("Đăng nhập Google thất bại. Vui lòng thử lại.");
      }
    } finally {
      setLoading(false);
    }
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
                onClick={() => navigate("/forgot")}
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

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-gray-400 text-xs">hoặc</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Google Sign-In */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border-2 border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all disabled:opacity-50"
          >
            <svg width="20" height="20" viewBox="0 0 48 48" fill="none">
              <path d="M43.611 20.083H42V20H24v8h11.303C33.927 32.657 29.418 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039L37.618 9.39C34.21 6.226 29.337 4 24 4 12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20c0-1.341-.138-2.65-.389-3.917z" fill="#FFC107"/>
              <path d="M6.306 14.691L11.09 18.307C12.419 14.914 15.927 12 20 12c3.059 0 5.842 1.154 7.961 3.039L33.618 9.39C30.21 6.226 25.337 4 20 4 14.21 4 9.157 7.166 6.306 14.691z" fill="#FF3D00"/>
              <path d="M24 44c5.166 0 9.86-1.977 13.409-5.192L32.73 35.109C30.745 36.647 28.484 37.5 26 37.5 20.635 37.5 16.142 34.202 14.74 29.604L9.886 33.37C12.653 39.411 17.941 44 24 44z" fill="#4CAF50"/>
              <path d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l4.677 3.899C39.35 35.19 44 30.183 44 24c0-1.341-.138-2.65-.389-3.917z" fill="#1976D2"/>
            </svg>
            <span className="text-gray-700 font-medium">Đăng nhập với Google</span>
          </button>
        </div>

        {/* Footer note */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Chưa có tài khoản?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-orange-500 font-semibold hover:text-orange-600"
          >
            Đăng ký ngay
          </button>
        </p>
      </div>
    </div>
  );
}
