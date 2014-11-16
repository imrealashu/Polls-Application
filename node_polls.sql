-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Nov 16, 2014 at 11:50 PM
-- Server version: 5.5.38-0ubuntu0.14.04.1
-- PHP Version: 5.5.9-1ubuntu4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `node_polls`
--

-- --------------------------------------------------------

--
-- Table structure for table `answer`
--

CREATE TABLE IF NOT EXISTS `answer` (
  `aid` int(11) NOT NULL AUTO_INCREMENT,
  `qid` int(11) NOT NULL,
  `answer` varchar(128) NOT NULL,
  `count` int(11) NOT NULL,
  PRIMARY KEY (`aid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10 ;

--
-- Dumping data for table `answer`
--

INSERT INTO `answer` (`aid`, `qid`, `answer`, `count`) VALUES
(1, 1, 'Awesome', 38),
(2, 1, 'Good', 0),
(3, 1, 'Average', 0),
(4, 1, 'Below Average', 0),
(5, 2, 'Gay', 1),
(6, 2, 'Bisexual', 12),
(7, 2, 'Lesbian', 6),
(8, 3, 'Option one', 1),
(9, 3, 'Option Two', 1);

-- --------------------------------------------------------

--
-- Table structure for table `question`
--

CREATE TABLE IF NOT EXISTS `question` (
  `qid` int(11) NOT NULL AUTO_INCREMENT,
  `question` varchar(128) NOT NULL,
  `date` datetime NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`qid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `question`
--

INSERT INTO `question` (`qid`, `question`, `date`, `description`) VALUES
(1, 'Tell something about Clash of Clan', '2014-11-16 15:18:53', 'Android Game'),
(2, 'is Vineet is Gay or Bisexual ?', '2014-11-16 16:20:44', ':D '),
(3, 'new question', '2014-11-16 16:47:04', 'lorem ipsium potem');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
