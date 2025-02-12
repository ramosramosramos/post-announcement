import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, WhenVisible } from '@inertiajs/react';

import DefaultPaginator from '@/Components/Paginators/DefaultPaginator';
import FallBackComponent from '@/Components/FallbackComponent';
import SearchInput from '@/Components/Inputs/SearchInput';
import UserCard from '@/Components/Cards/UserCard';
import BackLink from '@/Components/Links/BackLink';

export default function Index({ users,search }) {
    const { is_admin } = usePage().props.auth;
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                   Find users
                </h2>
            }
        >
            <Head title="Users" />

            <div className="py-12 w-full">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">


                    <div>
                        <SearchInput search={search} />
                    </div>
                    <WhenVisible data={users} fallback={<FallBackComponent />}>
                        <div className=" grid gap-3 primary_color p-4 shadow sm:rounded-lg sm:p-8">

                            {users.data.length > 0 && users.data?.map((user) => (
                                <div key={user.id}>
                                    <UserCard user={user} />
                                </div>
                            ))}
                            {users.data.length == 0 && <div className='text-gray-300'>
                                No   user available
                            </div>}

                        </div>
                    </WhenVisible>
                    <div className='flex justify-center'>
                        <DefaultPaginator links={users.meta} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
