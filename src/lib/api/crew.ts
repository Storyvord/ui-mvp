import { NEW_API_URL_V2, USER_API } from "@/constant/constant";
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
  return customFetch(`${NEW_API_URL_V2}/project/v2/memberships/?project_id=${projectId}`, {
    method: "GET",
  });
};

export const getCrewFullProfile = async (crewId: string) => {
  return customFetch(`${USER_API}/api/crew/crew-list/${crewId}/`, {
    method: "GET",
  });
};

export const searchCrew = async ({ location, service }: { location: string; service: string }) => {
  return customFetch(
    `${USER_API}/api/crew/crew-profile/search/?location=${location}&skills=${service}`,
    {
      method: "GET",
    }
  );
};
