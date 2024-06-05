import React from 'react'
import { Button } from '@/components/ui/button';
import { Find, Sort, List, Contracts, Script, Sheet, Plus } from './ui/docsIcons';
// import { CallSheet } from '@/components/sidebar/components/Sidebaricons';

const File = () => {
    return (
        <section className='font-sans'>
            <div className='text-black text-xl lg:text-2xl md:text-2xl font-semibold underline underline-offset-8 md:underline-offset-8 text-center lg:text-left md:text-left mt-8'>Files & Documents</div>
            <div className='text-black mt-8 flex flex-col md:flex-row lg:flex-row items-center lg:justify-between md:justify-between'>
                <div className='flex'>
                    <Button variant="outline" className='w-26 h-12 flex flex-row'>
                        <Plus />
                        Create Room</Button>
                </div>
                <div className='flex space-x-1 mt-4'>
                    <Button variant="outline" size="icon">
                        <Find />
                    </Button>
                    <Button variant="outline" size="icon">
                        <Sort />
                    </Button>
                    <Button variant="outline" size='icon'>
                        <List />
                    </Button>
                </div>
            </div>
            <div className='text-xl lg:space-x-5 md:space-x-5 mt-8 flex flex-col lg:flex-row md:flex-row items-center space-y-5 lg:space-y-0 md:space-y-0'>
                <div className='w-80 h-44 shadow items-start flex bg-white border-1.5 hover:cursor-pointer rounded'>
                    <div className='py-4 px-4 flex flex-col space-y-1'>
                        <Contracts />
                        <a href="" className='text-lg'>Contracts</a>
                        <span className='text-black text-xs'>You can find contracts for actors, insurances and more here.</span>
                    </div>
                </div>
                <div className='w-80 h-44 shadow border-1.5 bg-white items-start flex flex-col rounded'>
                    <div className='py-4 px-4 flex flex-col space-y-1'>
                        <Script />
                        <a href="" className='text-lg'>Script & Development</a>
                        <span className='text-xs'>You can find everything related to development here.</span>
                    </div>
                </div>
                <div className='w-80 h-44 shadow bg-white border-1.5 items-start flex flex-col rounded'>
                    <div className='py-4 px-4 flex flex-col space-y-1'>
                        <Sheet />
                        <a href="" className='text-lg'>Sent Call Sheets</a>
                        <span className='text-xs'>You can find copies of your call sheets here after sending them to your crew.</span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default File;