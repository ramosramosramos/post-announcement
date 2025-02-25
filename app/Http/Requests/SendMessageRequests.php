<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SendMessageRequests extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'phones' => ['required', 'array'],
            'message' => ['required', 'string'],
        ];

    }

    public function messages(): array
    {
        return [
            'phones.required' => 'Please select at least one recipient.',
            'message.required' => 'Message is required.',
        ];
    }
}
