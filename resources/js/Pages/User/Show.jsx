import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, WhenVisible } from '@inertiajs/react';


import FallBackComponent from '@/Components/FallbackComponent';
import { Avatar, Card, CardContent, CardHeader, Typography } from '@mui/material';

export default function Index({ user, search }) {

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {user?.name}
                </h2>
            }
        >
            <Head title="User" />

            <div className="py-12 w-full">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">

                    <WhenVisible data={user} fallback={<FallBackComponent />}>
                        <div className=" grid gap-3 primary_color p-4 shadow sm:rounded-lg sm:p-8">

                            <Card sx={{ width: '100%' }}>
                                <CardHeader
                                    avatar={<Avatar sx={{ width: '100px', height: '100px' }} src={user.data?.avatar ?? ''} alt={user.data?.name} />}
                                    action={
                                        <>
                                        </>
                                    }
                                    title={user.data?.name}
                                    subheader={user.data?.email}
                                />


                            </Card>
                        </div>
                    </WhenVisible>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
