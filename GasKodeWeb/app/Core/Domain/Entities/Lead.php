<?php

namespace App\Core\Domain\Entities;

use JsonSerializable;

class Lead implements JsonSerializable
{
    public function __construct(
        private ?int $id,
        private string $name,
        private string $whatsappNumber,
        private ?string $requirement,
        private string $status // 'new', 'contacted', 'closed', 'lost'
    ) {}

    public function getId(): ?int { return $this->id; }
    public function getName(): string { return $this->name; }
    public function getWhatsappNumber(): string { return $this->whatsappNumber; }
    public function getRequirement(): ?string { return $this->requirement; }
    public function getStatus(): string { return $this->status; }

    public function jsonSerialize(): mixed
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'whatsapp_number' => $this->whatsappNumber,
            'requirement' => $this->requirement,
            'status' => $this->status,
        ];
    }
}