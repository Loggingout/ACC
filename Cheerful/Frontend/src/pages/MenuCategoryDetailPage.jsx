// MenuCategoryDetailPage.jsx — dynamic /menu/:slug route, works for any category (including new admin-created ones)
import { useParams } from "react-router-dom";
import MenuCategoryPage from "../features/menu/components/MenuCategoryPage";
import PageLoader from "../components/feedback/PageLoader";
import { useCategories } from "../features/menu/hooks/useCategories";
import { getCategoryIcon } from "../features/menu/data/categoryIcons";

export default function MenuCategoryDetailPage() {
  const { slug } = useParams();
  const { categories, loading, error } = useCategories();

  if (loading) return <PageLoader />;
  if (error) return <p className="px-4 sm:px-6 md:px-8 py-8 text-red-300 text-sm">Couldn't load this menu: {error}</p>;

  const category = categories.find((c) => c.slug === slug);
  if (!category) {
    return (
      <p className="px-4 sm:px-6 md:px-8 py-8 text-white/70 text-sm">Unknown menu category "{slug}".</p>
    );
  }

  return (
    <MenuCategoryPage
      slug={category.slug}
      title={category.title}
      description={category.description}
      icon={getCategoryIcon(category.slug)}
    />
  );
}
