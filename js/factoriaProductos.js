// SERVICIOS
miAplicacion.factory('fProductos', function (ServicioProductos) {

  var objeto = {};
  objeto.traerTodo = traerTodo;
  objeto.Agregar = Agregar;
  objeto.Modificar = Modificar;
  objeto.Detallar = Detallar;
  objeto.Borrar = Borrar;

    function traerTodo () {
      return ServicioProductos.traerTodo();
    }

    function Agregar(dato){
      return ServicioProductos.Agregar(dato);
    }

    function Modificar(dato){
      return ServicioProductos.Modificar(dato);
    }

    function Detallar(dato){
      return ServicioProductos.Detallar(dato); 
    }
    
    function Borrar(dato){
      return ServicioProductos.Borrar(dato);  
    }

    return objeto;
  })