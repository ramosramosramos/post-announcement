import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, WhenVisible } from '@inertiajs/react';
import PostCard from '@/Components/Cards/PostCard';
import CreateLink from '@/Components/Links/CreateLink';
import DefaultPaginator from '@/Components/Paginators/DefaultPaginator';
import FallBackComponent from '@/Components/FallbackComponent';

export default function Index({ posts }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Posts | Bin
                </h2>
            }
        >
            <Head title="Post" />

            <div className="py-12 w-full">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <CreateLink href={route('posts.create')}>
                        Create new post
                    </CreateLink>
                    <WhenVisible data={posts} fallback={<FallBackComponent/>}>
                        <div className=" grid gap-3 primary_color p-4 shadow sm:rounded-lg sm:p-8">

                            {posts.data.length > 0 && posts.data?.map((post) => (
                                <div key={post.id}>
                                    <PostCard post={post} />
                                </div>
                            ))}
                            {posts.data.length ==0 && <div className='text-gray-300'>
                                No  bin post available
                                </div>}

                        </div>
                    </WhenVisible>
                    <div className='flex justify-center'>
                        <DefaultPaginator links={posts.meta} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
