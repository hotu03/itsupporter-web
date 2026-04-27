import { createBrowserRouter } from "react-router";
import { lazy, type ComponentType } from "react";
import ProtectedRoute from "./components/ProtectedRoute";

function lazyWithRetry<T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>,
  retryKey: string
) {
  return lazy(async () => {
    try {
      const module = await factory();
      if (typeof window !== "undefined") {
        sessionStorage.removeItem(retryKey);
      }
      return module;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      const isChunkLoadError =
        /failed to fetch dynamically imported module/i.test(message) ||
        /importing a module script failed/i.test(message) ||
        /error loading dynamically imported module/i.test(message) ||
        /loading chunk [\w-]+ failed/i.test(message);

      if (
        typeof window !== "undefined" &&
        isChunkLoadError &&
        !sessionStorage.getItem(retryKey)
      ) {
        sessionStorage.setItem(retryKey, "1");
        window.location.reload();
        return new Promise<never>(() => undefined);
      }

      throw error;
    }
  });
}

const SignIn = lazyWithRetry(() => import("./pages/SignIn"), "lazy-retry:signin");
const SignUp = lazyWithRetry(() => import("./pages/SignUp"), "lazy-retry:signup");
const SignPage = lazyWithRetry(() => import("./pages/SignPage"), "lazy-retry:signpage");
const ServiceRegistration = lazyWithRetry(() => import("./pages/ServiceRegistration"), "lazy-retry:service-registration");
const CustomerLogin = lazyWithRetry(() => import("./pages/CustomerLogin"), "lazy-retry:customer-login");
const CustomerForgot = lazyWithRetry(() => import("./pages/CustomerForgot"), "lazy-retry:customer-forgot");
const CustomerSetPassword = lazyWithRetry(() => import("./pages/CustomerSetPassword"), "lazy-retry:customer-set-password");
const CustomerOTP = lazyWithRetry(() => import("./pages/CustomerOTP"), "lazy-retry:customer-otp");
const CustomerPortal = lazyWithRetry(() => import("./pages/CustomerPortal"), "lazy-retry:customer-portal");

const Dashboard = lazyWithRetry(() => import("./pages/Dashboard"), "lazy-retry:dashboard");
const Machines = lazyWithRetry(() => import("./pages/Machines"), "lazy-retry:machines");
const Personnel = lazyWithRetry(() => import("./pages/Personnel"), "lazy-retry:personnel");
const Customers = lazyWithRetry(() => import("./pages/Customers"), "lazy-retry:customers");
const Finance = lazyWithRetry(() => import("./pages/Finance"), "lazy-retry:finance");
const Invoices = lazyWithRetry(() => import("./pages/Invoices"), "lazy-retry:invoices");
const Profile = lazyWithRetry(() => import("./pages/Profile"), "lazy-retry:profile");
const DashboardLayout = lazyWithRetry(() => import("./components/DashboardLayout"), "lazy-retry:dashboard-layout");

export const router = createBrowserRouter([
  // Critical auth routes
  { path: "/", Component: SignIn },
  { path: "/signup", Component: SignUp },
  { path: "/sign", Component: SignPage },
  { path: "/dang-ky-dich-vu", Component: ServiceRegistration },
  { path: "/customer/login", Component: CustomerLogin },
  { path: "/customer/forgot", Component: CustomerForgot },
  { path: "/customer/set-password", Component: CustomerSetPassword },
  { path: "/customer/otp", Component: CustomerOTP },
  { path: "/customer/portal", Component: CustomerPortal },

  // Dashboard routes (lazy loaded)
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "machines", element: <ProtectedRoute><Machines /></ProtectedRoute> },
      { path: "customers", element: <ProtectedRoute><Customers /></ProtectedRoute> },
      { path: "finance", element: <ProtectedRoute><Finance /></ProtectedRoute> },
      { path: "invoices", element: <ProtectedRoute><Invoices /></ProtectedRoute> },
      { path: "profile", element: <ProtectedRoute><Profile /></ProtectedRoute> },
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
