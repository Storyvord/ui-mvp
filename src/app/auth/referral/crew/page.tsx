"use client";
import React, { useEffect, Suspense } from "react";
import Logo from "@/assets/logo.png";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { FormFieldConfig } from "@/types";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomForm from "@/components/CustomForm";

import { useToast } from "@/components/ui/use-toast";
import { employeeRegistrationFormSchema } from "@/lib/validation/auth";
import Loader from "@/components/Loader";
import {
  useGetReferralCrewData,
  useRegisterCrewWithReferral,
} from "@/lib/react-query/queriesAndMutations/auth/crew-referral";

type FormData = z.infer<typeof employeeRegistrationFormSchema>;

const formFields: FormFieldConfig<FormData>[] = [
  {
    name: "email",
    type: "email",
    label: "Email",
    disabled: true,
  },
  {
    name: "password",
    type: "password",
    label: "Password",
    placeholder: "Enter password",
  },
  {
    name: "confirmPassword",
    type: "password",
    label: "Confirm Password",
    placeholder: "Enter password",
  },
];
const CrewReferralRegistrationContent = () => {
  const router = useRouter();
  const { toast } = useToast();
  const handleLogoClick = () => {
    router.push("/");
  };
  const searchParams = useSearchParams();
  const projectId = searchParams.get("project_id");
  const referralCode = searchParams.get("referral_code") || "";

  const { data } = useGetReferralCrewData(referralCode);
  const { mutateAsync, isLoading, isError } = useRegisterCrewWithReferral();

  const form = useForm({
    resolver: zodResolver(employeeRegistrationFormSchema),
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  // useEffect to reset form values when data changes
  useEffect(() => {
    if (data) {
      form.reset({ email: data.crew_email, password: "", confirmPassword: "" });
    }
  }, [data, form]);

  const onSubmit = async (formData: FormData) => {
    const transFormData = {
      email: formData.email,
      password: formData.password,
      referral_code: referralCode,
      project_id: projectId,
    };
    const res = await mutateAsync(transFormData);
    if (res) {
      toast({
        title: "Registration completed",
      });
      router.push("/auth/sign-in");
    } else {
      toast({
        title: "Failed registration",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex min-h-screen justify-center bg-white -m-4">
      <div className="w-full max-w-sm md:mt-10 p-4">
        <div className="flex justify-center cursor-pointer" onClick={handleLogoClick}>
          <Image src={Logo} className=" w-44" alt="Logo" />
        </div>
        <h1 className=" text-center text-md text-gray-600 mb-4">Crew Registration with referral</h1>

        <CustomForm
          form={form}
          formFields={formFields}
          onSubmit={onSubmit}
          isLoading={isLoading}
          isError={isError}
        />
      </div>
    </div>
  );
};

const CrewReferralRegistration = () => (
  <Suspense
    fallback={
      <div className=" w-full p-4 mt-8 flex- justify-center">
        <Loader />
      </div>
    }
  >
    <CrewReferralRegistrationContent />
  </Suspense>
);

export default CrewReferralRegistration;
