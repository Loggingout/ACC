// CategoryFormModal.jsx — create/edit a menu category (admin only)
import { useState } from "react";
import { X } from "lucide-react";
import { createCategory, updateCategory } from "../api/adminMenuApi";
import { useAuth } from "../../../../hooks/useAuth";

export default function CategoryFormModal({ category, onClose, onSaved }) {
  const { token } = useAuth();
  const [form, setForm] = useState({
    slug: category?.slug ?? "",
    title: category?.title ?? "",
    description: category?.description ?? "",
    sortOrder: category?.sortOrder ?? 0,
  });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    try {
      const data = { ...form, sortOrder: Number(form.sortOrder) };
      if (category) {
        await updateCategory(category.slug, data, token);
      } else {
        await createCategory(data, token);
      }
      onSaved();
      onClose();
    } catch (err) {
      setStatus("error");
      setError(err.message || "Failed to save category.");
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
          <h2 className="text-xl font-bold text-white">{category ? "Edit Category" : "New Category"}</h2>

          <div>
            <label className="block text-xs font-semibold text-white/70 mb-2">Slug</label>
            <input
              type="text"
              value={form.slug}
              onChange={set("slug")}
              required
              placeholder="e.g. coffee"
              className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-white/70 mb-2">Title</label>
            <input
              type="text"
              value={form.title}
              onChange={set("title")}
              required
              className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-white/70 mb-2">Description</label>
            <textarea
              value={form.description}
              onChange={set("description")}
              rows={2}
              className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-white/70 mb-2">Sort Order</label>
            <input
              type="number"
              value={form.sortOrder}
              onChange={set("sortOrder")}
              className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {error && <p className="text-sm text-red-400 text-center">{error}</p>}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full mt-2 px-5 py-2.5 rounded-full bg-gradient-to-br from-red-500 via-orange-500 to-blue-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {status === "submitting" ? "Saving…" : category ? "Save Changes" : "Create Category"}
          </button>
        </form>
      </div>
    </div>
  );
}
