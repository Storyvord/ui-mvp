"use client";
import React, { useState } from "react";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn, FieldValues, Path } from "react-hook-form";
import SelectInput from "@/components/form-component/SelectInput";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";

type FormFieldConfig<T extends FieldValues> = {
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
    | "select";
  isMulti?: boolean; // this is only for type select
  options?: { value: string; label: string }[]; // this is only for type select
  placeholder?: string;
  disabled?: boolean;
  optional?: boolean; // this is for optional fields
};

type Props<TFormValues extends FieldValues> = {
  form: UseFormReturn<TFormValues>;
  formFields: FormFieldConfig<TFormValues>[];
  onSubmit: (data: TFormValues) => void;
  isLoading: boolean;
  isError: boolean;
  error?: unknown | any;
};

const CustomForm = <TFormValues extends FieldValues>({
  form,
  formFields,
  onSubmit,
  isLoading,
  isError,
  error,
}: Props<TFormValues>) => {
  const [showPasswords, setShowPasswords] = useState<{ [key: string]: boolean }>({});
  const togglePasswordVisibility = (fieldName: string) => {
    setShowPasswords((prevState) => ({
      ...prevState,
      [fieldName]: !prevState[fieldName],
    }));
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 justify-center flex flex-col"
      >
        {formFields.map((fieldConfig) => {
          const { name, type, label, placeholder } = fieldConfig;
          return (
            <FormField
              key={name}
              control={form.control}
              name={name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-sans font-bold text-gray-800 text-md">
                    {label}
                    <span className=" text-red-500 ml-1">{fieldConfig?.optional ? "" : "*"}</span>
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
                      )}{" "}
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
                    </>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          );
        })}
        {isError && (
          <p className=" text-center text-sm text-red-600 font-semibold">
            Failed to submit your form <br /> {error?.message}
          </p>
        )}

        <Button type="submit" disabled={isLoading}>
          {isLoading ? <Loader /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default CustomForm;
