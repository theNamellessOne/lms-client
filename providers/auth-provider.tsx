"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { AxiosResponse } from "axios";
import { checkAuth, removeAuthToken, setAuthToken } from "@/util/auth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type AuthContext = {
  isAuth: boolean;
  currentUser: any;
  login: (r: AxiosResponse) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContext>({
  isAuth: false,
  currentUser: {},
  login: () => {},
  logout: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState({});
  const [isAuth, setIsAuth] = useState(false);
  const router = useRouter();

  useEffect(() => {
    checkAuth().then((r) => {
      if (r === false) {
        setIsAuth(false);
        return;
      }
      setIsAuth(true);
      setCurrentUser(r);
    });
  }, []);

  const login = (r: AxiosResponse) => {
    setAuthToken(r.data);
    setIsAuth(true);

    toast.success("signed in successfully");
    router.push("/");
  };

  const logout = () => {
    removeAuthToken();
    setIsAuth(false);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ currentUser, isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
