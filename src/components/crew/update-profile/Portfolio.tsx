"use client";
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PortfolioFormData, FormFieldConfig } from "@/types/crew";
import { portfolioFormValidationSchema } from "@/lib/validation/crew";
import { useCreatePortfolio } from "@/lib/react-query/queriesAndMutations/crew/profile";
import { DynamicForm } from "@/components/crew/DynamicForm";
import { convertToBase64 } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

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
  const { toast } = useToast();

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
    const transformData = await Promise.all(
      data.portfolios.map(async (item) => {
        const base64 = await convertToBase64(item.image);
        return { ...item, image: base64, verification_type: "client_reference" };
      })
    );
    console.log(transformData);
    transformData.forEach(async (item) => {
      const res = await mutateAsync(item);
      if (res) {
        form.reset();
        toast({
          title: "Your portfolio details successfully submitted",
        });
      }
    });
  };

  return (
    <>
      <h1 className="sm:text-xl text-lg text-center text-gray-800 font-semibold mt-4">
        Portfolio Details
      </h1>
      <DynamicForm
        form={form}
        formFields={portfolioFormFields}
        onSubmit={onSubmit}
        append={() => append(portfolioDefaultValue)}
        remove={remove}
        fields={fields}
        isLoading={isLoading}
        isError={isError}
        formName="portfolios"
      />
    </>
  );
};

export default Portfolio;
