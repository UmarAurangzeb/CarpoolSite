import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const notify = () => toast.success('🦄 Wow so easy!', {
  position: "top-center",
  autoClose: 2000,
  hideProgressBar: true,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
});


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


