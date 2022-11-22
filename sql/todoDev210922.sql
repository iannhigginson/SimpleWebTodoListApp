-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 21, 2022 at 01:14 PM
-- Server version: 8.0.30
-- PHP Version: 7.4.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Database: `todo`
--

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `rid` int NOT NULL,
  `project` varchar(255) COLLATE utf8mb3_bin DEFAULT NULL,
  `note` longtext CHARACTER SET utf8mb3 COLLATE utf8mb3_bin,
  `priority` int DEFAULT NULL,
  `done` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`rid`, `project`, `note`, `priority`, `done`) VALUES
(6, 'set-apart', 'The student side needs to have a phone app flexible. This will take some time.', 5, 1),
(8, 'set-apart', 'Courses attending??? Not sure what she want\'s here.', 5, 1),
(15, '!', 'Investigate applying for SASSA. Waiting for a response from SAASA. [I think it\'s all done.]', 5, 1),
(19, '!', 'Take your muti!', 5, 1),
(20, '!', 'What was I thinking?', 5, 1),
(21, '!', 'Get the bank card fixed', 5, 1),
(22, '!', 'Duplicate the VM Accounting as VM Development', 5, 1),
(23, '!', 'Write to Ayoob about Durban Marina.', 1, 1),
(24, '!', 'Talk to Susanna about her offer', 1, 1),
(25, '!!', 'Hyper-V is very slow :-(', 1, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`rid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `rid` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
COMMIT;
