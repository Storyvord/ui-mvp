import { USER_API } from "@/constant/constant";
import { customFetch } from "../api";
export const getAllCrewCalenderEvents = async () => {
  return customFetch(`${USER_API}/api/calendar/calendars/`, {
    method: "GET",
  });
};
