// OFERTAS


miAplicacion.controller('controlOfertaAlta',function($scope, FileUploader, $state, cargadorDeFotoOfer, fOfertas, fSucursales){

      $scope.uploader = new FileUploader({url: 'servidor/uploadOfer.php'});
      $scope.uploader.queueLimit = 3;

      $scope.producto={};
      $scope.producto.descripcion= "oferta" ;
      $scope.producto.precio= 0 ;
      $scope.producto.foto1="default.jpg";
      $scope.producto.foto2="default.jpg";
      $scope.producto.foto3="default.jpg";
      $scope.producto.idSucursal="";
      $scope.ListadoSucursales = [];

      cargadorDeFotoOfer.CargarFoto($scope.producto.foto1,$scope.producto.foto2,$scope.producto.foto3,$scope.uploader);

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
          fOfertas.Agregar(dato)
          .then(function(respuesta) {             
               console.log("Oferta agregada correctamente");
               $state.go("persona.menu");
          },function errorCallback(response) {        
               console.log(response);           
          });
      };

});

miAplicacion.controller('controlOfertaGrilla',function($scope, $state, $auth, $stateParams, fOfertas){
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

  $scope.verOfertas=false;
  $scope.verProductos=true;

  if($stateParams.sucursal != "")
  {
    var dato = JSON.parse($stateParams.sucursal);
    $scope.idSucursal= dato.idSucursal;
    $scope.verOfertas=true;
    $scope.verProductos=false;
  }

  fOfertas.traerTodo()
  .then(function(respuesta) {       
         $scope.ListadoProductos = respuesta;
    },function errorCallback(response) {
         $scope.ListadoProductos = [];
        console.log(response);     
   });

  $scope.Borrar=function(oferta){
    var dato=JSON.stringify(oferta);
    fOfertas.Borrar(dato)
    .then(function(respuesta) {              
        console.log("oferta borrada correctamente");
        fOfertas.traerTodo()
        .then(function(respuesta) {       
               $scope.ListadoProductos = respuesta;
          },function errorCallback(response) {
               $scope.ListadoProductos = [];
              console.log(response);     
         });
      },function errorCallback(response) {        
              console.log(response);           
    });
  }

  $scope.Modificar = function(oferta){
    console.log( JSON.stringify(oferta));
    var dato=JSON.stringify(oferta);
    $state.go('persona.oferModificar', {oferta:dato});
  }

  $scope.Informar = function(oferta){
    console.log( JSON.stringify(oferta));
    var dato=JSON.stringify(oferta);
    $state.go('persona.oferDetallar', {oferta:dato});
  }
});

miAplicacion.controller('controlOfertaModificar',function($scope, $state, $stateParams, FileUploader, cargadorDeFotoOfer, fOfertas){
  $scope.uploader = new FileUploader({url: 'servidor/uploadOfer.php'});
  $scope.uploader.queueLimit = 1;
  var dato=JSON.parse($stateParams.oferta);
  $scope.producto={};
  $scope.producto.idOferta=dato.idOferta;
  $scope.producto.descripcion=dato.descripcion;
  $scope.producto.precio=dato.precio;
  $scope.producto.foto1=dato.foto1;
  $scope.producto.foto2=dato.foto2;
  $scope.producto.foto3=dato.foto3;

  cargadorDeFotoOfer.CargarFoto($scope.producto.foto1,$scope.producto.foto2,$scope.producto.foto3,$scope.uploader);

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
          fOfertas.Modificar(dato)
          .then(function(respuesta){      
            console.log("oferta modificada");
            $state.go("persona.oferGrilla");
            },function errorCallback(response){
              console.log(response);           
          });
      };
});

miAplicacion.controller('controlOfertaDetallar',function($scope, $state, $stateParams, fOfertas, fSucursales){
  var dato=JSON.parse($stateParams.oferta);
  $scope.producto={};
  var listadoSucursales = [];


  fOfertas.Detallar(dato.idOferta)
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
                  console.log( response);     
             });
    },function errorCallback(response) {
        console.log(response);     
   });
});