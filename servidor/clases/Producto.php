<?php
require_once "AccesoDatos.php";
class Producto
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $idProducto;
	public $descripcion;
  	public $precio;
  	public $foto;

//--------------------------------------------------------------------------------//
//--CONSTRUCTOR
	public function __construct($idProducto=NULL)
	{
		if($idProducto != NULL){
			$obj = Producto::TraerUnProducto($idProducto);
			$this->idProducto = $obj->idProducto;
			$this->descripcion = $obj->descripcion;
			$this->precio = $precio;
			$this->foto = $obj->foto;
		}
	}

//--------------------------------------------------------------------------------//
//--TOSTRING	
  	public function ToString()
	{
	  	return $this->descripcion."-".$this->precio."-".$this->foto;
	}
//--------------------------------------------------------------------------------//
//--METODO DE CLASE
	public static function TraerUnProducto($idProducto) 
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from producto where idProducto =:idProducto");
		
		$consulta->bindValue(':idProducto', $idProducto, PDO::PARAM_INT);
		$consulta->execute();
		$productoBuscado= $consulta->fetchObject('Producto');
		return $productoBuscado;	
					
	}
	
	public static function TraerTodosLosProductos()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from producto");

		$consulta->execute();			
		$productos= $consulta->fetchAll(PDO::FETCH_CLASS, "Producto");	
		return $productos;
	}
	
	public static function Borrar($idProducto)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("delete from producto	WHERE idProducto=:idProducto");	
		
		$consulta->bindValue(':idProducto',$idProducto, PDO::PARAM_INT);		
		$consulta->execute();
		return $consulta->rowCount();
	}
	
	public static function Modificar($producto)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("
				update producto 
				set descripcion=:descripcion,
				precio=:precio,
				foto=:foto
				WHERE idProducto=:idProducto");

			$consulta->bindValue(':idProducto',$producto->idProducto, PDO::PARAM_INT);
			$consulta->bindValue(':precio', $producto->precio, PDO::PARAM_INT);
			$consulta->bindValue(':descripcion',$producto->descripcion, PDO::PARAM_STR);
			$consulta->bindValue(':foto', $producto->foto, PDO::PARAM_STR);
			return $consulta->execute();
	}


	public static function Insertar($producto)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into producto (descripcion,precio,foto)values(:descripcion,:precio,:foto)");

			$consulta->bindValue(':precio', $producto->precio, PDO::PARAM_INT);
			$consulta->bindValue(':descripcion',$producto->descripcion, PDO::PARAM_STR);
			$consulta->bindValue(':foto', $producto->foto, PDO::PARAM_STR);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	
				
	}	

}
