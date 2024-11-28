import RenderFormFields, { FormFieldConfig } from "@/components/form-component/RenderFormFields";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";
import { ArrayPath, FieldArray, FieldValues, useFieldArray, UseFormReturn } from "react-hook-form";
import { BsTrash } from "react-icons/bs";

type Props<TFormValues extends FieldValues> = {
  form: UseFormReturn<TFormValues>; // react-hook-form's useForm instance
  title?: string;
  name: ArrayPath<TFormValues>;
  formFields: FormFieldConfig<TFormValues>[]; // Array of form field configurations
  defaultValue:
    | FieldArray<TFormValues, ArrayPath<TFormValues>>
    | FieldArray<TFormValues, ArrayPath<TFormValues>>[];
  className?: string;
};

const RenderDynamicFormFields = <TFormValues extends FieldValues>({
  form,
  title,
  name,
  formFields,
  defaultValue,
  className = "",
}: Props<TFormValues>) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: name,
  });
  return (
    <>
      {title && <h3 className=" text-center font-semibold text-xl underline">{title}</h3>}
      {fields.map((field, index) => (
        <div key={field.id} className={cn("rounded-md mb-2 relative", className)}>
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
        className="w-full mt-2 border-green-600 font-poppins"
        onClick={() => append(defaultValue)}
      >
        Add more
      </Button>
    </>
  );
};

export default RenderDynamicFormFields;
