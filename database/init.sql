CREATE DATABASE booking_dev;

GRANT all privileges on *.* to 'nakkim'@'%' WITH GRANT option;

USE booking_dev;

CREATE TABLE `seller` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `name` varchar(50) NOT NULL,
  `auto_approve` int NOT NULL DEFAULT 5 COMMENT '자동승인횟수',
	`off_date` json COMMENT '휴일(YYYY-MM-DD)',
	`off_day` json COMMENT '휴일(요일)',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` timestamp,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `booking` (
	`id` varchar(36) NOT NULL DEFAULT (UUID()),
	`seller_id` int NOT NULL,
	`status` varchar(50) NOT NULL COMMENT '예약상태',
	`email` varchar(255) NOT NULL,
	`name` varchar(50) NOT NULL,
	`date` date NOT NULL COMMENT '예약일',
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`deleted_at` timestamp,
	PRIMARY KEY (`id`),
	FOREIGN KEY (`seller_id`) REFERENCES `seller` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;