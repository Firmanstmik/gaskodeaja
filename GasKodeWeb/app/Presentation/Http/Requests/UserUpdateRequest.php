<?php
namespace App\Presentation\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class UserUpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        // Mengambil ID user dari parameter route (misal: /api/users/{id})
        $userId = $this->route('id');

        return [
            'name'     => 'sometimes|required|string|max:255',
            // 'unique:users,email,'.$userId memastikan email tetap valid jika tidak diganti
            'email'    => 'sometimes|required|string|email|max:255|unique:users,email,' . $userId,
            'password' => 'nullable|string|min:6|confirmed',
        ];
    }

    public function messages(): array
    {
        return [
            'email.unique' => 'Email ini sudah digunakan oleh pengguna lain.',
            'password.min' => 'Password baru minimal harus 6 karakter.',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'status'  => 'error',
            'message' => 'Update gagal, periksa kembali inputan Anda',
            'errors'  => $validator->errors()
        ], 422));
    }
}