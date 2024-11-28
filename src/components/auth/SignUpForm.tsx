"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import InputField from "@/components/auth/InputField";
import PasswordField from "@/components/auth/PasswordField";
import OAuthButtons from "@/components/auth/OAuthButtons";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Loader from "@/components/Loader";
import { signUpFormSchema } from "@/lib/validation/auth";

interface SignUpFormProps {
  onSubmit: (data: any, isChecked: boolean) => Promise<void>;
  isLoading: boolean;
}

interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSubmit, isLoading }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormSchema),
  });

  const handleFormSubmit: SubmitHandler<SignUpFormData> = (data) => {
    onSubmit(data, isChecked);
  };

  return (
    <form
      className="w-full max-w-[1000px] mx-auto px-5 py-4 lg:px-24 md:px-8 sm:px-8"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <h3 className="text-3xl leading-[3rem] font-medium text-[#111111] font-poppins md:text-left text-center">
        Create an account
      </h3>
      <p className="text-base font-normal text-[#111111] font-poppins md:text-left text-center">
        Already have an account?{" "}
        <Link href="/auth/sign-in" className="underline">
          Log in
        </Link>
      </p>
      <InputField
        label="Email Address"
        type="text"
        name="email"
        register={register}
        error={errors.email}
      />
      <PasswordField
        label="Password"
        name="password"
        register={register}
        error={errors.password}
        showPassword={showPassword}
        toggleShowPassword={() => setShowPassword(!showPassword)}
      />
      <PasswordField
        label="Confirm Password"
        name="confirmPassword"
        register={register}
        error={errors.confirmPassword}
        showPassword={showConfirmPassword}
        toggleShowPassword={() => setShowConfirmPassword(!showConfirmPassword)}
      />
      <div className="flex items-center space-x-3 mt-4">
        <Checkbox checked={isChecked} onClick={() => setIsChecked(!isChecked)} />
        <p className="font-poppins font-normal text-[#666666] text-sm">
          By creating an account, you agree to our Terms of use and Privacy Policy
        </p>
      </div>
      <Button className="mt-6 w-full" type="submit" disabled={isLoading}>
        {isLoading ? <Loader /> : "Create an account"}
      </Button>
      <OAuthButtons />
    </form>
  );
};

export default SignUpForm;
