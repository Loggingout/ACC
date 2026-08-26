// SignInForm.jsx — email/password sign-in, redirects admins to /admin and others back home
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Mail, Lock, LogIn } from "lucide-react";
import { useAuth } from "../../../hooks/useAuth";

export default function SignInForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    try {
      const user = await login(email, password);
      const redirectTo = location.state?.from ?? (user.role === "admin" ? "/admin" : "/");
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setStatus("error");
      setError(err.message || "Invalid email or password.");
    }
  };

  return (
    <div className="flex items-center justify-center py-12 sm:py-16">
      <div className="relative overflow-hidden bg-black/40 rounded-3xl shadow-2xl max-w-md w-full px-6 sm:px-10 py-10 sm:py-12">
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-red-500 via-orange-500 to-blue-500 mx-auto mb-6">
          <LogIn className="w-7 h-7 text-white" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-white text-center mb-2">Sign In</h1>
        <p className="text-white/60 text-sm text-center mb-8">
          Staff and admin access to A Cheerful Cup
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="flex items-center gap-2 text-xs font-semibold text-white/70 mb-2">
              <Mail className="w-3.5 h-3.5" />
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 text-sm bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="flex items-center gap-2 text-xs font-semibold text-white/70 mb-2">
              <Lock className="w-3.5 h-3.5" />
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 text-sm bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p className="text-sm text-red-400 text-center">{error}</p>}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full mt-2 px-5 py-3 rounded-full bg-gradient-to-br from-red-500 via-orange-500 to-blue-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {status === "submitting" ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
