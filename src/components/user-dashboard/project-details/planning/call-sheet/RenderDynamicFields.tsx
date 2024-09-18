import RenderFormFields from "@/components/RenderFormFields";
import { Button } from "@/components/ui/button";
import React from "react";
import { useFieldArray } from "react-hook-form";
import { BsTrash } from "react-icons/bs";

const RenderDynamicFormFields = ({ form, title, name, formFields, defaultValue }: any) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: name,
  });
  return (
    <>
      <h3 className=" text-center font-semibold text-xl underline">{title}</h3>
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="border p-4 rounded-md mb-4 relative grid grid-cols-1 sm:grid-cols-2 gap-2"
        >
          <RenderFormFields
            form={form}
            formFields={formFields.map((fieldConfig: any) => ({
              ...fieldConfig,
              name: `${name}.${index}.${fieldConfig.name.split(".")[2]}`,
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
        onClick={() => append(defaultValue)}
      >
        Add more {name}
      </Button>
    </>
  );
};

export default RenderDynamicFormFields;
