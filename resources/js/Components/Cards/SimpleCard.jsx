import { useForm } from "@inertiajs/react";
import Modal from "../Modal";
import { useState } from "react";
import InputLabel from "../Inputs/InputLabel";
import TextInput from "../Inputs/TextInput";
import InputError from "../Inputs/InputError";
import PrimaryButton from "../PrimaryButton";
import DangerButton from "../Buttons/DangerButton";
import { toast } from "react-toastify";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export default function
    SimpleCard({ label, items, updateURL, deleteURl, restoreURL, forceDeleteURL, storeURL, whenEmpty }) {

    const [openEdit, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [forceDeleteOpen, setForceDeleteOpen] = useState(false);
    const [createOpen, setCreateOpen] = useState(false);
    const [selected, setSelected] = useState();
    const form = useForm({ name: '' });
    const formCreate = useForm({ name: '' });
    const formNull = useForm({});

    const closeEditModal = () => setEditOpen(false);
    const closeDeleteModal = () => setDeleteOpen(false);
    const closeForceDeleteModal = () => setForceDeleteOpen(false);
    const closeCreateModal = () => setCreateOpen(false);


    const handleSelectedEdit = (editItems) => {
        setEditOpen(true);
        setSelected(editItems);
        form.setData('name', editItems.name)


    }
    const handleSelectedDelete = (deleteItem) => {
        setDeleteOpen(true);
        setSelected(deleteItem);

    }
    const handleSelectedForceDelete = (deleteItem) => {
        setForceDeleteOpen(true);
        setSelected(deleteItem);

    }
    const handleCreateSubmit = (e) => {
        e.preventDefault();
        formCreate.post(route(storeURL), {
            preserveScroll: true,
            onSuccess: () => {
                closeCreateModal();
                toast.success('Successfully created.');
                formCreate.setData('name', '');
            },
            onError: (errors) => {
                toast.error(errors.name);
            }
        })

    }
    const handleEditSubmit = (e) => {
        e.preventDefault();
        form.post(route(updateURL, selected.id), {
            preserveScroll: true,
            onSuccess: () => {
                closeEditModal();
                toast.success('Successfully updated.');
            },
            onError: (errors) => {
                toast.error(errors.name);
            }
        })

    }
    const handleDeleteSubmit = (e) => {
        e.preventDefault();
        formNull.post(route(deleteURl, selected.id), {
            preserveScroll: true,
            onSuccess: () => {
                closeDeleteModal()
                toast.success('Successfully deleted.');
            },
            onError: () => {
                toast.error("Sorry!, There's an error occured.");
            }
        })
    }
    const handleForceDeleteSubmit = (e) => {
        e.preventDefault();
        formNull.post(route(forceDeleteURL, selected.id), {
            preserveScroll: true,
            onSuccess: () => {
                closeForceDeleteModal()
                toast.success('Permanently deleted.');
            },
            onError: () => {
                toast.error("Sorry!, There's an error occured.");
            }
        })
    }
    const handleRestoreSubmit = (item) => {


        formNull.post(route(restoreURL, item.id), {
            preserveScroll: true,
            onSuccess: () => {
                closeForceDeleteModal()
                toast.success('Successfully restored.');
            },
            onError: () => {
                toast.error("Sorry!, There's an error occured.");
            }
        })
    }

    return (
        <div className="flex flex-col gap-5">
            {(!forceDeleteURL || !restoreURL) &&
                <div className="self-end">
                    <button onClick={() => setCreateOpen(true)} className="items-center flex gap-3 rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2
         focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 ">

                        <AddCircleOutlineIcon />    Create new {label}
                    </button>
                </div>

            }
            <section className='grid sm:grid-cols-2 md:grid-cols-4 gap-2'>

                {items && items?.map((item) => (
                    <div key={item.id} className='flex flex-col p-5 rounded-md bg-gray-100 shadow-md'>
                        <p className='text-gray-700  font-bold'>{label} : {item.name} </p>
                        <p className='text-sm font-thin text-gray-500'>Created at : {item.created_at}</p>
                        {(!forceDeleteURL || !restoreURL) && <div className='flex gap-3 self-end '>
                            <button onClick={() => handleSelectedEdit(item)} className='mt-4 bg-blue-600 hover:bg-blue-500 text-white text-sm px-2 rounded-sm'>Edit  </button>
                            <button onClick={() => handleSelectedDelete(item)} className='mt-4 bg-red-600 hover:bg-red-500 text-white text-sm px-2 rounded-sm'>Delete</button>
                        </div>}
                        {(forceDeleteURL || restoreURL) &&
                            <div className='flex gap-3 self-end '>
                                <button onClick={() => handleRestoreSubmit(item)} className='mt-4 bg-green-600 hover:bg-green-500 text-white text-sm px-2 rounded-sm'>Restore </button>
                                <button onClick={() => handleSelectedForceDelete(item)} className='mt-4 bg-red-600 hover:bg-red-500 text-white text-sm px-2 rounded-sm'>Permanently delete </button>
                            </div>
                        }
                    </div>
                ))}
                {items.length == 0 &&
                    <div className='text-gray-400 text-2xl font-semibold  text-center '>


                        {whenEmpty ? whenEmpty : 'No items available'}
                    </div>
                }


                <Modal show={createOpen} closeable={true} onClose={closeCreateModal} maxWidth="2xl" >
                    <form onSubmit={handleCreateSubmit} className="p-10 " >
                        <div className="mb-5">
                            <InputLabel htmlFor="name" value="Batch name" />

                            <TextInput
                                id="name"
                                className="mt-1 block w-full"
                                value={formCreate.data.name}
                                onChange={(e) => formCreate.setData('name', e.target.value)}

                                isFocused
                                autoComplete="name"
                            />


                        </div>
                        <PrimaryButton>
                            Create
                        </PrimaryButton>
                    </form>
                </Modal>

                <Modal show={openEdit} closeable={true} onClose={closeEditModal} maxWidth="2xl" >
                    <form onSubmit={handleEditSubmit} className="p-10 " >
                        <div className="mb-5">
                            <InputLabel htmlFor="name" value="Batch name" />

                            <TextInput
                                id="name"
                                className="mt-1 block w-full"
                                value={form.data.name}
                                onChange={(e) => form.setData('name', e.target.value)}

                                isFocused
                                autoComplete="name"
                            />


                        </div>
                        <PrimaryButton>
                            Save
                        </PrimaryButton>
                    </form>
                </Modal>

                {/* delete modal */}
                <Modal show={deleteOpen} closeable={true} onClose={closeDeleteModal} maxWidth="2xl" >
                    <div className="p-10 " >
                        <div className="mb-5">
                            <div key={selected?.id} className='flex flex-col p-5 rounded-md bg-gray-900 shadow-md'>
                                <p className='text-gray-100  font-bold'>{label} : {selected?.name} </p>
                                <p className='text-sm font-thin text-gray-500'>Created at : {selected?.created_at}</p>

                            </div>
                        </div>
                        <DangerButton onClick={handleDeleteSubmit}>
                            Okay , I permit to delete this {label}
                        </DangerButton>
                    </div>
                </Modal>
                <Modal show={deleteOpen} closeable={true} onClose={closeDeleteModal} maxWidth="2xl" >
                    <div className="p-10 " >
                        <div className="mb-5">
                            <div key={selected?.id} className='flex flex-col p-5 rounded-md bg-gray-900 shadow-md'>
                                <p className='text-gray-100  font-bold'>{label} : {selected?.name} </p>
                                <p className='text-sm font-thin text-gray-500'>Created at : {selected?.created_at}</p>

                            </div>
                        </div>
                        <DangerButton onClick={handleDeleteSubmit}>
                            Okay , I permit to delete this {label}
                        </DangerButton>
                    </div>
                </Modal>

                <Modal show={forceDeleteOpen} closeable={true} onClose={closeForceDeleteModal} maxWidth="2xl" >
                    <div className="p-10 " >
                        <div className="mb-5">
                            <div key={selected?.id} className='flex flex-col p-5 rounded-md bg-gray-900 shadow-md'>
                                <p className='text-gray-100  font-bold'>{label} : {selected?.name} </p>
                                <p className='text-sm font-thin text-gray-500'>Created at : {selected?.created_at}</p>

                            </div>
                        </div>
                        <DangerButton onClick={handleForceDeleteSubmit}>
                            Okay , I permit to delete this {label} permanently
                        </DangerButton>
                    </div>
                </Modal>
            </section>

        </div >
    );

}
