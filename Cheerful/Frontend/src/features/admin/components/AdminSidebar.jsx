// AdminSidebar.jsx — left navigation for the admin dashboard
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Coffee, Star, CalendarCheck, Receipt, Megaphone, Settings } from "lucide-react";
import Logo from "../../../../public/acc-logo.jpg";

export const ADMIN_NAV_ITEMS = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/menu", label: "Menu", icon: Coffee },
  { to: "/admin/orders", label: "Online Orders", icon: Receipt },
  { to: "/admin/reviews", label: "Reviews", icon: Star },
  { to: "/admin/catering", label: "Catering Requests", icon: CalendarCheck },
  { to: "/admin/banners", label: "Banners", icon: Megaphone },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminSidebar() {
  return (
    <aside className="hidden md:flex flex-col w-60 shrink-0 bg-black/90 text-white">
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-white/10">
        <img src={Logo} alt="A Cheerful Cup Logo" className="h-8 w-8 rounded-full" />
        <span className="font-bold text-sm leading-tight">
          A Cheerful Cup
          <span className="block text-[11px] font-normal text-white/50">Admin</span>
        </span>
      </div>

      <nav className="flex-1 flex flex-col gap-1 px-3 py-4">
        {ADMIN_NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? "bg-gradient-to-r from-orange-500 to-yellow-700 text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            <Icon className="w-4 h-4 shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
