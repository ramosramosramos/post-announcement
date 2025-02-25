<?php

namespace App\Http\Controllers;

use App\Services\MessageService;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function index(){

        return inertia('Message/Index', [
            'message' => 'Messages sent successfully.'
        ]);
    }

    public function autoSend(MessageService $messageService){
        set_time_limit(360); // Increases the limit to 120 seconds.

        $batchSize = 50;
        $counter = 0;


        for ($i = 0; $i < 100; $i++) {
            $messageService->sendMessage("192.168.253.129", '0991636195', "Aliens are coming! Run for your lives!");
            $counter++;
            if ($counter % $batchSize === 0) {
                // Pause for 1-2 seconds between batches to reduce load.
                sleep(2);
            }
        }
        
        return ['message'=>'Messages sent successfully.'];

    }
}
