"use client";

import { Button } from '@/components/ui/button';
import React, { FC, useState, useRef, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Contracts, Find, List, Plus, Script, Sheet, Sort } from './ui/docsIcons';
import { LockKeyhole, MoreVertical, Images, Trash } from 'lucide-react';
import { icons } from './ui/Icons';

import ContractsPage from './ContractsPage';
import ScriptsPage from './ScriptsPage';
import SentCallSheetsPage from './CallSheetsPage';

type FormData = {
    roomName: string;
    roomDesc: string;
    icon?: React.ElementType;
    email?: string;
};

type RoomDataType = {
    icon: React.ElementType;
    title: string;
    description: string;
    onClick?: () => void;
};

const File: FC = () => {
    const [showForm, setShowForm] = useState(false);
    const [showEmailField, setShowEmailField] = useState(false);
    const [currentPage, setCurrentPage] = useState<'files' | 'contracts' | 'scripts' | 'sentCallSheets'>('files');
    const [loading, setLoading] = useState(false);
    const [createdRooms, setCreatedRooms] = useState<RoomDataType[]>([]);
    const [selectedRoomIndex, setSelectedRoomIndex] = useState<number | null>(null);
    const [selectedIconIndex, setSelectedIconIndex] = useState<number | null>(null);

    const [changingIconForRoomIndex, setChangingIconForRoomIndex] = useState<number | null>(null);

    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<FormData>();

    const emailFieldRef = useRef<HTMLDivElement>(null);

    const [files] = useState<RoomDataType[]>([
        {
            icon: Contracts,
            title: 'Contracts',
            description: 'You can find contracts for actors, insurances, and more here.',
            onClick: () => setCurrentPage('contracts'),
        },
        {
            icon: Script,
            title: 'Script & Development',
            description: 'You can find everything related to development here.',
            onClick: () => setCurrentPage('scripts'),
        },
        {
            icon: Sheet,
            title: 'Sent Call Sheets',
            description: 'You can find copies of your call sheets here after sending them to your crew.',
            onClick: () => setCurrentPage('sentCallSheets'),
        }
    ]);

    const onSubmit: SubmitHandler<FormData> = data => {
        setLoading(true);

        setTimeout(() => {
            const room: RoomDataType = {
                icon: data.icon || Contracts,
                title: data.roomName,
                description: data.roomDesc
            };
            setCreatedRooms([...createdRooms, room]);
            setLoading(false);
            setShowForm(false);
            reset();
        }, 1000);
    };

    const handleLockClick = () => {
        if (showEmailField) {
            setValue('email', '');  // Reset email field when toggling off
        }
        setShowEmailField(prev => !prev);
    };

    const handleDeleteRoom = (index: number) => {
        setCreatedRooms(rooms => rooms.filter((_, i) => i !== index));
    };

    const handleChangeIcon = (index: number, newIcon: React.ElementType) => {
        setCreatedRooms(rooms =>
            rooms.map((room, i) => i === index ? { ...room, icon: newIcon } : room)
        );
    };

    const handleDotClick = (index: number) => {
        setSelectedRoomIndex(index === selectedRoomIndex ? null : index);
    };

    const handleOpenChangeIconModal = (index: number) => {
        setChangingIconForRoomIndex(index);
        setSelectedIconIndex(null);  // Reset selected icon index when opening the modal
    };

    const handleCloseChangeIconModal = () => {
        setChangingIconForRoomIndex(null);
    };

    const handleIconSelect = (newIcon: React.ElementType) => {
        if (changingIconForRoomIndex !== null) {
            handleChangeIcon(changingIconForRoomIndex, newIcon);
            handleCloseChangeIconModal();
            setSelectedRoomIndex(null);  // Close the options menu
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (emailFieldRef.current && !emailFieldRef.current.contains(event.target as Node)) {
                setShowEmailField(false);
                setValue('email', '');  // Reset email field when clicking outside
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [emailFieldRef, setValue]);

    const handleEmailSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setShowEmailField(false);
        setValue('email', '');  // Reset email field on submit
    };

    if (currentPage === 'contracts') {
        return <ContractsPage />;
    }
    if (currentPage === 'scripts') {
        return <ScriptsPage />;
    }
    if (currentPage === 'sentCallSheets') {
        return <SentCallSheetsPage />;
    }

    return (
        <section className='relative'>
            <h1 className='text-black text-xl lg:text-2xl md:text-2xl font-semibold underline underline-offset-8 md:underline-offset-8 text-center lg:text-left md:text-left mt-8'>Files & Documents</h1>

            <div className='text-black mt-8 flex flex-col md:flex-row lg:flex-row items-center lg:justify-between md:justify-between'>
                <Button variant="outline" className='w-26 h-12 flex flex-row' onClick={() => setShowForm(true)}>
                    <Plus />
                    <span className='font-semibold ml-2'>Create Room</span>
                </Button>

                <div className='flex space-x-1 mt-4'>
                    <Button variant="outline" size="icon">
                        <Find />
                    </Button>
                    <Button variant="outline" size="icon">
                        <Sort />
                    </Button>
                    <Button variant="outline" size="icon">
                        <List />
                    </Button>
                    <div className="relative">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={handleLockClick}
                            className="hover:text-blue-500"
                        >
                            <LockKeyhole />
                        </Button>

                        {showEmailField && (
                            <div ref={emailFieldRef} className="absolute mt-2 bg-white p-2 border border-gray-200 rounded shadow-lg right-0 z-30">
                                <label className="block text-xs mb-1">Invite members</label>
                                <form onSubmit={handleEmailSubmit}>
                                    <input
                                        className='w-40 lg:w-48 md:48 p-1 border border-gray-200 rounded text-xs'
                                        type="email"
                                        {...register("email", { required: "Email is required" })}
                                        placeholder='Enter email address'
                                    />
                                    {errors.email && (
                                        <span className="text-red-500 text-xs">{errors.email.message}</span>
                                    )}
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className='mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
                {[...files, ...createdRooms].map((file, index) => (
                    <div key={index} className='relative shadow-md rounded-lg p-4 bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-300 cursor-pointer'>
                        <div className='flex justify-between items-start'>
                            <div className='flex flex-col space-y-1' onClick={file.onClick}>
                                <file.icon />
                                <h3 className='font-semibold'>{file.title}</h3>
                                <span className='text-slate-500 text-sm'>{file.description}</span>
                            </div>
                            {index >= files.length && (
                                <div className="relative">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="absolute top-0 right-0 p-1 text-gray-500"
                                        onClick={() => handleDotClick(index)}
                                        style={{ fontSize: '1.2rem', padding: '0.1rem' }}
                                    >
                                        <MoreVertical />
                                    </Button>
                                    {selectedRoomIndex === index && (
                                        <div className="absolute right-0 mt-8 bg-white border border-gray-200 rounded shadow-lg p-2 w-32">
                                            <button
                                                className="w-full text-left text-xs px-2 py-1 border-b hover:bg-gray-100 flex items-center"
                                                onClick={() => handleOpenChangeIconModal(index - files.length)}
                                            >
                                                <Images className="mr-2 h-4 w-4" /> Change Icon
                                            </button>
                                            <button
                                                className="w-full text-left text-xs text-red-500 px-2 py-1 hover:bg-gray-100 flex items-center"
                                                onClick={() => {
                                                    handleDeleteRoom(index - files.length);
                                                    setSelectedRoomIndex(null);
                                                }}
                                            >
                                                <Trash className="mr-2 h-4 w-4" /> Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {showForm && (
                <div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center shadow-lg'>
                    <div className='bg-white p-8 rounded-lg w-96 max-h-screen transform transition-transform duration-300 shadow-xl'>
                        <div className='flex justify-center items-center pb-2 mb-4 border-b'>
                            <h2 className='text-2xl font-medium'>Create Room</h2>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label className='block mb-2 text-xs'>
                                    Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    className={`w-full p-2 border ${errors.roomName ? 'border-red-500' : 'border-gray-200'} rounded mb-4`}
                                    type="text"
                                    {...register("roomName", { required: "Name is required" })}
                                />
                                {errors.roomName && (
                                    <span className="text-red-500 text-sm">{errors.roomName.message}</span>
                                )}
                            </div>
                            <div>
                                <label className='block mb-2 text-xs'>
                                    Description <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    className={`w-full p-2 border ${errors.roomDesc ? 'border-red-500' : 'border-gray-200'} rounded mb-4`}
                                    {...register("roomDesc", { required: "Description is required" })}
                                />
                                {errors.roomDesc && (
                                    <span className="text-red-500 text-sm">{errors.roomDesc.message}</span>
                                )}
                            </div>
                            <div className='flex flex-col'>
                                <label className='text-medium'>Select Icon</label>
                                <div className='grid lg:grid-cols-6 md:grid-cols-6 grid-cols-6 lg:gap-2 md:gap-2 gap-2 px-4 py-2 cursor-pointer text-slate-400'>
                                    {icons.map((Icon, index) => (
                                        <div
                                            key={index}
                                            onClick={() => {
                                                setValue('icon', Icon);
                                                setSelectedIconIndex(index);
                                            }}
                                            className={`p-2 rounded cursor-pointer ${selectedIconIndex === index ? 'text-black' : 'text-slate-400'} ${selectedIconIndex === index && 'hover:opacity-75'}`}
                                        >
                                            <Icon />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <footer className='pt-4 flex justify-end space-x-3 mt-2'>
                                <Button onClick={() => { setShowForm(false); reset(); }} type="button" variant="outline">Cancel</Button>
                                <Button type="submit" variant="default">
                                    {loading ? "Creating..." : "Create"}
                                </Button>
                            </footer>
                        </form>
                    </div>
                </div>
            )}

            {changingIconForRoomIndex !== null && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center shadow-lg">
                    <div className="bg-white p-6 rounded w-96 max-h-full">
                        <div className="flex justify-between items-center pb-2 mb-2">
                            <h2 className="text-xl font-medium">Change Icon</h2>
                            <button onClick={handleCloseChangeIconModal}>
                                <span className="text-2xl font-light">&times;</span>
                            </button>
                        </div>

                        <div className="grid lg:grid-cols-6 md:grid-cols-6 grid-cols-6 lg:gap-2 md:gap-2 gap-2 px-4 py-4 cursor-pointer text-slate-400">
                            {icons.map((Icon, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleIconSelect(Icon)}
                                    className={`p-2 rounded cursor-pointer ${selectedIconIndex === index ? 'text-black hover:opacity-75' : 'text-slate-400'}`}
                                >
                                    <Icon />
                                </div>
                            ))}
                        </div>
                        <footer className="pt-4 flex justify-end space-x-3 mt-1">
                            <Button onClick={handleCloseChangeIconModal} type="button" variant="outline">Close</Button>
                        </footer>
                    </div>
                </div>
            )}
        </section>
    );
};

export default File;