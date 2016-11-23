// PRODUCTOS


miAplicacion.controller('controlProductoAlta',function($scope, FileUploader, $state, cargadorDeFotoProd, fProductos, fSucursales){

      $scope.uploader = new FileUploader({url: 'servidor/uploadProd.php'});
      $scope.uploader.queueLimit = 3;

      $scope.producto={};
      $scope.producto.descripcion= "producto" ;
      $scope.producto.precio=0 ;
      $scope.producto.foto1="default.jpg";
      $scope.producto.foto2="default.jpg";
      $scope.producto.foto3="default.jpg";
      $scope.producto.idSucursal="";
      $scope.ListadoSucursales = [];

      cargadorDeFotoProd.CargarFoto($scope.producto.foto1,$scope.producto.foto2,$scope.producto.foto3,$scope.uploader);

      fSucursales.traerTodo()
      .then(function(respuesta) {       
             $scope.ListadoSucursales = respuesta;
        },function errorCallback(response) {
             $scope.ListadoSucursales = [];
            console.log(response);     
       });
      
      $scope.Guardar = function(){
          if($scope.uploader.queue[0].file.name!='default.jpg')
          {
            var nombreFoto = $scope.uploader.queue[0].file.name;
            $scope.producto.foto1=nombreFoto;
          }
          if($scope.uploader.queue[1].file.name!='default.jpg')
          {
            var nombreFoto = $scope.uploader.queue[1].file.name;
            $scope.producto.foto2=nombreFoto;
          }
          if($scope.uploader.queue[2].file.name!='default.jpg')
          {
            var nombreFoto = $scope.uploader.queue[2].file.name;
            $scope.producto.foto3=nombreFoto;
          }

          $scope.uploader.uploadAll();
      }

      $scope.uploader.onErrorItem = function(fileItem, response, status, headers) {
           console.info('onErrorItem', fileItem, response, status, headers);
      };

      $scope.uploader.onCompleteAll = function() {
          var dato=JSON.stringify($scope.producto);
          fProductos.Agregar(dato)
          .then(function(respuesta) {             
               console.log("Se agrego el id "+respuesta);
               $state.go("persona.menu");
          },function errorCallback(response) {        
               console.log( response);           
          });
      };

});

miAplicacion.controller('controlProductoGrilla',function($scope, $state, $auth, fProductos){
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

    fProductos.traerTodo()
    .then(function(respuesta) {       
         $scope.ListadoProductos = respuesta;
    },function errorCallback(response) {
         $scope.ListadoProductos = [];
        console.log(response);     
    });

  $scope.Borrar=function(producto){
    var dato=JSON.stringify(producto);
    fProductos.Borrar(dato)
         .then(function(respuesta) {              
                 console.log("Producto borrado");
                  fProductos.traerTodo()
                  .then(function(respuesta) {       
                       $scope.ListadoProductos = respuesta;
                  },function errorCallback(response) {
                       $scope.ListadoProductos = [];
                      console.log( response);     
                  });
          },function errorCallback(response) {        
              console.log(response);           
      });
  }

  $scope.Modificar = function(producto){
    console.log( JSON.stringify(producto));
    var dato=JSON.stringify(producto);
    $state.go('persona.prodModificar', {producto:dato});
  }

  $scope.Informar = function(producto){
    console.log( JSON.stringify(producto));
    var dato=JSON.stringify(producto);
    $state.go('persona.prodDetallar', {producto:dato});
  }
});

miAplicacion.controller('controlProductoModificar',function($scope, $state, $stateParams, FileUploader, cargadorDeFotoProd, fProductos){
  $scope.uploader = new FileUploader({url: 'servidor/uploadProd.php'});
  $scope.uploader.queueLimit = 1;
  var dato=JSON.parse($stateParams.producto);
  $scope.producto={};
  $scope.producto.idProducto=dato.idProducto;
  $scope.producto.descripcion=dato.descripcion;
  $scope.producto.precio=dato.precio;
  $scope.producto.foto1=dato.foto1;
  $scope.producto.foto2=dato.foto2;
  $scope.producto.foto3=dato.foto3;

  cargadorDeFotoProd.CargarFoto($scope.producto.foto1,$scope.producto.foto2,$scope.producto.foto3,$scope.uploader);

      $scope.Guardar = function(){
          if($scope.uploader.queue[0].file.name!='default.jpg')
          {
            var nombreFoto = $scope.uploader.queue[0].file.name;
            $scope.producto.foto1=nombreFoto;
          }
          if($scope.uploader.queue[1].file.name!='default.jpg')
          {
            var nombreFoto = $scope.uploader.queue[1].file.name;
            $scope.producto.foto2=nombreFoto;
          }
          if($scope.uploader.queue[2].file.name!='default.jpg')
          {
            var nombreFoto = $scope.uploader.queue[2].file.name;
            $scope.producto.foto3=nombreFoto;
          }

          $scope.uploader.uploadAll();
      }

      $scope.uploader.onErrorItem = function(fileItem, response, status, headers) {
           console.info('onErrorItem', fileItem, response, status, headers);
      };

      $scope.uploader.onCompleteAll = function() {
          var dato=JSON.stringify($scope.producto);
          fProductos.Modificar(dato)
          .then(function(respuesta) {             
               console.log("producto modificado");
               $state.go("persona.prodGrilla");
          },function errorCallback(response) {        
               console.log( response);           
          });
      };

});

miAplicacion.controller('controlProductoDetallar',function($scope, $state, $stateParams, fProductos, fSucursales){
  var dato=JSON.parse($stateParams.producto);
  $scope.producto={};
  var listadoSucursales = [];

  fProductos.Detallar(dato.idProducto)
  .then(function(respuesta) {             
      $scope.producto = respuesta;
        fSucursales.traerTodo()
        .then(function(respuesta) {       
               listadoSucursales = respuesta;
               listadoSucursales.map(function(dato){
                      if($scope.producto.idSucursal == dato.idSucursal)
                      {
                        $scope.producto.sucursalDir = dato.direccion;
                        $scope.producto.sucursalTel = dato.telefono;
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