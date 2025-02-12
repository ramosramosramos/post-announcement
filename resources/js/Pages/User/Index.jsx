import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage, WhenVisible } from '@inertiajs/react';

import DefaultPaginator from '@/Components/Paginators/DefaultPaginator';
import FallBackComponent from '@/Components/FallbackComponent';
import SearchInput from '@/Components/Inputs/SearchInput';
import UserCard from '@/Components/Cards/UserCard';
import BackLink from '@/Components/Links/BackLink';
import SelectInput from '@/Components/Inputs/SelectInput';
import InputLabel from '@/Components/Inputs/InputLabel';

export default function Index({ users, filter, props }) {
    const { is_admin } = usePage().props.auth;
    const form = useForm({});
    const handleFindSection =(e)=>{
        form.get(route('users.index',{section:e.target.value,search:filter.search,year_level:filter.year_level}))
    }
    const handleFindLevel =(e)=>{
        form.get(route('users.index',{section:filter.section,search:filter.search,year_level:e.target.value}))
    }
    return ( is_admin &&
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
                        <SearchInput search={filter?.search} filter={filter} />
                    </div>
                    <div className='max-w-[max-content]'>
                        <SelectInput defaultValue={filter?.year_level} onChange={handleFindLevel} >
                            <option value="">Find Grade / Year level</option>
                            {props && props.year_levels.map((level) => (
                                <option key={level.id} value={level.name}>
                                    {level.name}
                                </option>
                            ))}
                        </SelectInput>
                    </div>
                    <div className='max-w-[max-content]'>
                        <SelectInput defaultValue={filter?.section} onChange={handleFindSection} >
                            <option value="">Find section</option>
                            {props && props.sections.map((level) => (
                                <option key={level.id} value={level.name}>
                                    {level.name}
                                </option>
                            ))}
                        </SelectInput>
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
