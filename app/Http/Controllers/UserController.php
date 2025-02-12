<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;

class UserController extends Controller
{
    public function index()
    {
        $search = request()->input('search');
        $users = User::with(['media'])
            ->when($search, function ($query) use ($search) {
                $query->where('name', 'like', '%'.$search.'%');

            })
            ->select(['id', 'name','section','year_level'])->paginate(10);

        return inertia('User/Index', [
            'users' => UserResource::collection($users),
            'search' => $search,
        ]);
    }

    public function show(User $user)
    {

        return inertia('User/Show', ['user' => new UserResource($user->load('media'))]);
    }
}
