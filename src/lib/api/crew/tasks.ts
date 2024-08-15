import { USER_API } from "@/constant/constant";
import Cookies from "js-cookie";

export const getCrewTasks = async () => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${USER_API}/api/tasks/crew/tasks/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch crew tasks");
  }
  return res.json();
};
