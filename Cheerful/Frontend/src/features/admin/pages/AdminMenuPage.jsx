// AdminMenuPage.jsx — manage menu categories and products
import { useCallback, useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useAuth } from "../../../hooks/useAuth";
import { getAdminProducts, deleteCategory } from "../menu/api/adminMenuApi";
import CategorySection from "../menu/components/CategorySection";
import CategoryFormModal from "../menu/components/CategoryFormModal";
import ProductFormModal from "../menu/components/ProductFormModal";
import BulkApplyModal from "../menu/components/BulkApplyModal";

export default function AdminMenuPage() {
  const { token } = useAuth();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [categoryModal, setCategoryModal] = useState(null); // null | { category? }
  const [productModal, setProductModal] = useState(null); // null | { product?, defaultCategorySlug }
  const [bulkApplyCategory, setBulkApplyCategory] = useState(null); // null | category

  const loadGroups = useCallback(() => {
    setLoading(true);
    setError(null);
    getAdminProducts(token)
      .then(setGroups)
      .catch((err) => setError(err.message || "Failed to load menu."))
      .finally(() => setLoading(false));
  }, [token]);

  useEffect(() => {
    loadGroups();
  }, [loadGroups]);

  const handleDeleteCategory = async (category) => {
    if (!confirm(`Delete category "${category.title}"?`)) return;
    try {
      await deleteCategory(category.slug, token);
      loadGroups();
    } catch (err) {
      alert(err.message || "Failed to delete category.");
    }
  };

  const categories = groups.map((g) => g.category);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-2xl font-bold text-white">Menu</h2>
        <button
          type="button"
          onClick={() => setCategoryModal({})}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-br from-red-500 via-orange-500 to-blue-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          <Plus size={16} /> Add Category
        </button>
      </div>

      {loading && <p className="text-white/60 text-sm">Loading menu…</p>}
      {error && !loading && <p className="text-red-400 text-sm">{error}</p>}

      {!loading && !error && (
        <div className="flex flex-col gap-4">
          {groups.map((group) => (
            <CategorySection
              key={group.category._id}
              group={group}
              onEditCategory={(category) => setCategoryModal({ category })}
              onDeleteCategory={handleDeleteCategory}
              onAddProduct={(slug) => setProductModal({ defaultCategorySlug: slug })}
              onEditProduct={(product) => setProductModal({ product, defaultCategorySlug: group.category.slug })}
              onProductsChanged={loadGroups}
              onBulkApply={setBulkApplyCategory}
            />
          ))}
        </div>
      )}

      {categoryModal && (
        <CategoryFormModal
          category={categoryModal.category}
          onClose={() => setCategoryModal(null)}
          onSaved={loadGroups}
        />
      )}

      {productModal && (
        <ProductFormModal
          product={productModal.product}
          defaultCategorySlug={productModal.defaultCategorySlug}
          categories={categories}
          onClose={() => setProductModal(null)}
          onSaved={loadGroups}
        />
      )}

      {bulkApplyCategory && (
        <BulkApplyModal
          category={bulkApplyCategory}
          onClose={() => setBulkApplyCategory(null)}
          onSaved={loadGroups}
        />
      )}
    </div>
  );
}

