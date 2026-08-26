// BannerFormModal.jsx — create/edit a site banner (admin only)
import { useState } from "react";
import { X } from "lucide-react";
import { createBanner, updateBanner } from "../api/adminBannersApi";
import { useAuth } from "../../../../hooks/useAuth";

const TYPE_OPTIONS = [
  { value: "maintenance", label: "Maintenance Mode" },
  { value: "announcement", label: "Announcement" },
  { value: "service", label: "Server / Service Status" },
];

export default function BannerFormModal({ banner, onClose, onSaved }) {
  const { token } = useAuth();
  const [form, setForm] = useState({
    type: banner?.type ?? "announcement",
    message: banner?.message ?? "",
    active: banner?.active ?? false,
  });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    try {
      if (banner) {
        await updateBanner(banner._id, form, token);
      } else {
        await createBanner(form, token);
      }
      onSaved();
      onClose();
    } catch (err) {
      setStatus("error");
      setError(err.message || "Failed to save banner.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4" onClick={onClose}>
      <div
        className="bg-black/95 border border-white/10 rounded-2xl shadow-2xl w-full max-w-md relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 text-white/50 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 flex flex-col gap-4">
          <h2 className="text-xl font-bold text-white">{banner ? "Edit Banner" : "Create Banner"}</h2>

          <div>
            <label className="block text-xs font-semibold text-white/70 mb-2">Type</label>
            <select
              value={form.type}
              onChange={(e) => setForm((prev) => ({ ...prev, type: e.target.value }))}
              className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              {TYPE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-black">
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-white/70 mb-2">Message</label>
            <textarea
              value={form.message}
              onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
              required
              rows={3}
              placeholder="e.g. We're down for scheduled maintenance, back soon!"
              className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-white/70">
            <input
              type="checkbox"
              checked={form.active}
              onChange={(e) => setForm((prev) => ({ ...prev, active: e.target.checked }))}
            />
            Active (visible to site visitors now)
          </label>

          {error && <p className="text-sm text-red-400 text-center">{error}</p>}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full mt-2 px-5 py-2.5 rounded-full bg-gradient-to-br from-red-500 via-orange-500 to-blue-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {status === "submitting" ? "Saving…" : banner ? "Save Changes" : "Create Banner"}
          </button>
        </form>
      </div>
    </div>
  );
}
