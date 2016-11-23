<?php

/**
 * Step 1: Require the Slim Framework using Composer's autoloader
 *
 * If you are not using Composer, you need to load Slim Framework with your own
 * PSR-4 autoloader.
 */
require 'vendor/autoload.php';
require_once '../servidor/clases/Usuario.php';
require_once '../servidor/clases/Producto.php';
require_once '../servidor/clases/Oferta.php';
require_once '../servidor/clases/Pedido.php';
require_once '../servidor/clases/Sucursal.php';
require_once '../servidor/clases/Encuesta.php';

/**
 * Step 2: Instantiate a Slim application
 *
 * This example instantiates a Slim application using
 * its default settings. However, you will usually configure
 * your Slim application now by passing an associative array
 * of setting names and values into the application constructor.
 */
$app = new Slim\App();

/**
 * Step 3: Define the Slim application routes
 *
 * Here we define several Slim application routes that respond
 * to appropriate HTTP request methods. In this example, the second
 * argument for `Slim::get`, `Slim::post`, `Slim::put`, `Slim::patch`, and `Slim::delete`
 * is an anonymous function.
 */
/*
* GET: Para consultar y leer recursos
* POST: Para crear recursos
* PUT: Para editar recursos
* DELETE: Para eliminar recursos
 */

//---------------------------------------------------------------------
//---------------------------------------------------------------------
//---------------------------------------------------------------------

//---- USUARIOS ------

// TRAE TODOS
$app->get('/usuarios[/]', function ($request, $response, $args) {
    $respuesta['listado']=Usuario::TraerTodosLosUsuarios();
    $response->write(json_encode($respuesta));
    return $response;
});


// TRAE UNO
$app->get('/usuario/{id}', function ($request, $response, $args) {
    $respuesta=Usuario::TraerUnUsuarioPorId($args["id"]);
    $response->write(json_encode($respuesta));
    return $response;
});


// ALTA
$app->post('/usuario/{usuario}', function ($request, $response, $args) {
    $persona=json_decode($args["usuario"]);
    if($persona->foto!="pordefecto.png")
    {
        $rutaVieja="../fotos/".$persona->foto;
        $rutaNueva=$persona->dni.".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
        copy($rutaVieja, "../fotos/".$rutaNueva);
        unlink($rutaVieja);
        $persona->foto=$rutaNueva;
    }
    $response->write(Usuario::Agregar($persona));
    return $response;
});

// MODIFICA UNO
$app->put('/usuario/{usuario}', function ($request, $response, $args) {
    $persona=json_decode($args["usuario"]);
    if($persona->foto!="pordefecto.png")
    {
        $rutaVieja="../fotos/".$persona->foto;
        $rutaNueva=$persona->dni.".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
        copy($rutaVieja, "../fotos/".$rutaNueva);
        unlink($rutaVieja);
        $persona->foto=$rutaNueva;
    }
    $response->write(Usuario::Modificar($persona));
    return $response;
});

// BORRA UNO
$app->delete('/usuario/{usuario}', function ($request, $response, $args) {
    $persona=json_decode($args["usuario"]);
    if($persona->foto!="pordefecto.png")
    {
        unlink("../fotos/".$persona->foto);
    }
    $response->write(Usuario::Eliminar($persona->idPersona));
    return $response;
});


//---------------------------------------------------------------------
//---------------------------------------------------------------------
//---------------------------------------------------------------------

//---- PRODUCTOS ------

// TRAE TODOS
$app->get('/productos[/]', function ($request, $response, $args) {
    $respuesta['listado']=Producto::TraerTodosLosProductos();
    $response->write(json_encode($respuesta));
    return $response;
});


// TRAE UNO
$app->get('/producto/{id}', function ($request, $response, $args) {
    $respuesta=Producto::TraerUnProducto($args["id"]);
    $response->write(json_encode($respuesta));
    return $response;
});


// ALTA
$app->post('/producto/{producto}', function ($request, $response, $args){
    $producto=json_decode($args["producto"]);
    if($producto->foto1!="default.jpg")
    {
        $rutaVieja="../fotosProd/".$producto->foto1;
        $rutaNueva=$producto->descripcion."-foto1".".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
        copy($rutaVieja, "../fotosProd/".$rutaNueva);
        unlink($rutaVieja);
        $producto->foto1=$rutaNueva;
    }
    if($producto->foto2!="default.jpg")
    {
        $rutaVieja="../fotosProd/".$producto->foto2;
        $rutaNueva=$producto->descripcion."-foto2".".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
        copy($rutaVieja, "../fotosProd/".$rutaNueva);
        unlink($rutaVieja);
        $producto->foto2=$rutaNueva;
    }
    if($producto->foto3!="default.jpg")
    {
        $rutaVieja="../fotosProd/".$producto->foto3;
        $rutaNueva=$producto->descripcion."-foto3".".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
        copy($rutaVieja, "../fotosProd/".$rutaNueva);
        unlink($rutaVieja);
        $producto->foto3=$rutaNueva;
    }
    $response->write(Producto::Insertar($producto));
    return $response;
});

// MODIFICA UNO
$app->put('/producto/{producto}', function ($request, $response, $args) {
    $producto=json_decode($args["producto"]);
    if($producto->foto1!="default.jpg")
    {
        $rutaVieja="../fotosProd/".$producto->foto1;
        $rutaNueva=$producto->descripcion."-foto1".".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
        copy($rutaVieja, "../fotosProd/".$rutaNueva);
        unlink($rutaVieja);
        $producto->foto1=$rutaNueva;
    }
    if($producto->foto2!="default.jpg")
    {
        $rutaVieja="../fotosProd/".$producto->foto2;
        $rutaNueva=$producto->descripcion."-foto2".".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
        copy($rutaVieja, "../fotosProd/".$rutaNueva);
        unlink($rutaVieja);
        $producto->foto2=$rutaNueva;
    }
    if($producto->foto3!="default.jpg")
    {
        $rutaVieja="../fotosProd/".$producto->foto3;
        $rutaNueva=$producto->descripcion."-foto3".".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
        copy($rutaVieja, "../fotosProd/".$rutaNueva);
        unlink($rutaVieja);
        $producto->foto3=$rutaNueva;
    }
    $response->write(Producto::Modificar($producto));
    return $response;
});

// BORRA UNO
$app->delete('/producto/{producto}', function ($request, $response, $args) {
    $producto=json_decode($args["producto"]);
    if($producto->foto1!="default.jpg")
    {
        unlink("../fotosProd/".$producto->foto1);
    }
    if($producto->foto2!="default.jpg")
    {
        unlink("../fotosProd/".$producto->foto2);
    }
    if($producto->foto3!="default.jpg")
    {
        unlink("../fotosProd/".$producto->foto3);
    }
    $response->write(Producto::Borrar($producto->idProducto));
    return $response;
});


//---------------------------------------------------------------------
//---------------------------------------------------------------------
//---------------------------------------------------------------------

//---- OFERTAS ------

// TRAE TODOS
$app->get('/ofertas[/]', function ($request, $response, $args) {
    $respuesta['listado']=Oferta::TraerTodosLasOfertas();
    $response->write(json_encode($respuesta));
    return $response;
});


// TRAE UNO
$app->get('/oferta/{id}', function ($request, $response, $args) {
    $respuesta=Oferta::TraerUnaOferta($args["id"]);
    $response->write(json_encode($respuesta));
    return $response;
});


// ALTA
$app->post('/oferta/{oferta}', function ($request, $response, $args){
    $oferta=json_decode($args["oferta"]);
    if($oferta->foto!="default.jpg")
    {
        $rutaVieja="../fotosOfer/".$oferta->foto;
        $rutaNueva=$oferta->descripcion.".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
        copy($rutaVieja, "../fotosOfer/".$rutaNueva);
        unlink($rutaVieja);
        $oferta->foto=$rutaNueva;
    }
    $response->write(Oferta::Insertar($oferta));
    return $response;
});

// MODIFICA UNO
$app->put('/oferta/{oferta}', function ($request, $response, $args) {
    $oferta=json_decode($args["oferta"]);
    if($oferta->foto!="default.jpg")
    {
        $rutaVieja="../fotosOfer/".$oferta->foto;
        $rutaNueva=$oferta->descripcion.".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
        copy($rutaVieja, "../fotosOfer/".$rutaNueva);
        unlink($rutaVieja);
        $oferta->foto=$rutaNueva;
    }
    $response->write(Oferta::Modificar($oferta));
    return $response;
});

// BORRA UNO
$app->delete('/oferta/{oferta}', function ($request, $response, $args) {
    $oferta=json_decode($args["oferta"]);
    if($oferta->foto!="default.jpg")
    {
        unlink("../fotosOfer/".$oferta->foto);
    }
    $response->write(Oferta::Borrar($oferta->idOferta));
    return $response;
});


//---------------------------------------------------------------------
//---------------------------------------------------------------------
//---------------------------------------------------------------------

//---- PEDIDOS ------

// TRAE TODOS
$app->get('/pedidos[/]', function ($request, $response, $args) {
    $respuesta['listado']=Pedido::TraerTodosLosPedidos();
    $response->write(json_encode($respuesta));
    return $response;
});


// TRAE UNO
$app->get('/pedido/{id}', function ($request, $response, $args) {
    $respuesta=Pedido::TraerUnPedido($args["id"]);
    $response->write(json_encode($respuesta));
    return $response;
});


// ALTA
$app->post('/pedido/{pedido}', function ($request, $response, $args){
    $pedido=json_decode($args["pedido"]);
    $response->write(Pedido::Insertar($pedido));
    return $response;
});

// MODIFICA UNO
$app->put('/pedido/{pedido}', function ($request, $response, $args) {
    $pedido=json_decode($args["pedido"]);
    $response->write(Pedido::Modificar($pedido));
    return $response;
});

// BORRA UNO
$app->delete('/pedido/{id}', function ($request, $response, $args) {
    $response->write(Pedido::Borrar($args["id"]));
    return $response;
});


//---------------------------------------------------------------------
//---------------------------------------------------------------------
//---------------------------------------------------------------------

//---- SUCURSALES ------

// TRAE TODOS
$app->get('/sucursales[/]', function ($request, $response, $args) {
    $respuesta['listado']=Sucursal::TraerTodasLasSucursales();
    $response->write(json_encode($respuesta));
    return $response;
});


// TRAE UNO
$app->get('/sucursal/{id}', function ($request, $response, $args) {
    $respuesta=Sucursal::TraerUnaSucursal($args["id"]);
    $response->write(json_encode($respuesta));
    return $response;
});


// ALTA
$app->post('/sucursal/{sucursal}', function ($request, $response, $args){
    $sucursal=json_decode($args["sucursal"]);
    if($sucursal->foto1!="default.jpg")
    {
        $rutaVieja="../fotosSuc/".$sucursal->foto1;
        $rutaNueva=$sucursal->telefono."-foto1".".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
        copy($rutaVieja, "../fotosSuc/".$rutaNueva);
        unlink($rutaVieja);
        $sucursal->foto1=$rutaNueva;
    }
    if($sucursal->foto2!="default.jpg")
    {
        $rutaVieja="../fotosSuc/".$sucursal->foto2;
        $rutaNueva=$sucursal->telefono."-foto2".".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
        copy($rutaVieja, "../fotosSuc/".$rutaNueva);
        unlink($rutaVieja);
        $sucursal->foto2=$rutaNueva;
    }
    if($sucursal->foto3!="default.jpg")
    {
        $rutaVieja="../fotosSuc/".$sucursal->foto3;
        $rutaNueva=$sucursal->telefono."-foto3".".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
        copy($rutaVieja, "../fotosSuc/".$rutaNueva);
        unlink($rutaVieja);
        $sucursal->foto3=$rutaNueva;
    }
    $response->write(Sucursal::Insertar($sucursal));
    return $response;
});

// MODIFICA UNO
$app->put('/sucursal/{sucursal}', function ($request, $response, $args) {
    $sucursal=json_decode($args["sucursal"]);
    if($sucursal->foto1!="default.jpg")
    {
        $rutaVieja="../fotosSuc/".$sucursal->foto1;
        $rutaNueva=$sucursal->telefono."-foto1".".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
        copy($rutaVieja, "../fotosSuc/".$rutaNueva);
        unlink($rutaVieja);
        $sucursal->foto1=$rutaNueva;
    }
    if($sucursal->foto2!="default.jpg")
    {
        $rutaVieja="../fotosSuc/".$sucursal->foto2;
        $rutaNueva=$sucursal->telefono."-foto2".".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
        copy($rutaVieja, "../fotosSuc/".$rutaNueva);
        unlink($rutaVieja);
        $sucursal->foto2=$rutaNueva;
    }
    if($sucursal->foto3!="default.jpg")
    {
        $rutaVieja="../fotosSuc/".$sucursal->foto3;
        $rutaNueva=$sucursal->telefono."-foto3".".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
        copy($rutaVieja, "../fotosSuc/".$rutaNueva);
        unlink($rutaVieja);
        $sucursal->foto3=$rutaNueva;
    }
    $response->write(Sucursal::Modificar($sucursal));
    return $response;
});

// BORRA UNO
$app->delete('/sucursal/{sucursal}', function ($request, $response, $args){
        $sucursal=json_decode($args["sucursal"]);
        if($sucursal->foto1!="default.jpg")
        {
            unlink("../fotosSuc/".$sucursal->foto1);
        }
        if($sucursal->foto2!="default.jpg")
        {
            unlink("../fotosSuc/".$sucursal->foto2);
        }
        if($sucursal->foto3!="default.jpg")
        {
            unlink("../fotosSuc/".$sucursal->foto3);
        }
        $response->write(Sucursal::Borrar($sucursal->idSucursal));
        return $response;
});


//---------------------------------------------------------------------
//---------------------------------------------------------------------
//---------------------------------------------------------------------

//---- ENCUESTAS ------

// TRAE TODOS
$app->get('/encuestas[/]', function ($request, $response, $args) {
    $respuesta['listado']=Encuesta::TraerTodasLasEncuestas();
    $response->write(json_encode($respuesta));
    return $response;
});


// TRAE UNO
$app->get('/encuesta/{id}', function ($request, $response, $args) {
    $respuesta=Encuesta::TraerUnaEncuesta($args["id"]);
    $response->write(json_encode($respuesta));
    return $response;
});


// ALTA
$app->post('/encuesta/{encuesta}', function ($request, $response, $args){
    $encuesta=json_decode($args["encuesta"]);
    $response->write(Encuesta::Insertar($encuesta));
    return $response;
});

// BORRA UNO
$app->delete('/encuesta/{encuesta}', function ($request, $response, $args){
        $encuesta=json_decode($args["encuesta"]);
        $response->write(Encuesta::Borrar($encuesta->idEncuesta));
        return $response;
});


//---------------------------------------------------------------------


/**
 * Step 4: Run the Slim application
 *
 * This method should be called last. This executes the Slim application
 * and returns the HTTP response to the HTTP client.
 */
$app->run();
