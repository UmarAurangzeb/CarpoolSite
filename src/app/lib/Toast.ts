import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const notifysuccess = (message: any) => toast.success(message);
export const notifyfailure = (message: any) => toast.error(message);
export const notifyotp = (message: any) => toast.info(message);



// export const notify = () => toast.success('🦄 Wow so easy!', {
//   position: "top-center",
//   autoClose: 2000,
//   hideProgressBar: true,
//   closeOnClick: false,
//   pauseOnHover: true,
//   draggable: true,
//   progress: undefined,
//   theme: "light",
// });


// <ToastContainer
// position="top-center"
// autoClose={2000}
// hideProgressBar
// newestOnTop={false}
// closeOnClick={false}
// rtl={false}
// pauseOnFocusLoss
// draggable
// pauseOnHover
// theme="light"
// transition: Bounce,
// />


