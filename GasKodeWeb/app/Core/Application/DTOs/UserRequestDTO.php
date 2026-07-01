<?php
namespace App\Core\Application\DTOs;

class UserRequestDTO {
    public function __construct(
        public string $name,
        public string $email,
        public ?string $password = null
    ) {}
}