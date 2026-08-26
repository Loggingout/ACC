// CategorySection.jsx — one category's header + product list in the admin menu page
import { useState } from "react";
import { Pencil, Trash2, Plus, Wand2 } from "lucide-react";
import { formatCurrency } from "../../../../utils/currency";
import { deleteProduct } from "../api/adminMenuApi";
import { useAuth } from "../../../../hooks/useAuth";

function priceLabel(product) {
  if (product.prices && Object.keys(product.prices).length) {
    const min = Math.min(...Object.values(product.prices));
    return `From ${formatCurrency(min)}`;
  }
  if (product.price != null) return formatCurrency(product.price);
  return "Ask in store";
}

function ProductRow({ product, onEdit, onDeleted }) {
  const { token } = useAuth();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Delete "${product.name}"? This cannot be undone.`)) return;
    setDeleting(true);
    try {
      await deleteProduct(product._id, token);
      onDeleted();
    } catch (err) {
      alert(err.message || "Failed to delete product.");
      setDeleting(false);
    }
  };

  return (
    <div className="flex items-center gap-3 rounded-xl bg-black/40 p-3">
      {product.image ? (
        <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover shrink-0" />
      ) : (
        <div className="w-12 h-12 rounded-lg bg-white/10 shrink-0" />
      )}

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h4 className={`font-medium truncate ${product.active ? "text-white" : "text-white/40 line-through"}`}>
            {product.name}
          </h4>
          {product.seasonal && (
            <span className="text-[10px] font-semibold uppercase tracking-wide bg-orange-500/10 text-orange-500 px-2 py-0.5 rounded-full border border-orange-500/30">
              Seasonal
            </span>
          )}
          {product.limitedTime && (
            <span className="text-[10px] font-semibold uppercase tracking-wide bg-sky-500/10 text-sky-500 px-2 py-0.5 rounded-full border border-sky-500/30">
              Limited Time
            </span>
          )}
        </div>
        <p className="text-white/50 text-xs mt-0.5">{priceLabel(product)}</p>
      </div>

      <div className="flex items-center gap-1 shrink-0">
        <button
          type="button"
          onClick={() => onEdit(product)}
          className="p-1.5 text-white/60 hover:text-white transition-colors"
          aria-label="Edit product"
        >
          <Pencil size={15} />
        </button>
        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          className="p-1.5 text-white/60 hover:text-red-400 transition-colors disabled:opacity-50"
          aria-label="Delete product"
        >
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  );
}

export default function CategorySection({ group, onEditCategory, onDeleteCategory, onAddProduct, onEditProduct, onProductsChanged, onBulkApply }) {
  const { category, products } = group;

  return (
    <div className="rounded-2xl bg-black/50 p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h3 className="text-lg font-bold text-white">{category.title}</h3>
          <p className="text-white/50 text-xs">/{category.slug}</p>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => onBulkApply(category)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 text-white text-xs font-semibold hover:bg-white/20 transition-colors"
          >
            <Wand2 size={14} /> Bulk Apply
          </button>
          <button
            type="button"
            onClick={() => onAddProduct(category.slug)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-br from-red-500 via-orange-500 to-blue-500 text-white text-xs font-semibold hover:opacity-90 transition-opacity"
          >
            <Plus size={14} /> Add Product
          </button>
          <button
            type="button"
            onClick={() => onEditCategory(category)}
            className="p-1.5 text-white/60 hover:text-white transition-colors"
            aria-label="Edit category"
          >
            <Pencil size={15} />
          </button>
          <button
            type="button"
            onClick={() => onDeleteCategory(category)}
            className="p-1.5 text-white/60 hover:text-red-400 transition-colors"
            aria-label="Delete category"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      {products.length === 0 ? (
        <p className="text-white/40 text-sm">No products in this category yet.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {products.map((product) => (
            <ProductRow key={product._id} product={product} onEdit={onEditProduct} onDeleted={onProductsChanged} />
          ))}
        </div>
      )}
    </div>
  );
}
