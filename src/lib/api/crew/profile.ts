import { USER_API } from "@/constant/constant";
import {
  CreditsFormFields,
  EducationFormType,
  EndorsementFormType,
  PortfolioFormData,
  ProfileFormData,
  SocialLinkFormType,
} from "@/types/crew";
import Cookies from "js-cookie";

/**
 * The function `createProfile` sends a PUT request to update a user profile using profile data and an
 * access token.
 * @param {ProfileFormData} profileData - ProfileFormData is a type representing the data needed to
 * create or update a user profile. It likely includes fields such as name, email, bio, profile
 * picture, and any other relevant information for a user profile.
 * @returns The `createProfile` function is returning the JSON response from the API after creating or
 * updating a profile.
 */
export const createProfile = async (profileData: ProfileFormData) => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${USER_API}/api/crew/crew-profile/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(profileData),
  });
  if (!res.ok) {
    throw new Error("Failed to create or update profile");
  }

  return res.json();
};

/**
 * The function `createPortfolio` sends a POST request to a specified API endpoint with portfolio data
 * and returns the response as JSON.
 * @param {PortfolioFormData} portfolioData - PortfolioFormData is an object containing the data needed
 * to create a portfolio. It likely includes information such as the title, description, images, and
 * other details of the portfolio that the user wants to create.
 * @returns The `createPortfolio` function is returning the JSON response from the API after
 * successfully creating a portfolio.
 */
export const createPortfolio = async (portfolioData: PortfolioFormData) => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${USER_API}/api/crew/portfolios/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(portfolioData),
  });
  if (!res.ok) {
    throw new Error("Failed to create your portfolio");
  }

  return res.json();
};

/**
 * The function `createEducation` sends a POST request to a specified API endpoint to create
 * educational details for a crew member.
 * @param educationData - The `educationData` parameter is an object that contains information about
 * the education details of a user. It likely includes fields such as `degree`, `major`, `institution`,
 * `startYear`, `endYear`, etc. Additionally, the `crew` property is a number that is required to
 * create
 * @returns The `createEducation` function is returning the JSON response from the API after
 * successfully creating educational details for a crew member.
 */
export const createEducation = async (educationData: EducationFormType & { crew: number }) => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${USER_API}/api/crew/crew-education/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(educationData),
  });
  if (!res.ok) {
    throw new Error("Failed to create your educational details");
  }

  return res.json();
};

/**
 * The function `createSocialLink` sends a POST request to a specified API endpoint to create social
 * links for a crew member with the provided data.
 * @param socialLinkData - The `socialLinkData` parameter is an object that contains information about
 * a social link. It should have the following properties based on the `SocialLinkFormType` interface:
 * @returns The `createSocialLink` function is returning the JSON response from the API after creating
 * the social link data.
 */
export const createSocialLink = async (socialLinkData: SocialLinkFormType & { crew: number }) => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${USER_API}/api/crew/social-links/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(socialLinkData),
  });
  if (!res.ok) {
    throw new Error("Failed to create your social links");
  }

  return res.json();
};

/**
 * The function `createEndorsement` sends a POST request to a specific API endpoint with endorsement
 * data and a token for authorization.
 * @param endorsementData - EndorsementFormType & { crew: number }
 * @returns The `createEndorsement` function is returning the JSON response from the API call after
 * creating an endorsement.
 */
export const createEndorsement = async (
  endorsementData: EndorsementFormType & { crew: number }
) => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${USER_API}/api/crew/endorsement-from-peers/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(endorsementData),
  });
  if (!res.ok) {
    throw new Error("Failed to create your endorsement");
  }

  return res.json();
};

/**
 * The function `createCredit` sends a POST request to a specified API endpoint with credit data and a
 * crew ID, handling authorization and error checking.
 * @param creditData - The `creditData` parameter is an object that contains the data needed to create
 * a credit. It includes fields from the `CreditsFormFields` type as well as an additional field `crew`
 * of type number. The `crew` field likely represents the crew member associated with the credit being
 * created.
 * @returns The `createCredit` function is returning the JSON response from the API call after creating
 * the credits.
 */
export const createCredit = async (creditData: CreditsFormFields & { crew: number }) => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${USER_API}/api/crew/crew-credits/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(creditData),
  });
  if (!res.ok) {
    throw new Error("Failed to create your credits");
  }

  return res.json();
};

/////////////////////////////get details////////////////

export const getProfile = async () => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${USER_API}/api/crew/crew-profile/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch profile");
  }
  return res.json();
};

export const getPortfolio = async () => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${USER_API}/api/crew/portfolios/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch Portfolio ");
  }
  return res.json();
};

export const getEducation = async () => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${USER_API}/api/crew/crew-education/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch Education");
  }
  return res.json();
};

export const getSocialLink = async () => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${USER_API}/api/crew/social-links/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch SocialLink ");
  }
  return res.json();
};

export const getEndorsement = async () => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${USER_API}/api/crew/endorsement-from-peers/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch Endorsement ");
  }
  return res.json();
};

export const getCredit = async () => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${USER_API}/api/crew/crew-credits/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch Credit ");
  }
  return res.json();
};

//////////////////////////////////////////////////////////////////////
export const updatePortfolio = async ({
  portfolioData,
  id,
}: {
  portfolioData: PortfolioFormData;
  id: number;
}) => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${USER_API}/api/crew/portfolios/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(portfolioData),
  });
  if (!res.ok) {
    throw new Error("Failed to create your portfolio");
  }

  return res.json();
};

export const updateEducation = async ({
  educationData,
  id,
}: {
  educationData: EducationFormType;
  id: number;
}) => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${USER_API}/api/crew/crew-education/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(educationData),
  });
  if (!res.ok) {
    throw new Error("Failed to create your educational details");
  }

  return res.json();
};

export const updateSocialLink = async ({
  socialLinkData,
  id,
}: {
  socialLinkData: SocialLinkFormType;
  id: number;
}) => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${USER_API}/api/crew/social-links/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(socialLinkData),
  });
  if (!res.ok) {
    throw new Error("Failed to create your social links");
  }

  return res.json();
};

export const updateEndorsement = async ({
  endorsementData,
  id,
}: {
  endorsementData: EndorsementFormType;
  id: number;
}) => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${USER_API}/api/crew/endorsement-from-peers/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(endorsementData),
  });
  if (!res.ok) {
    throw new Error("Failed to create your endorsement");
  }

  return res.json();
};

export const updateCredit = async ({
  creditData,
  id,
}: {
  creditData: CreditsFormFields;
  id: number;
}) => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${USER_API}/api/crew/crew-credits/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(creditData),
  });
  if (!res.ok) {
    throw new Error("Failed to create your credits");
  }

  return res.json();
};

// Helper function to send DELETE requests.
const deleteResource = async (endpoint: string) => {
  const token = Cookies.get("accessToken");
  const res = await fetch(endpoint, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to delete the resource");
  }
};

// Delete functions for each resource
export const deletePortfolio = async (id: number) => {
  return deleteResource(`${USER_API}/api/crew/portfolios/${id}/`);
};

export const deleteEducation = async (id: number) => {
  return deleteResource(`${USER_API}/api/crew/crew-education/${id}/`);
};

export const deleteSocialLink = async (id: number) => {
  return deleteResource(`${USER_API}/api/crew/social-links/${id}/`);
};

export const deleteEndorsement = async (id: number) => {
  return deleteResource(`${USER_API}/api/crew/endorsement-from-peers/${id}/`);
};

export const deleteCredit = async (id: number) => {
  return deleteResource(`${USER_API}/api/crew/crew-credits/${id}/`);
};
