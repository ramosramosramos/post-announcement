import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, WhenVisible } from '@inertiajs/react';
import DefaultPaginator from '@/Components/Paginators/DefaultPaginator';
import FallBackComponent from '@/Components/FallbackComponent';
import SimpleCard from '@/Components/Cards/SimpleCard';


export default function Index({ year_levels }) {
    const { is_admin } = usePage().props.auth;
    return (  is_admin &&
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                   Grade / Year Level
                </h2>
            }
        >
            <Head title="Grade / Year Level" />

            <div className="py-12 w-full">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    {/* { is_admin &&    <CreateLink href={route('year_levels.create')}>
                        Create new year_levels
                    </CreateLink>} */}

                    <div>

                    </div>
                    <WhenVisible data={year_levels} fallback={<FallBackComponent />}>
                        <div className=" grid gap-3 primary_color p-4 shadow sm:rounded-lg sm:p-8">
                            <SimpleCard
                                label={'Grade / Year Level'}
                                items={year_levels.data}
                                updateURL={'year_levels.update'}
                                deleteURl={'year_levels.destroy'}
                                storeURL={'year_levels.store'}
                                whenEmpty={'No grade / year level available'}
                            />
                        </div>
                    </WhenVisible>
                    <div className='flex justify-center'>
                        <DefaultPaginator links={year_levels.meta} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
