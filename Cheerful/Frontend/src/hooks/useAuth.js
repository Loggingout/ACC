// useAuth.js — access the signed-in user + auth actions
import { useContext } from "react";
import AuthContext from "../features/account/state/AuthContext";

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
