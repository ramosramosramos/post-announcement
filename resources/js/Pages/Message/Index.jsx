import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, WhenVisible } from '@inertiajs/react';
import FallBackComponent from '@/Components/FallbackComponent';

export default function Index({ users, filter, props }) {
    const { is_admin } = usePage().props.auth;


    return ( is_admin &&
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                  Messages
                </h2>
            }
        >
            <Head title="Users" />

            <div className="py-12 w-full">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">




                    <WhenVisible data={users} fallback={<FallBackComponent />}>

                    </WhenVisible>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
