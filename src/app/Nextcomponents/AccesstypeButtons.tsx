"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation'



export default function AccesstypeButtons({ AccessType, setAccessType }: any) {
    // const searchParams = useSearchParams()
    const activeButton = AccessType
    console.log(activeButton)

    const router = useRouter();

    const handleClick = (button: string) => {
        setAccessType(button);
    };

    return (
        <div className=' flex flex-row mt-7 md:mr-4 mx-auto   h-10'>
            <button
                className={`text-sm md:text-base  w-16 md:max-w-80 md:w-24 mr-2 transition ease-in-out py-0 duration-800 ${activeButton === 'Daily' || activeButton === null ? 'border-2' : 'border-0'}`}
                onClick={() => handleClick('Daily')}
            >
                Daily
            </button>
            <button
                className={`text-sm md:text-base w-20 md:w-24 transition ease-in-out duration-800  ${activeButton === 'Semester' ? 'border-2' : 'border-0'}`}
                onClick={() => handleClick('Semester')}
            >
                Semester
            </button>
        </div>
    );
}
