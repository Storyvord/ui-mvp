import { USER_API } from "@/constant/constant";
import { customFetch } from "../api";

export const getCompanySettings = async () => {
  return customFetch(`${USER_API}/api/client/company-profile/`, {
    method: "GET",
  });
};

export const updateCompanySettings = async (formData: any) => {
  return customFetch(`${USER_API}/api/client/company-profile/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
};
