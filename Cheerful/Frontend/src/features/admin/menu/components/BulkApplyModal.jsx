// BulkApplyModal.jsx — apply Hot/Iced temperature options to every product in a category at once
import { useState } from "react";
import { X } from "lucide-react";
import { bulkUpdateProducts } from "../api/adminMenuApi";
import { useAuth } from "../../../../hooks/useAuth";

export default function BulkApplyModal({ category, onClose, onSaved }) {
  const { token } = useAuth();
  const [hotAvailable, setHotAvailable] = useState(false);
  const [icedAvailable, setIcedAvailable] = useState(false);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    const temperatureOptions = [...(hotAvailable ? ["Hot"] : []), ...(icedAvailable ? ["Iced"] : [])];

    try {
      await bulkUpdateProducts(category.slug, { temperatureOptions }, token);
      onSaved();
      onClose();
    } catch (err) {
      setStatus("error");
      setError(err.message || "Failed to apply bulk update.");
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
          <h2 className="text-xl font-bold text-white">Bulk Apply to "{category.title}"</h2>
          <p className="text-sm text-white/60">
            Set the Hot/Iced temperature options for every product in this category at once, instead of editing each
            one individually.
          </p>

          <div>
            <label className="block text-xs font-semibold text-white/70 mb-2">Temperature</label>
            <div className="flex items-center gap-4 text-sm text-white/70">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={hotAvailable} onChange={(e) => setHotAvailable(e.target.checked)} />
                Hot
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={icedAvailable} onChange={(e) => setIcedAvailable(e.target.checked)} />
                Iced
              </label>
            </div>
          </div>

          {error && <p className="text-sm text-red-400 text-center">{error}</p>}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full mt-2 px-5 py-2.5 rounded-full bg-gradient-to-br from-red-500 via-orange-500 to-blue-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {status === "submitting" ? "Applying…" : `Apply to All ${category.title} Products`}
          </button>
        </form>
      </div>
    </div>
  );
}
