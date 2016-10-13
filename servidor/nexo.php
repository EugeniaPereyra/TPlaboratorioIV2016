<?php 

include "clases/Usuario.php";
include "clases/Producto.php";
include "clases/Oferta.php";

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

	if($accion=="traerProd")
	{
		$respuesta= array();
		//$respuesta['listado']=Persona::TraerPersonasTest();
		$respuesta['listado']=Producto::TraerTodosLosProductos();
		//var_dump(Persona::TraerTodasLasPersonas());
		$arrayJson = json_encode($respuesta);
		echo  $arrayJson;
	}

	if($accion=="traerOfer")
	{
		$respuesta= array();
		//$respuesta['listado']=Persona::TraerPersonasTest();
		$respuesta['listado']=Oferta::TraerTodosLasOfertas();
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
			// ABM PERSONA

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

			// ABM PRODUCTO

			case "borrarProd":	
				if($respuesta->datos->producto->foto!="default.jpg")
				 {
				 	unlink("../fotosProd/".$respuesta->datos->producto->foto);
				 }
				Producto::Borrar($respuesta->datos->producto->idProducto);
			break;

			case "insertarProd":	
				if($respuesta->datos->producto->foto!="default.jpg")
				{
					$rutaVieja="../fotosProd/".$respuesta->datos->producto->foto;
					$rutaNueva=$respuesta->datos->producto->descripcion.".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
					copy($rutaVieja, "../fotosProd/".$rutaNueva);
					unlink($rutaVieja);
					$respuesta->datos->producto->foto=$rutaNueva;
				}
				Producto::Insertar($respuesta->datos->producto);
			break;
	
			case "modificarProd":
				if($respuesta->datos->producto->foto!="default.jpg")
				{
					$rutaVieja="../fotosProd/".$respuesta->datos->producto->foto;
					$rutaNueva=$respuesta->datos->producto->descripcion.".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
					copy($rutaVieja, "../fotosProd/".$rutaNueva);
					unlink($rutaVieja);
					$respuesta->datos->producto->foto=$rutaNueva;
				}
				Producto::Modificar($respuesta->datos->producto);
			break;

			// ABM OFERTA

			case "borrarOfer":	
				if($respuesta->datos->oferta->foto!="default.jpg")
				 {
				 	unlink("../fotosOfer/".$respuesta->datos->oferta->foto);
				 }
				Oferta::Borrar($respuesta->datos->oferta->idOferta);
			break;

			case "insertarOfer":	
				if($respuesta->datos->oferta->foto!="default.jpg")
				{
					$rutaVieja="../fotosOfer/".$respuesta->datos->oferta->foto;
					$rutaNueva=$respuesta->datos->oferta->descripcion.".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
					copy($rutaVieja, "../fotosOfer/".$rutaNueva);
					unlink($rutaVieja);
					$respuesta->datos->oferta->foto=$rutaNueva;
				}
				Oferta::Insertar($respuesta->datos->oferta);
			break;
	
			case "modificarOfer":
				if($respuesta->datos->oferta->foto!="default.jpg")
				{
					$rutaVieja="../fotosOfer/".$respuesta->datos->oferta->foto;
					$rutaNueva=$respuesta->datos->oferta->descripcion.".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
					copy($rutaVieja, "../fotosOfer/".$rutaNueva);
					unlink($rutaVieja);
					$respuesta->datos->oferta->foto=$rutaNueva;
				}
				Oferta::Modificar($respuesta->datos->oferta);
			break;
		}
	}
}

?>