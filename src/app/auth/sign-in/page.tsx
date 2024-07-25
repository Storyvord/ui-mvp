"use client";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Logo from "@/assets/logo.png";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useGetUserDetails,
  useUserSignIn,
} from "@/lib/react-query/queriesAndMutations";
import { useUser } from "@/context/UserContext";
import { getUserDetails } from "@/lib/api/api";
import Cookies from 'js-cookie';


interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignInFormData>({
    defaultValues: {
      email: "souvik@storyvord.com",
      password: "string@123",
    },
  });
  const { mutateAsync: loginUser } = useUserSignIn();

  const { data: userDetails } = useGetUserDetails();
  const { setUserDetails } = useUser();
  useEffect(() => {
    if (userDetails) {
      setUserDetails(userDetails);
    }
  }, [userDetails, setUserDetails]);

  const onSubmit: SubmitHandler<SignInFormData> = async (data) => {
    setIsSubmitting(true);
    try {
      await loginUser(data);
      router.push("/dashboard/home");
    } catch (err) {
      console.error(err);
      setError("root", { type: "manual", message: "Failed to sign in" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignUpClick = () => {
    router.push("/auth/sign-up");
  };

  const handleLogoClick = () => {
    router.push("/");
  };

  return (
    <div className="flex min-h-screen  justify-center bg-white -m-4">
      <div className="w-full max-w-sm md:mt-10">
        <div
          className="flex justify-center m-2 cursor-pointer"
          onClick={handleLogoClick}
        >
          <Image src={Logo} className=" w-44" alt="Logo" />
        </div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-4">
            <div className="rounded-md shadow-sm space-y-4">
              <div className="mb-4">
                <Label
                  htmlFor="email"
                  className="block  text-[17px] font-bold text-gray-600"
                >
                  Email
                </Label>
                <Input
                  type="text"
                  id="username"
                  placeholder="Enter your username"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <Label
                  htmlFor="password"
                  className="block  text-[17px] font-bold text-gray-600"
                >
                  Password
                </Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
            {errors.root && (
              <p className="text-red-500 text-center mt-1">
                {errors.root.message}
              </p>
            )}
            <Button
              variant="outline"
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm  font-medium text-white ${
                isSubmitting
                  ? "bg-gray-400"
                  : "bg-black hover:bg-slate-800 hover:text-white"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
            </Button>
          </form>
          <div className="mt-4 mb-4 text-center text-sm md:text-normal">
            <span className=" text-slate-600">
              Don&apos;t have an account yet?{" "}
              <span
                className="underline text-indigo-500 hover:text-indigo-700 cursor-pointer"
                onClick={handleSignUpClick}
              >
                Create Account
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
