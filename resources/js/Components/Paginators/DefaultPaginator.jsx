import React, { useState } from 'react';

import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { router } from '@inertiajs/react';

export default function DefaultPaginator({ links }) {
    const { current_page, last_page ,path} = links;
    const [page, setPage] = useState(current_page);

    const handleChange = (event, value) => {
        setPage(value);
        router.get(path, { page: value },{
            preserveScroll:true,
        });
    };

    return ( links.from &&
        <Stack spacing={2}>
            <Pagination count={last_page} page={page} onChange={handleChange} />
        </Stack>
    );
}
