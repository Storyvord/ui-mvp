"use client";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Logo from "@/assets/app-logo.svg";
import Banner from "@/assets/login-image.jpg";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";
import GoogleIcon from "@/assets/google.svg";
import AppleIcon from "@/assets/apple.svg";
import HideIcon from "@/assets/hide-eye.svg";
import ShowIcon from "@/assets/show.svg";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpFormSchema } from "@/lib/validation/auth";
import { useRegisterUser } from "@/lib/react-query/queriesAndMutations/auth/auth";
import { useToast } from "@/components/ui/use-toast";
import Loader from "@/components/Loader";

interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword: string;
  agreePolicy: boolean;
}

const SignUp = () => {
  
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const { mutateAsync: registerUser, isLoading } = useRegisterUser();
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormSchema),
  });

  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    // console.log("Form Data Submitted:", data);
    if (!isChecked) {
      toast({
        title: "You must agree to Terms of use and Privacy Policy",
        variant: "destructive",
      });
      return;
    }
    const { email, password, confirmPassword } = data;
    try {
      const res = await registerUser({ email, password, confirmPassword });
      if (res) {
        toast({
          title: "Your account has been created",
        });
        router.push("/auth/register");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Registration error:", error);
        toast({
          title: error.message,
          variant: "destructive",
        });
      } else {
        console.error("Registration error:", error);
        toast({
          title: "An unknown error occurred.",
          variant: "destructive",
        });
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  console.log(isChecked, 'checked')

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
        <div className="w-full px-5 py-4 lg:px-24 md:px-8 sm:px-8">
          <div className="md:hidden block cursor-pointer mb-10" onClick={() => router.push("/")}>
            <Image src={Logo} alt="app-logo" />
          </div>
          <h3 className="text-3xl leading-[3rem] font-medium text-[#111111] font-poppins md:text-left text-center">Create an account</h3>
          <p className="text-base font-normal text-[#111111] font-poppins">
            Already have an account? {' '}
            <Link href='/auth/sign-in' className="underline">Log in</Link>
          </p>
          <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="">
              <Label className="font-poppins font-normal text-[#666666] text-base">Email Address</Label>
              <Input type="text" {...register("email", { required: "Email is required" })}
                className="mt-1 text-base font-normal text-[#111111] font-poppins h-14 rounded-xl border-[#66666659] focus-visible:ring-offset-0 focus-visible:ring-[transparent]"
              />
              {errors.email && <p className="text-red-500 font-poppins text-sm">{errors.email.message}</p>}
            </div>
            <div className="mt-3">
              <Label className="font-poppins font-normal text-[#666666] text-base">Password</Label>
              <div className="relative">
                <Input type={showPassword ? 'text' : "password"} {...register("password")}
                  className="mt-1 text-base font-normal text-[#111111] font-poppins h-14 rounded-xl border-[#66666659] focus-visible:ring-offset-0 focus-visible:ring-[transparent]"
                />
                <div className="absolute right-4 top-4 cursor-pointer" onClick={() => togglePasswordVisibility()}>
                  <Image src={showPassword ? ShowIcon : HideIcon} alt="eye-password" />
                </div>
              </div>
              {errors.password && <p className="text-red-500 font-poppins text-sm">{errors.password.message}</p>}
              <p className="text-sm font-normal text-[#666666] font-poppins mt-1">Use 8 or more characters with a mix of letters, numbers & symbols</p>
            </div>
            <div className="mt-3">
              <Label className="font-poppins font-normal text-[#666666] text-base">Confirm Password</Label>
              <div className="relative">
                <Input type={showConfirmPassword ? 'text' : "password"} {...register("confirmPassword")}
                  className="mt-1 text-base font-normal text-[#111111] font-poppins h-14 rounded-xl border-[#66666659] focus-visible:ring-offset-0 focus-visible:ring-[transparent]"
                />
                <div className="absolute right-4 top-4 cursor-pointer" onClick={() => toggleConfirmPasswordVisibility()}>
                  <Image src={showConfirmPassword ? ShowIcon : HideIcon} alt="eye-password" />
                </div>
              </div>
              {errors.confirmPassword && <p className="text-red-500 font-poppins text-sm">{errors.confirmPassword.message}</p>}
              <p className="text-sm font-normal text-[#666666] font-poppins mt-1">Use 8 or more characters with a mix of letters, numbers & symbols</p>
            </div>
            <div className="flex items-center space-x-3 mt-4">
                <Checkbox className="data-[state=checked]:bg-white data-[state=checked]:text-[#111111] data-[state=checked]:border-[#111111] data-[state=checked]:before:text-[#111111] w-5 h-5 rounded-[5]"
                  checked={isChecked}
                  onClick={() => setIsChecked(!isChecked)}
                />
                <p className="font-poppins font-normal text-[#666666] text-sm" >
                  By creating an account, you agree to our Terms of use and Privacy Policy 
                </p>
            </div>
            <Button className="mt-6 w-full" type="submit" disabled={isLoading}>{isLoading ? <Loader /> : 'Create an account'}</Button>
            <div className="relative my-6">
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
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
