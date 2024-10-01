"use client";
import React, { useState } from "react";
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

const SignIn = () => {

  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

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
          <h3 className="text-3xl leading-[3rem] font-medium text-[#111111] font-poppins md:text-left text-center">Log in</h3>
          <p className="text-base font-normal text-[#111111] font-poppins">
            Don’t have an ccount? {' '}
            <Link href='/auth/sign-up' className="underline">Sign up</Link>
          </p>
          <form className="mt-10">
            <div className="">
              <Label className="font-poppins font-normal text-[#666666] text-base">Your email</Label>
              <Input type="text"
                className="mt-1 text-base font-normal text-[#111111] font-poppins h-14 rounded-xl border-[#66666659] focus-visible:ring-offset-0 focus-visible:ring-[transparent]"
              />
            </div>
            <div className="mt-6">
              <Label className="font-poppins font-normal text-[#666666] text-base">Your Password</Label>
              <div className="relative">
                <Input type={showPassword ? 'text' : "password"}
                  className="mt-1 text-base font-normal text-[#111111] font-poppins h-14 rounded-xl border-[#66666659] focus-visible:ring-offset-0 focus-visible:ring-[transparent]"
                />
                <div className="absolute right-4 top-4 cursor-pointer" onClick={() => togglePasswordVisibility()}>
                  <Image src={showPassword ? ShowIcon : HideIcon} alt="eye-password" />
                </div>
              </div>
            </div>
            <div className="mt-2 text-right">
                <Link href='/auth/forget-password' className="underline text-base font-normal text-[#111111] font-poppins">Forget your password</Link>
            </div>
            <Button className="mt-6 w-full" type="submit">Log in</Button>
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
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
