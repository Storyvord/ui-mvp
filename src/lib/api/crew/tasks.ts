import { USER_API } from "@/constant/constant";
import { customFetch } from "../api";

export const getCrewTasks = async () => {
  return customFetch(`${USER_API}/api/tasks/crew/tasks/`, {
    method: "GET",
  });
};

export const requestApprovalForTask = async (taskId: number) => {
  return customFetch(`${USER_API}/api/tasks/tasks/${taskId}/request-completion/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ completion_requested: true }),
  });
};
