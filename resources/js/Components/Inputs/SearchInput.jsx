import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useForm } from '@inertiajs/react';


export default function SearchInput({ search ,filter}) {
    const form = useForm({
        search: '',
        section: filter?.section,
        year_level: filter?.year_level,
    })
    const submit = (e) => {
        e.preventDefault();
        form.get(route('users.index'),{
            preserveScroll:true,

        })
    }
    return (
        <Paper
            onSubmit={submit}
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
        >

            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Find users"
                defaultValue={search ?? ''}
                onChange={(e) => form.setData('search', e.target.value)}
                inputProps={{ 'aria-label': 'Find users' }}
            />
            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

        </Paper>
    );
}
