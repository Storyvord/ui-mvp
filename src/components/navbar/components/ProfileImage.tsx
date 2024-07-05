"use client"

import React from 'react'
import Image from 'next/image'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import Link from 'next/link'
import { Button } from '../../ui/button'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation';


const ProfileImage = () => {
    const router = useRouter();
    const handleClick = () => {
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        router.push('/auth/sign-in');
    }
    return (
        <Popover>
            <PopoverTrigger>
                <Image src="/photo-1603415526960-f7e0328c63b1.avif" alt="Crew Profile" aria-expanded="true" aria-haspopup="dialog" className="inline-block relative object-cover object-center !rounded-full w-12 h-12 cursor-pointer" width={48} height={48} priority aria-controls=":r9:" />
            </PopoverTrigger>
            <PopoverContent className='p-0 w-fit'>
                <nav className='flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-[#455A64]'>
                    <Link href="/dashboard/profile">
                        <Button variant="ghost" className='w-full justify-start text-base p-3 '>
                            Profile
                        </Button>
                    </Link>
                    <Button variant="ghost" className='w-full justify-start text-base  p-3 ' onClick={handleClick}>
                        Logout
                    </Button>
                </nav>
            </PopoverContent>
        </Popover>
    )
}

export default ProfileImage
