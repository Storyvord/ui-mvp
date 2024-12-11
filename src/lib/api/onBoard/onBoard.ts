import { NEW_API_URL_V2 } from "@/constant/constant";
import { customFetch } from "../api";

export const postUserType = async (user_type: string) => {
  return customFetch(`${NEW_API_URL_V2}/accounts/v2/usertype/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_type }),
  });
};

export const postPersonalDetails = async (data: any) => {
  return customFetch(`${NEW_API_URL_V2}/accounts/v2/saveprofile/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
export const updatePersonalDetails = async (data: any) => {
  return customFetch(`${NEW_API_URL_V2}/accounts/v2/saveprofile/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const skipOnBoard = async () => {
  return customFetch(`${NEW_API_URL_V2}/project/v2/skiponboard/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
