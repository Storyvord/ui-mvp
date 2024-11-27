"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import Cookies from "js-cookie";

import Logo from "@/assets/app-logo.svg";
import Banner from "@/assets/login-image.jpg";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import GoogleIcon from "@/assets/google.svg";
import AppleIcon from "@/assets/apple.svg";
import HideIcon from "@/assets/hide-eye.svg";
import ShowIcon from "@/assets/show.svg";

import { signinFormSchema } from "@/lib/validation/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserSignIn } from "@/lib/react-query/queriesAndMutations/auth/auth";
import Loader from "@/components/Loader";
import { toast } from "@/components/ui/use-toast";

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { mutateAsync: loginUser } = useUserSignIn();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signinFormSchema),
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit: SubmitHandler<SignInFormData> = async (data: {
    email: string;
    password: string;
  }) => {
    try {
      setIsLoading(true);
      const res = await loginUser(data);
      if (res) {
        // user_type === 1  Represents a client
        // user_type === 2  Represents a crew member

        // When the user registers, set userStage to 0
        // After the user selects a userType, set userStage to 1
        // Once the user updates their profile, set userStage to 2

        const { user_type, user_stage, steps } = res?.data;
        if (user_type === 1 && steps) {
          Cookies.set("isClient", "true");
          router.push("/dashboard");
        } else if (user_type === 2 && steps) {
          Cookies.set("isClient", "false");
          router.push("/crew/home");
        } else if (!steps) {
          router.push("/auth/onboard");
        }
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      // Check if error is an instance of Error
      if (error instanceof Error) {
        toast({
          title: error.message,
          variant: "destructive",
        });
        console.log(error.message, "error message");
      } else {
        // Handle unknown error case
        toast({
          title: "An unexpected error occurred",
          variant: "destructive",
        });
        console.log("Unknown error", error);
      }
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
              We help shoot content <br /> anywhere in the{" "}
              <span className="text-3xl font-normal text-white bg-[#22CB67] pl-1 pr-1">World</span>
            </h2>
          </div>
        </div>
      </div>
      <div className="md:w-6/12 md:h-screen h-full w-full flex items-center justify-center">
        <div className="w-full px-5 py-4 lg:px-24 md:px-8 sm:px-8">
          <div className="md:hidden block cursor-pointer mb-10" onClick={() => router.push("/")}>
            <Image src={Logo} alt="app-logo" />
          </div>
          <h3 className="text-3xl leading-[3rem] font-medium text-[#111111] font-poppins md:text-left text-center">
            Log in
          </h3>
          <p className="text-base font-normal text-[#111111] font-poppins">
            Don’t have an ccount?{" "}
            <Link href="/auth/sign-up" className="underline">
              Sign up
            </Link>
          </p>
          <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
            <div className="">
              <Label className="font-poppins font-normal text-[#666666] text-base">
                Your email
              </Label>
              <Input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="mt-1 text-base font-normal text-[#111111] font-poppins h-14 rounded-xl border-[#66666659] focus-visible:ring-offset-0 focus-visible:ring-[transparent]"
              />
              {/* {errors.email && <span className="text-red-500 font-poppins text-sm">{errors.email.message}</span>} */}
            </div>
            <div className="mt-6">
              <Label className="font-poppins font-normal text-[#666666] text-base">
                Your Password
              </Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  {...register("password", { required: "Password is required" })}
                  className="mt-1 text-base font-normal text-[#111111] font-poppins h-14 rounded-xl border-[#66666659] focus-visible:ring-offset-0 focus-visible:ring-[transparent]"
                />
                {errors.password && (
                  <span className="text-red-500 font-poppins text-sm">
                    {errors.password.message}
                  </span>
                )}
                <div
                  className="absolute right-4 top-4 cursor-pointer"
                  onClick={() => togglePasswordVisibility()}
                >
                  <Image src={showPassword ? ShowIcon : HideIcon} alt="eye-password" />
                </div>
              </div>
            </div>
            <div className="mt-2 text-right">
              <Link
                href="/auth/forget-password"
                className="underline text-base font-normal text-[#111111] font-poppins"
              >
                Forget your password
              </Link>
            </div>
            <Button className="mt-6 w-full" type="submit" disabled={isLoading}>
              {isLoading ? <Loader /> : "Log in"}
            </Button>
            <div className="relative my-10">
              <div className="border border-[#66666659]" />
              <p className="absolute bg-white separator-text text-xl font-normal text-[#666666] font-poppins">
                OR
              </p>
            </div>
            <Button className="w-full cursor-not-allowed" disabled variant="iconButton">
              <Image className="mr-2 h-6 w-6" src={GoogleIcon} alt="google-icon" />
              Log in with Google
            </Button>
            <Button className="mt-5 w-full cursor-not-allowed" disabled variant="iconButton">
              <Image className="mr-2 h-6 w-6" src={AppleIcon} alt="apple-icon" />
              Continue with Apple
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
