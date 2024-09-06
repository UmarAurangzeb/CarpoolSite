"use client"
import React, { useEffect, useState } from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
import { RiShoppingBasketLine } from "react-icons/ri";
import { CiUser } from "react-icons/ci";
import { CiStar } from "react-icons/ci";
import NavLinksLeft from './NavLinksLefts'
import NavLinksRight from './NavLinksRight';
import { IoMdClose } from "react-icons/io";
import NavigationMenu from './NavigationMenu';
import { usePathname } from 'next/navigation';
import { useSession } from "next-auth/react"


export default function Navbar() {
    const { data: session, status } = useSession()
    // console.log(session?.user);
    const [iconClicked, setIconClicked] = useState(false);

    // useEffect(() => {
    //     if (iconClicked) {
    //         document.body.style.overflow = 'hidden'; // Prevent background scroll
    //     } else {
    //         document.body.style.overflow = ''; // Restore default scroll
    //     }
    // }, [iconClicked]);


    const handleClick = () => {
        console.log("hello")
        setIconClicked(prev => !prev);

    }


    return (
        <div className='flex justify-between sm:mx-auto max-w-8xl px-8 bg-primary fixed lg:py-5 py-3 top-0 w-full  z-[10000] '>
            <div className='flex flex-col items-center lg:hidden'>
                <div className='text-2xl cursor-pointer pt-2' onClick={handleClick}>{iconClicked ?
                    (
                        <>
                            <IoMdClose />
                            <NavigationMenu />
                        </>
                    ) :
                    (<RxHamburgerMenu />
                    )}</div>
                <h6 className='text-sm text-center font-semibold '>MENU</h6>
            </div>
            <NavLinksLeft />
            <div className='text-center flex-grow md:justify-center flex justify-center items-center flex-col mt-1 lg:mr-28 lg:pr-16 '>
                <h1 className='font-serif xlg:text-4xl text-white text-2xl tex '>FAST CARPOOL</h1>
                <p className='text-gray-500'></p>
            </div>
            <NavLinksRight />
        </div>
    )
}
