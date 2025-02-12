import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { ToastContainer } from 'react-toastify';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0">
            <div>

                    <ApplicationLogo className="  text-gray-500 rounded-full   w-[150px]   border-white-500" />

            </div>

            <div className="mt-6 w-full overflow-hidden primary_color m-10 px-6 py-10 shadow-md sm:max-w-md sm:rounded-lg">
                {children}
            </div>
            <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    pauseOnFocusLoss
                    draggable
                    theme='dark'
                    pauseOnHover


                />
        </div>
    );
}
