"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Logo from "@/assets/app-logo.svg";
import Cookies from "js-cookie";
import { signinFormSchema } from "@/lib/validation/auth";
import { FormFieldConfig } from "@/types";
import { z } from "zod";
import CustomForm from "@/components/CustomForm";
import { zodResolver } from "@hookform/resolvers/zod";
import Banner from "@/assets/login-image.jpg";
import { useUserSignIn } from "@/lib/react-query/queriesAndMutations/auth/auth";
import { getUserDetails } from "@/lib/api/auth/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import GoogleIcon from "@/assets/google.svg";
import AppleIcon from "@/assets/apple.svg";

interface SignInFormData {
  email: string;
  password: string;
}

type FormSchemaType = z.infer<typeof signinFormSchema>;

const formFields: FormFieldConfig<FormSchemaType>[] = [
  {
    name: "email",
    label: "Your email",
    type: "email",
    placeholder: "Enter your email",
  },
  {
    name: "password",
    label: "Your password",
    type: "password",
    placeholder: "Enter password",
  },
  {
    name: "forgetPassword",
    label: '',
    title: "Forget your password",
    type: "link",
    routeTo: '#',
  },
];

const SignIn = () => {
  const router = useRouter();

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signinFormSchema),
  });
  const { mutateAsync: loginUser, error, isError, isLoading } = useUserSignIn();
  // const buttonLabel = 'Log in';
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
    <section className="flex h-screen justify-between">
      <div className="w-6/12">
        <div className="relative">
          <div className="absolute top-6 left-10 cursor-pointer" onClick={() => router.push("/")}>
            <Image src={Logo} alt="app-logo" />
          </div>
          <Image src={Banner} className="h-screen object-cover" alt="login-image" />
          <div className="absolute bottom-6 left-10">
            <h2 className="text-3xl leading-[3rem] font-normal text-[#111111] font-poppins">
              We help shoot content <br /> anywhere in the {' '}
              <span className="text-3xl font-normal text-white bg-[#22CB67] pl-1 pr-1">World</span>
            </h2>
          </div>
        </div>
      </div>
      <div className="h-screen w-6/12 flex items-center justify-center">
        <div className="w-full px-24 py-4">
          <h3 className="text-3xl leading-[3rem] font-medium text-[#111111] font-poppins">Log in</h3>
          <p className="text-base font-normal text-[#111111] font-poppins">
            Don’t have an ccount? {' '}
            <Link href='/auth/sign-up' className="underline">Sign up</Link>
          </p>
          <div className="mt-2">
            <CustomForm
              form={form}
              formFields={formFields}
              onSubmit={onSubmit}
              isLoading={isLoading}
              isError={isError}
              error={error}
              // buttonLabel={'Log in'}
            />
            {/* <div className="mt-4 mb-4 text-center text-sm md:text-normal">
              <span className=" text-slate-600">
                Don&apos;t have an account yet?{" "}
                <span
                  className="underline font-semibold ml-1 text-indigo-500 hover:text-indigo-700 cursor-pointer"
                  onClick={() => router.push("/auth/sign-up")}
                >
                  Create Account
                </span>
              </span>
            </div> */}
            <div className="relative my-10">
              <div className="border border-[#66666659]" />
              <p className="absolute bg-white separator-text text-xl font-normal text-[#666666] font-poppins">OR</p>
            </div>
            <Button className="w-full" type="submit" variant='iconButton'>
              <Image className="mr-2 h-6 w-6" src={GoogleIcon} alt="google-icon" />
              Log in with Google
            </Button>
            <Button className="mt-5 w-full" type="submit" variant='iconButton'>
              <Image className="mr-2 h-6 w-6" src={AppleIcon} alt="apple-icon" />
              Continue with Apple
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
