import { NEW_API_URL_V2 } from "@/constant/constant";
import { customFetch } from "./api";

export const getSuggestions = async (projectId: string) => {
  return customFetch(`${NEW_API_URL_V2}/project/v2/ai_suggestion/?project_id=${projectId}`, {
    method: "GET",
  });
};

export const getRequirements = async (reqId: string) => {
  return customFetch(`${NEW_API_URL_V2}/v2/requirement/?req_id=${reqId}`, {
    method: "GET",
  });
};
