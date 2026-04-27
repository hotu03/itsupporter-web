import { NavLink, useNavigate } from "react-router";
import {
  LayoutDashboard,
  Monitor,
  Users,
  UserCircle,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  FileText,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import logo from "../../assets/images/logo.png";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard", permission: null },
  { label: "Machines", icon: Monitor, to: "/dashboard/machines", permission: null },
  { label: "Personnel", icon: Users, to: "/dashboard/nhan-su", permission: "manage:personnel" },
  { label: "Customers", icon: UserCircle, to: "/dashboard/customers", permission: null },
  { label: "Finance", icon: DollarSign, to: "/dashboard/finance", permission: "view:finance" },
  { label: "Invoices", icon: FileText, to: "/dashboard/invoices", permission: null },
  { label: "Hồ sơ", icon: User, to: "/dashboard/profile", permission: null },
];

export function Sidebar() {
  const navigate = useNavigate();
  const { logout, hasPermission } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const visibleNavItems = navItems.filter(item => !item.permission || hasPermission(item.permission));

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <aside
      className={`relative flex flex-col bg-orange-500 text-white transition-all duration-300 ease-in-out ${
        collapsed ? "w-[64px]" : "w-[200px]"
      } h-full shrink-0`}
    >
      {/* Logo + Collapse toggle in one row */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-white/20">
        <div className={`flex items-center gap-2.5 ${collapsed ? "justify-center w-full" : ""}`}>
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
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-orange-50 transition-colors border border-orange-200 shrink-0"
        >
          {collapsed ? (
            <ChevronRight size={12} className="text-orange-500" />
          ) : (
            <ChevronLeft size={12} className="text-orange-500" />
          )}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 flex flex-col gap-0.5 px-2">
        {visibleNavItems.map(({ label, icon: Icon, to }) => (
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
          onClick={handleLogout}
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
            Copyright © 2026{" "}
            <a href="#" className="text-white/80 underline hover:text-white">
              ITSUPPORTER.COM
            </a>
          </p>
        </div>
      )}
    </aside>
  );
}