"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Logo from "@/assets/app-logo.svg";
import { BasicInfo, CreateProject, SelectUserType } from "./components";

const Register = () => {
  const router = useRouter();
  const [step, setStep] = useState<number>(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const nextStep = () => {
    setStep(step + 1);
  };

  const goToStep = (stepNumber: number) => {
    setStep(stepNumber);
  };

  const markStepAsCompleted = (stepNumber: number) => {
    if (!completedSteps.includes(stepNumber)) {
      setCompletedSteps([...completedSteps, stepNumber]);
    }
  };

  const handleSubmit = () => {
    console.log('Form submitted!');
  }

  const StepLabel = ({ children, onClick }: {
    children: React.ReactNode;
    active: boolean;
    completed: boolean;
    onClick: () => void;
  }) => {
    return (
        <div className="w-4/12" onClick={onClick}>
          {children}
        </div>
    );
  };

  console.log(completedSteps, 'completedSteps')

  return (
    <section className="px-2 lg:px-10 md:px-2 py-2">
      <div className="cursor-pointer" onClick={() => router.push("/")}>
        <Image src={Logo} alt="app-logo" />
        </div>
      <div className="w-full mt-8">
        <div className="flex items-center justify-between mb-6 lg:mb-14 md:mb-14 px-0 lg:px-36 md:px-16">
            <StepLabel active={step === 1} completed={completedSteps.includes(1)} onClick={() => goToStep(1)}>
                <div className="flex flex-col items-center justify-center cursor-pointer relative after:content-[''] after:w-10/12 after:border-[#999999] after:border after:absolute after:left-[50%] after:top-[4px] after:mx-[12px] lg:after:mx-[28px] md:after:mx-[28px]">
                    <div className={`${step === 1 ? "bg-[#22CB67]" : "bg-[#666666]"} w-5 h-5 leading-5 rounded-full text-center text-xs font-poppins font-normal text-[#fff] mb-2`}>1</div>
                    <h5 className={`${step === 1 ? "text-[#333333]" : "text-[#666666]"} text-xs lg:text-base md:text-base font-poppins font-normal`}>Select User Type</h5>
                </div>
            </StepLabel>
            <StepLabel active={step === 2} completed={completedSteps.includes(2)} onClick={() => goToStep(2)}>
                <div className="flex flex-col items-center justify-center cursor-pointer relative after:content-[''] after:w-10/12 after:border-[#999999] after:border after:absolute after:left-[50%] after:top-[4px] after:mx-[12px] lg:after:mx-[28px] md:after:mx-[28px]">
                    <div className={`${step === 2 ? "bg-[#22CB67]" : "bg-[#666666]"} w-5 h-5 leading-5 rounded-full text-center text-xs font-poppins font-normal text-[#fff] mb-2`}>2</div>
                    <h5 className={`${step === 2 ? "text-[#333333]" : "text-[#666666]"} text-xs lg:text-base md:text-base font-poppins font-normal`}>Provide your basic info</h5>
                </div>
            </StepLabel>
            <StepLabel active={step === 3} completed={completedSteps.includes(3)} onClick={() => goToStep(3)}>
                <div className="flex flex-col items-center justify-center cursor-pointer">
                    <div className={`${step === 3 ? "bg-[#22CB67]" : "bg-[#666666]"} w-5 h-5 leading-5 rounded-full text-center text-xs font-poppins font-normal text-[#fff] mb-2`}>3</div>
                    <h5 className={`${step === 3 ? "text-[#333333]" : "text-[#666666]"} text-xs lg:text-base md:text-base font-poppins font-normal`}>Create your Project</h5>
                </div>
            </StepLabel>
        </div>
        <>
            {step === 1 && (
                // <div onClick={() => { markStepAsCompleted(1); nextStep();}}>
                    <SelectUserType />
                // </div>
            )}
            {step === 2 && (
               <BasicInfo />
            )}
            {step === 3 && (
              <CreateProject />
            )}
        </>
      </div>
    </section>
  );
};

export default Register;
