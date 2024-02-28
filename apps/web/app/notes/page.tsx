"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export default function Notes() {
  const supabase = createClient();

  // const { data: { user } } = await supabase.auth.getUser()
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      console.log(data, "data");
      setUser(data);
    })();
  }, []);

  const login = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },

        redirectTo: "http://localhost:3000/notes",
      },
    });
  };

  return (
    <div>
      {/* <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={["google"]}
        onlyThirdPartyProviders
        redirectTo="/notes"
      /> */}

      {/* <SignIn /> */}

      <button
        onClick={() => {
          fetch("http://localhost:3000/api", { credentials: "include" });
        }}
      >
        fetch
      </button>

      <pre style={{ fontSize: 10 }}>{JSON.stringify(user, null, 4)}</pre>

      <button onClick={() => login()}>ログイン</button>
    </div>
  );
}
