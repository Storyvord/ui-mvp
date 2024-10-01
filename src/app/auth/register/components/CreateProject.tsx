/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';

interface ContentItem {
    id: number;
    name: string;
}

const initialContentData: ContentItem[] = [
    { id: 1, name: 'Content 1' },
    { id: 2, name: 'Content 2' },
    { id: 3, name: 'Content 3' },
    { id: 4, name: 'Content 4' },
    { id: 5, name: 'Content 5' },
    { id: 6, name: 'Content 6' },
    { id: 7, name: 'Content 7' },
    { id: 8, name: 'Content 8' },
    { id: 9, name: 'Content 9' },
    { id: 10, name: 'Content 10' },
    { id: 11, name: 'Content 11' },
  ];

export default function CreateProject() {

    const [fileData, setFileData] = useState(null);
    const [sliderValue, setSliderValue] = useState<number>(33);
    const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);

    const onChangeFile = (e: any) => {
        setFileData(e.target.files[0])
    };

    const handleSliderChange = (value: number[]) => {
        setSliderValue(value[0]);
    };

    const handleSelectContent = (item: ContentItem) => {
        setSelectedContent(item);
    };

    console.log(selectedContent, 'sliderValue')
    
  return (
    <div>
        <h3 className='lg:text-2xl md:text-2xl text-sm font-poppins text-center font-medium text-[#333333]'>Ready to start something amazing?</h3>
        <p className='text-xs lg:text-base md:text-base font-poppins text-center font-normal text-[#666666] mt-2 underline'>Create your project to get started! </p>
        <div className='flex justify-between flex-col md:flex-row lg:flex-row gap-y-6 lg:px-24 md:px-4 mt-8 gap-x-16'>
            <div className="md:w-6/12">
                <div className="w-full">
                    <Label className="font-poppins font-normal text-[#666666] text-base">Project Name</Label>
                    <Input type="text" placeholder='Please Enter Your Project Name'
                    className="mt-1 text-base font-normal text-[#111111] font-poppins h-14 rounded-xl border-[#66666659] focus-visible:ring-offset-0 focus-visible:ring-[transparent]"
                    />
                </div>
                <div className="w-full mt-5">
                    <Label className="font-poppins font-normal text-[#666666] text-base">Content Type</Label>
                    <div className='mt-1 flex justify-between items-center gap-x-4'>
                        <Slider value={[sliderValue]} max={100} step={1} onValueChange={handleSliderChange} />
                        <p className='text-base font-poppins font-normal text-[#666666] border-[#66666659] border-[1px] rounded-xl px-6 py-3'>${sliderValue}</p>
                    </div>
                </div>
                <div className="w-full mt-5">
                    <Label className="font-poppins font-normal text-[#666666] text-base">Budget</Label>
                    <div className='mt-1 flex items-center gap-x-2 gap-y-3 flex-wrap'>
                        {initialContentData?.map((item, index) => {
                            return (
                                <p className={`${selectedContent?.id === item.id ? 'bg-[#333333]' : ''} rounded-lg bg-[#C9C9C9] px-4 py-2 text-center text-[#fff] text-base font-normal font-poppins cursor-pointer`} key={index}
                                    onClick={() => handleSelectContent(item)}
                                >
                                    {item.name}
                                </p>
                            )
                        })}
                    </div>
                </div>
                <div className="w-full mt-5">
                    <Label className="font-poppins font-normal text-[#666666] text-base">Crew</Label>
                    <Select>
                        <SelectTrigger className="mt-1 text-base font-normal text-[#111111] font-poppins h-14 rounded-xl border-[#66666659] focus:ring-offset-0 focus:ring-0 focus-visible:ring-offset-0 focus-visible:ring-[transparent]">
                            <SelectValue placeholder="Please Select Required Crew Members" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem className="text-base font-normal text-[#111111] font-poppins" value="light">Light</SelectItem>
                            <SelectItem className="text-base font-normal text-[#111111] font-poppins" value="dark">Dark</SelectItem>
                            <SelectItem className="text-base font-normal text-[#111111] font-poppins" value="system">System</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="w-full mt-5">
                    <Label className="font-poppins font-normal text-[#666666] text-base">Equipment</Label>
                    <Select>
                        <SelectTrigger className="mt-1 text-base font-normal text-[#111111] font-poppins h-14 rounded-xl border-[#66666659] focus:ring-offset-0 focus:ring-0 focus-visible:ring-offset-0 focus-visible:ring-[transparent]">
                            <SelectValue placeholder="Please Select Required Equipments" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem className="text-base font-normal text-[#111111] font-poppins" value="light">Light</SelectItem>
                            <SelectItem className="text-base font-normal text-[#111111] font-poppins" value="dark">Dark</SelectItem>
                            <SelectItem className="text-base font-normal text-[#111111] font-poppins" value="system">System</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="md:w-6/12">
                <div className="w-full">
                    <Label className="font-poppins font-normal text-[#666666] text-base">Project Brief</Label>
                    <Textarea placeholder='Please Enter Project Description'
                    className="mt-1 text-base font-normal text-[#111111] font-poppins h-14 rounded-xl border-[#66666659] focus-visible:ring-offset-0 focus-visible:ring-[transparent]"
                    />
                </div>
                <div className="w-full mt-5">
                    <Label className="font-poppins font-normal text-[#666666] text-base">Additional details</Label>
                    <Textarea placeholder='Please Enter Additional details'
                    className="mt-1 text-base font-normal text-[#111111] font-poppins h-14 rounded-xl border-[#66666659] focus-visible:ring-offset-0 focus-visible:ring-[transparent]"
                    />
                </div>
                <div className="w-full mt-5">
                    <Label className="font-poppins font-normal text-[#666666] text-base">Upload Document <span className="text-xs">(If any)</span></Label>
                    <Input type="file" placeholder='Please Enter About' onChange={(e) => onChangeFile(e)}
                        className="mt-1 font-poppins h-14 rounded-xl border-[#66666659]
                        file:mr-4 file:py-2 file:px-4 text-[#333] file:rounded-full file:border-0 file:text-sm file:font-normal file:bg-[#D7D7D7]"
                    />
                </div>
                <div className="w-full mt-5">
                    <Label className="font-poppins font-normal text-[#666666] text-base">Shoot Loaction</Label>
                    <Select>
                        <SelectTrigger className="mt-1 text-base font-normal text-[#111111] font-poppins h-14 rounded-xl border-[#66666659] focus:ring-offset-0 focus:ring-0 focus-visible:ring-offset-0 focus-visible:ring-[transparent]">
                            <SelectValue placeholder="Please Select Shoot Loaction" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem className="text-base font-normal text-[#111111] font-poppins" value="light">Light</SelectItem>
                            <SelectItem className="text-base font-normal text-[#111111] font-poppins" value="dark">Dark</SelectItem>
                            <SelectItem className="text-base font-normal text-[#111111] font-poppins" value="system">System</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
        <div className='flex justify-end mt-10 mb-10'>
            <Button className='w-44 font-poppins' type="submit">Next</Button>
        </div>
    </div>
  )
}