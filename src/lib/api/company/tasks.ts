import { API_URL, USER_API } from "@/constant/constant";
import { taskFormType, taskType } from "@/types";
import Cookies from "js-cookie";

export const getCompanyTasks = async () => {
  const token = Cookies.get("accessToken");
  try {
    const res = await fetch(`${USER_API}/api/company/tasks/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch tasks");
    }

    return res.json();
  } catch (err) {
    console.log("API error from :: getTasks ::", err);
  }
};

export const getCompanyEmployeeTasks = async () => {
  const token = Cookies.get("accessToken");
  try {
    const res = await fetch(`${USER_API}/api/company/employee/tasks/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch tasks");
    }

    return res.json();
  } catch (err) {
    console.log("API error from :: getTasks ::", err);
  }
};
export const createNewCompanyTask = async (taskData: taskFormType) => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${USER_API}/api/company/tasks/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(taskData),
  });

  if (!res.ok) {
    throw new Error("Failed to create project");
  }

  return res.json();
};

export const deleteCompanyTask = async (taskId: number) => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${USER_API}/api/company/tasks/${taskId}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to delete project");
  }
};

export const updateCompanyTask = async ({
  taskId,
  taskData,
}: {
  taskId: number;
  taskData: any;
}) => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${USER_API}/api/company/tasks/${taskId}/`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });
  if (!res.ok) {
    throw new Error("Failed to fetch user details");
  }
  return res.json();
};

export const companyTaskCompletionApproval = async (taskId: number) => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${USER_API}/api/company/tasks/${taskId}/approve-completion/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to approve task ");
  }
  return res.json();
};

export const companyTaskCompletionRequest = async (taskId: number) => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${USER_API}/api/company/tasks/${taskId}/request-completion/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to approve task ");
  }
  return res.json();
};
