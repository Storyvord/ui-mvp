import { NEW_API_URL_V2 } from "@/constant/constant";
import { CalenderFormType } from "@/types";
import { customFetch } from "../api";

export const getCompanyCalenderEvents = async () => {
  return customFetch(`${NEW_API_URL_V2}/calendar/user/calendar/`, {
    method: "GET",
  });
};

export const createCompanyCalenderEvent = async (eventData: CalenderFormType) => {
  return customFetch(`${NEW_API_URL_V2}/calendar/user/calendar/events/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });
};

export const deleteCompanyCalenderEvent = async (eventId: number | null) => {
  return customFetch(`${NEW_API_URL_V2}/calendar/user/calendar/events/${eventId}/`, {
    method: "DELETE",
  });
};
