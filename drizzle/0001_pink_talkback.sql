CREATE TABLE `facts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`videoId` varchar(64) NOT NULL,
	`videoTitle` text NOT NULL,
	`videoUrl` varchar(512) NOT NULL,
	`fact` text NOT NULL,
	`displayOrder` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `facts_id` PRIMARY KEY(`id`),
	CONSTRAINT `facts_videoId_unique` UNIQUE(`videoId`)
);
