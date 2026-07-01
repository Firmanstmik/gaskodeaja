<?php

namespace Database\Seeders;

use App\Models\Branding;
use App\Models\Hero;
use App\Models\Service;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class GaskodeSeeder extends Seeder
{
    public function run(): void
    {
        User::query()->updateOrCreate(
            ['email' => 'admin@gaskodeaja.com'],
            [
                'name' => 'Admin GasKode',
                'password' => Hash::make('GaskodeAdmin2026!'),
            ]
        );

        Hero::query()->updateOrCreate(
            ['id' => 1],
            [
                'title' => 'Jasa Pembuatan Website Profesional',
                'subtitle' => 'Bangun kredibilitas bisnis Anda dengan website cepat, modern, dan SEO friendly.',
                'image_path' => '',
                'cta_text' => 'Konsultasi Sekarang',
                'cta_link' => '/contact',
                'is_active' => true,
            ]
        );

        Branding::query()->updateOrCreate(
            ['kategori' => 'opening', 'pernyataan' => 'Mengapa Memilih GasKode Aja?'],
            [
                'jawaban' => [
                    'Tim berpengalaman di bidang web development',
                    'Desain modern dan responsif',
                    'Dukungan pasca-launch',
                    'Harga transparan dan kompetitif',
                ],
            ]
        );

        Branding::query()->updateOrCreate(
            ['kategori' => 'closing', 'pernyataan' => 'Siap Memulai Proyek Digital Anda?'],
            [
                'jawaban' => ['Hubungi kami hari ini dan dapatkan konsultasi gratis untuk kebutuhan website bisnis Anda.'],
                'cta_text' => 'Hubungi Kami',
                'cta_link' => '/contact',
            ]
        );

        $services = [
            ['title' => 'Website Company Profile', 'description' => 'Website profesional untuk memperkenalkan bisnis Anda.', 'icon' => 'layout'],
            ['title' => 'E-Commerce', 'description' => 'Toko online lengkap dengan sistem pembayaran.', 'icon' => 'shopping-cart'],
            ['title' => 'Landing Page', 'description' => 'Halaman konversi tinggi untuk campaign marketing.', 'icon' => 'zap'],
            ['title' => 'Maintenance & Support', 'description' => 'Perawatan rutin dan update keamanan website.', 'icon' => 'wrench'],
        ];

        foreach ($services as $service) {
            Service::query()->updateOrCreate(['title' => $service['title']], $service);
        }
    }
}
