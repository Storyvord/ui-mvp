"use client";

import { Button } from '@/components/ui/button';
import React, { FC, useState, useRef, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Contracts, Find, List, Plus, Script, Sheet, Sort } from './ui/docsIcons';
import { Lock } from 'lucide-react';
import { icons } from './ui/Icons';

import ContractsPage from './ContractsPage';
import ScriptsPage from './ScriptsPage';
import SentCallSheetsPage from './CallSheetsPage';

type FormData = {
    roomName: string;
    roomDesc: string;
    email?: string;
};

const File: FC = () => {
    const [showForm, setShowForm] = useState(false);
    const [showEmailField, setShowEmailField] = useState(false);
    const [currentPage, setCurrentPage] = useState<'files' | 'contracts' | 'scripts' | 'sentCallSheets'>('files');
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
    const emailFieldRef = useRef<HTMLDivElement>(null);

    const [files] = useState<{ icon: React.ElementType, title: string, description: string, onClick: () => void }[]>([
        {
            icon: Contracts,
            title: 'Contracts',
            description: 'You can find contracts for actors, insurances and more here.',
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
        console.log(data);
        setShowForm(false);
        reset();
    };

    const handleLockClick = () => {
        setShowEmailField(prev => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (emailFieldRef.current && !emailFieldRef.current.contains(event.target as Node)) {
                setShowEmailField(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [emailFieldRef]);

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
            <div className='text-black text-xl lg:text-2xl md:text-2xl font-semibold underline underline-offset-8 md:underline-offset-8 text-center lg:text-left md:text-left mt-8'>Files & Documents</div>
            <div className='text-black mt-8 flex flex-col md:flex-row lg:flex-row items-center lg:justify-between md:justify-between'>
                <div className='flex'>
                    <Button variant="outline" className='w-26 h-12 flex flex-row' onClick={() => setShowForm(true)}>
                        <Plus />
                        <span className='font-semibold ml-2'>Create Room</span>
                    </Button>
                </div>
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
                            <Lock />
                        </Button>
                        {/* Conditionally render email input field below the button */}
                        {showEmailField && (
                            <div ref={emailFieldRef} className="absolute mt-2 bg-white p-2 border border-gray-200 rounded shadow-lg right-0">
                            
                                <input
                                    className='w-48 p-1 border border-gray-200 rounded text-xs'
                                    type="email"
                                    {...register("email", { required: "Email is required" })}
                                    placeholder='johndoe44@gmail.com'
                                />
                                {errors.email && (
                                    <span className="text-red-500 text-xs">{errors.email.message}</span>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className='mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
                {files.map((file, index) => (
                    <div key={index} className='shadow-md rounded-lg p-4 bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-300' onClick={file.onClick}>
                        <div className='flex flex-col space-y-1'>
                            <file.icon />
                            <h3 className='font-semibold'>{file.title}</h3>
                            <span className='text-slate-500 text-sm'>{file.description}</span>
                        </div>
                    </div>
                ))}
            </div>

            {showForm && (
                <div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center shadow-lg'>
                    <div className='bg-white p-6 rounded w-96 max-h-full'>
                        <div className='flex justify-between items-center pb-2 mb-4'>
                            <h2 className='text-xl font-medium'>Create Room</h2>
                            <button onClick={() => { setShowForm(false); reset(); }}>
                                <span className='text-2xl font-light'>&times;</span>
                            </button>
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
                                <div className='grid lg:grid-cols-6 md:grid-cols-6 grid-cols-6 lg:gap-2 md:gap-2 gap-2 px-4 py-4 cursor-pointer text-slate-400'>
                                    {icons.map((Icon, index) => (
                                        <Icon key={index} className='' />
                                    ))}
                                </div>
                            </div>
                            <footer className='pt-4 flex justify-end space-x-3 mt-4'>
                                <Button onClick={() => { setShowForm(false); reset(); }} type="button" variant="outline">Cancel</Button>
                                <Button type="submit">Create</Button>
                            </footer>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
};

export default File;