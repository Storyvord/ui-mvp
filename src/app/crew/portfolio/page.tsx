"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreatePortfolio } from "@/lib/react-query/queriesAndMutations/crew/profile";
import { portfolioFormValidationSchema } from "@/lib/validation/crew";
import { PortfolioFormData, FormFieldConfig } from "@/types/crew";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";

const portfolioFormFields: FormFieldConfig<PortfolioFormData>[] = [
  {
    name: "title",
    label: "Title",
    type: "text",
    placeholder: "Enter the title",
  },
  {
    name: "link",
    label: "Link",
    type: "text",
    placeholder: "Enter the link",
  },
  {
    name: "image",
    label: "Image",
    type: "file",
  },
  {
    name: "contentTag",
    label: "Content Tag",
    type: "text",
    placeholder: "Enter the content tag",
  },
  {
    name: "description",
    label: "Description",
    type: "text",
    placeholder: "Enter the description",
  },
  {
    name: "providedService",
    label: "Provided Service",
    type: "text",
    placeholder: "Enter the provided service",
  },
];

const portfolioDefaultValue: PortfolioFormData = {
  title: "",
  link: "",
  image: null,
  contentTag: "",
  description: "",
  providedService: "",
};

const Portfolio = () => {
  const form = useForm({
    resolver: zodResolver(portfolioFormValidationSchema),
    defaultValues: {
      portfolios: [portfolioDefaultValue],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "portfolios",
  });

  const { mutateAsync, isLoading, isError } = useCreatePortfolio();

  const onSubmit = async (data: { portfolios: PortfolioFormData[] }) => {
    console.log(data);
  };

  return (
    <>
      <h1 className="text-center text-xl font-semibold text-gray-800">Create Your Portfolio</h1>
      <div className="w-full shadow-md space-y-8 mx-auto max-w-[650px] lg:mt-6 lg:w-3/5 bg-white p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {fields.map((field, index) => (
              <div key={field.id} className="space-y-4 pb-4">
                {portfolioFormFields.map((fieldConfig) => (
                  <FormField
                    key={fieldConfig.name}
                    control={form.control}
                    name={`portfolios.${index}.${fieldConfig.name}`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className=" text-md font-semibold text-gray-800">
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
                              value={field.value as string} // Ensure value is string
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
                      className=" border-2 border-red-600 w-full mt-2"
                      onClick={() => remove(index)}
                    >
                      Remove Portfolio
                    </Button>
                    <hr />
                  </>
                )}
              </div>
            ))}
            <Button
              className="w-full border-2 border-green-600 mt-2"
              variant="outline"
              onClick={() => append(portfolioDefaultValue)}
            >
              Add Portfolio
            </Button>
            <Button className="w-full mt-2" type="submit" disabled={isLoading}>
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default Portfolio;
