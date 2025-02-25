import { useState, useMemo } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import { toast } from 'react-toastify';
import InputLabel from '@/Components/Inputs/InputLabel';
import TextInput from '@/Components/Inputs/TextInput';
import InputError from '@/Components/Inputs/InputError';

export default function Index({ users }) {
    const { is_admin } = usePage().props.auth;
    const [isAllSelected, setIsAllSelected] = useState(false);

    // Pagination settings
    const pageSize = 10;
    const [currentPage, setCurrentPage] = useState(1);

    // Compute total pages based on total number of users
    const totalPages = Math.ceil(users.length / pageSize);

    // Get the current page's users using useMemo for performance
    const paginatedUsers = useMemo(() => {
        const startIndex = (currentPage - 1) * pageSize;
        return users.slice(startIndex, startIndex + pageSize);
    }, [currentPage, users]);

    // Form handling
    const { data, setData, post, processing } = useForm({
        message: '',
        ipAddress: '',
        phones: [],
    });

    const submitHandler = (e) => {
        e.preventDefault();

        post(route('messages.send'), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Message sent successfully');
                setData({ message: '', ipAddress: '', phones: [] });
            },
            onError: (error) => {
                toast.error(error.ipAddress);
                toast.error(error.message);
                toast.error(error.phones);
            }
        });
    };


    const handleCheckboxChange = (phone) => {
        setData((prevData) => {
            const updatedPhones = prevData.phones.includes(phone)
                ? prevData.phones.filter((p) => p !== phone) // Remove if already selected
                : [...prevData.phones, phone]; // Add if not selected

            setIsAllSelected(updatedPhones.length === users.length); // Check if all are selected
            return { ...prevData, phones: updatedPhones };
        });
    };

    const handleSelectAll = () => {
        if (isAllSelected) {
            setData((prevData) => ({ ...prevData, phones: [] }));
            setIsAllSelected(false);
        } else {
            setData((prevData) => ({ ...prevData, phones: users.map((user) => user.phone) }));
            setIsAllSelected(true);
        }
    };


    // Handlers for pagination buttons
    const goToPreviousPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const goToNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    return (
        is_admin && (
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
                        <form onSubmit={submitHandler} className=" bg-[#800000] p-5 rounded-lg  flex flex-col gap-4">
                            <div className="mt-4">
                                <InputLabel htmlFor="ipAddress" value="IP Address" />

                                <TextInput
                                    id="ipAddress"
                                    name="ipAddress"
                                    value={data.ipAddress}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    onChange={(e) => setData('ipAddress', e.target.value)}

                                />

                            </div>
                            <InputLabel htmlFor="ipAddress" value="Message" />
                            <textarea
                                name="message"
                                id="message"
                                cols="30"
                                rows="10"
                                value={data.message}
                                onChange={(e) => setData('message', e.target.value)}
                                className="border rounded p-2"
                            ></textarea>
                            <PrimaryButton className='w-[max-content]' disabled={processing}>Send</PrimaryButton>
                        </form>

                        <div className="relative overflow-x-auto">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th className="px-1 py-3 flex gap-2 ">
                                            <input
                                                id="allPhone"
                                                type="checkbox"
                                                className="cursor-pointer"
                                                checked={isAllSelected}
                                                onChange={handleSelectAll}
                                            />
                                            <label htmlFor="allPhone">
                                                {data.phones.length === 0
                                                    ? "Select All"
                                                    : data.phones.length === users.length
                                                        ? "Deselect All"
                                                        : `Selected: ${data.phones.length}`}
                                            </label>
                                        </th>

                                        <th scope="col" className="px-6 py-3">Name</th>
                                        <th scope="col" className="px-6 py-3">Phone number</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedUsers.map((user) => (
                                        <tr key={user.id} className="bg-white border-b border-gray-200">
                                            <td className="px-1 py-4 w-[150px]">
                                                <input
                                                    type="checkbox"
                                                    className="cursor-pointer"
                                                    checked={data.phones.includes(user.phone)} // Ensure it's checked if selected
                                                    onChange={() => handleCheckboxChange(user.phone)}
                                                />

                                            </td>
                                            <th
                                                scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                            >
                                                {user.name}
                                            </th>
                                            <td className="px-6 py-4">{user.phone}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination Controls */}
                        <div className="flex justify-between items-center mt-4">
                            <button
                                onClick={goToPreviousPage}
                                disabled={currentPage === 1}
                                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                            >
                                Previous
                            </button>
                            <span>
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                onClick={goToNextPage}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        )
    );
}
