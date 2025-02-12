<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(){
        $search = request()->input('search');
        $users = User::with(['media'])
        ->when($search,function($query) use($search){
                    $query->where('name','like','%'.$search.'%');

        })
        ->select(['id','name'])->paginate(10);

        return inertia('User/Index',[
            'users'=>UserResource::collection($users),
            'search'=>$search,
        ]);
    }

    public function show(User $user){
        
    }
}
