<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request?->user()->load('media');

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user,
                'is_admin' => $user?->role == 'admin',
                'avatar' =>  $user ->media->value('id') ? Storage::url($user ->media->value('id').'/'.$user ->media->value('file_name')) : null,

            ],
        ];
    }
}
