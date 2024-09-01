import { USER_API } from "@/constant/constant";
import Cookies from "js-cookie";
export const getAllCrewCalenderEvents = async () => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${USER_API}/api/calendar/calendars/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch calender event");
  }
  return res.json();
};
