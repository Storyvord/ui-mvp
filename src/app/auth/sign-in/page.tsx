"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Logo from "@/assets/logo.png";
import Cookies from "js-cookie";
import { signinFormSchema } from "@/lib/validation/auth";
import { FormFieldConfig } from "@/types";
import { z } from "zod";
import CustomForm from "@/components/CustomForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserSignIn } from "@/lib/react-query/queriesAndMutations/auth/auth";
import { getUserDetails } from "@/lib/api/auth/auth";

interface SignInFormData {
  email: string;
  password: string;
}

type FormSchemaType = z.infer<typeof signinFormSchema>;

const formFields: FormFieldConfig<FormSchemaType>[] = [
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter password",
  },
];

const SignIn = () => {
  const router = useRouter();

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signinFormSchema),
  });
  const { mutateAsync: loginUser, error, isError, isLoading } = useUserSignIn();
  const onSubmit: SubmitHandler<SignInFormData> = async (data) => {
    try {
      const res = await loginUser(data);
      if (res) {
        const token: any = Cookies.get("accessToken");
        const userDetails = await getUserDetails(token);

        if (userDetails) {
          localStorage.setItem("user-details", JSON.stringify(userDetails));
          if (userDetails.user_type === "client") {
            Cookies.set("isClient", "true");
            router.push("/dashboard/home");
          } else if (userDetails.user_type === "crew") {
            Cookies.set("isClient", "false");
            router.push("/crew/home");
          }
        }
      }
    } catch (err) {
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
    }
  };

  return (
    <section className="flex min-h-screen  justify-center bg-white -m-4">
      <div className="w-full m-4 max-w-sm md:mt-10 px-4 sm:px-0">
        <div className="flex justify-center m-2 cursor-pointer" onClick={() => router.push("/")}>
          <Image src={Logo} className=" w-44" alt="Logo" />
        </div>
        <CustomForm
          form={form}
          formFields={formFields}
          onSubmit={onSubmit}
          isLoading={isLoading}
          isError={isError}
          error={error}
        />
        <div>
          <div className="mt-4 mb-4 text-center text-sm md:text-normal">
            <span className=" text-slate-600">
              Don&apos;t have an account yet?{" "}
              <span
                className="underline font-semibold ml-1 text-indigo-500 hover:text-indigo-700 cursor-pointer"
                onClick={() => router.push("/auth/sign-up")}
              >
                Create Account
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
