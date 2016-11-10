-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-11-2016 a las 04:30:28
-- Versión del servidor: 10.1.10-MariaDB
-- Versión de PHP: 5.6.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `abm`
--
CREATE DATABASE IF NOT EXISTS `abm` DEFAULT CHARACTER SET latin1 COLLATE latin1_general_ci;
USE `abm`;

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `BorrarPersona` (IN `idp` INT(18))  NO SQL
delete from persona	WHERE id=idp$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertarPersona` (IN `pnombre` VARCHAR(50), IN `papellido` VARCHAR(50), IN `pdni` VARCHAR(50), IN `pfoto` VARCHAR(50))  NO SQL
INSERT into persona (nombre,apellido,dni,foto)
values
(pnombre,papellido,pdni,pfoto)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ModificarPersona` (IN `pid` INT, IN `pnombre` VARCHAR(50), IN `papellido` VARCHAR(50), IN `pfoto` VARCHAR(50))  NO SQL
update persona 
				set nombre=pnombre,
				apellido=papellido,
				foto=pfoto
				WHERE id=pid$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `TraerTodasLasPersonas` ()  NO SQL
select * from persona$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `TraerUnaPersona` (IN `idp` INT(18))  NO SQL
select * from persona where id =idp$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `oferta`
--

CREATE TABLE `oferta` (
  `idOferta` int(11) NOT NULL,
  `descripcion` varchar(50) COLLATE latin1_general_ci NOT NULL,
  `precio` varchar(11) COLLATE latin1_general_ci NOT NULL,
  `foto` varchar(100) COLLATE latin1_general_ci NOT NULL,
  `idSucursal` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Volcado de datos para la tabla `oferta`
--

INSERT INTO `oferta` (`idOferta`, `descripcion`, `precio`, `foto`, `idSucursal`) VALUES
(1, 'Pizza noruega', '150', 'Pizza noruega.jpg', 1),
(2, 'Pizza mexicana', '120', 'Pizza mexicana.jpg', 1),
(3, 'PIzza atun', '180', 'PIzza atun.jpg', 2),
(4, 'Pizza anchoas', '175', 'Pizza anchoas.jpg', 2),
(5, 'Pizza champinon', '150', 'Pizza champinon.jpg', 3),
(6, 'Pizza jamon y morron', '125', 'Pizza jamon y morron.jpg', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido`
--

CREATE TABLE `pedido` (
  `idPedido` int(11) NOT NULL,
  `idProducto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `idSucursal` int(11) NOT NULL,
  `clienteNombre` varchar(50) COLLATE latin1_general_ci NOT NULL,
  `idPersona` int(11) NOT NULL,
  `total` int(11) NOT NULL,
  `idOferta` int(11) NOT NULL,
  `ofertaDescripcion` varchar(100) COLLATE latin1_general_ci NOT NULL,
  `productoDescripcion` varchar(100) COLLATE latin1_general_ci NOT NULL,
  `sucursalDireccion` varchar(100) COLLATE latin1_general_ci NOT NULL,
  `estado` varchar(20) COLLATE latin1_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Volcado de datos para la tabla `pedido`
--

INSERT INTO `pedido` (`idPedido`, `idProducto`, `cantidad`, `idSucursal`, `clienteNombre`, `idPersona`, `total`, `idOferta`, `ofertaDescripcion`, `productoDescripcion`, `sucursalDireccion`, `estado`) VALUES
(21, 31, 2, 1, 'Pepe', 0, 500, 0, '', 'Pizza atun', 'Av. Cordoba 5432', 'En proceso'),
(22, 0, 1, 2, 'Natalia', 0, 175, 4, 'Pizza anchoas', '', 'Av. Corrientes 6800', 'En proceso'),
(23, 28, 2, 1, 'Pepe', 0, 440, 0, '', 'Pizza anchoas', 'Av. Cordoba 5432', 'Cancelado'),
(26, 38, 2, 3, 'Sofia Lamas', 55, 300, 0, '', 'Pizza light', 'Costa Rica 5830', 'En proceso');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `persona`
--

CREATE TABLE `persona` (
  `idPersona` int(11) NOT NULL,
  `nombre` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `email` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `password` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `perfil` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  `foto` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `dni` varchar(10) COLLATE utf8_spanish2_ci NOT NULL,
  `idSucursal` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `persona`
--

INSERT INTO `persona` (`idPersona`, `nombre`, `email`, `password`, `perfil`, `foto`, `dni`, `idSucursal`) VALUES
(38, 'Pepe Gonzalez', 'administrador@administrador.com', '123456', 'administrador', '11111111.jpg', '11111111', 0),
(45, 'Marty McFly', 'encargado@encargado.com', '123456', 'encargado', '20202020.jpg', '20202020', 1),
(46, 'Santiago Villalba', 'santiago@santiago.com', '123456', 'encargado', '10101010.jpg', '10101010', 2),
(47, 'Natalia Lopez', 'lopez@lopez.com', '123456', 'encargado', '30303030.jpg', '30303030', 3),
(48, 'Sebastian Lopez', 'sebastian@sebastian.com', '123456', 'empleado', '40404040.jpg', '40404040', 1),
(49, 'Diego Gomez', 'diego@diego.com', '123456', 'empleado', '11223344.jpg', '11223344', 1),
(51, 'Nicolas Rodriguez', 'empleado@empleado.com', '123456', 'empleado', '31313131.jpg', '31313131', 2),
(52, 'Paula Vazquez', 'paula@paula.com', '123456', 'empleado', '23232323.jpg', '23232323', 2),
(53, 'Gabriel Lamas', 'gabriel@gabriel.com', '123456', 'empleado', '29292929.jpg', '29292929', 3),
(54, 'Angela Martinez', 'angela@angela.com', '123456', 'empleado', '32323232.jpg', '32323232', 3),
(55, 'Sofia Lamas', 'cliente@cliente.com', '123456', 'cliente', '25252525.jpg', '25252525', 1),
(56, 'Pepe Lopez', 'pepe@pepe.com', '123123', 'cliente', '12312312.jpg', '12312312', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `idProducto` int(11) NOT NULL,
  `descripcion` varchar(50) COLLATE latin1_general_ci DEFAULT NULL,
  `precio` int(10) NOT NULL,
  `foto` varchar(100) COLLATE latin1_general_ci NOT NULL,
  `idSucursal` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`idProducto`, `descripcion`, `precio`, `foto`, `idSucursal`) VALUES
(27, 'Pizza ahumada', 129, 'Pizza ahumada.jpg', 1),
(28, 'Pizza anchoas', 220, 'Pizza anchoas.jpg', 1),
(30, 'Pizza campesina', 180, 'Pizza campesina.jpg', 1),
(31, 'Pizza atun', 250, 'Pizza atun.jpg', 1),
(32, 'Pizza cebolla', 150, 'Pizza cebolla.jpg', 1),
(33, 'Pizza champinon', 255, 'Pizza champinon.jpg', 2),
(34, 'Pizza chilena', 145, 'Pizza chilena.jpg', 2),
(35, 'Pizza de la casa', 125, 'Pizza de la casa.jpg', 2),
(36, 'Pizza huevo', 135, 'Pizza huevo.jpg', 2),
(37, 'Pizza jamon y morron', 165, 'Pizza jamon y morron.jpg', 2),
(38, 'Pizza light', 150, 'Pizza light.jpg', 3),
(39, 'Pizza mexicana', 180, 'Pizza mexicana.jpg', 3),
(40, 'Pizza noruega', 200, 'Pizza noruega.jpg', 3),
(41, 'Pizza siciliana', 195, 'Pizza siciliana.jpg', 3),
(42, 'Pizza vegetales', 175, 'Pizza vegetales.jpg', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sucursales`
--

CREATE TABLE `sucursales` (
  `idSucursal` int(11) NOT NULL,
  `direccion` varchar(50) COLLATE latin1_general_ci NOT NULL,
  `telefono` varchar(20) COLLATE latin1_general_ci NOT NULL,
  `foto1` varchar(50) COLLATE latin1_general_ci NOT NULL,
  `foto2` varchar(50) COLLATE latin1_general_ci NOT NULL,
  `foto3` varchar(50) COLLATE latin1_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Volcado de datos para la tabla `sucursales`
--

INSERT INTO `sucursales` (`idSucursal`, `direccion`, `telefono`, `foto1`, `foto2`, `foto3`) VALUES
(1, 'Av. Cordoba 5432', '4775-1380', '4775-1380-foto1.jpg', '4775-1380-foto2.jpg', '4775-1380-foto3.jpg'),
(2, 'Av. Corrientes 6800', '4531-1020', '4531-1020-foto1.jpg', '4531-1020-foto2.jpg', '4531-1020-foto3.jpg'),
(3, 'Costa Rica 5830', '4832-2080', '4832-2080-foto1.jpg', '4832-2080-foto2.jpg', '4832-2080-foto3.jpg');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `oferta`
--
ALTER TABLE `oferta`
  ADD PRIMARY KEY (`idOferta`);

--
-- Indices de la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD PRIMARY KEY (`idPedido`);

--
-- Indices de la tabla `persona`
--
ALTER TABLE `persona`
  ADD PRIMARY KEY (`idPersona`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`idProducto`);

--
-- Indices de la tabla `sucursales`
--
ALTER TABLE `sucursales`
  ADD PRIMARY KEY (`idSucursal`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `oferta`
--
ALTER TABLE `oferta`
  MODIFY `idOferta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT de la tabla `pedido`
--
ALTER TABLE `pedido`
  MODIFY `idPedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
--
-- AUTO_INCREMENT de la tabla `persona`
--
ALTER TABLE `persona`
  MODIFY `idPersona` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;
--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `idProducto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;
--
-- AUTO_INCREMENT de la tabla `sucursales`
--
ALTER TABLE `sucursales`
  MODIFY `idSucursal` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
