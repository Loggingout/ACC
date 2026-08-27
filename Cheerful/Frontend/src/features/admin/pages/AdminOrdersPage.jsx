// AdminOrdersPage.jsx — view placed orders, see when/who, and update status
import { useCallback, useEffect, useState } from "react";
import { Clock, Phone, Mail } from "lucide-react";
import { useAuth } from "../../../hooks/useAuth";
import { getOrders, updateOrderStatus } from "../orders/api/adminOrdersApi";
import { formatCurrency } from "../../../utils/currency";

const STATUS_OPTIONS = ["pending", "preparing", "ready", "completed", "cancelled"];

const STATUS_STYLES = {
  pending: "bg-yellow-700/10 text-yellow-700 border-yellow-700/30",
  preparing: "bg-orange-500/10 text-orange-500 border-orange-500/30",
  ready: "bg-sky-500/10 text-sky-500 border-sky-500/30",
  completed: "bg-green-500/10 text-green-500 border-green-500/30",
  cancelled: "bg-red-500/10 text-red-500 border-red-500/30",
};

// Keep this in sync with OrdersNotificationModal.jsx's window
const RECENT_ORDER_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function isRecentOrder(createdAt) {
  return Date.now() - new Date(createdAt).getTime() < RECENT_ORDER_WINDOW_MS;
}

export default function AdminOrdersPage() {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadOrders = useCallback(() => {
    setLoading(true);
    setError(null);
    getOrders(token)
      .then((data) => setOrders(Array.isArray(data) ? data : []))
      .catch((err) => setError(err.message || "Failed to load orders."))
      .finally(() => setLoading(false));
  }, [token]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const handleStatusChange = async (order, status) => {
    setOrders((prev) => prev.map((o) => (o._id === order._id ? { ...o, status } : o)));
    try {
      await updateOrderStatus(order._id, status, token);
    } catch (err) {
      alert(err.message || "Failed to update order status.");
      loadOrders();
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-white">Online Orders</h2>

      {loading && <p className="text-white/60 text-sm">Loading orders…</p>}
      {error && !loading && <p className="text-red-400 text-sm">{error}</p>}
      {!loading && !error && orders.length === 0 && (
        <p className="text-white/40 text-sm">No orders placed yet.</p>
      )}

      <div className="flex flex-col gap-4">
        {orders.map((order) => {
          const recent = isRecentOrder(order.createdAt);
          const isLocked = order.status === "completed" || order.status === "cancelled";

          const card = (
            <div className="rounded-2xl bg-black/50 p-5 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h3 className="text-white font-semibold">{order.customerName}</h3>
                  <div className="flex items-center gap-3 mt-1 text-xs text-white/50">
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {new Date(order.createdAt).toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone size={12} /> {order.customerPhone}
                    </span>
                    {order.customerEmail && (
                      <span className="flex items-center gap-1">
                        <Mail size={12} /> {order.customerEmail}
                      </span>
                    )}
                    <span className="px-2 py-0.5 rounded-full bg-white/10 text-white/70">
                      {order.paymentMethod === "square_link" ? "Pay Online (Square)" : "Pay In Store"}
                    </span>
                  </div>
                </div>

                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order, e.target.value)}
                  disabled={isLocked}
                  className={`text-xs font-semibold tracking-wide px-3 py-1.5 rounded-full border bg-black/40 capitalize disabled:opacity-60 disabled:cursor-not-allowed ${STATUS_STYLES[order.status] ?? ""}`}
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s} className="bg-black capitalize">
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5 pt-2 border-t border-white/10">
                {order.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-sm text-white/80">
                    <span>
                      {item.quantity}× {item.temperature ? `${item.temperature} ` : ""}{item.name}
                      {item.size ? ` (${item.size})` : ""}
                      {item.milk ? `, ${item.milk} milk` : ""}
                      {item.flavor ? `, ${item.flavor} flavor` : ""}
                      {item.sugar ? `, ${item.sugar}` : ""}
                    </span>
                    <span>{formatCurrency(item.unitPrice * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/10 text-white font-semibold">
                <span>Total</span>
                <span>{formatCurrency(order.total)}</span>
              </div>
            </div>
          );

          if (!recent) {
            return <div key={order._id}>{card}</div>;
          }

          return (
            <div key={order._id} className="recent-order-wrapper rounded-2xl p-[3px]">
              <div className="recent-order-inner rounded-2xl">{card}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}