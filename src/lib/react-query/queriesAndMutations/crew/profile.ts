import {
  createCredit,
  createEducation,
  createEndorsement,
  createPortfolio,
  createProfile,
  createSocialLink,
  deleteCredit,
  deleteEducation,
  deleteEndorsement,
  deletePortfolio,
  deleteSocialLink,
  getCredit,
  getEducation,
  getEndorsement,
  getPortfolio,
  getProfile,
  getSocialLink,
  updateCredit,
  updateEducation,
  updateEndorsement,
  updatePortfolio,
  updateSocialLink,
} from "@/lib/api/crew/profile";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProfile,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getProfile"],
      });
      return data;
    },
    onError: (error) => {
      return;
    },
  });
};

export const useCreatePortfolio = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPortfolio,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getPortfolio"],
      });
      return data;
    },
    onError: (error) => {
      return;
    },
  });
};

export const useCreateEducation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createEducation,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getEducation"],
      });
      return data;
    },
    onError: (error) => {
      return;
    },
  });
};

export const useCreateSocialLink = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSocialLink,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getSocialLink"],
      });
      return data;
    },
    onError: (error) => {
      return;
    },
  });
};

export const useCreateEndorsement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createEndorsement,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getEndorsement"],
      });
      return data;
    },
    onError: (error) => {
      return;
    },
  });
};

export const useCreateCredit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCredit,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getCredit"],
      });
      return data;
    },
    onError: (error) => {
      return;
    },
  });
};

// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

export const useGetProfile = () => {
  return useQuery({
    queryKey: ["getProfile"],
    queryFn: getProfile,
  });
};
export const useGetPortfolio = () => {
  return useQuery({
    queryKey: ["getPortfolio"],
    queryFn: getPortfolio,
  });
};
export const useGetEducation = () => {
  return useQuery({
    queryKey: ["getEducation"],
    queryFn: getEducation,
  });
};
export const useGetSocialLink = () => {
  return useQuery({
    queryKey: ["getSocialLink"],
    queryFn: getSocialLink,
  });
};
export const useGetEndorsement = () => {
  return useQuery({
    queryKey: ["getEndorsement"],
    queryFn: getEndorsement,
  });
};
export const useGetCredit = () => {
  return useQuery({
    queryKey: ["getCredit"],
    queryFn: getCredit,
  });
};

//////////////////////////////////////////////////////////

export const useUpdatePortfolio = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePortfolio,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getPortfolio"],
      });
      return data;
    },
    onError: (error) => {
      return;
    },
  });
};

export const useUpdateEducation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateEducation,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getEducation"],
      });
      return data;
    },
    onError: (error) => {
      return;
    },
  });
};

export const useUpdateSocialLink = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateSocialLink,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getSocialLink"],
      });
      return data;
    },
    onError: (error) => {
      return;
    },
  });
};

export const useUpdateEndorsement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateEndorsement,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getEndorsement"],
      });
      return data;
    },
    onError: (error) => {
      return;
    },
  });
};

export const useUpdateCredit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCredit,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getCredit"],
      });
      return data;
    },
    onError: (error) => {
      return;
    },
  });
};

// DELETE helper function
const useDeleteResource = (deleteFn: (id: number) => Promise<any>, queryKey: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteFn,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [queryKey],
      });
      return data;
    },
    onError: (error) => {
      return;
    },
  });
};

// DELETE OPERATIONS

export const useDeletePortfolio = () => {
  return useDeleteResource(deletePortfolio, "getPortfolio");
};

export const useDeleteEducation = () => {
  return useDeleteResource(deleteEducation, "getEducation");
};

export const useDeleteSocialLink = () => {
  return useDeleteResource(deleteSocialLink, "getSocialLink");
};

export const useDeleteEndorsement = () => {
  return useDeleteResource(deleteEndorsement, "getEndorsement");
};

export const useDeleteCredit = () => {
  return useDeleteResource(deleteCredit, "getCredit");
};
