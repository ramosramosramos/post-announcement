import React from 'react';
import {
    Card, CardHeader, CardContent, CardActions, Avatar, IconButton, Typography, CardMedia
} from '@mui/material';
import { red } from '@mui/material/colors';

import { Link, useForm } from '@inertiajs/react';

export default function UserCard({ user }) {


    const form = useForm({});

    return (
        <Link href={route('users.show', user.id)} >
            <Card sx={{ width: '100%' }}>
                <CardHeader
                    avatar={<Avatar src={user?.avatar ?? ''} alt={user?.name} sx={{ bgcolor: red[500] }} />}
                    action={
                        <>
                        </>
                    }
                    title={user?.name}
                    subheader={user?.created_at}
                />

                <CardContent>
                    <Typography color='warning'>
                        {user?.year_level}   -  {user?.section}

                    </Typography>
                </CardContent>


            </Card>
        </Link>
    );
}
