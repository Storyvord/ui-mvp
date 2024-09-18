import { CallSheet } from "@/app/(user-dashboard)/project-details/[id]/(planning)/call-sheets/types";
import { ShootFormType } from "@/components/user-dashboard/project-details/planning/call-sheet/CallSheetForm";
import { NEW_API_URL, USER_API } from "@/constant/constant";
import Cookies from "js-cookie";

// Create a call sheet
export const createCallSheet = async ({
  formData,
  projectId,
}: {
  formData: ShootFormType;
  projectId: string;
}) => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${USER_API}/api/callsheets/${projectId}/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    return res;
  }

  return res.json();
};

export const editCallSheet = async ({ id, formData }: { id: number; formData: ShootFormType }) => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${USER_API}}/api/callsheets/details/${id}/`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    return res;
  }

  return res.json();
};

// get call sheet data
export const getCallSheets = async (projectId: string) => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${NEW_API_URL}/api/callsheets/${projectId}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw res;
  }

  return res.json();
};

export const getCallSheetDetails = async (id: number) => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${NEW_API_URL}/api/callsheets/details/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw res;
  }

  return res.json();
};

// Delete a call sheet
export const deleteCallSheet = async (id: number) => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${NEW_API_URL}/api/callsheets/details/${id}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw res;
  }
};

// Edit a call sheet
