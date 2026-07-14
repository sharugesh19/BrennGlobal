import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { supabase } from "../lib/supabaseClient.js";

const AuthContext = createContext(null);

// Supabase session -> the small "user" shape the admin UI reads
// (DashboardLayout shows user.email, etc).
const mapSessionUser = (session) => {
  if (!session?.user) return null;
  return {
    id: session.user.id,
    email: session.user.email,
  };
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const bootstrap = useCallback(async () => {
    const { data } = await supabase.auth.getSession();
    setUser(mapSessionUser(data.session));
    setLoading(false);
  }, []);

  useEffect(() => {
    bootstrap();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(mapSessionUser(session));
    });

    return () => {
      listener?.subscription?.unsubscribe();
    };
  }, [bootstrap]);

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    setUser(mapSessionUser(data.session));
    return mapSessionUser(data.session);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
