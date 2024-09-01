import { USER_API } from "@/constant/constant";

export const getReferralCrewData = async (referralCode: string) => {
  const res = await fetch(
    `${USER_API}/api/referral/crew/invitation-details/?referral_code=${referralCode}`
  );
  if (!res.ok) {
    throw new Error("Failed to get referral data");
  }

  return res.json();
};

export const registerCrewWithReferral = async (formData: any) => {
  const res = await fetch(`${USER_API}/api/referral/register-with-referral/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    throw new Error("Failed to create project");
  }

  return res.json();
};
