"use client"
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
// import { FormFields } from '@/types/authtypes';
import { z } from "zod"
import { notifysuccess, notifyfailure } from '../lib/Toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { FaGoogle } from "react-icons/fa";
import { signIn } from "next-auth/react"
import { useSearchParams } from 'next/navigation'

const schema = z.object({
  email: z.string().email().includes("@nu.edu.pk", { message: "Please enter a valid nu id" }),
  password: z.string().min(8)
})

type FormFields = z.infer<typeof schema>

export default function RegisterForm() {
  const [EmailSent, setEmailSent] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams()
  const error = searchParams.get('error') || '';
  const [errorMessage, setErrorMessage] = useState<string>(error)

  useEffect(() => {
    if (error === "invalid-email") {
      setErrorMessage("Please sign in with your NU ID only.");
    }
  }, [error]);


  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<FormFields>(
    {
      resolver: zodResolver(schema)
    }
  );
  const EMAIL = watch("email");
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const { email, password } = data;
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: password
      }),
    });
    console.log("response", res);

    const result = await res.json();

    console.log(result);
    console.log("message", result.message);
    //successfully created new user
    if (res.status === 200) {
      setEmailSent(true);
    }
    //error creating user
    else {
      notifyfailure(result.message);
    }
  }




  return (
    <>
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
      <div className='w-fit mx-auto bg-gradient-to-br from-teal-900 to-teal-700 shadow-md px-12 md:px-20 py-10 border-[1px] rounded-lg flex justify-center'>
        <div className='flex flex-col'>
          <form action="/" className='flex flex-col ' onSubmit={handleSubmit(onSubmit)} >
            <div className='text-3xl mx-auto mb-2 font-serif text-slate-200'>SIGN UP</div>
            <label htmlFor="email" >email</label>
            <input {...register("email")} type="text" id='email' placeholder='email' className=''
            />
            {errors.email && <div className='text-red-600'>{errors.email.message}</div>}

            <label htmlFor="password" className='mt-2' >password</label>
            <input {...register("password")} id='password' type="password" placeholder='Password' />
            {errors.password && <div className='text-red-600'>{errors.password.message}</div>}
            <Link href={'/login'} className='text-white font-extralight underline-offset-1 mt-1 hover:text-gray-500'>Already have an account?</Link>
            {!EmailSent && <button className='w-44 mx-auto mt-4' disabled={isSubmitting} type="submit">{isSubmitting ? "Loading..." : "Sign Up"}</button>}
            {EmailSent && <div className='bg-teal-700 w-52 text-wrap text-clip px-2 py-1 border-2 rounded-sm mt-2 border-white text-sm'>A verification email has been sent to {EMAIL}.please verify your email before signing in.</div>}
          </form>
          <div className="my-4 flex items-center w-full">
            <span className="flex-grow h-px bg-gray-500 opacity-25 "></span>
            <p className="mx-4">OR</p>
            <span className="flex-grow h-px bg-gray-500 opacity-25"></span>
          </div>
          <button
            className="flex bg-white text-black py-1 mx-auto w-full hover:bg-gray-500"
            onClick={async (e) => {
              e.preventDefault();
              await signIn("google", { callbackUrl: "/" });
            }}
          >
            <FaGoogle className="mt-1 ml-1" />
            <h3 className="flex-grow">Continue with Google</h3>
          </button>
          {errorMessage.length > 0 && <p className='mt-2 text-red-500 font-bold'>{errorMessage}</p>}

        </div>

      </div>
    </>
  )
}
