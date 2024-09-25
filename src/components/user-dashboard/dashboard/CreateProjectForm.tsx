"use client";

import React, { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { z } from "zod";

import { content_type, crew_data, defaultFormValues, equipment_data } from "@/constant/constant";
import { projectFormSchema } from "@/lib/validation";
import { useCreateProject } from "@/lib/react-query/queriesAndMutations/project";
import { convertToBase64 } from "@/lib/utils";
import { Form } from "@/components/ui/form";
import RenderFormFields, { FormFieldConfig } from "@/components/RenderFormFields";
import { Button } from "@/components/ui/button";
import Loader from "@/components/Loader";
import { BsTrash } from "react-icons/bs";
import { useToast } from "@/components/ui/use-toast";

export type ProjectFormFieldType = z.infer<typeof projectFormSchema>;

const formFields: FormFieldConfig<ProjectFormFieldType>[] = [
  {
    name: "projectName",
    label: "Project Name",
    type: "text",
    placeholder: "Project name",
  },
  {
    name: "contentType",
    label: "Content Type",
    type: "select",
    options: content_type,
    placeholder: "Select content type",
  },
  {
    name: "budget",
    label: "Budget",
    type: "slider",
    placeholder: "Enter budget",
    minValue: 0.5,
    maxValue: 200,
  },
  {
    name: "crew",
    label: "Crew",
    type: "selectWithQuantity",
    options: crew_data,
    placeholder: "Select crew",
  },
  {
    name: "equipment",
    label: "Equipment",
    type: "selectWithQuantity",
    options: equipment_data,
    placeholder: "Select equipment",
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Project description (minimum 100 words)",
  },
  {
    name: "uploadedDocument",
    label: "Upload Document",
    type: "file",
    placeholder: "Upload document",
    isMulti: true,
    optional: true,
  },
  {
    name: "aiSuggestions",
    label: "AI Suggestions",
    type: "checkbox",
  },
  {
    name: "locationDetails.0.location",
    label: "Location",
    type: "text",
    placeholder: "Enter location",
  },
  {
    name: "locationDetails.0.start_date",
    label: "Start Date",
    type: "date",
    placeholder: "Select start date",
  },
  {
    name: "locationDetails.0.end_date",
    label: "End Date",
    type: "date",
    placeholder: "Select end date",
  },
  {
    name: "locationDetails.0.mode_of_shooting",
    label: "Mode of Shooting",
    type: "select",
    options: [
      { value: "indoor", label: "Indoor" },
      { value: "outdoor", label: "Outdoor" },
      { value: "both", label: "Both" },
    ],
    placeholder: "Select mode of shooting",
  },
  {
    name: "locationDetails.0.permits",
    label: "I need Filming Permit",
    type: "checkbox",
  },
];
type Props = {
  isEdit?: boolean;
  projectDetails?: ProjectFormFieldType;
  handleEditProject?: (projectData: any) => void;
  isLoadingEditProject?: boolean;
  isErrorEditProject?: boolean;
};
const CreateProjectForm = ({
  isEdit,
  projectDetails,
  handleEditProject,
  isLoadingEditProject,
  isErrorEditProject,
}: Props) => {
  const { toast } = useToast();
  const form = useForm<ProjectFormFieldType>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: defaultFormValues,
  });

  // useEffect to reset form values when data changes
  useEffect(() => {
    if (isEdit) {
      form.reset(projectDetails);
    }
  }, [isEdit, form, projectDetails]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "locationDetails",
  });

  const {
    mutateAsync: createProjectMutation,
    isPending: isLoadingCreateProject,
    isError: isErrorCreateProject,
    error,
  } = useCreateProject();
  const router = useRouter();

  const onSubmit = async (formData: ProjectFormFieldType) => {
    const {
      locationDetails,
      crew,
      equipment,
      projectName,
      description,
      uploadedDocument,
      budget,
      contentType,
    } = formData;

    const base64Documents = uploadedDocument?.map(async (item) => {
      const base64 = await convertToBase64(item);
      return { document: base64 };
    });
    const documents = await Promise.all(base64Documents || []);

    const transformedFormData = {
      location_details: locationDetails,
      selected_crew: crew,
      equipment: equipment,
      name: projectName,
      brief: description,
      additional_details: description,
      budget_currency: "$",
      budget_amount: budget,
      content_type: contentType,
      documents,
    };
    if (isEdit && handleEditProject) {
      handleEditProject(transformedFormData);
    } else {
      try {
        const project = await createProjectMutation(transformedFormData);
        if (project) {
          toast({ title: "Project has been successfully created" });
          router.push(`/project-details/${project.project_id}`);
        }
      } catch (e) {
        toast({ title: "Failed to create Project", variant: "destructive" });
      }
    }
  };

  return (
    <div className="px-4">
      <h1 className="text-center md:mt-1 md:mb-6 sm:text-3xl text-xl font-semibold">
        {isEdit ? `Edit (${projectDetails?.projectName}) Project` : "Create a new Project"}
      </h1>
      <div className="w-full shadow-md space-y-8 mx-auto max-w-[650px] mt-4 lg:mt-6 lg:w-3/5 bg-white p-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 justify-center flex flex-col"
          >
            <RenderFormFields form={form} formFields={formFields.slice(0, 8)} />

            {/* Render locationDetails fields dynamically */}
            <h3 className=" text-center font-semibold text-xl underline">Location Details</h3>
            {fields.map((field, index) => (
              <div key={field.id} className="border px-6 py-2 rounded-md mb-4 relative">
                <RenderFormFields
                  form={form}
                  formFields={formFields.slice(8, 13).map((fieldConfig) => ({
                    ...fieldConfig,
                    name: `locationDetails.${index}.${fieldConfig.name.split(".")[2]}` as keyof ProjectFormFieldType,
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
                append({
                  location: "",
                  start_date: "",
                  end_date: "",
                  permits: false,
                  mode_of_shooting: "both",
                })
              }
            >
              Add Location
            </Button>

            {(isErrorCreateProject || isErrorEditProject) && (
              <p className="text-center text-sm text-red-600 font-semibold">
                Failed to submit your form <br />
              </p>
            )}

            {isEdit ? (
              <Button type="submit" disabled={isLoadingEditProject} className="w-full">
                {isLoadingEditProject ? <Loader /> : "Update"}
              </Button>
            ) : (
              <Button type="submit" disabled={isLoadingCreateProject} className="w-full">
                {isLoadingCreateProject ? <Loader /> : "Submit"}
              </Button>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
};
export default CreateProjectForm;
