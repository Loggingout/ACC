// PageLoader.jsx — shared full-page loading state shown while a route's code/data is loading
import { Loader2 } from "lucide-react";

export default function PageLoader() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-24 text-white/80">
      <Loader2 className="w-8 h-8 animate-spin" />
      <span className="text-sm">Loading…</span>
    </div>
  );
}
