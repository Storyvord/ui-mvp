import { ProjectFormFieldType } from "@/components/user-dashboard/dashboard/CreateProjectForm";
import { USER_API } from "@/constant/constant";
import { customFetch } from "./api";
export const createProject = async (formData: any) => {
  return customFetch(`${USER_API}/api/project/projects/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
};

export const getProjects = async () => {
  return customFetch(`${USER_API}/api/project/projects/`, {
    method: "GET",
  });
};

export const getProjectDetails = async ({ project_id }: { project_id: string }) => {
  return customFetch(`${USER_API}/api/project/projects/${project_id}/`, {
    method: "GET",
  });
};

export const deleteProject = async ({ project_id }: { project_id: string }) => {
  return customFetch(`${USER_API}/api/project/projects/${project_id}/`, {
    method: "DELETE",
  });
};

export const editProject = async ({
  projectData,
  projectId,
}: {
  projectData: ProjectFormFieldType;
  projectId: string;
}) => {
  return customFetch(`${USER_API}/api/project/projects/${projectId}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(projectData),
  });
};

export const editProjectStatus = async ({
  status,
  projectId,
}: {
  status: ProjectFormFieldType;
  projectId: string;
}) => {
  return customFetch(`${USER_API}/api/project/projects/${projectId}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });
};
