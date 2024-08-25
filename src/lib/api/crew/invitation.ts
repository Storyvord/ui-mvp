import { USER_API } from "@/constant/constant";
import Cookies from "js-cookie";

export const getInvitations = async () => {
  const token = Cookies.get("accessToken");
  try {
    const res = await fetch(`${USER_API}/api/referral/invitations/`, {
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

export const acceptInvitation = async (referralCode: string) => {
  const token = Cookies.get("accessToken");
  const res = await fetch(
    `${USER_API}/api/referral/invitations/accept/?referral_code=${referralCode}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to accept invitation");
  }

  return res.json();
};

export const rejectInvitation = async (referralCode: string) => {
  const token = Cookies.get("accessToken");
  const res = await fetch(
    `${USER_API}/api/referral/invitations/reject/?referral_code=${referralCode}/`,
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
