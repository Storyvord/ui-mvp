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
import SelectInput from "@/components/SelectInput";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import HideIcon from "@/assets/hide-eye.svg";
import ShowIcon from "@/assets/show.svg";
import Image from "next/image";
import Link from "next/link";

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
        // className="space-y-5 justify-center flex flex-col"
        className="justify-center flex flex-col"
      >
        {formFields.map((fieldConfig) => {
          const { name, type, label, placeholder } = fieldConfig;
          return (
            <FormField
              key={name}
              control={form.control}
              name={name}
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormLabel className="font-poppins font-normal text-[#666666] text-base">
                    {label}
                    {/* <span className=" text-red-500 ml-1">{fieldConfig?.optional ? "" : "*"}</span> */}
                  </FormLabel>
                  <FormControl>
                    {type === "file" ? (
                      <Input
                        type="file"
                        onChange={(e) => {
                          if (e.target.files && e.target.files.length > 0) {
                            field.onChange(e.target.files[0]); // Pass the first file in the FileList to react-hook-form
                          }
                        }}
                      />
                    ) : type === "text" ||
                      type === "number" ||
                      type === "email" ||
                      type === "date" ||
                      type === "datetime-local" ? (
                      <Input
                        type={type}
                        // placeholder={placeholder}
                        {...field}
                        value={field.value as string} // Ensure value is string
                        disabled={fieldConfig.disabled}
                        className="text-base font-normal text-[#111111] font-poppins h-14 rounded-xl border-[#66666659] focus-visible:ring-offset-0 focus-visible:ring-[transparent]"
                      />
                    ) : type === "password" ? (
                      <div className=" relative">
                        <Input
                          type={showPasswords[name] ? "text" : "password"}
                          // placeholder={placeholder}
                          {...field}
                          value={field.value as string} // Ensure value is string
                          disabled={fieldConfig.disabled}
                          className="text-base font-normal text-[#111111] font-poppins h-14 rounded-xl border-[#66666659] focus-visible:ring-offset-0 focus-visible:ring-[transparent]"
                        />
                        {/* {!showPasswords[name] ? (
                          <FaRegEyeSlash
                            onClick={() => togglePasswordVisibility(name)}
                            className=" absolute right-2 top-1/4 text-gray-500 cursor-pointer"
                          />
                        ) : (
                          <FaRegEye
                            onClick={() => togglePasswordVisibility(name)}
                            className=" absolute right-2 top-1/4 text-gray-500 cursor-pointer"
                          />
                        )} */}
                        {!showPasswords[name] ? (
                          <div className="absolute right-4 top-4 cursor-pointer" onClick={() => togglePasswordVisibility(name)}>
                            <Image src={HideIcon} alt="eye-password" />
                          </div>
                        ) : (
                          <div className="absolute right-4 top-4 cursor-pointer" onClick={() => togglePasswordVisibility(name)}>
                            <Image src={ShowIcon} alt="eye-password" />
                          </div>
                        )}
                      </div>
                    ) : type === "textarea" ? (
                      <Textarea
                        placeholder={placeholder}
                        {...field}
                        value={field.value as string}
                      />
                    ) : type === "checkbox" ? (
                      <Checkbox
                        className=" ml-3"
                        checked={field.value as boolean}
                        onCheckedChange={field.onChange}
                      />
                    ) : type === "select" ? (
                      <SelectInput
                        control={form.control}
                        name={name}
                        options={fieldConfig.options || []}
                        isMulti={fieldConfig.isMulti}
                        placeholder={placeholder}
                      />
                    ) : null}
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
        <Link href='' className="text-base font-normal text-[#111111] font-poppins underline mt-2 text-right">Forget your password</Link>
        <Button className="mt-5" type="submit" disabled={isLoading}>
          {isLoading ? <Loader /> : "Log in"}
        </Button>
      </form>
    </Form>
  );
};

export default CustomForm;
