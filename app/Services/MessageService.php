<?php

namespace App\Services;

use Exception;

class MessageService
{

    // public function sendMessage($ipAddress, $sendTo, $message)
    // {
    //     set_time_limit(360); // Increases the limit to 120 seconds.
    //     $finalMessage = str_replace(' ', '+', $message);
    //     $url = "http://{$ipAddress}:8080/v1/sms/send/?phone={$sendTo}&message={$finalMessage}";

    //     try {
    //         $response = file_get_contents($url);

    //     } catch (Exception $e) {
    //         error_log($e->getMessage());
    //     }
    // }
    // public function sendMessage($ipAddress, $sendTo, $message)
    // {
    //     $finalMessage = str_replace(' ', '+', $message);
    //     $url = "http://{$ipAddress}:8080/v1/sms/send/?phone={$sendTo}&message={$finalMessage}";

    //     $ch = curl_init($url);
    //     curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    //     try {
    //         $response = curl_exec($ch);
    //         if (curl_errno($ch)) {
    //             throw new Exception(curl_error($ch));
    //         }
    //     } catch (Exception $e) {
    //         error_log($e->getMessage());
    //     } finally {
    //         curl_close($ch); // Close the cURL session
    //     }
    // }
}
