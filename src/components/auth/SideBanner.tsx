"use client";
import Image from "next/image";
import Logo from "@/assets/app-logo.svg";
import Banner from "@/assets/login-image.jpg";
import { useRouter } from "next/navigation";

const SideBanner = () => {
  const router = useRouter();

  return (
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
  );
};

export default SideBanner;
