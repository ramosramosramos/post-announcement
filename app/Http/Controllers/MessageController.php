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
        $users = User::where('phone', '!=', null)->select(['id', 'name', 'phone'])->get();
        return inertia('Message/Index', [
            'users' => $users,
        ]);
    }

    public function send(SendMessageRequests $request, MessageService $messageService)
    {
        // set_time_limit(360); // Increases the limit to 120 seconds.



        // for ($i = 0; $i < 100; $i++) {
        //     $messageService->sendMessage("192.168.253.129", '09292163695', "Test to send message to 0991636195");

        // }


        if($request->phones !== []){

            dd($request->all());
        }


        // return ['message'=>'Messages sent successfully.'];

    }
}
