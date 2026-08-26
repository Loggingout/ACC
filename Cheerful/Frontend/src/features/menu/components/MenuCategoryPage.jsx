// MenuCategoryPage.jsx — shared layout for a single menu category (e.g. /menu/coffee)
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import MenuCards from "./menuCards";
import PageLoader from "../../../components/feedback/PageLoader";
import { useCategoryProducts } from "../hooks/useCategoryProducts";

export default function MenuCategoryPage({ slug, title, description, icon: Icon }) {
  const { products, loading, error } = useCategoryProducts(slug);

  return (
    <div className="px-4 sm:px-6 md:px-8 py-8">
      <Link
        to="/menu"
        className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors mb-6"
      >
        <ArrowLeft size={16} /> Back to Menu
      </Link>

      <div className="flex items-center gap-3 mb-2">
        {Icon && (
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-red-500 via-orange-500 to-blue-500 shrink-0">
            <Icon className="w-5 h-5 text-white" />
          </div>
        )}
        <h1 className="text-3xl sm:text-4xl font-bold text-white">{title}</h1>
      </div>

      {description && (
        <p className="text-white/80 mb-8 max-w-2xl leading-relaxed">{description}</p>
      )}

      {loading && <PageLoader />}
      {error && !loading && (
        <p className="text-red-300 text-sm">Couldn't load this menu: {error}</p>
      )}
      {!loading && !error && <MenuCards menu={products} />}
    </div>
  );
}
