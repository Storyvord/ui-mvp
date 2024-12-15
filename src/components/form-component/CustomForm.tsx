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
import HideIcon from "@/assets/hide-eye.svg";
import ShowIcon from "@/assets/show.svg";
import Image from "next/image";

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
    | "select"
    | "link";
  isMulti?: boolean; // this is only for type select
  options?: { value: string | number; label: string }[]; // this is only for type select
  placeholder?: string;
  title?: string;
  routeTo?: string;
  note?: string;
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
  // buttonLabel: string;
};

const CustomForm = <TFormValues extends FieldValues>({
  form,
  formFields,
  onSubmit,
  isLoading,
  isError,
  error,
  // buttonLabel,
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
        // className="space-y-5 justify-center flex flex-col"
        className="justify-center flex flex-col"
      >
        {formFields.map((fieldConfig) => {
          const { name, type, label, placeholder, title, routeTo, note } = fieldConfig;
          return (
            <FormField
              key={name}
              control={form.control}
              name={name}
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel className="font-poppins font-normal text-[#666666] text-base">
                    {label}
                    {/* <span className=" text-red-500 ml-1">{fieldConfig?.optional ? "" : "*"}</span> */}
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
          <p className="text-center text-xs font-semibold text-[#ff0000] font-poppins">
            Failed to submit your form <br /> {error?.message}
          </p>
        )}
        {/* <Link href='' className="text-base font-normal text-[#111111] font-poppins underline mt-2 text-right">Forget your password</Link> */}
        {/* <div className="flex items-center space-x-3 mt-4">
          <Checkbox className="data-[state=checked]:bg-white data-[state=checked]:text-[#111111] data-[state=checked]:border-[#111111] data-[state=checked]:before:text-[#111111] w-5 h-5 rounded-[5]" />
          <p className="font-poppins font-normal text-[#666666] text-sm" >
            By creating an account, you agree to our <span className="font-medium text-[#111111] underline cursor-pointer">
            Terms of use</span> and <span className="font-medium text-[#111111] underline cursor-pointer">Privacy Policy</span>
          </p>
        </div> */}
        <Button className="mt-5" type="submit" disabled={isLoading}>
          {isLoading ? <Loader /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default CustomForm;
