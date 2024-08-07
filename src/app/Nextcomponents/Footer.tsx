
import React from 'react'
import Link from 'next/link'
import { FaLinkedin } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";

export default function Footer() {
    return (
        <div className='bg-slate-950 py-2 justify-center text-gray-100 flex gap-x-2 mt-10 mx-auto relative bottom-0 w-full'>
            <h1 className='text-sm'>{"Hello fellas,its me Umar.Sole Creator of this Website,For feedback or to get in touch"}
                <FaLongArrowAltRight className='mr-1 ml-1 inline' />
                <a href="https://www.linkedin.com/in/umar-aurangzeb" target='_blank'><FaLinkedin className='hover:text-gray-700 inline' /></a>
            </h1>
        </div>
    )
}
