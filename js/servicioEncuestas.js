// SERVICIOS
miAplicacion.service('ServicioEncuestas', function ($http) {

    this.traerTodo = function () {
      return $http.get('http://localhost:8080/TPlaboratorioIV2016/ws/encuestas').then(function(respuesta) {    
         return respuesta.data.listado;    
      });
    }

    this.Agregar = function(dato){
      return $http.post('http://localhost:8080/TPlaboratorioIV2016/ws/encuesta/'+dato).then(function(respuesta){
        return respuesta.data;
      })
    }

    this.Detallar = function(dato){
      return $http.get('http://localhost:8080/TPlaboratorioIV2016/ws/encuesta/'+dato).then(function(respuesta){
        return respuesta.data;
      }) 
    }
    
    this.Borrar = function(dato){
      return $http.delete('http://localhost:8080/TPlaboratorioIV2016/ws/encuesta/'+dato).then(function(respuesta){
        return respuesta.data;
      }) 
    }
  })