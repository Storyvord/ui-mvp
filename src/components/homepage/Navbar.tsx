"use client";

import { useGetUserProfile } from "@/lib/react-query/queriesAndMutations/auth/auth";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const { data: userDetails } = useGetUserProfile();

  return (
    <nav className="flex items-center justify-between gap-2 relative bg-[#04052e] p-4">
      <div className="flex items-center">
        <Image
          width={149}
          height={48}
          src="https://storyvord.com/img/logo.svg"
          alt="Logo"
          className="h-12 mr-4 lg:ml-24"
        />
      </div>

      <button className="bg-gradient-to-r from-[#03256c] to-green-500 text-white font-josefin font-[15px] px-4 py-1.5 xsm:px-10 lg:mr-24">
        {/* stage 2 = Onboarding process completed */}
        {userDetails?.data?.user?.user_stage === "2" && (
          // user_type === 1  Represents a client
          // user_type === 2  Represents a crew member
          <Link href={userDetails?.data?.user?.user_type === 1 ? "/dashboard" : "/crew/home"}>
            Dashboard
          </Link>
        )}
        {userDetails && userDetails?.data?.user?.user_stage !== "2" && (
          <Link href="/auth/onboard">Complete Onboarding</Link>
        )}
        {!userDetails && <Link href="/auth/sign-in">Login</Link>}
      </button>
    </nav>
  );
};

export default Navbar;
