import { NEW_API_URL_V2, USER_API } from "@/constant/constant";
import Cookies from "js-cookie";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export const registerUser = async (data: {
  email: string;
  // userType: string;
  password: string;
  confirmPassword: string;
  agreePolicy: boolean;
}) => {
  const signUpUserData = {
    // user_type: data.userType,
    email: data.email,
    password: data.password,
    confirm_password: data.confirmPassword,
    terms_accepted: data.agreePolicy
  };
  const res = await fetch(`${NEW_API_URL_V2}/accounts/v2/register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signUpUserData),
  });
  if (!res.ok) {
    const errorData = await res.json(); // Extract error message from response
    throw new Error(errorData?.message?.email[0] || "An unknown error occurred");
  }
  return res.json();
};

export const userSignIn = async ({ email, password }: { email: string; password: string }) => {
  // const res = await fetch(`${USER_API}/auth/jwt/create/`, {
  const res = await fetch(`${NEW_API_URL_V2}/accounts/v2/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const errorData = await res.json(); // Extract error message from response
    throw new Error(errorData.message || "An unknown error occurred");
  }
  return res.json();
};

export const userLogout = () => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
  localStorage.clear();
  Cookies.remove("isClient");
  location.reload();

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
