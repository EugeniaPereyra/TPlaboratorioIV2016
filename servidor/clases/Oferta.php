<?php
require_once "AccesoDatos.php";
class Oferta
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $idOferta;
	public $descripcion;
  	public $precio;
  	public $foto;
  	public $idSucursal;

//--------------------------------------------------------------------------------//
//--CONSTRUCTOR
	public function __construct($idOferta=NULL)
	{
		if($idOferta != NULL){
			$obj = Producto::TraerUnProducto($idOferta);
			$this->idOferta = $obj->idOferta;
			$this->descripcion = $obj->descripcion;
			$this->precio = $precio;
			$this->foto = $obj->foto;
			$this->idSucursal = $obj->idSucursal;
		}
	}

//-------------------------------------------------------------------------
//--METODO DE CLASE
	public static function TraerUnaOferta($idOferta) 
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from oferta where idOferta =:idOferta");
		
		$consulta->bindValue(':idOferta', $idOferta, PDO::PARAM_INT);
		$consulta->execute();
		$productoBuscado= $consulta->fetchObject('Oferta');
		return $productoBuscado;	
					
	}
	
	public static function TraerTodosLasOfertas()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from oferta");

		$consulta->execute();			
		$productos= $consulta->fetchAll(PDO::FETCH_CLASS, "Oferta");	
		return $productos;
	}
	
	public static function Borrar($idOferta)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("delete from oferta	WHERE idOferta=:idOferta");	
		
		$consulta->bindValue(':idOferta',$idOferta, PDO::PARAM_INT);		
		$consulta->execute();
		return $consulta->rowCount();
	}
	
	public static function Modificar($producto)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("
				update oferta 
				set descripcion=:descripcion,
				precio=:precio,
				foto=:foto,
				idSucursal=:idSucursal
				WHERE idOferta=:idOferta");

			$consulta->bindValue(':idOferta',$producto->idOferta, PDO::PARAM_INT);
			$consulta->bindValue(':precio', $producto->precio, PDO::PARAM_STR);
			$consulta->bindValue(':descripcion',$producto->descripcion, PDO::PARAM_STR);
			$consulta->bindValue(':foto', $producto->foto, PDO::PARAM_STR);
			$consulta->bindValue(':idSucursal', $producto->idSucursal, PDO::PARAM_INT);
			return $consulta->execute();
	}


	public static function Insertar($producto)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into oferta (descripcion,precio,foto,idSucursal)values(:descripcion,:precio,:foto,:idSucursal)");

			$consulta->bindValue(':precio', $producto->precio, PDO::PARAM_STR);
			$consulta->bindValue(':descripcion',$producto->descripcion, PDO::PARAM_STR);
			$consulta->bindValue(':foto', $producto->foto, PDO::PARAM_STR);
			$consulta->bindValue(':idSucursal', $producto->idSucursal, PDO::PARAM_INT);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	
				
	}	

}
