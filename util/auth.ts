"use client";

import axios from "axios";
import { deleteCookie, getCookie, setCookie } from "cookies-next";

export const checkAuth = async () => {
  const authToken = getAuthToken();

  if (!authToken) {
    return false;
  }

  try {
    setCurrentUser(
      (
        await axios.get("http://localhost:3000/auth/me", {
          headers: { Authorization: `Bearer ${authToken}` },
        })
      ).data,
    );
    return getCurrentUser();
  } catch (err) {
    return false;
  }
};

export const setAuthToken = (token: string) => {
  setCookie("access_token", token, { httpOnly: false });
};

export const getAuthToken = () => {
  return getCookie("access_token");
};

export const removeAuthToken = () => {
  deleteCookie("user");
  deleteCookie("access_token");
};

export const setCurrentUser = (user: any) => {
  setCookie("user", user);
};

export const getCurrentUser = () => {
  return JSON.parse(getCookie("user") || "{}");
};
