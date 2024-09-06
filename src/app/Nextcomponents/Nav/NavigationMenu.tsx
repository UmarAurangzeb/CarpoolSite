import React from 'react'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
// import { authOptions } from '../../api/auth/[...nextauth]/route'
// import { getServerSession } from 'next-auth'
import { useSession } from "next-auth/react"
export default function NavigationMenu() {
    const { data: session, status } = useSession()
    console.log("hello")
    // const session = await getServerSession(authOptions);
    return (
        <div className='fixed top-1 left-0 bg-primary w-full h-auto mt-[70px] opacity-85 animate-top-to-bottom  '>
            <div className='flex flex-col gap-y-2 group'>
                <Link href="/" className='hover:bg-secondary py-2 pl-2'>Home</Link>
                {!session?.user && <Link href="/register" className='hover:bg-secondary py-2 pl-2'>Sign Up</Link>}
                {!session?.user && <Link href={'/login'} className='hover:bg-secondary py-2 pl-2'>Sign In</Link>}
                <Link href={'/addcar'} className='hover:bg-secondary py-2 pl-2'>Add Car</Link>
                <Link href={`/deletecar`} className='hover:bg-secondary py-2 pl-2'>Delete Car</Link>
                {session?.user && <Link href="#" className='hover:bg-secondary py-2 pl-2' onClick={() => signOut({ callbackUrl: '/', redirect: true })}>Sign Out </Link>}
            </div>
        </div>
    )
}
