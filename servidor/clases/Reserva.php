<?php
require_once "AccesoDatos.php";
class Reserva
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $idReserva;
	public $idPedido;
	public $fechaInicio;
  	public $fechaFin;
  	public $idSucursal;

//--------------------------------------------------------------------------------//
//--CONSTRUCTOR
	public function __construct($idReserva=NULL)
	{
		if($idReserva != NULL){
			$obj = Reserva::TraerUnaResrva($idReserva);
			$this->idReserva = $obj->idReserva;
			$this->idSucursal = $obj->idSucursal;
			$this->idPedido = $obj->idPedido;
			$this->fechaInicio = $obj->fechaInicio;
			$this->fechaFin = $obj->fechaFin;
		}
	}

//--------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------//
//--METODO DE CLASE
	public static function TraerUnaResrva($idReserva)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from reservas where idReserva =:idReserva");
		
		$consulta->bindValue(':idReserva', $idReserva, PDO::PARAM_INT);
		$consulta->execute();
		$productoBuscado= $consulta->fetchObject('Reserva');
		return $productoBuscado;	
					
	}
	
	public static function TraerTodosLasReservas()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from reservas");

		$consulta->execute();			
		$productos= $consulta->fetchAll(PDO::FETCH_CLASS, "Reserva");	
		return $productos;
	}
	
	public static function Borrar($idReserva)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("delete from reservas WHERE idReserva=:idReserva");	
		
		$consulta->bindValue(':idReserva',$idReserva, PDO::PARAM_INT);		
		$consulta->execute();
		return $consulta->rowCount();
	}
	
	public static function Modificar($reserva)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("
				update reservas 
				set fechaInicio=:fechaInicio,
				fechaFin=:fechaFin,
				idPedido=:idPedido,
				idSucursal=:idSucursal
				WHERE idReserva=:idReserva");

			$consulta->bindValue(':idReserva',$reserva->idReserva, PDO::PARAM_INT);
			$consulta->bindValue(':idPedido', $reserva->idPedido, PDO::PARAM_INT);
			$consulta->bindValue(':idSucursal', $reserva->idSucursal, PDO::PARAM_INT);
			$consulta->bindValue(':fechaInicio', $reserva->fechaInicio, PDO::PARAM_STR);
			$consulta->bindValue(':fechaFin', $reserva->fechaFin, PDO::PARAM_STR);
			return $consulta->execute();
	}


	public static function Insertar($reserva)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into reservas (idReserva,idPedido,fechaInicio,fechaFin,idSucursal) values(:idReserva,:idPedido,:fechaInicio,:fechaFin,:idSucursal)");

			$consulta->bindValue(':idReserva', $reserva->idReserva, PDO::PARAM_INT);
			$consulta->bindValue(':idPedido',$reserva->idPedido, PDO::PARAM_INT);
			$consulta->bindValue(':idSucursal', $reserva->idSucursal, PDO::PARAM_INT);
			$consulta->bindValue(':fechaInicio',$reserva->fechaInicio, PDO::PARAM_STR);
			$consulta->bindValue(':fechaFin', $reserva->fechaFin, PDO::PARAM_STR);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	
				
	}	

}
