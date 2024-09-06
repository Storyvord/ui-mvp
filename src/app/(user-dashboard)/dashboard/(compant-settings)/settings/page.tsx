"use client";
import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { companySettingsSchema } from "@/lib/validation/company";
import { z } from "zod";
import { FormFieldConfig } from "@/types";
import CustomForm from "@/components/CustomForm";
import {
  useGetCompanySettings,
  useUpdateCompanySettings,
} from "@/lib/react-query/queriesAndMutations/company/settings";
import { countryName } from "@/constant/countryName";

// Infer CompanySettings type from schema
type CompanySettings = z.infer<typeof companySettingsSchema>;

const companySettingsFormField: FormFieldConfig<CompanySettings>[] = [
  {
    name: "company_name",
    label: "Company Name",
    type: "text",
    placeholder: "company name",
  },
  {
    name: "company_logo",
    label: "Company Logo",
    type: "file",
  },
  {
    name: "street",
    label: "Street",
    type: "text",
    placeholder: "enter street",
  },
  {
    name: "cityandstate",
    label: "City and State",
    type: "text",
    placeholder: "enter city and state",
  },
  {
    name: "postalcode",
    label: "Postal Code",
    type: "text",
    placeholder: "enter postal code",
  },
  {
    name: "country",
    label: "Country",
    type: "select",
    options: countryName,
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
    type: "text",
    placeholder: "enter phone number",
  },
  {
    name: "fax",
    label: "Fax",
    type: "text",
    placeholder: "enter fax number",
  },
];

const defaultValues = {
  company_name: "",
  company_logo: null,
  street: "",
  cityandstate: "",
  postalcode: "",
  country: "",
  name: "",
  email: "",
  phone: "",
  fax: "",
};

const CompanySettings = () => {
  const { data } = useGetCompanySettings();
  const { mutateAsync, isLoading, isError } = useUpdateCompanySettings();

  const form = useForm<CompanySettings>({
    resolver: zodResolver(companySettingsSchema),
    defaultValues,
    mode: "onChange",
  });

  // useEffect to reset form values when data changes
  useEffect(() => {
    if (data) {
      form.reset({
        company_name: data.company_name || "",
        company_logo: data.company_logo || null,
        street: data.street || "",
        cityandstate: data.cityandstate || "",
        postalcode: data.postalcode || 0,
        country: data.country || "",
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || 0,
        fax: data.fax || 0,
      });
    }
  }, [data, form]);

  const onSubmit: SubmitHandler<CompanySettings> = async (formData) => {
    await mutateAsync(formData);
  };

  return (
    <div className="w-full space-y-8 mx-auto max-w-[650px] mt-4 lg:mt-6 lg:w-3/5 p-4 mb-8 bg-white">
      <h1 className="sm:text-2xl font-semibold text-gray-800 text-center">Company settings</h1>
      <CustomForm
        form={form}
        formFields={companySettingsFormField}
        onSubmit={onSubmit}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
};

export default CompanySettings;
