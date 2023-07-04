"use client";

import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

const AuthApp = () => {
  return <Auth supabaseClient={supabase} />;
};

export default AuthApp;
