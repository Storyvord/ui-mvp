import { API_URL, USER_API } from "@/constant/constant";
import { Project } from "@/types/project";
import Cookies from "js-cookie";
export const createProject = async (formData: any) => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${USER_API}/api/project/projects/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    throw new Error("Failed to create project");
  }

  return res.json();
};

export const getProjects = async () => {
  const token = Cookies.get("accessToken");
  try {
    const res = await fetch(`${USER_API}/api/project/projects/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch project details");
    }

    return res.json();
  } catch (err) {
    console.log(err);
  }
};

export const getProjectDetails = async ({ project_id }: { project_id: string }) => {
  try {
    const token = Cookies.get("accessToken");
    const res = await fetch(`${USER_API}/api/project/projects/${project_id}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch project details");
    }

    return res.json();
  } catch (err) {
    console.log(err);
  }
};

export const deleteProject = async ({ project_id }: { project_id: string }) => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${USER_API}/api/project/projects/${project_id}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to delete project");
  }
};

export const editProject = async (project: Project) => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${USER_API}/api/project/projects/${project.project_id}/`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ project }),
  });
  if (!res.ok) {
    throw new Error("Failed to mark project as completed");
  }
  return res.json();
};
