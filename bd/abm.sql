-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 30-11-2016 a las 19:20:14
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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `encuestas`
--

CREATE TABLE `encuestas` (
  `idEncuesta` int(11) NOT NULL,
  `idProducto` int(11) NOT NULL,
  `uno` varchar(50) COLLATE latin1_general_ci NOT NULL,
  `dos` varchar(50) COLLATE latin1_general_ci NOT NULL,
  `tres` varchar(50) COLLATE latin1_general_ci NOT NULL,
  `cuatro` varchar(50) COLLATE latin1_general_ci NOT NULL,
  `cinco` varchar(50) COLLATE latin1_general_ci NOT NULL,
  `seis` varchar(50) COLLATE latin1_general_ci NOT NULL,
  `siete` varchar(50) COLLATE latin1_general_ci NOT NULL,
  `ocho` varchar(50) COLLATE latin1_general_ci NOT NULL,
  `nueve` varchar(50) COLLATE latin1_general_ci NOT NULL,
  `diez` varchar(400) COLLATE latin1_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Volcado de datos para la tabla `encuestas`
--

INSERT INTO `encuestas` (`idEncuesta`, `idProducto`, `uno`, `dos`, `tres`, `cuatro`, `cinco`, `seis`, `siete`, `ocho`, `nueve`, `diez`) VALUES
(1, 44, 'mucho', 'mucho', 'unico', 'mucho', 'alta', 'excelente', 'mucho', 'primera_compra', 'mucho', '10 puntos!!'),
(2, 0, 'mucho', 'mucho', 'unico', 'mucho', 'alta', 'excelente', 'mucho', 'primera_compra', 'mucho', ' '),
(3, 0, 'poco', 'poco', 'caro', 'poco', 'baja', 'promedio', 'poco', 'seis_meses', 'poco', 'Ingrese un comentario'),
(4, 45, 'mucho', 'mucho', 'unico', 'mucho', 'alta', 'excelente', 'mucho', 'primera_compra', 'mucho', ' '),
(5, 53, 'poco', 'nada', 'caro', 'mucho', 'alta', 'promedio', 'poco', 'primera_compra', 'poco', ' '),
(6, 48, 'mucho', 'mucho', 'unico', 'mucho', 'alta', 'excelente', 'mucho', 'primera_compra', 'mucho', ' '),
(7, 51, 'nada', 'nada', 'no seguro', 'nada', 'mala', 'no pobre', 'nada', 'mas_tiempo', 'nada', ' ');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `oferta`
--

CREATE TABLE `oferta` (
  `idOferta` int(11) NOT NULL,
  `descripcion` varchar(50) COLLATE latin1_general_ci NOT NULL,
  `precio` varchar(11) COLLATE latin1_general_ci NOT NULL,
  `foto1` varchar(100) COLLATE latin1_general_ci NOT NULL,
  `idSucursal` int(11) NOT NULL,
  `foto2` varchar(100) COLLATE latin1_general_ci NOT NULL,
  `foto3` varchar(100) COLLATE latin1_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Volcado de datos para la tabla `oferta`
--

INSERT INTO `oferta` (`idOferta`, `descripcion`, `precio`, `foto1`, `idSucursal`, `foto2`, `foto3`) VALUES
(4, 'Pizza hawaiana', '150', 'Pizza hawaiana-foto1.jpg', 1, 'Pizza hawaiana-foto2.jpg', 'Pizza hawaiana-foto3.jpg'),
(5, 'Pizza jamon y morron', '135', 'Pizza jamon y morron-foto1.jpg', 1, 'Pizza jamon y morron-foto2.jpg', 'Pizza jamon y morron-foto3.jpg'),
(6, 'Pizza champinon', '150', 'Pizza champinon-foto1.jpg', 2, 'Pizza champinon-foto2.jpg', 'Pizza champinon-foto3.jpg'),
(7, 'Pizza noruega', '150', 'Pizza noruega-foto1.jpg', 2, 'Pizza noruega-foto2.jpg', 'Pizza noruega-foto3.jpg'),
(8, 'Pizza ahumada', '125', 'Pizza ahumada-foto1.jpg', 3, 'Pizza ahumada-foto2.jpg', 'Pizza ahumada-foto3.jpg'),
(9, 'Pizza pollo', '150', 'Pizza pollo-foto1.jpg', 3, 'Pizza pollo-foto2.jpg', 'Pizza pollo-foto3.jpg');

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
  `estado` varchar(20) COLLATE latin1_general_ci NOT NULL,
  `fecha` varchar(100) COLLATE latin1_general_ci NOT NULL,
  `encuesta` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Volcado de datos para la tabla `pedido`
--

INSERT INTO `pedido` (`idPedido`, `idProducto`, `cantidad`, `idSucursal`, `clienteNombre`, `idPersona`, `total`, `idOferta`, `ofertaDescripcion`, `productoDescripcion`, `sucursalDireccion`, `estado`, `fecha`, `encuesta`) VALUES
(1, 45, 1, 1, 'Sofia Lamas', 71, 150, 0, '', 'Pizza pepperoni', 'Av. Mitre 6510 Wilde Buenos Aires', 'cancelado', '2016-11-30T13:45:05.108Z', 1),
(2, 0, 2, 2, 'Sofia Lamas', 71, 300, 7, 'Pizza noruega', '', 'Av. Corrientes 505 Caba', 'finalizado', '2016-11-30T13:45:24.406Z', 0),
(3, 0, 1, 3, 'Sofia Lamas', 71, 150, 9, 'Pizza pollo', '', 'Av. Santa Fe 4801 Palermo Caba', 'finalizado', '2016-11-30T13:45:42.692Z', 1),
(8, 0, 2, 1, 'Quique Wolff', 72, 270, 5, 'Pizza jamon y morron', '', 'Av. Mitre 6510 Wilde Buenos Aires', 'finalizado', '2016-11-30T14:15:46.008Z', 0),
(9, 52, 1, 2, 'Quique Wolff', 72, 180, 0, '', 'Pizza pollo', 'Av. Corrientes 505 Caba', 'procesando', '2016-11-30T14:16:06.812Z', 0),
(10, 55, 1, 3, 'Quique Wolff', 72, 155, 0, '', 'Pizza huevo', 'Av. Santa Fe 4801 Palermo Caba', 'cancelado', '2016-11-30T14:16:27.479Z', 0),
(11, 45, 3, 1, 'Quique Wolff', 72, 450, 0, '', 'Pizza pepperoni', 'Av. Mitre 6510 Wilde Buenos Aires', 'finalizado', '2016-11-30T14:16:46.024Z', 0),
(12, 51, 4, 2, 'Quique Wolff', 72, 540, 0, '', 'Pizza muzzarella', 'Av. Corrientes 505 Caba', 'finalizado', '2016-11-30T14:17:32.772Z', 0),
(14, 0, 1, 1, 'Susana Gimenez', 73, 150, 4, 'Pizza hawaiana', '', 'Av. Mitre 6510 Wilde Buenos Aires', 'finalizado', '2016-11-30T14:28:10.163Z', 0),
(15, 49, 2, 2, 'Susana Gimenez', 73, 300, 0, '', 'Pizza vegetales', 'Av. Corrientes 505 Caba', 'procesando', '2016-11-30T14:28:26.201Z', 0),
(16, 0, 1, 3, 'Susana Gimenez', 73, 125, 8, 'Pizza ahumada', '', 'Av. Santa Fe 4801 Palermo Caba', 'finalizado', '2016-11-30T14:28:45.127Z', 0),
(20, 47, 2, 1, 'Oscar Suarez', 74, 356, 0, '', 'Pizza champinon', 'Av. Mitre 6510 Wilde Buenos Aires', 'procesando', '2016-11-30T14:37:39.279Z', 0),
(21, 48, 1, 2, 'Oscar Suarez', 74, 199, 0, '', 'Pizza atun', 'Av. Corrientes 505 Caba', 'finalizado', '2016-11-30T14:38:07.278Z', 0),
(22, 54, 1, 3, 'Oscar Suarez', 74, 175, 0, '', 'Pizza noruega', 'Av. Santa Fe 4801 Palermo Caba', 'procesando', '2016-11-30T14:38:22.903Z', 0),
(26, 43, 2, 1, 'Nadia Fernandez', 76, 298, 0, '', 'Pizza ahumada', 'Av. Mitre 6510 Wilde Buenos Aires', 'procesando', '2016-11-30T15:25:26.574Z', 0),
(27, 48, 1, 2, 'Nadia Fernandez', 76, 199, 0, '', 'Pizza atun', 'Av. Corrientes 505 Caba', 'procesando', '2016-11-30T15:25:43.683Z', 0),
(28, 55, 1, 3, 'Nadia Fernandez', 76, 155, 0, '', 'Pizza huevo', 'Av. Santa Fe 4801 Palermo Caba', 'finalizado', '2016-11-30T15:25:56.158Z', 0),
(32, 43, 1, 1, 'Pepito', 0, 149, 0, '', 'Pizza ahumada', 'Av. Mitre 6510 Wilde Buenos Aires', 'procesando', '2016-11-30T15:54:47.536Z', 0),
(33, 43, 2, 1, 'Carlos', 0, 298, 0, '', 'Pizza ahumada', 'Av. Mitre 6510 Wilde Buenos Aires', 'finalizado', '2016-11-30T16:18:14.261Z', 0),
(34, 46, 2, 1, 'Carlos', 0, 258, 0, '', 'Pizza cebolla', 'Av. Mitre 6510 Wilde Buenos Aires', 'procesando', '2016-11-30T16:21:18.697Z', 0),
(35, 0, 3, 1, 'Graciela', 0, 405, 5, 'Pizza jamon y morron', '', 'Av. Mitre 6510 Wilde Buenos Aires', 'finalizado', '2016-11-30T16:26:37.179Z', 0),
(36, 44, 1, 1, 'Sofia Lamas', 71, 189, 0, '', 'Pizza anchoas', 'Av. Mitre 6510 Wilde Buenos Aires', 'finalizado', '2016-11-30T16:34:30.048Z', 1),
(37, 0, 3, 3, 'Sofia Lamas', 71, 405, 5, 'Pizza jamon y morron', '', 'Av. Santa Fe 4801 Palermo Caba', 'finalizado', '2016-11-30T16:34:52.093Z', 1),
(38, 49, 2, 2, 'Sofia Lamas', 71, 300, 0, '', 'Pizza vegetales', 'Av. Corrientes 505 Caba', 'finalizado', '2016-11-30T16:36:05.109Z', 0),
(39, 0, 2, 3, 'Sofia Lamas', 71, 300, 9, 'Pizza pollo', '', 'Av. Santa Fe 4801 Palermo Caba', 'procesando', '2016-11-30T16:36:21.661Z', 0),
(40, 53, 1, 3, 'Nadia Fernandez', 76, 198, 0, '', 'Pizza hawaiana', 'Av. Santa Fe 4801 Palermo Caba', 'cancelado', '2016-11-30T16:39:48.748Z', 1),
(41, 0, 1, 2, 'Nadia Fernandez', 76, 150, 7, 'Pizza noruega', '', 'Av. Corrientes 505 Caba', 'finalizado', '2016-11-30T16:40:01.613Z', 0),
(42, 48, 2, 2, 'Nadia Fernandez', 76, 398, 0, '', 'Pizza atun', 'Av. Corrientes 505 Caba', 'finalizado', '2016-11-30T18:03:45.494Z', 1),
(43, 50, 1, 2, 'Nadia Fernandez', 76, 165, 0, '', 'Pizza jamon y morron', 'Av. Corrientes 505 Caba', 'finalizado', '2016-11-30T18:03:58.652Z', 0),
(44, 51, 2, 2, 'Nadia Fernandez', 76, 270, 0, '', 'Pizza muzzarella', 'Av. Corrientes 505 Caba', 'finalizado', '2016-11-30T18:04:10.882Z', 1),
(46, 0, 2, 3, 'Nadia Fernandez', 76, 300, 9, 'Pizza pollo', '', 'Av. Santa Fe 4801 Palermo Caba', 'finalizado', '2016-11-30T18:08:30.548Z', 0);

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
  `idSucursal` int(11) NOT NULL,
  `estado` varchar(12) COLLATE utf8_spanish2_ci NOT NULL,
  `latitud` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `longitud` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `direccion` varchar(100) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `persona`
--

INSERT INTO `persona` (`idPersona`, `nombre`, `email`, `password`, `perfil`, `foto`, `dni`, `idSucursal`, `estado`, `latitud`, `longitud`, `direccion`) VALUES
(38, 'Pepe Gonzalez', 'administrador@administrador.com', '123456', 'administrador', '24242424.jpg', '24242424', 0, 'activo', '-34.6909213', '-58.3027287', 'Las Flores 1600 Wilde Buenos Aires'),
(62, 'Marty McFly', 'encargado@encargado.com', '123456', 'encargado', '12121212.jpg', '12121212', 1, 'activo', '-34.7067455', '-58.3144067', 'Av. Mitre 6510 Wilde Buenos Aires'),
(63, 'Santiago Villalba', 'santiago@santiago.com', '123456', 'empleado', '13131313.jpg', '13131313', 1, 'activo', '-34.7067455', '-58.3144067', 'Av. Mitre 6510 Wilde Buenos Aires'),
(64, 'Natalia Lopez', 'empleado@empleado.com', '123456', 'empleado', '14141414.jpg', '14141414', 1, 'activo', '-34.7067455', '-58.3144067', 'Av. Mitre 6510 Wilde Buenos Aires'),
(65, 'Reinaldo Rueda', 'reinaldo@reinaldo.com', '123456', 'encargado', '15151515.jpg', '15151515', 2, 'activo', '-34.6031788', '-58.3738767', 'Av. Corrientes 505 Caba'),
(66, 'Sebastian Mansen', 'sebastian@sebastian.com', '123456', 'empleado', '16161616.jpg', '16161616', 2, 'activo', '-34.6031788', '-58.3738767', 'Av. Corrientes 505 Caba'),
(67, 'Pablo Ruiz', 'pablo@pablo.com', '123456', 'empleado', '17171717.jpg', '17171717', 2, 'activo', '-34.6031788', '-58.3738767', 'Av. Corrientes 505 Caba'),
(68, 'Diego Gomez', 'diego@diego.com', '123456', 'encargado', '18181818.jpg', '18181818', 3, 'activo', '-34.5777099', '-58.4274497', 'Av. Santa Fe 4801 Palermo Caba'),
(69, 'Nicolas Rodriguez', 'nicolas@nicolas.com', '123456', 'empleado', '19191919.jpg', '19191919', 3, 'activo', '-34.5777099', '-58.4274497', 'Av. Santa Fe 4801 Palermo Caba'),
(70, 'Paula Vazquez', 'paula@paula.com', '123456', 'empleado', '20202020.jpg', '20202020', 3, 'activo', '-34.5777099', '-58.4274497', 'Av. Santa Fe 4801 Palermo Caba'),
(71, 'Sofia Lamas', 'cliente@cliente.com', '123456', 'cliente', '21212121.jpg', '21212121', 1, 'activo', '-34.6882372', '-58.3095809', 'Guamini 5656 Wilde Buenos Aires'),
(72, 'Quique Wolff', 'quique@quique.com', '123456', 'cliente', '22222222.jpg', '22222222', 3, 'activo', '-34.585885', '-58.436654', 'Humboldt 1550 Palermo Caba'),
(73, 'Susana Gimenez', 'susana@susana.com', '123456', 'cliente', '23232323.jpg', '23232323', 2, 'activo', '-34.604064', '-58.4109275', 'Av. Corrientes 3232 Caba'),
(74, 'Oscar Suarez', 'oscar@oscar.com', '123456', 'cliente', '27272728.jpg', '27272728', 1, 'activo', '-34.5956289', '-58.384489', 'Av. Santa Fe 1210 Caba'),
(76, 'Nadia Fernandez', 'nadia@nadia.com', '123456', 'cliente', '28282828.jpg', '28282828', 2, 'activo', '-34.6923119', '-58.3043388', 'Las Flores 1401 Wilde Buenos Aires'),
(79, 'Rosa Lopez', 'rosa@rosa.com', '123456', 'cliente', '90909090.jpg', '90909090', 2, 'activo', '-34.6906591', '-58.3048672', 'Virrey del Pino 1401, Wilde, Buenos Aires'),
(80, 'Gisel Lopez', 'gise@gise.com', '123456', 'cliente', '91919191.jpg', '91919191', 3, 'activo', '0', '0', 'Alberdi 450 Caba');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `idProducto` int(11) NOT NULL,
  `descripcion` varchar(50) COLLATE latin1_general_ci DEFAULT NULL,
  `precio` int(10) NOT NULL,
  `foto1` varchar(100) COLLATE latin1_general_ci NOT NULL,
  `idSucursal` int(11) NOT NULL,
  `foto2` varchar(100) COLLATE latin1_general_ci NOT NULL,
  `foto3` varchar(100) COLLATE latin1_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`idProducto`, `descripcion`, `precio`, `foto1`, `idSucursal`, `foto2`, `foto3`) VALUES
(43, 'Pizza ahumada', 149, 'Pizza ahumada-foto1.jpg', 1, 'Pizza ahumada-foto2.jpg', 'Pizza ahumada-foto3.jpg'),
(44, 'Pizza anchoas', 189, 'Pizza anchoas-foto1.jpg', 1, 'Pizza anchoas-foto2.jpg', 'Pizza anchoas-foto3.jpg'),
(45, 'Pizza pepperoni', 150, 'Pizza pepperoni-foto1.jpg', 1, 'Pizza pepperoni-foto2.jpg', 'Pizza pepperoni-foto3.jpg'),
(46, 'Pizza cebolla', 129, 'Pizza cebolla-foto1.jpg', 1, 'Pizza cebolla-foto2.jpg', 'Pizza cebolla-foto3.jpg'),
(47, 'Pizza champinon', 178, 'Pizza champinon-foto1.jpg', 1, 'Pizza champinon-foto2.jpg', 'Pizza champinon-foto3.jpg'),
(48, 'Pizza atun', 199, 'Pizza atun-foto1.jpg', 2, 'Pizza atun-foto2.jpg', 'Pizza atun-foto3.jpg'),
(49, 'Pizza vegetales', 150, 'Pizza vegetales-foto1.jpg', 2, 'Pizza vegetales-foto2.jpg', 'Pizza vegetales-foto3.jpg'),
(50, 'Pizza jamon y morron', 165, 'Pizza jamon y morron-foto1.jpg', 2, 'Pizza jamon y morron-foto2.jpg', 'Pizza jamon y morron-foto3.jpg'),
(51, 'Pizza muzzarella', 135, 'Pizza muzzarella-foto1.jpg', 2, 'Pizza muzzarella-foto2.jpg', 'Pizza muzzarella-foto3.jpg'),
(52, 'Pizza pollo', 180, 'Pizza pollo-foto1.jpg', 2, 'Pizza pollo-foto2.jpg', 'Pizza pollo-foto3.jpg'),
(53, 'Pizza hawaiana', 198, 'Pizza hawaiana-foto1.jpg', 3, 'Pizza hawaiana-foto2.jpg', 'Pizza hawaiana-foto3.jpg'),
(54, 'Pizza noruega', 175, 'Pizza noruega-foto1.jpg', 3, 'Pizza noruega-foto2.jpg', 'Pizza noruega-foto3.jpg'),
(55, 'Pizza huevo', 155, 'Pizza huevo-foto1.jpg', 3, 'Pizza huevo-foto2.jpg', 'Pizza huevo-foto3.jpg'),
(56, 'Pizza mexicana', 180, 'Pizza mexicana-foto1.jpg', 3, 'Pizza mexicana-foto2.jpg', 'Pizza mexicana-foto3.jpg'),
(57, 'Pizza chilena', 145, 'Pizza chilena-foto1.jpg', 3, 'Pizza chilena-foto2.jpg', 'Pizza chilena-foto3.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservas`
--

CREATE TABLE `reservas` (
  `idReserva` int(11) NOT NULL,
  `idPedido` int(11) NOT NULL,
  `fechaInicio` varchar(100) COLLATE latin1_general_ci NOT NULL,
  `fechaFin` varchar(100) COLLATE latin1_general_ci NOT NULL,
  `idSucursal` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Volcado de datos para la tabla `reservas`
--

INSERT INTO `reservas` (`idReserva`, `idPedido`, `fechaInicio`, `fechaFin`, `idSucursal`) VALUES
(5, 11, '2016-11-30T14:16:46.024Z', '2016-12-02T14:16:46.024Z', 1),
(6, 12, '2016-11-30T14:17:32.772Z', '2016-12-04T14:17:32.772Z', 2),
(17, 33, '2016-11-30T16:18:14.261Z', '2016-12-03T16:18:14.261Z', 1),
(18, 34, '2016-11-30T16:21:18.697Z', '2016-12-05T16:21:18.697Z', 1),
(19, 35, '2016-11-30T16:26:37.179Z', '2016-12-05T16:26:37.179Z', 1),
(20, 37, '2016-11-30T16:34:52.093Z', '2016-12-05T16:34:52.093Z', 3);

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
  `foto3` varchar(50) COLLATE latin1_general_ci NOT NULL,
  `latitud` varchar(100) COLLATE latin1_general_ci NOT NULL,
  `longitud` varchar(100) COLLATE latin1_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Volcado de datos para la tabla `sucursales`
--

INSERT INTO `sucursales` (`idSucursal`, `direccion`, `telefono`, `foto1`, `foto2`, `foto3`, `latitud`, `longitud`) VALUES
(1, 'Av. Mitre 6510 Wilde Buenos Aires', '4217-2020', '4217-2020-foto1.jpg', '4217-2020-foto2.jpg', '4217-2020-foto3.jpg', '-34.7067455', '-58.3144067'),
(2, 'Av. Corrientes 505 Caba', '5432-1110', '5432-1110-foto1.jpg', '5432-1110-foto2.jpg', '5432-1110-foto3.jpg', '-34.6031788', '-58.3738767'),
(3, 'Av. Santa Fe 4801 Palermo Caba', '4745-8027', '4745-8027-foto1.jpg', '4745-8027-foto2.jpg', '4745-8027-foto3.jpg', '-34.5777099', '-58.4274497');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `encuestas`
--
ALTER TABLE `encuestas`
  ADD PRIMARY KEY (`idEncuesta`);

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
-- Indices de la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD PRIMARY KEY (`idReserva`);

--
-- Indices de la tabla `sucursales`
--
ALTER TABLE `sucursales`
  ADD PRIMARY KEY (`idSucursal`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `encuestas`
--
ALTER TABLE `encuestas`
  MODIFY `idEncuesta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT de la tabla `oferta`
--
ALTER TABLE `oferta`
  MODIFY `idOferta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT de la tabla `pedido`
--
ALTER TABLE `pedido`
  MODIFY `idPedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;
--
-- AUTO_INCREMENT de la tabla `persona`
--
ALTER TABLE `persona`
  MODIFY `idPersona` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;
--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `idProducto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;
--
-- AUTO_INCREMENT de la tabla `reservas`
--
ALTER TABLE `reservas`
  MODIFY `idReserva` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT de la tabla `sucursales`
--
ALTER TABLE `sucursales`
  MODIFY `idSucursal` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
