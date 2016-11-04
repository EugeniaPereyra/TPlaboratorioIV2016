// PEDIDOS


miAplicacion.controller('controlPedidoAlta',function($scope, $http, $state, $stateParams){

      $scope.pedido={};
      $scope.pedido.idSucursal="";
      $scope.pedido.clienteNombre="";
      $scope.pedido.idPersona=0;
      $scope.pedido.total=0;
      $scope.pedido.cantidad=0;
      $scope.pedido.idOferta=0;
      $scope.pedido.idProducto=0;


      $http.get('http://localhost:8080/TPlaboratorioIV2016/ws/sucursales')
      .then(function(respuesta) {       
             $scope.ListadoSucursales = respuesta.data.listado;
             console.info(respuesta.data);
        },function errorCallback(response) {
             $scope.ListadoSucursales = [];
            console.log( response);     
       });

      $http.get('http://localhost:8080/TPlaboratorioIV2016/ws/productos')
      .then(function(respuesta) {       
             $scope.ListadoProductos = respuesta.data.listado;
             console.log(respuesta.data);
        },function errorCallback(response) {
             $scope.ListadoProductos = [];
            console.log( response);     
       });

      $http.get('http://localhost:8080/TPlaboratorioIV2016/ws/ofertas')
      .then(function(respuesta) {       
             $scope.ListadoOfertas = respuesta.data.listado;
             console.log(respuesta.data);
        },function errorCallback(response) {
             $scope.ListadoOfertas = [];
            console.log( response);     
       });

      $scope.Guardar=function(){
        if($scope.pedido.idProducto)
        {
          $scope.ListadoProductos.map(function(dato){
            if($scope.pedido.idProducto==dato.idProducto){
              $scope.pedido.total=$scope.pedido.cantidad * dato.precio;
            }
          })
        }
        if($scope.pedido.idOferta)
        {
          $scope.ListadoOfertas.map(function(dato){
            if($scope.pedido.idOferta==dato.idOferta){
              $scope.pedido.total=$scope.pedido.cantidad * dato.precio;
            }
          })
        }
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

miAplicacion.controller('controlPedidoGrilla',function($scope, $http, $state, $stateParams){
  $scope.idSucursal = $stateParams.id;

  $http.get('http://localhost:8080/TPlaboratorioIV2016/ws/pedidos')
  .then(function(respuesta) {       
         $scope.ListadoPedidos = respuesta.data.listado;
         console.log(respuesta.data);
    },function errorCallback(response) {
         $scope.ListadoPedidos= [];
        console.log( response);     
   });

      $http.get('http://localhost:8080/TPlaboratorioIV2016/ws/productos')
      .then(function(respuesta) {       
             $scope.ListadoProductos = respuesta.data.listado;
             console.log(respuesta.data);
        },function errorCallback(response) {
             $scope.ListadoProductos = [];
            console.log( response);     
       });

      $http.get('http://localhost:8080/TPlaboratorioIV2016/ws/ofertas')
      .then(function(respuesta) {       
             $scope.ListadoOfertas = respuesta.data.listado;
             console.log(respuesta.data);
        },function errorCallback(response) {
             $scope.ListadoOfertas = [];
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
  var listadoSucursales = [];
  var listadoUsuarios = [];

  $http.get('http://localhost:8080/TPlaboratorioIV2016/ws/pedido/'+dato.idPedido)
  .then(function(respuesta) {       
         $scope.pedido = respuesta.data;
         console.log(respuesta.data);
          $http.get('http://localhost:8080/TPlaboratorioIV2016/ws/sucursales')
            .then(function(respuesta) {       
                   listadoSucursales = respuesta.data.listado;
                   console.log(respuesta.data);
                   listadoSucursales.map(function(dato){
                      if($scope.pedido.idSucursal == dato.idSucursal)
                      {
                        $scope.pedido.sucursalDir = dato.direccion;
                        $scope.pedido.sucursalTel = dato.telefono;
                      }
                    });
              },function errorCallback(response) {
                   listadoSucursales = [];
                  console.log( response);     
             });
    },function errorCallback(response) {
        console.log( response);     
   });
});