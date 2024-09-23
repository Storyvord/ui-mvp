import { USER_API } from "@/constant/constant";
import { customFetch } from "./api";

export const sentInvitationToCrew = async (formData: any) => {
  return customFetch(`${USER_API}/api/referral/projects/add-crew/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
};

export const getInvitedCrewList = async (projectId: string) => {
  return customFetch(`${USER_API}/api/referral/client/crew-invitations/${projectId}/`, {
    method: "GET",
  });
};

export const getCrewFullProfile = async (crewId: number) => {
  return customFetch(`${USER_API}/api/crew/crew-list/${crewId}/`, {
    method: "GET",
  });
};
