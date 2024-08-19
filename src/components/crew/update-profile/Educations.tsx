"use client";
import { DynamicForm } from "@/components/DynamicForm";
import { useToast } from "@/components/ui/use-toast";
import { useCreateEducation } from "@/lib/react-query/queriesAndMutations/crew/profile";
import { educationFormValidationSchema } from "@/lib/validation/crew";
import { EducationFormType, FormFieldConfig } from "@/types/crew";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";

const educationFormFields: FormFieldConfig<{ educations: EducationFormType[] }>[] = [
  {
    name: "educations.0.academicQualifications",
    label: "Academic Qualifications",
    type: "text",
    placeholder: " Enter your academic qualification",
  },
  {
    name: "educations.0.professionalCourses",
    label: "Professional Courses",
    type: "text",
    placeholder: " Enter your professional courses",
  },
  {
    name: "educations.0.workshopsAttended",
    label: "Workshops Attended",
    type: "text",
    placeholder: " Enter your workshops attended",
  },
];

const educationsDefaultValue: EducationFormType = {
  academicQualifications: "",
  professionalCourses: "",
  workshopsAttended: "",
};

const Educations = () => {
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(educationFormValidationSchema),
    defaultValues: {
      educations: [educationsDefaultValue],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "educations",
  });

  const crewProfileId = JSON.parse(localStorage.getItem("crew-profile-id") || "");
  const { mutateAsync, isLoading, isError } = useCreateEducation();

  const onSubmit = (data: { educations: EducationFormType[] }) => {
    data.educations.forEach(async (item) => {
      const res = await mutateAsync({ ...item, crew: crewProfileId });
      if (res) {
        form.reset();
        toast({
          title: "Your education details successfully submitted",
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
        append={() => append(educationsDefaultValue)}
        remove={remove}
        fields={fields}
        isLoading={isLoading}
        isError={isError}
        formName="educations"
      />
    </>
  );
};

export default Educations;
