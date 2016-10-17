// PEDIDOS


miAplicacion.controller('controlPedidoAlta',function($scope, $http, $state){

      $scope.pedido={};

      $http.get('http://localhost:8080/TPlaboratorioIV2016/ws/pedidos')
      .then(function(respuesta) {       
             $scope.ListadoProductos = respuesta.data.listado;
             console.log(respuesta.data);
        },function errorCallback(response) {
             $scope.ListadoProductos = [];
            console.log( response);     
       });

      $scope.Guardar=function(){
      var dato=JSON.stringify($scope.pedido);
      $http.post('http://localhost:8080/TPlaboratorioIV2016/ws/pedido/'+dato)
          .then(function(respuesta) {             
               console.log(respuesta.data);
               $state.go("persona.menu");
          },function errorCallback(response) {        
               console.log( response);           
          });
      }

});

miAplicacion.controller('controlPedidoGrilla',function($scope, $http, $state){
  $http.get('http://localhost:8080/TPlaboratorioIV2016/ws/pedidos')
  .then(function(respuesta) {       
         $scope.ListadoProductos = respuesta.data.listado;
         console.log(respuesta.data);
    },function errorCallback(response) {
         $scope.ListadoProductos = [];
        console.log( response);     
   });

  $scope.Borrar=function(pedido){
    $http.delete('http://localhost:8080/TPlaboratorioIV2016/ws/pedido/'+pedido.idPedido)
         .then(function(respuesta) {              
                 console.log(respuesta.data);
                  $http.get('http://localhost:8080/TPlaboratorioIV2016/ws/pedidos')
                  .then(function(respuesta) {       
                         $scope.ListadoProductos = respuesta.data.listado;
                         console.log(respuesta.data);
                    },function errorCallback(response) {
                         $scope.ListadoProductos = [];
                        console.log( response);     
                   });

          },function errorCallback(response) {        
              console.log( response);           
      });
  }

  $scope.Modificar = function(pedido){
    console.log( JSON.stringify(pedido));
    var dato=JSON.stringify(pedido);
    $state.go('persona.pedModificar', {pedido:dato});
  }

  $scope.Informar = function(pedido){
    console.log( JSON.stringify(pedido));
    var dato=JSON.stringify(pedido);
    $state.go('persona.pedDetallar', {pedido:dato});
  }
});

miAplicacion.controller('controlPedidoModificar',function($scope, $http, $state, $stateParams){
  var dato=JSON.parse($stateParams.pedido);
  $scope.pedido={};
  $scope.pedido.idPedido=dato.idPedido;
  $scope.pedido.producto=dato.producto;
  $scope.pedido.cantidad=dato.cantidad;


  $scope.Guardar = function(){
          var dato=JSON.stringify($scope.pedido);
          $http.put('http://localhost:8080/TPlaboratorioIV2016/ws/pedido/'+dato)
          .then(function(respuesta) 
          {      
            console.log(respuesta.data);
            $state.go("persona.pedGrilla");
          },
          function errorCallback(response)
          {
            console.log( response);           
          });
      };

});

miAplicacion.controller('controlPedidoDetallar',function($scope, $http, $state, $stateParams){
  var dato=JSON.parse($stateParams.pedido);
  $scope.pedido={};

  $http.get('http://localhost:8080/TPlaboratorioIV2016/ws/pedido/'+dato.idPedido)
  .then(function(respuesta) {       
         $scope.pedido = respuesta.data;
         console.log(respuesta.data);
    },function errorCallback(response) {
        console.log( response);     
   });
});