"use client";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import RenderFormFields, { FormFieldConfig } from "@/components/RenderFormFields";
import { BsTrash } from "react-icons/bs";
import { crew_data } from "@/constant/constant";

// Extended form validation schema including educational details
const formValidation = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Confirm Password must be at least 8 characters"),
  education: z
    .array(
      z.object({
        institution: z.string().min(1, "Institution name is required"),
        degree: z.string().min(1, "Degree is required"),
        fieldOfStudy: z.string().min(1, "Field of study is required"),
        graduationYear: z.string().min(1, "Graduation year is required"), // Can add more specific validations for year
      })
    )
    .min(1, "At least one education entry is required"),
  crew: z.array(
    z.object({
      title: z.string().min(1, { message: "Title is required" }),
      quantity: z.number().min(1, { message: "Value must be greater than 0" }),
    })
  ),
});

type formFieldType = z.infer<typeof formValidation>;

// Updated form fields to include educational details
const formFields: FormFieldConfig<formFieldType>[] = [
  { name: "name", label: "Name", type: "text", placeholder: "Enter your name" },
  { name: "email", label: "Email", type: "email", placeholder: "Enter your email" },
  { name: "password", label: "Password", type: "password", placeholder: "Enter your password" },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    placeholder: "Enter your confirm password",
  },
  {
    name: "crew",
    label: "Crew",
    type: "selectWithQuantity",
    options: crew_data,
  },
  {
    name: "education.0.institution",
    label: "Institution Name",
    type: "text",
    placeholder: "Enter institution name",
  },
  { name: "education.0.degree", label: "Degree", type: "text", placeholder: "Enter degree" },
  {
    name: "education.0.fieldOfStudy",
    label: "Field of Study",
    type: "text",
    placeholder: "Enter field of study",
  },
  {
    name: "education.0.graduationYear",
    label: "Graduation Year",
    type: "text",
    placeholder: "Enter graduation year",
  },
];

const defaultValues: formFieldType = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  crew: [],
  education: [{ institution: "", degree: "", fieldOfStudy: "", graduationYear: "" }],
};

const Cast = () => {
  const form = useForm<formFieldType>({
    resolver: zodResolver(formValidation),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "education",
  });

  const isLoading = false;
  const isError = false;
  const error = { message: "" };

  const onSubmit = (data: formFieldType) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 justify-center flex flex-col p-4"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <RenderFormFields form={form} formFields={formFields.slice(0, 2)} />
          <RenderFormFields form={form} formFields={formFields.slice(2, 5)} />
        </div>

        {/* Render educational fields dynamically */}
        {fields.map((field, index) => (
          <div key={field.id} className="border p-4 rounded-md mb-4 relative">
            <RenderFormFields
              form={form}
              formFields={formFields.slice(5, 9).map((fieldConfig) => ({
                ...fieldConfig,
                name: `education.${index}.${fieldConfig.name.split(".")[2]}` as keyof formFieldType,
              }))}
            />
            {fields.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                className="absolute right-2 top-1 text-red-700 hover:text-red-500"
                onClick={() => remove(index)}
              >
                <BsTrash className=" w-4 h-4" />
              </Button>
            )}
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          className="w-full mt-2 border-green-600"
          onClick={() =>
            append({ institution: "", degree: "", fieldOfStudy: "", graduationYear: "" })
          }
        >
          Add Education
        </Button>

        {isError && (
          <p className="text-center text-sm text-red-600 font-semibold">
            Failed to submit your form <br /> {error?.message}
          </p>
        )}

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? <Loader /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default Cast;
