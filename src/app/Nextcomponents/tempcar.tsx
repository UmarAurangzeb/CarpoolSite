// "use client";

// import React, { useState } from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import 'react-toastify/dist/ReactToastify.css';
// import { ToastContainer, toast, Bounce } from 'react-toastify';
// import Link from 'next/link';
// import { redirect, useSearchParams } from 'next/navigation'
// import { notifysuccess, notifyfailure, notifyotp } from '../lib/Toast';

// const validationSchema = Yup.object({
//     CarName: Yup.string().required('Car Name is required').max(20),
//     MonthlyCharges: Yup.number().required('Monthly Charges are required').max(7000, 'Monthly charges cannot exceed 7000'),
//     CompleteRoute: Yup.string().required('Complete Route is required').max(120, "route limit exceeded"),
//     Whatsapp: Yup.string().required('Whatsapp is required').length(11, "please enter a valid number"),
//     AccessType: Yup.string().oneOf(['Daily', 'Semester']).required('Please select an Option'),
//     BriefDescription: Yup.string().required('required field').max(20)
// });






// export default function Page({ email }: any) {
//     // const [AccessTypeState, setaccesstypestate] = useState("Daily");
//     const initialValues = {
//         AccessType: 'Daily',
//         BriefDescription: '',
//         OwnerEmail: '',
//         OwnerName: '',
//         CarName: '',
//         MonthlyCharges: 0,
//         CompleteRoute: '',
//         Whatsapp: '',
//     };

//     const handleSubmit = async (values: typeof initialValues, { resetForm }: any) => {
//         values.OwnerEmail = email.toString();
//         const res = await fetch('/addcar/api', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(values),
//         })

//         if (res.status == 200) {
//             notifysuccess("Car registered Successfully");
//             resetForm();
//             redirect('/');
//         }
//         const result = await res.json();
//         notifyfailure(result.message);
//     }
//     // const handleChange = (e: any) => {
//     //     setaccesstypestate(e.target.value);
//     // }

//     return (
//         <>
//             <div className="h-screen flex flex-col items-center justify-center">
//                 <ToastContainer
//                     position="bottom-right"
//                     autoClose={1000}
//                     hideProgressBar={false}
//                     newestOnTop={false}
//                     closeOnClick
//                     rtl={false}
//                     pauseOnFocusLoss
//                     draggable
//                     pauseOnHover
//                     theme="light"
//                     transition={Bounce}
//                 />
//                 <h1 className="text-4xl mt-28 text-white font-semibold">Owner Details</h1>
//                 <Formik
//                     initialValues={initialValues}
//                     validationSchema={validationSchema}
//                     onSubmit={handleSubmit}
//                 >
//                     {({ errors, touched }) => (
//                         <Form className="flex flex-col gap-y-2 max-w-7xl w-2/3 mx-auto">
//                             <label htmlFor="OwnerName" className="text-white">
//                                 Owner Name
//                             </label>
//                             <Field
//                                 type="text"
//                                 name="OwnerName"
//                                 id="OwnerName"
//                                 className="px-2 py-1 border-2 rounded-md"
//                             />
//                             <ErrorMessage name="OwnerName" component="div" className="text-red-500" />

//                             <label htmlFor="CarName" className="text-white">
//                                 Car Name
//                             </label>
//                             <Field
//                                 type="text"
//                                 name="CarName"
//                                 id="CarName"
//                                 className="px-2 py-1 border-2 rounded-md"
//                             />
//                             <ErrorMessage name="CarName" component="div" className="text-red-500" />

//                             <label htmlFor="AccessType" className='text-white'>AccessType</label>
//                             <Field as="select" name="AccessType" className="p-4 border-2 pl-1" >
//                                 <option value="Daily" >Daily</option>
//                                 <option value="Semester" >Semester</option>
//                             </Field>
//                             <ErrorMessage name="AccessType" component="div" className="text-red-500" />
//                             {initialValues.AccessType === "Daily" &&
//                                 <>
//                                     <label htmlFor="BriefDescription" className='text-white'>Brief Description</label>
//                                     <Field
//                                         type="text"
//                                         name="BriefDescription"
//                                         id="BriefDescription"
//                                         placeholder="eg:leaving at 3pm"
//                                         className="px-2 py-1 border-2 rounded-md"
//                                     />
//                                     <ErrorMessage name="BriefDescription" component="div" className="text-red-500" />
//                                 </>
//                             }


//                             <label htmlFor="MonthlyCharges" className="text-white">
//                                 Monthly Charges (per person)
//                             </label>
//                             <Field
//                                 type="text"
//                                 name="MonthlyCharges"
//                                 placeholder="No more than 5k allowed!"
//                                 className="px-2 py-1 border-2 rounded-md"
//                             />
//                             <ErrorMessage name="MonthlyCharges" component="div" className="text-red-500" />

//                             <label htmlFor="CompleteRoute" className="text-white">
//                                 Complete Route
//                             </label>
//                             <Field
//                                 type="text"
//                                 name="CompleteRoute"
//                                 placeholder="eg: five-star-landikotal-millenium-fast"
//                                 className="px-2 py-1 border-2 rounded-md"
//                             />
//                             <ErrorMessage name="CompleteRoute" component="div" className="text-red-500" />

//                             <label htmlFor="Whatsapp" className="text-white">
//                                 Whatsapp Number:
//                             </label>
//                             <Field
//                                 type="text"
//                                 name="Whatsapp"
//                                 placeholder=" eg:03009877669"
//                                 className="px-2 py-1 border-2 rounded-md"
//                             />
//                             <ErrorMessage name="Whatsapp" component="div" className="text-red-500" />
//                             <button type="submit">
//                                 Submit
//                             </button>
//                         </Form>
//                     )}
//                 </Formik>
//             </div>
//         </>
//     );
// }
