// menuCategories.js
// Lightweight category metadata only — item data lives in its own per-category
// file so each menu page can be code-split and load independently.
import { Coffee, Utensils, Box } from "lucide-react";

export const menuCategories = [
  {
    slug: "coffee",
    title: "Coffee",
    description: "Espresso drinks, brewed coffee, and iced favorites.",
    icon: Coffee,
  },
  {
    slug: "lunch",
    title: "Lunch",
    description: "Burritos, hot dogs, tamales, and seasonal soups.",
    icon: Utensils,
  },
  {
    slug: "fridge",
    title: "Fridge Items",
    description: "Grab-and-go drinks, snacks, and salads.",
    icon: Box,
  },
];
