CREATE DATABASE IF NOT EXIST control_asistencia;

USE control_asistencia;

CREATE TABLE `trabajador_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `usuario` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `fecha_contratacion` varchar(45) DEFAULT NULL,
  `id_cargo` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `usuario_UNIQUE` (`usuario`),
  KEY `fk_trabajador_details_cargo` (`id_cargo`),
  CONSTRAINT `fk_trabajador_details_cargo` FOREIGN KEY (`id_cargo`) REFERENCES `cargo` (`ID_cargo`)
) ENGINE=InnoDB AUTO_INCREMENT=272 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `cargo` (
  `ID_cargo` int NOT NULL AUTO_INCREMENT,
  `Nombre_cargo` varchar(100) NOT NULL,
  `Descripcion` varchar(255) DEFAULT NULL,
  `Salario_base` decimal(10,2) NOT NULL,
  PRIMARY KEY (`ID_cargo`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `asistencia_daily` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario` varchar(45) NOT NULL,
  `date` date DEFAULT NULL,
  `hours_start` time DEFAULT NULL,
  `hours_end` time DEFAULT NULL,
  `time_worked` decimal(5,2) DEFAULT NULL,
  `overtime` int DEFAULT NULL,
  `aisistencia` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_asistencia_daily_usuario` (`usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=95 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

INSERT INTO trabajador_details (name, usuario, password, fecha_contratacion, id_cargo)
VALUES
('ADMINISTRADOR SISTEMAS', 'admin', 'admin2024', '2023-01-12', 2),
('PEDRO SANTANA', 'psantana', '18628277', '2023-03-05', 1),
('MANUEL PEREZ', 'mperez', '26037474', '2023-04-16', 3),
('SIONY CRESPO', 'screspo', '12751932', '2023-02-24', 5),
('FRANKLIN HERRERA', 'fherrera', '17031304', '2023-05-03', 1),
('CARLOS GARCIA', 'cgarcia', '24643512', '2023-06-19', 2),
('AUGUSTO ARNAUS', 'aarnaus', '23797881', '2023-07-22', 1),
('KEVIN BRACHO', 'kbracho', '22730986', '2023-08-08', 3),
('ANDERSON LOHE', 'alohe', '23409450', '2023-09-17', 5),
('LIZARDO RODRIGUEZ', 'lrodriguez', '27230445', '2023-10-26', 2),
('MARYA CASADIEGO', 'mcasadiego', '30229450', '2023-11-04', 1),
('FELIX MACHADO', 'fmachado', '17889114', '2023-12-13', 3),
('ALEJANDRO PINTO', 'apinto', '27725691', '2023-01-08', 2),
('GABRIEL GUTIERREZ', 'ggutierrez', '26900103', '2023-02-11', 1),
('DIEGO PECORARO', 'dpecoraro', '28098092', '2023-03-14', 5),
('SANTIAGO HERNANDEZ', 'shernandez', '31192538', '2023-04-17', 3),
('ROBERT VALBUENA', 'rvalbuena', '18360334', '2023-05-20', 2),
('ENDER PERDOMO', 'eperdomo', '29635004', '2023-06-23', 1),
('ABRAHAM FRAY', 'afray', '28295482', '2023-07-26', 5),
('DORIANNY GUEDEZ', 'dguedez', '27432006', '2023-08-29', 3),
('PAMELA MARQUEZ', 'pmarquez', '26337948', '2023-09-01', 2),
('ESMERALDA CASTILLO', 'ecastillo', '27550832', '2023-10-04', 1),
('ANNER RUBIO', 'arubio', '26186726', '2023-11-07', 5),
('KENNEDY SAEZ', 'ksaez', '24424460', '2023-12-10', 3),
('VICTOR PEREZ', 'vperez', '12597291', '2023-01-13', 2),
('CARLOS SALAMANCA', 'csalamanca', '19919331', '2023-02-16', 1),
('JACINTO ROJAS', 'jrojas', '11357886', '2023-03-19', 3),
('ORLANDO RODRIGUEZ', 'orodriguez', '18346065', '2023-04-22', 5),
('ROBERTO QUIÑONES', 'rquinones', '9828518', '2023-05-25', 2),
('LILIBETH SOTO', 'lsoto', '15190159', '2023-06-27', 1),
('MARISOL OLIVET', 'molivet', '12930447', '2023-07-30', 3),
('FREDDY BECERRA', 'fbecerra', '18182950', '2023-08-02', 5),
('JAVIER CHARARA', 'jcharara', '29831353', '2023-09-05', 2),
('ARMANDO MARTINEZ', 'amartinez', '23426528', '2023-10-08', 1),
('EILYN REYES', 'ereyes', '26364456', '2023-11-11', 3),
('ZOLYMAR FREITEZ', 'zfreitez', '15848613', '2023-12-14', 5),
('ALEXANDER LINARES', 'alinares', '27481489', '2023-01-17', 2),
('EVEREST GONZALEZ', 'egonzalez', '30281628', '2023-02-20', 1),
('JOSUE HERRERA', 'jherrera', '31151806', '2023-03-23', 3),
('LAURA PEREZ', 'lperez', '31854249', '2023-04-26', 5),
('VERONICA ROBLES', 'vrobles', '30823655', '2023-05-29', 2),
('DEIVIS PEREZ', 'dperez', '14393371', '2023-07-01', 1),
('JOHNY PAEZ', 'jpaez', '12315722', '2023-08-03', 3),
('LUCIANA LIMA', 'llima', '28331481', '2023-09-06', 5),
('MARIA HILEWSKY', 'mhilewsky', '29769075', '2023-10-09', 2),
('EDERLYN ESPINOZA', 'eespinoza', '31193093', '2023-11-12', 1),
('ROXANA GODOY', 'rgodoy', '22550469', '2023-12-15', 3),
('RAFAEL AGAR', 'ragar', '15859372', '2023-01-18', 5),
('AMANDA AGAR', 'aagar', '13323802', '2023-02-21', 2),
('CARLOS GUEVARA', 'cguevara', '24300672', '2023-03-26', 1);
