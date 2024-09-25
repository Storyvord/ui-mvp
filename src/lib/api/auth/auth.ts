import { USER_API } from "@/constant/constant";
import Cookies from "js-cookie";

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
  const res = await fetch(`${USER_API}/api/accounts/login/`, {
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

export const getUserDetails = async (token: string) => {
  const res = await fetch(`${USER_API}/api/accounts/api/user/me/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch user details");
  }
  return await res.json();
};
