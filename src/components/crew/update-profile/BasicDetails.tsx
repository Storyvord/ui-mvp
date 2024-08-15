"use client";
import CustomForm from "@/components/crew/CustomForm";
import { useToast } from "@/components/ui/use-toast";
import { useCreateProfile } from "@/lib/react-query/queriesAndMutations/crew/profile";
import { convertToBase64 } from "@/lib/utils";
import { profileFormValidationSchema } from "@/lib/validation/crew";
import { FormFieldConfig, ProfileFormData } from "@/types/crew";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

const profileFormFields: FormFieldConfig<ProfileFormData>[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Enter your full name",
  },
  {
    name: "phone",
    label: "Phone",
    type: "number",
    placeholder: "Enter your phone number",
  },
  {
    name: "image",
    label: "Image",
    type: "file",
    placeholder: "Enter the URL of your profile image",
  },
  {
    name: "location",
    label: "Location",
    type: "text",
    placeholder: "Enter your location",
  },
  {
    name: "languages",
    label: "Languages",
    type: "text",
    placeholder: "Enter the languages you speak",
  },
  {
    name: "job_title",
    label: "Job Title",
    type: "text",
    placeholder: "Enter your job title",
  },
  {
    name: "bio",
    label: "Bio",
    type: "textarea",
    placeholder: "Write a short bio about yourself",
  },
  {
    name: "experience",
    label: "Experience",
    type: "text",
    placeholder: "Enter your experience",
  },
  {
    name: "skills",
    label: "Skills",
    type: "text",
    placeholder: "Enter your skills",
  },
  {
    name: "standardRate",
    label: "Standard Rate",
    type: "text",
    placeholder: "Enter your standard rate (e.g., $100/hr)",
  },
  {
    name: "technicalProficiencies",
    label: "Technical Proficiencies",
    type: "text",
    placeholder: "List your technical proficiencies",
  },
  {
    name: "specializations",
    label: "Specializations",
    type: "text",
    placeholder: "Enter your areas of specialization",
  },
  {
    name: "drive",
    label: "Drive",
    type: "checkbox",
  },
  {
    name: "active",
    label: "Active",
    type: "checkbox",
  },
];

const profileFormDefaultValue: ProfileFormData = {
  name: "",
  phone: "",
  image: null,
  location: "",
  languages: "",
  job_title: "",
  bio: "",
  experience: "",
  skills: "",
  standardRate: "",
  technicalProficiencies: "",
  specializations: "",
  drive: false,
  active: true,
};

const BasicDetails = () => {
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(profileFormValidationSchema),
    defaultValues: profileFormDefaultValue,
  });

  const { mutateAsync, isLoading, isError } = useCreateProfile();

  const onSubmit = async (data: ProfileFormData) => {
    const base64 = await convertToBase64(data.image);
    const transformData = { ...data, image: base64 };
    const res = await mutateAsync(transformData);
    if (res) {
      form.reset();
      toast({
        title: "Your portfolio details successfully submitted",
      });
    }
  };

  return (
    <>
      <h1 className=" text-center sm:text-xl text-lg font-semibold text-gray-800 mt-4">
        Basic Details
      </h1>
      <div className="w-full shadow-md space-y-8 mx-auto max-w-[650px] lg:mt-6 lg:w-3/5 bg-white p-4">
        <CustomForm
          form={form}
          formFields={profileFormFields}
          onSubmit={onSubmit}
          isLoading={isLoading}
          isError={isError}
        />
      </div>
    </>
  );
};
export default BasicDetails;
