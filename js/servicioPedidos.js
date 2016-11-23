// SERVICIOS
miAplicacion.service('ServicioPedidos', function ($http) {

    this.traerTodo = function () {
      return $http.get('http://localhost:8080/TPlaboratorioIV2016/ws/pedidos').then(function(respuesta) {    
         return respuesta.data.listado;    
      });
    }

    this.Agregar = function(dato){
      return $http.post('http://localhost:8080/TPlaboratorioIV2016/ws/pedido/'+dato).then(function(respuesta){
        return respuesta.data;
      })
    }

    this.Modificar = function(dato){
      return $http.put('http://localhost:8080/TPlaboratorioIV2016/ws/pedido/'+dato).then(function(respuesta){
        console.log(respuesta);
        return respuesta.data;
      }) 
    }

    this.Detallar = function(dato){
      return $http.get('http://localhost:8080/TPlaboratorioIV2016/ws/pedido/'+dato).then(function(respuesta){
        return respuesta.data;
      }) 
    }
    
    this.Borrar = function(dato){
      return $http.delete('http://localhost:8080/TPlaboratorioIV2016/ws/pedido/'+dato).then(function(respuesta){
        return respuesta.data;
      }) 
    }
  })