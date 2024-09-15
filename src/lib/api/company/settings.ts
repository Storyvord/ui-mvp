import { USER_API } from "@/constant/constant";
import Cookies from "js-cookie";

export const getCompanySettings = async () => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${USER_API}/api/client/company-profile/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch company settings");
  }
  return res.json();
};

export const updateCompanySettings = async (formData: any) => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${USER_API}/api/client/company-profile/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });
  if (!res.ok) {
    throw new Error("Failed to update company settings");
  }

  return res.json();
};
