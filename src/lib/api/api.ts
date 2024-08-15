import { ClientProfileUpdateFormType, projectFormInputType, taskFormType, taskType } from "@/types";
import { API_URL, USER_API } from "@/constant/constant";
import Cookies from "js-cookie";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export const registerUser = async (data: {
  email: string;
  userType: string;
  password: string;
  confirmPassword: string;
}) => {
  const signUpUserData = {
    user_type: data.userType,
    email: data.email,
    password: data.password,
    re_password: data.password,
  };
  const res = await fetch(`${USER_API}/auth/users/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signUpUserData),
  });
  if (!res.ok) {
    throw new Error("Failed to register user");
  }
  return res.json();
};

export const userSignIn = async ({ email, password }: { email: string; password: string }) => {
  const res = await fetch(`${USER_API}/auth/jwt/create/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    throw new Error("Failed to login user");
  }
  return res.json();
};

export const userLogout = () => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
  localStorage.clear();
  Cookies.remove("isClient");
  location.reload();

  return null;
};

/**
 * The function `verifyToken` sends a POST request to verify a JWT token with a user API endpoint and
 * returns the response as JSON or false if there is an error.
 * @param {string} token - The `token` parameter in the `verifyToken` function is a string that
 * represents the JWT (JSON Web Token) that needs to be verified by sending a POST request to the
 * `/auth/jwt/verify/` endpoint.
 * @returns The `verifyToken` function is returning the result of calling `res.json()` if the fetch
 * request is successful. If there is an error during the fetch request, it will return `false`.
 */
export const verifyToken = async (token: RequestCookie | undefined) => {
  try {
    const res = await fetch(`${USER_API}/auth/jwt/verify/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: token?.value }),
    });
    if (res.ok) {
      return res.json;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

export const getUserDetails = async (token: string) => {
  const res = await fetch(`${USER_API}/auth/users/me/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch user details");
  }
  return await res.json();
};

export const getClientProfile = async (token: string) => {
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

export const updateClientProfile = async (data: ClientProfileUpdateFormType) => {
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

//-----------------------------projects-----------------------------------------------//

export const createProject = async (formData: any) => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${USER_API}/api/project/projects/`, {
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

export const getOngoingProjects = async () => {
  const token = Cookies.get("accessToken");
  try {
    const res = await fetch(`${USER_API}/api/project/projects/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch project details");
    }

    return res.json();
  } catch (err) {
    console.log(err);
  }
};

export const getProjectDetails = async ({ project_id }: { project_id: string }) => {
  try {
    const token = Cookies.get("accessToken");
    const res = await fetch(`${USER_API}/api/project/projects/${project_id}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch project details");
    }

    return res.json();
  } catch (err) {
    console.log(err);
  }
};

export const deleteProject = async ({ project_id }: { project_id: string }) => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${USER_API}/api/project/projects/${project_id}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to delete project");
  }
};

export const completeProject = async ({ project_id }: { project_id: string }) => {
  const res = await fetch(
    `${API_URL}/api/project/mark-project-as-completed/?project_id=${project_id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ project_id }),
    }
  );
  if (!res.ok) {
    throw new Error("Failed to mark project as completed");
  }
  return res.json();
};

//------------------------------tasks------------------------//

export const getTasks = async (project_id: string) => {
  const token = Cookies.get("accessToken");
  try {
    const res = await fetch(`${USER_API}/api/tasks/projects/${project_id}/tasks/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch tasks");
    }

    return res.json();
  } catch (err) {
    console.log("API error from :: getTasks ::", err);
  }
};

export const createNewTask = async ({
  taskData,
  projectId,
}: {
  taskData: taskFormType;
  projectId: string;
}) => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${USER_API}/api/tasks/projects/${projectId}/tasks/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(taskData),
  });

  if (!res.ok) {
    throw new Error("Failed to create project");
  }

  return res.json();
};

export const deleteTask = async (taskId: number) => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${USER_API}/api/tasks/tasks/${taskId}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to delete project");
  }
};

export const completeTask = async ({
  taskId,
  taskData,
}: {
  taskId: number;
  taskData: taskType;
}) => {
  const token = Cookies.get("accessToken");
  const res = await fetch(`${USER_API}/api/tasks/tasks/${taskId}/`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
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
