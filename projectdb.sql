/*
SQLyog Professional v13.1.1 (64 bit)
MySQL - 5.5.41 : Database - food_point
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`food_point` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `food_point`;

/*Table structure for table `category` */

DROP TABLE IF EXISTS `category`;

CREATE TABLE `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(50) NOT NULL,
  `category_desc` varchar(100) NOT NULL,
  `category_order` int(11) NOT NULL,
  `dateon` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;

/*Table structure for table `orders` */

DROP TABLE IF EXISTS `orders`;

CREATE TABLE `orders` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `orderno` int(20) DEFAULT NULL,
  `ordertotal` float DEFAULT NULL,
  `tax` float DEFAULT NULL,
  `userid` int(20) DEFAULT NULL,
  `orderstatus` varchar(50) DEFAULT NULL,
  `paymentstatus` varchar(50) DEFAULT NULL,
  `paymentmode` varchar(50) DEFAULT NULL,
  `dateon` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userid` (`userid`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `product` */

DROP TABLE IF EXISTS `product`;

CREATE TABLE `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `catid` int(11) DEFAULT NULL,
  `subcatid` int(11) DEFAULT NULL,
  `retailerid` int(11) DEFAULT NULL,
  `product_name` varchar(50) NOT NULL,
  `product_price` int(11) NOT NULL DEFAULT '0',
  `product_desc` varchar(100) NOT NULL,
  `img1` varchar(5000) DEFAULT NULL,
  `img2` varchar(5000) DEFAULT NULL,
  `dateon` date DEFAULT NULL,
  `transaction_type` enum('buy','rent','sell','buy,rent','buy,sell','rent,sell','buy,rent,sell') DEFAULT NULL,
  `rentprice` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_product_subcat` (`subcatid`),
  KEY `fk_product_cat` (`catid`),
  KEY `fk_product_retailer` (`retailerid`),
  CONSTRAINT `fk_product_cat` FOREIGN KEY (`catid`) REFERENCES `category` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_product_retailer` FOREIGN KEY (`retailerid`) REFERENCES `retailer` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_product_subcat` FOREIGN KEY (`subcatid`) REFERENCES `subcat` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

/*Table structure for table `retailer` */

DROP TABLE IF EXISTS `retailer`;

CREATE TABLE `retailer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `shop_name` varchar(50) NOT NULL,
  `shop_address` varchar(100) NOT NULL,
  `gst_no` varchar(10) NOT NULL,
  `owner_name` varchar(50) NOT NULL,
  `gmail` varchar(100) NOT NULL,
  `pass` varchar(20) DEFAULT NULL,
  `img` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_gmail` (`gmail`),
  UNIQUE KEY `unique_email` (`gmail`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

/*Table structure for table `subcat` */

DROP TABLE IF EXISTS `subcat`;

CREATE TABLE `subcat` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `catid` int(11) DEFAULT NULL,
  `subcat_name` varchar(50) NOT NULL,
  `subcat_desc` varchar(100) NOT NULL,
  `subcat_order` int(11) NOT NULL,
  `dateon` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `catid` (`catid`),
  CONSTRAINT `fk_cat` FOREIGN KEY (`catid`) REFERENCES `category` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

/*Table structure for table `tblorderitem` */

DROP TABLE IF EXISTS `tblorderitem`;

CREATE TABLE `tblorderitem` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rate` float DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `total` float DEFAULT NULL,
  `pid` int(11) DEFAULT NULL,
  `orderid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `pid` (`pid`),
  KEY `orderid` (`orderid`),
  CONSTRAINT `tblorderitem_ibfk_1` FOREIGN KEY (`pid`) REFERENCES `product` (`id`),
  CONSTRAINT `tblorderitem_ibfk_2` FOREIGN KEY (`orderid`) REFERENCES `tblorders` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `tblorders` */

DROP TABLE IF EXISTS `tblorders`;

CREATE TABLE `tblorders` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `orderno` int(20) DEFAULT NULL,
  `ordertotal` float DEFAULT NULL,
  `tax` float DEFAULT NULL,
  `userid` int(20) DEFAULT NULL,
  `orderstatus` varchar(50) DEFAULT NULL,
  `paymentstatus` varchar(50) DEFAULT NULL,
  `paymentmode` varchar(50) DEFAULT NULL,
  `dateon` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userid` (`userid`),
  CONSTRAINT `tblorders_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `tblshopingcart` */

DROP TABLE IF EXISTS `tblshopingcart`;

CREATE TABLE `tblshopingcart` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pid` int(11) DEFAULT NULL,
  `rate` double DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `total` double DEFAULT NULL,
  `sessionid` varchar(100) DEFAULT NULL,
  `dateon` date DEFAULT NULL,
  `img` varchar(1000) DEFAULT NULL,
  `product_name` varchar(50) DEFAULT NULL,
  `gmail` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `pid` (`pid`),
  CONSTRAINT `shopingcart_ibfk_1` FOREIGN KEY (`pid`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=95 DEFAULT CHARSET=latin1;

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `gmail` varchar(100) DEFAULT NULL,
  `pass` varchar(20) NOT NULL,
  `phone_no` varchar(13) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_gmail` (`gmail`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
