import { USER_API } from "@/constant/constant";
import Cookies from "js-cookie";

export const sentInvitationToEmployee = async (formData: any) => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${USER_API}/api/referral/company/invite/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    throw new Error("Failed to create project");
  }

  return res.json();
};

export const getOnBoardedEmployeeList = async () => {
  const token = Cookies.get("accessToken");
  const res = await fetch(
    `${USER_API}/api/company/employees/
`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to get crew");
  }

  return res.json();
};

export const getReceivedInvitationsList = async () => {
  const token = Cookies.get("accessToken");
  try {
    const res = await fetch(`${USER_API}/api/referral/company/invitations/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch invitations details");
    }

    return res.json();
  } catch (err) {
    console.log(err);
  }
};
export const getSendInvitationsList = async () => {
  const token = Cookies.get("accessToken");
  try {
    const res = await fetch(`${USER_API}/api/referral/company/client/employee-invitations/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch invitations details");
    }

    return res.json();
  } catch (err) {
    console.log(err);
  }
};


export const acceptCompanyInvitation = async (referralCode: string) => {
  const token = Cookies.get("accessToken");
  const res = await fetch(
    `${USER_API}/api/referral/company/invitations/accept/?referral_code=${referralCode}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to accept invitation");
  }

  return res.json();
};

export const rejectCompanyInvitation = async (referralCode: string) => {
  const token = Cookies.get("accessToken");
  const res = await fetch(
    `${USER_API}/api/referral/company/invitations/reject/?referral_code=${referralCode}/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to reject invitation");
  }

  return res.json();
};
