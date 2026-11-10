import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { API_BASE_URL } from "../../../config/env";

const VISITOR_KEY = "acc-analytics-visitor";
const SESSION_KEY = "acc-analytics-session";
const EXCLUDED_KEY = "acc-analytics-excluded";
const MAX_DURATION_MS = 30 * 60 * 1000;
const ALLOWED_HOSTS = (import.meta.env.VITE_ANALYTICS_HOSTS || "acheerfulcup.com,www.acheerfulcup.com")
  .split(",").map((host) => host.trim().toLowerCase()).filter(Boolean);

function trackedPath(pathname) {
  if (/^\/menu\/[^/]+\/?$/.test(pathname)) return "/menu/:slug";
  const path = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
  return ["/", "/menu", "/catering-page", "/catering-request", "/review-page", "/cart", "/checkout"].includes(path) ? path : null;
}

function getIdentifier(storage, key) {
  let value = storage.getItem(key);
  if (!value) {
    value = crypto.randomUUID();
    storage.setItem(key, value);
  }
  return value;
}

export default function TrafficTracker() {
  const { pathname } = useLocation();
  const { isAdmin, loading } = useAuth();

  useEffect(() => {
    if (loading) return;
    try {
      const referrer = document.referrer ? new URL(document.referrer).hostname.toLowerCase() : "";
      if (isAdmin || new URLSearchParams(window.location.search).get("analytics") === "off" || referrer === "github.com" || referrer.endsWith(".github.com") || referrer.endsWith(".github.dev") || referrer.endsWith(".githubpreview.dev")) {
        localStorage.setItem(EXCLUDED_KEY, "1");
        return;
      }
      const host = window.location.hostname.toLowerCase();
      if (!import.meta.env.PROD || window.location.protocol !== "https:" || !ALLOWED_HOSTS.includes(host) || host.endsWith(".github.dev") || host.endsWith(".githubpreview.dev") || localStorage.getItem(EXCLUDED_KEY) || navigator.doNotTrack === "1") return;
      const path = trackedPath(pathname);
      if (!path) return;

      const payload = {
        visitId: crypto.randomUUID(),
        sessionId: getIdentifier(sessionStorage, SESSION_KEY),
        visitorId: getIdentifier(localStorage, VISITOR_KEY),
        path,
        durationMs: 0,
      };
      let elapsed = 0;
      let visibleSince = document.visibilityState === "visible" ? performance.now() : null;

      const send = () => {
        const visibleTime = visibleSince === null ? 0 : performance.now() - visibleSince;
        const body = JSON.stringify({ ...payload, durationMs: Math.min(MAX_DURATION_MS, Math.round(elapsed + visibleTime)) });
        fetch(`${API_BASE_URL}/analytics/visits`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body,
          keepalive: true,
        }).catch(() => {});
      };

      const onVisibilityChange = () => {
        if (document.visibilityState === "hidden") {
          if (visibleSince !== null) elapsed += performance.now() - visibleSince;
          visibleSince = null;
          send();
        } else {
          visibleSince = performance.now();
        }
      };

      send();
      const interval = window.setInterval(() => { if (visibleSince !== null) send(); }, 15000);
      document.addEventListener("visibilitychange", onVisibilityChange);
      window.addEventListener("pagehide", send);
      return () => {
        window.clearInterval(interval);
        document.removeEventListener("visibilitychange", onVisibilityChange);
        window.removeEventListener("pagehide", send);
        send();
      };
    } catch {
      return;
    }
  }, [pathname, isAdmin, loading]);

  return null;
}