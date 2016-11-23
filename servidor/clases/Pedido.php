<?php
require_once "AccesoDatos.php";
class Pedido
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $idPedido;
	public $idProducto;
	public $productoDescripcion;
  	public $cantidad;
  	public $idSucursal;
  	public $sucursalDireccion;
  	public $clienteNombre;
  	public $idPersona;
  	public $total;
  	public $idOferta;
  	public $ofertaDescripcion;
  	public $estado;
  	public $fecha;
  	public $encuesta;

//--------------------------------------------------------------------------------//
//--CONSTRUCTOR
	public function __construct($idPedido=NULL)
	{
		if($idPedido != NULL){
			$obj = Pedido::TraerUnPedido($idPedido);
			$this->idPedido = $obj->idPedido;
			$this->producto = $obj->idProducto;
			$this->cantidad = $obj->cantidad;
			$this->idSucursal = $obj->idSucursal;
			$this->clienteNombre = $obj->clienteNombre;
			$this->idPersona = $obj->idPersona;
			$this->total = $obj->total;
			$this->idOferta = $obj->idOferta;
			$this->productoDescripcion = $obj->productoDescripcion;
			$this->sucursalDireccion = $obj->sucursalDireccion;
			$this->ofertaDescripcion = $obj->ofertaDescripcion;
			$this->estado = $obj->estado;
			$this->fecha = $obj->fecha;
			$this->encuesta = $obj->encuesta;

		}
	}

//--------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------//
//--METODO DE CLASE
	public static function TraerUnPedido($idPedido)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from pedido where idPedido =:idPedido");
		
		$consulta->bindValue(':idPedido', $idPedido, PDO::PARAM_INT);
		$consulta->execute();
		$productoBuscado= $consulta->fetchObject('Pedido');
		return $productoBuscado;	
					
	}
	
	public static function TraerTodosLosPedidos()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from pedido");

		$consulta->execute();			
		$productos= $consulta->fetchAll(PDO::FETCH_CLASS, "Pedido");	
		return $productos;
	}
	
	public static function Borrar($idPedido)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("delete from pedido	WHERE idPedido=:idPedido");	
		
		$consulta->bindValue(':idPedido',$idPedido, PDO::PARAM_INT);		
		$consulta->execute();
		return $consulta->rowCount();
	}
	
	public static function Modificar($pedido)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("
				update pedido 
				set cantidad=:cantidad,
				idProducto=:idProducto,
				idSucursal=:idSucursal,
				clienteNombre=:clienteNombre,
				idPersona=:idPersona,
				total=:total,
				idOferta=:idOferta,
				ofertaDescripcion=:ofertaDescripcion,
				productoDescripcion=:productoDescripcion,
				sucursalDireccion=:sucursalDireccion,
				estado=:estado,
				fecha=:fecha,
				encuesta=:encuesta
				WHERE idPedido=:idPedido");

			$consulta->bindValue(':idPedido',$pedido->idPedido, PDO::PARAM_INT);
			$consulta->bindValue(':cantidad', $pedido->cantidad, PDO::PARAM_INT);
			$consulta->bindValue(':idProducto', $pedido->idProducto, PDO::PARAM_INT);
			$consulta->bindValue(':idSucursal', $pedido->idSucursal, PDO::PARAM_INT);
			$consulta->bindValue(':idPersona', $pedido->idPersona, PDO::PARAM_INT);
			$consulta->bindValue(':clienteNombre', $pedido->clienteNombre, PDO::PARAM_STR);
			$consulta->bindValue(':total', $pedido->total, PDO::PARAM_INT);
			$consulta->bindValue(':idOferta', $pedido->idOferta, PDO::PARAM_INT);
			$consulta->bindValue(':ofertaDescripcion', $pedido->ofertaDescripcion, PDO::PARAM_STR);
			$consulta->bindValue(':productoDescripcion', $pedido->productoDescripcion, PDO::PARAM_STR);
			$consulta->bindValue(':sucursalDireccion', $pedido->sucursalDireccion, PDO::PARAM_STR);
			$consulta->bindValue(':estado', $pedido->estado, PDO::PARAM_STR);
			$consulta->bindValue(':fecha', $pedido->fecha, PDO::PARAM_STR);
			$consulta->bindValue(':encuesta', $pedido->encuesta, PDO::PARAM_STR);
			return $consulta->execute();
	}


	public static function Insertar($pedido)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into pedido (idProducto,cantidad,idSucursal,clienteNombre,idPersona,total,idOferta,ofertaDescripcion, productoDescripcion, sucursalDireccion, estado, fecha, encuesta )values(:idProducto,:cantidad,:idSucursal,:clienteNombre,:idPersona,:total,:idOferta, :ofertaDescripcion, :productoDescripcion, :sucursalDireccion, :estado, :fecha, :encuesta)");

			$consulta->bindValue(':idProducto', $pedido->idProducto, PDO::PARAM_INT);
			$consulta->bindValue(':cantidad',$pedido->cantidad, PDO::PARAM_INT);
			$consulta->bindValue(':idSucursal',$pedido->idSucursal, PDO::PARAM_INT);
			$consulta->bindValue(':idPersona', $pedido->idPersona, PDO::PARAM_INT);
			$consulta->bindValue(':clienteNombre', $pedido->clienteNombre, PDO::PARAM_STR);
			$consulta->bindValue(':total', $pedido->total, PDO::PARAM_INT);
			$consulta->bindValue(':idOferta', $pedido->idOferta, PDO::PARAM_INT);
			$consulta->bindValue(':ofertaDescripcion', $pedido->ofertaDescripcion, PDO::PARAM_STR);
			$consulta->bindValue(':productoDescripcion', $pedido->productoDescripcion, PDO::PARAM_STR);
			$consulta->bindValue(':sucursalDireccion', $pedido->sucursalDireccion, PDO::PARAM_STR);
			$consulta->bindValue(':estado', $pedido->estado, PDO::PARAM_STR);
			$consulta->bindValue(':fecha', $pedido->fecha, PDO::PARAM_STR);
			$consulta->bindValue(':encuesta', $pedido->encuesta, PDO::PARAM_STR);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	
				
	}	

}
