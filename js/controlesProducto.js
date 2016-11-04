// PRODUCTOS


miAplicacion.controller('controlProductoAlta',function($scope, FileUploader, $http, $state, cargadorDeFotoProd){

      $scope.uploader = new FileUploader({url: 'servidor/uploadProd.php'});
      $scope.uploader.queueLimit = 1;

      $scope.producto={};
      $scope.producto.descripcion= "producto" ;
      $scope.producto.precio=0 ;
      $scope.producto.foto="default.jpg";
      $scope.producto.idSucursal="";
      $scope.ListadoSucursales = [];

      cargadorDeFotoProd.CargarFoto($scope.producto.foto,$scope.uploader);

      $http.get('http://localhost:8080/TPlaboratorioIV2016/ws/sucursales')
      .then(function(respuesta) {       
             $scope.ListadoSucursales = respuesta.data.listado;
             console.info(respuesta.data);
        },function errorCallback(response) {
             $scope.ListadoSucursales = [];
            console.log( response);     
       });
      
      $scope.Guardar = function(){
          if($scope.uploader.queue[0].file.name!='default.jpg')
          {
            var nombreFoto = $scope.uploader.queue[0].file.name;
            $scope.producto.foto=nombreFoto;
          }

          $scope.uploader.uploadAll();
      }

      $scope.uploader.onErrorItem = function(fileItem, response, status, headers) {
           console.info('onErrorItem', fileItem, response, status, headers);
      };

      $scope.uploader.onCompleteAll = function() {
          console.info('Se cargo con exito');
          var dato=JSON.stringify($scope.producto);
          $http.post('http://localhost:8080/TPlaboratorioIV2016/ws/producto/'+dato)
          .then(function(respuesta) {             
               console.log(respuesta.data);
               $state.go("persona.menu");
          },function errorCallback(response) {        
               console.log( response);           
          });
      };

});

miAplicacion.controller('controlProductoGrilla',function($scope, $http, $state, $auth){
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

  $http.get('http://localhost:8080/TPlaboratorioIV2016/ws/productos')
  .then(function(respuesta) {       
         $scope.ListadoProductos = respuesta.data.listado;
         console.log(respuesta.data);
    },function errorCallback(response) {
         $scope.ListadoProductos = [];
        console.log( response);     
   });

  $scope.Borrar=function(producto){
    var dato=JSON.stringify(producto);
    $http.delete('http://localhost:8080/TPlaboratorioIV2016/ws/producto/'+dato)
         .then(function(respuesta) {              
                 console.log(respuesta.data);
                  $http.get('http://localhost:8080/TPlaboratorioIV2016/ws/productos')
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

miAplicacion.controller('controlProductoModificar',function($scope, $http, $state, $stateParams, FileUploader, cargadorDeFotoProd){
  $scope.uploader = new FileUploader({url: 'servidor/uploadProd.php'});
  $scope.uploader.queueLimit = 1;
  var dato=JSON.parse($stateParams.producto);
  $scope.producto={};
  $scope.producto.idProducto=dato.idProducto;
  $scope.producto.descripcion=dato.descripcion;
  $scope.producto.precio=dato.precio;
  $scope.producto.foto=dato.foto;

  cargadorDeFotoProd.CargarFoto($scope.producto.foto,$scope.uploader);

      $scope.Guardar = function(){
          if($scope.uploader.queue[0].file.name!='default.jpg')
          {
            var nombreFoto = $scope.uploader.queue[0].file.name;
            $scope.producto.foto=nombreFoto;
          }

          $scope.uploader.uploadAll();
      }

      $scope.uploader.onErrorItem = function(fileItem, response, status, headers) {
           console.info('onErrorItem', fileItem, response, status, headers);
      };

      $scope.uploader.onCompleteAll = function() {
          console.info('Foto cargada correctamente');
          var dato=JSON.stringify($scope.producto);
          $http.put('http://localhost:8080/TPlaboratorioIV2016/ws/producto/'+dato)
          .then(function(respuesta) 
          {      
            console.log(respuesta.data);
            $state.go("persona.prodGrilla");
          },
          function errorCallback(response)
          {
            console.log( response);           
          });
      };

});

miAplicacion.controller('controlProductoDetallar',function($scope, $http, $state, $stateParams){
  var dato=JSON.parse($stateParams.producto);
  $scope.producto={};
  var listadoSucursales = [];

  $http.get('http://localhost:8080/TPlaboratorioIV2016/ws/producto/'+dato.idProducto)
  .then(function(respuesta) {       
         $scope.producto = respuesta.data;
         console.log(respuesta.data);
          $http.get('http://localhost:8080/TPlaboratorioIV2016/ws/sucursales')
            .then(function(respuesta) {       
                   listadoSucursales = respuesta.data.listado;
                   console.log(respuesta.data);
                   listadoSucursales.map(function(dato){
                      if($scope.producto.idSucursal == dato.idSucursal)
                      {
                        $scope.producto.sucursalDir = dato.direccion;
                        $scope.producto.sucursalTel = dato.telefono;
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