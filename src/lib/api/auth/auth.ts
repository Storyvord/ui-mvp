import { USER_API } from "@/constant/constant";
import Cookies from "js-cookie";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export const registerUser = async (data: {
  email: string;
  userType: string;
  password: string;
  confirmPassword: string;
}) => {
  const signUpUserData = {
    user_type: data.userType,
    email: data.email,
    password: data.password,
    re_password: data.password,
  };
  const res = await fetch(`${USER_API}/api/accounts/old-register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signUpUserData),
  });
  if (!res.ok) {
    const errorData = await res.json(); // Extract error message from response
    throw new Error(errorData.email[0] || "An unknown error occurred");
  }
  return res.json();
};

export const userSignIn = async ({ email, password }: { email: string; password: string }) => {
  const res = await fetch(`${USER_API}/auth/jwt/create/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const errorData = await res.json(); // Extract error message from response
    throw new Error(errorData.detail || "An unknown error occurred");
  }
  return res.json();
};

export const userLogout = () => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
  Cookies.remove("isClient");
  localStorage.clear();
  location.replace("/auth/sign-in");

  return null;
};

export const verifyToken = async (token: RequestCookie | undefined) => {
  try {
    const res = await fetch(`${USER_API}/auth/jwt/verify/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: token?.value }),
    });
    if (res.ok) {
      return res.json;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

export const getUserDetails = async (token: string) => {
  const res = await fetch(`${USER_API}/auth/users/me/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch user details");
  }
  return await res.json();
};
