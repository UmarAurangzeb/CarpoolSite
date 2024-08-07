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
        <div className='fixed top-1 left-0 bg-slate-950 w-full h-auto mt-16 opacity-85 animate-top-to-bottom'>
            <div className='flex flex-col gap-y-2 group'>
                <Link href="/" className='hover:bg-slate-800 py-2 pl-2'>Home</Link>
                {!session?.user.isVerified && <Link href="/register" className='hover:bg-slate-800 py-2 pl-2'>Signup</Link>}
                {!session?.user.isVerified && <Link href={'/login'} className='hover:bg-slate-800 py-2 pl-2'>Login</Link>}
                <Link href={'/addcar'} className='hover:bg-slate-800 py-2 pl-2'>Add Car</Link>
                <Link href={`/deletecar`} className='hover:bg-slate-800 py-2 pl-2'>Delete Car</Link>
                {session?.user.isVerified && <Link href="#" className='hover:bg-slate-800 py-2 pl-2' onClick={() => signOut({ callbackUrl: '/', redirect: true })}>Sign Out </Link>}
            </div>
        </div>
    )
}
