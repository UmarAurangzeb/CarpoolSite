"use client";

import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import prisma from '../lib/db';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import Link from 'next/link';

const validationSchema = Yup.object({
    nuID: Yup.string().required('NU ID is required').length(8, "please enter a valid id"),
    OwnerName: Yup.string().required('Owner Name is required').max(20),
    CarName: Yup.string().required('Car Name is required').max(20),
    MonthlyCharges: Yup.number().required('Monthly Charges are required').max(5000, 'Monthly charges cannot exceed 5000'),
    CompleteRoute: Yup.string().required('Complete Route is required').max(120, "route limit exceeded"),
    Whatsapp: Yup.string().required('Whatsapp is required').min(11).max(11)
});

const initialValues = {
    nuID: '',
    OwnerName: '',
    CarName: '',
    MonthlyCharges: 0,
    CompleteRoute: '',
    Whatsapp: '',
};

const notifysuccess = () => toast.success('car registered successfully !');
const notifyfailure = () => toast.error('Registration failed!');


export default function Page() {
    const [notuniqueid, setnotUniqueid] = useState(false);


    const handleSubmit = async (values: typeof initialValues, { resetForm }: any) => {
        const res = await fetch('/addcar/api', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
        })
        if (res.status == 501) {
            setnotUniqueid(true);
        }
        else {
            setnotUniqueid(false);
        }

        if (res.status == 200) {
            notifysuccess();
        }
        else if (res.status == 500) {
            notifyfailure();
        }
    };

    return (
        <>
            <Link href="/"><button className='w-20 p-2 mt-2 ml-2'>Back</button></Link>
            <div className="h-screen flex flex-col items-center justify-center">
                <ToastContainer
                    position="top-center"
                    autoClose={1000}
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
                <h1 className="text-4xl text-white font-semibold">Owner Details</h1>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched }) => (
                        <Form className="flex flex-col gap-y-2 max-w-7xl w-2/3 mx-auto">
                            <label htmlFor="nuID" className="text-white">
                                NU ID
                            </label>
                            <Field
                                type="text"
                                name="nuID"
                                id="nuID"
                                placeholder="eg: k21-9876"
                                className="px-2 py-1 border-2 rounded-md"
                            />
                            <ErrorMessage name="nuID" component="div" className="text-red-500" />
                            {notuniqueid && <div className='text-red-500'>id already exists!</div>}

                            <label htmlFor="OwnerName" className="text-white">
                                Owner Name
                            </label>
                            <Field
                                type="text"
                                name="OwnerName"
                                id="OwnerName"
                                className="px-2 py-1 border-2 rounded-md"
                            />
                            <ErrorMessage name="OwnerName" component="div" className="text-red-500" />

                            <label htmlFor="CarName" className="text-white">
                                Car Name
                            </label>
                            <Field
                                type="text"
                                name="CarName"
                                id="CarName"
                                className="px-2 py-1 border-2 rounded-md"
                            />
                            <ErrorMessage name="CarName" component="div" className="text-red-500" />

                            <label htmlFor="MonthlyCharges" className="text-white">
                                Monthly Charges (per person)
                            </label>
                            <Field
                                type="text"
                                name="MonthlyCharges"
                                placeholder="No more than 5k allowed!"
                                className="px-2 py-1 border-2 rounded-md"
                            />
                            <ErrorMessage name="MonthlyCharges" component="div" className="text-red-500" />

                            <label htmlFor="CompleteRoute" className="text-white">
                                Complete Route
                            </label>
                            <Field
                                type="text"
                                name="CompleteRoute"
                                placeholder="eg: five-star-landikotal-millenium-fast"
                                className="px-2 py-1 border-2 rounded-md"
                            />
                            <ErrorMessage name="CompleteRoute" component="div" className="text-red-500" />

                            <label htmlFor="Whatsapp" className="text-white">
                                Whatsapp Number:
                            </label>
                            <Field
                                type="text"
                                name="Whatsapp"
                                placeholder=" eg:03009877669"
                                className="px-2 py-1 border-2 rounded-md"
                            />
                            <ErrorMessage name="Whatsapp" component="div" className="text-red-500" />

                            <button type="submit">
                                Submit
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
}
