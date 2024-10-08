import Image from 'next/image'
import React, { useState } from 'react'
import ProducerIcon from "@/assets/producer.svg";
import CrewIcon from "@/assets/crew.svg";
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from '@/components/ui/use-toast';
import { useSelectUserType } from '@/lib/react-query/queriesAndMutations/onBoard/onBoard';
import Loader from '@/components/Loader';

interface SelectUserTypeProps {
    getName: string;
    onSuccessUserType: () => void;
}

export default function SelectUserType({ getName, onSuccessUserType }: SelectUserTypeProps) {

    const [selectedUserType, setSelectedUserType] = useState<string>('');

    const { mutateAsync: postUserType, isLoading } = useSelectUserType();

    const handleCheck = (type: any) => {
        setSelectedUserType(type);
    }

    const handleNext = async () => {
        if (!selectedUserType) {
            toast({
              title: "Please Select User Type",
              variant: "destructive",
            });
            return;
        }
        try {
          const userType = selectedUserType;
          const res = await postUserType(userType);
          if (res) {
            console.log(res, 'response')
            onSuccessUserType();
            toast({
                title: res?.message,
            });
          }
        } catch (error) {
          // Check if error is an instance of Error
          if (error instanceof Error) {
            toast({
              title: error.message,
              variant: "destructive",
            });
            console.log(error.message, 'error message');
          } else {
            // Handle unknown error case
            toast({
              title: "An unexpected error occurred",
              variant: "destructive",
            });
            console.log('Unknown error', error);
          }
        }
      };
    
    console.log(selectedUserType, 'selectedUserType')

  return (
    <div>
        <h3 className='lg:text-2xl md:text-2xl text-sm font-poppins text-center font-medium text-[#333333]'>Create an account Your account is all set up, [{getName}]!</h3>
        <h3 className='lg:text-2xl md:text-2xl text-sm font-poppins text-center font-medium text-[#333333]'>How would you like to get started with Storyvord?</h3>
        <p className='text-xs lg:text-base md:text-base font-poppins text-center font-normal text-[#666666] mt-2 underline'>Please select your user type to continue.</p>
        <div className='flex justify-between lg:px-36 md:px-4 mt-14 gap-x-16 flex-col md:flex-row lg:flex-row gap-y-6'>
            <div className={`${selectedUserType === 'client' ? "border-[#22CB67] shadow-[0_4px_4px_0px_rgba(34,203,103,0.25)]" : "border-[#66666659]"} md:w-6/12 rounded-xl border px-3 pt-3 cursor-pointer`}>
                <div className='flex justify-end'>
                    <RadioGroup>
                        <RadioGroupItem value="client" className='data-[state=checked]:border-[#22CB67] data-[state=checked]:text-[#22CB67]'
                            checked={selectedUserType === 'client'} onChange={() => handleCheck('client')}
                        />
                    </RadioGroup>
                </div>
                <div className='flex items-end justify-between pt-12' onClick={() => handleCheck('client')}>
                    <Image src={ProducerIcon} alt="producer-icon" />
                    <div>
                        <h6 className='text-base font-poppins text-center font-bold text-[#333333]'>Producers</h6>
                        <p className='text-base font-poppins text-center font-medium text-[#333333]'>(Individual or Production company)</p>
                    </div>
                </div>
            </div>
            <div className={`${selectedUserType === 'crew' ? "border-[#22CB67] shadow-[0_4px_4px_0px_rgba(34,203,103,0.25)]" : "border-[#66666659]"} md:w-6/12 rounded-xl border px-3 pt-3 cursor-pointer`}>
                <div className='flex justify-end'>
                    <RadioGroup>
                        <RadioGroupItem value="crew" className='data-[state=checked]:border-[#22CB67] data-[state=checked]:text-[#22CB67]'
                            checked={selectedUserType === 'crew'} onChange={() => handleCheck('crew')}
                        />
                    </RadioGroup>
                </div>
                <div className='flex items-end pt-12' onClick={() => handleCheck('crew')}>
                    <Image src={CrewIcon} alt="producer-icon" />
                    <div className='w-full'>
                        <h6 className='text-base font-poppins text-center font-bold text-[#333333] mb-3'>Crew</h6>
                    </div>
                </div>
            </div>
        </div>
        <div className='flex justify-end mt-10 mb-10'>
            <Button className='w-44' onClick={handleNext} type="submit" disabled={isLoading}>{isLoading ? <Loader /> : 'Next'}</Button>
        </div>
    </div>
  )
}
