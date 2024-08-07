"use client"
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
// import { FormFields } from '@/types/authtypes';
import { z } from "zod"
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { notifyfailure } from '../lib/Toast';
import { ToastContainer, toast, Bounce } from 'react-toastify';





const schema = z.object
    ({
        email: z.string().email(),
        // .includes("@nu.edu.pk", { message: "Please enter a valid nu id" }),
        password: z.string().min(8)
    })

type FormFields = z.infer<typeof schema>

export default function LoginForm(): any {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormFields>(
        {
            resolver: zodResolver(schema)
        }
    );
    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        const { email, password } = data;
        try {
            const response: any = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });
            if (!response.error) {
                router.refresh();
                router.push("/")

            }
            if (!response.ok) {
                notifyfailure("error logging in,please try again")
            }

        } catch (e) {
            notifyfailure("error logging in,please try again");
        }
    }

    return (
        <>
            <ToastContainer
                position="bottom-right"
                autoClose={4000}
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

            <div className='bg-gray-800 py-20 border-1 rounded-lg flex justify-center'>
                <form action="/" className='flex flex-col w-[300px]' onSubmit={handleSubmit(onSubmit)} >
                    <div className='text-3xl text-slate-200 mx-auto mb-2 font-serif'>SIGN IN</div>
                    <label htmlFor="email" >email</label>
                    <input {...register("email")} type="text" id='email' placeholder='email'
                    />
                    {errors.email && <div className='text-red-600'>{errors.email.message}</div>}

                    <label htmlFor="password" >password</label>
                    <input {...register("password")} id='password' type="password" placeholder='Password' />
                    {errors.password && <div className='text-red-600'>{errors.password.message}</div>}
                    <Link href={'/register'} className='text-white font-extralight underline-offset-1 mt-1 hover:text-gray-500'>Dont have an account?</Link>
                    <button className='w-44 mx-auto mt-4' disabled={isSubmitting} type="submit">{isSubmitting ? "Loading..." : "Sign In"}</button>
                </form>
            </div>
        </>
    )
}

