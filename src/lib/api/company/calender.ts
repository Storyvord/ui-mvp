import { USER_API } from "@/constant/constant";
import { CalenderFormType } from "@/types";
import { customFetch } from "../api";

export const getCompanyCalenderEvents = async () => {
  return customFetch(`${USER_API}/api/client/company-calendar/events/`, {
    method: "GET",
  });
};

export const createCompanyCalenderEvent = async (eventData: CalenderFormType) => {
  return customFetch(`${USER_API}/api/client/company-calendar/events/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });
};

export const deleteCompanyCalenderEvent = async (eventId: number | null) => {
  return customFetch(`${USER_API}/api/client/company-calendar/events/${eventId}/`, {
    method: "DELETE",
  });
};
