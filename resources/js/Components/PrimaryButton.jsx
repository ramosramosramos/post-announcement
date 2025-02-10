export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `items-center text-gray-900 rounded-md border border-transparent bg-red-50 px-4 py-2 text-xs font-semibold uppercase tracking-widest transition duration-150 ease-in-out hover:bg-red-100 focus:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2  ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
