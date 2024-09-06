"use client"
import { Img } from '@react-email/components';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
export default function VerificationRedirect({ token }: any) {
    const router = useRouter();
    const [loader, setloader] = useState(true)
    const [tick, settick] = useState(false);
    const [message, setMessage] = useState('');
    useEffect(() => {
        setloader(true)
        const fetchres = async () => {
            try {
                const res = await fetch('/verifytoken/api', {
                    method: 'POST',
                    headers: {
                        contentType: 'application/json'
                    },
                    body: JSON.stringify(token)
                })
                setloader(false);
                if (!res.ok) {
                    setMessage("error verifying user,please signup to verify account.")
                    return;
                }
                setloader(false);
                settick(true);
                setTimeout(() => {
                    router.push('/login')
                }, 1000)
            }

            catch (err) {
                setloader(false);
                setMessage("error verifying user,please signup to verify account");
            }
        }
        fetchres();
    }, [])

    return (
        <div className='flex justify-center items-center mt-40'>
            {loader && <img src='loader.svg'></img>}
            {tick && <img src='tick2.png' className='w-24 h-24'></img>}
            {message && <h1 className='text-2xl font-semibold text-center text-wrap '>{message}</h1>}
        </div>
    )
}
