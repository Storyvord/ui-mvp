import { NEW_API_URL_V2, USER_API } from "@/constant/constant";
import { taskFormType } from "@/types";
import { customFetch } from "../api";

export const getCompanyTasks = async () => {
  return customFetch(`${NEW_API_URL_V2}/company/tasks/`, {
    method: "GET",
  });
};

export const createCompanyTask = async (taskData: taskFormType) => {
  return customFetch(`${NEW_API_URL_V2}/company/tasks/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });
};

export const deleteCompanyTask = async (taskId: number) => {
  return customFetch(`${NEW_API_URL_V2}/company/tasks/${taskId}/`, {
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
  return customFetch(`${NEW_API_URL_V2}/company/tasks/${taskId}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });
};

export const getCompanyEmployeeTasks = async () => {
  return customFetch(`${NEW_API_URL_V2}/company/employee/tasks/`, {
    method: "GET",
  });
};

export const companyTaskCompletionApproval = async (taskId: number) => {
  return customFetch(`${NEW_API_URL_V2}/company/tasks/${taskId}/approve-completion/`, {
    method: "POST",
  });
};

export const companyTaskCompletionRequest = async (taskId: number) => {
  return customFetch(`${NEW_API_URL_V2}/company/tasks/${taskId}/request-completion/`, {
    method: "POST",
  });
};
