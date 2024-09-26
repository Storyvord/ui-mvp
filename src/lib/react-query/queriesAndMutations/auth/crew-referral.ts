import { getReferralCrewData, registerCrewWithReferral } from "@/lib/api/auth/crew-referral";
import { useQuery, useMutation } from "@tanstack/react-query";


export const useGetReferralCrewData = (referralCode: string) => {
  return useQuery({
    queryKey: ["getReferralCrewData"],
    queryFn: () => getReferralCrewData(referralCode),
  });
};

export const useRegisterCrewWithReferral = () => {
  return useMutation({
    mutationFn: registerCrewWithReferral,
    onSuccess: (data) => {
      return data;
    },
  });
};
