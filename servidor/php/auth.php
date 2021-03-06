<?php
require_once '../clases/Usuario.php';
include_once '../vendor/autoload.php';
use \Firebase\JWT\JWT;

$post=file_get_contents("php://input");
$respuesta=json_decode($post);

$usuarioLogueado = Usuario::TraerUsuarioLogueado($respuesta);

if($usuarioLogueado && $usuarioLogueado->estado!='bloqueado')
{
	$key = "1234";
	$token["id"] = $usuarioLogueado->idPersona;
	$token["nombre"] =$usuarioLogueado->nombre;
	$token["pass"] = $usuarioLogueado->password;
	$token["perfil"] = $usuarioLogueado->perfil;
	$token["email"] = $usuarioLogueado->email;
	$token["foto"] = $usuarioLogueado->foto;
	$token["dni"] = $usuarioLogueado->dni;
	$token["idSucursal"] = $usuarioLogueado->idSucursal;
	$token["estado"] = $usuarioLogueado->estado;
	$token["direccion"] = $usuarioLogueado->direccion;
	$token["latitud"] = $usuarioLogueado->latitud;
	$token["longitud"] = $usuarioLogueado->longitud;
	$token["exp"] = time()+5000;

	$jwt = JWT::encode($token, $key);
	$array["PizzeriaToken"]=$jwt;
}
else
{
	$array["PizzeriaToken"]=false;
}

echo( json_encode($array) );


die();


//--------------------------------------------------


$decoded = JWT::decode($jwt, $key, array('HS256'));

print_r($decoded);

/*
 NOTE: This will now be an object instead of an associative array. To get
 an associative array, you will need to cast it as such:
*/

$decoded_array = (array) $decoded;

/**
 * You can add a leeway to account for when there is a clock skew times between
 * the signing and verifying servers. It is recommended that this leeway should
 * not be bigger than a few minutes.
 *
 * Source: http://self-issued.info/docs/draft-ietf-oauth-json-web-token.html#nbfDef
 */
JWT::$leeway = 60; // $leeway in seconds
$decoded = JWT::decode($jwt, $key, array('HS256'));

?>