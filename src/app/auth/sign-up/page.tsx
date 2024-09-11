"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Logo from "@/assets/app-logo.svg";
import { FormFieldConfig } from "@/types";
import { z } from "zod";
import { signUpFormSchema } from "@/lib/validation/auth";
import CustomForm from "@/components/CustomForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { useRegisterUser } from "@/lib/react-query/queriesAndMutations/auth/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import GoogleIcon from "@/assets/google.svg";
import AppleIcon from "@/assets/apple.svg";
import Banner from "@/assets/signup-image.jpg";

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
  // {
  //   name: "userType",
  //   label: "User Type",
  //   type: "select",
  //   options: userTypeOptions,
  // },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter password",
    note: 'Use 8 or more characters with a mix of letters, numbers & symbols',
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    placeholder: "Enter confirm password",
    note: 'Use 8 or more characters with a mix of letters, numbers & symbols',
  },
  {
    name: "agreePolicy",
    label: '',
    title: "By creating an account, you agree to our Terms of use and Privacy Policy ",
    type: "checkbox",
  },
];

interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword: string;
  userType: string;
  agreePolicy: boolean;
}

const SignUp: React.FC = () => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormSchema),
  });
  const { mutateAsync: registerUser, isLoading, isError, error } = useRegisterUser();

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
    <section className="flex md:h-screen h-full justify-between">
      <div className="md:w-6/12 md:block hidden">
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
      <div className="md:w-6/12 md:h-screen h-full w-full flex items-center justify-center">
        <div className="w-full md:px-24 px-5 py-4">
          <div className="md:hidden block cursor-pointer mb-10" onClick={() => router.push("/")}>
            <Image src={Logo} alt="app-logo" />
          </div>
          <h3 className="text-3xl leading-[3rem] font-medium text-[#111111] font-poppins">Create an account</h3>
          <p className="text-base font-normal text-[#111111] font-poppins">
            Already have an account? {' '}
            <Link href='/auth/sign-in' className="underline">Log in</Link>
          </p>
          <div className="mt-2">
            <CustomForm
              form={form}
              formFields={formFields}
              onSubmit={onSubmit}
              isLoading={isLoading}
              isError={isError}
              error={error}
              // buttonLabel={'Create an account'}
            />
            <div className="relative my-7">
              <div className="border border-[#66666659]" />
              <p className="absolute bg-white separator-text text-xl font-normal text-[#666666] font-poppins">OR</p>
            </div>
            <Button className="w-full" type="submit" variant='iconButton'>
              <Image className="mr-2 h-6 w-6" src={GoogleIcon} alt="google-icon" />
              Log in with Google
            </Button>
            <Button className="mt-3 w-full" type="submit" variant='iconButton'>
              <Image className="mr-2 h-6 w-6" src={AppleIcon} alt="apple-icon" />
              Continue with Apple
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
