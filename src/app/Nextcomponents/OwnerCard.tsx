"use client"
import React, { useMemo, useState } from 'react'
import { Owner } from '../../types/dbtypes'
import Link from 'next/link';
import { IoCloseCircleSharp } from "react-icons/io5";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../../components/ui/AlertBox"
import { notifysuccess, notifyfailure } from '../lib/Toast';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation'
interface OwnerCardProps {
    owner: Owner;
    deleteOption: boolean

}


export default function OwnerCard({ owner, deleteOption }: OwnerCardProps) {
    const router = useRouter();

    const handleClick = async () => {
        const res = await fetch('/deletecar/api', {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(owner)
        })
        if (!res.ok) {
            notifyfailure("error deleting card");
            return
        }
        const result = await res.json();
        if (result.success) {
            notifysuccess(result.message)
            router.refresh();
        }
        else {
            notifyfailure(result.message);
        }

    }
    return (
        <>
            <ToastContainer
                position="bottom-right"
                autoClose={2000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <div className='w-80 min-h-[260px] h-auto pt-4 mb-8 text-wrap  border-2 rounded-md border-white font-semibold text-md relative  pl-2 bg-primary text-white flex flex-col gap-y-2 overflow-y-auto  px-2 '>
                {deleteOption && <AlertDialog>
                    <AlertDialogTrigger className='bg-transparent border-0 w-fit  p-0 absolute top-0 right-0 '> <div ><IoCloseCircleSharp className='text-red-600 text-xl float-end cursor-pointer' /> </div></AlertDialogTrigger>
                    <AlertDialogContent className='bg-teal-950'>
                        <AlertDialogHeader className=''>
                            <AlertDialogTitle className='text-red-500 font-bold'>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription className='text-white'>
                                This will permanently delete this car list from our website
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction className='' onClick={handleClick}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>}


                <div className={`${deleteOption ? "mt-5" : ""}`}><h1 className='break-words overflow-wrap'><span className={`font-semibold text-teal-400 mr-2`}>OwnerEmail:</span>{owner.OwnerEmail}</h1></div>
                {owner.AccessType === "Semester" && <h1 className='break-words overflow-wrap'><span className='font-semibold mr-2 text-teal-400 '>MONTHLY CHARGES:</span>{owner.monthlycharges}</h1>}
                {owner.AccessType === "Daily" && <h1 className='break-words overflow-wrap'><span className='font-semibold mr-2 text-teal-400'>Description:</span>{owner.BriefDescription}</h1>}
                <h1 className='break-words overflow-wrap' ><span className='font-semibold mr-2 text-teal-400'>Complete ROUTE:</span>{owner.completeRoute}</h1>
                <h1 className='break-words overflow-wrap' ><span className='font-semibold mr-2 text-teal-400'>Posted At:</span>{owner.createdAt.toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                })}</h1>
                <div className='flex justify-center w-fit mx-auto items-center h-max mt-5 bg-green-600 hover:bg-green-700 p-2 border-2 rounded-lg cursor-pointer mb-3'>
                    <Link href={`https://wa.me/${owner.WhatsApp}`} className=''>Whatsapp</Link>
                </div>
            </div>
        </>
    )
}
