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

export const requestApprovalForTask = async (taskId: number) => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${USER_API}/api/tasks/tasks/${taskId}/request-completion/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ completion_requested: true }),
  });

  if (!res.ok) {
    throw new Error("Failed to request approve task");
  }

  return res.json();
};
