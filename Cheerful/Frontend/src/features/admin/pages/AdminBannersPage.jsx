// AdminBannersPage.jsx — manage maintenance/announcement/service banners
import { useCallback, useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useAuth } from "../../../hooks/useAuth";
import { getBanners, updateBanner, deleteBanner } from "../banners/api/adminBannersApi";
import BannerFormModal from "../banners/components/BannerFormModal";

const TYPE_LABELS = {
  maintenance: "Maintenance Mode",
  announcement: "Announcement",
  service: "Server / Service Status",
};

const TYPE_STYLES = {
  maintenance: "bg-red-500/10 text-red-400 border-red-500/30",
  announcement: "bg-sky-500/10 text-sky-500 border-sky-500/30",
  service: "bg-yellow-700/10 text-yellow-700 border-yellow-700/30",
};

export default function AdminBannersPage() {
  const { token } = useAuth();
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState(null); // null | { banner? }

  const loadBanners = useCallback(() => {
    setLoading(true);
    setError(null);
    getBanners(token)
      .then(setBanners)
      .catch((err) => setError(err.message || "Failed to load banners."))
      .finally(() => setLoading(false));
  }, [token]);

  useEffect(() => {
    loadBanners();
  }, [loadBanners]);

  const handleToggleActive = async (banner) => {
    setBanners((prev) => prev.map((b) => (b._id === banner._id ? { ...b, active: !b.active } : b)));
    try {
      await updateBanner(banner._id, { active: !banner.active }, token);
    } catch (err) {
      alert(err.message || "Failed to update banner.");
      loadBanners();
    }
  };

  const handleDelete = async (banner) => {
    if (!confirm("Delete this banner?")) return;
    try {
      await deleteBanner(banner._id, token);
      loadBanners();
    } catch (err) {
      alert(err.message || "Failed to delete banner.");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-2xl font-bold text-white">Banners</h2>
        <button
          type="button"
          onClick={() => setModal({})}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-br from-red-500 via-orange-500 to-blue-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          <Plus size={16} /> Create Banner
        </button>
      </div>

      {loading && <p className="text-white/60 text-sm">Loading banners…</p>}
      {error && !loading && <p className="text-red-400 text-sm">{error}</p>}
      {!loading && !error && banners.length === 0 && (
        <p className="text-white/40 text-sm">No banners yet.</p>
      )}

      <div className="flex flex-col gap-3">
        {banners.map((banner) => (
          <div key={banner._id} className="flex items-center gap-4 rounded-2xl bg-black/50 p-4">
            <span
              className={`shrink-0 text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full border ${TYPE_STYLES[banner.type]}`}
            >
              {TYPE_LABELS[banner.type]}
            </span>

            <p className="flex-1 min-w-0 text-sm text-white/80 truncate">{banner.message}</p>

            <label className="flex items-center gap-2 text-xs text-white/60 shrink-0">
              <input type="checkbox" checked={banner.active} onChange={() => handleToggleActive(banner)} />
              Active
            </label>

            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() => setModal({ banner })}
                className="p-1.5 text-white/60 hover:text-white transition-colors"
                aria-label="Edit banner"
              >
                <Pencil size={15} />
              </button>
              <button
                type="button"
                onClick={() => handleDelete(banner)}
                className="p-1.5 text-white/60 hover:text-red-400 transition-colors"
                aria-label="Delete banner"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {modal && (
        <BannerFormModal banner={modal.banner} onClose={() => setModal(null)} onSaved={loadBanners} />
      )}
    </div>
  );
}
