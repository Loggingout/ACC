// AdminHeader.jsx — top bar for the admin dashboard: order notifications + profile menu
import { useCallback, useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { LogOut, ChevronDown, User, ExternalLink, Bell } from "lucide-react";
import { useAuth } from "../../../hooks/useAuth";
import { ADMIN_NAV_ITEMS } from "./AdminSidebar";
import { getOrders } from "../orders/api/adminOrdersApi";
import OrdersNotificationModal from "../orders/components/OrdersNotificationModal";

export default function AdminHeader() {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [ordersOpen, setOrdersOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [ordersError, setOrdersError] = useState(null);

  const loadOrders = useCallback(() => {
    setOrdersLoading(true);
    setOrdersError(null);
    getOrders(token)
      .then((data) => setOrders(Array.isArray(data) ? data : []))
      .catch((err) => setOrdersError(err.message || "Failed to load orders."))
      .finally(() => setOrdersLoading(false));
  }, [token]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const pendingCount = orders.filter((o) => o.status === "pending").length;

  const handleSignOut = () => {
    logout();
    navigate("/sign-in", { replace: true });
  };

  return (
    <header className="bg-black/90 border-b border-white/10">
      <div className="flex items-center justify-between gap-2 px-4 sm:px-6 py-3">
        <h1 className="text-base sm:text-lg font-bold text-white">Admin Dashboard</h1>

        <div className="flex items-center gap-2">
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white transition-colors"
          >
            <ExternalLink size={14} />
            <span className="hidden sm:inline">View Site</span>
          </Link>

          <button
            type="button"
            onClick={() => {
              setOrdersOpen(true);
              loadOrders();
            }}
            aria-label="Online orders"
            className="relative p-2 text-white/80 hover:bg-white/10 hover:text-white rounded-full transition-colors"
          >
            <Bell size={18} />
            {pendingCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[1.1rem] h-[1.1rem] px-1 flex items-center justify-center rounded-full bg-sky-500 text-white text-[10px] font-bold leading-none">
                {pendingCount}
              </span>
            )}
          </button>

          <div className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="flex items-center gap-2 px-2 py-1.5 rounded-full hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-red-500 via-orange-500 to-blue-500 text-white text-sm font-semibold shrink-0">
              {user?.name?.charAt(0)?.toUpperCase() ?? <User size={14} />}
            </div>
            <span className="hidden sm:block text-sm font-medium text-white">{user?.name ?? user?.email}</span>
            <ChevronDown size={14} className={`text-white/60 transition-transform ${menuOpen ? "rotate-180" : ""}`} />
          </button>

          {menuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
              <div className="absolute right-0 mt-2 w-56 bg-black border border-white/10 rounded-xl shadow-xl z-20 overflow-hidden">
                <div className="px-4 py-3 border-b border-white/10">
                  <p className="text-sm font-medium text-white truncate">{user?.name}</p>
                  <p className="text-xs text-white/50 truncate">{user?.email}</p>
                </div>

                <nav className="md:hidden py-1.5 border-b border-white/10">
                  {ADMIN_NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
                    <NavLink
                      key={to}
                      to={to}
                      end={end}
                      onClick={() => setMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
                          isActive ? "text-orange-400" : "text-white/80 hover:bg-white/10"
                        }`
                      }
                    >
                      <Icon className="w-4 h-4" />
                      {label}
                    </NavLink>
                  ))}
                </nav>

                <button
                  type="button"
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-white/80 hover:bg-white/10 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </>
          )}
          </div>
        </div>
      </div>

      {ordersOpen && (
        <OrdersNotificationModal
          orders={orders}
          loading={ordersLoading}
          error={ordersError}
          onClose={() => setOrdersOpen(false)}
        />
      )}
    </header>
  );
}

