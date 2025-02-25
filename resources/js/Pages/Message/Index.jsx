import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage, WhenVisible } from '@inertiajs/react';
import FallBackComponent from '@/Components/FallbackComponent';
import axios from 'axios';
import { useEffect } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Index({ users, filter, props }) {
    const { is_admin } = usePage().props.auth;

    const { data, setData, post, processing } = useForm({
        message: ''

    });
    const submitHandler = (e) => {
        e.preventDefault();
        post(route('messages.send'));
        console.log('submit');
    }

    return (is_admin &&
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


                    <form onSubmit={submitHandler} className="flex flex-col gap-4">
                        <textarea name="message" id="message" cols="30" rows="10" value={data.message} onChange={(e) => setData('message', e.target.value)}>

                        </textarea>
                        <PrimaryButton>Send</PrimaryButton>
                    </form>



                </div>
            </div>
        </AuthenticatedLayout>
    );
}
