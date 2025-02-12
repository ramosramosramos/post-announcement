import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, WhenVisible } from '@inertiajs/react';
import PostCard from '@/Components/Cards/PostCard';
import CreateLink from '@/Components/Links/CreateLink';
import DefaultPaginator from '@/Components/Paginators/DefaultPaginator';
import FallBackComponent from '@/Components/FallbackComponent';
import SimpleCard from '@/Components/Cards/SimpleCard';


export default function Index({ sections }) {
    const { is_admin } = usePage().props.auth;
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Sections
                </h2>
            }
        >
            <Head title="Sections" />

            <div className="py-12 w-full">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    {/* { is_admin &&    <CreateLink href={route('sections.create')}>
                        Create new Sections
                    </CreateLink>} */}

                    <div>

                    </div>
                    <WhenVisible data={sections} fallback={<FallBackComponent />}>
                        <div className=" grid gap-3 primary_color p-4 shadow sm:rounded-lg sm:p-8">
                            <SimpleCard
                                label={'Section'}
                                items={sections.data}
                                updateURL={'sections.update'}
                                deleteURl={'sections.destroy'}
                                storeURL={'sections.store'}
                                whenEmpty={'No sections available'}
                            />



                        </div>
                    </WhenVisible>
                    <div className='flex justify-center'>
                        <DefaultPaginator links={sections.meta} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
