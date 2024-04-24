"use client";
import { createContext } from "react";
import { createClient } from "@supabase/supabase-js";

export const RealtimeContext = createContext<any>(null); // null or session

export const RealtimeProvider = ({ children }: any) => {
  // Initialize the JS client
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Create a function to handle inserts
  const handleInserts = (payload: any) => {
    console.log("Change received!", payload);
  };

  // Listen to inserts
  supabase
    .channel("ChatMessage")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "ChatMessage" },
      handleInserts
    )
    .subscribe();

  return (
    <RealtimeContext.Provider value={supabase}>
      {children}
    </RealtimeContext.Provider>
  );
};
