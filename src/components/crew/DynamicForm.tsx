import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UseFormReturn, FieldValues, Path } from "react-hook-form";

export type FormFieldConfig<TFormValues extends FieldValues> = {
  name: Path<TFormValues>;
  label: string;
  type: string;
  placeholder?: string;
};

type DynamicFormProps<TFormValues extends FieldValues> = {
  form: UseFormReturn<TFormValues>;
  formFields: FormFieldConfig<TFormValues>[];
  onSubmit: (data: TFormValues) => void;
  append: () => void;
  remove: (index: number) => void;
  fields: { id: string }[];
  isLoading: boolean;
  isError: boolean;
  formName: string;
};

export const DynamicForm = <TFormValues extends FieldValues>({
  form,
  formFields,
  onSubmit,
  append,
  remove,
  fields,
  isLoading,
  isError,
  formName,
}: DynamicFormProps<TFormValues>) => {
  return (
    <div className="w-full space-y-8 mx-auto max-w-[650px] lg:mt-6 lg:w-3/5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {fields.map((field, index) => (
            <div key={field.id} className="space-y-4 pb-4 bg-white shadow-md p-4 mt-4">
              {formFields.map((fieldConfig) => (
                <FormField
                  key={fieldConfig.name as string}
                  control={form.control}
                  name={
                    `${formName}.${index}.${fieldConfig.name.split(".")[2]}` as Path<TFormValues>
                  }
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-md font-semibold text-gray-800">
                        {fieldConfig.label}
                      </FormLabel>
                      <FormControl>
                        {fieldConfig.type === "file" ? (
                          <Input
                            type="file"
                            onChange={(e) => field.onChange(e.target.files?.[0] || null)}
                          />
                        ) : (
                          <Input
                            type={fieldConfig.type}
                            placeholder={fieldConfig.placeholder}
                            {...field}
                          />
                        )}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              {fields.length > 1 && (
                <>
                  <Button
                    variant="outline"
                    className="border-2 border-red-600 w-full mt-2"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </Button>
                  <hr />
                </>
              )}
            </div>
          ))}
          {fields.length < 3 && (
            <Button
              className="w-full border-2 border-green-600 mt-2"
              variant="outline"
              onClick={append}
            >
              Add
            </Button>
          )}
          {isError && <p className=" my-2 text-center text-red-600 ">Something went wrong</p>}
          <Button className="w-full mt-2" type="submit" disabled={isLoading}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};
