// PEDIDOS


miAplicacion.controller('controlPedidoAlta',function($scope, $state, $stateParams, $auth, fPedidos, fSucursales, fProductos, fOfertas){
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

      fSucursales.traerTodo()
      .then(function(respuesta) {       
             $scope.ListadoSucursales = respuesta;
        },function errorCallback(response) {
             $scope.ListadoSucursales = [];
            console.log(response);     
       });

      fProductos.traerTodo()
      .then(function(respuesta) {       
           $scope.ListadoProductos = respuesta;
      },function errorCallback(response) {
           $scope.ListadoProductos = [];
          console.log(response);     
      });

      fOfertas.traerTodo()
      .then(function(respuesta) {       
           $scope.ListadoOfertas = respuesta;
      },function errorCallback(response) {
           $scope.ListadoOfertas = [];
          console.log(response);     
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
        fPedidos.Agregar(dato)
        .then(function(respuesta) {             
            console.log("pedido agregado correctamente");
            if($scope.UsuarioLogueado.perfil=='cliente')
            {
              $state.go('persona.menu');
            }
            else
            {
              $state.go('persona.pedGrilla');
            }
          },function errorCallback(response) {        
            console.log( response);           
        });
      }

});

miAplicacion.controller('controlPedidoGrilla',function($scope, $state, $stateParams, $auth, fPedidos, fProductos, fOfertas){
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

      fPedidos.traerTodo()
      .then(function(respuesta) {       
           $scope.ListadoPedidos = respuesta;
      },function errorCallback(response) {
           $scope.ListadoPedidos = [];
          console.log(response);     
      });

      fProductos.traerTodo()
      .then(function(respuesta) {       
           $scope.ListadoProductos = respuesta;
      },function errorCallback(response) {
           $scope.ListadoProductos = [];
          console.log(response);     
      });

      fOfertas.traerTodo()
      .then(function(respuesta) {       
           $scope.ListadoOfertas = respuesta;
      },function errorCallback(response) {
           $scope.ListadoOfertas = [];
          console.log(response);     
      });
      

  $scope.Borrar=function(pedido){
    fPedidos.Borrar(pedido.idPedido)
    .then(function(respuesta) {              
        console.log("pedido borrado correctamente");
        fPedidos.traerTodo()
        .then(function(respuesta) {       
             $scope.ListadoPedidos = respuesta;
        },function errorCallback(response) {
             $scope.ListadoPedidos = [];
            console.log(response);     
        });
      },function errorCallback(response) {        
          console.log(response);           
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

miAplicacion.controller('controlPedidoModificar',function($scope, $state, $stateParams, fPedidos){
  var dato=JSON.parse($stateParams.pedido);
  console.log(dato);
  $scope.mostrarEstado=true;
  $scope.pedido={};
  $scope.pedido=dato;
  //console.info($scope.pedido);

  $scope.Guardar = function(){
        var datoPed=JSON.stringify($scope.pedido);
        fPedidos.Modificar(datoPed)
        .then(function(respuesta) {             
            console.log("pedido modificado correctamente");
            $state.go('persona.pedGrilla');
         },function errorCallback(response) {        
            console.log(response);           
        });
      }

});

miAplicacion.controller('controlPedidoDetallar',function($scope, $state, $stateParams, fPedidos, fSucursales){
  var dato=JSON.parse($stateParams.pedido);
  $scope.pedido={};
  var listadoSucursales = [];
  var listadoUsuarios = [];

  fPedidos.Detallar(dato.idPedido)
  .then(function(respuesta) {       
         $scope.pedido = respuesta;
         fSucursales.traerTodo()
          .then(function(respuesta) {       
                   listadoSucursales = respuesta;
                   listadoSucursales.map(function(dato){
                      if($scope.pedido.idSucursal == dato.idSucursal)
                      {
                        $scope.pedido.sucursalDir = dato.direccion;
                        $scope.pedido.sucursalTel = dato.telefono;
                      }
                    });
              },function errorCallback(response) {
                   listadoSucursales = [];
                  console.log(response);     
             });
    },function errorCallback(response) {
        console.log(response);     
   });      

});