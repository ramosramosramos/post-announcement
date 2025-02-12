<?php

namespace App\Jobs;

use App\Models\Post;
use App\Models\User;
use App\Notifications\PostNotification;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class PostJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(public User $user, public Post $post)
    {
        //
    }

    public function handle(): void
    {
        $this->user->notify(new PostNotification($this->post));
    }
}
