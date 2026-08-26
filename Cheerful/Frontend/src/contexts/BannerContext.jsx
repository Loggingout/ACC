// BannerContext.jsx — publicly fetches currently-active site banners (maintenance/announcement/service)
import { createContext, useCallback, useEffect, useState } from "react";
import { getActiveBanners } from "../services/bannersApi";

const BannerContext = createContext(null);

export function BannerProvider({ children }) {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  const refetch = useCallback(() => {
    getActiveBanners()
      .then((data) => setBanners(Array.isArray(data) ? data : []))
      .catch(() => setBanners([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const maintenanceBanner = banners.find((b) => b.type === "maintenance") ?? null;
  const otherBanners = banners.filter((b) => b.type !== "maintenance");

  const value = { banners, loading, refetch, maintenanceBanner, otherBanners };

  return <BannerContext.Provider value={value}>{children}</BannerContext.Provider>;
}

export default BannerContext;
