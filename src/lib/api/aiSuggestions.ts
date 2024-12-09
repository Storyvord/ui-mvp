import { Announcements } from "@/types";
import { NEW_API_URL_V2, USER_API } from "@/constant/constant";
import { customFetch } from "./api";

export const getSuggestions = async (project_id: string) => {
  return customFetch(`${NEW_API_URL_V2}/project/v2/ai_suggestion/?project_id=${project_id}`, {
    method: "GET",
  });
};

export const getRequirements = async (req_id: string) => {
  return customFetch(`${NEW_API_URL_V2}/v2/requirement/?req_id=${req_id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
