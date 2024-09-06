
import React from 'react'
import prisma from './lib/db'
// import SearchBox from '../Nextcomponents/SearchBox';
// import OwnerCard from '.';
import Link from 'next/link';
import FindCarSection from './Nextcomponents/FindCarSection';
export const dynamic = "force-dynamic";
import { Metadata } from 'next';
import { Owner, allOwners } from '../types/dbtypes'
// import AccessTypeContext from '../app/Context/AccessTypeContext';

export const metadata: Metadata = {
  title: 'Home',
};


export default async function page({ searchParams }: any) {
  // const AccessType = searchParams["AccessType"];
  // console.log(AccessType);
  let allOwners: Owner[] = []
  // if (AccessType === undefined || AccessType === "Daily") {

  // allOwners = await prisma.carowner.findMany({
  //   where: {
  //     AccessType: "Daily",
  //     createdAt: {
  //       lte: new Date(Date.now()),
  //       gte: twentyFourHoursAgo
  //     }
  //   }

  // });
  // console.log(allOwners)
  // }
  // else if (AccessType === "Semester") {
  // allOwners = await prisma.carowner.findMany(
  //   {
  //     where:
  //     {
  //       AccessType: "Semester"
  //     }
  //   }
  // );
  // console.log(allOwners)
  // }

  const twentyFourHoursAgo = new Date(Date.now() - (24 * 60 * 60 * 1000));
  allOwners = await prisma.carowner.findMany({
    where: {
      OR: [
        {
          AccessType: "Semester"
        },
        {
          AccessType: "Daily",
          createdAt: {
            lte: new Date(Date.now()),
            gte: twentyFourHoursAgo
          }
        }
      ]
    }
  });


  return (
    <>

      <div className=''>
        <FindCarSection allOwners={allOwners} />
      </div>
    </>

  )
}
