<?php
require_once "AccesoDatos.php";
class Pedido
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $idPedido;
	public $idProducto;
  	public $cantidad;
  	public $idSucursal;
  	public $clienteNombre;
  	public $idPersona;
  	public $total;
  	public $idOferta;

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
				tottal=:total,
				idOferta=:idOferta
				WHERE idPedido=:idPedido");

			$consulta->bindValue(':idPedido',$pedido->idPedido, PDO::PARAM_INT);
			$consulta->bindValue(':cantidad', $pedido->cantidad, PDO::PARAM_INT);
			$consulta->bindValue(':idProducto', $pedido->idProducto, PDO::PARAM_INT);
			$consulta->bindValue(':idSucursal', $pedido->idSucursal, PDO::PARAM_INT);
			$consulta->bindValue(':idPersona', $pedido->idPersona, PDO::PARAM_INT);
			$consulta->bindValue(':clienteNombre', $pedido->clienteNombre, PDO::PARAM_STR);
			$consulta->bindValue(':total', $pedido->total, PDO::PARAM_INT);
			$consulta->bindValue(':idOferta', $pedido->idOferta, PDO::PARAM_INT);
			return $consulta->execute();
	}


	public static function Insertar($pedido)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into pedido (idProducto,cantidad,idSucursal,clienteNombre,idPersona,total,idOferta)values(:idProducto,:cantidad,:idSucursal,:clienteNombre,:idPersona,:total,:idOferta)");

			$consulta->bindValue(':idProducto', $pedido->idProducto, PDO::PARAM_INT);
			$consulta->bindValue(':cantidad',$pedido->cantidad, PDO::PARAM_INT);
			$consulta->bindValue(':idSucursal',$pedido->idSucursal, PDO::PARAM_INT);
			$consulta->bindValue(':idPersona', $pedido->idPersona, PDO::PARAM_INT);
			$consulta->bindValue(':clienteNombre', $pedido->clienteNombre, PDO::PARAM_STR);
			$consulta->bindValue(':total', $pedido->total, PDO::PARAM_INT);
			$consulta->bindValue(':idOferta', $pedido->idOferta, PDO::PARAM_INT);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	
				
	}	

}
