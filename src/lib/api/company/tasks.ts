import { USER_API } from "@/constant/constant";
import { taskFormType } from "@/types";
import { customFetch } from "../api";

export const getCompanyTasks = async () => {
  return customFetch(`${USER_API}/api/company/tasks/`, {
    method: "GET",
  });
};

export const getCompanyEmployeeTasks = async () => {
  return customFetch(`${USER_API}/api/company/employee/tasks/`, {
    method: "GET",
  });
};
export const createNewCompanyTask = async (taskData: taskFormType) => {
  return customFetch(`${USER_API}/api/company/tasks/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });
};

export const deleteCompanyTask = async (taskId: number) => {
  return customFetch(`${USER_API}/api/company/tasks/${taskId}/`, {
    method: "DELETE",
  });
};

export const updateCompanyTask = async ({
  taskId,
  taskData,
}: {
  taskId: number;
  taskData: any;
}) => {
  return customFetch(`${USER_API}/api/company/tasks/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });
};

export const companyTaskCompletionApproval = async (taskId: number) => {
  return customFetch(`${USER_API}/api/company/tasks/${taskId}/approve-completion/`, {
    method: "POST",
  });
};

export const companyTaskCompletionRequest = async (taskId: number) => {
  return customFetch(`${USER_API}/api/company/tasks/${taskId}/request-completion/`, {
    method: "POST",
  });
};
