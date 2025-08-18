"use client";
import { createContext, useContext, useEffect, useState } from "react";
// 👇 1. REMOVE the old import
// import { supabase } from "@/app/lib/supabaseClient"; 
// 👇 2. ADD the correct import for client components
import { createClient } from "@/utils/supabase/client"; 

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // 👇 3. Create the client inside the component
  const supabase = createClient(); 
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]); // Add supabase as a dependency

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);