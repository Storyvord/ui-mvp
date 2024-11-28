"use client";
import React from "react";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import Loader from "@/components/Loader";
import InputField from "@/components/auth/InputField";
import PasswordField from "@/components/auth/PasswordField";
import OAuthButtons from "@/components/auth/OAuthButtons";
import { signinFormSchema } from "@/lib/validation/auth";

export type SignInFormData = {
  email: string;
  password: string;
};

type SignInFormProps = {
  onSubmit: (data: SignInFormData) => Promise<void>;
  isLoading: boolean;
};

const SignInForm: React.FC<SignInFormProps> = ({ onSubmit, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signinFormSchema),
  });

  const handleFormSubmit: SubmitHandler<SignInFormData> = (data) => {
    onSubmit(data);
  };

  return (
    <form
      className="w-full max-w-[1000px] mx-auto px-5 py-4 lg:px-24 md:px-8 sm:px-8"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <h3 className="text-3xl leading-[3rem] font-medium text-[#111111] font-poppins md:text-left text-center">
        Log in
      </h3>
      <p className="text-base font-normal text-[#111111] font-poppins md:text-left text-center">
        Don&apos;t have an account?{" "}
        <Link href="/auth/sign-up" className="underline">
          Sign up
        </Link>
      </p>
      <InputField
        label="Your Email"
        type="email"
        name="email"
        register={register}
        error={errors.email}
      />
      <PasswordField
        label="Your Password"
        name="password"
        register={register}
        error={errors.password}
      />
      <div className="mt-2 text-right">
        <Link
          // href="/auth/forget-password"
          href="#"
          className="underline text-base font-normal text-[#111111] font-poppins"
        >
          Forget your password
        </Link>
      </div>
      <Button className="mt-6 w-full" type="submit" disabled={isLoading}>
        {isLoading ? <Loader /> : "Log in"}
      </Button>
      <OAuthButtons />
    </form>
  );
};

export default SignInForm;
