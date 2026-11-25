import { useCallback, useEffect, useState } from "react";
import { motion as Motion, useReducedMotion } from "framer-motion";
import { Activity, ArrowUpRight, Clock3, Eye, MousePointer2, RefreshCw, Users } from "lucide-react";
import { Area, AreaChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useAuth } from "../../../hooks/useAuth";
import { getTrafficStats } from "../analytics/api/adminAnalyticsApi";

const CHART_COLORS = ["#f59e0b", "#0ea5a4", "#3b82f6", "#f97362", "#8b7cc8", "#a8b0b7"];

function formatDuration(milliseconds) {
  const seconds = Math.round(milliseconds / 1000);
  return `${Math.floor(seconds / 60)}m ${String(seconds % 60).padStart(2, "0")}s`;
}

function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`));
}

function lastThirtyDays(dailyVisitors) {
  const counts = new Map(dailyVisitors.map((day) => [day.date, day.visitors]));
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  return Array.from({ length: 30 }, (_, index) => {
    const date = new Date(today);
    date.setUTCDate(date.getUTCDate() - 29 + index);
    const key = date.toISOString().slice(0, 10);
    return { date: key, visitors: counts.get(key) || 0 };
  });
}

function MetricCard({ icon, label, value, detail, accent = false }) {
  const Icon = icon;
  return (
    <div className={`min-w-0 rounded-lg p-4 sm:p-5 ${accent ? "bg-[#202325] text-white" : "bg-white text-[#202325]"}`}>
      <div className="flex items-start justify-between gap-2">
        <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-md ${accent ? "bg-white/10 text-amber-400" : "bg-orange-50 text-orange-500"}`}><Icon size={18} /></span>
        <ArrowUpRight size={16} className={accent ? "text-white/40" : "text-gray-300"} aria-hidden="true" />
      </div>
      <dt className={`mt-5 text-xs font-medium ${accent ? "text-white/65" : "text-gray-500"}`}>{label}</dt>
      <dd className="mt-1 text-2xl font-bold tabular-nums sm:text-3xl">{value}</dd>
      <p className={`mt-2 text-xs ${accent ? "text-white/50" : "text-gray-500"}`}>{detail}</p>
    </div>
  );
}

function PanelHeading({ icon, title, detail }) {
  const Icon = icon;
  return (
    <div className="flex items-start gap-3">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-amber-50 text-amber-600"><Icon size={16} /></span>
      <div className="min-w-0"><h3 className="text-sm font-bold text-[#202325]">{title}</h3><p className="mt-1 text-xs leading-relaxed text-gray-500">{detail}</p></div>
    </div>
  );
}

export default function AdminAnalyticsPage() {
  const { token } = useAuth();
  const reducedMotion = useReducedMotion();
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
  const topPages = stats ? stats.pages.slice(0, 5).map((page) => ({ name: page.path, value: page.visits })) : [];
  const otherViews = stats ? stats.pages.slice(5).reduce((total, page) => total + page.visits, 0) : 0;
  const pageBreakdown = otherViews ? [...topPages, { name: "Other pages", value: otherViews }] : topPages;

  return (
    <Motion.div initial={reducedMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="min-w-0 rounded-lg bg-[#f4f5f6] p-4 text-[#202325] sm:p-6 lg:p-7">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase text-orange-600">A Cheerful Cup / Analytics</p>
          <h2 className="mt-1 text-2xl font-bold sm:text-3xl">Site Analytics</h2>
          <p className="mt-1 text-sm text-gray-500">A look at how visitors spend time on your site.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-md border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-600">Last 30 days · UTC</span>
          <button type="button" onClick={loadStats} disabled={loading} title="Refresh analytics" aria-label="Refresh analytics" className="grid h-9 w-9 place-items-center rounded-md border border-gray-200 bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-50"><RefreshCw size={16} /></button>
        </div>
      </div>

      {loading && <p className="py-10 text-sm text-gray-500" role="status">Loading analytics...</p>}
      {error && !loading && <div role="alert" className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error} <button type="button" className="font-semibold underline" onClick={loadStats}>Try again</button></div>}

      {stats && !loading && !error && (
        <div className="mt-6 space-y-4">
          <dl className="grid grid-cols-2 gap-3 xl:grid-cols-4">
            <MetricCard icon={Activity} label="Sessions tracked" value={stats.sessions.toLocaleString()} detail="Over the last 30 days" accent />
            <MetricCard icon={Eye} label="Page views" value={pageViews.toLocaleString()} detail="Total recorded visits" />
            <MetricCard icon={Clock3} label="Average visit time" value={formatDuration(averageTime)} detail="Time on a visible page" />
            <MetricCard icon={Users} label="Today's visitors" value={dailyVisitors[dailyVisitors.length - 1].visitors.toLocaleString()} detail="Unique browsers today" />
          </dl>

          <div className="grid gap-4 xl:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)]">
            <section aria-labelledby="visitor-trend-heading" className="min-w-0 rounded-lg bg-white p-4 sm:p-5">
              <PanelHeading icon={Activity} title="Visitor Overview" detail="Unique browsers per day over the last 30 days" />
              <div id="visitor-trend-heading" className="sr-only">Daily visitor trend</div>
              <div className="mt-6 h-64 min-w-0" aria-hidden="true">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={dailyVisitors} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
                    <defs><linearGradient id="visitor-chart-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f59e0b" stopOpacity={0.28} /><stop offset="100%" stopColor="#f59e0b" stopOpacity={0.02} /></linearGradient></defs>
                    <CartesianGrid vertical={false} stroke="#eef0f1" strokeDasharray="3 3" />
                    <XAxis dataKey="date" tickFormatter={formatDate} tick={{ fontSize: 10, fill: "#879099" }} tickLine={false} axisLine={false} minTickGap={30} />
                    <YAxis allowDecimals={false} tick={{ fontSize: 10, fill: "#879099" }} tickLine={false} axisLine={false} width={35} />
                    <Tooltip labelFormatter={formatDate} formatter={(value) => [value, "Visitors"]} contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 12 }} />
                    <Area type="monotone" dataKey="visitors" stroke="#f59e0b" strokeWidth={2} fill="url(#visitor-chart-fill)" isAnimationActive={!reducedMotion} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </section>

            <section aria-labelledby="page-share-heading" className="min-w-0 rounded-lg bg-white p-4 sm:p-5">
              <PanelHeading icon={MousePointer2} title="Visits by Page" detail="Share of recorded page views" />
              <div id="page-share-heading" className="sr-only">Page visit breakdown</div>
              {pageViews > 0 ? (
                <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row xl:flex-col 2xl:flex-row">
                  <div className="relative h-44 w-44 shrink-0" aria-hidden="true">
                    <ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={pageBreakdown} dataKey="value" nameKey="name" innerRadius="66%" outerRadius="92%" paddingAngle={2} stroke="none" isAnimationActive={!reducedMotion}>{pageBreakdown.map((page, index) => <Cell key={page.name} fill={CHART_COLORS[index]} />)}</Pie><Tooltip formatter={(value) => [value, "Visits"]} /></PieChart></ResponsiveContainer>
                    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center"><span className="text-xl font-bold tabular-nums">{pageViews.toLocaleString()}</span><span className="text-xs text-gray-500">page views</span></div>
                  </div>
                  <ul className="w-full min-w-0 space-y-3 text-xs">
                    {pageBreakdown.map((page, index) => <li key={page.name} className="flex items-center gap-2"><span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: CHART_COLORS[index] }} /><span className="min-w-0 flex-1 break-all text-gray-600">{page.name}</span><span className="shrink-0 font-semibold tabular-nums text-gray-900">{Math.round(page.value / pageViews * 100)}%</span></li>)}
                  </ul>
                </div>
              ) : <p className="py-16 text-center text-sm text-gray-500">No page visits recorded yet.</p>}
            </section>
          </div>

          <div className="grid gap-4 xl:grid-cols-2">
            <section aria-labelledby="page-visit-heading" className="min-w-0 rounded-lg bg-white p-4 sm:p-5">
              <PanelHeading icon={Clock3} title="Page Visit Time" detail="Average visible time per recorded visit" />
              <div id="page-visit-heading" className="sr-only">Page visit time</div>
              <div className="mt-5 overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="border-b border-gray-100 bg-gray-50 text-gray-500"><tr><th scope="col" className="px-3 py-2 font-medium">Page</th><th scope="col" className="px-3 py-2 text-right font-medium">Visits</th><th scope="col" className="px-3 py-2 text-right font-medium">Avg. time</th></tr></thead>
                  <tbody>{stats.pages.map((page) => <tr key={page.path} className="border-b border-gray-100 last:border-0"><th scope="row" className="break-all px-3 py-3 font-medium">{page.path}</th><td className="px-3 py-3 text-right tabular-nums text-gray-600">{page.visits.toLocaleString()}</td><td className="whitespace-nowrap px-3 py-3 text-right tabular-nums text-gray-600">{formatDuration(page.averageDurationMs)}</td></tr>)}</tbody>
                </table>
                {stats.pages.length === 0 && <p className="py-5 text-sm text-gray-500">No page visits recorded yet.</p>}
              </div>
            </section>

            <section aria-labelledby="daily-visitors-heading" className="min-w-0 rounded-lg bg-white p-4 sm:p-5">
              <PanelHeading icon={Users} title="Daily Visitors" detail="Unique browsers, grouped by UTC date" />
              <div id="daily-visitors-heading" className="sr-only">Daily visitors</div>
              <div className="mt-5 max-h-80 overflow-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="sticky top-0 border-b border-gray-100 bg-gray-50 text-gray-500"><tr><th scope="col" className="px-3 py-2 font-medium">Date (UTC)</th><th scope="col" className="px-3 py-2 text-right font-medium">Visitors</th></tr></thead>
                  <tbody>{[...dailyVisitors].reverse().map((day) => <tr key={day.date} className="border-b border-gray-100 last:border-0"><th scope="row" className="px-3 py-3 font-medium tabular-nums">{day.date}</th><td className="px-3 py-3 text-right tabular-nums text-gray-600">{day.visitors.toLocaleString()}</td></tr>)}</tbody>
                </table>
              </div>
            </section>
          </div>
          <p className="text-xs leading-relaxed text-gray-500">Visitors are unique browsers. Page visit time measures visible time, up to 30 minutes per page.</p>
        </div>
      )}
    </Motion.div>
  );
}