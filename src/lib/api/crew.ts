import { USER_API } from "@/constant/constant";
import Cookies from "js-cookie";

export const sentInvitationToCrew = async (formData: any) => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${USER_API}/api/referral/projects/add-crew/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    throw new Error("Failed to sent invitation");
  }

  return res.json();
};

export const getInvitedCrewList = async (projectId: string) => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${USER_API}/api/referral/client/crew-invitations/${projectId}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to get crew");
  }

  return res.json();
};

export const getCrewFullProfile = async (crewId: number) => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${USER_API}/api/crew/crew-list/${crewId}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to get crew profile");
  }

  return res.json();
};
