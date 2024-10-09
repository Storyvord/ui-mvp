/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { usePostPesonalDetails } from '@/lib/react-query/queriesAndMutations/onBoard/onBoard';
import { toast } from '@/components/ui/use-toast';
import Loader from '@/components/Loader';

interface BasicInfoProps {
    prevStep: () => void;
    onSuccessStep: () => void;
}

interface PersonalDetailsData {
    name: string;
    phone: string;
    country: string;
    company: string;
    website: string;
    about: string;
}

const countryData = [
    {
        id: 1,
        name: 'India',
    },
    {
        id: 2,
        name: 'UK',
    },
    {
        id: 3,
        name: 'USA',
    },
    {
        id: 4,
        name: 'China',
    }
]

export default function BasicInfo({ prevStep, onSuccessStep }: BasicInfoProps) {

    const photoRef = useRef<HTMLInputElement | null>(null);
    const [fileData, setFileData] = useState<File | null>(null);
    const [phoneNumber, setPhoneNumber] = useState<string | undefined>('+44');
    const { mutateAsync: postPersonalDetails, isLoading } = usePostPesonalDetails();
    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<PersonalDetailsData>();
    const selectedCountry = watch("country");
    
    const showOpenFileDialog = () => {
        if (photoRef.current) {
            photoRef.current.click();
        }
    };

    const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFileData(e.target.files[0]);
        }
    };

    const handleBack = () => {
        prevStep();
    };

    const onSubmit: SubmitHandler<PersonalDetailsData> = async (data) => {
        const formData = {
            personal_info: {
            //   image: '',
              full_name: data?.name,
              contact_number: phoneNumber,
              location: data?.country,
              languages: '',
              job_title: '',
              bio: data?.about
            },
            client_profile: {
              role: '',
              address: '',
              personalWebsite: data?.website,
              drive: true,
              active: true,
            //   personal_info: 0,
            //   employee_profile: [0],
            },
        }
        try {
          const res = await postPersonalDetails(formData);
          if (res) {
            toast({
              title: res?.message,
            });
            onSuccessStep();
          }
        } catch (error: unknown) {
          if (error instanceof Error) {
            console.error("Personal Details error:", error);
            toast({
              title: error.message,
              variant: "destructive",
            });
          } else {
            console.error("Personal Details error:", error);
            toast({
              title: "An unknown error occurred.",
              variant: "destructive",
            });
          }
        }
    };    
  return (
    <div>
        <h3 className='lg:text-2xl md:text-2xl text-sm font-poppins text-center font-medium text-[#333333]'>Let's get to know you better!</h3>
        <p className='text-xs lg:text-base md:text-base font-poppins text-center font-normal text-[#666666] mt-2 underline'>Please provide your basic information to continue.</p>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='lg:px-96 md:px-4 mt-8 gap-x-16'>
                <div className="w-full">
                <Label className="font-poppins font-normal text-[#666666] text-base">Name</Label>
                <Input {...register("name", { required: "Name is required" })} type="text" placeholder='Please Enter Your Full Name'
                    className="mt-1 text-base font-normal text-[#111111] font-poppins h-14 rounded-xl border-[#66666659] focus-visible:ring-offset-0 focus-visible:ring-[transparent]"
                />
                {errors.name && <p className="text-red-500 font-poppins text-sm">{errors.name.message}</p>}
                </div>
                <div className="w-full mt-5">
                <Label className="font-poppins font-normal text-[#666666] text-base">Phone Number</Label>
                <PhoneInput
                    placeholder="Please Enter Your Phone Number"
                    value={phoneNumber}
                    international
                    onChange={setPhoneNumber}
                    defaultCountry="GB"
                    className="phone-input"
                />
                </div>
                {/* <div className="w-full mt-2 text-right">
                <Button disabled className="font-poppins font-normal text-[#fff] rounded-[50px] text-base px-3 py-2 h-auto" type="submit">Get OTP</Button>
                </div>
                <div className="w-full mt-2">
                `<Label className="font-poppins font-normal text-[#666666] text-base">OTP Verify</Label>
                <Input type="text" placeholder='Please Enter OTP'
                    className="mt-1 text-base font-normal text-[#111111] font-poppins h-14 rounded-xl border-[#66666659] focus-visible:ring-offset-0 focus-visible:ring-[transparent]"
                />
                </div> */}
                <div className="w-full mt-5">
                    <Label className="font-poppins font-normal text-[#666666] text-base">Your Country</Label>
                    <Select onValueChange={(value) => setValue("country", value)}>
                        <SelectTrigger className="mt-1 text-base font-normal text-[#111111] font-poppins h-14 rounded-xl border-[#66666659] focus:ring-offset-0 focus:ring-0 focus-visible:ring-offset-0 focus-visible:ring-[transparent]">
                            <SelectValue placeholder="Please Select Your Country" />
                        </SelectTrigger>
                        <SelectContent>
                            {countryData.map((country) => (
                            <SelectItem
                                key={country.id}
                                value={country.name}
                                className="text-base font-normal text-[#111111] font-poppins"
                            >
                                {country.name}
                            </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="w-full mt-5">
                    <Label className="font-poppins font-normal text-[#666666] text-base">Company Name <span className="text-xs">(Optional)</span></Label>
                    {/* <Select>
                        <SelectTrigger className="mt-1 text-base font-normal text-[#111111] font-poppins h-14 rounded-xl border-[#66666659] focus:ring-offset-0 focus:ring-0 focus-visible:ring-offset-0 focus-visible:ring-[transparent]">
                            <SelectValue placeholder="Please Enter Your Company Name" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem className="text-base font-normal text-[#111111] font-poppins" value="light">Light</SelectItem>
                            <SelectItem className="text-base font-normal text-[#111111] font-poppins" value="dark">Dark</SelectItem>
                            <SelectItem className="text-base font-normal text-[#111111] font-poppins" value="system">System</SelectItem>
                        </SelectContent>
                    </Select> */}
                    <Input type="text" {...register("company")} placeholder='Please Enter Your Company Name'
                        className="mt-1 text-base font-normal text-[#111111] font-poppins h-14 rounded-xl border-[#66666659] focus-visible:ring-offset-0 focus-visible:ring-[transparent]"
                    />
                </div>
                <div className="w-full mt-5">
                    <Label className="font-poppins font-normal text-[#666666] text-base">Personal Website <span className="text-xs">(Optional)</span></Label>
                    <Input type="text" {...register("website")} placeholder='Please Enter Your Personal Website'
                        className="mt-1 text-base font-normal text-[#111111] font-poppins h-14 rounded-xl border-[#66666659] focus-visible:ring-offset-0 focus-visible:ring-[transparent]"
                    />
                </div>
                <div className="w-full mt-5">
                    <Label className="font-poppins font-normal text-[#666666] text-base">About</Label>
                    <Input type="text" {...register("about", { required: "About is required" })} placeholder='Please Enter About'
                        className="mt-1 text-base font-normal text-[#111111] font-poppins h-14 rounded-xl border-[#66666659] focus-visible:ring-offset-0 focus-visible:ring-[transparent]"
                    />
                    {errors.about && <p className="text-red-500 font-poppins text-sm">{errors.about.message}</p>}
                </div>
                <div className="w-full mt-5">
                    <Label className="font-poppins font-normal text-[#666666] text-base">Profile Photo</Label>
                    {fileData ?
                        <div>
                            <Image src={URL.createObjectURL(fileData)} width={140} height={140} className='w-36 h-36 object-cover rounded-xl border-[#66666659] border-[1px]' alt="Profile Photo" />
                            <p className="text-sm font-normal text-[#111111] font-poppins underline pt-1 cursor-pointer" onClick={() => showOpenFileDialog()}>Change</p>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) => onChangeFile(e)}
                                className="hidden"
                                ref={photoRef}
                            />
                        </div>:
                        <Input type="file" placeholder='Please Enter About' onChange={(e) => onChangeFile(e)}
                            className="mt-1 font-poppins h-14 rounded-xl border-[#66666659]
                            file:mr-4 file:py-2 file:px-4 text-[#333] file:rounded-full file:border-0 file:text-sm file:font-normal file:bg-[#D7D7D7]"
                        />
                    }
                </div>
            </div>
            <div className='flex justify-end mt-10 mb-10 gap-x-4'>
                <Button className='w-44' type="submit" onClick={handleBack}>Back</Button>
                <Button className='w-44 font-poppins' type="submit" disabled={isLoading}>{isLoading ? <Loader /> : 'Next'}</Button>
            </div>
        </form>
    </div>
  )
}