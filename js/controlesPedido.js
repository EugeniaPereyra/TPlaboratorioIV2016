// PEDIDOS


miAplicacion.controller('controlPedidoAlta',function($scope, $http, $state, $stateParams, $auth){
        if($auth.isAuthenticated()){
          console.log("Sesión iniciada!");
          $scope.UsuarioLogueado= $auth.getPayload();
          console.info($scope.UsuarioLogueado);
        }
        else{
          console.log("No hay sesión!");
          $state.go('login');
        }

        $scope.isAuthenticated = function() {
          return $auth.isAuthenticated();
        };

      $scope.mostrarEstado=false;
      $scope.pedido={};
      $scope.pedido.idSucursal="";
      $scope.pedido.clienteNombre="";
      $scope.pedido.idPersona=0;
      $scope.pedido.total=0;
      $scope.pedido.cantidad=0;
      $scope.pedido.idOferta=0;
      $scope.pedido.idProducto=0;
      $scope.pedido.sucursalDireccion = "";
      $scope.pedido.productoDescripcion = "";
      $scope.pedido.ofertaDescripcion = "";
      $scope.pedido.estado="En proceso";

      if($scope.UsuarioLogueado.perfil=='cliente')
      {
        $scope.pedido.clienteNombre=$scope.UsuarioLogueado.nombre;
        $scope.pedido.idPersona=$scope.UsuarioLogueado.id;
      }

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
          console.info($scope.pedido);
          if($scope.pedido.idSucursal != 0){
            var id = parseInt($scope.pedido.idSucursal);
            $scope.ListadoSucursales.map(function(dato){
              if(id==dato.idSucursal)
              {
                $scope.pedido.sucursalDireccion = dato.direccion;
              }
            })
          }
          if($scope.pedido.idProducto != 0){
            var id = parseInt($scope.pedido.idProducto);
            $scope.ListadoProductos.map(function(dato){
              if(id==dato.idProducto)
              {
                $scope.pedido.total=$scope.pedido.cantidad * dato.precio;
                $scope.pedido.productoDescripcion = dato.descripcion;
              }
            })
          }
          if($scope.pedido.idOferta != 0)
          {
            var id = parseInt($scope.pedido.idOferta);
            $scope.ListadoOfertas.map(function(dato){
              if(id==dato.idOferta)
              {
                $scope.pedido.total=$scope.pedido.cantidad * dato.precio;
                $scope.pedido.ofertaDescripcion = dato.descripcion;
              }
            })
          }
        var dato=JSON.stringify($scope.pedido);
        $http.post('http://localhost:8080/TPlaboratorioIV2016/ws/pedido/'+dato)
            .then(function(respuesta) {             
                 console.log(respuesta.data);
                 if($scope.UsuarioLogueado.perfil=='cliente')
                 {
                  alert("Pedido realizado correctamente");
                  $state.go('persona.menu');
                 }
                 else
                 {
                  alert("Pedido realizado correctamente");
                  $state.go('persona.pedGrilla');
                  }
            },function errorCallback(response) {        
                 console.log( response);           
            });
      }

});

miAplicacion.controller('controlPedidoGrilla',function($scope, $http, $state, $stateParams, $auth){
  $scope.sucursal={};
    $scope.sucursal.mostrarTodo=false;
    $scope.sucursal.mostrarPart=false;
        if($auth.isAuthenticated()){
          console.log("Sesión iniciada!");
          $scope.UsuarioLogueado= $auth.getPayload();
          console.info($scope.UsuarioLogueado);
        }
        else{
          console.log("No hay sesión!");
          $state.go('login');
        }

        $scope.isAuthenticated = function() {
          return $auth.isAuthenticated();
        };
  if($stateParams.sucursal != "")
  {
    var dato = JSON.parse($stateParams.sucursal);
    $scope.sucursal.idSucursal= dato.idSucursal;

    console.info($scope.sucursal.idSucursal);
    $scope.sucursal.mostrarTodo=false;
    $scope.sucursal.mostrarPart=true;
  }
  else
  {
    $scope.sucursal.idSucursal= $scope.UsuarioLogueado.idSucursal;
    $scope.sucursal.mostrarTodo=true;
    $scope.sucursal.mostrarPart=false;
  }

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
                         $scope.ListadoPedidos = respuesta.data.listado;
                         console.log(respuesta.data);
                    },function errorCallback(response) {
                         $scope.ListadoPedidos = [];
                        console.log( response);     
                   });

          },function errorCallback(response) {        
              console.log( response);           
      });
  }

  $scope.Modificar = function(pedido){
    var dato=JSON.stringify(pedido);
    $state.go('persona.pedModificar', {pedido:dato});
  }

  $scope.Informar = function(pedido){
    var dato=JSON.stringify(pedido);
    $state.go('persona.pedDetallar', {pedido:dato});
  }
});

miAplicacion.controller('controlPedidoModificar',function($scope, $http, $state, $stateParams){
  var dato=JSON.parse($stateParams.pedido);
  console.log(dato);
  $scope.mostrarEstado=true;
  $scope.pedido={};
  $scope.pedido=dato;
  console.info($scope.pedido);


  $scope.Guardar = function(){
        var datoPed=JSON.stringify($scope.pedido);
        $http.put('http://localhost:8080/TPlaboratorioIV2016/ws/pedido/'+datoPed)
            .then(function(respuesta) {             
                 console.log(respuesta.data);
                 $state.go('persona.pedGrilla');
            },function errorCallback(response) {        
                 console.log( response);           
            });
      }

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