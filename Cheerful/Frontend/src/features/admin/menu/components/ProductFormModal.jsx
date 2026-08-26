// ProductFormModal.jsx — create/edit a menu product (admin only)
import { useState } from "react";
import { X } from "lucide-react";
import TagListInput from "./TagListInput";
import PriceRows from "./PriceRows";
import { createProduct, updateProduct } from "../api/adminMenuApi";
import { useAuth } from "../../../../hooks/useAuth";

function buildInitialForm(product) {
  return {
    name: product?.name ?? "",
    categorySlug: product?.categorySlug ?? "",
    subCategory: product?.subCategory ?? "",
    description: product?.description ?? "",
    type: product?.type ?? "",
    sortOrder: product?.sortOrder ?? 0,
    seasonal: product?.seasonal ?? false,
    limitedTime: product?.limitedTime ?? false,
    active: product?.active ?? true,
    milkOptions: product?.milkOptions ?? [],
    sugarOptions: product?.sugarOptions ?? [],
    flavorOptions: product?.flavorOptions ?? [],
    condiments: product?.condiments ?? [],
    hotAvailable: product?.temperatureOptions?.includes("Hot") ?? false,
    icedAvailable: product?.temperatureOptions?.includes("Iced") ?? false,
    price: product?.price ?? "",
    prices: product?.prices ?? {},
  };
}

export default function ProductFormModal({ product, categories, defaultCategorySlug, onClose, onSaved }) {
  const { token } = useAuth();
  const [form, setForm] = useState(buildInitialForm(product));
  const [sizedPricing, setSizedPricing] = useState(Boolean(product?.prices && Object.keys(product.prices).length));
  const [imageFile, setImageFile] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));
  const setChecked = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.checked }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    const temperatureOptions = [
      ...(form.hotAvailable ? ["Hot"] : []),
      ...(form.icedAvailable ? ["Iced"] : []),
    ];

    const fields = {
      name: form.name,
      categorySlug: form.categorySlug || defaultCategorySlug,
      subCategory: form.subCategory,
      description: form.description,
      type: form.type,
      sortOrder: form.sortOrder,
      seasonal: form.seasonal,
      limitedTime: form.limitedTime,
      active: form.active,
      milkOptions: form.milkOptions.length ? form.milkOptions : undefined,
      sugarOptions: form.sugarOptions.length ? form.sugarOptions : undefined,
      flavorOptions: form.flavorOptions.length ? form.flavorOptions : undefined,
      condiments: form.condiments.length ? form.condiments : undefined,
      temperatureOptions: temperatureOptions.length ? temperatureOptions : undefined,
      ...(sizedPricing ? { prices: form.prices } : { price: form.price }),
      ...(imageFile ? { imageFile } : {}),
    };

    try {
      if (product) {
        await updateProduct(product._id, fields, token);
      } else {
        await createProduct(fields, token);
      }
      onSaved();
      onClose();
    } catch (err) {
      setStatus("error");
      setError(err.message || "Failed to save product.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4" onClick={onClose}>
      <div
        className="bg-black/95 border border-white/10 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto relative"
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
          <h2 className="text-xl font-bold text-white">{product ? "Edit Product" : "New Product"}</h2>

          <div>
            <label className="block text-xs font-semibold text-white/70 mb-2">Name</label>
            <input
              type="text"
              value={form.name}
              onChange={set("name")}
              required
              className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-white/70 mb-2">Category</label>
            <select
              value={form.categorySlug || defaultCategorySlug}
              onChange={set("categorySlug")}
              required
              className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              {categories.map((c) => (
                <option key={c.slug} value={c.slug} className="bg-black">
                  {c.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-white/70 mb-2">Sub-category (optional)</label>
            <input
              type="text"
              value={form.subCategory}
              onChange={set("subCategory")}
              placeholder="e.g. Espresso"
              className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-white/70 mb-2">Description</label>
            <textarea
              value={form.description}
              onChange={set("description")}
              rows={3}
              className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
            />
          </div>

          <div className="flex items-center gap-4 text-sm text-white/70">
            <label className="flex items-center gap-2">
              <input type="radio" checked={!sizedPricing} onChange={() => setSizedPricing(false)} />
              Single price
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" checked={sizedPricing} onChange={() => setSizedPricing(true)} />
              Sized prices
            </label>
          </div>

          {sizedPricing ? (
            <PriceRows prices={form.prices} onChange={(prices) => setForm((prev) => ({ ...prev, prices }))} />
          ) : (
            <div>
              <label className="block text-xs font-semibold text-white/70 mb-2">Price</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={form.price}
                onChange={set("price")}
                className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          )}

          <TagListInput
            label="Milk Options"
            values={form.milkOptions}
            onChange={(milkOptions) => setForm((prev) => ({ ...prev, milkOptions }))}
          />
          <TagListInput
            label="Sugar Options"
            values={form.sugarOptions}
            onChange={(sugarOptions) => setForm((prev) => ({ ...prev, sugarOptions }))}
          />
          <TagListInput
            label="Flavor Options"
            values={form.flavorOptions}
            onChange={(flavorOptions) => setForm((prev) => ({ ...prev, flavorOptions }))}
          />
          <TagListInput
            label="Condiments / Ingredients"
            values={form.condiments}
            onChange={(condiments) => setForm((prev) => ({ ...prev, condiments }))}
          />

          <div>
            <label className="block text-xs font-semibold text-white/70 mb-2">Image</label>
            {product?.image && !imageFile && (
              <img src={product.image} alt={form.name} className="w-16 h-16 rounded-lg object-cover mb-2" />
            )}
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
              className="w-full text-sm text-white/70 file:mr-3 file:px-3 file:py-1.5 file:rounded-lg file:border-0 file:bg-white/10 file:text-white file:text-xs hover:file:bg-white/20"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-white/70 mb-2">Temperature</label>
            <div className="flex items-center gap-4 text-sm text-white/70">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={form.hotAvailable} onChange={setChecked("hotAvailable")} />
                Hot
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={form.icedAvailable} onChange={setChecked("icedAvailable")} />
                Iced
              </label>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={form.seasonal} onChange={setChecked("seasonal")} />
              Seasonal
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={form.limitedTime} onChange={setChecked("limitedTime")} />
              Limited Time
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={form.active} onChange={setChecked("active")} />
              Active (visible on menu)
            </label>
          </div>

          {error && <p className="text-sm text-red-400 text-center">{error}</p>}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full mt-2 px-5 py-2.5 rounded-full bg-gradient-to-br from-red-500 via-orange-500 to-blue-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {status === "submitting" ? "Saving…" : product ? "Save Changes" : "Create Product"}
          </button>
        </form>
      </div>
    </div>
  );
}
