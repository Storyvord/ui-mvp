import { NEW_API_URL_V2, USER_API } from "@/constant/constant";
import { customFetch } from "../api";

export const getInvitations = async () => {
  return customFetch(`${NEW_API_URL_V2}/project/v2/get_invites/`, {
    method: "GET",
  });
};

export const acceptInvitation = async (inviteId: string) => {
  return customFetch(`${NEW_API_URL_V2}/project/v2/invites/${inviteId}/respond/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const rejectInvitation = async (referralCode: string) => {
  return customFetch(
    `${NEW_API_URL_V2}/api/referral/invitations/reject/?referral_code=${referralCode}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
