import { USER_API } from "@/constant/constant";
import { PortfolioFormData, ProfileFormData } from "@/types/crew";
import Cookies from "js-cookie";

export const createProfile = async (profileData: ProfileFormData) => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${USER_API}/api/crew/crew-profile/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(profileData),
  });
  if (!res.ok) {
    throw new Error("Failed to create or update profile");
  }

  return res.json();
};

export const createPortfolio = async (portfolioData: PortfolioFormData) => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${USER_API}/api/crew/portfolios/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(portfolioData),
  });
  if (!res.ok) {
    throw new Error("Failed to create your portfolio");
  }

  return res.json();
};
