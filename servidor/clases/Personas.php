<?php 
require_once "AccesoDatos.php";

class Persona{

	//ATRIBUTOS
	public $id;
	public $nombre;
	public $email;
	public $password;

	//CONSTRUCTOR
	public function __construct($id = NULL)
	{
		if($id != NULL){
			$usuario = self::TraerUnPersonaPorId($id);
			$this->id = $usuario->id;
			$this->nombre = $usuario->nombre;
			$this->email = $usuario->email;
			$this->email = $usuario->password;
		}
	}

	//MÉTODOS
	public static function TraerUnPersonaPorId($id){
		$conexion = self::CrearConexion();

		$sql = "SELECT P.id, P.nombre, P.email, P.password
				FROM persona P
				WHERE P.id = :id";

		$consulta = $conexion->prepare($sql);
		$consulta->bindValue(":id", $id, PDO::PARAM_INT);
		$consulta->execute();

		$usuario = $consulta->fetchObject('Persona');
		return $usuario;
	}

	public static function TraerTodosLasPersonas(){
		$conexion = self::CrearConexion();

		$sql = "SELECT P.id, P.nombre, P.email, P.password
				FROM persona P";

		$consulta = $conexion->prepare($sql);
		$consulta->execute();

		$usuarios = $consulta->fetchall(PDO::FETCH_CLASS, 'Persona');
		return $usuarios;
	}

	public static function TraerPersonaLogueada($usuario){
		$conexion = self::CrearConexion();

		$sql = "SELECT P.id, P.nombre, P.email, P.password
				FROM persona P
				WHERE P.email = :email AND P.password = :pass";

		$consulta = $conexion->prepare($sql);
		$consulta->bindValue(":email", $usuario->usuario, PDO::PARAM_STR);
		$consulta->bindValue(":pass", $usuario->clave, PDO::PARAM_STR);
		$consulta->execute();

		$usuarioLogueado = $consulta->fetchObject('Persona');
		return $usuarioLogueado;
	}

	public static function Agregar($usuario){
		$conexion = self::CrearConexion();

		$sql = "INSERT INTO persona (nombre, email, password)
				VALUES (:nombre, :email, :pass)";

		$consulta = $conexion->prepare($sql);
		$consulta->bindValue(":nombre", $usuario->nombre, PDO::PARAM_STR);
		$consulta->bindValue(":email", $usuario->email, PDO::PARAM_STR);
		$consulta->bindValue(":pass", $usuario->pass, PDO::PARAM_STR);
		$consulta->execute();

		$idAgregado = $conexion->lastInsertId();
		return $idAgregado;
	}

	public static function Modificar($usuario){
		$conexion = self::CrearConexion();

		$sql = "UPDATE persona
				SET nombre = :nombre, email = :email, password = :pass
				WHERE id = :id";

		$consulta = $conexion->prepare($sql);
		$consulta->bindValue(":nombre", $usuario->nombre, PDO::PARAM_STR);
		$consulta->bindValue(":email", $usuario->email, PDO::PARAM_STR);
		$consulta->bindValue(":pass", $usuario->pass, PDO::PARAM_STR);
		$consulta->bindValue(":id", $usuario->id, PDO::PARAM_INT);
		$consulta->execute();

		$cantidad = $consulta->rowCount();
		return $cantidad;
	}

	public static function Eliminar($id){
		$conexion = self::CrearConexion();

		$sql = "DELETE FROM persona
				WHERE id = :id";

		$consulta = $conexion->prepare($sql);
		$consulta->bindValue(":id", $id, PDO::PARAM_INT);
		$consulta->execute();

		$cantidad = $consulta->rowCount();
		return $cantidad;
	}
}

?>
