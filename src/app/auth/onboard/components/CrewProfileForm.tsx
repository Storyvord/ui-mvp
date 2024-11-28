"use client";
import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import RenderFormFields from "@/components/form-component/RenderFormFields";
import { useForm } from "react-hook-form";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";

import { CrewProfileFormDefaultValues, CrewProfileFormFields } from "@/constant/formFields/profile";
import { CrewProfileSchema, CrewProfileType } from "@/lib/validation/auth";
import { useGetUserProfile } from "@/lib/react-query/queriesAndMutations/auth/auth";
import { usePostPersonalDetails } from "@/lib/react-query/queriesAndMutations/onBoard/onBoard";
import { convertToBase64 } from "@/lib/utils";

type Props = {
  prevStep: () => void;
  onSuccessStep: () => void;
};

const CrewProfileForm = ({ prevStep, onSuccessStep }: Props) => {
  const { mutateAsync: postPersonalDetails, isPending, isError, error } = usePostPersonalDetails();
  const { data: userProfile } = useGetUserProfile();
  const { personal_info, crew_profile } = userProfile?.data;

  const form = useForm({
    resolver: zodResolver(CrewProfileSchema),
    defaultValues: CrewProfileFormDefaultValues,
  });

  useEffect(() => {
    if (userProfile?.data?.personal_info?.full_name)
      form.reset({
        full_name: personal_info.full_name,
        contact_number: personal_info.contact_number,
        location: personal_info.location,
        languages: personal_info.languages,
        job_title: personal_info.job_title,
        bio: personal_info.full_name,

        experience: crew_profile.experience,
        skills: crew_profile.skills,
        standardRate: crew_profile.standardRate,
        technicalProficiencies: crew_profile.technicalProficiencies,
        specializations: crew_profile.specializations,
        drive: crew_profile.drive,
      });
  }, [form, userProfile]);

  const onSubmit = async (data: CrewProfileType) => {
    if (userProfile?.data?.personal_info?.full_name) {
      toast({
        title: "Profile Update Successful",
      });
      onSuccessStep();
      return;
    }
    // will add after backend issue resolve
    // const base64Image = await convertToBase64(data.image || null);

    const formData = {
      personal_info: {
        full_name: data?.full_name,
        contact_number: data.contact_number,
        location: data?.location,
        languages: data.languages,
        job_title: data.job_title,
        bio: data?.bio,
        // image: base64Image,
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
        toast({
          title: res?.message,
        });
        onSuccessStep();
      }
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: error.message,
          variant: "destructive",
        });
      }
    }
  };
  return (
    <div className="">
      <h3 className="lg:text-2xl md:text-2xl text-sm font-poppins text-center font-medium text-[#333333]">
        Let&apos;s get to know you better!
      </h3>
      <p className="text-xs lg:text-base md:text-base font-poppins text-center font-normal text-[#666666] mt-2 underline">
        Please provide your basic information to continue.
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 justify-center flex flex-col w-full lg:w-3/5 mx-auto"
        >
          <section>
            <RenderFormFields form={form} formFields={CrewProfileFormFields} />
          </section>

          {isError && (
            <p className="text-center text-sm text-red-600 font-semibold">
              {/* {error?.detail} */}
              <br />
            </p>
          )}
          <div className=" w-full flex justify-between items-center">
            <Button
              type="button"
              disabled={isPending}
              className=" flex items-center gap-3"
              onClick={() => prevStep()}
            >
              <FaArrowLeft />
              Back
            </Button>
            {userProfile?.data?.personal_info?.full_name ? (
              <Button type="submit" disabled={isPending} className="flex items-center gap-3">
                {isPending ? <Loader /> : "Update"} <FaArrowRight />
              </Button>
            ) : (
              <Button type="submit" disabled={isPending} className="flex items-center gap-3">
                {isPending ? <Loader /> : "Submit"} <FaArrowRight />
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CrewProfileForm;
