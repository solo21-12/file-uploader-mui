"use client";

import supabase from "@/config/supabse";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

interface Props {
  setUser: (user: any) => void;
  currentUser: any;
  signOut: () => void;
}
const AuthContext = createContext<Props>({
  setUser: () => {},
  currentUser: "",
  signOut: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setUser] = useState<any>("");

  const authChange = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    authChange();
  }, []);

  const value = useMemo(() => {
    return { currentUser, signOut: () => supabase.auth.signOut(), setUser };
  }, [currentUser]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
