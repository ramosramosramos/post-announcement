<?php

namespace App\Http\Controllers;

use App\Http\Requests\SendMessageRequests;
use App\Models\User;
use App\Services\MessageService;
use Illuminate\Http\Request;


class MessageController extends Controller
{
    public function index()
    {
        $users = User::where('phone', '!=', null)->select(['id', 'name', 'phone'])->orderBy('name','asc')->get();
        return inertia('Message/Index', [
            'users' => $users,
        ]);
    }

    public function send(SendMessageRequests $request, MessageService $messageService)
    {



    }
}
