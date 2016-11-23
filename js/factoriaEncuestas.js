// SERVICIOS
miAplicacion.factory('fEncuestas', function (ServicioEncuestas) {

  var objeto = {};
  objeto.traerTodo = traerTodo;
  objeto.Agregar = Agregar;
  objeto.Detallar = Detallar;
  objeto.Borrar = Borrar;

    function traerTodo () {
      return ServicioEncuestas.traerTodo();
    }

    function Agregar(dato){
      return ServicioEncuestas.Agregar(dato);
    }

    function Detallar(dato){
      return ServicioEncuestas.Detallar(dato); 
    }
    
    function Borrar(dato){
      return ServicioEncuestas.Borrar(dato);  
    }

    return objeto;
  })