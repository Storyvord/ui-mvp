"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PortfolioFormData, FormFieldConfig } from "@/types/crew";
import { portfolioFormValidationSchema } from "@/lib/validation/crew";

import { Form } from "@/components/ui/form";
import RenderFormFields from "@/components/form-component/RenderFormFields";
import { Button } from "@/components/ui/button";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Loader from "@/components/Loader";

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
    type: "textarea",
    placeholder: "Enter the description",
  },
  {
    name: "providedService",
    label: "Provided Service",
    type: "text",
    placeholder: "Enter the provided service",
  },
];

const defaultValues: PortfolioFormData = {
  title: "",
  link: "",
  image: null,
  contentTag: "",
  description: "",
  providedService: "",
};

type Props = {
  prevStep: () => void;
  handleSkipOnBoard: () => void;
};

const CrewPortfolio = ({ prevStep, handleSkipOnBoard }: Props) => {
  const form = useForm({
    resolver: zodResolver(portfolioFormValidationSchema),
    defaultValues,
  });

  const onSubmit = async (data: PortfolioFormData) => {
    handleSkipOnBoard();
  };
  const isError = false;
  const isPending = false;

  return (
    <div className="w-full lg:w-3/5 mx-auto">
      <h1 className="text-center md:mt-1 sm:text-3xl text-xl font-poppins-semibold">Portfolio</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 justify-center flex flex-col w-full"
        >
          <section>
            <RenderFormFields form={form} formFields={portfolioFormFields} />
          </section>

          {isError && (
            <p className="text-center text-sm text-red-600 font-semibold">
              {/* {error?.detail} */}
              <br />
            </p>
          )}
          <Button type="submit" disabled={isPending} className="flex items-center gap-3">
            {isPending ? <Loader /> : "Submit"} <FaArrowRight />
          </Button>
        </form>
      </Form>
      <div className=" flex justify-between mt-6">
        <Button variant="outline" onClick={() => prevStep()}>
          Back
        </Button>
        <Button variant="outline" onClick={() => handleSkipOnBoard()}>
          Skip
        </Button>
      </div>
    </div>
  );
};

export default CrewPortfolio;
