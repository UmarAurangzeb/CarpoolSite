
import React from 'react'
// import { useSearchParams } from 'next/navigation'
import prisma from '../lib/db';
import Link from 'next/link';
import VerificationRedirect from '../Nextcomponents/VerificationRedirect';

export default async function pages({ searchParams }: { searchParams: any }) {

    const token = searchParams.token;
    console.log("token=", token);
    return (
        <>
            <VerificationRedirect token={token} />
        </>
    );





    //     else {
    //         return (<>
    //             user verified
    //         </>
    //         )
    //     }
    // }

}
