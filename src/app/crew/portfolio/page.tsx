"use client";
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PortfolioFormData, FormFieldConfig } from "@/types/crew";
import { portfolioFormValidationSchema } from "@/lib/validation/crew";
import { useCreatePortfolio } from "@/lib/react-query/queriesAndMutations/crew/profile";
import { DynamicForm } from "@/components/crew/DynamicForm";

const portfolioFormFields: FormFieldConfig<{ portfolios: PortfolioFormData[] }>[] = [
  {
    name: "portfolios.0.title",
    label: "Title",
    type: "text",
    placeholder: "Enter the title",
  },
  {
    name: "portfolios.0.link",
    label: "Link",
    type: "text",
    placeholder: "Enter the link",
  },
  {
    name: "portfolios.0.image",
    label: "Image",
    type: "file",
  },
  {
    name: "portfolios.0.contentTag",
    label: "Content Tag",
    type: "text",
    placeholder: "Enter the content tag",
  },
  {
    name: "portfolios.0.description",
    label: "Description",
    type: "text",
    placeholder: "Enter the description",
  },
  {
    name: "portfolios.0.providedService",
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

  const { mutateAsync, isLoading } = useCreatePortfolio();

  const onSubmit = async (data: { portfolios: PortfolioFormData[] }) => {
    console.log("Form Submitted:", data);
    //   try {
    //     await mutateAsync(data);
    //   } catch (error) {
    //     console.error("Error submitting form:", error);
    //   }
  };

  return (
    <DynamicForm
      form={form}
      formFields={portfolioFormFields}
      onSubmit={onSubmit}
      append={() => append(portfolioDefaultValue)}
      remove={remove}
      fields={fields}
      isLoading={isLoading}
      formName="portfolio"
    />
  );
};

export default Portfolio;
