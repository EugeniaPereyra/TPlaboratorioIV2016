// PEDIDOS


miAplicacion.controller('controlPedidoAlta',function($scope, $http, $state){

      $scope.pedido={};

      $http.get('servidor/nexo.php', { params: {accion :"traerProd"}})
      .then(function(respuesta) {       
             $scope.ListadoProductos = respuesta.data.listado;
             console.log(respuesta.data);
        },function errorCallback(response) {
             $scope.ListadoProductos = [];
            console.log( response);     
       });

      $scope.Guardar=function(){
      $http.post('servidor/nexo.php', { datos: {accion :"insertarPed",pedido:$scope.pedido}})
          .then(function(respuesta) {             
               console.log(respuesta.data);
               $state.go("persona.menu");
          },function errorCallback(response) {        
               console.log( response);           
          });
      }

});

miAplicacion.controller('controlPedidoGrilla',function($scope, $http, $state){
  $http.get('servidor/nexo.php', { params: {accion :"traerPed"}})
  .then(function(respuesta) {       
         $scope.ListadoProductos = respuesta.data.listado;
         console.log(respuesta.data);
    },function errorCallback(response) {
         $scope.ListadoProductos = [];
        console.log( response);     
   });

  $scope.Borrar=function(pedido){
    $http.post("servidor/nexo.php",{datos:{accion :"borrarPed",pedido:pedido}})
         .then(function(respuesta) {              
                 console.log(respuesta.data);
                  $http.get('servidor/nexo.php', { params: {accion :"traerPed"}})
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
});

miAplicacion.controller('controlPedidoModificar',function($scope, $http, $state, $stateParams){
  var dato=JSON.parse($stateParams.oferta);
  $scope.pedido={};
  $scope.pedido.idPedido=dato.idPedido;
  $scope.pedido.producto=dato.producto;
  $scope.pedido.cantidad=dato.cantidad;


  $scope.Guardar = function(){
          $http.post('servidor/nexo.php', { datos: {accion :"modificarPed",pedido:$scope.pedido}})
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