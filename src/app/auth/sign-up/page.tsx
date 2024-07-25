"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useRegisterUser } from "@/lib/react-query/queriesAndMutations";

const userTypeOptions = [
  { value: "client", label: "client" },
  { value: "crew", label: "crew" },
];

interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword: string;
  userType: string;
}

const SignUp: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    getValues,
    control,
  } = useForm<SignUpFormData>();
  const { mutateAsync: registerUser } = useRegisterUser();

  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    setIsSubmitting(true);
    try {
      const { email, userType, password, confirmPassword } = data;
      await registerUser({ email, userType, password, confirmPassword });
      router.push("/auth/sign-in");
    } catch (err) {
      console.error(err);
      setError("root", {
        type: "manual",
        message: "Failed to create an account",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignInClick = () => {
    router.push("/auth/sign-in");
  };

  const handleLogoClick = () => {
    router.push("/");
  };

  const [selectedUserType, setSelectedUserType] = useState();

  return (
    <div className="flex min-h-screen justify-center bg-white -m-4">
      <div className="w-full max-w-sm md:mt-10">
        <div
          className="flex justify-center m-2 cursor-pointer"
          onClick={handleLogoClick}
        >
          <Image src={Logo} className=" w-44" alt="Logo" />
        </div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-4">
            <div className="space-y-4">
              <div className="">
                <Label
                  htmlFor="email"
                  className="block text-[17px] font-bold text-gray-600"
                >
                  Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Enter your email address"
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
              <div className="">
                <Label
                  htmlFor="email"
                  className="block text-[17px] font-bold text-gray-600"
                >
                  User Type
                </Label>
                <Controller
                  name="userType"
                  control={control}
                  defaultValue=""
                  rules={{ required: "This field is required" }}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="block w-full bg-white mt-1 p-2 border border-gray-300 rounded-sm"
                    >
                      <option value="" disabled>
                        Select an option
                      </option>
                      {userTypeOptions.map((option) => (
                        <option className=" text-md" key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  )}
                />

                {errors.userType && (
                  <p className=" text-red-500">{errors.userType.message}</p>
                )}
              </div>
              <div className="">
                <Label
                  htmlFor="password"
                  className="block text-[17px] font-bold text-gray-600"
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
              <div className="mb-8">
                <Label
                  htmlFor="confirmPassword"
                  className="block text-[17px] font-bold text-gray-600"
                >
                  Confirm Password
                </Label>
                <Input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm your password"
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                    validate: (value) =>
                      value === getValues().password ||
                      "Passwords do not match",
                  })}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>
            {errors.root && (
              <p className="text-red-500 text-xs mt-1">{errors.root.message}</p>
            )}
            <Button
              type="submit"
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                isSubmitting
                  ? "bg-gray-400"
                  : "bg-black hover:bg-slate-800 hover:text-white"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing Up..." : "Sign Up"}
            </Button>
          </form>
          <div className="my-4  text-center">
            <span className="text-sm text-slate-600">
              Already have an account?{" "}
              <span
                className="underline text-indigo-500 hover:text-indigo-700 cursor-pointer"
                onClick={handleSignInClick}
              >
                Sign-in
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
