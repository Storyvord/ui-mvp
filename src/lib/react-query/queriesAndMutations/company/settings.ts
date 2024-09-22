import { useToast } from "@/components/ui/use-toast";
import { getCompanySettings, updateCompanySettings } from "@/lib/api/company/settings";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useGetCompanySettings = () => {
  return useQuery({
    queryKey: ["getCompanySettings"],
    queryFn: getCompanySettings,
  });
};

export const useUpdateCompanySettings = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCompanySettings,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getCompanySettings"],
      });
      toast({
        title: "Successfully update company settings",
      });
      return data;
    },
    onError: (error) => {
      return;
    },
  });
};
