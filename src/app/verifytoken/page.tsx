
import React from 'react'
// import { useSearchParams } from 'next/navigation'
import prisma from '../lib/db';
import Link from 'next/link';
export default async function pages({ searchParams }: { searchParams: any }) {

    const token = searchParams.token;
    console.log("token=", token);
    const user = await prisma.user.findFirst({
        where: {
            verificationtoken: token
        }
    })
    if (!token) {
        console.error("Token verification failed", token);
        throw new Error("No token found")
    }
    else if (!user) {
        console.error("Token verification failed. User not found for token:", token);
        throw new Error("invalid token");
    }

    const currentTime = new Date();
    if (user.tokenexpiry > currentTime) {
        const updateverification = await prisma.user.update({
            where: { email: user.email },
            data: { isVerified: true, verificationtoken: '' }
        });
        if (!updateverification) {
            throw new Error("failed to update user");
        }
        else {
            return (<>
                <div className='w-screen h-screen flex justify-center items-center flex-col'>
                    <div className='text-red-700 text-2xl '>email verified,signin now!</div>
                    <Link href={'/login'}><button>Sign in</button></Link>
                </div>

            </>)
        }
    }

}
