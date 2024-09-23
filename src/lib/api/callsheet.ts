import { ShootFormType } from "@/components/user-dashboard/project-details/planning/call-sheet/CallSheetForm";
import { USER_API } from "@/constant/constant";
import { customFetch } from "./api";

// Create a call sheet
export const createCallSheet = async ({
  formData,
  projectId,
}: {
  formData: ShootFormType;
  projectId: string;
}) => {
  return customFetch(`${USER_API}/api/callsheets/${projectId}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
};

export const editCallSheet = async ({ id, formData }: { id: number; formData: ShootFormType }) => {
  return customFetch(`${USER_API}/api/callsheets/details/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
};

// get call sheet data
export const getCallSheets = async (projectId: string) => {
  return customFetch(`${USER_API}/api/callsheets/${projectId}/`, {
    method: "GET",
  });
};

export const getCallSheetDetails = async (id: number) => {
  return customFetch(`${USER_API}/api/callsheets/details/${id}/`, {
    method: "GET",
  });
};

// Delete a call sheet
export const deleteCallSheet = async (id: number) => {
  return customFetch(`${USER_API}/api/callsheets/details/${id}/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
