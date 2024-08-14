"use client";
import { DynamicForm } from "@/components/crew/DynamicForm";
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
  const onSubmit = (data: { socialLinks: SocialLinkFormType[] }) => {
    console.log(data);
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
        isLoading={false}
        formName="socialLinks"
      />
    </>
  );
};

export default SocialLinks;
