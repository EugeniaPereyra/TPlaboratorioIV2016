<?php
require_once "AccesoDatos.php";
class Producto
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id;
	public $descripcion;
 	public $marca;
  	public $precio;
  	public $stock;
  	public $foto;

//--------------------------------------------------------------------------------//
//--CONSTRUCTOR
	public function __construct($id=NULL)
	{
		if($id != NULL){
			$obj = Producto::TraerUnProducto($id);
			$this->id = $obj->id;
			$this->marca = $obj->marca;
			$this->descripcion = $obj->descripcion;
			$this->precio = $precio;
			$this->stock = $stock;
			$this->foto = $obj->foto;
		}
	}

//--------------------------------------------------------------------------------//
//--TOSTRING	
  	public function ToString()
	{
	  	return $this->marca."-".$this->descripcion."-".$this->precio."-".$this->foto;
	}
//--------------------------------------------------------------------------------//
//--METODO DE CLASE
	public static function TraerUnProducto($id) 
	{	


		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from producto where id =:id");
		
		$consulta->bindValue(':id', $id, PDO::PARAM_INT);
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
	
	public static function Borrar($id)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("delete from producto	WHERE id=:id");	
		
		$consulta->bindValue(':id',$id, PDO::PARAM_INT);		
		$consulta->execute();
		return $consulta->rowCount();
	}
	
	public static function Modificar($producto)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("
				update producto 
				set descripcion=:descripcion,
				marca=:marca,
				precio=:precio,
				stock=:stock,
				foto=:foto
				WHERE id=:id");

			$consulta->bindValue(':id',$producto->id, PDO::PARAM_INT);
			$consulta->bindValue(':marca', $producto->marca, PDO::PARAM_STR);
			$consulta->bindValue(':precio', $producto->marca, PDO::PARAM_INT);
			$consulta->bindValue(':stock', $producto->stock, PDO::PARAM_INT);
			$consulta->bindValue(':descripcion',$producto->descripcion, PDO::PARAM_STR);
			$consulta->bindValue(':foto', $producto->foto, PDO::PARAM_STR);
			return $consulta->execute();
	}


	public static function Insertar($producto)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into producto (descripcion,marca,precio,stock,foto)values(:descripcion,:marca,:precio,:stock,:foto)");

			$consulta->bindValue(':marca', $producto->marca, PDO::PARAM_STR);
			$consulta->bindValue(':precio', $producto->marca, PDO::PARAM_INT);
			$consulta->bindValue(':stock', $producto->stock, PDO::PARAM_INT);
			$consulta->bindValue(':descripcion',$producto->descripcion, PDO::PARAM_STR);
			$consulta->bindValue(':foto', $producto->foto, PDO::PARAM_STR);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	
				
	}	

}
