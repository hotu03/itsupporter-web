import { createBrowserRouter } from "react-router";
import { lazy } from "react";
import ProtectedRoute from "./components/ProtectedRoute";

// Authentication & critical pages (loaded early)
const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));
const SignPage = lazy(() => import("./pages/SignPage"));
const ServiceRegistration = lazy(() => import("./pages/ServiceRegistration"));
const CustomerLogin = lazy(() => import("./pages/CustomerLogin"));
const CustomerOTP = lazy(() => import("./pages/CustomerOTP"));
const CustomerPortal = lazy(() => import("./pages/CustomerPortal"));

// Dashboard pages (heavy - lazy loaded after auth)
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Machines = lazy(() => import("./pages/Machines"));
const Personnel = lazy(() => import("./pages/Personnel"));
const Customers = lazy(() => import("./pages/Customers"));
const Finance = lazy(() => import("./pages/Finance"));
const Invoices = lazy(() => import("./pages/Invoices"));
const Profile = lazy(() => import("./pages/Profile"));
const DashboardLayout = lazy(() => import("./components/DashboardLayout"));

export const router = createBrowserRouter([
  // Critical auth routes
  { path: "/", Component: SignIn },
  { path: "/signup", Component: SignUp },
  { path: "/sign", Component: SignPage },
  { path: "/dang-ky-dich-vu", Component: ServiceRegistration },
  { path: "/customer/login", Component: CustomerLogin },
  { path: "/customer/otp", Component: CustomerOTP },
  { path: "/customer/portal", Component: CustomerPortal },

  // Dashboard routes (lazy loaded)
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "machines", Component: Machines },
      { path: "customers", Component: Customers },
      { path: "finance", Component: Finance },
      { path: "invoices", Component: Invoices },
      { path: "profile", Component: Profile },
      {
        path: "nhan-su",
        element: (
          <ProtectedRoute requiredPermission="manage:personnel">
            <Personnel />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
