<?php
require_once "AccesoDatos.php";
class Sucursal
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $idSucursal;
	public $direccion;
  	public $telefono;
  	public $foto1;
  	public $foto2;
  	public $foto3;
  	public $latitud;
  	public $longitud;

//--------------------------------------------------------------------------------//
//--CONSTRUCTOR
	public function __construct($idSucursal=NULL)
	{
		if($idSucursal != NULL){
			$obj = Producto::TraerUnProducto($idSucursal);
			$this->idSucursal = $obj->idSucursal;
			$this->direccion = $obj->direccion;
			$this->telefono = $telefono;
			$this->foto1 = $obj->foto1;
			$this->foto2 = $obj->foto2;
			$this->foto3 = $obj->foto3;
			$this->latitud = $obj->latitud;
			$this->longitud = $obj->longitud;
		}
	}

//--------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------//
//--METODO DE CLASE
	public static function TraerUnaSucursal($idSucursal) 
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from sucursales where idSucursal =:idSucursal");
		
		$consulta->bindValue(':idSucursal', $idSucursal, PDO::PARAM_INT);
		$consulta->execute();
		$productoBuscado= $consulta->fetchObject('Sucursal');
		return $productoBuscado;	
					
	}
	
	public static function TraerTodasLasSucursales()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from sucursales");

		$consulta->execute();			
		$productos= $consulta->fetchAll(PDO::FETCH_CLASS, "Sucursal");	
		return $productos;
	}
	
	public static function Borrar($idSucursal)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("delete from sucursales WHERE idSucursal=:idSucursal");	
		
		$consulta->bindValue(':idSucursal',$idSucursal, PDO::PARAM_INT);		
		$consulta->execute();
		return $consulta->rowCount();
	}
	
	public static function Modificar($sucursal)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("
				update sucursales 
				set direccion=:direccion,
				telefono=:telefono,
				foto1=:foto1,
				foto2=:foto2,
				foto3=:foto3,
				latitud=:latitud,
				longitud=:longitud
				WHERE idSucursal=:idSucursal");

			$consulta->bindValue(':idSucursal',$sucursal->idSucursal, PDO::PARAM_INT);
			$consulta->bindValue(':telefono', $sucursal->telefono, PDO::PARAM_STR);
			$consulta->bindValue(':direccion',$sucursal->direccion, PDO::PARAM_STR);
			$consulta->bindValue(':foto1', $sucursal->foto1, PDO::PARAM_STR);
			$consulta->bindValue(':foto2', $sucursal->foto2, PDO::PARAM_STR);
			$consulta->bindValue(':foto3', $sucursal->foto3, PDO::PARAM_STR);
			$consulta->bindValue(':latitud', $sucursal->latitud, PDO::PARAM_STR);
			$consulta->bindValue(':longitud', $sucursal->longitud, PDO::PARAM_STR);
			return $consulta->execute();
	}


	public static function Insertar($sucursal)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into sucursales (direccion,telefono,foto1,foto2,foto3, latitud, longitud)values(:direccion,:telefono,:foto1,:foto2,:foto3, :latitud, :longitud)");

			$consulta->bindValue(':direccion', $sucursal->direccion, PDO::PARAM_STR);
			$consulta->bindValue(':telefono',$sucursal->telefono, PDO::PARAM_STR);
			$consulta->bindValue(':foto1', $sucursal->foto1, PDO::PARAM_STR);
			$consulta->bindValue(':foto2', $sucursal->foto2, PDO::PARAM_STR);
			$consulta->bindValue(':foto3', $sucursal->foto3, PDO::PARAM_STR);
			$consulta->bindValue(':latitud', $sucursal->latitud, PDO::PARAM_STR);
			$consulta->bindValue(':longitud', $sucursal->longitud, PDO::PARAM_STR);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	
				
	}	

}
