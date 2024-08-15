import {
  createCredit,
  createEducation,
  createEndorsement,
  createPortfolio,
  createProfile,
  createSocialLink,
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
