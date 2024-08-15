import {
  createCredit,
  createEducation,
  createEndorsement,
  createPortfolio,
  createProfile,
  createSocialLink,
  getCredit,
  getEducation,
  getEndorsement,
  getPortfolio,
  getProfile,
  getSocialLink,
} from "@/lib/api/crew/profile";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useCreateProfile = () => {
  return useMutation({
    mutationFn: createProfile,
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      return;
    },
  });
};

export const useCreatePortfolio = () => {
  return useMutation({
    mutationFn: createPortfolio,
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      return;
    },
  });
};

export const useCreateEducation = () => {
  return useMutation({
    mutationFn: createEducation,
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      return;
    },
  });
};

export const useCreateSocialLink = () => {
  return useMutation({
    mutationFn: createSocialLink,
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      return;
    },
  });
};

export const useCreateEndorsement = () => {
  return useMutation({
    mutationFn: createEndorsement,
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      return;
    },
  });
};

export const useCreateCredit = () => {
  return useMutation({
    mutationFn: createCredit,
    onSuccess: (data) => {
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
    onSuccess: (data) => {
      JSON.stringify(localStorage.setItem("crew-profile-id", data?.id));
    },
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
