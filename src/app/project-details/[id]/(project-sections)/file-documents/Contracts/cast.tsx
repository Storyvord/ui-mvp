"use client";

import React, { FC, useState, useEffect } from 'react';
import { Plus, Find, Sort, List } from '../ui/docsIcons';
import { Button } from '@/components/ui/button';
import { FolderOpen, X, Trash2, File, Users } from 'lucide-react';
import Image from 'next/image';
import { useForm, SubmitHandler } from 'react-hook-form';

interface FormData {
    name: string;
    file: FileList;
}

interface ObjectData {
    name: string;
    file: File;
}

const Casts: FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [objects, setObjects] = useState<ObjectData[]>([]);
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
    const [previewFile, setPreviewFile] = useState<File | null>(null);
    const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
    const [isMobileOrMd, setIsMobileOrMd] = useState(false);
    const [isLg, setIsLg] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobileOrMd(window.innerWidth <= 1024);
            setIsLg(window.innerWidth > 768 && window.innerWidth <= 1024);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => {
        setIsModalOpen(false);
        reset();
        setSelectedFileName(null);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            register("file").onChange(e);
            setSelectedFileName(file.name);
        }
    };

    const onSubmit: SubmitHandler<FormData> = data => {
        const newObject: ObjectData = {
            name: data.name,
            file: data.file[0],
        };
        setObjects(prevObjects => [...prevObjects, newObject]);
        handleCloseModal();
    };

    const handlePreview = (file: File) => {
        if (isMobileOrMd) {
            const url = URL.createObjectURL(file);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', file.name);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else if (isLg) {
            setPreviewFile(file);
        } else {
            setPreviewFile(file);
        }
    };

    const handleClosePreview = () => {
        setPreviewFile(null);
    };

    const handleDelete = (index: number) => {
        setObjects(prevObjects => prevObjects.filter((_, i) => i !== index));
    };

    return (
        <section className="">
            <div className='py-5 flex flex-row gap-2 -mb-2 mt-5'>
                <Users />
                <div className='flex flex-col -mt-2'>
                    <span className='text-2xl font-medium'>Casts</span>
                    <span className='text-slate-500 text-xs'>
                        All of the cast members contracts are available here.
                    </span>
                </div>
            </div>

            <div className='text-black mt-2 flex flex-col md:flex-row lg:flex-row items-center lg:justify-between md:justify-between'>
                <div className='flex'>
                    <Button variant="outline" className='w-26 h-12 flex flex-row' onClick={handleOpenModal}>
                        <Plus />
                        <span className='font-semibold ml-2'>Create Contract</span>
                    </Button>
                </div>
               
            </div>
            <div className='mt-8 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {objects.map((object, index) => (
                    <div key={index} className="relative w-full h-60 md:h-64 lg:h-64 shadow-md rounded-lg bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                        <div className="h-[80%] flex items-center justify-center" onClick={() => handlePreview(object.file)} >
                            {object.file.type.startsWith('image/') ? (
                                <Image
                                    src={URL.createObjectURL(object.file)}
                                    alt={object.name}
                                    layout="fill"
                                    objectFit="contain"
                                    className="rounded-t-lg"
                                />
                            ) : (
                                <File className="text-blue-500 w-20 h-20 stroke-1" />
                            )}
                        </div>
                        <div className="absolute bottom-0 left-0 w-full h-[20%] bg-white flex items-center justify-between p-4 border-t border-gray-200">
                            <div onClick={() => handlePreview(object.file)} className="flex-grow">
                                <h3 className="text-black font-medium">{object.name}</h3>
                                <span className="text-slate-500 text-sm">{object.file.name}</span>
                            </div>
                            <button className="text-red-500" onClick={() => handleDelete(index)}>
                                <Trash2 size={24} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {objects.length === 0 && (
                <div className="relative mb-4 border-2 border-solid border-gray-200 rounded flex flex-col items-center justify-center py-10">
                    <FolderOpen className="text-blue-500 lg:w-22 lg:h-22 md:w-20 md:h-20 w-10 h-10 mb-4 stroke-1" />
                    <label className="block text-sm text-slate-500 mb-2">
                        No contracts have been added yet.
                    </label>
                    {errors.file && (
                        <span className="text-red-500 text-sm">{errors.file.message}</span>
                    )}
                </div>
            )}

            {isModalOpen && (
                <div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50'>
                    <div className='bg-white p-8 rounded-lg shadow-xl w-96 max-h-full transform transition-transform duration-300'>
                        <div className='flex justify-center items-center pb-2 mb-4 border-b'>
                            <h2 className='text-2xl font-medium'>Create Contract</h2>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label className='block mb-2 text-sm font-medium'>
                                    Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    className={`w-full p-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4`}
                                    type="text"
                                    {...register("name", { required: "Name is required" })}
                                />
                                {errors.name && (
                                    <span className="text-red-500 text-sm">{errors.name.message}</span>
                                )}
                            </div>
                            <div>
                                <label className='block mb-2 text-sm font-medium'>
                                    Choose a file <span className="text-red-500">*</span>
                                </label>
                                <div className="relative mb-4 border-2 border-dashed border-gray-300 rounded-lg py-10 text-center cursor-pointer hover:bg-gray-100 transition duration-300">
                                    <File className="text-blue-500 w-10 h-10 mb-4 mx-auto" />
                                    <label className="block text-sm text-slate-500 mb-2">
                                        Drag and Upload File or Click to Select
                                    </label>
                                    <input
                                        type="file"
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        {...register("file", { required: "File is required" })}
                                        onChange={handleFileChange}
                                    />
                                    {errors.file && (
                                        <span className="text-red-500 text-sm">{errors.file.message}</span>
                                    )}
                                </div>
                                {selectedFileName && (
                                    <span className="block text-xs text-slate-500">
                                        Selected file: {selectedFileName}
                                    </span>
                                )}
                            </div>
                            <footer className='pt-6 flex justify-end space-x-4 mt-4 border-t border-gray-200'>
                                <Button onClick={handleCloseModal} type="button" variant="outline">Cancel</Button>
                                <Button type="submit">Create</Button>
                            </footer>
                        </form>
                    </div>
                </div>
            )}

            {previewFile && (
                <div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 py-8'>
                    <div className={`bg-white p-8 rounded-lg shadow-xl w-full ${isLg ? 'sm:w-5/6 md:w-5/6 lg:w-1/2' : 'sm:w-5/6 md:w-4/6 lg:w-3/6 xl:w-2/6'} h-full max-h-screen mx-auto flex flex-col transform transition-transform duration-300`}>
                        <div className='flex justify-between items-center pb-2 mb-4 border-b border-gray-200'>
                            <h2 className='text-lg md:text-xl font-medium'>{previewFile.name}</h2>
                            <button onClick={handleClosePreview} className="text-gray-500 hover:text-gray-700">
                                <X size={24} />
                            </button>
                        </div>
                        <div className='flex-grow overflow-auto'>
                            {previewFile.type.startsWith('image/') ? (
                                <div className='relative w-full h-full'>
                                    <Image
                                        src={URL.createObjectURL(previewFile)}
                                        alt={previewFile.name}
                                        layout="fill"
                                        objectFit="contain"
                                        className="rounded-lg"
                                    />
                                </div>
                            ) : previewFile.type === 'application/pdf' && isLg ? (
                                <div className="text-center">
                                    <p className='text-slate-500'>Your browser does not support PDFs. Please download the PDF to view it:</p>
                                    <a href={URL.createObjectURL(previewFile)} download={previewFile.name} className="text-blue-500 underline">
                                        Download PDF
                                    </a>
                                </div>
                            ) : (
                                <iframe src={URL.createObjectURL(previewFile)} className="w-full h-full border-0"></iframe>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Casts;