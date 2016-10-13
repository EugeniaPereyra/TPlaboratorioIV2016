<?php 

include "clases/Usuario.php";
include "clases/Producto.php";
include "clases/Oferta.php";
include "clases/Pedido.php";

if(isset($_GET['accion']))
{
	$accion=$_GET['accion'];
	if($accion=="traer")
	{
		$respuesta= array();
		$respuesta['listado']=Usuario::TraerTodosLosUsuarios();
		$arrayJson = json_encode($respuesta);
		echo  $arrayJson;
	}	

	if($accion=="traerProd")
	{
		$respuesta= array();
		$respuesta['listado']=Producto::TraerTodosLosProductos();
		$arrayJson = json_encode($respuesta);
		echo  $arrayJson;
	}

	if($accion=="traerOfer")
	{
		$respuesta= array();
		$respuesta['listado']=Oferta::TraerTodosLasOfertas();
		$arrayJson = json_encode($respuesta);
		echo  $arrayJson;
	}

	if($accion=="traerPed")
	{
		$respuesta= array();
		$respuesta['listado']=Pedido::TraerTodosLosPedidos();
		$arrayJson = json_encode($respuesta);
		echo  $arrayJson;
	}

}
else{

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

			// ABM PEDIDO

			case "borrarPed":	
				Pedido::Borrar($respuesta->datos->pedido->idPedido);
				break;

			case "insertarPed":	
				Pedido::Insertar($respuesta->datos->pedido);
				break;
	
			case "modificarPed":
				Pedido::Modificar($respuesta->datos->pedido);
				break;
		}
	}
}

?>