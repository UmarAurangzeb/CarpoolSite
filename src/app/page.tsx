import Link from 'next/link';
import React from 'react'
import prisma from './lib/db';



export default async function Home() {
  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='flex flex-col w-full space-y-4 mx-auto my-auto justify-center items-center '>
        <Link href={"/addcar"}><button className='w-48 lg:w-56' >Add a Car</button></Link>
        <Link href={"/findcar"}><button className='w-48 lg:w-56'>Find a Car</button></Link>
      </div>
    </div>
  )
}
