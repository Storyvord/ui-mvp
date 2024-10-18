import { API_URL, USER_API } from "@/constant/constant";
import Cookies from "js-cookie";
import { ProfileType } from "@/app/(user-dashboard)/dashboard/update-profile/page";

/**
 * The `customFetch` function is a TypeScript function that performs a fetch request with added
 * authorization using a bearer token retrieved from a cookie, and handles error responses by throwing
 * detailed error objects.
 * @param {string} url - The `url` parameter in the `customFetch` function is a string representing the
 * URL to which the request will be made.
 * @param {RequestInit} options - The `options` parameter in the `customFetch` function is of type
 * `RequestInit`, which is an interface representing the options that can be passed to the `fetch`
 * function. It includes properties like `method`, `headers`, `body`, `credentials`, `mode`, `cache`, `
 * @returns If the `options` method is "DELETE", the `res` object is being returned. Otherwise, the
 * JSON response from the `res` object is being returned using `res.json()`.
 */
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

export const getClientProfile = async () => {
  return customFetch(`${USER_API}/api/client/profile/detail/`, {
    method: "GET",
  });
};

export const updateClientProfile = async (data: ProfileType) => {
  return customFetch(`${USER_API}/api/client/profile/detail/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

//---------------------------------
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
