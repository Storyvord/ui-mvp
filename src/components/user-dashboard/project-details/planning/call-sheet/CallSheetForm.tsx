import React from "react";
import { Form } from "@/components/ui/form";
import RenderFormFields, { FormFieldConfig } from "@/components/RenderFormFields";
import { Button } from "@/components/ui/button";
import { BsTrash } from "react-icons/bs";
import { useToast } from "@/components/ui/use-toast";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formFields = [
  // Project Information
  { name: "title", type: "text", placeholder: "Title" },
  { name: "date", type: "date", placeholder: "Date" },
  { name: "calltime", type: "time", placeholder: "Call Time" },
  { name: "location", type: "text", placeholder: "Location" },
  { name: "nearest_hospital_address", type: "text", placeholder: "Nearest Hospital Address" },
  { name: "nearest_police_station", type: "text", placeholder: "Nearest Police Station" },
  { name: "nearest_fire_station", type: "text", placeholder: "Nearest Fire Station" },

  // Events (Dynamic)
  {
    name: "events",
    type: "array",
    fields: [
      { name: "time", type: "time", placeholder: "Event Time" },
      { name: "title", type: "text", placeholder: "Event Title" },
    ],
  },

  // Scenes (Dynamic)
  {
    name: "scenes",
    type: "array",
    fields: [
      { name: "scene_number", type: "text", placeholder: "Scene Number" },
      { name: "description", type: "textarea", placeholder: "Description" },
      { name: "page_count", type: "number", placeholder: "Page Count" },
      { name: "cast", type: "text", placeholder: "Cast" },
      { name: "location", type: "text", placeholder: "Location" },
      { name: "other_notes", type: "textarea", placeholder: "Other Notes" },
    ],
  },

  // Characters (Dynamic)
  {
    name: "characters",
    type: "array",
    fields: [
      { name: "character_name", type: "text", placeholder: "Character Name" },
      { name: "actor", type: "text", placeholder: "Actor" },
      { name: "status", type: "time", placeholder: "Status Time" },
      { name: "pickup", type: "time", placeholder: "Pickup Time" },
      { name: "arrival", type: "time", placeholder: "Arrival Time" },
      { name: "makeup", type: "time", placeholder: "Makeup Time" },
      { name: "costume", type: "time", placeholder: "Costume Time" },
      { name: "rehearsal", type: "time", placeholder: "Rehearsal Time" },
      { name: "on_set", type: "time", placeholder: "On Set Time" },
      { name: "info", type: "textarea", placeholder: "Character Info" },
    ],
  },

  // Extras (Dynamic)
  {
    name: "extras",
    type: "array",
    fields: [
      { name: "scene_number", type: "text", placeholder: "Scene Number" },
      { name: "extra", type: "text", placeholder: "Extra Role" },
      { name: "arrival", type: "time", placeholder: "Arrival Time" },
      { name: "makeup", type: "time", placeholder: "Makeup Time" },
      { name: "costume", type: "time", placeholder: "Costume Time" },
      { name: "rehearsal", type: "time", placeholder: "Rehearsal Time" },
      { name: "on_set", type: "time", placeholder: "On Set Time" },
    ],
  },

  // Department Instructions (Dynamic)
  {
    name: "department_instructions",
    type: "array",
    fields: [
      { name: "department", type: "text", placeholder: "Department" },
      { name: "instructions", type: "textarea", placeholder: "Instructions" },
    ],
  },
];

type Props = {
  openDialog: boolean;
  setOpenDialog: (value: boolean) => void;
};
const CallSheetForm = ({ openDialog, setOpenDialog }: Props) => {
  const { toast } = useToast();
  const form = useForm({
    //   resolver: zodResolver(projectFormSchema),
    //   defaultValues: defaultFormValues,
  });

  const onSubmit = () => {};

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "locationDetails",
  });
  return (
    <>
      {openDialog && (
        <section className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md shadow-xl w-full max-w-4xl mx-1 md:mx-2 lg:mx-2 max-h-full transform transition-transform duration-300 overflow-auto">
            <div className="flex justify-between items-center pb-2 mb-4 border-b">
              <h2 className="text-2xl font-medium">Create call sheet</h2>
              <button
                onClick={() => setOpenDialog(false)}
                className="text-gray-500 hover:text-gray-800 text-2xl"
              >
                &times;
              </button>
            </div>
            <main>
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

                  {/* {(isErrorCreateProject || isErrorEditProject) && (
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
                  )} */}
                </form>
              </Form>
            </main>
          </div>
        </section>
      )}
    </>
  );
};

export default CallSheetForm;
