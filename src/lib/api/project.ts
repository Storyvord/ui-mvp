import { ProjectFormFieldType } from "@/components/user-dashboard/dashboard/CreateProjectForm";
import { NEW_API_URL_V2, USER_API } from "@/constant/constant";
import { customFetch } from "./api";

export const createProject = async (formData: any) => {
  return customFetch(`${NEW_API_URL_V2}/project/v2/firstproject/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
};

export const getProjects = async () => {
  return customFetch(`${NEW_API_URL_V2}/project/v2/projects/`, {
    method: "GET",
  });
};

export const getProjectDetails = async ({ project_id }: { project_id: string }) => {
  return customFetch(`${NEW_API_URL_V2}/project/v2/projects/${project_id}/`, {
    method: "GET",
  });
};

export const getShootDetails = async (project_id: string) => {
  return customFetch(`${NEW_API_URL_V2}/project/v2/shooting-details/?project_id=${project_id}`, {
    method: "GET",
  });
};

export const getProjectRequirements = async (project_id: string) => {
  return customFetch(
    `${NEW_API_URL_V2}/project/v2/project-requirements/?project_id=${project_id}`,
    {
      method: "GET",
    }
  );
};

export const deleteProject = async ({ project_id }: { project_id: string }) => {
  return customFetch(`${NEW_API_URL_V2}/api/project/projects/${project_id}/`, {
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
  return customFetch(`${NEW_API_URL_V2}/api/project/projects/${projectId}/`, {
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
  return customFetch(`${NEW_API_URL_V2}/api/project/projects/${projectId}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });
};
