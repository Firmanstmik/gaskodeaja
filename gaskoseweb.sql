-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: mariadb:3306
-- Generation Time: Jun 18, 2026 at 03:02 PM
-- Server version: 11.8.5-MariaDB
-- PHP Version: 8.3.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gaskoseweb`
--

-- --------------------------------------------------------

--
-- Table structure for table `brandings`
--

CREATE TABLE `brandings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `kategori` enum('opening','closing') NOT NULL,
  `pernyataan` varchar(255) NOT NULL,
  `jawaban` text NOT NULL,
  `cta_text` varchar(255) DEFAULT NULL,
  `cta_link` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `brandings`
--

INSERT INTO `brandings` (`id`, `kategori`, `pernyataan`, `jawaban`, `cta_text`, `cta_link`, `created_at`, `updated_at`) VALUES
(11, 'opening', 'Kenapa Pilih GaskodeAja?', '[\"Website cepat & SEO ready\",\"Desain premium (bukan template murahan)\",\"Bisa custom sesuai kebutuhan bisnis\",\"Support & maintenance\"]', NULL, NULL, '2026-05-04 17:03:52', '2026-05-05 19:50:14'),
(14, 'closing', 'Siap Kembangkan Bisnis Anda?', '[\"Jangan biarkan bisnis Anda tertinggal di era digital. Kami siap membantu Anda membangun sistem yang tepat.\"]', NULL, NULL, '2026-05-05 16:14:26', '2026-05-05 16:14:26'),
(15, 'opening', 'Kenapa GaskodeAja Hadir?', '[\"Banyak bisnis saat ini sudah memiliki website, namun tidak memberikan hasil yang maksimal. Website hanya menjadi tampilan, tanpa mampu mendatangkan pelanggan.\",\"GaskodeAja hadir sebagai jawaban atas tantangan Anda. Dengan tampilan profesional, kami membantu meningkatkan kepercayaan pelanggan sekaligus memaksimalkan angka penjualan\",\"Fokus kami bukan sekadar \\\"bikin website\\\", tapi membantu bisnis berkembang.\"]', NULL, NULL, '2026-05-05 21:01:59', '2026-05-05 21:01:59'),
(16, 'closing', 'Siap Kembangkan Bisnis Anda?', '[\"Jangan biarkan bisnis Anda tertinggal di era digital. Kami siap membantu Anda membangun sistem yang tepat.\"]', NULL, NULL, '2026-05-05 21:02:51', '2026-05-05 21:03:46'),
(17, 'opening', 'Apa yang Membuat Kami Berbeda?', '[\"Fokus pada Hasil\",\"Teknologi Modern\",\"Desain Premium\",\"SEO Ready\",\"Support Pasca Project\"]', NULL, NULL, '2026-05-06 05:02:49', '2026-05-06 05:02:49'),
(18, 'opening', 'Kenapa Layanan Kami Berbeda?', '[\"SEO Ready\",\"Desain Premium\",\"Sistem Scalable\"]', NULL, NULL, '2026-05-06 15:35:05', '2026-05-06 15:35:05'),
(19, 'closing', 'Siap Punya Website yang Menghasilkan?', '[\"Jangan biarkan bisnis Anda kalah saing. Mulai miliki website profesional hari ini.\"]', NULL, NULL, '2026-05-06 15:35:42', '2026-05-06 15:35:42'),
(20, 'opening', 'Bukan Sekadar Tampilan, Tapi Hasil Nyata', '[\"Kami tidak hanya membuat website yang terlihat bagus, tetapi juga membantu meningkatkan kepercayaan dan potensi penjualan bisnis klien.\"]', NULL, NULL, '2026-05-06 18:28:53', '2026-05-06 18:28:53'),
(21, 'closing', 'Siap Punya Website Seperti Ini?', '[\"Kami siap membantu bisnis Anda berkembang dengan website yang profesional dan menghasilkan.\"]', NULL, NULL, '2026-05-06 18:29:15', '2026-05-06 18:29:15'),
(22, 'closing', 'Butuh Website untuk Bisnis Anda?', '[\"Kami siap membantu Anda membuat website profesional yang siap menghasilkan.\"]', NULL, NULL, '2026-05-06 19:45:39', '2026-05-06 19:45:39'),
(23, 'opening', 'Mulai Diskusi Sekarang', '[\"Punya ide atau ingin mengembangkan bisnis secara digital? Tim kami siap membantu dari perencanaan hingga website Anda siap digunakan.\"]', NULL, NULL, '2026-05-07 07:42:02', '2026-05-07 07:42:02'),
(24, 'closing', 'Siap Mulai Project Anda?', '[\"Jangan tunggu sampai bisnis Anda tertinggal. Mulai sekarang, bangun website profesional yang siap menghasilkan.\"]', NULL, NULL, '2026-05-07 07:43:23', '2026-05-07 07:43:23'),
(25, 'opening', 'Kenapa Konsultasi di GaskodeAja?', '[\"100% Gratis Konsultasi (Tanpa Biaya)\",\"Solusi Sesuai Budget Bisnis\",\"Tanpa Komitmen (Bisa Diskusi Dulu)\"]', NULL, NULL, '2026-05-07 07:50:13', '2026-05-07 07:50:13');

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cara_kerjas`
--

CREATE TABLE `cara_kerjas` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `list` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cara_kerjas`
--

INSERT INTO `cara_kerjas` (`id`, `list`, `created_at`, `updated_at`) VALUES
(1, 'Konsultasi kebutuhan bisnis', '2026-05-04 19:50:27', '2026-05-04 19:50:27'),
(2, 'Perencanaan & desain sistem', '2026-05-04 19:50:38', '2026-05-04 19:50:38'),
(3, 'Proses development', '2026-05-04 19:50:44', '2026-05-04 19:50:44'),
(4, 'Testing & revisi', '2026-05-04 19:50:48', '2026-05-04 19:50:48'),
(5, 'Launching & support', '2026-05-04 19:50:52', '2026-05-04 19:50:52');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `slug`, `created_at`, `updated_at`) VALUES
(6, 'Web Development', 'web-development', '2026-04-28 18:47:16', '2026-04-28 19:04:01'),
(7, 'Mobile Apps', 'mobile-apps', '2026-04-28 18:47:30', '2026-04-28 19:04:21'),
(8, 'UI/UX Design', 'uiux-design', '2026-04-28 18:47:40', '2026-04-28 19:04:35'),
(9, 'Digital Marketing', 'digital-marketing', '2026-04-28 19:04:50', '2026-04-28 19:04:50'),
(10, 'Cloud Computing', 'cloud-computing', '2026-04-28 19:05:16', '2026-04-28 19:05:16'),
(11, 'Data Scrapping', 'data-scrapping', '2026-05-10 03:40:20', '2026-05-10 03:40:20');

-- --------------------------------------------------------

--
-- Table structure for table `contact_mes`
--

CREATE TABLE `contact_mes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `label` varchar(255) NOT NULL,
  `value` varchar(255) NOT NULL,
  `sub_value` varchar(255) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `contact_mes`
--

INSERT INTO `contact_mes` (`id`, `label`, `value`, `sub_value`, `icon`, `created_at`, `updated_at`) VALUES
(4, 'WHATSAPP', '0812-xxxx-xxxx', NULL, 'Call', '2026-05-07 05:21:31', '2026-05-07 05:21:31'),
(5, 'EMAIL', 'halo@gaskodeaja.com', NULL, 'gmail', '2026-05-07 05:21:55', '2026-05-07 05:21:55'),
(6, 'LOKASI', 'Lombok, Nusa Tenggara Barat', NULL, 'Location', '2026-05-07 05:22:28', '2026-05-07 05:22:28'),
(7, 'JAM OPERASIONAL', 'Senin – Sabtu: 09.00 – 21.00', NULL, 'Time', '2026-05-07 05:23:01', '2026-05-07 05:23:01');

-- --------------------------------------------------------

--
-- Table structure for table `contact_submissions`
--

CREATE TABLE `contact_submissions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `whatsapp_number` varchar(255) NOT NULL,
  `message` text DEFAULT NULL,
  `status` enum('pending','processed','archived') NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `contact_submissions`
--

INSERT INTO `contact_submissions` (`id`, `name`, `whatsapp_number`, `message`, `status`, `created_at`, `updated_at`) VALUES
(1, 'hgjhgj', '123456789012', 'hgfhf ghfhgf hgf hfhgf hgfhfhg fhfhg', 'processed', '2026-05-07 06:05:00', '2026-05-07 06:05:29');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `footer_setups`
--

CREATE TABLE `footer_setups` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `brand_name` varchar(255) NOT NULL DEFAULT 'Gaskode',
  `brand_logo_path` varchar(255) DEFAULT NULL,
  `short_description` text NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `social_links` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`social_links`)),
  `copyright_text` varchar(255) NOT NULL DEFAULT '© 2026 Gaskode. All rights reserved.',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `footer_setups`
--

INSERT INTO `footer_setups` (`id`, `brand_name`, `brand_logo_path`, `short_description`, `address`, `email`, `phone`, `social_links`, `copyright_text`, `created_at`, `updated_at`) VALUES
(2, 'GaskodeAja', NULL, 'Solusi digital terpercaya untuk pembuatan website, aplikasi mobile, dan strategi digital marketing guna mengakselerasi pertumbuhan bisnis Anda.', 'Jl. Basuki Rahmat, Praya, Kec. Praya, Kabupaten Lombok Tengah, Nusa Tenggara Bar. 83518', 'halo@gaskodeaja.com', '0812-3456-7890', '{\"instagram\":\"https:\\/\\/instagram.com\\/gaskode\",\"github\":\"https:\\/\\/github.com\\/gaskode\",\"linkedin\":\"https:\\/\\/linkedin.com\\/company\\/gaskode\",\"facebook\":\"https:\\/\\/facebook.com\\/gaskode\"}', '© 2026 GaskodeAja. Hak Cipta Dilindungi.', '2026-05-07 07:05:59', '2026-05-07 07:22:22');

-- --------------------------------------------------------

--
-- Table structure for table `heroes`
--

CREATE TABLE `heroes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `subtitle` text NOT NULL,
  `image_path` varchar(255) NOT NULL,
  `cta_text` varchar(255) NOT NULL,
  `cta_link` varchar(255) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `heroes`
--

INSERT INTO `heroes` (`id`, `title`, `subtitle`, `image_path`, `cta_text`, `cta_link`, `is_active`, `created_at`, `updated_at`) VALUES
(6, 'GasKodeAja', 'solusi bisnis anda', 'uploads/hero/1777399962_Hero-Section.webp', 'Chat WhatsApp Sekarang', 'https://wa.me/62', 1, '2026-04-28 18:12:42', '2026-04-28 19:50:21'),
(9, 'Jasa Pembuatan Website Profesional & SEO di Lombok', 'Kami membantu bisnis Anda tampil profesional, cepat ditemukan di Google, dan siap menghasilkan lebih banyak pelanggan.', 'uploads/hero/1778014262_hero_about.webp', 'Konsultasi Gratis Sekarang', 'https://wa.me/62', 1, '2026-04-28 19:31:21', '2026-05-05 20:51:02'),
(10, 'Tentang GaskodeAja', 'Kami membantu bisnis berkembang melalui website dan aplikasi yang tidak hanya menarik, tapi juga menghasilkan.', 'uploads/hero/1778014293_hero_services.webp', 'Konsultasi Gratis Sekarang', 'https://wa.me/62', 1, '2026-04-28 19:48:26', '2026-05-05 20:51:33'),
(11, 'Portofolio Project Kami', 'Berikut beberapa hasil project yang telah kami kerjakan untuk membantu bisnis berkembang secara digital.', 'uploads/hero/1778014331_hero_portfolio.webp', 'Konsultasi Gratis Sekarang', 'https://wa.me/62', 1, '2026-04-28 19:53:14', '2026-05-05 20:52:11'),
(12, 'Blog & Insight Digital', 'Tips, strategi, dan informasi seputar website, aplikasi, dan cara mengembangkan bisnis secara digital.', 'uploads/hero/1778014353_hero_blog.webp', 'Konsultasi Gratis Sekarang', 'https://wa.me/62', 1, '2026-04-28 19:54:17', '2026-05-05 20:52:33'),
(13, 'Hubungi Kami', 'Kami siap membantu Anda membangun website atau aplikasi yang sesuai dengan kebutuhan bisnis Anda.', 'uploads/hero/1778014376_hero_contact.webp', 'Konsultasi Gratis Sekarang', 'https://wa.me/62', 1, '2026-04-28 19:55:02', '2026-05-05 20:52:56');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `leads`
--

CREATE TABLE `leads` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `whatsapp_number` varchar(255) NOT NULL,
  `requirement` text DEFAULT NULL,
  `status` enum('new','contacted','closed','lost') NOT NULL DEFAULT 'new',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `leads`
--

INSERT INTO `leads` (`id`, `name`, `whatsapp_number`, `requirement`, `status`, `created_at`, `updated_at`) VALUES
(8, 'Testing', '087765432111', 'Lorem ipsum dolor sit amet adalah teks standar (dummy text) yang digunakan dalam industri percetakan dan penataan huruf (desain grafis/web) untuk mengisi tata letak (layout) sementara. Berasal dari literatur Latin klasik karya Cicero tahun 45 SM, teks ini tidak memiliki arti khusus dan digunakan agar perhatian fokus pada elemen visual, bukan isi teks', 'new', '2026-05-04 15:37:24', '2026-05-04 15:37:24');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(22, '0001_01_01_000000_create_users_table', 1),
(23, '0001_01_01_000001_create_cache_table', 1),
(24, '0001_01_01_000002_create_jobs_table', 1),
(25, '2026_04_23_113737_create_hero_sections_table', 1),
(26, '2026_04_23_113830_create_jenis_jasas_table', 1),
(27, '2026_04_23_113849_create_benefits_table', 1),
(28, '2026_04_23_113911_create_jasa_has_benefits_table', 1),
(29, '2026_04_23_114057_create_projects_table', 1),
(30, '2026_04_23_152234_create_personal_access_tokens_table', 1),
(31, '2026_04_27_131918_create_categories_table', 1),
(32, '2026_04_27_132143_create_services_table', 1),
(33, '2026_04_27_132234_create_service_plans_table', 1),
(34, '2026_04_27_132823_create_portfolios_table', 1),
(35, '2026_04_27_132957_create_posts_table', 1),
(36, '2026_04_27_133043_create_leads_table', 1),
(37, '2026_04_27_133152_create_testimonials_table', 1),
(38, '2026_04_28_062556_create_heroes_table', 2),
(39, '2026_04_29_145038_create_brandings_table', 3),
(40, '2026_04_29_145141_create_question_answers_table', 3),
(41, '2026_04_29_145213_create_cara_kerjas_table', 3),
(42, '2026_04_29_172829_create_visi_misis_table', 3),
(43, '2026_05_06_210139_create_contact_mes_table', 4),
(44, '2026_05_06_210210_create_contact_submissions_table', 5),
(45, '2026_05_06_210631_create_footer_setups_table', 6);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` text NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `portfolios`
--

CREATE TABLE `portfolios` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `category_id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `client_name` varchar(255) NOT NULL,
  `image_thumbnail` varchar(255) NOT NULL,
  `problems` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`problems`)),
  `solutions` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`solutions`)),
  `results` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`results`)),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `portfolios`
--

INSERT INTO `portfolios` (`id`, `category_id`, `title`, `client_name`, `image_thumbnail`, `problems`, `solutions`, `results`, `created_at`, `updated_at`) VALUES
(6, 6, 'Amara Rent Car', 'Travel Lombok', 'uploads/portfolios/gaskode-project-01.png', '[\"Katalog kendaraan belum tertata rapi secara online\",\"Proses booking masih bergantung pada chat manual\"]', '[\"Pengembangan website rental mobil responsive\",\"Katalog kendaraan dengan alur booking yang mudah dipahami\"]', '[\"Customer lebih cepat melihat pilihan kendaraan dan menghubungi admin untuk booking\"]', '2026-07-02 00:00:00', '2026-07-02 00:00:00'),
(7, 7, 'LokaClean App', 'LokaClean Indonesia', 'uploads/portfolios/gaskode-project-02.png', '[\"Layanan cleaning sulit dipaketkan dan dipantau lewat sistem\",\"Customer membutuhkan proses order yang cepat dari mobile\"]', '[\"Pengembangan aplikasi mobile layanan cleaning\",\"UI paket premium dengan navigasi order yang sederhana\"]', '[\"Paket layanan terlihat lebih profesional dan customer lebih mudah melakukan pemesanan\"]', '2026-07-02 00:00:00', '2026-07-02 00:00:00'),
(8, 7, 'Nutrition Rescue LMS', 'Nutrition Rescue', 'uploads/portfolios/gaskode-project-03.png', '[\"Materi edukasi gizi belum terkumpul dalam satu platform\",\"Peserta kesulitan memantau progres belajar\"]', '[\"Pengembangan platform pembelajaran digital\",\"Dashboard modul, progress, dan akses mobile friendly\"]', '[\"Pembelajaran menjadi lebih terstruktur, interaktif, dan mudah diakses kapan saja\"]', '2026-07-02 00:00:00', '2026-07-02 00:00:00'),
(9, 6, 'Skybridge Program Jepang', 'Skybridge Nusantara', 'uploads/portfolios/gaskode-project-04.png', '[\"Pendaftaran program masih membutuhkan banyak proses manual\",\"Admin perlu dashboard untuk memantau status pendaftar\"]', '[\"Pengembangan sistem pendaftaran dan dashboard admin\",\"Alur multi step dengan monitoring data pendaftar\"]', '[\"Tim admin dapat mengelola pendaftar lebih cepat dan data menjadi lebih rapi\"]', '2026-07-02 00:00:00', '2026-07-02 00:00:00'),
(10, 6, 'Atlas Rent Car', 'Atlas Rent Car', 'uploads/portfolios/gaskode-project-05.png', '[\"Brand rental membutuhkan landing page yang kuat untuk konversi\",\"Customer perlu informasi armada yang jelas di mobile\"]', '[\"Pembuatan website rental mobil premium responsive\",\"Optimasi tampilan hero, katalog armada, dan CTA booking\"]', '[\"Tampilan bisnis menjadi lebih kredibel dan siap menerima inquiry dari berbagai device\"]', '2026-07-02 00:00:00', '2026-07-02 00:00:00'),
(11, 6, 'STILO ARPS', 'Pustik STMIK Lombok', 'uploads/portfolios/gaskode-project-06.png', '[\"Pelaporan penelitian dan pengabdian belum tersaji dalam dashboard publik\",\"Informasi usulan perlu mudah diakses civitas akademik\"]', '[\"Pengembangan portal ARPS berbasis web\",\"Dashboard grafik, berita, dan pengumuman yang responsive\"]', '[\"Data akademik lebih mudah dipantau dan informasi kampus tampil lebih profesional\"]', '2026-07-02 00:00:00', '2026-07-02 00:00:00'),
(12, 6, 'Inventaris dan Lab', 'Lab Bahri48', 'uploads/portfolios/gaskode-project-07.png', '[\"Inventaris komputer dan perangkat jaringan sulit dipantau manual\",\"Status maintenance butuh rekap yang lebih cepat\"]', '[\"Pengembangan sistem inventaris laboratorium\",\"Dashboard grafik kondisi barang dan manajemen data aset\"]', '[\"Aset lab lebih mudah dipantau, dicari, dan direkap oleh pengelola\"]', '2026-07-02 00:00:00', '2026-07-02 00:00:00'),
(13, 6, 'Satgas PPKPT', 'Pustik STMIK Lombok', 'uploads/portfolios/gaskode-project-08.png', '[\"Satgas kewalahan dalam merekap histori tindak kekerasan\",\"Mahasiswa membutuhkan jalur pelaporan yang mudah diakses\"]', '[\"Pengembangan website layanan Satgas PPKPT\",\"Alur pelaporan, informasi layanan, dan halaman publik responsive\"]', '[\"Pelaporan menjadi lebih cepat dan proses tindak lanjut dapat dikelola lebih rapi\"]', '2026-07-02 00:00:00', '2026-07-02 00:00:00'),
(14, 7, 'SIKA Mobile', 'STMIK Lombok', 'uploads/portfolios/gaskode-project-09.png', '[\"Mahasiswa kesulitan mengakses KRS, nilai, dan transkrip dari mobile\",\"Informasi akademik perlu tersedia lebih cepat\"]', '[\"Pengembangan aplikasi sistem informasi kampus berbasis mobile\",\"Fitur KRS, nilai, aktivitas, transkrip, dan surat dalam satu aplikasi\"]', '[\"Mahasiswa lebih mudah mengakses layanan akademik langsung dari smartphone\"]', '2026-07-02 00:00:00', '2026-07-02 00:00:00'),
(15, 7, 'Klinik Mobile App', 'Klinik Kesehatan', 'uploads/portfolios/gaskode-project-10.png', '[\"Pasien membutuhkan akses jadwal dokter dan booking yang lebih praktis\",\"Informasi layanan klinik belum nyaman digunakan di mobile\"]', '[\"Pengembangan aplikasi mobile klinik\",\"Fitur profil, booking, konsultasi dokter, berita, dan riwayat layanan\"]', '[\"Pengalaman pasien menjadi lebih modern dan proses booking lebih mudah dilakukan\"]', '2026-07-02 00:00:00', '2026-07-02 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `category_id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `excerpt` text NOT NULL,
  `content` longtext NOT NULL,
  `meta_title` varchar(255) DEFAULT NULL,
  `meta_description` varchar(255) DEFAULT NULL,
  `status` enum('draft','published') NOT NULL DEFAULT 'draft',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `user_id`, `category_id`, `title`, `slug`, `excerpt`, `content`, `meta_title`, `meta_description`, `status`, `created_at`, `updated_at`) VALUES
(8, 2, 6, 'Panduan Belajar React untuk Pemula', 'panduan-belajar-react-untuk-pemula', 'Pelajari dasar-dasar React JS mulai dari komponen hingga state management dalam waktu singkat.', '<p>React adalah library JavaScript yang sangat populer...</p>', 'Panduan Belajar React untuk Pemula', 'Pelajari dasar-dasar React JS mulai dari komponen hingga state management dalam waktu singkat.', 'published', '2026-05-06 19:59:28', '2026-05-06 19:59:28'),
(9, 2, 7, 'Tren Pengembangan Aplikasi Mobile 2024', 'tren-pengembangan-aplikasi-mobile-2024', 'Simak apa saja teknologi yang mendominasi industri mobile apps tahun ini, dari Flutter hingga AI.', '<p>Tahun 2024 membawa perubahan besar bagi ekosistem mobile...</p>', 'Tren Pengembangan Aplikasi Mobile 2024', 'Simak apa saja teknologi yang mendominasi industri mobile apps tahun ini, dari Flutter hingga AI.', 'published', '2026-05-06 19:59:49', '2026-05-06 19:59:49'),
(10, 2, 8, 'Prinsip Utama dalam Desain UI/UX', 'prinsip-utama-dalam-desain-uiux', 'Desain bukan sekadar visual, tapi soal pengalaman pengguna. Pelajari 5 prinsip utamanya.', '<p>User Experience (UX) adalah kunci kesuksesan sebuah produk digital...</p>', 'Prinsip Utama dalam Desain UI/UX', 'Desain bukan sekadar visual, tapi soal pengalaman pengguna. Pelajari 5 prinsip utamanya.', 'draft', '2026-05-06 20:00:07', '2026-05-06 20:00:07'),
(11, 2, 9, 'Strategi SEO untuk Meningkatkan Traffic', 'strategi-seo-untuk-meningkatkan-traffic', 'Dapatkan lebih banyak pengunjung organik dengan teknik SEO on-page dan off-page terbaru.', '<p>SEO tetap menjadi pilar utama dalam digital marketing...</p>', 'Strategi SEO untuk Meningkatkan Traffic', 'Dapatkan lebih banyak pengunjung organik dengan teknik SEO on-page dan off-page terbaru.', 'published', '2026-05-06 20:00:25', '2026-05-06 20:00:25'),
(12, 2, 10, 'Mengenal Keuntungan Migrasi ke Cloud', 'mengenal-keuntungan-migrasi-ke-cloud', 'Mengapa perusahaan besar mulai meninggalkan server fisik? Temukan jawabannya di sini.', '<p>Cloud computing menawarkan skalabilitas dan efisiensi biaya yang luar biasa...</p>', 'Mengenal Keuntungan Migrasi ke Cloud', 'Mengapa perusahaan besar mulai meninggalkan server fisik? Temukan jawabannya di sini.', 'published', '2026-05-06 20:00:57', '2026-05-06 20:00:57');

-- --------------------------------------------------------

--
-- Table structure for table `question_answers`
--

CREATE TABLE `question_answers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `question` varchar(255) NOT NULL,
  `answer` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `question_answers`
--

INSERT INTO `question_answers` (`id`, `question`, `answer`, `created_at`, `updated_at`) VALUES
(1, 'Berapa lama pembuatan website?', '7–14 hari tergantung fitur', '2026-05-04 16:15:03', '2026-05-04 16:15:03'),
(2, 'Apakah bisa custom sesuai kebutuhan?', 'Bisa, semua bisa disesuaikan', '2026-05-04 16:15:42', '2026-05-04 16:15:42'),
(3, 'Apakah dapat support setelah jadi?', 'Ya, kami menyediakan maintenance', '2026-05-04 16:15:53', '2026-05-04 16:15:53'),
(4, 'Apakah bisa bantu SEO?', 'Ya, kami optimasi agar website mudah ditemukan di Google', '2026-05-04 16:16:05', '2026-05-04 16:17:37');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `icon` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `title`, `description`, `icon`, `created_at`, `updated_at`) VALUES
(4, 'Website Professional dan Modern', 'Layanan pembuatan website profesional berbasis Laravel, React, dan Next.js.', 'Layout', '2026-04-28 19:06:56', '2026-04-28 19:13:38'),
(5, 'Aplikasi Mobile dan iOS', 'Pengembangan aplikasi Android dan iOS menggunakan Kotlin dan Jetpack Compose, React Native dan Flutter.', 'Smartphone', '2026-04-28 19:08:20', '2026-04-28 19:13:06'),
(6, 'SEO ready', 'Strategi pemasaran digital, SEO, dan optimasi iklan untuk meningkatkan konversi.', 'Search', '2026-04-28 19:10:40', '2026-04-28 19:10:40'),
(7, 'Desain UI/UX Modern', 'Perancangan antarmuka pengguna yang modern dan intuitif menggunakan Figma.', 'Palette', '2026-04-28 19:12:03', '2026-04-28 19:12:03'),
(8, 'Web Scraping & Data Extraction', 'Transformasi data dari web menjadi aset bisnis. Kami melayani pengambilan data otomatis secara terstruktur dari berbagai platform untuk riset pasar, pemantauan harga, atau kebutuhan database Anda dalam format CSV, Excel, atau JSON.', 'database', '2026-05-10 12:50:03', '2026-05-10 12:50:03'),
(9, 'IT Academic Solution (Specialist TA)', 'Pendampingan pengerjaan Tugas Akhir/Skripsi khusus mahasiswa IT. Kami bantu mulai dari pengembangan sistem (Web/Mobile), perancangan arsitektur, hingga sesi penjelasan logika kode (mentoring) agar kamu siap 100% menghadapi dosen penguji.', 'graduation-cap', '2026-05-10 12:50:03', '2026-05-10 12:50:03');

-- --------------------------------------------------------

--
-- Table structure for table `service_plans`
--

CREATE TABLE `service_plans` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `service_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(15,2) NOT NULL,
  `features` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`features`)),
  `maintenance_cost` decimal(15,2) NOT NULL,
  `is_featured` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `service_plans`
--

INSERT INTO `service_plans` (`id`, `service_id`, `name`, `price`, `features`, `maintenance_cost`, `is_featured`, `created_at`, `updated_at`) VALUES
(4, 4, 'Web Starter', 2500000.00, '[\"Gratis Domain.com\",\"Max 5 Halaman\",\"Terima Beres\",\"Integrasi Sosial Media\",\"Tahunan web aktif (700k)\"]', 700000.00, 0, '2026-04-28 19:19:26', '2026-04-28 19:19:26'),
(5, 4, 'Web Standart', 3500000.00, '[\"Gratis Domain\",\"Max 10 Halaman\",\"Terima Beres\",\"Integrasi Sosial Media\",\"Google Analis\\/Console\",\"Tahunan web aktif (800k)\"]', 800000.00, 1, '2026-04-28 19:21:34', '2026-04-28 19:21:34'),
(6, 4, 'Web Profesional', 4500000.00, '[\"Gratis Domain\",\"Max 20 Halaman\",\"Terima Beres\",\"Integrasi Sosial Media\",\"Google Analis\\/Console\",\"Optimasi SEO On Page\",\"Tahunan web aktif (900k)\"]', 900000.00, 1, '2026-04-28 19:23:21', '2026-04-28 19:23:21');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('cpyy2ybod0stefBsOob2V5nPC82QPfP4yBqzcj8A', NULL, '172.19.0.1', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoicXpuQWJ1UGdROHFBRFdNUTZ2MHRLOFJrYThhd2ROUzNJR3VENzQwNiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwNyI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1777571949),
('Jw5Ckr9b3GVcUHr89BliU0PU0pQdeWpjEBlHribC', NULL, '172.19.0.1', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiamhLbUpQV0Yxb2VEdk5RQlY3RUtIVE9ieE1LTm43VjVLTXRpSkExOSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwNyI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1777579936),
('o3OpvtUas2AFRnWkOPGlLo1veUkjHe5WiroE3Uu5', NULL, '172.19.0.1', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiQm02ZmZWdnVRT1NhZEJ4SXZ1ZVVsd05uWDBSa0o1QTFPdmFPNEl1VSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwNyI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1777415578),
('p20CtVVhR1kIuNPB4PESRjuW4BDz0OY7HGhD6mYk', NULL, '172.19.0.1', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoicVliSVp4dTZHS3B1ZzdycnJxZ3VWaG9sb3NCc0dacm10Nmw0UEFvNiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwNyI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1777537142),
('qdtojQtjgRYTBtj2TTlOyCHjo49xY36Ff7dSemlm', NULL, '172.19.0.1', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiTkFWeHRUQlJ4azJIaUJGc1RIUXF3cllORWJ3VTY1WUp0UWkzeFpOMCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MTk6Imh0dHA6Ly8wLjAuMC4wOjgwMDciO3M6NToicm91dGUiO047fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1777591304);

-- --------------------------------------------------------

--
-- Table structure for table `testimonials`
--

CREATE TABLE `testimonials` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `position` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `rating` int(11) DEFAULT 5,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data for table `testimonials`
--

INSERT INTO `testimonials` (`id`, `name`, `position`, `content`, `rating`, `created_at`, `updated_at`) VALUES
(1, 'Budi Santoso', 'CEO TechInnovate', 'Layanan yang luar biasa! Tim sangat responsif dan hasil kerjanya melampaui ekspektasi kami. Sangat direkomendasikan.', 5, '2026-05-06 04:53:23', '2026-05-06 04:53:23'),
(2, 'Siti Aminah', 'Marketing Manager', 'Platform ini sangat membantu efisiensi kerja tim pemasaran kami dalam mengelola kampanye harian.', 4, '2026-05-06 04:53:42', '2026-05-06 04:53:42'),
(3, 'Andi Wijaya', 'Freelance Designer', 'User interface yang sangat intuitif. Saya tidak butuh waktu lama untuk memahami semua fiturnya. Mantap!', 5, '2026-05-06 04:53:56', '2026-05-06 04:53:56'),
(4, 'Dewi Lestari', 'Owner Bakery Shop', 'Sangat membantu bisnis kecil saya untuk go digital. Prosesnya mudah dan harganya sangat terjangkau.', 5, '2026-05-06 04:54:08', '2026-05-06 04:54:08'),
(5, 'Rizky Pratama', 'IT Support', 'Sistemnya stabil dan jarang sekali ada kendala teknis. Dokumentasinya juga sangat lengkap dan mudah diikuti.', 4, '2026-05-06 04:54:27', '2026-05-06 04:54:27');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(2, 'Bahri Gaskode', 'bahri@gaskodeaja.com', NULL, '$2y$12$fcaA7d8tBncpKLg2fLz76e3QG9GNk7CB8CVcc2UaQp61wgYL1iPVe', NULL, '2026-05-09 13:58:59', '2026-05-09 13:58:59'),
(3, 'Firman Gaskode', 'firman@gaskodeaja.com', NULL, '$2y$12$CLfaQdjZI.cKxqMGbrjHxO3I02AlU6mmtJf.R7zF3dQa7Jsh83/tm', NULL, '2026-05-09 13:59:49', '2026-05-10 03:34:42');

-- --------------------------------------------------------

--
-- Table structure for table `visi_misis`
--

CREATE TABLE `visi_misis` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tipe` enum('visi','misi') NOT NULL DEFAULT 'misi',
  `konten` text NOT NULL,
  `urutan` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `visi_misis`
--

INSERT INTO `visi_misis` (`id`, `tipe`, `konten`, `urutan`, `created_at`, `updated_at`) VALUES
(2, 'visi', '[\"Menjadi solusi digital terpercaya bagi bisnis dalam meningkatkan kehadiran dan pertumbuhan di era digital.\"]', 1, '2026-05-05 04:37:56', '2026-05-05 04:37:56'),
(3, 'misi', '[\"Kualitas Tinggi\",\"Professional\",\"SEO Optimized\",\"Berkelanjutan\"]', 2, '2026-05-05 04:40:32', '2026-05-05 04:40:32');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `brandings`
--
ALTER TABLE `brandings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_expiration_index` (`expiration`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_locks_expiration_index` (`expiration`);

--
-- Indexes for table `cara_kerjas`
--
ALTER TABLE `cara_kerjas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `categories_slug_unique` (`slug`);

--
-- Indexes for table `contact_mes`
--
ALTER TABLE `contact_mes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contact_submissions`
--
ALTER TABLE `contact_submissions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `footer_setups`
--
ALTER TABLE `footer_setups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `heroes`
--
ALTER TABLE `heroes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `leads`
--
ALTER TABLE `leads`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  ADD KEY `personal_access_tokens_expires_at_index` (`expires_at`);

--
-- Indexes for table `portfolios`
--
ALTER TABLE `portfolios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `portfolios_category_id_foreign` (`category_id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `posts_slug_unique` (`slug`),
  ADD KEY `posts_user_id_foreign` (`user_id`),
  ADD KEY `posts_category_id_foreign` (`category_id`);

--
-- Indexes for table `question_answers`
--
ALTER TABLE `question_answers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `service_plans`
--
ALTER TABLE `service_plans`
  ADD PRIMARY KEY (`id`),
  ADD KEY `service_plans_service_id_foreign` (`service_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `testimonials`
--
ALTER TABLE `testimonials`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `visi_misis`
--
ALTER TABLE `visi_misis`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `brandings`
--
ALTER TABLE `brandings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `cara_kerjas`
--
ALTER TABLE `cara_kerjas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `contact_mes`
--
ALTER TABLE `contact_mes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `contact_submissions`
--
ALTER TABLE `contact_submissions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `footer_setups`
--
ALTER TABLE `footer_setups`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `heroes`
--
ALTER TABLE `heroes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `leads`
--
ALTER TABLE `leads`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `portfolios`
--
ALTER TABLE `portfolios`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `question_answers`
--
ALTER TABLE `question_answers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `service_plans`
--
ALTER TABLE `service_plans`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `testimonials`
--
ALTER TABLE `testimonials`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `visi_misis`
--
ALTER TABLE `visi_misis`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `portfolios`
--
ALTER TABLE `portfolios`
  ADD CONSTRAINT `portfolios_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  ADD CONSTRAINT `posts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `service_plans`
--
ALTER TABLE `service_plans`
  ADD CONSTRAINT `service_plans_service_id_foreign` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
