import { ClientProfileUpdateFormType, projectFormInputType, taskFormType, taskType } from "@/types";
import { API_URL, USER_API } from "@/constant/constant";
import Cookies from "js-cookie";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { ProfileType } from "@/app/(user-dashboard)/dashboard/update-profile/page";

export const getClientProfile = async () => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${USER_API}/api/client/profile/detail/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch user details");
  }
  return res.json();
};

export const updateClientProfile = async (data: ProfileType) => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${USER_API}/api/client/profile/detail/`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Failed to fetch user details");
  }
  return res.json();
};

export const fetchLocation = async (params: { search: string; page: number }) => {
  const { search, page } = params;
  const apiKey = process.env.NEXT_PUBLIC_LOCATION_API_KEY;
  const res = await fetch(
    `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${search}&page=${page}&limit=10`, // Adjust pagination parameters as required
    {
      headers: {
        "x-rapidapi-key": `${apiKey}`, // Replace with your RapidAPI key
        "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch location");
  }

  return res.json();
};

export const fetchProjectLogistics = async ({ project_id }: { project_id: string }) => {
  try {
    const res = await fetch(`${API_URL}/api/logistics/list-project-logistics/${project_id}`);
    if (!res.ok) {
      throw new Error("Failed to fetch project logistics");
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const fetchProjectCulture = async ({ project_id }: { project_id: string }) => {
  try {
    const res = await fetch(`${API_URL}/api/culture/project-cultures/${project_id}`);
    if (!res.ok) {
      throw new Error("Failed to fetch project Cultures");
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const fetchProjectComplience = async ({ project_id }: { project_id: string }) => {
  try {
    const res = await fetch(
      `${API_URL}/api/compliance/project-compliance/?project_id=${project_id}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch project complience");
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
export const getSuggestedCrew = async (project_id: string) => {
  try {
    const res = await fetch(`${API_URL}/api/crew/view-suggested-crew/?project_id=${project_id}`);
    if (!res.ok) {
      throw new Error("Failed to fetch suggested crew");
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const customFetch = async (url: string, options: RequestInit = {}) => {
  const token = Cookies.get("accessToken");
  const res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });

  let response;
  if (!res.ok) {
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      response = await res.json();
      throw {
        ...response,
        status: res.status,
        statusText: res.statusText,
      };
    } else {
      throw {
        status: res.status,
        statusText: res.statusText,
      };
    }
  }
  return options?.method === "DELETE" ? res : res.json();
};
