-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 06, 2024 at 04:31 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `olmspythondb`
--

-- --------------------------------------------------------

--
-- Table structure for table `auth_group`
--

CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_group_permissions`
--

CREATE TABLE `auth_group_permissions` (
  `id` bigint(20) NOT NULL,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_permission`
--

CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `auth_permission`
--

INSERT INTO `auth_permission` (`id`, `name`, `content_type_id`, `codename`) VALUES
(1, 'Can add log entry', 1, 'add_logentry'),
(2, 'Can change log entry', 1, 'change_logentry'),
(3, 'Can delete log entry', 1, 'delete_logentry'),
(4, 'Can view log entry', 1, 'view_logentry'),
(5, 'Can add permission', 2, 'add_permission'),
(6, 'Can change permission', 2, 'change_permission'),
(7, 'Can delete permission', 2, 'delete_permission'),
(8, 'Can view permission', 2, 'view_permission'),
(9, 'Can add group', 3, 'add_group'),
(10, 'Can change group', 3, 'change_group'),
(11, 'Can delete group', 3, 'delete_group'),
(12, 'Can view group', 3, 'view_group'),
(13, 'Can add content type', 4, 'add_contenttype'),
(14, 'Can change content type', 4, 'change_contenttype'),
(15, 'Can delete content type', 4, 'delete_contenttype'),
(16, 'Can view content type', 4, 'view_contenttype'),
(17, 'Can add session', 5, 'add_session'),
(18, 'Can change session', 5, 'change_session'),
(19, 'Can delete session', 5, 'delete_session'),
(20, 'Can view session', 5, 'view_session'),
(21, 'Can add author', 6, 'add_author'),
(22, 'Can change author', 6, 'change_author'),
(23, 'Can delete author', 6, 'delete_author'),
(24, 'Can view author', 6, 'view_author'),
(25, 'Can add category', 7, 'add_category'),
(26, 'Can change category', 7, 'change_category'),
(27, 'Can delete category', 7, 'delete_category'),
(28, 'Can view category', 7, 'view_category'),
(29, 'Can add user', 8, 'add_customuser'),
(30, 'Can change user', 8, 'change_customuser'),
(31, 'Can delete user', 8, 'delete_customuser'),
(32, 'Can view user', 8, 'view_customuser'),
(33, 'Can add book', 9, 'add_book'),
(34, 'Can change book', 9, 'change_book'),
(35, 'Can delete book', 9, 'delete_book'),
(36, 'Can view book', 9, 'view_book'),
(37, 'Can add student', 10, 'add_student'),
(38, 'Can change student', 10, 'change_student'),
(39, 'Can delete student', 10, 'delete_student'),
(40, 'Can view student', 10, 'view_student'),
(41, 'Can add issuedbookdetails', 11, 'add_issuedbookdetails'),
(42, 'Can change issuedbookdetails', 11, 'change_issuedbookdetails'),
(43, 'Can delete issuedbookdetails', 11, 'delete_issuedbookdetails'),
(44, 'Can view issuedbookdetails', 11, 'view_issuedbookdetails');

-- --------------------------------------------------------

--
-- Table structure for table `django_admin_log`
--

CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext DEFAULT NULL,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) UNSIGNED NOT NULL CHECK (`action_flag` >= 0),
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `django_content_type`
--

CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `django_content_type`
--

INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES
(1, 'admin', 'logentry'),
(3, 'auth', 'group'),
(2, 'auth', 'permission'),
(4, 'contenttypes', 'contenttype'),
(6, 'olmsapp', 'author'),
(9, 'olmsapp', 'book'),
(7, 'olmsapp', 'category'),
(8, 'olmsapp', 'customuser'),
(11, 'olmsapp', 'issuedbookdetails'),
(10, 'olmsapp', 'student'),
(5, 'sessions', 'session');

-- --------------------------------------------------------

--
-- Table structure for table `django_migrations`
--

CREATE TABLE `django_migrations` (
  `id` bigint(20) NOT NULL,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `django_migrations`
--

INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES
(1, 'contenttypes', '0001_initial', '2024-06-25 03:02:24.942736'),
(2, 'contenttypes', '0002_remove_content_type_name', '2024-06-25 03:02:25.034235'),
(3, 'auth', '0001_initial', '2024-06-25 03:02:25.266785'),
(4, 'auth', '0002_alter_permission_name_max_length', '2024-06-25 03:02:25.319446'),
(5, 'auth', '0003_alter_user_email_max_length', '2024-06-25 03:02:25.331415'),
(6, 'auth', '0004_alter_user_username_opts', '2024-06-25 03:02:25.339391'),
(7, 'auth', '0005_alter_user_last_login_null', '2024-06-25 03:02:25.345676'),
(8, 'auth', '0006_require_contenttypes_0002', '2024-06-25 03:02:25.351660'),
(9, 'auth', '0007_alter_validators_add_error_messages', '2024-06-25 03:02:25.368751'),
(10, 'auth', '0008_alter_user_username_max_length', '2024-06-25 03:02:25.376577'),
(11, 'auth', '0009_alter_user_last_name_max_length', '2024-06-25 03:02:25.384522'),
(12, 'auth', '0010_alter_group_name_max_length', '2024-06-25 03:02:25.396737'),
(13, 'auth', '0011_update_proxy_permissions', '2024-06-25 03:02:25.415805'),
(14, 'auth', '0012_alter_user_first_name_max_length', '2024-06-25 03:02:25.426087'),
(15, 'olmsapp', '0001_initial', '2024-06-25 03:02:26.134878'),
(16, 'admin', '0001_initial', '2024-06-25 03:02:26.275445'),
(17, 'admin', '0002_logentry_remove_auto_add', '2024-06-25 03:02:26.290579'),
(18, 'admin', '0003_logentry_add_action_flag_choices', '2024-06-25 03:02:26.302144'),
(19, 'sessions', '0001_initial', '2024-06-25 03:02:26.335767');

-- --------------------------------------------------------

--
-- Table structure for table `django_session`
--

CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `django_session`
--

INSERT INTO `django_session` (`session_key`, `session_data`, `expire_date`) VALUES
('k0pmonagu2xd52r0tvh24r22wpcg2498', '.eJxVjDsOwjAQBe_iGlmOF_8o6XMGa9de4wBypDipEHeHSCmgfTPzXiLitta4dV7ilMVFDOL0uxGmB7cd5Du22yzT3NZlIrkr8qBdjnPm5_Vw_w4q9vqt2aBDUEmZwYEHXUBba6yCAETWAlOw3jMXfcbA6JwuKhFSMZSDIRDvD8YlN9U:1sOffy:9HLnktTWnZcFmXFfmDhlu1mRbB2M44VlW9y_ZdDVgLc', '2024-07-16 15:44:14.324455'),
('z54690eqtayav96hxdqrfy33xiwpj2v2', '.eJxVjDsOwjAQBe_iGlneFf5R0nMGa71r4wBypHyqiLtDpBTQvpl5m0q0Li2tc5nSIOqiwKjT75iJn6XvRB7U76PmsS_TkPWu6IPO-jZKeV0P9--g0dy-tS8OHHgTxHqLTGKggtRwRsueBH20BgmMc7kiMgaKESBQYbCeDav3B-bBN2I:1sQ6Pu:7kCnarJHYLkHhMSwFCu3XEfBTWbPFrHTisQB6C879To', '2024-07-20 14:29:34.737682');

-- --------------------------------------------------------

--
-- Table structure for table `olmsapp_author`
--

CREATE TABLE `olmsapp_author` (
  `id` bigint(20) NOT NULL,
  `authorname` varchar(200) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `olmsapp_author`
--

INSERT INTO `olmsapp_author` (`id`, `authorname`, `created_at`, `updated_at`) VALUES
(1, 'Freida McFadden', '2024-06-25 03:06:32.447684', '2024-06-25 03:06:32.447684'),
(2, 'J.K. Rowling', '2024-06-25 03:06:34.957874', '2024-06-25 03:06:34.957874'),
(3, 'A. J. Baime', '2024-06-25 03:06:37.753287', '2024-06-25 03:06:37.753287'),
(4, 'Chetan Bhagatt', '2024-06-25 03:06:40.684070', '2024-06-25 03:06:40.684070'),
(5, 'Anita Desai', '2024-06-25 03:06:43.700804', '2024-06-25 03:06:43.700804'),
(6, 'Chetan Bhagatt', '2024-06-26 11:55:24.696188', '2024-06-26 11:55:24.696188'),
(7, 'Anita Desai', '2024-06-26 11:55:36.606444', '2024-06-26 11:55:36.606444'),
(8, 'HC Verma', '2024-06-26 11:55:45.772255', '2024-06-26 11:55:45.772255'),
(9, 'R.D. Sharma', '2024-06-26 11:55:53.154308', '2024-06-26 11:55:53.154308'),
(10, 'Dr. Andy Williams', '2024-06-26 11:56:04.059647', '2024-06-26 11:56:04.059647'),
(11, 'Kyle Hill', '2024-06-26 11:56:12.185684', '2024-06-26 11:56:12.185684'),
(12, 'Robert T. Kiyosak', '2024-06-26 11:56:20.310292', '2024-06-26 11:56:20.310292'),
(13, 'Kelly Barnhill', '2024-06-26 11:56:33.661640', '2024-06-26 11:56:33.661640'),
(14, 'anuj', '2024-07-02 15:41:50.522841', '2024-07-02 15:41:50.522841');

-- --------------------------------------------------------

--
-- Table structure for table `olmsapp_book`
--

CREATE TABLE `olmsapp_book` (
  `id` bigint(20) NOT NULL,
  `bookname` varchar(200) NOT NULL,
  `isbnnum` varchar(200) NOT NULL,
  `price` varchar(200) NOT NULL,
  `bookimage` varchar(100) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `isIssued` varchar(50) NOT NULL,
  `authid_id` bigint(20) NOT NULL,
  `catid_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `olmsapp_book`
--

INSERT INTO `olmsapp_book` (`id`, `bookname`, `isbnnum`, `price`, `bookimage`, `created_at`, `updated_at`, `isIssued`, `authid_id`, `catid_id`) VALUES
(1, 'Basic Python Programming for Beginners', '9354720609', '100', 'book_img/711EmIF0NVL._AC_UF10001000_QL80__ZBkBj15.jpg', '2024-06-25 03:11:04.243369', '2024-06-27 13:23:59.595642', 'Return', 1, 2),
(2, 'The Python Champions of Coding', '8183285775', '30', 'book_img/711EmIF0NVL._AC_UF10001000_QL80__ZBkBj15.jpg', '2024-06-25 03:11:04.243369', '2024-06-27 13:19:15.511125', 'True', 1, 2),
(3, 'ASP.NET Core 5 for Beginners', '9355516436', '30', 'book_img/b1b6788016bbfab12cfd2722604badc9.jpg', '2024-06-26 11:58:56.372288', '2024-06-27 13:23:30.122013', 'True', 11, 8),
(4, 'C++: The Complete Reference, 4th Edition', '1921917822', '200', 'book_img/36af5de9012bf8c804e499dc3c3b33a5.jpg', '2024-06-26 12:00:13.265721', '2024-06-27 13:19:26.890977', 'True', 3, 5),
(5, 'The Girl Who Drank the Moon', '788BIT788', '45', 'book_img/f05cd198ac9335245e1fdffa793207a7.jpg', '2024-06-26 12:01:16.067239', '2024-06-26 12:01:16.067239', '0', 13, 3),
(6, 'Rich Dad Poor Dad:', 'BX76432298', '56', 'book_img/52411b2bd2a6b2e0df3eb10943a5b640.jpg', '2024-06-26 12:02:38.350290', '2024-06-26 12:08:56.465203', '0', 2, 3),
(7, 'WordPress Mastery Guide:', 'BHJ124564', '100', 'book_img/90083a56014186e88ffca10286172e64.jpg', '2024-06-26 12:04:00.625344', '2024-06-26 12:04:00.625344', '0', 12, 5),
(8, 'WordPress for Beginners 2022: A Visual Step-by-Step', 'B0197866556', '90', 'book_img/144ab706ba1cb9f6c23fd6ae9c0502b3.jpg', '2024-06-26 12:05:18.688926', '2024-06-26 12:09:06.538868', '0', 10, 5),
(9, 'Murach\'s MySQL', '8119218205', '45', 'book_img/5939d64655b4d2ae443830d73abc35b6.jpg', '2024-06-26 12:06:23.094017', '2024-06-26 12:06:23.094017', '0', 12, 5),
(10, 'Physics Redefined', 'BX10987664', '65', 'book_img/dd8267b57e0e4feee5911cb1e1a03a79.jpg', '2024-06-26 12:07:58.724938', '2024-06-26 12:07:58.724938', '0', 8, 6),
(11, 'PHP Crash Course', 'GGGHGH23423423', '450', 'book_img/Movers-Packers-Management-System-Add-Services.png', '2024-07-02 15:42:21.868448', '2024-07-02 15:43:15.475937', 'Return', 14, 8);

-- --------------------------------------------------------

--
-- Table structure for table `olmsapp_category`
--

CREATE TABLE `olmsapp_category` (
  `id` bigint(20) NOT NULL,
  `catname` varchar(200) NOT NULL,
  `status` varchar(200) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `olmsapp_category`
--

INSERT INTO `olmsapp_category` (`id`, `catname`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Romantic', 'Active', '2024-06-25 03:05:57.096156', '2024-06-25 03:05:57.096156'),
(2, 'Education', 'Active', '2024-06-25 03:06:11.494215', '2024-06-25 03:06:11.495213'),
(3, 'General', 'Active', '2024-06-25 03:06:16.261707', '2024-06-25 03:06:16.261707'),
(4, 'Others', 'Active', '2024-06-25 03:06:21.253614', '2024-06-25 03:06:21.253614'),
(5, 'Technology', 'Active', '2024-06-26 11:53:50.155763', '2024-06-26 11:53:50.155763'),
(6, 'Science', 'Active', '2024-06-26 11:53:58.551544', '2024-06-26 11:53:58.551544'),
(7, 'Management', 'Active', '2024-06-26 11:54:07.501748', '2024-06-26 11:54:07.501748'),
(8, 'Programming', 'Active', '2024-06-26 11:54:15.694355', '2024-06-26 11:54:15.694355');

-- --------------------------------------------------------

--
-- Table structure for table `olmsapp_customuser`
--

CREATE TABLE `olmsapp_customuser` (
  `id` bigint(20) NOT NULL,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `user_type` int(11) NOT NULL,
  `profile_pic` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `olmsapp_customuser`
--

INSERT INTO `olmsapp_customuser` (`id`, `password`, `last_login`, `is_superuser`, `username`, `first_name`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `user_type`, `profile_pic`) VALUES
(1, 'pbkdf2_sha256$390000$r6JagxYxSXmPGrTPYxjwXb$0d7n12d86sl28c3k6a8pVHNVfu0uI/D/FtcsnL9gdXA=', '2024-07-06 14:12:37.974976', 1, 'admin', 'Admin', 'Test', 'admin@gmail.com', 1, 1, '2024-06-25 03:04:03.497257', 1, 'media/profile_pic/219983_92fSPzr.png'),
(2, 'pbkdf2_sha256$720000$562RjD1Y5IfxaJWvNkJ6Jc$mhj+2jWMoohr7u4tVnBomtFwwJObhmMT3VsEATkfXOU=', '2024-06-27 13:14:09.824762', 0, 'abir123', 'Abir', 'Singh', 'abir@gmail.com', 0, 1, '2024-06-25 03:13:38.455746', 2, 'media/profile_pic/219983_6lWw6Bs.png'),
(3, 'pbkdf2_sha256$720000$FZxtKv2Z55WTjdXO5N6fZo$9+P7bkiPWW04klFrYyilGz/pgPjQgGGp+qz9ZPFrppE=', NULL, 0, 'sar123', 'Sarita', 'Pandey', 'sar@gmail.com', 0, 1, '2024-06-25 03:14:07.667442', 2, 'media/profile_pic/71sBtM3Yi5L._SL1360_.jpg'),
(5, 'pbkdf2_sha256$390000$tLWqC2lMP2sPTknQJJTwrK$gkB+Om4AQrqIuZlLgiWdbUi1/lEEBmbO2ULvsZyMePs=', '2024-07-03 04:36:34.453497', 0, 'test@123', 'Test', 'Sample', 'test@gmail.com', 0, 1, '2024-06-26 03:21:00.230693', 2, 'media/profile_pic/user_1_J32NtPU.png'),
(6, 'pbkdf2_sha256$720000$G4EldBLUtL4bXIgEzaeqz5$TEl+FWHb1+XcjiFaky5S1owgmqUciPWlCtNP4ktnS5c=', '2024-06-27 13:12:57.138117', 0, 'ankita123', 'Ankita', 'Tiwari', 'ankita@gmail.com', 0, 1, '2024-06-27 13:12:37.476148', 2, 'media/profile_pic/219983.png'),
(7, 'pbkdf2_sha256$720000$oYEYwUuQJeyV76b3mghEW7$i0CPoZWqUiZ9snqbsyrDWaviAN2nzQpzJxtoWBm/LAA=', NULL, 0, 'john123', 'John', 'Pororo', 'john@gmail.com', 0, 1, '2024-06-27 13:21:11.183883', 2, 'media/profile_pic/219983_cGnXkBi.png'),
(8, 'pbkdf2_sha256$390000$Q2lgnJLWEMKpa3bH6vzzFj$wAKnUnO4s5sT4C63M4AfxECopc9Xr+sSnx+6+IhPoIo=', '2024-07-02 15:22:29.471974', 0, 'amitk', 'Amit', 'Singh', 'amit@t.com', 0, 1, '2024-07-02 15:22:21.084840', 2, 'media/profile_pic/profile.png'),
(9, 'pbkdf2_sha256$390000$Krl7oQIj7K8RfuIua01KKr$rWOwGjcX+kvDhQ8m/wddshLoc+p4Pplbn7uVjaOlHtg=', NULL, 0, 'testuser', 'Test', 'User', 'testuset@test.com', 0, 1, '2024-07-02 15:39:53.679358', 2, 'media/profile_pic/user_1.png'),
(10, 'pbkdf2_sha256$390000$IKax9MZy7MX8O3fvVwopp6$Gfori5dITbJygrhebOw+7BC4l8+PnPx8TSKQkqgRXXg=', '2024-07-06 14:29:34.734656', 0, 'john12345', 'John Doe', 'Doe', 'johndoe12@t.com', 0, 1, '2024-07-02 15:40:59.887520', 2, 'media/profile_pic/user_1_G5NDRYt.png'),
(11, 'pbkdf2_sha256$390000$ETTyPKjCpxRUpYQbcNC9tl$5jv2pMugjF1dLV7l08LKfo2QENPpnEubSXjYy2ktXig=', '2024-07-06 14:13:47.165808', 0, 'test12345', 'Test', 'Sample', 'test123@gmail.com', 0, 1, '2024-07-03 04:36:04.786631', 2, 'media/profile_pic/user_1_8a1LDML.png');

-- --------------------------------------------------------

--
-- Table structure for table `olmsapp_customuser_groups`
--

CREATE TABLE `olmsapp_customuser_groups` (
  `id` bigint(20) NOT NULL,
  `customuser_id` bigint(20) NOT NULL,
  `group_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `olmsapp_customuser_user_permissions`
--

CREATE TABLE `olmsapp_customuser_user_permissions` (
  `id` bigint(20) NOT NULL,
  `customuser_id` bigint(20) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `olmsapp_issuedbookdetails`
--

CREATE TABLE `olmsapp_issuedbookdetails` (
  `id` bigint(20) NOT NULL,
  `issued_date` datetime(6) NOT NULL,
  `return_date` datetime(6) NOT NULL,
  `return_status` varchar(50) NOT NULL,
  `fine` decimal(10,2) NOT NULL,
  `book_id_id` bigint(20) NOT NULL,
  `stud_id_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `olmsapp_issuedbookdetails`
--

INSERT INTO `olmsapp_issuedbookdetails` (`id`, `issued_date`, `return_date`, `return_status`, `fine`, `book_id_id`, `stud_id_id`) VALUES
(1, '2024-06-25 03:24:07.638560', '2024-06-25 13:04:15.105083', 'Return', 100.00, 1, 1),
(2, '2024-06-26 03:10:58.883612', '2024-06-27 06:46:41.126864', 'Return', 0.00, 2, 2),
(3, '2024-06-26 03:12:54.936947', '2024-06-27 13:23:59.597636', 'Return', 200.00, 1, 1),
(4, '2024-06-27 13:19:15.477400', '2024-06-27 13:19:15.507135', '', 0.00, 2, 2),
(5, '2024-06-27 13:19:26.871844', '2024-06-27 13:19:26.885811', '', 0.00, 4, 4),
(6, '2024-06-27 13:23:30.101734', '2024-06-27 13:23:30.116024', '', 0.00, 3, 6),
(7, '2024-07-02 15:42:56.818724', '2024-07-02 15:43:15.478253', 'Return', 0.00, 11, 9);

-- --------------------------------------------------------

--
-- Table structure for table `olmsapp_student`
--

CREATE TABLE `olmsapp_student` (
  `id` bigint(20) NOT NULL,
  `mobilenumber` varchar(11) NOT NULL,
  `studentid` varchar(50) NOT NULL,
  `regdate_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `admin_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `olmsapp_student`
--

INSERT INTO `olmsapp_student` (`id`, `mobilenumber`, `studentid`, `regdate_at`, `updated_at`, `admin_id`) VALUES
(1, '9798798798', 'SS1167', '2024-06-25 03:13:39.240155', '2024-06-25 03:13:39.240155', 2),
(2, '7979797987', 'SS1397', '2024-06-25 03:14:08.389074', '2024-06-25 03:14:08.389074', 3),
(4, '7897979878', 'SS6615', '2024-06-26 03:21:00.972635', '2024-06-26 03:21:00.972635', 5),
(5, '7977979797', 'SS6954', '2024-06-27 13:12:38.261180', '2024-06-27 13:12:38.261180', 6),
(6, '7897789797', 'SS1543', '2024-06-27 13:21:11.972985', '2024-06-27 13:21:11.972985', 7),
(7, '1111111111', 'SS7054', '2024-07-02 15:22:21.321545', '2024-07-02 15:22:21.321545', 8),
(8, '1414141414', 'SS4519', '2024-07-02 15:39:53.932867', '2024-07-02 15:39:53.932867', 9),
(9, '3625141230', 'SS9557', '2024-07-02 15:41:00.191979', '2024-07-02 15:41:00.191979', 10),
(10, '6547897897', 'SS3911', '2024-07-03 04:36:05.023847', '2024-07-03 04:36:05.024876', 11);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `auth_group`
--
ALTER TABLE `auth_group`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  ADD KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`);

--
-- Indexes for table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`);

--
-- Indexes for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  ADD KEY `django_admin_log_user_id_c564eba6_fk_olmsapp_customuser_id` (`user_id`);

--
-- Indexes for table `django_content_type`
--
ALTER TABLE `django_content_type`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`);

--
-- Indexes for table `django_migrations`
--
ALTER TABLE `django_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `django_session`
--
ALTER TABLE `django_session`
  ADD PRIMARY KEY (`session_key`),
  ADD KEY `django_session_expire_date_a5c62663` (`expire_date`);

--
-- Indexes for table `olmsapp_author`
--
ALTER TABLE `olmsapp_author`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `olmsapp_book`
--
ALTER TABLE `olmsapp_book`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `isbnnum` (`isbnnum`),
  ADD KEY `olmsapp_book_authid_id_92576cf6_fk_olmsapp_author_id` (`authid_id`),
  ADD KEY `olmsapp_book_catid_id_7aa39b2d_fk_olmsapp_category_id` (`catid_id`);

--
-- Indexes for table `olmsapp_category`
--
ALTER TABLE `olmsapp_category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `olmsapp_customuser`
--
ALTER TABLE `olmsapp_customuser`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `olmsapp_customuser_groups`
--
ALTER TABLE `olmsapp_customuser_groups`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `olmsapp_customuser_groups_customuser_id_group_id_a6113256_uniq` (`customuser_id`,`group_id`),
  ADD KEY `olmsapp_customuser_groups_group_id_cdb0df8b_fk_auth_group_id` (`group_id`);

--
-- Indexes for table `olmsapp_customuser_user_permissions`
--
ALTER TABLE `olmsapp_customuser_user_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `olmsapp_customuser_user__customuser_id_permission_5258348d_uniq` (`customuser_id`,`permission_id`),
  ADD KEY `olmsapp_customuser_u_permission_id_2a5fc894_fk_auth_perm` (`permission_id`);

--
-- Indexes for table `olmsapp_issuedbookdetails`
--
ALTER TABLE `olmsapp_issuedbookdetails`
  ADD PRIMARY KEY (`id`),
  ADD KEY `olmsapp_issuedbookdetails_book_id_id_756580fa_fk_olmsapp_book_id` (`book_id_id`),
  ADD KEY `olmsapp_issuedbookde_stud_id_id_ea19652e_fk_olmsapp_s` (`stud_id_id`);

--
-- Indexes for table `olmsapp_student`
--
ALTER TABLE `olmsapp_student`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `studentid` (`studentid`),
  ADD UNIQUE KEY `admin_id` (`admin_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `auth_group`
--
ALTER TABLE `auth_group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_permission`
--
ALTER TABLE `auth_permission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `django_content_type`
--
ALTER TABLE `django_content_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `django_migrations`
--
ALTER TABLE `django_migrations`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `olmsapp_author`
--
ALTER TABLE `olmsapp_author`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `olmsapp_book`
--
ALTER TABLE `olmsapp_book`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `olmsapp_category`
--
ALTER TABLE `olmsapp_category`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `olmsapp_customuser`
--
ALTER TABLE `olmsapp_customuser`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `olmsapp_customuser_groups`
--
ALTER TABLE `olmsapp_customuser_groups`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `olmsapp_customuser_user_permissions`
--
ALTER TABLE `olmsapp_customuser_user_permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `olmsapp_issuedbookdetails`
--
ALTER TABLE `olmsapp_issuedbookdetails`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `olmsapp_student`
--
ALTER TABLE `olmsapp_student`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`);

--
-- Constraints for table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`);

--
-- Constraints for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  ADD CONSTRAINT `django_admin_log_user_id_c564eba6_fk_olmsapp_customuser_id` FOREIGN KEY (`user_id`) REFERENCES `olmsapp_customuser` (`id`);

--
-- Constraints for table `olmsapp_book`
--
ALTER TABLE `olmsapp_book`
  ADD CONSTRAINT `olmsapp_book_authid_id_92576cf6_fk_olmsapp_author_id` FOREIGN KEY (`authid_id`) REFERENCES `olmsapp_author` (`id`),
  ADD CONSTRAINT `olmsapp_book_catid_id_7aa39b2d_fk_olmsapp_category_id` FOREIGN KEY (`catid_id`) REFERENCES `olmsapp_category` (`id`);

--
-- Constraints for table `olmsapp_customuser_groups`
--
ALTER TABLE `olmsapp_customuser_groups`
  ADD CONSTRAINT `olmsapp_customuser_g_customuser_id_1b1c25d9_fk_olmsapp_c` FOREIGN KEY (`customuser_id`) REFERENCES `olmsapp_customuser` (`id`),
  ADD CONSTRAINT `olmsapp_customuser_groups_group_id_cdb0df8b_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`);

--
-- Constraints for table `olmsapp_customuser_user_permissions`
--
ALTER TABLE `olmsapp_customuser_user_permissions`
  ADD CONSTRAINT `olmsapp_customuser_u_customuser_id_fefc1af7_fk_olmsapp_c` FOREIGN KEY (`customuser_id`) REFERENCES `olmsapp_customuser` (`id`),
  ADD CONSTRAINT `olmsapp_customuser_u_permission_id_2a5fc894_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`);

--
-- Constraints for table `olmsapp_issuedbookdetails`
--
ALTER TABLE `olmsapp_issuedbookdetails`
  ADD CONSTRAINT `olmsapp_issuedbookde_stud_id_id_ea19652e_fk_olmsapp_s` FOREIGN KEY (`stud_id_id`) REFERENCES `olmsapp_student` (`id`),
  ADD CONSTRAINT `olmsapp_issuedbookdetails_book_id_id_756580fa_fk_olmsapp_book_id` FOREIGN KEY (`book_id_id`) REFERENCES `olmsapp_book` (`id`);

--
-- Constraints for table `olmsapp_student`
--
ALTER TABLE `olmsapp_student`
  ADD CONSTRAINT `olmsapp_student_admin_id_2000799a_fk_olmsapp_customuser_id` FOREIGN KEY (`admin_id`) REFERENCES `olmsapp_customuser` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
