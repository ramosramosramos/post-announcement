import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import MoodBadIcon from '@mui/icons-material/MoodBad';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { CardMedia } from '@mui/material';
import Dropdown from '../Dropdown';
import { toast } from 'react-toastify';
export default function PostCard({ post }) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{ width: '100%' }}>
            <CardHeader
                avatar={
                    <Avatar src={post?.avatar ?? ''} alt={post?.name} sx={{ bgcolor: red[500] }} aria-label="recipe">

                    </Avatar>
                }
                action={
                    <div>
                        <Dropdown>
                            <Dropdown.Trigger>
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            </Dropdown.Trigger>

                            <Dropdown.Content>
                                {route().current('home') &&
                                    <>
                                        <Dropdown.Link href={route('posts.edit', post.id)}>
                                            Edit
                                        </Dropdown.Link>
                                        <Dropdown.Link method="post" onSuccess={() => {
                                            toast.success('Sucessfully move to archives.');
                                        }} href={route('posts.moveArchive', post.id)}>
                                            Move to archives
                                        </Dropdown.Link>
                                        <Dropdown.Link method="post" onSuccess={() => {
                                            toast.success('Sucessfully move to bin.');
                                        }} href={route('posts.destroy', post.id)}>
                                            Delete this post
                                        </Dropdown.Link>
                                    </>
                                }
                                {route().current('posts.archive') &&
                                    <>

                                        <Dropdown.Link method="post"
                                            onSuccess={() => {
                                                toast.success('Sucessfully restored from archive.');
                                            }}
                                            href={route('posts.restoreArchive', post.id)}>
                                            Restore
                                        </Dropdown.Link>
                                        <Dropdown.Link method="post" onSuccess={() => {
                                            toast.success('Sucessfully move to bin.');
                                        }} href={route('posts.destroy', post.id)}>
                                            Move this to bin
                                        </Dropdown.Link>
                                    </>
                                }
                                {route().current('posts.bin') &&
                                    <>

                                        <Dropdown.Link method="post"
                                            onSuccess={() => {
                                                toast.success('Sucessfully restored from bin.');
                                            }}
                                            href={route('posts.restore', post.id)}>
                                            Restore
                                        </Dropdown.Link>
                                        <Dropdown.Link method="post" onSuccess={() => {
                                            toast.success('Permanently deleted.');
                                        }} href={route('posts.forceDelete', post.id)}>
                                            Delete permanently
                                        </Dropdown.Link>
                                    </>
                                }

                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                }
                title={post?.name}
                subheader={post?.created_at}
            />





            <CardContent>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {post?.content}
                </Typography>
            </CardContent>
            {post?.media_image &&
                <CardMedia
                    component="img"
                    height="50"
                    image={post?.media_image}
                    alt="Image"
                />}
            <CardActions disableSpacing>
                <IconButton >
                    <FavoriteIcon />
                </IconButton>
                <IconButton >
                    <ThumbUpIcon />
                </IconButton>
                <IconButton >
                    <ThumbDownIcon />
                </IconButton>
                <IconButton >
                    <SentimentVeryDissatisfiedIcon />
                </IconButton>
                <IconButton >
                    <MoodBadIcon />
                </IconButton>
                <IconButton >
                    <SentimentVerySatisfiedIcon />
                </IconButton>

            </CardActions>
        </Card>
    );
}
