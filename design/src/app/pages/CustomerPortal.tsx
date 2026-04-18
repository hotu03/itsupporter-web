import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Laptop, User, LogOut, FileText } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import { MachinesTab } from "../components/customer/MachinesTab";
import { InvoicesTab } from "../components/customer/InvoicesTab";
import { ProfileTab } from "../components/customer/ProfileTab";
import { useCustomerPortal, useRedeemVoucher } from "../components/customer/hooks/useCustomerPortal";

export default function CustomerPortal() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    const auth = sessionStorage.getItem("customer_auth");
    if (!auth) {
      navigate("/customer/login");
      return;
    }

    try {
      const { email: authEmail } = JSON.parse(auth);
      if (!authEmail) {
        navigate("/customer/login");
        return;
      }
      setEmail(authEmail);
    } catch {
      navigate("/customer/login");
    }
  }, [navigate]);

  const {
    customer,
    machines,
    pointHistory,
    redeemableVouchers,
    redeemedVouchers,
    invoices,
    loading,
  } = useCustomerPortal(email);

  const handleRedeemSuccess = () => {
    // Force refresh by navigating to self
    window.location.reload();
  };

  const { handleRedeem } = useRedeemVoucher(customer, handleRedeemSuccess);

  const handleLogout = () => {
    sessionStorage.removeItem("customer_auth");
    navigate("/customer/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-bold text-gray-900">Xin chào, {customer.name}</h1>
              <p className="text-sm text-gray-600">{customer.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="font-medium">Đăng xuất</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Tabs defaultValue="machines" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="machines" className="flex items-center gap-2">
              <Laptop className="w-4 h-4" />
              Máy của tôi
            </TabsTrigger>
            <TabsTrigger value="invoices" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Hóa đơn
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Thông tin cá nhân
            </TabsTrigger>
          </TabsList>

          <TabsContent value="machines">
            <MachinesTab machines={machines} />
          </TabsContent>

          <TabsContent value="invoices">
            <InvoicesTab invoices={invoices} />
          </TabsContent>

          <TabsContent value="profile">
            <ProfileTab
              customer={customer}
              redeemableVouchers={redeemableVouchers}
              redeemedVouchers={redeemedVouchers}
              pointHistory={pointHistory}
              onRedeem={handleRedeem}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
