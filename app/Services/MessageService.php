<?php

namespace App\Services;

use Exception;

class MessageService
{
    // public function sendMessage($ipAddress, $sendTo, $message)
    // {
    //     $finalMessage = str_replace(' ', '+', $message);
    //     $url = "http://{$ipAddress}:8080/v1/sms/send/?phone={$sendTo}&message={$finalMessage}";

    //     try {
    //         $handle = fopen($url, "r"); // Open the connection
    //         if ($handle) {
    //             stream_get_contents($handle); // Read response
    //             fclose($handle); // Close the connection
    //         }
    //     } catch (Exception $e) {
    //         error_log($e->getMessage());
    //     }
    // }
    public function sendMessage($ipAddress, $sendTo, $message)
    {
        $finalMessage = str_replace(' ', '+', $message);
        $url = "http://{$ipAddress}:8080/v1/sms/send/?phone={$sendTo}&message={$finalMessage}";

        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        try {
            $response = curl_exec($ch);
            if (curl_errno($ch)) {
                throw new Exception(curl_error($ch));
            }
        } catch (Exception $e) {
            error_log($e->getMessage());
        } finally {
            curl_close($ch); // Close the cURL session
        }
    }
}
