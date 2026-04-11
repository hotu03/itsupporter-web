import { useState } from "react";
import { useNavigate } from "react-router";
import { Users, UserCircle, AlertCircle } from "lucide-react";
import backgroundImage from "../../assets/images/background.jpg";
import logo from "../../assets/images/logo.png";
import { useAuth } from "../contexts/AuthContext";

export default function SignIn() {
  const navigate = useNavigate();
  const { login: authLogin, googleLogin } = useAuth();
  const [activeTab, setActiveTab] = useState<"member" | "customer">("member");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const success = await authLogin(username.trim(), password);
    if (success) {
      navigate("/dashboard");
    } else {
      setError("Invalid credentials. Use: root@itsupporter.com or registered email");
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    const success = await googleLogin();
    if (success) {
      navigate("/dashboard");
    } else {
      setError("Google login failed. Check console or try again.");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col relative overflow-hidden">
      {/* Background image */}
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Header */}
      <div className="relative z-10 flex items-center px-8 py-5">
        <div className="flex items-center gap-2">
          <img
            src={logo}
            alt="IT Supporter"
            className="w-10 h-10 rounded-xl shadow-lg object-cover"
          />
          <span className="text-white font-bold text-lg tracking-wide drop-shadow">IT SUPPORTER</span>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl px-10 py-10">
            {/* Title */}
            <div className="text-center mb-6">
              <h1 className="text-gray-900 mb-2" style={{ fontSize: "1.6rem", fontWeight: 700 }}>Sign In</h1>
              <p className="text-gray-500 text-sm">
                {activeTab === "member" 
                  ? "Sign in and start managing machines and members"
                  : "Đăng nhập để xem trạng thái máy và thông tin của bạn"
                }
              </p>
            </div>

            {/* Tabs Switcher */}
            <div className="mb-6 bg-gray-100 rounded-full p-1.5 grid grid-cols-2 gap-1">
              <button
                type="button"
                onClick={() => setActiveTab("member")}
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-full font-semibold text-sm transition-all duration-200 ${
                  activeTab === "member"
                    ? "bg-orange-500 text-white shadow-lg"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <Users size={18} />
                Thành viên
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("customer")}
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-full font-semibold text-sm transition-all duration-200 ${
                  activeTab === "customer"
                    ? "bg-orange-500 text-white shadow-lg"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <UserCircle size={18} />
                Khách hàng
              </button>
            </div>

            {/* Member Tab Content */}
            {activeTab === "member" && (
              <>
                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                  {/* Username field */}
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-400">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full bg-gray-100 rounded-full pl-11 pr-4 py-3 text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white transition-all"
                    />
                  </div>

                  {/* Password field */}
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-400">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                      </svg>
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-gray-100 rounded-full pl-11 pr-12 py-3 text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-400 transition-colors"
                    >
                      {showPassword ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                          <line x1="1" y1="1" x2="23" y2="23"/>
                        </svg>
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                          <circle cx="12" cy="12" r="3"/>
                        </svg>
                      )}
                    </button>
                  </div>

                  {/* Remember me */}
                  <div className="flex items-center gap-2 ml-1">
                    <button
                      type="button"
                      onClick={() => setRememberMe(!rememberMe)}
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                        rememberMe
                          ? "bg-orange-500 border-orange-500"
                          : "bg-white border-orange-400"
                      }`}
                    >
                      {rememberMe && (
                        <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </button>
                    <span className="text-gray-600 text-sm select-none cursor-pointer" onClick={() => setRememberMe(!rememberMe)}>
                      Remember me
                    </span>
                  </div>

                  {/* Error message for tests and UX */}
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 rounded-2xl p-3 text-sm flex items-start gap-2">
                      <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  {/* Login button */}
                  <button
                    type="submit"
                    className="w-full mt-2 py-3 rounded-full border-2 border-orange-500 text-orange-500 font-bold tracking-widest hover:bg-orange-500 hover:text-white transition-all duration-200 shadow-sm"
                  >
                    LOGIN
                  </button>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-3 my-5">
                  <div className="flex-1 h-px bg-gray-200" />
                  <span className="text-gray-400 text-xs">or continue with</span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>

                {/* Google login button */}
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="w-full flex items-center justify-center gap-3 py-3 rounded-full border-2 border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm group"
                >
                  <svg width="20" height="20" viewBox="0 0 48 48" fill="none">
                    <path d="M43.611 20.083H42V20H24v8h11.303C33.927 32.657 29.418 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039L37.618 9.39C34.21 6.226 29.337 4 24 4 12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20c0-1.341-.138-2.65-.389-3.917z" fill="#FFC107"/>
                    <path d="M6.306 14.691L11.09 18.307C12.419 14.914 15.927 12 20 12c3.059 0 5.842 1.154 7.961 3.039L33.618 9.39C30.21 6.226 25.337 4 20 4 14.21 4 9.157 7.166 6.306 14.691z" fill="#FF3D00"/>
                    <path d="M24 44c5.166 0 9.86-1.977 13.409-5.192L32.73 35.109C30.745 36.647 28.484 37.5 26 37.5 20.635 37.5 16.142 34.202 14.74 29.604L9.886 33.37C12.653 39.411 17.941 44 24 44z" fill="#4CAF50"/>
                    <path d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l4.677 3.899C39.35 35.19 44 30.183 44 24c0-1.341-.138-2.65-.389-3.917z" fill="#1976D2"/>
                  </svg>
                  <span className="text-gray-600 font-medium group-hover:text-gray-800 transition-colors">
                    Sign in with Google
                  </span>
                </button>

                {/* Sign up link */}
                <p className="text-center text-xs text-gray-400 mt-4">
                  Chưa có tài khoản?{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/signup")}
                    className="text-orange-500 font-semibold hover:text-orange-600 transition-colors"
                  >
                    Đăng ký ngay
                  </button>
                </p>
              </>
            )}

            {/* Customer Tab Content */}
            {activeTab === "customer" && (
              <div className="space-y-4">
                {/* Service Registration - Highlighted */}
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl shadow-xl px-8 py-6 border-2 border-orange-400">
                  <p className="text-white font-bold text-base mb-3 text-center">
                    Chưa đăng ký dịch vụ?
                  </p>
                  <button
                    type="button"
                    onClick={() => navigate("/dang-ky-dich-vu")}
                    className="w-full bg-white text-orange-600 font-bold px-6 py-3 rounded-full hover:bg-orange-50 transition-all shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2 group"
                  >
                    Đăng ký ngay
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="group-hover:translate-x-1 transition-transform"
                    >
                      <path d="M5 12h14"/>
                      <path d="M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-3 my-4">
                  <div className="flex-1 h-px bg-gray-200" />
                  <span className="text-gray-400 text-xs">hoặc</span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>

                {/* Check machine status */}
                <div className="bg-gray-50 rounded-2xl px-6 py-5 border-2 border-gray-200">
                  <p className="text-gray-700 font-semibold text-sm mb-3 text-center">
                    Đã đăng ký dịch vụ?
                  </p>
                  <button
                    type="button"
                    onClick={() => navigate("/customer/login")}
                    className="w-full bg-white text-gray-700 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition-all border-2 border-gray-300 hover:border-orange-400 inline-flex items-center justify-center gap-2 group"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 11l3 3L22 4"/>
                      <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
                    </svg>
                    Tra cứu trạng thái máy
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Remove old customer portal links - they're now in the Customer tab */}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center py-4">
        <p className="text-white/70 text-xs">
          Copyright © 2023{" "}
          <a href="#" className="text-blue-300 hover:text-blue-200 font-medium transition-colors">
            HALINHIT.COM
          </a>
        </p>
      </div>
    </div>
  );
}