"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import Logo from "@/assets/app-logo.svg";
import { CreateProject, SelectUserType } from "./components";
import { useGetUserProfile } from "@/lib/react-query/queriesAndMutations/auth/auth";
import { cn } from "@/lib/utils";
import ClientProfileForm from "./components/ClientProfileForm";
import CreateProjectForm from "@/components/user-dashboard/dashboard/CreateProjectForm";
import { useSkipOnBoard } from "@/lib/react-query/queriesAndMutations/onBoard/onBoard";

const Register = () => {
  const router = useRouter();
  const [step, setStep] = useState<number>(1);
  const [userType, stUserType] = useState<number | null>();
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const { data: userProfile } = useGetUserProfile();
  const { mutateAsync: skipOnBoard } = useSkipOnBoard();

  // change step based on the user stage
  useEffect(() => {
    const userStage = Number(userProfile?.data.user.user_stage);
    setStep(userStage + 1);

    const completedSteps = [];

    // Populate completedSteps based on userStage
    if (userStage >= 1) completedSteps.push(1);
    if (userStage >= 2) completedSteps.push(2);

    // Set state values
    stUserType(userProfile?.data.user.user_type);
    setCompletedSteps(completedSteps);
  }, [userProfile]);

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const nextStep = () => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps([...completedSteps, step]);
    }
    setStep(step + 1);
  };

  const onSuccessStep = () => {
    nextStep();
  };

  const handleSkipOnBoard = async () => {
    await skipOnBoard();
    router.replace("/dashboard");
  };

  const StepIndicator = ({ stepNumber, label }: { stepNumber: number; label: string }) => {
    const isActive = step === stepNumber;
    const isCompleted = completedSteps.includes(stepNumber);

    return (
      <div className="w-4/12">
        <div
          className={cn(
            "flex flex-col items-center justify-center cursor-pointer relative",
            stepNumber !== 3 &&
              "after:content-[''] after:w-10/12 after:border-[#999999] after:border after:absolute after:left-[50%] after:top-[4px] after:mx-[12px] lg:after:mx-[28px] md:after:mx-[28px]"
          )}
        >
          <div
            className={cn(
              "w-5 h-5 flex items-center justify-center leading-5 rounded-full text-xs font-poppins font-normal text-[#fff] mb-2",
              isActive || isCompleted ? "bg-[#22CB67]" : "bg-[#666666]"
            )}
          >
            {stepNumber}
          </div>
          <h5
            className={cn(
              "text-xs lg:text-base md:text-base font-poppins font-normal",
              isActive || isCompleted ? "text-[#333333] font-poppins-semibold" : "text-[#666666]"
            )}
          >
            {label}
          </h5>
        </div>
      </div>
    );
  };

  return (
    <section className="px-2 lg:px-10 md:px-2 py-2 mb-6">
      <div className="cursor-pointer" onClick={() => router.push("/")}>
        <Image src={Logo} alt="app-logo" />
      </div>
      <div className="w-full mt-8">
        <div className="flex items-center justify-between mb-6 lg:mb-14 md:mb-14 px-0 lg:px-36 md:px-16">
          <StepIndicator stepNumber={1} label="Select User Type" />
          <StepIndicator stepNumber={2} label="Provide your basic info" />
          <StepIndicator
            stepNumber={3}
            label={` Create Your ${userType === 1 ? "Project" : "Portfolio"}`}
          />
        </div>
        <>
          {step === 1 && <SelectUserType userProfile={userProfile} onSuccessStep={onSuccessStep} />}
          {step === 2 && userType === 1 && (
            <ClientProfileForm prevStep={prevStep} onSuccessStep={onSuccessStep} />
          )}
          {/* {step === 3 && userType === 1 && <CreateProject prevStep={prevStep} />} */}
          {step === 3 && userType === 1 && (
            <CreateProjectForm prevStep={prevStep} handleSkipOnBoard={handleSkipOnBoard} />
          )}

          {step === 2 && userType === 2 && <div>crew profile</div>}
          {step === 3 && userType === 2 && <div>crew portfolio</div>}
        </>
      </div>
    </section>
  );
};

export default Register;
