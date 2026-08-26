// categoryIcons.js — maps known category slugs to an icon, with a generic fallback for new ones
import { Coffee, Utensils, Box, Menu as MenuIcon } from "lucide-react";

const ICONS_BY_SLUG = {
  coffee: Coffee,
  lunch: Utensils,
  fridge: Box,
};

export function getCategoryIcon(slug) {
  return ICONS_BY_SLUG[slug] ?? MenuIcon;
}
