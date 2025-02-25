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
        // set_time_limit(360); // Increases the limit to 120 seconds.


        if ($request->phones !== []) {

            foreach ($request->phones as $phone) {
                $messageService->sendMessage($request->ipAddress, $phone, $request->message);
            }
        }


        // return ['message'=>'Messages sent successfully.'];

    }
}
