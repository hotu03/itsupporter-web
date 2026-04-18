import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import { ProfileEditForm } from "../components/ProfileEditForm";
import { useAuth } from "../contexts/AuthContext";

export default function Profile() {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();

  if (!user) {
    navigate("/");
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white border-b border-gray-200 px-6 py-3 flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft size={18} className="text-gray-600" />
        </button>
        <h1 className="text-orange-500" style={{ fontSize: "1.1rem", fontWeight: 700 }}>
          Hồ sơ cá nhân
        </h1>
      </header>

      {/* Form */}
      <div className="flex-1 p-5 flex justify-center">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <ProfileEditForm user={user} onSave={updateUser} />
        </div>
      </div>
    </div>
  );
}
