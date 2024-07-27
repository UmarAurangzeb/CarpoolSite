'use client'
import React, { useState } from 'react'
import { Owner } from '../findcar/page'
import Link from 'next/link';
import SearchBox from './SearchBox';
import OwnerCard from './OwnerCard';

interface FindCardProps {
    allOwners: Owner[];
}
export default function FindCarSection({ allOwners }: FindCardProps) {
    const [searchRoute, setSearchRoute] = useState('');
    const [OwnerData, setOwnerData] = useState(allOwners);
    const handleSearch = (e: any) => {
        setSearchRoute(prev => {
            return (
                e.target.value);
        })
    }


    return (
        <div >
            <Link href="/"><button className='w-20 p-2 mt-2 ml-2'>Back</button></Link>
            <div className='flex flex-col max-w-8xl items-center md:items-stretch'>
                <SearchBox handleSearch={handleSearch} />
                <div className='flex flex-wrap gap-y-2 gap-x-2 justify-center '>

                    {OwnerData.filter((item) => {
                        return searchRoute.trim() == '' ? item : item['completeRoute'].toLowerCase().includes(searchRoute.toLowerCase())
                    }).map((owner) => {
                        return (
                            <div key={owner.nuid} >
                                <OwnerCard owner={owner} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}
