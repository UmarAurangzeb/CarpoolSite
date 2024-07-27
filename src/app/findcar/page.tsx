import React from 'react'
import prisma from '../lib/db'
import SearchBox from '../components/SearchBox';
import OwnerCard from '../components/OwnerCard';
import Link from 'next/link';
import FindCarSection from '../components/FindCarSection';

export type Owner = {
    nuid: string;
    OwnerName: string;
    carname: string;
    monthlycharges: number;
    completeRoute: string;
    WhatsApp: string;
}

export type allOwners = Owner[];

export default async function page() {
    const allOwners = await prisma.carowner.findMany();
    // console.log("owners=", allOwners);
    return (

        <>
            <FindCarSection allOwners={allOwners} />
        </>

    )
}
