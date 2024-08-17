"use client";
import React from "react";
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
import Loader from "@/components/Loader";
import { useForm } from "react-hook-form";

const companySettingsFormField = [
  {
    name: "company-name",
    label: "Company Name",
    type: "text",
    placeholder: "company name",
  },
  {
    name: "street",
    label: "Street",
    type: "text",
    placeholder: "enter street",
  },
  {
    name: "city",
    label: "City",
    type: "text",
    placeholder: "enter city",
  },
  {
    name: "state",
    label: "State",
    type: "text",
    placeholder: "enter state",
  },
  {
    name: "postal-code",
    label: "Postal Code",
    type: "number",
    placeholder: "enter postal code",
  },
  {
    name: "country",
    label: "Country",
    type: "text",
    placeholder: "enter country",
  },
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "enter your name",
  },
  {
    name: "email",
    label: "Email",
    type: "text",
    placeholder: "enter email",
  },
  {
    name: "phone",
    label: "Phone",
    type: "number",
    placeholder: "enter phone number",
  },
  {
    name: "fax",
    label: "Fax",
    type: "number",
    placeholder: "enter fax number",
  },
];

const CompanySettings = () => {
  const isLoading = false;
  const form = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <div className="w-full space-y-8 mx-auto max-w-[650px] mt-4 lg:mt-6 lg:w-3/5 p-4 mb-8 bg-white">
      <h1 className=" sm:text-2xl font-semibold text-gray-800 text-center">Company settings</h1>
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 justify-center flex flex-col"
      >
        {companySettingsFormField.map((fieldConfig) => {
          const { name, type, label, placeholder } = fieldConfig;
          return (
            <FormField
              key={name}
              control={form.control}
              name={name}
              render={({ field }) => (
                <FormItem>
                  {name === "name" && (
                    <h2 className=" sm:text-xl mt-6 font-semibold text-gray-800 text-center">
                      Contact information
                    </h2>
                  )}
                  <FormLabel className="font-sans font-bold text-gray-600">{label}</FormLabel>
                  <FormControl>
                    <Input
                      type={type}
                      placeholder={placeholder}
                      {...field}
                      value={field.value as string} // Ensure value is string
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          );
        })}
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <Loader /> : "Save"}
        </Button>
      </form>
    </Form>
    </div>
  );
};

export default CompanySettings;
