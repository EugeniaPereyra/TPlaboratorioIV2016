<?php 
require_once "AccesoDatos.php";
class Usuario{

	//ATRIBUTOS
	public $idPersona;
	public $nombre;
	public $email;
	public $perfil;
	public $password;
	public $foto;
	public $dni;
	public $idSucursal;
	public $estado;
	public $latitud;
	public $longitud;

	//CONSTRUCTOR
	public function __construct($idPersona = NULL)
	{
		if($idPersona != NULL){
			$usuario = self::TraerUnUsuarioPorId($idPersona);
			$this->idPersona = $usuario->idPersona;
			$this->nombre = $usuario->nombre;
			$this->email = $usuario->email;
			$this->perfil = $usuario->perfil;
			$this->password = $usuario->password;
			$this->foto = $usuario->foto;
			$this->dni = $usuario->dni;
			$this->idSucursal = $usuario->idSucursal;
			$this->estado = $usuario->estado;
			$this->latitud = $usuario->latitud;
			$this->longitud = $usuario->longitud;
		}
	}

	//MÉTODOS
	public static function TraerUnUsuarioPorId($idPersona){
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 

		$sql = "SELECT U.idPersona, U.nombre, U.email, U.perfil, U.password, U.foto, U.dni, U.idSucursal, U.estado, U.latitud, U.longitud
				FROM persona U
				WHERE U.idPersona = :idPersona";

		$consulta = $objetoAccesoDato->RetornarConsulta($sql);
		$consulta->bindValue(":idPersona", $idPersona, PDO::PARAM_INT);
		$consulta->execute();

		$usuario = $consulta->fetchObject('Usuario');
		return $usuario;
	}

	public static function TraerTodosLosUsuarios(){
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 

		$sql = "SELECT U.idPersona, U.nombre, U.email, U.perfil, U.password, U.foto, U.dni, U.idSucursal, U.estado, U.latitud, U.longitud
				FROM persona U";

		$consulta = $objetoAccesoDato->RetornarConsulta($sql);
		$consulta->execute();

		$usuarios = $consulta->fetchall(PDO::FETCH_CLASS, 'Usuario');
		return $usuarios;
	}

	public static function TraerUsuarioLogueado($usuario){
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 

		$sql = "SELECT U.idPersona, U.nombre, U.email, U.perfil, U.password, U.foto, U.dni, U.idSucursal, U.estado, U.latitud, U.longitud
				FROM persona U
				WHERE U.email = :email AND U.password = :pass";

		$consulta = $objetoAccesoDato->RetornarConsulta($sql);
		$consulta->bindValue(":email", $usuario->usuario, PDO::PARAM_STR);
		$consulta->bindValue(":pass", $usuario->clave, PDO::PARAM_STR);
		$consulta->execute();

		$usuarioLogueado = $consulta->fetchObject('Usuario');
		return $usuarioLogueado;
	}

	public static function Agregar($usuario){
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 

		$sql = "INSERT INTO persona (nombre, email, password, perfil, foto, dni, idSucursal, estado, latitud, longitud)
				VALUES (:nombre, :email, :pass, :perfil, :foto, :dni, :idSucursal, :estado, :latitud, :longitud)";

		$consulta = $objetoAccesoDato->RetornarConsulta($sql);
		$consulta->bindValue(":nombre", $usuario->nombre, PDO::PARAM_STR);
		$consulta->bindValue(":email", $usuario->email, PDO::PARAM_STR);
		$consulta->bindValue(":pass", $usuario->password, PDO::PARAM_STR);
		$consulta->bindValue(":perfil", $usuario->perfil, PDO::PARAM_STR);
		$consulta->bindValue(":foto", $usuario->foto, PDO::PARAM_STR);
		$consulta->bindValue(":dni", $usuario->dni, PDO::PARAM_STR);
		$consulta->bindValue(":latitud", $usuario->latitud, PDO::PARAM_STR);
		$consulta->bindValue(":longitud", $usuario->longitud, PDO::PARAM_STR);
		$consulta->bindValue(":idSucursal", $usuario->idSucursal, PDO::PARAM_INT);
		$consulta->bindValue(":estado", $usuario->estado, PDO::PARAM_STR);
		$consulta->execute();
	}

	public static function Modificar($usuario){
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 

		$sql = "UPDATE persona
				SET nombre = :nombre, email = :email, password = :pass, perfil = :perfil, foto = :foto, dni = :dni, idSucursal = :idSucursal, estado = :estado, latitud=:latitud, longitud=:longitud
				WHERE idPersona = :idPersona";

		$consulta = $objetoAccesoDato->RetornarConsulta($sql);
		$consulta->bindValue(":nombre", $usuario->nombre, PDO::PARAM_STR);
		$consulta->bindValue(":email", $usuario->email, PDO::PARAM_STR);
		$consulta->bindValue(":pass", $usuario->password, PDO::PARAM_STR);
		$consulta->bindValue(":perfil", $usuario->perfil, PDO::PARAM_STR);
		$consulta->bindValue(":idPersona", $usuario->idPersona, PDO::PARAM_INT);
		$consulta->bindValue(":foto", $usuario->foto, PDO::PARAM_STR);
		$consulta->bindValue(":dni", $usuario->dni, PDO::PARAM_STR);
		$consulta->bindValue(":idSucursal", $usuario->idSucursal, PDO::PARAM_INT);
		$consulta->bindValue(":latitud", $usuario->latitud, PDO::PARAM_STR);
		$consulta->bindValue(":longitud", $usuario->longitud, PDO::PARAM_STR);
		$consulta->bindValue(":estado", $usuario->estado, PDO::PARAM_STR);
		$consulta->execute();

		$cantidad = $consulta->rowCount();
		return $cantidad;
	}

	public static function Eliminar($idPersona){
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 

		$sql = "DELETE FROM persona
				WHERE idPersona = :idPersona";

		$consulta = $objetoAccesoDato->RetornarConsulta($sql);
		$consulta->bindValue(":idPersona", $idPersona, PDO::PARAM_INT);
		$consulta->execute();

		$cantidad = $consulta->rowCount();
		return $cantidad;
	}
}
 ?>