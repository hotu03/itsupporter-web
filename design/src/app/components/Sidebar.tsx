import { NavLink, useNavigate } from "react-router";
import {
  LayoutDashboard,
  Monitor,
  Users,
  UserCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  FileText,
} from "lucide-react";
import { useState } from "react";
import logo from "../../assets/images/logo.png";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard" },
  { label: "Machines", icon: Monitor, to: "/dashboard/machines" },
  { label: "Personnel", icon: Users, to: "/dashboard/nhan-su" },
  { label: "Customers", icon: UserCircle, to: "/dashboard/customers" },
  { label: "Finance", icon: DollarSign, to: "/dashboard/finance" },
  { label: "Invoices", icon: FileText, to: "/dashboard/invoices" },
];

export function Sidebar() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`relative flex flex-col bg-orange-500 text-white transition-all duration-300 ease-in-out ${
        collapsed ? "w-[64px]" : "w-[200px]"
      } min-h-screen shrink-0`}
    >
      {/* Logo */}
      <div
        className={`flex items-center gap-2.5 px-4 py-4 border-b border-white/20 ${
          collapsed ? "justify-center px-0" : ""
        }`}
      >
        <img
          src={logo}
          alt="IT Supporter"
          className="w-8 h-8 rounded-lg shrink-0 object-cover"
        />
        {!collapsed && (
          <span className="text-white font-bold text-sm tracking-wide">
            IT Supporter
          </span>
        )}
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-[52px] w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-orange-50 transition-colors z-10 border border-orange-200"
      >
        {collapsed ? (
          <ChevronRight size={12} className="text-orange-500" />
        ) : (
          <ChevronLeft size={12} className="text-orange-500" />
        )}
      </button>

      {/* Nav */}
      <nav className="flex-1 py-3 flex flex-col gap-0.5 px-2">
        {navItems.map(({ label, icon: Icon, to }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/dashboard"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 group ${
                isActive
                  ? "bg-white/25 text-white"
                  : "text-white/80 hover:bg-white/15 hover:text-white"
              } ${collapsed ? "justify-center" : ""}`
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  size={17}
                  className={isActive ? "text-white" : "text-white/80 group-hover:text-white"}
                />
                {!collapsed && (
                  <span className="text-sm font-medium">{label}</span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="border-t border-white/20 p-2">
        <button
          onClick={() => navigate("/")}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/80 hover:bg-white/15 hover:text-white transition-all ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <LogOut size={17} />
          {!collapsed && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>

      {/* Footer */}
      {!collapsed && (
        <div className="px-4 pb-3">
          <p className="text-white/50 text-[10px]">
            Copyright © 2023{" "}
            <a href="#" className="text-white/80 underline hover:text-white">
              HALINHIT.COM
            </a>
          </p>
        </div>
      )}
    </aside>
  );
}