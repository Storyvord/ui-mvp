"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { FormFieldConfig } from "@/types";
import { signUpFormSchema } from "@/lib/validation/auth";
import CustomForm from "@/components/CustomForm";
import { useRegisterUser } from "@/lib/react-query/queriesAndMutations/auth/auth";
import Logo from "@/assets/logo.png";

const userTypeOptions = [
  { value: "client", label: "client" },
  { value: "crew", label: "crew" },
];
type FormSchemaType = z.infer<typeof signUpFormSchema>;

const formFields: FormFieldConfig<FormSchemaType>[] = [
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
  },
  {
    name: "userType",
    label: "User Type",
    type: "select",
    options: userTypeOptions,
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter password",
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    placeholder: "Enter confirm password",
  },
];

interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword: string;
  userType: string;
}

const SignUp: React.FC = () => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormSchema),
  });
  const { mutateAsync: registerUser, isPending, isError, error } = useRegisterUser();

  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    const { email, userType, password, confirmPassword } = data;
    const res = await registerUser({ email, userType, password, confirmPassword });
    if (res) {
      toast({
        title: "Your account has been created",
      });
      router.push("/auth/sign-in");
    }
  };

  return (
    <section className="flex min-h-screen  justify-center bg-white -m-4">
      <div className="w-full m-4 max-w-sm md:mt-10 px-4 sm:px-0">
        <Link href="/" className="flex justify-center m-2 cursor-pointer">
          <Image src={Logo} className=" w-44" alt="Logo" />
        </Link>
        <div>
          <CustomForm
            form={form}
            formFields={formFields}
            onSubmit={onSubmit}
            isLoading={isPending}
            isError={isError}
            error={error}
          />
          <div className="my-4  text-center">
            <span className="text-sm text-slate-600">
              Already have an account?
              <Link
                href="/auth/sign-in"
                className="underline font-semibold ml-1 text-indigo-500 hover:text-indigo-700 cursor-pointer"
              >
                Sign-in
              </Link>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
