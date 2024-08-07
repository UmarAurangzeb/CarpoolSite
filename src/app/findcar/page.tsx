import React from 'react'
import prisma from '../lib/db'
import SearchBox from '../Nextcomponents/SearchBox';
import OwnerCard from '../Nextcomponents/OwnerCard';
import Link from 'next/link';
import FindCarSection from '../Nextcomponents/FindCarSection';
export const dynamic = "force-dynamic";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'FindCar',
};

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
