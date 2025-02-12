import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, WhenVisible } from '@inertiajs/react';
import PostCard from '@/Components/Cards/PostCard';
import CreateLink from '@/Components/Links/CreateLink';
import DefaultPaginator from '@/Components/Paginators/DefaultPaginator';
import FallBackComponent from '@/Components/FallbackComponent';
import SearchInput from '@/Components/Inputs/SearchInput';

export default function Index({ users }) {
    const {is_admin} =usePage().props.auth;
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    users
                </h2>
            }
        >
            <Head title="Post" />

            <div className="py-12 w-full">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">

                    <div>
            <SearchInput/>
                    </div>
                    <WhenVisible data={users} fallback={<FallBackComponent/>}>
                        <div className=" grid gap-3 primary_color p-4 shadow sm:rounded-lg sm:p-8">
{/*
                            {users.data.length > 0 && users.data?.map((post) => (
                                <div key={post.id}>
                                    <PostCard post={post} />
                                </div>
                            ))}
                            {users.data.length ==0 && <div className='text-gray-300'>
                                No   post available
                                </div>} */}

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
