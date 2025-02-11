import React from 'react';
import {
    Card, CardHeader, CardContent, CardActions, Avatar, IconButton, Typography, CardMedia
} from '@mui/material';
import { red } from '@mui/material/colors';
import {
    Favorite as FavoriteIcon,
    MoreVert as MoreVertIcon,
    ThumbUp as ThumbUpIcon,
    ThumbDown as ThumbDownIcon,
    SentimentVeryDissatisfied as SadIcon,
    MoodBad as AngryIcon,
    SentimentVerySatisfied as WowIcon
} from '@mui/icons-material';
import Dropdown from '../Dropdown';
import { toast } from 'react-toastify';
import { useForm, usePage } from '@inertiajs/react';

export default function PostCard({ post }) {
    const {user} = usePage().props.auth;
    const reactionIcons = [
        { icon: FavoriteIcon, type: 'heart' },
        { icon: ThumbUpIcon, type: 'like' },
        { icon: ThumbDownIcon, type: 'dislike' },
        { icon: SadIcon, type: 'sad' },
        { icon: AngryIcon, type: 'angry' },
        { icon: WowIcon, type: 'wow' }
    ];

    const form = useForm({});
    const handleReact = (type)=>{
        form.post(route('posts.react',{post:post.id,type:type,user_id:user.id}),{
            preserveScroll:true,

        })
    }
    return (
        <Card sx={{ width: '100%' }}>
            <CardHeader
                avatar={<Avatar src={post?.avatar ?? ''} alt={post?.name} sx={{ bgcolor: red[500] }} />}
                action={
                    <Dropdown>
                        <Dropdown.Trigger>
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                        </Dropdown.Trigger>
                        <Dropdown.Content>
                            {route().current('home') && (
                                <>
                                    <Dropdown.Link href={route('posts.edit', post.id)}>Edit</Dropdown.Link>
                                    <Dropdown.Link method="post" onSuccess={() => toast.success('Successfully moved to archives.')} href={route('posts.moveArchive', post.id)}>Move to archives</Dropdown.Link>
                                    <Dropdown.Link method="post" onSuccess={() => toast.success('Successfully moved to bin.')} href={route('posts.destroy', post.id)}>Delete this post</Dropdown.Link>
                                </>
                            )}
                            {route().current('posts.archive') && (
                                <>
                                    <Dropdown.Link method="post" onSuccess={() => toast.success('Successfully restored from archive.')} href={route('posts.restoreArchive', post.id)}>Restore</Dropdown.Link>
                                    <Dropdown.Link method="post" onSuccess={() => toast.success('Successfully moved to bin.')} href={route('posts.destroy', post.id)}>Move this to bin</Dropdown.Link>
                                </>
                            )}
                            {route().current('posts.bin') && (
                                <>
                                    <Dropdown.Link method="post" onSuccess={() => toast.success('Successfully restored from bin.')} href={route('posts.restore', post.id)}>Restore</Dropdown.Link>
                                    <Dropdown.Link method="post" onSuccess={() => toast.success('Permanently deleted.')} href={route('posts.forceDelete', post.id)}>Delete permanently</Dropdown.Link>
                                </>
                            )}
                        </Dropdown.Content>
                    </Dropdown>
                }
                title={post?.name}
                subheader={post?.created_at}
            />

            <CardContent>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>{post?.content}</Typography>
            </CardContent>
            {post?.media_image && <CardMedia component="img" height="50" image={post?.media_image} alt="Image" />}

            <CardActions disableSpacing>
                {reactionIcons.map(({ icon: Icon, type }) => (
                    <IconButton onClick={()=>handleReact(type)} key={type} sx={{ color: post.user_reaction === type ? 'red' : '' }}>
                        <Icon />
                        <span className='text-sm'>{post.reactions[type] || ''}</span>
                    </IconButton>
                ))}
            </CardActions>
        </Card>
    );
}
