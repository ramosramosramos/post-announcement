import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link as="button"
            {...props}
            className={
                ' rounded-sm p-2 w-[90%] h-[40px] text-center transition-all ease-in-out  ' +
                (active
                    ? 'bg-white font-bold text-red-950 hover:bg-red-200'
                    : 'border-transparent text-gray-100 bg-red-900 hover:bg-red-800 ') +
                className
            }
        >
            {children}
        </Link>
    );
}
