<?php 

include "clases/Usuario.php";

// $_GET['accion'];
if(isset($_GET['accion']))
{
	$accion=$_GET['accion'];
	if($accion=="traer")
	{
		$respuesta= array();
		//$respuesta['listado']=Persona::TraerPersonasTest();
		$respuesta['listado']=Usuario::TraerTodosLosUsuarios();
		//var_dump(Persona::TraerTodasLasPersonas());
		$arrayJson = json_encode($respuesta);
		echo  $arrayJson;
	}	

}
else{
//var_dump($_REQUEST);
	//echo "<br>";
	//var_dump($_POST);
	/*
	$DatosPorPost = file_get_contents("php://input");
	$respuesta = json_decode($DatosPorPost);
	var_dump($respuesta);
*/
	//echo $respuesta->datos->persona->nombre;
	//Persona::InsertarPersona($respuesta->datos->persona);

	$DatosPorPost = file_get_contents("php://input");
	$respuesta = json_decode($DatosPorPost);

	if(isset($respuesta->datos->accion)){

		switch($respuesta->datos->accion)
		{
			case "borrar":	
				if($respuesta->datos->persona->foto!="pordefecto.png")
				 {
				 	unlink("../fotos/".$respuesta->datos->persona->foto);
				 }
				Usuario::Eliminar($respuesta->datos->persona->idPersona);
			break;

			case "insertar":	
				if($respuesta->datos->persona->foto!="pordefecto.png")
				{
					$rutaVieja="../fotos/".$respuesta->datos->persona->foto;
					$rutaNueva=$respuesta->datos->persona->nombre.".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
					copy($rutaVieja, "../fotos/".$rutaNueva);
					unlink($rutaVieja);
					$respuesta->datos->persona->foto=$rutaNueva;
				}
				Usuario::Agregar($respuesta->datos->persona);
			break;
	
			case "modificar":
			
				if($respuesta->datos->persona->foto!="pordefecto.png")
				{
					$rutaVieja="../fotos/".$respuesta->datos->persona->foto;
					$rutaNueva=$respuesta->datos->persona->nombre.".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
					copy($rutaVieja, "../fotos/".$rutaNueva);
					unlink($rutaVieja);
					$respuesta->datos->persona->foto=$rutaNueva;
				}
				Usuario::Modificar($respuesta->datos->persona);
				break;
		}
	}
}

?>