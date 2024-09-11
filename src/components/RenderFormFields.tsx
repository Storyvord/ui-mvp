"use client";
import React, { useState } from "react";
import { UseFormReturn, FieldValues, Path } from "react-hook-form";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SelectInput from "@/components/SelectInput";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import SelectInputWithQuantity from "./SelectInputWithQuantity";

export type FormFieldConfig<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  type:
    | "text"
    | "password"
    | "number"
    | "email"
    | "textarea"
    | "checkbox"
    | "date"
    | "file"
    | "datetime-local"
    | "select"
    | "selectWithQuantity";
  isMulti?: boolean; // this is only for type select
  options?: { value: string; label: string }[]; // this is only for type select
  placeholder?: string;
  disabled?: boolean;
  optional?: boolean; // this is for optional fields
};

type Props<TFormValues extends FieldValues> = {
  form: UseFormReturn<TFormValues>;
  formFields: FormFieldConfig<TFormValues>[];
};

const RenderFormFields = <TFormValues extends FieldValues>({
  form,
  formFields,
}: Props<TFormValues>) => {
  const [showPasswords, setShowPasswords] = useState<{ [key: string]: boolean }>({});
  const togglePasswordVisibility = (fieldName: string) => {
    setShowPasswords((prevState) => ({
      ...prevState,
      [fieldName]: !prevState[fieldName],
    }));
  };
  return (
    <>
      {formFields.map((fieldConfig) => {
        const { name, type, label, placeholder } = fieldConfig;
        return (
          <FormField
            key={name}
            control={form.control}
            name={name}
            render={({ field }) => (
              <FormItem className=" mt-4">
                <FormLabel className="font-sans font-bold text-gray-800 text-md">
                  {label}
                  <span className=" text-red-500 ml-1 text-sm">
                    {fieldConfig?.optional ? "" : "*"}
                  </span>
                </FormLabel>
                <FormControl>
                  <>
                    {type === "file" && (
                      <Input
                        type="file"
                        onChange={(e) => {
                          if (e.target.files && e.target.files.length > 0) {
                            field.onChange(e.target.files[0]); // Pass the first file in the FileList to react-hook-form
                          }
                        }}
                      />
                    )}
                    {(type === "text" ||
                      type === "email" ||
                      type === "number" ||
                      type === "date" ||
                      type === "datetime-local") && (
                      <Input
                        type={type}
                        placeholder={placeholder}
                        {...field}
                        value={field.value as string} // Ensure value is string
                        disabled={fieldConfig.disabled}
                      />
                    )}
                    {type === "textarea" && (
                      <Textarea
                        placeholder={placeholder}
                        {...field}
                        value={field.value as string}
                      />
                    )}
                    {type === "checkbox" && (
                      <Checkbox
                        className=" ml-3"
                        checked={field.value as boolean}
                        onCheckedChange={field.onChange}
                      />
                    )}
                    {type === "select" && (
                      <SelectInput
                        control={form.control}
                        name={name}
                        options={fieldConfig.options || []}
                        isMulti={fieldConfig.isMulti}
                        placeholder={placeholder}
                      />
                    )}
                    {type === "selectWithQuantity" && (
                      <SelectInputWithQuantity
                        fieldName="crew"
                        data={fieldConfig.options || []}
                        form={form}
                      />
                    )}

                    {type === "password" && (
                      <div className=" relative">
                        <Input
                          type={showPasswords[name] ? "text" : "password"}
                          placeholder={placeholder}
                          {...field}
                          value={field.value as string} // Ensure value is string
                          disabled={fieldConfig.disabled}
                        />
                        {!showPasswords[name] ? (
                          <FaRegEyeSlash
                            onClick={() => togglePasswordVisibility(name)}
                            className=" absolute right-2 top-1/4 text-gray-500 cursor-pointer"
                          />
                        ) : (
                          <FaRegEye
                            onClick={() => togglePasswordVisibility(name)}
                            className=" absolute right-2 top-1/4 text-gray-500 cursor-pointer"
                          />
                        )}
                      </div>
                    )}
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      })}
    </>
  );
};

export default RenderFormFields;
