// SERVICIOS
miAplicacion.factory('fReservas', function (ServicioReservas) {

  var objeto = {};
  objeto.traerTodo = traerTodo;
  objeto.Agregar = Agregar;
  objeto.Modificar = Modificar;
  objeto.Detallar = Detallar;
  objeto.Borrar = Borrar;

    function traerTodo () {
      return ServicioReservas.traerTodo();
    }

    function Agregar(dato){
      return ServicioReservas.Agregar(dato);
    }

    function Modificar(dato){
      return ServicioReservas.Modificar(dato);
    }

    function Detallar(dato){
      return ServicioReservas.Detallar(dato); 
    }
    
    function Borrar(dato){
      return ServicioReservas.Borrar(dato);  
    }

    return objeto;
  })