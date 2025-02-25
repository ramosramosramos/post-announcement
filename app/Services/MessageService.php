<?php

namespace App\Services;

use Exception;

class MessageService
{
    public function sendMessage($ipAddress, $sendTo, $message)
    {
        $finalMessage = str_replace(' ', '+', $message);
        $url = "http://{$ipAddress}:8080/v1/sms/send/?phone={$sendTo}&message={$finalMessage}";

        try {
            $response = file_get_contents($url);

        } catch (Exception $e) {
            error_log($e->getMessage());
        }
    }
}
