// BannerStrip.jsx — top-of-page announcement/service-status banners (dismissible for the session)
import { useState } from "react";
import { Megaphone, AlertTriangle, X } from "lucide-react";

const STYLES = {
  announcement: "bg-sky-500 text-white",
  service: "bg-yellow-700 text-white",
};

const ICONS = {
  announcement: Megaphone,
  service: AlertTriangle,
};

export default function BannerStrip({ banners }) {
  const [dismissed, setDismissed] = useState([]);

  const visible = banners.filter((b) => !dismissed.includes(b._id));
  if (visible.length === 0) return null;

  return (
    <div className="flex flex-col">
      {visible.map((banner) => {
        const Icon = ICONS[banner.type] ?? Megaphone;
        return (
          <div
            key={banner._id}
            className={`flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-center ${STYLES[banner.type] ?? STYLES.announcement}`}
          >
            <Icon size={16} className="shrink-0" />
            <span>{banner.message}</span>
            <button
              type="button"
              onClick={() => setDismissed((prev) => [...prev, banner._id])}
              aria-label="Dismiss"
              className="ml-2 shrink-0 hover:opacity-70 transition-opacity"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
