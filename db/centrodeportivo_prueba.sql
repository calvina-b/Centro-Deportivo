-- MySQL dump 10.13  Distrib 8.0.16, for Win64 (x86_64)
--
-- Host: localhost    Database: centrodeportivov2
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
  `id_cancha` int(11) NOT NULL,
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
INSERT INTO `articulo` VALUES (5461234,101,'Fútbol','Balón',2000,25000,'BUEN ESTADO'),(5461234,102,'Fútbol','Balón',2000,25000,'BUEN ESTADO'),(5461234,103,'Fútbol','Balón',2000,25000,'BUEN ESTADO'),(5461235,101,'Fútbol','Set de petos',3500,17000,'BUEN ESTADO'),(5461235,102,'Fútbol','Set de petos',3500,17000,'BUEN ESTADO'),(5461235,103,'Fútbol','Set de petos',3500,17000,'BUEN ESTADO'),(5461236,301,'Tenis','Set de pelotas',2000,14000,'BUEN ESTADO'),(5461236,302,'Tenis','Set de pelotas',2000,14000,'BUEN ESTADO'),(5461236,303,'Tenis','Set de pelotas',2000,14000,'BUEN ESTADO'),(5461237,301,'Tenis','Raquetas',3000,30000,'BUEN ESTADO'),(5461237,302,'Tenis','Raquetas',3000,30000,'BUEN ESTADO'),(5461237,303,'Tenis','Raquetas',3000,30000,'BUEN ESTADO'),(5461238,201,'BasketBall','Balón',2000,25000,'BUEN ESTADO'),(5461238,202,'BasketBall','Balón',2000,25000,'BUEN ESTADO');
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
  `num_reserva` int(8) unsigned zerofill NOT NULL,
  PRIMARY KEY (`num_reserva`,`nombre`,`nombre_representante`),
  CONSTRAINT `equipo_reserva` FOREIGN KEY (`num_reserva`) REFERENCES `reserva` (`num_reserva`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipo`
--

LOCK TABLES `equipo` WRITE;
/*!40000 ALTER TABLE `equipo` DISABLE KEYS */;
INSERT INTO `equipo` VALUES ('Equipo A','Alexis Sánchez','alexissanchez@gmail.com',NULL,00000009),('Equipo B','Lionel Messi','liopechofriomessi@gmail.com',NULL,00000009),('Equipo A','Seth Curry','sethc@gmail.com',NULL,00000010),('Equipo B','LeBron James','LBJames@gmail.com',NULL,00000010),('AAA','aaaaa','a@a.com',11111111,00000015),('BBBB','BBBB','b@b.com',22222222,00000015),('AA','AA','a@a.com',11111111,00000016),('BB','BB','b@b.com',22222222,00000016),('AA','AA','a@a.com',11111111,00000017),('BB','BB','b@b.com',22222222,00000017),('a','aaa','a@a.com',11111111,00000018),('vv','vv','v@v.com',23333333,00000018),('as','asd','as@as.com',12353534,00000019),('asdf','asddas','asdf@asdf.com',33333333,00000019),('asdas','qwe','kks@asdk.cl',12312333,00000020),('sadasd','asdad','asd@asda.com',23213322,00000020),('aaa','asd','a@a.com',12354353,00000021),('asdasdad','asd','as@asdsa.com',34444444,00000021),('asdas','asdasd','ada@asdas.com',11111111,00000023),('asdsda','asdad','asdsad@asdd.com',22222222,00000023),('asdasd','adasds','aaa@asda.com',11111111,00000026),('asdasd','sdasd','asdasd@cas.com',24444444,00000026),('aaa','asd','a@a.coma',33333333,00000027),('b','asd','b@b.com',55555555,00000027),('aaa','hoal','a@a.com',55555555,00000028),('as','asdsada','m@m.com',77777777,00000028),('aaa','asda','asdasd@asd.com',66666666,00000029),('asdad','dsds','aassa@aaa.com',66666666,00000029);
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
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
INSERT INTO `referee` VALUES ('Julio Bascuñán',965487321,'julito_bkn@gmail.com',20316548,'Fútbol',1),('Eduardo Gamboa',984516237,'lalito@live.cl',17645826,'BasketBall',2),('Piero Maza',965487321,'elpiero@hotmail.com',16871342,'Tenis',3);
/*!40000 ALTER TABLE `referee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registro`
--

DROP TABLE IF EXISTS `registro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `registro` (
  `num_reserva` int(8) unsigned zerofill NOT NULL,
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
INSERT INTO `registro` VALUES (00000010,'2019-09-08',12,303,'RESERVADO'),(00000013,'2019-09-05',4,102,'RESERVADO'),(00000014,'2019-09-05',4,101,'RESERVADO'),(00000015,'2020-01-01',13,101,'RESERVADO'),(00000016,'2019-12-31',13,103,'RESERVADO'),(00000017,'2019-12-31',13,102,'RESERVADO'),(00000018,'2019-12-31',8,101,'RESERVADO'),(00000019,'2019-12-31',8,102,'RESERVADO'),(00000020,'2019-12-31',8,301,'RESERVADO'),(00000021,'2019-12-31',9,201,'RESERVADO'),(00000023,'2020-01-26',1,202,'RESERVADO'),(00000026,'2020-01-05',13,101,'RESERVADO'),(00000027,'2020-01-26',13,102,'RESERVADO'),(00000028,'2020-01-28',1,101,'RESERVADO'),(00000029,'2020-01-28',1,102,'RESERVADO');
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
  `id_cancha` int(11) NOT NULL,
  `deporte_cancha` varchar(12) NOT NULL,
  `id_horario` int(11) NOT NULL,
  `rut_cliente` int(8) NOT NULL,
  `reserved_referee` int(2) DEFAULT NULL,
  `reserved_item1` int(10) DEFAULT NULL,
  `reserved_item2` int(10) DEFAULT NULL,
  PRIMARY KEY (`num_reserva`,`fecha`,`id_cancha`,`id_horario`),
  KEY `id_cancha` (`id_cancha`),
  KEY `idx_registro` (`fecha`,`id_horario`,`id_cancha`),
  KEY `user_reserva` (`rut_cliente`),
  KEY `arbitraje` (`reserved_referee`),
  KEY `horario_reserva` (`id_horario`),
  KEY `reserved_item1` (`reserved_item1`),
  KEY `reserved_item2` (`reserved_item2`),
  CONSTRAINT `arbitraje` FOREIGN KEY (`reserved_referee`) REFERENCES `referee` (`id_arbitro`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `horario_reserva` FOREIGN KEY (`id_horario`) REFERENCES `horarios` (`id_horario`),
  CONSTRAINT `reserva_ibfk_1` FOREIGN KEY (`id_cancha`) REFERENCES `cancha` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reserva_ibfk_2` FOREIGN KEY (`reserved_item1`) REFERENCES `articulo` (`cod`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reserva_ibfk_3` FOREIGN KEY (`reserved_item2`) REFERENCES `articulo` (`cod`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_reserva` FOREIGN KEY (`rut_cliente`) REFERENCES `usuario` (`rut`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reserva`
--

LOCK TABLES `reserva` WRITE;
/*!40000 ALTER TABLE `reserva` DISABLE KEYS */;
INSERT INTO `reserva` VALUES (00000009,'2019-09-05',22000,202,'BasketBall',6,15208339,NULL,NULL,NULL),(00000010,'2019-09-08',18000,303,'Tenis',12,15208339,NULL,NULL,NULL),(00000013,'2019-09-05',22000,102,'Fútbol',4,19490050,NULL,NULL,NULL),(00000014,'2019-09-05',22000,101,'Fútbol',4,19490050,1,NULL,NULL),(00000015,'2020-01-01',23000,101,'Fútbol',13,11111111,1,NULL,NULL),(00000016,'2019-12-31',36500,103,'Fútbol',13,11111111,1,5461234,5461235),(00000017,'2019-12-31',28500,102,'Fútbol',13,11111111,NULL,5461234,5461235),(00000018,'2019-12-31',23000,101,'Fútbol',8,11111111,NULL,NULL,NULL),(00000019,'2019-12-31',36500,102,'Fútbol',8,11111111,1,5461234,5461235),(00000020,'2019-12-31',39100,301,'Tenis',8,11111111,3,5461236,5461237),(00000021,'2019-12-31',26800,201,'BasketBall',9,11111111,2,5461238,NULL),(00000023,'2020-01-26',27600,202,'BasketBall',1,11111111,2,5461238,NULL),(00000026,'2020-01-05',23000,101,'Fútbol',13,11111111,NULL,NULL,NULL),(00000027,'2020-01-26',27000,102,'Fútbol',13,11111111,NULL,NULL,NULL),(00000028,'2020-01-28',33500,101,'Fútbol',1,11111111,1,5461234,5461235),(00000029,'2020-01-28',20000,102,'Fútbol',1,11111111,NULL,NULL,NULL);
/*!40000 ALTER TABLE `reserva` ENABLE KEYS */;
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
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `correo` (`rut`,`correo`,`nombre_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,11111111,'1','Admin','Admin@admin.com','Admin','Admin',11111111,'$2b$10$Cb0.vv3.ZdgTvzuibenLv.MBPlI8M28xF1ZbHMS3mezto6u8GGW/q','Admin'),(2,22222222,'1','Prueba','prueba@p.com','Cliente','asasas',77777777,'$2b$10$trHZ1VEjdnkUMTVUGwyRpedgQmAb0UTMBF9.foybpxvv/hBHBfFiG','Prueba');
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

-- Dump completed on 2020-01-06  2:26:06
