import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { Lock, ArrowLeft, Check, X } from "lucide-react";
import { resetPassword } from "../data/firebase-auth";
import { toast } from "sonner";

export default function CustomerSetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [oobCode, setOobCode] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Firebase password reset returns oobCode in URL
    const mode = searchParams.get("mode");
    const oobCodeParam = searchParams.get("oobCode");
    const emailParam = searchParams.get("email");

    if (mode === "resetPassword" && oobCodeParam) {
      // Valid password reset URL from Firebase
      setOobCode(oobCodeParam);
      if (emailParam) {
        setEmail(emailParam);
      }
    } else {
      // No valid reset code - redirect to login
      toast.error("Link đặt lại mật khẩu không hợp lệ hoặc đã hết hạn");
      navigate("/customer/login");
    }
  }, [searchParams, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      setLoading(false);
      return;
    }

    try {
      // Use Firebase Auth to reset password
      if (oobCode) {
        await resetPassword(oobCode, password);
      } else {
        setError("Link đặt lại mật khẩu không hợp lệ");
        setLoading(false);
        return;
      }

      toast.success("Đặt mật khẩu thành công!");
      setSuccess(true);

      setTimeout(() => {
        navigate("/customer/login");
      }, 2000);
    } catch (err: any) {
      if (err.code === 'auth/expired-action-code') {
        setError("Link đã hết hạn. Vui lòng yêu cầu link mới.");
      } else if (err.code === 'auth/invalid-action-code') {
        setError("Link không hợp lệ. Vui lòng yêu cầu link mới.");
      } else {
        setError("Có lỗi xảy ra. Vui lòng thử lại.");
        console.error("Set password error:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/customer/login");
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="font-bold text-gray-900 text-xl mb-2">Đặt mật khẩu thành công!</h1>
            <p className="text-gray-600 mb-4">
              Đang chuyển sang trang đăng nhập...
            </p>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

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
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg mb-4">
            <Lock className="w-10 h-10 text-white" />
          </div>
          <h1 className="font-bold text-gray-900 text-xl mb-2">Đặt mật khẩu mới</h1>
          <p className="text-gray-600">Nhập mật khẩu mới cho tài khoản của bạn</p>
        </div>

        {/* Email display (read-only) */}
        {email && (
          <div className="bg-gray-100 rounded-lg p-3 mb-6 text-center">
            <span className="text-gray-600 text-sm">Email: </span>
            <span className="text-gray-900 font-medium">{email}</span>
          </div>
        )}

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block font-medium text-gray-700 mb-2">
                Mật khẩu mới
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
                  placeholder="Ít nhất 6 ký tự"
                  className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block font-medium text-gray-700 mb-2">
                Xác nhận mật khẩu
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Nhập lại mật khẩu"
                  className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password requirements */}
            <div className="flex gap-4 text-xs">
              <div className={`flex items-center gap-1 ${password.length >= 6 ? "text-green-600" : "text-gray-400"}`}>
                {password.length >= 6 ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                Tối thiểu 6 ký tự
              </div>
              <div className={`flex items-center gap-1 ${password === confirmPassword && password.length > 0 ? "text-green-600" : "text-gray-400"}`}>
                {password === confirmPassword && password.length > 0 ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                Khớp nhau
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={!password || !confirmPassword || loading}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-medium py-3.5 rounded-xl hover:from-green-600 hover:to-green-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Đang xử lý...
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  Đặt mật khẩu
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
