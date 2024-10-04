import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import ArrowIcon from "@/assets/arrow-down.svg";
import AddShootDetailsDialog from './AddShootDetailsDialog';

interface ContentItem {
    id: number;
    name: string;
}

interface SelectedItem {
    name: string;
    count: number;
}

interface ShootDetails {
    shootLocation: string;
    startDate: string;
    endDate: string;
    mode: string;
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
    const [showAll, setShowAll] = useState(false);
    const [crewData, setCrewData] = useState<string[]>(['Producer', 'Director', 'Camera', 'Tripod']);
    const [equipmentData, setEquipmentData] = useState<string[]>(['Light', 'Dark', 'System']);
    const [selectedCrew, setSelectedCrew] = useState<SelectedItem[]>([]);
    const [selectedEquipment, setSelectedEquipment] = useState<SelectedItem[]>([]);
    const [crewDropdownOpen, setCrewDropdownOpen] = useState(false);
    const [equipmentDropdownOpen, setEquipmentDropdownOpen] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [allShootDetails, setAllShootDetails] = useState<ShootDetails[]>([]);
    const [shootDetails, setShootDetails] = useState<ShootDetails>({
        shootLocation: '',
        startDate: '',
        endDate: '',
        mode: 'indoor',
    });

    const onChangeFile = (e: any) => {
        setFileData(e.target.files[0])
    };

    const handleSliderChange = (value: number[]) => {
        setSliderValue(value[0]);
    };

    const handleSelectContent = (item: ContentItem) => {
        setSelectedContent(item);
    };

    const handleShowMore = () => {
        setShowAll(!showAll);
    };

    const handleOpenDialog = () => {    
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleSelect = (itemName: string, isCrew: boolean) => {
        if (isCrew) {
            const selectedItemExists = selectedCrew.some(item => item.name === itemName);
            if (!selectedItemExists) {
                setSelectedCrew([...selectedCrew, { name: itemName, count: 1 }]);
                setCrewData(crewData.filter((crew) => crew !== itemName)); // Remove selected item from dropdown
            }
        } else {
            const selectedItemExists = selectedEquipment.some(item => item.name === itemName);
            if (!selectedItemExists) {
                setSelectedEquipment([...selectedEquipment, { name: itemName, count: 1 }]);
                setEquipmentData(equipmentData.filter((equip) => equip !== itemName)); // Remove selected item from dropdown
            }
        }
    };
    
    const handleIncrement = (name: string, isCrew: boolean) => {
        const selectedItems = isCrew ? selectedCrew : selectedEquipment;
        const currentItems = isCrew ? setSelectedCrew : setSelectedEquipment;
        currentItems(
          selectedItems.map(item =>
            item.name === name ? { ...item, count: item.count + 1 } : item
          )
        );
    };

    const handleDecrement = (name: string, isCrew: boolean) => {
        if (isCrew) {
            // Handle decrement for crew members
            setSelectedCrew(selectedCrew => {
                const updatedItems = selectedCrew.map(item =>
                    item.name === name && item.count > 0 ? { ...item, count: item.count - 1 } : item
                );
    
                // Check if the item count is 0
                const itemCount = updatedItems.find(item => item.name === name)?.count;
                if (itemCount === 0) {
                    // Add back to crewData if count is 0
                    setCrewData([...crewData, name]);
                    return updatedItems.filter(item => item.count > 0); // Remove item with count 0
                }
                return updatedItems;
            });
        } else {
            // Handle decrement for equipment
            setSelectedEquipment(selectedEquipment => {
                const updatedItems = selectedEquipment.map(item =>
                    item.name === name && item.count > 0 ? { ...item, count: item.count - 1 } : item
                );
    
                // Check if the item count is 0
                const itemCount = updatedItems.find(item => item.name === name)?.count;
                if (itemCount === 0) {
                    // Add back to equipmentData if count is 0
                    setEquipmentData([...equipmentData, name]);
                    return updatedItems.filter(item => item.count > 0); // Remove item with count 0
                }
                return updatedItems;
            });
        }
    };
    
    const toggleDropdown = (isCrew: boolean) => {
        if (isCrew) {
          setCrewDropdownOpen(!crewDropdownOpen);
        } else {
          setEquipmentDropdownOpen(!equipmentDropdownOpen);
        }
    };

    const handleAddOtherLocation = () => {
        if (shootDetails.shootLocation && shootDetails.startDate && shootDetails.endDate) {
            const newLocation = { ...shootDetails }; // Get the current values
            setAllShootDetails([...allShootDetails, newLocation]);
            setShootDetails({
                shootLocation: '',
                startDate: '',
                endDate: '',
                mode: 'indoor',
            });
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setShootDetails((prev) => ({ ...prev, [field]: value }));
    };

    const displayedContent = showAll ? initialContentData : initialContentData.slice(0, 8);
    console.log(selectedContent, 'selectedContent')
    console.log(shootDetails, 'addShootDetails')
    
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
                    <div className='mt-1 flex items-center gap-x-2 gap-y-3 flex-wrap'>
                        {displayedContent?.map((item, index) => {
                            return (
                                <p className={`rounded-lg px-4 py-2 text-center text-[#fff] text-base font-normal font-poppins cursor-pointer ${
                                    selectedContent?.id === item.id ? 'bg-[#333333]' : 'bg-[#C9C9C9]'
                                  }`} key={index}
                                    onClick={() => handleSelectContent(item)}
                                >
                                    {item.name}
                                </p>
                            )
                        })}
                    </div>
                    <div className="mt-3">
                        <Button
                            className="text-sm font-poppins h-auto font-normal text-[#333333] underline cursor-pointer bg-[transparent] hover:bg-[transparent] px-0 py-0"
                            onClick={handleShowMore}
                        >
                        {showAll ? 'Show Less' : 'Show More'}
                        </Button>
                    </div>
                </div>
                <div className="w-full mt-5">
                    <Label className="font-poppins font-normal text-[#666666] text-base">Budget</Label>
                    <div className='mt-1 flex justify-between items-center gap-x-4'>
                        <Slider value={[sliderValue]} max={100} step={1} onValueChange={handleSliderChange} />
                        <p className='text-base font-poppins font-normal text-[#666666] border-[#66666659] border-[1px] rounded-xl px-6 py-3'>${sliderValue}</p>
                    </div>
                </div>
                <div className="w-full mt-5">
                    <Label className="font-poppins font-normal text-[#666666] text-base">Crew</Label>
                    <div className='relative'>
                        <div
                            className="mt-1 text-base font-normal text-[#111111] font-poppins h-14 rounded-xl border-[1px] border-[#66666659] p-[15px] cursor-pointer flex justify-between items-center"
                            onClick={() => toggleDropdown(true)}
                        >
                            <span>Please Select Crew Members</span>
                            <Image src={ArrowIcon} alt='arrow' />
                        </div>
                        {crewDropdownOpen && (
                            <div className="bg-white border-[1px] border-[#66666659] rounded-xl shadow-lg mt-1 p-3 h-[190px] overflow-y-scroll">
                                {crewData.map((crew, index) => (
                                    <div
                                        key={index}
                                        onClick={() => handleSelect(crew, true)}
                                        className="cursor-pointer p-2 hover:bg-gray-200 rounded-md text-base font-normal text-[#111111] font-poppins"
                                    >
                                        {crew}
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="mt-3 flex flex-wrap gap-3">
                            {selectedCrew.map(item => (
                                <div key={item.name} className="bg-[#333333] rounded-lg text-[#fff] text-base font-normal font-poppins p-3 flex items-center gap-2">
                                    <span>{item.name}</span>
                                    <button onClick={() => handleIncrement(item.name, true)} className="text-[#fff] px-2">+</button>
                                    <span className="bg-[#fff] text-[#333333] px-3 rounded-lg">{item.count}</span>
                                    <button onClick={() => handleDecrement(item.name, true)} className="text-[#fff] px-2">-</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="md:w-6/12">
                <div className="w-full">
                    <Label className="font-poppins font-normal text-[#666666] text-base">Project Brief</Label>
                    <Textarea placeholder='Please Enter Project Description'
                    className="mt-1 text-base font-normal text-[#111111] font-poppins h-14 rounded-xl border-[#66666659] focus-visible:ring-offset-0 focus-visible:ring-[transparent] h-[89px]"
                    />
                </div>
                <div className="w-full mt-5">
                    <Label className="font-poppins font-normal text-[#666666] text-base">Additional details</Label>
                    <Textarea placeholder='Please Enter Additional details'
                    className="mt-1 text-base font-normal text-[#111111] font-poppins h-14 rounded-xl border-[#66666659] focus-visible:ring-offset-0 focus-visible:ring-[transparent] h-[89px]"
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
                    <Label className="font-poppins font-normal text-[#666666] text-base">Equipment</Label>
                    <div className='relative'>
                        <div
                            className="mt-1 text-base font-normal text-[#111111] font-poppins h-14 rounded-xl border-[1px] border-[#66666659] p-[15px] cursor-pointer flex justify-between items-center"
                            onClick={() => toggleDropdown(false)}
                        >
                            <span>Please Select Equipment</span>
                            <Image src={ArrowIcon} alt='arrow' />
                        </div>
                        {equipmentDropdownOpen && (
                            <div className="bg-white border-[1px] border-[#66666659] rounded-xl shadow-lg mt-1 p-3 h-[190px] overflow-y-scroll">
                                {equipmentData.map((item, index) => (
                                    <div
                                        key={index}
                                        onClick={() => handleSelect(item, false)}
                                        className="cursor-pointer p-2 hover:bg-gray-200 rounded-md text-base font-normal text-[#111111] font-poppins"
                                    >
                                        {item}
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="mt-3 flex flex-wrap gap-3">
                            {selectedEquipment.map(item => (
                                <div key={item.name} className="bg-[#333333] rounded-lg text-[#fff] text-base font-normal font-poppins p-3 flex items-center gap-2">
                                    <span>{item.name}</span>
                                    <button onClick={() => handleIncrement(item.name, false)} className="text-[#fff] px-2">+</button>
                                    <span className="bg-[#fff] text-[#333333] px-3 rounded-lg">{item.count}</span>
                                    <button onClick={() => handleDecrement(item.name, false)} className="text-[#fff] px-2">-</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='flex justify-end mt-10 mb-10'>
            <Button className='w-44 font-poppins' type="submit" onClick={handleOpenDialog}>Add Shoot Details</Button>
        </div>
        <AddShootDetailsDialog
            openDialog={openDialog}
            handleCloseDialog={handleCloseDialog}
            // isChecked={isChecked}
            // handleCheck={handleCheck}
            shootDetails={shootDetails}
            allShootDetails={allShootDetails}
            handleInputChange={handleInputChange}
            handleAddOtherLocation={handleAddOtherLocation}
        />
    </div>
  )
}