import { USER_API } from "@/constant/constant";
import { customFetch } from "../api";

export const sentInvitationToEmployee = async (formData: any) => {
  return customFetch(`${USER_API}/api/referral/company/invite/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
};

export const getOnBoardedEmployeeList = async () => {
  return customFetch(`${USER_API}/api/company/employees/`, {
    method: "GET",
  });
};

export const getReceivedInvitationsList = async () => {
  return customFetch(`${USER_API}/api/referral/company/invitations/`, {
    method: "GET",
  });
};
export const getSendInvitationsList = async () => {
  return customFetch(`${USER_API}/api/referral/company/client/employee-invitations/`, {
    method: "GET",
  });
};


export const acceptCompanyInvitation = async (referralCode: string) => {
  return customFetch(`${USER_API}/api/referral/company/invitations/accept/?referral_code=${referralCode}`, {
    method: "GET",
  });
};

export const rejectCompanyInvitation = async (referralCode: string) => {
  return customFetch(`${USER_API}/api/referral/company/invitations/reject/?referral_code=${referralCode}`, {
    method: "GET",
  });
};
