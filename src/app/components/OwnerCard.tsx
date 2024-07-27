import React, { useMemo } from 'react'
import { Owner } from '../findcar/page'
interface OwnerCardProps {
    owner: Owner;

}
export default function OwnerCard({ owner }: OwnerCardProps) {
    return (
        <div className='w-72 h-72 text-wrap  border-2 rounded-md border-white text-black font-semibold  pl-2 bg-slate-300 flex flex-col overflow-y-auto'>
            <h1 className='break-words overflow-wrap'><span className='font-semibold text-amber-800 mr-2 '>NU ID:</span>{owner.nuid}</h1>
            <h1 className='break-words overflow-wrap'><span className='font-semibold mr-2 text-amber-800'>OWNER NAME:</span>{owner.OwnerName}</h1>
            <h1 className='break-words overflow-wrap'><span className='font-semibold mr-2 text-amber-800'>CAR NAME:</span>{owner.carname}</h1>
            <h1 className='break-words overflow-wrap'><span className='font-semibold mr-2 text-amber-800'>MONTHLY CHARGES:</span>{owner.monthlycharges}</h1>
            <h1 className='break-words overflow-wrap' ><span className='font-semibold mr-2 text-amber-800'>Complete ROUTE:</span>{owner.completeRoute}</h1>
            <h1 className='break-words overflow-wrap'><span className='font-semibold mr-2 text-amber-800 '>WhatsApp:</span>{owner.WhatsApp}</h1>
        </div>
    )
}
