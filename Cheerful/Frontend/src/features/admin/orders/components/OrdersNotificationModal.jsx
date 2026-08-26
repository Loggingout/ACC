// OrdersNotificationModal.jsx — quick-glance panel of recent online orders, opened from the header bell
import { Link } from "react-router-dom";
import { X, Clock, ArrowRight } from "lucide-react";
import { formatCurrency } from "../../../../utils/currency";

const STATUS_STYLES = {
  pending: "bg-yellow-700/10 text-yellow-700 border-yellow-700/30",
  preparing: "bg-orange-500/10 text-orange-500 border-orange-500/30",
  ready: "bg-sky-500/10 text-sky-500 border-sky-500/30",
  completed: "bg-green-500/10 text-green-500 border-green-500/30",
  cancelled: "bg-red-500/10 text-red-500 border-red-500/30",
};

export default function OrdersNotificationModal({ orders, loading, error, onClose }) {
  return (
    <div className="fixed inset-0 flex items-start justify-center bg-black/60 z-50 p-4 pt-16 sm:pt-20" onClick={onClose}>
      <div
        className="bg-black/95 border border-white/10 rounded-2xl shadow-2xl w-full max-w-md max-h-[75vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <h2 className="text-lg font-bold text-white">Online Orders</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-white/50 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-3 flex flex-col gap-2.5">
          {loading && <p className="text-white/60 text-sm py-4 text-center">Loading orders…</p>}
          {error && !loading && <p className="text-red-400 text-sm py-4 text-center">{error}</p>}
          {!loading && !error && orders.length === 0 && (
            <p className="text-white/40 text-sm py-4 text-center">No orders placed yet.</p>
          )}

          {!loading &&
            !error &&
            orders.map((order) => (
              <div key={order._id} className="rounded-xl bg-black/50 p-3.5 flex flex-col gap-1.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium text-white truncate">{order.customerName}</span>
                  <span
                    className={`shrink-0 text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full border ${STATUS_STYLES[order.status] ?? ""}`}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2 text-xs text-white/50">
                  <span className="flex items-center gap-1">
                    <Clock size={11} /> {new Date(order.createdAt).toLocaleString()}
                  </span>
                  <span>
                    {order.items.length} item{order.items.length === 1 ? "" : "s"} · {formatCurrency(order.total)}
                  </span>
                </div>
              </div>
            ))}
        </div>

        <Link
          to="/admin/orders"
          onClick={onClose}
          className="flex items-center justify-center gap-1.5 px-5 py-3 border-t border-white/10 text-sm font-medium text-white/80 hover:bg-white/10 transition-colors"
        >
          View All Orders <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
