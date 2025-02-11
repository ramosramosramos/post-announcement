<?php

namespace App\Jobs;

use App\Models\User;
use App\Notifications\PostNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class PostJob implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(public $post)
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $users = User::select('id', 'email')->get();

        foreach ($users as $user) {
            $user->notify(new PostNotification($this->post));
        }
    }
}
