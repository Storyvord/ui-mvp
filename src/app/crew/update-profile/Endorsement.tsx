"use client";
import { DynamicForm } from "@/components/crew/DynamicForm";
import { endorsementFormValidationSchema } from "@/lib/validation/crew";
import { EndorsementFormType, FormFieldConfig } from "@/types/crew";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";

const endorsementFormFields: FormFieldConfig<{ endorsement: EndorsementFormType[] }>[] = [
  {
    name: "endorsement.0.text",
    label: "Text",
    type: "text",
    placeholder: " Enter text",
  },
  {
    name: "endorsement.0.givenBy",
    label: "Given By",
    type: "text",
    placeholder: " ",
  },
];

const endorsementDefaultValue: EndorsementFormType = {
  text: "",
  givenBy: "",
};

const Endorsement = () => {
  const form = useForm({
    resolver: zodResolver(endorsementFormValidationSchema),
    defaultValues: {
      endorsement: [endorsementDefaultValue],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "endorsement",
  });
  const onSubmit = (data: { endorsement: EndorsementFormType[] }) => {
    console.log(data);
  };
  return (
    <>
      <h1 className=" text-lg sm:text-xl text-center text-gray-800 font-semibold mt-4">
        Endorsement Details
      </h1>
      <DynamicForm
        form={form}
        formFields={endorsementFormFields}
        onSubmit={onSubmit}
        append={() => append(endorsementDefaultValue)}
        remove={remove}
        fields={fields}
        isLoading={false}
        formName="endorsement"
      />
    </>
  );
};

export default Endorsement;
