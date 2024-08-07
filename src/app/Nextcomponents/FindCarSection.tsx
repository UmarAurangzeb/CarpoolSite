'use client'
import React, { useState } from 'react'
import { Owner } from '../../types/dbtypes'
import Link from 'next/link';
import SearchBox from './SearchBox';
import OwnerCard from './OwnerCard';
export const dynamic = "force-dynamic";
import AccesstypeButtons from './AccesstypeButtons';

interface FindCardProps {
    allOwners: Owner[];
}
export default function FindCarSection({ allOwners }: FindCardProps) {

    const [searchRoute, setSearchRoute] = useState('');
    const [OwnerData, setOwnerData] = useState(allOwners);
    console.log("allowners from findcar", allOwners[0]);
    const handleSearch = (e: any) => {
        setSearchRoute(prev => {
            return (
                e.target.value);
        })
    }
    if (allOwners.length == 0) {
        return (
            <>
                <div className='w-screen h-screen flex flex-col items-center justify-center gap-y-4 mx-auto '>
                    <h1 className='text-4xl font-semibold mx-auto'>no cars listed currently!</h1>
                    <Link href={'./addcar'}><button>Add a car</button></Link>
                </div>
            </>
        )
    }


    return (
        <div >
            <div className='flex flex-col max-w-7xl items-center md:items-stretch mt-24'>
                <div className='flex max-w-9xl mx-auto lg:justify-between '>
                    <AccesstypeButtons />
                    <SearchBox handleSearch={handleSearch} />
                </div>
                <div className='flex flex-wrap gap-y-2 gap-x-2 justify-center '>

                    {OwnerData.filter((item) => {
                        return searchRoute.trim() == '' ? item : item['completeRoute'].toLowerCase().includes(searchRoute.toLowerCase())
                    }).map((owner, index) => {
                        return (
                            <div key={index} >
                                <OwnerCard owner={owner} deleteOption={false} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}
