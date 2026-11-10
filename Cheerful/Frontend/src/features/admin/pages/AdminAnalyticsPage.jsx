import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { getTrafficStats } from "../analytics/api/adminAnalyticsApi";

function formatDuration(milliseconds) {
  const seconds = Math.round(milliseconds / 1000);
  return `${Math.floor(seconds / 60)}m ${String(seconds % 60).padStart(2, "0")}s`;
}

function lastThirtyDays(dailyVisitors) {
  const counts = new Map(dailyVisitors.map((day) => [day.date, day.visitors]));
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  return Array.from({ length: 30 }, (_, index) => {
    const date = new Date(today);
    date.setUTCDate(date.getUTCDate() - index);
    const key = date.toISOString().slice(0, 10);
    return { date: key, visitors: counts.get(key) || 0 };
  });
}

export default function AdminAnalyticsPage() {
  const { token } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadStats = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setStats(await getTrafficStats(token));
    } catch (err) {
      setError(err.message || "Failed to load analytics.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => { loadStats(); }, [loadStats]);

  const pageViews = stats?.pages.reduce((total, page) => total + page.visits, 0) || 0;
  const averageTime = pageViews ? stats.pages.reduce((total, page) => total + page.averageDurationMs * page.visits, 0) / pageViews : 0;
  const dailyVisitors = stats ? lastThirtyDays(stats.dailyVisitors) : [];

  return (
    <div className="flex flex-col gap-6 text-white">
      <div>
        <h2 className="text-2xl font-bold">Site Analytics</h2>
        <p className="mt-1 text-sm text-white/60">Last 30 days, grouped by UTC date. Visitors are unique browsers; visit time measures visible time, up to 30 minutes per page.</p>
      </div>
      {loading && <p className="text-sm text-white/60">Loading analytics...</p>}
      {error && <p role="alert" className="text-sm text-red-200">{error} <button type="button" className="underline" onClick={loadStats}>Try again</button></p>}
      {stats && !loading && !error && (
        <>
          <dl className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-lg bg-black/50 p-4"><dt className="text-sm text-white/60">Sessions Tracked</dt><dd className="mt-2 text-2xl font-bold tabular-nums">{stats.sessions.toLocaleString()}</dd></div>
            <div className="rounded-lg bg-black/50 p-4"><dt className="text-sm text-white/60">Average Page Visit Time</dt><dd className="mt-2 text-2xl font-bold tabular-nums">{formatDuration(averageTime)}</dd></div>
            <div className="rounded-lg bg-black/50 p-4"><dt className="text-sm text-white/60">Today's Visitors</dt><dd className="mt-2 text-2xl font-bold tabular-nums">{dailyVisitors[0].visitors.toLocaleString()}</dd></div>
          </dl>
          <section aria-labelledby="page-visit-heading">
            <h3 id="page-visit-heading" className="mb-3 text-lg font-semibold">Page Visit Time</h3>
            <div className="overflow-x-auto rounded-lg bg-black/50">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-white/10 text-white/60"><tr><th scope="col" className="px-4 py-3 font-medium">Page</th><th scope="col" className="px-4 py-3 text-right font-medium">Visits</th><th scope="col" className="px-4 py-3 text-right font-medium">Average time</th></tr></thead>
                <tbody>
                  {stats.pages.map((page) => <tr key={page.path} className="border-b border-white/10 last:border-b-0"><th scope="row" className="px-4 py-3 font-medium break-all">{page.path}</th><td className="px-4 py-3 text-right tabular-nums">{page.visits.toLocaleString()}</td><td className="px-4 py-3 text-right tabular-nums">{formatDuration(page.averageDurationMs)}</td></tr>)}
                </tbody>
              </table>
              {stats.pages.length === 0 && <p className="px-4 py-4 text-sm text-white/60">No page visits recorded yet.</p>}
            </div>
          </section>
          <section aria-labelledby="daily-visitors-heading">
            <h3 id="daily-visitors-heading" className="mb-3 text-lg font-semibold">Daily Visitors</h3>
            <div className="overflow-x-auto rounded-lg bg-black/50">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-white/10 text-white/60"><tr><th scope="col" className="px-4 py-3 font-medium">Date (UTC)</th><th scope="col" className="px-4 py-3 text-right font-medium">Unique visitors</th></tr></thead>
                <tbody>
                  {dailyVisitors.map((day) => <tr key={day.date} className="border-b border-white/10 last:border-b-0"><th scope="row" className="px-4 py-3 font-medium tabular-nums">{day.date}</th><td className="px-4 py-3 text-right tabular-nums">{day.visitors.toLocaleString()}</td></tr>)}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </div>
  );
}