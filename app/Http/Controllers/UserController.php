<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(){
        $search = request()->input('search');
        $users = User::select(['id','name'])->paginate(10);

        return inertia('User/Index',[
            'users'=>UserResource::collection($users),
            'search'=>$search,
        ]);
    }
}
