import InputError from '@/Components/Inputs/InputError';
import InputLabel from '@/Components/Inputs/InputLabel';
import DefaultLink from '@/Components/Links/DefaultLink';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/Inputs/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import SelectInput from '@/Components/Inputs/SelectInput';
import { toast } from 'react-toastify';

export default function Register({props}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
        section: '',
        year_level: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            preserveScroll:true,
            onFinish: () => reset('password', 'password_confirmation'),
            onError:(errors)=>{
                console.log(errors.email)
                    toast.error(errors.name)
                    toast.error(errors.email)
                    toast.error(errors.phone)
                    toast.error(errors.password)
                    toast.error(errors.password_confirmation)
                    toast.error(errors.year_level)
                    toast.error(errors.section)
            }
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}

                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}

                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="phone" value="Phone number" />

                    <TextInput
                        id="phone"
                        name="phone"
                        value={data.phone}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('phone', e.target.value)}

                    />

                    <InputError message={errors.phone} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}

                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }

                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="year_level"
                        value="Grade / Year level"
                    />

                        <SelectInput value={data.year_level} onChange={(e)=>setData('year_level',e.target.value)} >
                            <option value="">Select Grade / Year level</option>
                            {props && props.year_levels.map((level)=>(
                                <option key={level.id} value={level.name}>
                                    {level.name}
                                </option>
                            ))}
                        </SelectInput>
                    <InputError
                        message={errors.year_level}
                        className="mt-2"
                    />
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="section"
                        value="Select section"
                    />

                        <SelectInput value={data.section} onChange={(e)=>setData('section',e.target.value)} >
                            <option value="">Select section</option>
                            {props && props.sections.map((level)=>(
                                <option key={level.id} value={level.name}>
                                    {level.name}
                                </option>
                            ))}
                        </SelectInput>
                    <InputError
                        message={errors.section}
                        className="mt-2"
                    />
                </div>

                <div className="mt-10 ">


                    <PrimaryButton className="w-full" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
                <div className="mt-4 ">

                    <DefaultLink href={route('login')}>
                        Already have an account? Login

                    </DefaultLink>

                </div>
            </form>
        </GuestLayout>
    );
}
