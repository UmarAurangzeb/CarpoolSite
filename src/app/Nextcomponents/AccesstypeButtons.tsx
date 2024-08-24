"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation'



export default function AccesstypeButtons() {
    const searchParams = useSearchParams()
    const activeButton = searchParams.get('AccessType')
    console.log(activeButton)

    const router = useRouter();

    const handleClick = (button: string) => {
        router.push(`/?AccessType=${button}`);
    };

    return (
        <div className=' flex flex-row mt-6  mr-2 md:mr-4 h-10'>
            <button
                className={`text-xs md:text-base w-16 md:max-w-80 md:w-24 mr-2 transition ease-in-out py-0 duration-800 ${activeButton === 'Daily' || activeButton === null ? 'border-2' : 'border-0'}`}
                onClick={() => handleClick('Daily')}
            >
                Daily
            </button>
            <button
                className={`text-xs md:text-base w-20 md:w-24 transition ease-in-out duration-800  ${activeButton === 'Semester' ? 'border-2' : 'border-0'}`}
                onClick={() => handleClick('Semester')}
            >
                Semester
            </button>
        </div>
    );
}
