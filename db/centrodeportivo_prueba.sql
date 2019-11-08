-- MySQL dump 10.13  Distrib 8.0.16, for Win64 (x86_64)
--
-- Host: localhost    Database: centrodeportivo_prueba
-- ------------------------------------------------------
-- Server version	8.0.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8mb4 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `articulo`
--

DROP TABLE IF EXISTS `articulo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `articulo` (
  `cod` int(10) NOT NULL,
  `id_cancha` int(3) NOT NULL,
  `deporte_cancha` varchar(12) NOT NULL,
  `nombre_art` varchar(30) NOT NULL,
  `valor` int(9) NOT NULL,
  `precio_costo` int(11) NOT NULL,
  `estado` varchar(11) DEFAULT 'BUEN ESTADO',
  PRIMARY KEY (`cod`,`id_cancha`),
  KEY `FK_ArticuloCancha` (`id_cancha`),
  CONSTRAINT `FK_ArticuloCancha` FOREIGN KEY (`id_cancha`) REFERENCES `cancha` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articulo`
--

LOCK TABLES `articulo` WRITE;
/*!40000 ALTER TABLE `articulo` DISABLE KEYS */;
INSERT INTO `articulo` VALUES (1,101,'fyuu','aa',1,1,'MAL ESTADO'),(5461234,101,'Fútbol','Balón',2000,25000,'BUEN ESTADO'),(5461234,102,'Fútbol','Balón',2000,25000,'BUEN ESTADO'),(5461235,101,'Fútbol','Set de petos',3500,17000,'BUEN ESTADO'),(5461235,102,'Fútbol','Set de petos',3500,17000,'BUEN ESTADO'),(5461238,201,'BasketBall','Balón',2000,25000,'BUEN ESTADO');
/*!40000 ALTER TABLE `articulo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cancha`
--

DROP TABLE IF EXISTS `cancha`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `cancha` (
  `id` int(11) NOT NULL,
  `deporte` varchar(12) NOT NULL,
  `precio_Base` int(5) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cancha`
--

LOCK TABLES `cancha` WRITE;
/*!40000 ALTER TABLE `cancha` DISABLE KEYS */;
INSERT INTO `cancha` VALUES (101,'Fútbol',20000),(102,'Fútbol',20000),(103,'Fútbol',20000),(201,'BasketBall',16000),(202,'BasketBall',16000),(301,'Tenis',22000),(302,'Tenis',22000),(303,'Tenis',22000);
/*!40000 ALTER TABLE `cancha` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipo`
--

DROP TABLE IF EXISTS `equipo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `equipo` (
  `nombre` varchar(20) NOT NULL DEFAULT 'No Name',
  `nombre_representante` varchar(15) NOT NULL,
  `correo_representante` varchar(40) NOT NULL,
  `telefono` int(11) DEFAULT NULL,
  `num_reserva` int(8) NOT NULL,
  PRIMARY KEY (`num_reserva`,`nombre`,`nombre_representante`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipo`
--

LOCK TABLES `equipo` WRITE;
/*!40000 ALTER TABLE `equipo` DISABLE KEYS */;
INSERT INTO `equipo` VALUES ('Equipo A','Alexis Sánchez','alexissanchez@gmail.com',NULL,1),('Equipo B','Lionel Messi','liopechofriomessi@gmail.com',NULL,1),('Equipo A','Alexis Sánchez','alexissanchez@gmail.com',NULL,2),('Equipo B','Lionel Messi','liopechofriomessi@gmail.com',NULL,2);
/*!40000 ALTER TABLE `equipo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `horarios`
--

DROP TABLE IF EXISTS `horarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `horarios` (
  `id_horario` int(2) NOT NULL AUTO_INCREMENT,
  `hora_inicio` time NOT NULL,
  `hora_termino` time NOT NULL,
  PRIMARY KEY (`id_horario`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `horarios`
--

LOCK TABLES `horarios` WRITE;
/*!40000 ALTER TABLE `horarios` DISABLE KEYS */;
INSERT INTO `horarios` VALUES (1,'10:00:00','11:00:00'),(2,'11:00:00','12:00:00'),(3,'12:00:00','13:00:00'),(4,'13:00:00','14:00:00'),(5,'14:00:00','15:00:00'),(6,'15:00:00','16:00:00'),(7,'16:00:00','17:00:00'),(8,'17:00:00','18:00:00'),(9,'18:00:00','19:00:00'),(10,'19:00:00','20:00:00'),(11,'20:00:00','21:00:00'),(12,'21:00:00','22:00:00'),(13,'22:00:00','23:00:00');
/*!40000 ALTER TABLE `horarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `referee`
--

DROP TABLE IF EXISTS `referee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `referee` (
  `nombre` varchar(40) NOT NULL,
  `nro_contacto` int(11) NOT NULL,
  `correo` varchar(40) NOT NULL,
  `rut` int(8) NOT NULL,
  `deporte` varchar(12) NOT NULL,
  `id_arbitro` int(2) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id_arbitro`,`rut`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `referee`
--

LOCK TABLES `referee` WRITE;
/*!40000 ALTER TABLE `referee` DISABLE KEYS */;
INSERT INTO `referee` VALUES ('Julio Bascuñán',965487321,'julito_bkn@gmail.com',20316548,'Fútbol',1),('Eduardo Gamboa',984516237,'lalito@live.cl',17645826,'Fútbol',2),('Piero Maza',965487321,'elpiero@hotmail.com',16871342,'Tenis',3);
/*!40000 ALTER TABLE `referee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registro`
--

DROP TABLE IF EXISTS `registro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `registro` (
  `num_reserva` int(8) NOT NULL,
  `fecha` date NOT NULL,
  `id_horario` int(11) NOT NULL,
  `id_cancha` int(11) NOT NULL,
  `disponibilidad` varchar(12) NOT NULL DEFAULT 'RESERVADO',
  PRIMARY KEY (`num_reserva`,`fecha`,`id_horario`,`id_cancha`),
  KEY `registro_FK` (`fecha`,`id_horario`,`id_cancha`),
  CONSTRAINT `registro_FK` FOREIGN KEY (`fecha`, `id_horario`, `id_cancha`) REFERENCES `reserva` (`fecha`, `id_horario`, `id_cancha`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registro`
--

LOCK TABLES `registro` WRITE;
/*!40000 ALTER TABLE `registro` DISABLE KEYS */;
/*!40000 ALTER TABLE `registro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reserva`
--

DROP TABLE IF EXISTS `reserva`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `reserva` (
  `num_reserva` int(8) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `fecha` date NOT NULL,
  `valor_arriendo` int(6) NOT NULL,
  `rut_cliente` int(8) NOT NULL,
  `id_cancha` int(11) NOT NULL,
  `deporte_cancha` varchar(12) NOT NULL,
  `id_horario` int(11) NOT NULL,
  PRIMARY KEY (`num_reserva`,`fecha`,`id_cancha`,`id_horario`),
  KEY `id_cancha` (`id_cancha`),
  KEY `idx_registro` (`fecha`,`id_horario`,`id_cancha`),
  CONSTRAINT `reserva_ibfk_1` FOREIGN KEY (`id_cancha`) REFERENCES `cancha` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reserva`
--

LOCK TABLES `reserva` WRITE;
/*!40000 ALTER TABLE `reserva` DISABLE KEYS */;
INSERT INTO `reserva` VALUES (00000001,'2019-09-05',22000,11111111,102,'Fútbol',4),(00000002,'2019-09-05',22000,11111111,101,'Fútbol',4),(00000003,'2019-09-05',22000,11111111,202,'BasketBall',6),(00000004,'2019-09-05',22000,11111111,202,'BasketBall',6),(00000005,'2019-09-08',18000,11111111,303,'Tenis',12);
/*!40000 ALTER TABLE `reserva` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('6DNKPD288k47eMORZODGlzlMafcpocr0',1569524182,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":1},\"data\":{\"fecha\":\"2019-09-28\",\"deporte\":\"basketBall\"}}'),('In5SbiQLXieafp05-6ASvHD2WvGUe6cD',1570574650,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),('XXnW4gKOwVtdKuDJDXS6vYYaekfTwxH8',1569470719,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":1},\"data\":{\"fecha\":\"2019-09-28\",\"deporte\":\"Fútbol\"}}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `rut` int(8) NOT NULL,
  `dV` varchar(1) NOT NULL,
  `nombre` varchar(40) NOT NULL,
  `correo` varchar(30) NOT NULL,
  `tipo_cuenta` varchar(7) DEFAULT 'Cliente',
  `direccion` varchar(40) DEFAULT NULL,
  `telefono` int(11) NOT NULL,
  `password` varchar(60) NOT NULL,
  `nombre_usuario` varchar(16) NOT NULL,
  PRIMARY KEY (`id_usuario`,`rut`,`nombre_usuario`,`correo`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,11111111,'1','Admin','Admin@admin.com','Admin','Admin',11111111,'$2b$10$XSwHvzu/7fVV1KzASzOhAeuf5kk.qgW5/VLHt4WiS73A8nz.RKFzO','Admin'),(2,22222222,'2','Admin2','Admin2@admin2.com','Admin','Admin2',22222222,'$2b$10$1vrIfLH8pK6A95iabUZfv.O.AIpKgFfYnG7RvDB.m/6h2DwhX2HRy','Admin2'),(3,33333333,'3','Cliente','Cliente@cliente.com','Cliente','cliente',33333333,'$2b$10$87CR.dQ4ftgwum1sIT0hm.rDS9nY0zq2LKunA9d21Q.6dhKbVo6e2','Cliente'),(4,44444444,'4','Cliente2','Cliente2@cliente2.com','Cliente','cliente2',44444444,'$2b$10$pPj6Y3qJiaODi.LgPnrNTefXUgtcRFdunjryONwHtfyn8j5IkHQZi','Cliente2');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-11-07 23:02:01
