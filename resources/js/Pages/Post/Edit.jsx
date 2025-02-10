import InputError from '@/Components/Inputs/InputError';
import InputLabel from '@/Components/Inputs/InputLabel';
import TextAreaInput from '@/Components/Inputs/TextAreaInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PrimaryButton from '@/Components/PrimaryButton';
import { toast } from 'react-toastify';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function Edit({getPost}) {
    const { user } = usePage().props.auth;
    const { data, setData, errors,processing,post } = useForm({
        user_id: user.id,
        content: getPost.content,
        image: '',
        old_image: getPost?.media_image,
    });

    const [preview, setPreview] = useState(getPost?.media_image ?? null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('image', file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('posts.update',getPost.id), {
            preserveScroll: true,
            showProgress:false,
            onSuccess: () => {
                toast.success('Successfully updated.')
                router.get(route('home'));
            },
            onError: (errors) => {

                toast.error(errors.content)
                toast.error(errors.image)

            }
        });
    }
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-900">
                 Edit post
                </h2>
            }
        >
            <Head title="Post" />

            <div className="py-12 w-full bg-red-900  rounded-md">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="gap-3  p-2  ">
                        <form onSubmit={submit}>
                            <div className='mb-4'>
                                <InputLabel htmlFor="content" value={"Content"} />
                                <TextAreaInput rows={10} value={data.content} onChange={(e) => setData('content', e.target.value)} />
                                <InputError message={errors.content} />
                            </div>

                            <div className='mb-4'>
                                <InputLabel htmlFor="image" value={"Image"} />

                                <Button
                                    component="label"
                                    role={undefined}
                                    variant="contained"
                                    tabIndex={-1}
                                    startIcon={<CloudUploadIcon />}
                                >
                                    Upload files
                                    <VisuallyHiddenInput
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}

                                    />
                                </Button>
                                <InputError message={errors.image} />
                                {preview && (
                                    <div className="mt-4">
                                        <img src={preview} alt="Preview" className="w-64  object-cover rounded-md" />
                                    </div>
                                )}
                            </div>

                            <div className='flex justify-end mt-5'>
                                <PrimaryButton disabled={processing}>
                                    Update post
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
