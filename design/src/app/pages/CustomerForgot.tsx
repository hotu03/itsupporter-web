import { useState } from "react";
import { useNavigate } from "react-router";
import { Mail, ArrowLeft, Send } from "lucide-react";
import { getCustomerByEmail } from "../data/customers";
import { sendCustomerPasswordReset } from "../data/firebase-auth";
import { toast } from "sonner";

export default function CustomerForgot() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email.trim()) {
      setError("Vui lòng nhập email");
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError("Email không hợp lệ");
      setLoading(false);
      return;
    }

    // Check if customer exists in localStorage
    const customer = getCustomerByEmail(email.trim());
    if (!customer) {
      setError("Email chưa đăng ký dịch vụ sửa chữa");
      setLoading(false);
      return;
    }

    try {
      // Send password reset email via Firebase Auth
      await sendCustomerPasswordReset(email.trim());
      setSent(true);
      toast.success("Đã gửi link đặt lại mật khẩu qua email!");
    } catch (err: any) {
      // Firebase Auth errors
      if (err.code === 'auth/user-not-found') {
        setError("Email chưa đăng ký dịch vụ sửa chữa");
      } else if (err.code === 'auth/invalid-email') {
        setError("Email không hợp lệ");
      } else if (err.code === 'auth/too-many-requests') {
        setError("Quá nhiều yêu cầu. Vui lòng thử lại sau.");
      } else {
        setError("Có lỗi xảy ra. Vui lòng thử lại.");
        console.error("Password reset error:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/customer/login");
  };

  if (sent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="font-bold text-gray-900 text-xl mb-2">Đã gửi link!</h1>
            <p className="text-gray-600 mb-6">
              Vui lòng kiểm tra email và click vào link để đặt mật khẩu mới.
            </p>
            <button
              onClick={handleBack}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium py-3 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg"
            >
              Quay lại đăng nhập
            </button>
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
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-lg mb-4">
            <Mail className="w-10 h-10 text-white" />
          </div>
          <h1 className="font-bold text-gray-900 text-xl mb-2">Đặt lại mật khẩu</h1>
          <p className="text-gray-600">
            Nhập email đã đăng ký để nhận link đặt lại mật khẩu
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
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
                  disabled={loading}
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
                  Đang gửi...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Gửi link đặt lại mật khẩu
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer note */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Link sẽ có hiệu lực trong 24 giờ
        </p>
      </div>
    </div>
  );
}
