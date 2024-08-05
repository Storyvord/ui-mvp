import { USER_API } from "@/constant/constant";
import { CalenderFormType } from "@/types";
import Cookies from "js-cookie";

export const getAllCalenderEvents = async () => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${USER_API}/api/...`, {
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

export const getCalenderEvent = async () => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${USER_API}/api/...`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch calender event");
  }
  return res.json();
};

export const deleteCalenderEvent = async () => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${USER_API}/api/...`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to delete calender event");
  }
};
