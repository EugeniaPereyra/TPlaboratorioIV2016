// SERVICIOS
miAplicacion.factory('fSucursales', function (ServicioSucursales) {

  var objeto = {};
  objeto.traerTodo = traerTodo;
  objeto.Agregar = Agregar;
  objeto.Modificar = Modificar;
  objeto.Detallar = Detallar;
  objeto.Borrar = Borrar;

    function traerTodo () {
      return ServicioSucursales.traerTodo();
    }

    function Agregar(dato){
      return ServicioSucursales.Agregar(dato);
    }

    function Modificar(dato){
      return ServicioSucursales.Modificar(dato);
    }

    function Detallar(dato){
      return ServicioSucursales.Detallar(dato); 
    }
    
    function Borrar(dato){
      return ServicioSucursales.Borrar(dato);  
    }

    return objeto;
  })