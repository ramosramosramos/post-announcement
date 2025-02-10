import { Link } from "@inertiajs/react";

export default function DefaultLink({children,...props}) {
    return (<>

        <Link as="button"
           {...props}
            className="rounded-md text-sm text-gray-300  hover:text-gray-100 focus:outline-none  focus:ring-offset-2"
        >
            {children}
        </Link>
    </>);
}
