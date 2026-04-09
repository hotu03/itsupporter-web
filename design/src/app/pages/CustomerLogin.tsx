import { useState } from "react";
import { useNavigate } from "react-router";
import { Phone, ArrowRight } from "lucide-react";
import { getCustomers } from "../data/customers";

export default function CustomerLogin() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate phone number
    if (!phone.trim()) {
      setError("Vui lòng nhập số điện thoại");
      return;
    }

    // Check if phone matches Vietnamese format (simple validation)
    const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;
    if (!phoneRegex.test(phone.trim())) {
      setError("Số điện thoại không hợp lệ");
      return;
    }

    // Check if customer exists
    const customers = getCustomers();
    const customer = customers.find((c) => c.phone === phone.trim());

    if (!customer) {
      setError("Số điện thoại chưa đăng ký dịch vụ sửa chữa");
      return;
    }

    // Navigate to OTP verification
    navigate("/customer/otp", { state: { phone: phone.trim() } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-lg mb-4">
            <Phone className="w-10 h-10 text-white" />
          </div>
          <h1 className="font-bold text-gray-900 mb-2">Tra cứu máy sửa chữa</h1>
          <p className="text-gray-600">Nhập số điện thoại để kiểm tra trạng thái máy của bạn</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="phone" className="block font-medium text-gray-700 mb-2">
                Số điện thoại
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setError("");
                  }}
                  placeholder="0xxx xxx xxx"
                  className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  maxLength={10}
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
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium py-3.5 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
            >
              Tiếp tục
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>

        {/* Footer note */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Chúng tôi sẽ gửi mã OTP để xác thực số điện thoại của bạn
        </p>
      </div>
    </div>
  );
}
