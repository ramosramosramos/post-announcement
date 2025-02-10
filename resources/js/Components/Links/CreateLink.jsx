import { Link } from "@inertiajs/react";

import AddIcon from '@mui/icons-material/Add';
export default function CreateLink({children,...props}){
    return (

        <Link {...props} className="flex gap-2 bg-red-900 hover:bg-red-800 transition-all ease-in-out w-[max-content] p-2 px-4 rounded-md text-white">
            <AddIcon/>    {children ? children :'Create'}
        </Link>
    );
}
