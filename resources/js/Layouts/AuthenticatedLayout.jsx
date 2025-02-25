import ApplicationLogo from '@/Components/ApplicationLogo';
import BackLink from '@/Components/Links/BackLink';
import SideLink from '@/Components/Links/SideLink';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';

export default function AuthenticatedLayout({ header, children }) {
    const { user, is_admin } = usePage().props.auth;
    const { url } = usePage();
    const [openSideBar, setOpenSideBar] = useState(false);

    const handleSideBar = () => {
        setOpenSideBar(!openSideBar);
    };

    return (
        <>
            {/* Navbar */}
            <nav className="fixed top-0 h-[70px] z-50 w-full bg-[#800000] flex items-center justify-between px-4">
                <ApplicationLogo className="rounded-full w-[50px]" />
                <button onClick={handleSideBar} className="text-white text-2xl">
                    ☰
                </button>
            </nav>

            {/* Sidebar & Overlay */}
            {openSideBar && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={() => setOpenSideBar(false)}
                />
            )}

            <aside
                className={`fixed top-0 right-0 z-40 w-64 h-screen pt-20 transition-transform duration-300 transform
                    ${openSideBar ? 'translate-x-0' : 'translate-x-full'}
                    bg-[#800000] border-l border-zinc-500`}
                aria-label="Sidebar"
            >
                <div className="w-full flex items-center flex-col gap-2 p-4">
                    <SideLink href={route('home')} active={route().current('home') || route().current('posts.create') || route().current('posts.edit')}>
                        Home
                    </SideLink>
                    {is_admin && <>
                        <SideLink href={route('posts.archive')} active={route().current('posts.archive')}>
                            Archives
                        </SideLink>
                        <SideLink href={route('posts.bin')} active={route().current('posts.bin')}>
                            Bin
                        </SideLink>
                        <SideLink href={route('users.index')} active={url.startsWith('/users')}>
                            Find users
                        </SideLink>
                        <SideLink href={route('sections.index')} active={url.startsWith('/sections')}>
                            Sections
                        </SideLink>
                        <SideLink href={route('year_levels.index')} active={url.startsWith('/year_levels')}>
                            Grade / Year levels
                        </SideLink>
                        <SideLink href={route('messages.index')} active={url.startsWith('/messages')}>
                            Messages
                        </SideLink>

                    </>}
                    <SideLink href={route('profile.edit')} active={url.startsWith('/profile')}>
                        Profile
                    </SideLink>
                    <SideLink method="post" href={route('logout')}>
                        Logout
                    </SideLink>
                </div>
            </aside>

            {/* Main Layout Wrapper */}
            <div className="flex">
                {/* Main Content */}
                <main className="mt-[60px] w-full min-h-screen p-4">
                    <header className="w-[95%] flex flex-col gap-10 m-auto text-start p-5 text-white">
                        {!route().current('home') &&
                            <BackLink href={route('home')} className="flex gap-3 text-sm items-center text-gray-800 hover:text-gray-700 w-[max-content]">
                                Back to home
                            </BackLink>
                        }
                        {header}
                    </header>
                    {children}
                </main>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    pauseOnFocusLoss
                    draggable
                    theme='dark'
                    pauseOnHover


                />
            </div>
        </>
    );
}
