// MenuCategoryGrid.jsx — category picker shown on the /menu landing page
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { menuCategories } from "../data/menuCategories";

export default function MenuCategoryGrid() {
  return (
    <div className="menu-information px-4 sm:px-6 md:px-8 py-8">
      <motion.h1
        className="text-3xl sm:text-4xl font-bold mb-2 text-white"
        style={{ textShadow: "0 2px 4px rgba(0,0,0,0.35)" }}
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        Our Menu
      </motion.h1>

      <motion.p
        className="text-white/80 mb-8 text-base sm:text-lg leading-relaxed"
        style={{ textShadow: "0 1px 3px rgba(0,0,0,0.25)" }}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        Choose a category below to explore our full menu.
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuCategories.map(({ slug, title, description, icon: Icon }, i) => (
          <motion.div
            key={slug}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
          >
            <Link
              to={`/menu/${slug}`}
              className="group relative flex flex-col h-full overflow-hidden rounded-2xl bg-black/40 hover:bg-black/50 hover:-translate-y-1 transition-all duration-300 p-6 sm:p-8 shadow-lg border border-white/10"
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-red-500 via-orange-500 to-blue-500 mb-4 shrink-0">
                <Icon className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">{title}</h2>
              <p className="text-sm text-white/70 leading-relaxed">{description}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-yellow-400 group-hover:gap-2 transition-all">
                View menu <ArrowRight size={16} />
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
