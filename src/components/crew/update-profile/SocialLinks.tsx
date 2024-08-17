"use client";
import { DynamicForm } from "@/components/crew/DynamicForm";
import { useToast } from "@/components/ui/use-toast";
import { useCreateSocialLink } from "@/lib/react-query/queriesAndMutations/crew/profile";
import { socialLinksFormValidationSchema } from "@/lib/validation/crew";
import { FormFieldConfig, SocialLinkFormType } from "@/types/crew";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";

const educationFormFields: FormFieldConfig<{ socialLinks: SocialLinkFormType[] }>[] = [
  {
    name: "socialLinks.0.link",
    label: "Link",
    type: "text",
    placeholder: " Enter your social link",
  },
];

const socialLinksDefaultValue: SocialLinkFormType = {
  link: "",
};

const SocialLinks = () => {
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(socialLinksFormValidationSchema),
    defaultValues: {
      socialLinks: [socialLinksDefaultValue],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "socialLinks",
  });

  const { mutateAsync, isLoading, isError } = useCreateSocialLink();
  const crewProfileId = JSON.parse(localStorage.getItem("crew-profile-id") || "");

  const onSubmit = (data: { socialLinks: SocialLinkFormType[] }) => {
    data.socialLinks.forEach(async (item) => {
      const res = await mutateAsync({ ...item, crew: crewProfileId });
      if (res) {
        form.reset();
        toast({
          title: "Your social links successfully submitted",
        });
      }
    });
  };
  return (
    <>
      <h1 className=" text-lg sm:text-xl text-center text-gray-800 font-semibold mt-4">
        Educational Details
      </h1>
      <DynamicForm
        form={form}
        formFields={educationFormFields}
        onSubmit={onSubmit}
        append={() => append(socialLinksDefaultValue)}
        remove={remove}
        fields={fields}
        isLoading={isLoading}
        isError={isError}
        formName="socialLinks"
      />
    </>
  );
};

export default SocialLinks;
