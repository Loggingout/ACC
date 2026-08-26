// AdminDashboardPage.jsx — landing page for /admin, with key order/review/catering analytics
import { useEffect, useState } from "react";
import { DollarSign, CreditCard, Star, CalendarCheck, TrendingUp, TrendingDown } from "lucide-react";
import { useAuth } from "../../../hooks/useAuth";
import { getDashboardStats } from "../analytics/api/adminAnalyticsApi";
import { formatCurrency } from "../../../utils/currency";

function StatCard({ icon: Icon, label, children }) {
  return (
    <div className="rounded-2xl bg-black/50 p-5 flex flex-col gap-2">
      <div className="flex items-center gap-2 text-white/60 text-xs uppercase tracking-wide font-semibold">
        <Icon size={14} />
        {label}
      </div>
      {children}
    </div>
  );
}

export default function AdminDashboardPage() {
  const { user, token } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getDashboardStats(token)
      .then(setStats)
      .catch((err) => setError(err.message || "Failed to load analytics."))
      .finally(() => setLoading(false));
  }, [token]);

  const payInStoreTotal = stats?.paymentBreakdown?.pay_in_store ?? 0;
  const paidOnlineTotal = stats ? stats.onlineOrderTotal - payInStoreTotal : 0;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Welcome back{user?.name ? `, ${user.name}` : ""}</h2>
        <p className="text-white/70">
          Use the sidebar to manage the menu, moderate reviews, and review catering requests.
        </p>
      </div>

      {loading && <p className="text-white/60 text-sm">Loading analytics…</p>}
      {error && !loading && <p className="text-red-400 text-sm">{error}</p>}

      {stats && !loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard icon={DollarSign} label="Online Order Total">
            <span className="text-2xl font-bold text-white">{formatCurrency(stats.onlineOrderTotal)}</span>
          </StatCard>

          <StatCard icon={CreditCard} label="Pay In Store vs. Paid Online">
            <div className="flex flex-col gap-1 text-sm">
              <div className="flex items-center justify-between text-white/80">
                <span>Pay In Store</span>
                <span className="font-semibold text-white">{formatCurrency(payInStoreTotal)}</span>
              </div>
              <div className="flex items-center justify-between text-white/80">
                <span>Paid Online</span>
                <span className="font-semibold text-white">{formatCurrency(paidOnlineTotal)}</span>
              </div>
            </div>
          </StatCard>

          <StatCard icon={Star} label="Reviews">
            <span className="text-2xl font-bold text-white">{stats.totalReviews}</span>
            <span className="text-xs text-white/50">{stats.newReviews} new in the last 7 days</span>
          </StatCard>

          <StatCard icon={CalendarCheck} label="Catering Conversion Rate">
            <span className="text-2xl font-bold text-white">{stats.cateringConversionRate.toFixed(1)}%</span>
            <span className="text-xs text-white/50">
              {stats.confirmedCateringRequests} confirmed of {stats.totalCateringRequests} requests
            </span>
          </StatCard>

          <StatCard icon={TrendingUp} label="Highest Selling Item">
            {stats.highestItem ? (
              <>
                <span className="text-lg font-bold text-white">{stats.highestItem.name}</span>
                <span className="text-xs text-white/50">{stats.highestItem.quantity} sold</span>
              </>
            ) : (
              <span className="text-sm text-white/40">No orders yet</span>
            )}
          </StatCard>

          <StatCard icon={TrendingDown} label="Lowest Selling Item">
            {stats.lowestItem ? (
              <>
                <span className="text-lg font-bold text-white">{stats.lowestItem.name}</span>
                <span className="text-xs text-white/50">{stats.lowestItem.quantity} sold</span>
              </>
            ) : (
              <span className="text-sm text-white/40">No orders yet</span>
            )}
          </StatCard>
        </div>
      )}
    </div>
  );
}
