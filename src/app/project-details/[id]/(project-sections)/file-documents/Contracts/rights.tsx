import { Button } from '@/components/ui/button'
import { Folders, FolderOpen } from 'lucide-react'
import React, { FC, useState } from 'react'
import { Find, Sort, Plus } from '../ui/docsIcons'
import { useForm, SubmitHandler } from 'react-hook-form';

interface FormData {
    name: string;
    file: FileList;
}

const Rights: FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => { setIsModalOpen(false); reset(); };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            register("file").onChange(e);
        }
    };

    const onSubmit: SubmitHandler<FormData> = data => {
        console.log(data);
        handleCloseModal();
    };
    return (
        <section>
            <div className='py-5 flex flex-row gap-2 -mb-2 mt-5'>
                <Folders />
                <div className='flex flex-col -mt-2'>
                    <span className='text-2xl font-medium'>Rights</span>
                    <span className='text-slate-500 text-xs'>
                        Here you can organize all contracts for rights.
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
                <div className='flex space-x-1 mt-4'>
                    <Button variant="outline" size="icon">
                        <Find />
                    </Button>
                    <Button variant="outline" size="icon">
                        <Sort />
                    </Button>
                </div>
            </div>
            <div className='mt-8 '>
                <div className="relative mb-4 border-2 border-solid border-gray-200 rounded flex flex-col items-center justify-center py-10">
                    <FolderOpen className="text-blue-500 lg:w-22 lg:h-20 md:w-20 md:h-18 w-10 h-8 mb-4 stroke-1" />
                    <label className="text-xs text-slate-400 mb-2 lg:text-sm md:text-sm text-center">
                        <span>No contracts have been added yet.</span>
                    </label>
                </div>
            </div>
            {isModalOpen && (
                <div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50'>
                    <div className='bg-white p-6 rounded w-96 max-h-full'>
                        <div className='flex justify-between items-center pb-2 mb-4'>
                            <h2 className='text-xl font-medium'>Create Contract</h2>
                            <button onClick={handleCloseModal}>
                                <span className='text-2xl font-light'>&times;</span>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label className='block mb-2 text-xs'>
                                    Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    className={`w-full p-2 border ${errors.name ? 'border-red-500' : 'border-gray-200'} rounded mb-4`}
                                    type="text"
                                    {...register("name", { required: "Name is required" })}
                                />
                                {errors.name && (
                                    <span className="text-red-500 text-sm">{errors.name.message}</span>
                                )}
                            </div>
                            <div>
                                <label className='block mb-2 text-xs'>
                                    Choose a file <span className="text-red-500">*</span>
                                </label>
                                <div className="relative mb-4 border-2 border-dashed border-gray-200 rounded flex flex-col items-center justify-center py-10">
                                    <FolderOpen className="text-blue-500 w-10 h-10 mb-4" />
                                    <label className="block text-xs text-slate-500 mb-2">
                                        Drag and Upload File
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
                            </div>
                            <footer className='pt-4 flex justify-end space-x-3 mt-4'>
                                <Button onClick={handleCloseModal} type="button" variant="outline">Cancel</Button>
                                <Button type="submit">Create</Button>
                            </footer>
                        </form>
                    </div>
                </div>
            )}
        </section>
    )
}

export default Rights