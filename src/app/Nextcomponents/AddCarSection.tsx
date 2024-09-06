"use client"
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
// import { FormFields } from '@/types/authtypes';
import { z } from "zod"
import { notifysuccess, notifyfailure } from '../lib/Toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { redirect } from "next/navigation"
import { useState } from 'react';
import { schema } from '../../types/zod/schema';


type FormFields = z.infer<typeof schema>

export default function Page({ email }: any) {
    const router = useRouter();
    const { register, handleSubmit, watch, reset, formState: { errors, isSubmitting } } = useForm<FormFields>(
        {
            resolver: zodResolver(schema)
        }
    );
    const accesstype = watch("AccessType", "Daily");


    const onSubmit: SubmitHandler<FormFields> = async (ownerData) => {
        console.log("aasd");
        try {
            const res = await fetch('/addcar/api', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ownerData: ownerData, email: email }),
            })
            if (!res.ok) {
                notifyfailure("error adding car!");
                return;
            }

            if (res.status == 200) {
                notifysuccess("Car registered Successfully");
                reset();

            }
            const result = await res.json();
            notifyfailure(result.message);
        }

        catch (err) { notifyfailure("error adding car!") }
    }
    // const handleChange = (e: any) => {
    //     setaccesstypestate(e.target.value);

    return (
        <>
            <div className=" flex flex-col items-center justify-center">
                <div className=' w-full md:w-4/5 '>
                    <ToastContainer
                        position="bottom-right"
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                        transition={Bounce}
                    />
                    <form action="/" className='flex flex-col gap-y-2 max-w-7xl pb-4 w-2/3 mx-auto' onSubmit={handleSubmit(onSubmit)} >
                        <h1 className="text-4xl mt-28 text-white font-semibold  mx-auto mb-3">Owner Details</h1>
                        {/* 1 */}
                        {/* 3 */}
                        <label htmlFor="AccessType" className='mt-2' >AccessType</label>
                        <select {...register("AccessType")} className='p-4 pl-1 bg-primary'>
                            <option value="Daily" className='bg-primary hover:bg-teal-950'>Daily</option>
                            <option value="Semester" className='bg-primary'>Semester</option>
                        </select>
                        {errors.AccessType && <div className='text-red-600'>{errors.AccessType.message}</div>}
                        {/* 4 */}

                        {accesstype === "Daily" && <> <label htmlFor="BriefDescription" >Brief Description</label>
                            <input {...register("BriefDescription")} type="text" id='BriefDescription' placeholder='eg:leaving fast at 3pm' className=''
                            />
                            {errors.BriefDescription && <div className='text-red-600'>{errors.BriefDescription.message}</div>}
                        </>}

                        {/* 5 */}

                        {accesstype === "Semester" && <><label htmlFor="MonthlyCharges" >Monthly Charges</label>
                            <input {...register("MonthlyCharges")} placeholder='7000' type="text" id='MonthlyCharges' className=''
                            />
                            {errors.MonthlyCharges && <div className='text-red-600'>{errors.MonthlyCharges.message}</div>}
                        </>
                        }
                        {/* 6 */}
                        <label htmlFor="CompleteRoute">Complete Route</label>
                        <input {...register("CompleteRoute")} type="text" id='CompleteRoute' placeholder='eg:gulshanchowrangi-millenium-fast' className=''
                        />
                        {errors.CompleteRoute && <div className='text-red-600'>{errors.CompleteRoute.message}</div>}
                        {/* 7 */}
                        <label htmlFor="Whatsapp">WhatsApp</label>
                        <input {...register("Whatsapp")} placeholder='03001233445' type="text" id='Whatsapp' className=''
                        />
                        {errors.Whatsapp && <div className='text-red-600'>{errors.Whatsapp.message}</div>}
                        <button className='w-44 mx-auto mt-4' type="submit">{isSubmitting ? "Loading..." : "Submit"}</button>
                    </form>
                </div>
            </div>
        </>
    )
}
