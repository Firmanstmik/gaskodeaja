<?php
namespace App\Core\Domain\Entities;

class Users {
    public function __construct(
        public ?int $id,
        public string $name,
        public string $email,
        public ?string $password = null
    ) {}
}