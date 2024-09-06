import React from 'react'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { useSession } from "next-auth/react"
export default function NavLinksRight() {
    const { data: session, status } = useSession()
    return (
        <div className='lg:flex lg:gap-x-20 font-bold hidden mt-2 hover:text-accent '>
            {!session?.user && <Link href={"/login"} >Login</Link>}
            {!session?.user && <Link href="/register">Sign up</Link>}
            { }
            {session?.user && <Link href="#" onClick={() => signOut({ callbackUrl: '/', redirect: true })}>Sign Out </Link>
            }
        </div>
    )
}
