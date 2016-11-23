<?php
require_once "AccesoDatos.php";
class Encuesta
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $idEncuesta;
	public $idProducto;
	public $uno;
  	public $dos;
  	public $tres;
  	public $cuatro;
  	public $cinco;
  	public $seis;
  	public $siete;
  	public $ocho;
  	public $nueve;
  	public $diez;

//--------------------------------------------------------------------------------//
//--CONSTRUCTOR
	public function __construct($idPedido=NULL)
	{
		if($idPedido != NULL){
			$obj = Pedido::TraerUnPedido($idPedido);
			$this->idPedido = $obj->idPedido;
			$this->idProducto = $obj->idProducto;
			$this->uno = $obj->uno;
			$this->dos = $obj->dos;
			$this->tres = $obj->tres;
			$this->cuatro = $obj->cuatro;
			$this->cinco = $obj->cinco;
			$this->seis = $obj->seis;
			$this->siete = $obj->siete;
			$this->ocho = $obj->ocho;
			$this->nueve = $obj->nueve;
			$this->diez = $obj->diez;
		}
	}

//--------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------//
//--METODO DE CLASE
	public static function TraerUnaEncuesta($idEncuesta)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from encuestas where idEncuesta =:idEncuesta");
		
		$consulta->bindValue(':idEncuesta', $idEncuesta, PDO::PARAM_INT);
		$consulta->execute();
		$productoBuscado= $consulta->fetchObject('Encuesta');
		return $productoBuscado;	
					
	}
	
	public static function TraerTodasLasEncuestas()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from encuestas");

		$consulta->execute();			
		$productos= $consulta->fetchAll(PDO::FETCH_CLASS, "Encuesta");	
		return $productos;
	}
	
	public static function Borrar($idEncuesta)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("delete from encuestas WHERE idEncuesta=:idEncuesta");	
		
		$consulta->bindValue(':idEncuesta',$idEncuesta, PDO::PARAM_INT);		
		$consulta->execute();
		return $consulta->rowCount();
	}


	public static function Insertar($encuesta)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into encuestas (idProducto,uno,dos,tres,cuatro,cinco,seis,siete, ocho, nueve, diez) values(:idProducto,:uno,:dos,:tres,:cuatro,:cinco,:seis, :siete, :ocho, :nueve, :diez)");

			$consulta->bindValue(':idProducto', $encuesta->idProducto, PDO::PARAM_INT);
			$consulta->bindValue(':uno',$encuesta->uno, PDO::PARAM_STR);
			$consulta->bindValue(':dos',$encuesta->dos, PDO::PARAM_STR);
			$consulta->bindValue(':tres', $encuesta->tres, PDO::PARAM_STR);
			$consulta->bindValue(':cuatro', $encuesta->cuatro, PDO::PARAM_STR);
			$consulta->bindValue(':cinco', $encuesta->cinco, PDO::PARAM_STR);
			$consulta->bindValue(':seis', $encuesta->seis, PDO::PARAM_STR);
			$consulta->bindValue(':siete', $encuesta->siete, PDO::PARAM_STR);
			$consulta->bindValue(':ocho', $encuesta->ocho, PDO::PARAM_STR);
			$consulta->bindValue(':nueve', $encuesta->nueve, PDO::PARAM_STR);
			$consulta->bindValue(':diez', $encuesta->diez, PDO::PARAM_STR);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();				
	}	

}
