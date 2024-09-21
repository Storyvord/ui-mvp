"use client";
import React, { useEffect } from "react";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import RenderFormFields from "@/components/RenderFormFields";
import { Button } from "@/components/ui/button";

import { CallSheetFormSchema } from "@/lib/validation";
import Loader from "@/components/Loader";
import { defaultValues, formFields } from "@/constant/formFields/callSheet";
import RenderDynamicFormFields from "@/components/RenderDynamicFormFields";

export type ShootFormType = z.infer<typeof CallSheetFormSchema>;

type Props = {
  submitHandler: (data: ShootFormType) => void;
  isError: boolean;
  isLoading: boolean;
  defaultValue?: any;
  isEdit?: boolean;
  error?: any;
};
const CallSheetForm = ({
  submitHandler,
  isLoading,
  isError,
  isEdit,
  error,
  defaultValue,
}: Props) => {
  const form = useForm({
    resolver: zodResolver(CallSheetFormSchema),
    defaultValues,
  });

  const onSubmit = (data: ShootFormType) => {
    submitHandler(data);
  };

  useEffect(() => {
    if (defaultValue) form.reset(defaultValue);
  }, [form, defaultValue]);

  return (
    <div className="bg-white p-6 rounded-md w-[90%] max-w-7xl mx-auto mt-4 overflow-auto">
      <div className="flex justify-between items-center pb-2 mb-4 border-b">
        <h2 className="text-2xl font-medium">{isEdit ? "Update" : "Create"} call sheet</h2>
      </div>
      <main>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 justify-center flex flex-col"
          >
            <section className=" grid grid-cols-1 sm:grid-cols-2 gap-2">
              <RenderFormFields form={form} formFields={formFields.slice(0, 7)} />
            </section>
            {/* Render fields dynamically */}
            <RenderDynamicFormFields
              form={form}
              title="Event Details"
              name="events"
              formFields={formFields.slice(7, 9)}
              defaultValue={defaultValues.events[0]}
            />

            <RenderDynamicFormFields
              form={form}
              title="Add People"
              name="call_time"
              formFields={formFields.slice(9, 15)}
              defaultValue={defaultValues.call_time[0]}
            />

            <section className=" grid grid-cols-1 sm:grid-cols-2 gap-2">
              <RenderFormFields form={form} formFields={formFields.slice(15, 18)} />
            </section>

            {isError && (
              <p className="text-center text-sm text-red-600 font-semibold">
                {error?.detail}
                <br />
              </p>
            )}

            {isEdit ? (
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? <Loader /> : "Update"}
              </Button>
            ) : (
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? <Loader /> : "Submit"}
              </Button>
            )}
          </form>
        </Form>
      </main>
    </div>
  );
};

export default CallSheetForm;
