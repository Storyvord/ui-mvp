import { USER_API } from "@/constant/constant";
import { CalenderFormType } from "@/types";
import Cookies from "js-cookie";

/**
 * This function retrieves all calendar events for a specific project using an access token for
 * authorization.
 * @param {string} projectId - The `projectId` parameter is a string that represents the unique
 * identifier of the project for which you want to retrieve calendar events.
 * @returns The function `getAllCalenderEvents` is returning a Promise that resolves to the JSON data
 * of calendar events fetched from the specified project ID using an API endpoint.
 */
export const getAllCalenderEvents = async (projectId: string) => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${USER_API}/api/calendar/calendars/${projectId}/events/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch calender event");
  }
  return res.json();
};

/**
 * The function `createCalenderEvent` sends a POST request to create a calendar event for a specific
 * project using the provided event data and project ID.
 * @param  - The `createCalenderEvent` function is an asynchronous function that takes an object as a
 * parameter with two properties:
 * @returns The `createCalenderEvent` function is returning the JSON response from the API after
 * creating a calendar event.
 */
export const createCalenderEvent = async ({
  eventData,
  projectId,
}: {
  eventData: CalenderFormType;
  projectId: string;
}) => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${USER_API}/api/calendar/calendars/${projectId}/events/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(eventData),
  });

  if (!res.ok) {
    throw new Error("Failed to create calender event");
  }

  return res.json();
};

/**
 * The function `deleteCalenderEvent` deletes a calendar event associated with a specific project and
 * event ID using an API call with authorization.
 * @param  - The `deleteCalenderEvent` function is an asynchronous function that sends a DELETE request
 * to a specific calendar event endpoint based on the provided `projectId` and `eventId`. It requires
 * an object as a parameter with the following properties:
 */

export const deleteCalenderEvent = async ({
  projectId,
  eventId,
}: {
  projectId: string;
  eventId: number | null;
}) => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${USER_API}/api/calendar/calendars/${projectId}/events/${eventId}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to delete calender event");
  }
};
