"use client";

import { createClient } from "@/utils/supabase/client";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext<any>(null); // null or session

export const AuthProvider = ({ children }: any) => {
  const [currentSession, setCurrentSession] = useState<any>(null); // TODO: 型定義
  const supabase = createClient();

  useEffect(() => {
    (async () => {
      const {
        data: { session: _session },
      } = await supabase.auth.getSession();
      setCurrentSession(_session);
    })();
  }, []);
  return (
    <AuthContext.Provider value={currentSession}>
      {children}
    </AuthContext.Provider>
  );
};
