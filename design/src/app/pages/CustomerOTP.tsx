import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { ShieldCheck, ArrowLeft, RefreshCw } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../components/ui/input-otp";

export default function CustomerOTP() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  // Redirect if no email
  useEffect(() => {
    if (!email) {
      navigate("/login");
    }
  }, [email, navigate]);

  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  // Mock OTP: generate random 6-digit
  const correctOTP = "123456";

  const handleOTPComplete = (value: string) => {
    setOtp(value);
    setError("");

    // Verify OTP
    if (value === correctOTP) {
      // Store authentication in sessionStorage
      sessionStorage.setItem("customer_auth", JSON.stringify({ email, timestamp: Date.now() }));

      // Navigate to customer portal
      setTimeout(() => {
        navigate("/portal");
      }, 500);
    } else {
      setError("Mã OTP không chính xác");
    }
  };

  const handleResend = () => {
    if (!canResend) return;

    // Reset countdown
    setCountdown(60);
    setCanResend(false);
    setOtp("");
    setError("");

    // In a real app, this would trigger email resend
    alert(`Mã OTP mới đã được gửi đến ${email}\nMã OTP demo: ${correctOTP}`);
  };

  const handleBack = () => {
    navigate("/login");
  };

  if (!email) return null;

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
            <ShieldCheck className="w-10 h-10 text-white" />
          </div>
          <h1 className="font-bold text-gray-900 mb-2">Xác thực OTP</h1>
          <p className="text-gray-600">
            Mã OTP đã được gửi đến email <span className="font-semibold text-gray-900">{email}</span>
          </p>
        </div>

        {/* OTP Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="space-y-6">
            <div>
              <label className="block font-medium text-gray-700 mb-4 text-center">
                Nhập mã OTP
              </label>
              <div className="flex justify-center">
                <InputOTP
                  maxLength={4}
                  value={otp}
                  onChange={(value) => {
                    setOtp(value);
                    setError("");
                    if (value.length === 4) {
                      handleOTPComplete(value);
                    }
                  }}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              {error && (
                <p className="mt-4 text-sm text-red-600 text-center flex items-center justify-center gap-1">
                  <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                  {error}
                </p>
              )}
            </div>

            {/* Countdown / Resend */}
            <div className="text-center">
              {canResend ? (
                <button
                  onClick={handleResend}
                  className="text-orange-600 hover:text-orange-700 font-medium flex items-center gap-2 mx-auto transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  Gửi lại mã OTP
                </button>
              ) : (
                <p className="text-sm text-gray-500">
                  Gửi lại mã sau <span className="font-semibold text-gray-700">{countdown}s</span>
                </p>
              )}
            </div>
          </div>

          {/* Demo hint */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-xs text-blue-800">
                <span className="font-semibold">Demo:</span> Mã OTP là {correctOTP}
              </p>
            </div>
          </div>

          {/* Service Registration Link */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">
              Chưa đăng ký dịch vụ?{" "}
              <button
                type="button"
                onClick={() => navigate("/dang-ky-dich-vu")}
                className="text-orange-600 hover:text-orange-700 font-medium underline"
              >
                Đăng ký ngay
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
