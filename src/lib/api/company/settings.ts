import { NEW_API_URL_V2 } from "@/constant/constant";
import { customFetch } from "../api";

export const getCompanySettings = async () => {
  return customFetch(`${NEW_API_URL_V2}/client/company-profile/`, {
    method: "GET",
  });
};

export const updateCompanySettings = async (formData: any) => {
  return customFetch(`${NEW_API_URL_V2}/client/company-profile/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
};
