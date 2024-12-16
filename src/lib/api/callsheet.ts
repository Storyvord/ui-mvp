import { ShootFormType } from "@/components/user-dashboard/project-details/planning/call-sheet/CallSheetForm";
import { NEW_API_URL_V2, USER_API } from "@/constant/constant";
import { customFetch } from "./api";

// Create a call sheet
export const createCallSheet = async ({
  formData,
  projectId,
}: {
  formData: ShootFormType;
  projectId: string;
}) => {
  return customFetch(`${NEW_API_URL_V2}/callsheets/${projectId}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
};

export const editCallSheet = async ({ id, formData }: { id: number; formData: ShootFormType }) => {
  return customFetch(`${NEW_API_URL_V2}/callsheets/details/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
};

// get call sheet data
export const getCallSheets = async (projectId: string) => {
  return customFetch(`${NEW_API_URL_V2}/callsheets/${projectId}/`, {
    method: "GET",
  });
};

export const getCallSheetDetails = async (id: number) => {
  return customFetch(`${NEW_API_URL_V2}/callsheets/details/${id}/`, {
    method: "GET",
  });
};

// Delete a call sheet
export const deleteCallSheet = async (id: number) => {
  return customFetch(`${NEW_API_URL_V2}/callsheets/details/${id}/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
