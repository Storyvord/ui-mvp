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

export const getOnBoardedCrewList = async (projectId: string) => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${USER_API}/api/referral/client/crew-invitations/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to get crew");
  }

  return res.json();
};
