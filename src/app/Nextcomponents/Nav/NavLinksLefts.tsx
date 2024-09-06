import React from 'react'
import Link from 'next/link'
export default function NavLinksLeft() {
    return (
        <div className='lg:flex lg:gap-x-12  font-bold hidden mt-2 hover:text-accent '>
            <Link href={"/addcar"}>Add Car</Link>
            <Link href={"/deletecar"}>Delete Car</Link>
            <Link href={"/"}>Home</Link>
        </div>
    )
}
