'use client'
import React, { useEffect, useState } from 'react'
import { Owner } from '../../types/dbtypes'
import Link from 'next/link';
import SearchBox from './SearchBox';
import OwnerCard from './OwnerCard';
export const dynamic = "force-dynamic";
import AccesstypeButtons from './AccesstypeButtons';
import { allOwners } from '../findcar/page';

interface FindCardProps {
    allOwners: Owner[];
}
export default function FindCarSection({ allOwners }: FindCardProps) {
    const [OwnerData, setOwnerData] = useState<Owner[]>([]);
    const [AccessType, setAccessType] = useState("Daily")
    const [loader, setLoader] = useState(false);
    console.log(allOwners);

    useEffect(() => {
        setLoader(true);
        const filterwithAccessType = allOwners.filter((owner: Owner, index: number) => (
            owner.AccessType === AccessType
        ))
        setOwnerData(filterwithAccessType)
        setLoader(false);
    }, [AccessType])
    const [searchRoute, setSearchRoute] = useState('');

    console.log("allowners from findcar", allOwners[0]);
    const handleSearch = (e: any) => {
        setSearchRoute(prev => {
            return (
                e.target.value);
        })
    }



    return (
        <div className='' >
            <div className='flex flex-col max-w-9xl items-center md:items-stretch mt-24 px-'>
                <div className='flex md:flex-row flex-col lg:justify-center lg:gap-x-36 mx-auto w-full px-4 '>
                    <AccesstypeButtons AccessType={AccessType} setAccessType={setAccessType} />
                    <SearchBox handleSearch={handleSearch} />

                </div>
                {
                    OwnerData.length == 0 &&

                    <div className='flex flex-col items-center justify-center gap-y-4 mx-auto mt-28'>
                        <h1 className='text-2xl md:text-4xl font-semibold mx-auto my-auto'>no cars listed currently!</h1>
                        <Link href={'./addcar'}><button>Add a car</button></Link>
                    </div>

                }
                {loader && <img src="loader.svg" alt="" />}
                {OwnerData.length > 0 &&
                    <div className='flex flex-wrap gap-y-2 gap-x-2 justify-center mx-auto mt-6  '>

                        {OwnerData.filter((item) => {
                            return searchRoute.trim() == '' ? item : item['completeRoute'].toLowerCase().includes(searchRoute.toLowerCase())
                        }).map((owner, index) => {
                            return (
                                <div key={index} className='' >
                                    <OwnerCard owner={owner} deleteOption={false} />
                                </div>
                            );
                        })}
                    </div>}
            </div>
        </div>
    )
}
