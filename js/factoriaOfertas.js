// SERVICIOS
miAplicacion.factory('fOfertas', function (ServicioOfertas) {

  var objeto = {};
  objeto.traerTodo = traerTodo;
  objeto.Agregar = Agregar;
  objeto.Modificar = Modificar;
  objeto.Detallar = Detallar;
  objeto.Borrar = Borrar;

    function traerTodo () {
      return ServicioOfertas.traerTodo();
    }

    function Agregar(dato){
      return ServicioOfertas.Agregar(dato);
    }

    function Modificar(dato){
      return ServicioOfertas.Modificar(dato);
    }

    function Detallar(dato){
      return ServicioOfertas.Detallar(dato); 
    }
    
    function Borrar(dato){
      return ServicioOfertas.Borrar(dato);  
    }

    return objeto;
  })