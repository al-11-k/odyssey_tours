-- phpMyAdmin SQL Dump
-- version 5.2.1-1.el7.remi
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 07, 2024 at 11:00 PM
-- Server version: 10.6.17-MariaDB-log
-- PHP Version: 8.2.17
-- Group 96: Brittany Healey and Ally Karlis

SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
--
DROP TABLE IF EXISTS `Travelers`;
DROP TABLE IF EXISTS `Travel_Agents`;
DROP TABLE IF EXISTS `Travel_Packages`;
DROP TABLE IF EXISTS `Item_Types`;
DROP TABLE IF EXISTS `Items`;
DROP TABLE IF EXISTS `Bookings`;
-- --------------------------------------------------------

--
-- Table structure for table `Travelers`
--

CREATE TABLE Travelers (
  traveler_id int(11) NOT NULL AUTO INCREMENT,
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  phone_number varchar(255) NOT NULL,
  PRIMARY KEY (traveler_id),
  UNIQUE KEY `name` (first_name, last_name)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Travelers`
--

INSERT INTO Travelers(first_name, last_name, email, phone_number) VALUES 
('Jane','Doe','janed@gmail.com','555-555-5555'),
('Joe','Brown','jbrown@gmail.com','505-525-2233'),
('Ally','Karlis','akarlis@gmail.com','364-574-0292'),
('Brittany','Healey','bhealey@gmail.com','364-373-2739');


-- --------------------------------------------------------

--
-- Table structure for table `Travel_Agents`
--

CREATE TABLE Travel_Agents (
    agent_id int(11) NOT NULL AUTO_INCREMENT,
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    PRIMARY KEY (agent_id),
    UNIQUE KEY `name` (first_name, last_name)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Travel_Agents`
--


INSERT INTO Travel_Agents (first_name, last_name, email) VALUES
('Chris', 'Spreadsheet', 'csheet@gmail.com'),
('Delores', 'Umbridge', 'dumbridge@gmail.com'),
('Satoru', 'Gojo', 'gojo@gmail.com'),
('Some', 'Guy', 'someg@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `Travel_Packages`
--

CREATE TABLE Travel_Packages (
  package_id int(11) NOT NULL AUTO_INCREMENT,
  date date NOT NULL,
  total_cost decimal(6,2) NOT NULL,
  description varchar(255),
  traveler_id int NOT NULL,
  agent_id int,
  PRIMARY KEY (package_id),
  FOREIGN KEY (traveler_id) REFERENCES Travelers(traveler_id) ON DELETE CASCADE,
  FOREIGN KEY (agent_id) REFERENCES Travel_Agents(agent_id) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Travel_Packages`
--

INSERT INTO Travel_Packages(date, total_cost, description, traveler_id, agent_id) VALUES
('2024-04-20', 464, 'NYC Day Tour', (SELECT traveler_id from Travelers where traveler_id = 28), (SELECT agent_id from Travel_Agents where agent_id = 5)),
('2024-04-10', 8280.58, 'France Tour Package', (SELECT traveler_id from Travelers where traveler_id = 29), (SELECT agent_id from Travel_Agents where agent_id = 6)),
('2024-04-01', 232, 'NYC Day Tour', (SELECT traveler_id from Travelers where traveler_id = 31), (SELECT agent_id from Travel_Agents where agent_id = 7)),
('2024-03-29', 280, 'Seattle Flight', (SELECT traveler_id from Travelers where traveler_id = 30), (SELECT agent_id from Travel_Agents where agent_id = 7));

-- --------------------------------------------------------

--
-- Table structure for table `Item_Types`
--

CREATE TABLE Item_Types (
  item_type int(11) NOT NULL AUTO_INCREMENT,
  description varchar(255) NOT NULL,
  PRIMARY KEY (item_type),
  UNIQUE KEY `item` (item_type)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Item_Types`
--

INSERT INTO Item_Types (description) VALUES
('Guided Activity'),
('Hotel Reservation'),
('Flight');

-- --------------------------------------------------------

--
-- Table structure for table `Items`
--


CREATE TABLE Items (
  item_id int(11) NOT NULL AUTO_INCREMENT,
  description varchar(255) NOT NULL,
  cost decimal(6,2) NOT NULL,
  item_type int NOT NULL,
  PRIMARY KEY (item_id),
  FOREIGN KEY (item_type) REFERENCES Item_Types(item_type) ON DELETE CASCADE,
  UNIQUE KEY `item_id` (item_id)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Items`
--

INSERT INTO Items (description, cost, item_type) VALUES
('NYC Walking Tour', 232, (SELECT item_type from Item_Types where item_type = 1)),
('Paris Hotel Reservation', 2340.29, (SELECT item_type from Item_Types where item_type = 2)),
('Round-Trip Flight from GEG to CDG', 1800, (SELECT item_type from Item_Types where item_type = 3)),
('Round-Trip Flight from GEG to SEA', 300, (SELECT item_type from Item_Types where item_type = 3));

-- --------------------------------------------------------

--
-- Table structure for table `Bookings`
--

CREATE TABLE Bookings (
  booking_id int(11) NOT NULL AUTO_INCREMENT,
  quantity int NOT NULL,
  item_cost decimal(6,2) NOT NULL,
  subtotal decimal(6,2) NOT NULL,
  package_id int NOT NULL,
  item_id int NOT NULL,
  PRIMARY KEY (booking_id),
  FOREIGN KEY (package_id) REFERENCES Travel_Packages(package_id) ON DELETE CASCADE,
  FOREIGN KEY (item_id) REFERENCES Items(item_id) ON DELETE CASCADE,
  UNIQUE KEY `booking` (booking_id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


--
-- Dumping data for table `Bookings`
--

INSERT INTO Bookings(quantity, item_cost, subtotal, package_id, item_id) VALUES 
(2, 232, 464, (SELECT package_id from Travel_Packages where package_id = 14), (SELECT item_id from Items where item_id = 10)),
(2, 2340.29, 4680.58, (SELECT package_id from Travel_Packages where package_id = 15), (SELECT item_id from Items where item_id = 12)),
(2, 1800, 3600, (SELECT package_id from Travel_Packages where package_id = 16), (SELECT item_id from Items where item_id = 13)),
(1, 232, 232, (SELECT package_id from Travel_Packages where package_id = 17),  (SELECT item_id from Items where item_id = 11)),
(1, 280, 280, (SELECT package_id from Travel_Packages where package_id = 17), (SELECT item_id from Items where item_id = 10));

-- --------------------------------------------------------


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

SET FOREIGN_KEY_CHECKS=1;
