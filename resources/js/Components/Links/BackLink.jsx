import { Link } from "@inertiajs/react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function
BackLink({children,...props})
{

    return (<>
    <Link {...props} >
    <ArrowBackIcon/>
    {children ?? 'Back to home'}
    </Link>
    </>);
}

