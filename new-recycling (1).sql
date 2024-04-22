-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 25, 2024 at 06:14 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `new-recycling`
--

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

CREATE TABLE `event` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `path_image` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `user_id` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `event`
--

INSERT INTO `event` (`id`, `title`, `description`, `path_image`, `created_at`, `user_id`) VALUES
(1, 'Test title', 'Test description', 'Test path_image', '2024-02-25 16:03:19', '57929c3d-2114-45c0-a4c2-53a17582df5b'),
(2, 'tes', 'tes', 'kiwikiw', '2024-02-25 17:00:39', '57929c3d-2114-45c0-a4c2-53a17582df5b');

-- --------------------------------------------------------

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

CREATE TABLE `blog` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `path_image` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `user_id` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blog`
--

INSERT INTO `blog` (`id`, `title`, `description`, `path_image`, `created_at`, `user_id`) VALUES
(1, 'Test title blog', 'Test description', 'https://static.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/radarmalang/2023/05/ONLINE-Sampah-Suharto-Copy.jpg', '2024-02-25 16:03:19', '57929c3d-2114-45c0-a4c2-53a17582df5b'),
(2, 'tes', 'tes', 'kiwikiw', '2024-02-25 17:00:39', '57929c3d-2114-45c0-a4c2-53a17582df5b');

-- --------------------------------------------------------

--
-- Table structure for table `exchangetransaction`
--

CREATE TABLE `exchangetransaction` (
  `id` int(11) NOT NULL,
  `items_id` int(11) DEFAULT NULL,
  `user_id` varchar(36) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `exchangetransaction`
--

INSERT INTO `exchangetransaction` (`id`, `items_id`, `user_id`, `created_at`) VALUES
(8, 1, '57929c3d-2114-45c0-a4c2-53a17582df5b', '2024-02-25 16:34:16');

-- --------------------------------------------------------

--
-- Table structure for table `item`
--

CREATE TABLE `item` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `points` varchar(255) DEFAULT NULL,
  `total` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `item`
--

INSERT INTO `item` (`id`, `name`, `points`, `total`, `created_at`) VALUES
(1, 'T-Shirt', '1500', 200, '2024-02-25 16:29:29'),
(2, 'Totebag', '12000', 20, '2024-02-25 16:30:03');

-- --------------------------------------------------------

--
-- Table structure for table `paymentmethod`
--

CREATE TABLE `paymentmethod` (
  `id` int(11) NOT NULL,
  `user_id` varchar(36) DEFAULT NULL,
  `method_type` enum('CREDIT_CARD','DEBIT_CARD','PAYPAL','QRIS','OTHER') DEFAULT NULL,
  `card_number` varchar(16) DEFAULT NULL,
  `expiration_date` date DEFAULT NULL,
  `cvv` varchar(4) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `paymentmethod`
--

INSERT INTO `paymentmethod` (`id`, `user_id`, `method_type`, `card_number`, `expiration_date`, `cvv`, `created_at`) VALUES
(1, '57929c3d-2114-45c0-a4c2-53a17582df5b', 'QRIS', '123', '2023-12-12', '123', '2024-02-25 16:32:15');

-- --------------------------------------------------------

--
-- Table structure for table `refreshtoken`
--

CREATE TABLE `refreshtoken` (
  `user_id` varchar(36) NOT NULL,
  `token` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `refreshtoken`
--

INSERT INTO `refreshtoken` (`user_id`, `token`, `created_at`) VALUES
('57929c3d-2114-45c0-a4c2-53a17582df5b', 'eb524b3a5fc054818f13eee06d4994a9', '2024-02-25 15:54:27'),
('dfdbb819-d428-43c4-967c-b2c2567b4836', '8c9111f70aed764c35c9b3cde7c77dfe', '2024-02-25 17:13:09');

-- --------------------------------------------------------

--
-- Table structure for table `report`
--

CREATE TABLE `report` (
  `id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `user_id` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `report`
--

INSERT INTO `report` (`id`, `email`, `subject`, `location`, `created_at`, `user_id`) VALUES
(1, 'hadeh@gmail.com', 'banyak sampah', 'malang', '2024-02-25 16:04:15', '57929c3d-2114-45c0-a4c2-53a17582df5b');

-- --------------------------------------------------------

--
-- Table structure for table `transactionpayment`
--

CREATE TABLE `transactionpayment` (
  `id` int(11) NOT NULL,
  `transaction_id` int(11) DEFAULT NULL,
  `payment_method_id` int(11) DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `status` enum('PENDING','COMPLETED','FAILED') DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transactionpayment`
--

INSERT INTO `transactionpayment` (`id`, `transaction_id`, `payment_method_id`, `amount`, `status`, `created_at`) VALUES
(1, 8, 1, 30.00, 'COMPLETED', '2024-02-25 16:34:40');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('ADMIN','USER','PENGEPUL') DEFAULT NULL,
  `points` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `password`, `role`, `points`, `created_at`, `updated_at`) VALUES
('57929c3d-2114-45c0-a4c2-53a17582df5b', 'testadmin', 'testadmin@gmail.com', '$2a$12$GWEb.QT0JuSp00R1CXv4OOc0U4jDE1lcprT57sZa6kPmMF8ZZVAia', 'ADMIN', 1500, '2024-02-25 15:39:05', '2024-02-25 15:39:05'),
('dfdbb819-d428-43c4-967c-b2c2567b4836', 'test', 'test@gmail.com', '$2a$12$.8su2a4UV4Xr0Ak2tfHtoOa0VY/Le2GwOWWhF.JZX1bgM8sZT8E1K', 'USER', 2000, '2024-02-25 16:42:14', '2024-02-25 16:42:14');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `exchangetransaction`
--
ALTER TABLE `exchangetransaction`
  ADD PRIMARY KEY (`id`),
  ADD KEY `items_id` (`items_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `item`
--
ALTER TABLE `item`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `paymentmethod`
--
ALTER TABLE `paymentmethod`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `refreshtoken`
--
ALTER TABLE `refreshtoken`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `token` (`token`);

--
-- Indexes for table `report`
--
ALTER TABLE `report`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `transactionpayment`
--
ALTER TABLE `transactionpayment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `transaction_id` (`transaction_id`),
  ADD KEY `payment_method_id` (`payment_method_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `event`
--
ALTER TABLE `event`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `blog`
--
ALTER TABLE `blog` CHANGE `id` `id` INT(11) NOT NULL AUTO_INCREMENT, add PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for table `exchangetransaction`
--
ALTER TABLE `exchangetransaction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `item`
--
ALTER TABLE `item`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `paymentmethod`
--
ALTER TABLE `paymentmethod`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `report`
--
ALTER TABLE `report`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `transactionpayment`
--
ALTER TABLE `transactionpayment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `event`
--
ALTER TABLE `event`
  ADD CONSTRAINT `event_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `exchangetransaction`
--
ALTER TABLE `exchangetransaction`
  ADD CONSTRAINT `exchangetransaction_ibfk_1` FOREIGN KEY (`items_id`) REFERENCES `item` (`id`),
  ADD CONSTRAINT `exchangetransaction_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `paymentmethod`
--
ALTER TABLE `paymentmethod`
  ADD CONSTRAINT `paymentmethod_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `refreshtoken`
--
ALTER TABLE `refreshtoken`
  ADD CONSTRAINT `refreshtoken_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `report`
--
ALTER TABLE `report`
  ADD CONSTRAINT `report_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `transactionpayment`
--
ALTER TABLE `transactionpayment`
  ADD CONSTRAINT `transactionpayment_ibfk_1` FOREIGN KEY (`transaction_id`) REFERENCES `exchangetransaction` (`id`),
  ADD CONSTRAINT `transactionpayment_ibfk_2` FOREIGN KEY (`payment_method_id`) REFERENCES `paymentmethod` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
