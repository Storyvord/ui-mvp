import { USER_API } from "@/constant/constant";
import { customFetch } from "../api";

export const getInvitations = async () => {
  return customFetch(`${USER_API}/api/referral/invitations/`, {
    method: "GET",
  });
};

export const acceptInvitation = async (referralCode: string) => {
  return customFetch(`${USER_API}/api/referral/invitations/accept/?referral_code=${referralCode}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const rejectInvitation = async (referralCode: string) => {
  return customFetch(`${USER_API}/api/referral/invitations/reject/?referral_code=${referralCode}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
