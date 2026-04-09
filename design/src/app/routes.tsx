import { createBrowserRouter } from "react-router";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Machines from "./pages/Machines";
import Personnel from "./pages/Personnel";
import Customers from "./pages/Customers";
import Finance from "./pages/Finance";
import Invoices from "./pages/Invoices";
import DashboardLayout from "./components/DashboardLayout";
import PlaceholderPage from "./pages/PlaceholderPage";
import SignPage from "./pages/SignPage";
import ServiceRegistration from "./pages/ServiceRegistration";
import CustomerLogin from "./pages/CustomerLogin";
import CustomerOTP from "./pages/CustomerOTP";
import CustomerPortal from "./pages/CustomerPortal";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: SignIn,
  },
  {
    path: "/signup",
    Component: SignUp,
  },
  {
    path: "/sign",
    Component: SignPage,
  },
  {
    path: "/dang-ky-dich-vu",
    Component: ServiceRegistration,
  },
  {
    path: "/customer/login",
    Component: CustomerLogin,
  },
  {
    path: "/customer/otp",
    Component: CustomerOTP,
  },
  {
    path: "/customer/portal",
    Component: CustomerPortal,
  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "machines", Component: Machines },
      { path: "customers", Component: Customers },
      { path: "finance", Component: Finance },
      { path: "invoices", Component: Invoices },
      { path: "nhan-su", Component: Personnel },
    ],
  },
]);