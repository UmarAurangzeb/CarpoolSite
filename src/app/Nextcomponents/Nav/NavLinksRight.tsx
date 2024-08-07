import React from 'react'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { useSession } from "next-auth/react"
export default function NavLinksRight() {
    const { data: session, status } = useSession()
    return (
        <div className='lg:flex lg:gap-x-20 font-bold hidden mt-2 '>
            {!session?.user.isVerified && <Link href={"/login"} >Login</Link>}
            {!session?.user.isVerified && <Link href="/register">Sign up</Link>}
            { }
            {session?.user.isVerified && <Link href="#" onClick={() => signOut({ callbackUrl: '/', redirect: true })}>Sign Out </Link>
            }
        </div>
    )
}
