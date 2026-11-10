import { useCallback, useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { useAuth } from "../../../hooks/useAuth";
import { deleteCateringRequest, getCateringRequests, updateCateringStatus } from "../../catering/api/cateringApi";

const STATUS_OPTIONS = ["new", "contacted", "confirmed", "declined"];
const FINAL_STATUSES = ["confirmed", "declined"];

function formatEventTime(time) {
  if (!time) return "Not provided";
  const match = /^(\d{2}):(\d{2})$/.exec(time);
  if (!match) return time;
  const hours = Number(match[1]);
  return `${hours % 12 || 12}:${match[2]} ${hours < 12 ? "AM" : "PM"}`;
}

export default function AdminCateringPage() {
  const { token } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const loadRequests = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getCateringRequests(token);
      setRequests(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Failed to load catering requests.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    loadRequests();
    window.addEventListener("catering:new", loadRequests);
    return () => window.removeEventListener("catering:new", loadRequests);
  }, [loadRequests]);

  const handleStatusChange = async (request, status) => {
    if (FINAL_STATUSES.includes(status) && !window.confirm(`Mark this request as ${status}? This status cannot be changed afterward.`)) return;
    setUpdatingId(request._id);
    setError("");
    try {
      const updated = await updateCateringStatus(request._id, status, token);
      setRequests((previous) => previous.map((item) => item._id === request._id ? updated : item));
      window.dispatchEvent(new Event("catering:updated"));
    } catch (err) {
      setError(err.message || "Failed to update request status.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (request) => {
    if (!window.confirm(`Permanently delete the catering request from ${request.businessName}?`)) return;
    setDeletingId(request._id);
    setError("");
    try {
      await deleteCateringRequest(request._id, token);
      setRequests((previous) => previous.filter((item) => item._id !== request._id));
      window.dispatchEvent(new Event("catering:updated"));
    } catch (err) {
      setError(err.message || "Failed to delete catering request.");
    } finally {
      setDeletingId(null);
    }
  };

  const confirmedCount = requests.filter((request) => request.status === "confirmed").length;
  const declinedCount = requests.filter((request) => request.status === "declined").length;
  const stats = [
    { label: "Confirmed", count: confirmedCount },
    { label: "Declined", count: declinedCount },
    { label: "Awaiting decision", count: requests.length - confirmedCount - declinedCount },
    { label: "Total requests", count: requests.length },
  ];

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-white">Catering Requests</h2>
      {loading && <p className="text-white/60 text-sm">Loading requests...</p>}
      {error && <div role="alert" className="text-red-200 text-sm">{error} <button type="button" onClick={loadRequests} className="underline">Refresh requests</button></div>}
      {!loading && (!error || requests.length > 0) && (
        <section aria-labelledby="catering-stats-heading">
          <h3 id="catering-stats-heading" className="text-lg font-semibold text-white mb-3">Request Statistics</h3>
          <div className="overflow-x-auto rounded-lg bg-black/50">
            <table className="w-full text-left text-sm text-white">
              <thead className="border-b border-white/10 text-white/60">
                <tr><th scope="col" className="px-4 py-3 font-medium">Status</th><th scope="col" className="px-4 py-3 text-right font-medium">Requests</th><th scope="col" className="px-4 py-3 text-right font-medium">Share of total</th></tr>
              </thead>
              <tbody>
                {stats.map((stat) => (
                  <tr key={stat.label} className="border-b border-white/10 last:border-b-0">
                    <th scope="row" className="px-4 py-3 font-medium">{stat.label}</th>
                    <td className="px-4 py-3 text-right tabular-nums">{stat.count}</td>
                    <td className="px-4 py-3 text-right tabular-nums">{requests.length ? `${Math.round(stat.count / requests.length * 100)}%` : "--"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
      {!loading && !error && requests.length === 0 && <p className="text-white/60 text-sm">No catering requests yet.</p>}
      <div className="flex flex-col gap-4">
        {requests.map((request) => (
          <article key={request._id} className="rounded-lg bg-black/50 p-5 text-white">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0">
                <h3 className="font-semibold text-lg break-words">{request.businessName}</h3>
                <p className="text-sm text-white/60">Submitted {new Date(request.createdAt).toLocaleString(undefined, { hour12: true })}</p>
              </div>
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-2 text-sm text-white/70">
                  Status
                  <select value={request.status} onChange={(event) => handleStatusChange(request, event.target.value)} disabled={updatingId !== null || deletingId !== null || FINAL_STATUSES.includes(request.status)} title={FINAL_STATUSES.includes(request.status) ? "Final status cannot be changed" : "Change status"} aria-label={`Status for ${request.businessName}`} className="rounded border border-white/30 bg-black px-3 py-2 text-white capitalize disabled:opacity-50">
                    {STATUS_OPTIONS.map((status) => <option key={status} value={status}>{status}</option>)}
                  </select>
                </label>
                <button type="button" onClick={() => handleDelete(request)} disabled={deletingId !== null || updatingId !== null} aria-label={`Delete request from ${request.businessName}`} title="Delete request" className="p-2 text-red-300 hover:text-red-200 hover:bg-red-500/10 rounded-md disabled:opacity-50">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5 text-sm">
              <div><dt className="text-white/60">Contact</dt><dd className="break-words">{request.name}</dd></div>
              <div><dt className="text-white/60">Email</dt><dd className="break-all"><a className="underline" href={`mailto:${request.businessEmail}`}>{request.businessEmail}</a></dd></div>
              <div><dt className="text-white/60">Phone</dt><dd className="break-words"><a className="underline" href={`tel:${request.phoneNumber}`}>{request.phoneNumber}</a></dd></div>
              <div><dt className="text-white/60">Event date</dt><dd>{request.eventDate || "Not provided"}</dd></div>
              <div><dt className="text-white/60">Event time</dt><dd>{formatEventTime(request.eventTime)}</dd></div>
              <div><dt className="text-white/60">Hours needed</dt><dd>{request.hoursNeeded ?? "Not provided"}</dd></div>
              <div className="sm:col-span-2 lg:col-span-3"><dt className="text-white/60">Event address</dt><dd className="break-words">{request.location}</dd></div>
              <div className="sm:col-span-2 lg:col-span-3"><dt className="text-white/60">Event details</dt><dd className="whitespace-pre-wrap break-words">{request.description}</dd></div>
            </dl>
          </article>
        ))}
      </div>
    </div>
  );
}
