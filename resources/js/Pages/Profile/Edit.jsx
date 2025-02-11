import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useRef } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import UpdateAvatar from './Partials/UpdateAvatar';
export default function Edit({ mustVerifyEmail, status, qrcode }) {
    const { is_admin } = usePage().props.auth;
    const qrCodeRef = useRef();

    const handleDownloadPDF = async () => {
        const qrElement = qrCodeRef.current;
        if (!qrElement) return;

        const canvas = await html2canvas(qrElement);
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF();
        pdf.addImage(imgData, "PNG", 10, 10); // Adjust position and size
        pdf.save("FMNTRACE_QCODE.pdf");
    };
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Profile
                </h2>
            }
        >
            <Head title="Profile" />

            <div className="py-12 w-full">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="primary_color p-4 shadow sm:rounded-lg sm:p-8">
                        <p className="mt-1 text-sm text-gray-300">
                            Application QR code
                        </p>
                        {/* QR Code Container */}
                        <div className='mb-5 ' ref={qrCodeRef} dangerouslySetInnerHTML={{ __html: qrcode }} />

                        {/* Download as PDF Button */}
                        <PrimaryButton
                            onClick={handleDownloadPDF}

                        >
                            Download QR code
                        </PrimaryButton>
                    </div>
                    <div className="primary_color p-4 shadow sm:rounded-lg sm:p-8">
                        <UpdateAvatar className="max-w-xl" />
                    </div>
                    <div className="primary_color p-4 shadow sm:rounded-lg sm:p-8">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />

                    </div>

                    <div className="primary_color p-4 shadow sm:rounded-lg sm:p-8">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>
                    {!is_admin &&
                        <div className="primary_color p-4 shadow sm:rounded-lg sm:p-8">
                            <DeleteUserForm className="max-w-xl" />
                        </div>}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
