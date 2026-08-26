// useBanners.js — access currently-active site banners
import { useContext } from "react";
import BannerContext from "../contexts/BannerContext";

export function useBanners() {
  const ctx = useContext(BannerContext);
  if (!ctx) throw new Error("useBanners must be used within a BannerProvider");
  return ctx;
}
