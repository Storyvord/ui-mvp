"use client";
import { DynamicForm } from "@/components/crew/DynamicForm";
import { useToast } from "@/components/ui/use-toast";
import { useCreateCredit } from "@/lib/react-query/queriesAndMutations/crew/profile";
import { creditsFormValidationSchema } from "@/lib/validation/crew";
import { CreditsFormFields, FormFieldConfig } from "@/types/crew";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";

const creditsFormFields: FormFieldConfig<{ credits: CreditsFormFields[] }>[] = [
  {
    name: "credits.0.title",
    label: "Title",
    type: "text",
    placeholder: "Enter the title",
  },
  {
    name: "credits.0.year",
    label: "Year",
    type: "text",
    placeholder: "Enter the year",
  },
  {
    name: "credits.0.role",
    label: "Role",
    type: "text",
    placeholder: "Enter the role",
  },
  {
    name: "credits.0.production",
    label: "Production",
    type: "text",
    placeholder: "Enter the production",
  },
  {
    name: "credits.0.type_of_content",
    label: "Type of content",
    type: "text",
    placeholder: "Enter the description",
  },
  {
    name: "credits.0.tags",
    label: "Tags",
    type: "text",
    placeholder: "Enter the tags",
  },
];

const creditsDefaultValue: CreditsFormFields = {
  title: "",
  year: "",
  role: "",
  production: "",
  type_of_content: "",
  tags: "",
};

const Credits = () => {
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(creditsFormValidationSchema),
    defaultValues: {
      credits: [creditsDefaultValue],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "credits",
  });

  const { mutateAsync, isLoading, isError } = useCreateCredit();
  const crewProfileId = JSON.parse(localStorage.getItem("crew-profile-id") || "");

  const onSubmit = (data: { credits: CreditsFormFields[] }) => {
    data.credits.forEach(async (item) => {
      const res = await mutateAsync({ ...item, crew: crewProfileId });
      if (res) {
        form.reset();
        toast({
          title: "Your credits details successfully submitted",
        });
      }
    });
  };
  return (
    <>
      <h1 className=" text-lg sm:text-xl text-center text-gray-800 font-semibold mt-4">
        Credits Details
      </h1>
      <DynamicForm
        form={form}
        formFields={creditsFormFields}
        onSubmit={onSubmit}
        append={() => append(creditsDefaultValue)}
        remove={remove}
        fields={fields}
        isLoading={isLoading}
        isError={isError}
        formName="credits"
      />
    </>
  );
};

export default Credits;
