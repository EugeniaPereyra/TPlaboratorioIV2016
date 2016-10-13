<?php
require_once "AccesoDatos.php";
class Pedido
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $idPedido;
	public $producto;
  	public $cantidad;

//--------------------------------------------------------------------------------//
//--CONSTRUCTOR
	public function __construct($idPedido=NULL)
	{
		if($idPedido != NULL){
			$obj = Pedido::TraerUnPedido($idPedido);
			$this->idPedido = $obj->idPedido;
			$this->producto = $obj->producto;
			$this->cantidad = $obj->cantidad;
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
				producto=:producto
				WHERE idPedido=:idPedido");

			$consulta->bindValue(':idPedido',$pedido->idPedido, PDO::PARAM_INT);
			$consulta->bindValue(':cantidad', $pedido->cantidad, PDO::PARAM_INT);
			$consulta->bindValue(':producto', $pedido->producto, PDO::PARAM_STR);
			return $consulta->execute();
	}


	public static function Insertar($pedido)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into pedido (producto,cantidad)values(:producto,:cantidad)");

			$consulta->bindValue(':producto', $pedido->producto, PDO::PARAM_STR);
			$consulta->bindValue(':cantidad',$pedido->cantidad, PDO::PARAM_INT);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	
				
	}	

}
