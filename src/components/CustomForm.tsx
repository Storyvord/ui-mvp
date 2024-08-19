"use client";
import React from "react";
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

type FormFieldConfig<TFormValues extends FieldValues> = {
  name: Path<TFormValues>;
  type: string;
  label: string;
  placeholder?: string;
};

type Props<TFormValues extends FieldValues> = {
  form: UseFormReturn<TFormValues>;
  formFields: FormFieldConfig<TFormValues>[];
  onSubmit: (data: TFormValues) => void;
  isLoading: boolean;
  isError: boolean;
};

const CustomForm = <TFormValues extends FieldValues>({
  form,
  formFields,
  onSubmit,
  isLoading,
  isError,
}: Props<TFormValues>) => {
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
                      type === "date" ||
                      "datetime-local" ? (
                      <Input
                        type={type}
                        placeholder={placeholder}
                        {...field}
                        value={field.value as string} // Ensure value is string
                      />
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
                    ) : null}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          );
        })}
        {isError && (
          <p className=" text-center text-sm text-red-600 font-semibold">
            Filed to submit your form
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
