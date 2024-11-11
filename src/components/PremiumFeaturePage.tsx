"use client";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form } from "./ui/form";
import RenderFormFields, { FormFieldConfig } from "./form-component/RenderFormFields";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import Loader from "./Loader";

export const FormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name must be less than 100 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  message: z
    .string()
    .min(1, { message: "Message is required" })
    .max(500, { message: "Message must be less than 500 characters" }),
});

export type FormType = z.infer<typeof FormSchema>;

export const formFields: FormFieldConfig<FormType>[] = [
  { name: "name", type: "text", placeholder: "Enter your name", label: "Name" },
  { name: "email", type: "email", placeholder: "Enter your email", label: "Email" },
  { name: "message", type: "textarea", placeholder: "Message...", label: "Message" },
];

const PremiumFeaturePage = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const isLoading = false;

  const onSubmit = () => {};

  return (
    <div className="text-center mt-12 px-4">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Premium Feature</h1>
      <p className="text-sm sm:text-md md:text-lg text-gray-600 mt-4">
        This feature is available to our premium members. Upgrade your account to access this
        feature and enjoy exclusive benefits.
      </p>
      <button
        onClick={() => setOpenDialog(!openDialog)}
        className="mt-6 px-6 py-2 bg-gradient-to-l from-[#25D765] to-[#092579]  hover:bg-gradient-to-r text-white rounded "
      >
        Contact Us
      </button>
      <Dialog open={openDialog} onOpenChange={() => setOpenDialog(!openDialog)}>
        <DialogContent className="lg:w-[800px] w-[95%] ">
          <DialogHeader>
            <DialogTitle>Contact Us</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5 justify-center flex flex-col lg:px-4"
            >
              <RenderFormFields form={form} formFields={formFields} />

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? <Loader /> : "Submit"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PremiumFeaturePage;
