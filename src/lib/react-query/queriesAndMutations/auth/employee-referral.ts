import { useToast } from "@/components/ui/use-toast";
import {
  getReferralEmployeeData,
  registerEmployeeWithReferral,
} from "@/lib/api/auth/employee-referral";
import { useMutation, useQuery } from "react-query";

export const useGetReferralEmployeeData = (referralCode: string) => {
  return useQuery({
    queryKey: ["getReferralEmployeeData"],
    queryFn: () => getReferralEmployeeData(referralCode),
  });
};

export const useRegisterEmployeeWithReferral = () => {
  const { toast } = useToast();
  return useMutation({
    mutationFn: registerEmployeeWithReferral,
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
