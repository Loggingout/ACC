// AdminSettingsPage.jsx — update the signed-in admin's name, email, password, and picture
import { useState } from "react";
import { User, UserPlus } from "lucide-react";
import { useAuth } from "../../../hooks/useAuth";
import { updateProfile, createAdmin } from "../settings/api/adminSettingsApi";

export default function AdminSettingsPage() {
  const { user, token, updateUser } = useAuth();
  const [form, setForm] = useState({ name: user?.name ?? "", email: user?.email ?? "", password: "" });
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  const [newAdmin, setNewAdmin] = useState({ name: "", email: "", password: "" });
  const [newAdminStatus, setNewAdminStatus] = useState("idle");
  const [newAdminError, setNewAdminError] = useState(null);

  const setNewAdminField = (key) => (e) => setNewAdmin((prev) => ({ ...prev, [key]: e.target.value }));

  const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0] ?? null;
    setAvatarFile(file);
    setAvatarPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    try {
      const updated = await updateProfile(
        { name: form.name, email: form.email, password: form.password, avatarFile },
        token
      );
      updateUser(updated);
      setForm((prev) => ({ ...prev, password: "" }));
      setAvatarFile(null);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err.message || "Failed to update profile.");
    }
  };

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    setNewAdminStatus("submitting");
    setNewAdminError(null);

    try {
      await createAdmin(newAdmin, token);
      setNewAdmin({ name: "", email: "", password: "" });
      setNewAdminStatus("success");
    } catch (err) {
      setNewAdminStatus("error");
      setNewAdminError(err.message || "Failed to create admin account.");
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-lg">
      <h2 className="text-2xl font-bold text-white">Settings</h2>

      <form onSubmit={handleSubmit} className="rounded-2xl bg-black/50 p-6 flex flex-col gap-5">
        <div className="flex items-center gap-4">
          {avatarPreview || user?.avatar ? (
            <img
              src={avatarPreview ?? user.avatar}
              alt={form.name}
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 via-orange-500 to-blue-500 flex items-center justify-center text-white">
              <User size={24} />
            </div>
          )}
          <div>
            <label className="block text-xs font-semibold text-white/70 mb-2">Profile Picture</label>
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={handleAvatarChange}
              className="text-sm text-white/70 file:mr-3 file:px-3 file:py-1.5 file:rounded-lg file:border-0 file:bg-white/10 file:text-white file:text-xs hover:file:bg-white/20"
            />
          </div>
        </div>

        <div>
          <label htmlFor="name" className="block text-xs font-semibold text-white/70 mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={form.name}
            onChange={set("name")}
            required
            className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-xs font-semibold text-white/70 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={form.email}
            onChange={set("email")}
            required
            className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-xs font-semibold text-white/70 mb-2">
            New Password (optional)
          </label>
          <input
            type="password"
            id="password"
            value={form.password}
            onChange={set("password")}
            placeholder="Leave blank to keep current password"
            minLength={8}
            className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {status === "success" && <p className="text-sm text-sky-400 text-center">Profile updated.</p>}
        {error && <p className="text-sm text-red-400 text-center">{error}</p>}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full px-5 py-2.5 rounded-full bg-gradient-to-br from-red-500 via-orange-500 to-blue-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
        >
          {status === "submitting" ? "Saving…" : "Save Changes"}
        </button>
      </form>

      <form onSubmit={handleCreateAdmin} className="rounded-2xl bg-black/50 p-6 flex flex-col gap-5">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-red-500 via-orange-500 to-blue-500 shrink-0">
            <UserPlus size={16} className="text-white" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Create Admin Account</h3>
            <p className="text-xs text-white/50">Give another staff member admin access</p>
          </div>
        </div>

        <div>
          <label htmlFor="newAdminName" className="block text-xs font-semibold text-white/70 mb-2">
            Name
          </label>
          <input
            type="text"
            id="newAdminName"
            value={newAdmin.name}
            onChange={setNewAdminField("name")}
            required
            className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label htmlFor="newAdminEmail" className="block text-xs font-semibold text-white/70 mb-2">
            Email
          </label>
          <input
            type="email"
            id="newAdminEmail"
            value={newAdmin.email}
            onChange={setNewAdminField("email")}
            required
            className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label htmlFor="newAdminPassword" className="block text-xs font-semibold text-white/70 mb-2">
            Temporary Password
          </label>
          <input
            type="password"
            id="newAdminPassword"
            value={newAdmin.password}
            onChange={setNewAdminField("password")}
            required
            minLength={8}
            placeholder="At least 8 characters"
            className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <p className="text-xs text-white/40 mt-1.5">
            Share this with them directly — they can change it later from their own Settings page.
          </p>
        </div>

        {newAdminStatus === "success" && (
          <p className="text-sm text-sky-400 text-center">Admin account created.</p>
        )}
        {newAdminError && <p className="text-sm text-red-400 text-center">{newAdminError}</p>}

        <button
          type="submit"
          disabled={newAdminStatus === "submitting"}
          className="w-full px-5 py-2.5 rounded-full bg-gradient-to-br from-red-500 via-orange-500 to-blue-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
        >
          {newAdminStatus === "submitting" ? "Creating…" : "Create Admin"}
        </button>
      </form>
    </div>
  );
}
