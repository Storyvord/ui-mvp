import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";
import { CrewProfileFormDefaultValues, CrewProfileFormFields } from "@/constant/formFields/profile";
import { CrewProfileSchema, CrewProfileType } from "@/lib/validation/auth";
import { useGetUserProfile } from "@/lib/react-query/queriesAndMutations/auth/auth";
import { usePostPersonalDetails } from "@/lib/react-query/queriesAndMutations/onBoard/onBoard";

export const useCrewProfile = (onSuccessStep: () => void) => {
  const { mutateAsync: postPersonalDetails, isPending, isError, error } = usePostPersonalDetails();
  const { data: userProfile } = useGetUserProfile();
  const { personal_info, crew_profile } = userProfile?.data || {};

  // Initialize form with default values and schema validation
  const form = useForm({
    resolver: zodResolver(CrewProfileSchema),
    defaultValues: CrewProfileFormDefaultValues,
  });

  // Reset form when user profile is loaded
  useEffect(() => {
    if (personal_info?.full_name) {
      form.reset({
        full_name: personal_info.full_name,
        contact_number: personal_info.contact_number,
        location: personal_info.location,
        languages: personal_info.languages,
        job_title: personal_info.job_title,
        bio: personal_info.bio,

        experience: crew_profile?.experience,
        skills: crew_profile?.skills,
        standardRate: crew_profile?.standardRate,
        technicalProficiencies: crew_profile?.technicalProficiencies,
        specializations: crew_profile?.specializations,
        drive: crew_profile?.drive,
      });
    }
  }, [form, personal_info, crew_profile]);

  // Submit form data
  const handleSubmit = async (data: CrewProfileType) => {
    if (personal_info?.full_name) {
      toast({ title: "Profile Update Successful" });
      onSuccessStep();
      return;
    }

    const formData = {
      personal_info: {
        full_name: data.full_name,
        contact_number: data.contact_number,
        location: data.location,
        languages: data.languages,
        job_title: data.job_title,
        bio: data.bio,
      },
      crew_profile: {
        experience: data.experience,
        skills: data.skills,
        standardRate: data.standardRate,
        technicalProficiencies: data.technicalProficiencies,
        specializations: data.specializations,
        drive: data.drive,
      },
    };

    try {
      const res = await postPersonalDetails(formData);
      if (res) {
        toast({ title: res.message });
        onSuccessStep();
      }
    } catch (err) {
      if (err instanceof Error) {
        toast({ title: err.message, variant: "destructive" });
      }
    }
  };

  return {
    form,
    isPending,
    isError,
    error,
    handleSubmit: form.handleSubmit(handleSubmit),
    CrewProfileFormFields,
    userProfile,
  };
};
