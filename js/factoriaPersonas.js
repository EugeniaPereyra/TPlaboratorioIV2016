// SERVICIOS

miAplicacion.factory('fPersonas', function (ServicioPersonas) {

  var objeto = {};
  objeto.traerTodo = traerTodo;
  objeto.Agregar = Agregar;
  objeto.Modificar = Modificar;
  objeto.Detallar = Detallar;
  objeto.Borrar = Borrar;

    function traerTodo () {
      return ServicioPersonas.traerTodo();
    }

    function Agregar(dato){
      return ServicioPersonas.Agregar(dato);
    }

    function Modificar(dato){
      return ServicioPersonas.Modificar(dato);
    }

    function Detallar(dato){
      return ServicioPersonas.Detallar(dato); 
    }
    
    function Borrar(dato){
      return ServicioPersonas.Borrar(dato);  
    }

    return objeto;
  })