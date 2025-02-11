import InputError from '@/Components/Inputs/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { Transition } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Avatar } from '@mui/material';
import { toast } from 'react-toastify';

export default function UpdateAvatar({ className = '', }) {
    const {user,avatar} = usePage().props.auth;
    const { data, setData, errors, post, reset, processing, recentlySuccessful } = useForm({
        avatar: null,
    });

    const [preview, setPreview] = useState(avatar|| null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('avatar', file);

            // Create a preview URL for the selected image
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAvatar = (e) => {
        e.preventDefault();

        post(route('profile.avatar'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                toast.success('Avatar successfully updated.')
            },
            onError:()=>{
                toast.error('Error uploading avatar.')
            }
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-200">
                    Update Avatar
                </h2>
            </header>

            <form onSubmit={handleAvatar} className="mt-6 space-y-6">
                <div className="">
                  <label htmlFor="avatar" className='w-[150px]'>
                  <Avatar
                        alt={user?.name}
                        src={preview ?? null}
                        sx={{ width: 150, height: 150 }}
                    />
                  </label>
                    <input
                        type="file"
                        id="avatar"
                        hidden
                        accept="image/*"
                        className="mt-2"
                        onChange={handleFileChange}
                    />
                    {errors.avatar && <InputError message={errors.avatar} />}
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-100">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
