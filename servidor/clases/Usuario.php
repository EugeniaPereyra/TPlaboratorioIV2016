<?php 
require_once "AccesoDatos.php";
class Usuario{

	//ATRIBUTOS
	public $id;
	public $nombre;
	public $email;
	public $perfil;
	public $password;
	public $foto;

	//CONSTRUCTOR
	public function __construct($id = NULL)
	{
		if($id != NULL){
			$usuario = self::TraerUnUsuarioPorId($id);
			$this->id = $usuario->id;
			$this->nombre = $usuario->nombre;
			$this->email = $usuario->email;
			$this->perfil = $usuario->perfil;
			$this->password = $usuario->password;
			$this->foto = $suaurio->foto;
		}
	}

	//MÉTODOS
	public static function TraerUnUsuarioPorId($id){
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 

		$sql = "SELECT U.id, U.nombre, U.email, U.perfil, U.password, U.foto
				FROM persona U
				WHERE U.id = :id";

		$consulta = $objetoAccesoDato->RetornarConsulta($sql);
		$consulta->bindValue(":id", $id, PDO::PARAM_INT);
		$consulta->execute();

		$usuario = $consulta->fetchObject('Usuario');
		return $usuario;
	}

	public static function TraerTodosLosUsuarios(){
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 

		$sql = "SELECT U.id, U.nombre, U.email, U.perfil, U.password, U.foto
				FROM persona U";

		$consulta = $objetoAccesoDato->RetornarConsulta($sql);
		$consulta->execute();

		$usuarios = $consulta->fetchall(PDO::FETCH_CLASS, 'Usuario');
		return $usuarios;
	}

	public static function TraerUsuarioLogueado($usuario){
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 

		$sql = "SELECT U.id, U.nombre, U.email, U.perfil, U.password, U.foto
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

		$sql = "INSERT INTO persona (nombre, email, password, perfil, foto)
				VALUES (:nombre, :email, :pass, :perfil, :foto)";

		$consulta = $objetoAccesoDato->RetornarConsulta($sql);
		$consulta->bindValue(":nombre", $usuario->nombre, PDO::PARAM_STR);
		$consulta->bindValue(":email", $usuario->email, PDO::PARAM_STR);
		$consulta->bindValue(":pass", $usuario->password, PDO::PARAM_STR);
		$consulta->bindValue(":perfil", $usuario->perfil, PDO::PARAM_STR);
		$consulta->bindValue(":foto", $usuario->foto, PDO::PARAM_STR);
		$consulta->execute();
	}

	public static function Modificar($usuario){
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 

		$sql = "UPDATE persona
				SET nombre = :nombre, email = :email, password = :pass, perfil = :perfil, foto = :foto
				WHERE id = :id";

		$consulta = $objetoAccesoDato->RetornarConsulta($sql);
		$consulta->bindValue(":nombre", $usuario->nombre, PDO::PARAM_STR);
		$consulta->bindValue(":email", $usuario->email, PDO::PARAM_STR);
		$consulta->bindValue(":pass", $usuario->password, PDO::PARAM_STR);
		$consulta->bindValue(":perfil", $usuario->perfil, PDO::PARAM_STR);
		$consulta->bindValue(":id", $usuario->id, PDO::PARAM_INT);
		$consulta->bindValue(":foto", $usuario->foto, PDO::PARAM_STR);
		$consulta->execute();

		$cantidad = $consulta->rowCount();
		return $cantidad;
	}

	public static function Eliminar($id){
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 

		$sql = "DELETE FROM persona
				WHERE id = :id";

		$consulta = $objetoAccesoDato->RetornarConsulta($sql);
		$consulta->bindValue(":id", $id, PDO::PARAM_INT);
		$consulta->execute();

		$cantidad = $consulta->rowCount();
		return $cantidad;
	}
}
 ?>