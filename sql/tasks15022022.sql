-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 15, 2022 at 07:23 AM
-- Server version: 8.0.20
-- PHP Version: 7.4.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `todo`
--

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `rid` int NOT NULL,
  `project` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `note` longtext CHARACTER SET utf8 COLLATE utf8_bin,
  `priority` int DEFAULT NULL,
  `done` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`rid`, `project`, `note`, `priority`, `done`) VALUES
(1, '!', 'Phone Lou', 1, 1),
(2, '!', 'Phone Ayhoob', 1, 1),
(3, '!', 'Phone David', 1, 1),
(4, '!', 'WhatsApp Nevill, very proud of his two years.', 1, 1),
(5, '!', 'WhatsApp Robbin.', 3, 1),
(6, 'set-apart', 'The student side needs to have a phone app flexible.', 3, 0),
(7, 'set-apart', 'One master, accessed by multiple educators Master some, some another master.', 5, 0),
(8, 'set-apart', 'Courses attending', 5, 0),
(9, 'set-apart', 'Document upload on attendanceRegister.html', 3, 1),
(10, 'Befonk', 'Befonk - kinnisgewing', 3, 1),
(11, 'set-apart', 'Add to the test types submit a document', 3, 1),
(12, 'set-apart', 'Finnish the submit a document on the student side. Then test, test and more test.', 3, 1),
(14, 'Befonk', 'Befonk - Google Play images', 3, 1),
(15, '!', 'Investigate applying for SASSA', 1, 1),
(16, '!', 'This: Valign the cells and maybe light up the bottom border. This action will put the editing display out by two columns. **!DONE!**', 3, 1);

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
  MODIFY `rid` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
