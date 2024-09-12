"use client";
import React, { useState, Fragment, ReactNode } from "react";
import { UseFormReturn, FieldValues, Path } from "react-hook-form";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import SelectInputWithQuantity from "@/components/SelectInputWithQuantity";
import SelectInput from "@/components/SelectInput";

// Define the configuration for each form field, specifying the field's type, label, and other properties
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
    | "selectWithQuantity"
    | "slider";
  placeholder?: string;
  disabled?: boolean;
  minValue?: number;
  maxValue?: number;
  note?: ReactNode;
  optional?: boolean;
  isMulti?: boolean; // Only applicable for select type fields
  options?: { value: string; label: string }[]; // Required for select & selectWithQuantity fields
};

// Define the props for the RenderFormFields component
type Props<TFormValues extends FieldValues> = {
  formName?: string;
  form: UseFormReturn<TFormValues>; // react-hook-form's useForm instance
  formFields: FormFieldConfig<TFormValues>[]; // Array of form field configurations
};

const RenderFormFields = <TFormValues extends FieldValues>({
  formName,
  form,
  formFields,
}: Props<TFormValues>) => {
  // State to manage the visibility of password fields
  const [showPasswords, setShowPasswords] = useState<{ [key: string]: boolean }>({});

  // Toggle function to show or hide passwords for specific fields
  const togglePasswordVisibility = (fieldName: string) => {
    setShowPasswords((prevState) => ({
      ...prevState,
      [fieldName]: !prevState[fieldName],
    }));
  };

  return (
    <Fragment>
      {/* Optional form name displayed at the top */}
      {formName && <h1 className="text-center text-xl font-semibold">{formName}</h1>}
      {formFields.map((fieldConfig) => {
        const { name, type, label, placeholder } = fieldConfig;
        return (
          <FormField
            key={name}
            control={form.control}
            name={name}
            render={({ field }) => (
              <FormItem className="mt-4">
                {/* Form label with required indicator if field is not optional */}
                <FormLabel className="font-sans font-bold text-gray-800 text-md">
                  {label}
                  <span className="text-red-500 ml-1 text-sm">
                    {fieldConfig?.optional ? "" : "*"}
                  </span>
                </FormLabel>
                <FormControl>
                  <Fragment>
                    {/* Render input fields based on type */}
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
                        value={field.value as string} // Ensure value is a string for these input types
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
                        className="ml-3"
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
                    {type === "slider" && (
                      <div className="flex gap-3">
                        <Slider
                          {...field}
                          min={fieldConfig.minValue}
                          max={fieldConfig.maxValue}
                          step={1}
                          value={[field.value / 1000]} // Slider value adjusted to thousands
                          onValueChange={(value) => field.onChange(value[0] * 1000)} // Slider step adjusts by 1000
                        />
                        <span className="text-black pl-[10px]">
                          ${form.getValues().budget / 1000}k{" "}
                          {/* Display current budget value in thousands */}
                        </span>
                      </div>
                    )}
                    {type === "selectWithQuantity" && (
                      <SelectInputWithQuantity
                        fieldName={name}
                        options={fieldConfig.options || []}
                        form={form}
                      />
                    )}
                    {type === "password" && (
                      <div className="relative">
                        <Input
                          type={showPasswords[name] ? "text" : "password"}
                          placeholder={placeholder}
                          {...field}
                          value={field.value as string} // Ensure value is string
                          disabled={fieldConfig.disabled}
                        />
                        {/* Icons to toggle password visibility */}
                        {!showPasswords[name] ? (
                          <FaRegEyeSlash
                            onClick={() => togglePasswordVisibility(name)}
                            className="absolute right-2 top-1/4 text-gray-500 cursor-pointer"
                          />
                        ) : (
                          <FaRegEye
                            onClick={() => togglePasswordVisibility(name)}
                            className="absolute right-2 top-1/4 text-gray-500 cursor-pointer"
                          />
                        )}
                      </div>
                    )}
                  </Fragment>
                </FormControl>
                {/* Optional note for additional field instructions */}
                {fieldConfig.note && <p className="text-sm">{fieldConfig.note}</p>}
                <FormMessage />
              </FormItem>
            )}
          />
        );
      })}
    </Fragment>
  );
};

export default RenderFormFields;
