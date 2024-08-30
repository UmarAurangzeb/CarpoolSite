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



    return (
        <div className='' >
            <div className='flex flex-col max-w-9xl items-center md:items-stretch mt-24'>
                <div className='flex md:flex-row flex-col w-full lg:justify-center lg:gap-x-36 mx-auto '>
                    <AccesstypeButtons />
                    <SearchBox handleSearch={handleSearch} />

                </div>
                {
                    allOwners.length == 0 &&

                    <div className='flex flex-col items-center justify-center gap-y-4 mx-auto mt-28'>
                        <h1 className='text-2xl md:text-4xl font-semibold mx-auto my-auto'>no cars listed currently!</h1>
                        <Link href={'./addcar'}><button>Add a car</button></Link>
                    </div>

                }

                {allOwners.length > 0 &&
                    <div className='flex flex-wrap gap-y-2 gap-x-2 justify-center mx-auto  '>

                        {OwnerData.filter((item) => {
                            return searchRoute.trim() == '' ? item : item['completeRoute'].toLowerCase().includes(searchRoute.toLowerCase())
                        }).map((owner, index) => {
                            return (
                                <div key={index} >
                                    <OwnerCard owner={owner} deleteOption={false} />
                                </div>
                            );
                        })}
                    </div>}
            </div>
        </div>
    )
}
