// AuthContext.jsx — signed-in user + JWT, persisted to localStorage
import { createContext, useCallback, useEffect, useState } from "react";
import { login as loginRequest, fetchMe } from "../api/authApi";

const AuthContext = createContext(null);
const STORAGE_KEY = "acc-auth";

function loadInitialAuth() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { user: null, token: null };
  } catch {
    return { user: null, token: null };
  }
}

export function AuthProvider({ children }) {
  const [{ user, token }, setAuth] = useState(loadInitialAuth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ user, token }));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user, token]);

  // revalidate the stored token on load in case it expired since the last visit
  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    fetchMe(token)
      .then((data) => setAuth({ user: data.user, token }))
      .catch(() => setAuth({ user: null, token: null }))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = useCallback(async (email, password) => {
    const data = await loginRequest({ email, password });
    setAuth({ user: data.user, token: data.token });
    return data.user;
  }, []);

  const logout = useCallback(() => {
    setAuth({ user: null, token: null });
  }, []);

  const updateUser = useCallback((updatedUser) => {
    setAuth((prev) => ({ ...prev, user: updatedUser }));
  }, []);

  const value = {
    user,
    token,
    loading,
    login,
    logout,
    updateUser,
    isAuthenticated: Boolean(token),
    isAdmin: user?.role === "admin",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
