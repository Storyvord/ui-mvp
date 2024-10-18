"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Logo from "@/assets/app-logo.svg";
import Banner from "@/assets/login-image.jpg";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";

const ForgetPassword = () => {
  const router = useRouter();

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
          <h3 className="text-3xl leading-[3rem] font-medium text-[#111111] font-poppins md:text-left text-center">Recover your password</h3>
          <p className="text-base font-normal text-[#666666] font-poppins md:text-left text-center">
            Enter the email that you used when you signed up to recover your password. You will receive a password reset OTP.
          </p>
          <form className="mt-10">
            <div className="">
              <Label className="font-poppins font-normal text-[#666666] text-base">Your email</Label>
              <Input type="text"
                className="mt-1 text-base font-normal text-[#111111] font-poppins h-14 rounded-xl border-[#66666659] focus-visible:ring-offset-0 focus-visible:ring-[transparent]"
              />
            </div>
            <div className="mt-2 text-right">
              <Button disabled className="font-poppins font-normal text-[#fff] rounded-[50px] text-base px-3 py-2 h-auto" type="submit">Get OTP</Button>
            </div>
            <div className="mt-2">
              <Label className="font-poppins font-normal text-[#666666] text-base">Enter OTP</Label>
              <Input type="number"
                className="mt-1 text-base font-normal text-[#111111] font-poppins h-14 rounded-xl border-[#66666659] focus-visible:ring-offset-0 focus-visible:ring-[transparent]"
              />
            </div>
            <Button className="mt-6 w-full" type="submit">Submit</Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgetPassword;
