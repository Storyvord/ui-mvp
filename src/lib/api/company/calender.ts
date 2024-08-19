import { USER_API } from "@/constant/constant";
import { CalenderFormType } from "@/types";
import Cookies from "js-cookie";

/**
 * This TypeScript function fetches company calendar events using an access token retrieved from a
 * cookie.
 * @returns The function `getCompanyCalenderEvents` is returning a Promise that resolves to the JSON
 * data fetched from the specified endpoint `/api/client/company-calendar/events/`.
 */
export const getCompanyCalenderEvents = async () => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${USER_API}/api/client/company-calendar/events/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch company calender event");
  }
  return res.json();
};

/**
 * The function `createCompanyCalenderEvent` sends a POST request to a server endpoint to create a
 * company calendar event using the provided event data.
 * @param {CalenderFormType} eventData - The `eventData` parameter in the `createCompanyCalenderEvent`
 * function is of type `CalenderFormType`. It contains the information needed to create a company
 * calendar event, such as the event title, description, start and end dates, location, and any other
 * relevant details for the event
 * @returns The function `createCompanyCalenderEvent` is returning the result of the `fetch` call in
 * JSON format.
 */
export const createCompanyCalenderEvent = async (eventData: CalenderFormType) => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${USER_API}/api/client/company-calendar/events/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(eventData),
  });

  if (!res.ok) {
    throw new Error("Failed to create company calender event");
  }

  return res.json();
};


/**
 * The function `deleteCompanyCalenderEvent` deletes a company calendar event using a DELETE request
 * with authorization.
 * @param {number | null} eventId - The `eventId` parameter in the `deleteCompanyCalenderEvent`
 * function is the unique identifier of the calendar event that you want to delete. It is of type
 * `number | null`, which means it can either be a number representing the event ID or `null` if no
 * event ID is provided
 */
export const deleteCompanyCalenderEvent = async (eventId: number | null) => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${USER_API}/api/client/company-calendar/events/${eventId}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to delete company calender event");
  }
};
