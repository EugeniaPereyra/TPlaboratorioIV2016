// SERVICIOS
miAplicacion.factory('fPedidos', function (ServicioPedidos) {

  var objeto = {};
  objeto.traerTodo = traerTodo;
  objeto.Agregar = Agregar;
  objeto.Modificar = Modificar;
  objeto.Detallar = Detallar;
  objeto.Borrar = Borrar;

    function traerTodo () {
      return ServicioPedidos.traerTodo();
    }

    function Agregar(dato){
      return ServicioPedidos.Agregar(dato);
    }

    function Modificar(dato){
      return ServicioPedidos.Modificar(dato);
    }

    function Detallar(dato){
      return ServicioPedidos.Detallar(dato); 
    }
    
    function Borrar(dato){
      return ServicioPedidos.Borrar(dato);  
    }

    return objeto;
  })