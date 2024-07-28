import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  completeProject,
  createProject,
  deleteProject,
  fetchLocation,
  fetchProjectComplience,
  fetchProjectCulture,
  getProjectDetails,
  fetchProjectLogistics,
  getSuggestedCrew,
  getUserDetails,
  registerUser,
  userSignIn,
  getClientProfile,
  updateClientProfile,
} from "../api/api";
import Cookies from 'js-cookie';

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      console.log(data);
      return data;
    },
    onError: (error) => {
      console.error(error);
    }
  })
}

export const useUserSignIn = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userSignIn,
    onSuccess: (data) => {
      Cookies.set("accessToken", data.access);
      Cookies.set("refreshToken", data.refresh);
      queryClient.invalidateQueries('userDetails');
    },
    onError: (error) => {
      console.error(error);
    }
  })
}

export const useGetUserDetails = () => {
  return useQuery({
    queryKey: ["userDetails"],
    queryFn: async () => {
      const token = Cookies.get("accessToken");
      if (!token) {
        throw new Error('No auth token found');
      }
      return await getUserDetails(token);
    },
    enabled: !!Cookies.get('accessToken'), // Only fetch if token exists
  })
}

export const useGetClientProfile = () => {
  return useQuery({
    queryKey: ["getClientProfile"],
    queryFn: async () => {
      const token = Cookies.get("accessToken");
      if (!token) {
        throw new Error('No auth token found');
      }
      return await getClientProfile(token);
    },
    enabled: !!Cookies.get('accessToken'), // Only fetch if token exists
    refetchOnWindowFocus: true,
  })
}
export const useUpdateClientProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateClientProfile,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getClientProfile"],
      });
      return data;
    },
    onError: (error) => {
      console.error(error);
    }
  })
}



export const useCreateProject = () => {
  return useMutation({
    mutationFn: createProject,
    onSuccess: (data) => {
      console.log(data);
      return data;
    },
    onError: (error) => {
      console.error("Error submitting form:", error);
    },
  });
};

export const useDeleteProject = () => {
  return useMutation({
    mutationFn: deleteProject,
    onSuccess: (data) => {
      console.log("Deleted project:", data);
    },
    onError: (error) => {
      console.error("Error in deleting project:", error);
    },
  });
};

export const useCompleteProject = (projectId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: completeProject,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries(["projectDetails", projectId]);
    },
    onError: (error) => {
      console.error("Error in completing project:", error);
    },
  });
};

export const useGetProjectDetails = (project_id: string) => {
  return useQuery({
    queryKey: ["projectDetails", project_id],
    queryFn: ({ queryKey }) => {
      const [_key, project_id] = queryKey;
      return getProjectDetails({ project_id });
    },
    retry: false,
  });
};

export const useLocationList = () => {
  return useMutation(
    (params: { search: string; page: number }) => fetchLocation(params),
    {
      onError: (error) => {
        console.error("Error in fetching location:", error);
      },
    }
  );
};

export const useProjectLogistics = (project_id: string) => {
  return useQuery({
    queryKey: ["projectLogistics", project_id],
    queryFn: ({ queryKey }) => {
      const [_key, project_id] = queryKey;
      return fetchProjectLogistics({ project_id });
    },
  });
};

export const useProjectCulture = (project_id: string) => {
  return useQuery({
    queryKey: ["projectCulture", project_id],
    queryFn: ({ queryKey }) => {
      const [_key, project_id] = queryKey;
      return fetchProjectCulture({ project_id });
    },
  });
};

export const useProjectComplience = (project_id: string) => {
  return useQuery({
    queryKey: ["projectComplience", project_id],
    queryFn: ({ queryKey }) => {
      const [_key, project_id] = queryKey;
      return fetchProjectComplience({ project_id });
    },
  });
};

export const useGetSuggestedCrew = (project_id: string) => {
  return useQuery({
    queryKey: ["suggestedCrew"],
    queryFn: () => getSuggestedCrew(project_id),
  });
};
