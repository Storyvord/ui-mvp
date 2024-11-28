import { cn } from "@/lib/utils";
type Props = { stepNumber: number; label: string; step: number; completedSteps: number[] };

const StepIndicator = ({ stepNumber, label, step, completedSteps }: Props) => {
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

export default StepIndicator;
