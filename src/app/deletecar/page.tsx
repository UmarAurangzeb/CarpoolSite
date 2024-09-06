import React from 'react'
import { authOptions } from "../api/auth/[...nextauth]/options"
import { getServerSession } from 'next-auth'
import { redirect } from "next/navigation"
import prisma from '../lib/db'
import { Owner } from '../../types/dbtypes'
import OwnerCard from '../Nextcomponents/OwnerCard'
export const dynamic = "force-dynamic";


export default async function page() {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect('/register');
    }
    const OwnerData = await prisma.carowner.findMany({
        where: {
            OwnerEmail: session.user.email?.toString()
        },
    })
    if (OwnerData.length == 0) {
        return (
            <div className="w-screen h-screen flex justify-center items-center text-white mt- flex-col mt-20 gap-y-2">
                <h2 className='text-4xl font-semibold'>Nothing to delete!</h2>
            </div>
        );
    }
    return (
        <>
            <div>
                <div className='mt-24 lg:text-4xl text-3xl font-bold underline underline-offset-8 text-center decoration-teal-500'>My Listing</div>
                {
                    OwnerData.map((user) => {
                        return (
                            <>
                                <div className='flex justify-center mt-10'>
                                    <OwnerCard owner={user} deleteOption={true} />
                                </div>
                            </>
                        );
                    })

                }
            </div>
        </>
    );
}

