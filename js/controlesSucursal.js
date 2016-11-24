// SUCURSALES


miAplicacion.controller('controlSucursalAlta',function($scope, FileUploader, $state, cargadorDeFotoSuc, fSucursales){

      $scope.uploader = new FileUploader({url: 'servidor/uploadSuc.php'});
      $scope.uploader.queueLimit = 3;

      $scope.sucursal={};
      $scope.sucursal.direccion= "Av. Cordoba 5432" ;
      $scope.sucursal.telefono= "4832-3030" ;
      $scope.sucursal.foto1="default.jpg";
      $scope.sucursal.foto2="default.jpg";
      $scope.sucursal.foto3="default.jpg";

      cargadorDeFotoSuc.CargarFoto($scope.sucursal.foto1,$scope.sucursal.foto2,$scope.sucursal.foto3,$scope.uploader);

      $scope.Guardar = function(){

          funcionGeo();

            if($scope.uploader.queue[0].file.name!='default.jpg')
            {
              var nombreFoto = $scope.uploader.queue[0].file.name;
              $scope.sucursal.foto1=nombreFoto;
            }
            if($scope.uploader.queue[1].file.name!='default.jpg')
            {
              var nombreFoto = $scope.uploader.queue[1].file.name;
              $scope.sucursal.foto2=nombreFoto;
            }
            if($scope.uploader.queue[2].file.name!='default.jpg')
            {
              var nombreFoto = $scope.uploader.queue[2].file.name;
              $scope.sucursal.foto3=nombreFoto;
            }

            $scope.uploader.uploadAll();


      }

      function funcionGeo(){
              var gCoder=new google.maps.Geocoder();
              var objInf = {
                address: $scope.sucursal.direccion
              }
              gCoder.geocode(objInf,fn_coder);
      }

      function fn_coder(datos){
        $scope.sucursal.latitud = datos[0].geometry.location.lat();
        $scope.sucursal.longitud = datos[0].geometry.location.lng();
      }

      $scope.uploader.onErrorItem = function(fileItem, response, status, headers) {
           console.info('onErrorItem', fileItem, response, status, headers);
      };

      $scope.uploader.onCompleteAll = function() {
          var dato=JSON.stringify($scope.sucursal);
          fSucursales.Agregar(dato)
          .then(function(respuesta) {             
              console.log("Se agregó la sucursal correctamente");
              $state.go("persona.menu");
          },function errorCallback(response) {        
              console.log(response);           
          });
      };
});

miAplicacion.controller('controlSucursalGrilla',function($scope, $state, $auth, fSucursales){
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

  fSucursales.traerTodo()
  .then(function(respuesta) {       
         $scope.ListadoSucursales = respuesta;
    },function errorCallback(response) {
         $scope.ListadoSucursales = [];
        console.log(response);     
   });

  $scope.Borrar=function(sucursal){
    var dato=JSON.stringify(sucursal);
    fSucursales.Borrar(dato)
    .then(function(respuesta){
      console.log("Sucursal borrada");
        fSucursales.traerTodo()
        .then(function(respuesta) {       
               $scope.ListadoSucursales = respuesta;
          },function errorCallback(response) {
               $scope.ListadoSucursales = [];
              console.log(response);     
         });
    },function errorCallback(response) {        
          console.log(response);           
    });
  }

  $scope.Modificar = function(sucursal){
    console.log( JSON.stringify(sucursal));
    var dato=JSON.stringify(sucursal);
    $state.go('persona.sucModificar', {sucursal:dato});
  }

  $scope.Informar = function(sucursal){
    console.log( JSON.stringify(sucursal));
    var dato=JSON.stringify(sucursal);
    $state.go('persona.sucDetallar', {sucursal:dato});
  }
});

miAplicacion.controller('controlSucursalModificar',function($scope, $state, $stateParams, FileUploader, cargadorDeFotoSuc, fSucursales){
  $scope.uploader = new FileUploader({url: 'servidor/uploadSuc.php'});
  $scope.uploader.queueLimit = 3;
  var dato=JSON.parse($stateParams.sucursal);
  $scope.sucursal={};
  $scope.sucursal.idSucursal=dato.idSucursal;
  $scope.sucursal.direccion=dato.direccion;
  $scope.sucursal.telefono=dato.telefono;
  $scope.sucursal.foto1=dato.foto1;
  $scope.sucursal.foto2=dato.foto2;
  $scope.sucursal.foto3=dato.foto3;
  $scope.sucursal.posicion=dato.posicion;
  
  cargadorDeFotoSuc.CargarFoto($scope.sucursal.foto1,$scope.sucursal.foto2,$scope.sucursal.foto3,$scope.uploader);

    $scope.Guardar = function(){
          if($scope.uploader.queue[0].file.name!='default.jpg')
          {
            var nombreFoto = $scope.uploader.queue[0].file.name;
            $scope.sucursal.foto1=nombreFoto;
          }
          if($scope.uploader.queue[1].file.name!='default.jpg')
          {
            var nombreFoto = $scope.uploader.queue[1].file.name;
            $scope.sucursal.foto2=nombreFoto;
          }
          if($scope.uploader.queue[2].file.name!='default.jpg')
          {
            var nombreFoto = $scope.uploader.queue[2].file.name;
            $scope.sucursal.foto3=nombreFoto;
          }

          $scope.uploader.uploadAll();
      }

      $scope.uploader.onErrorItem = function(fileItem, response, status, headers) {
           console.info('onErrorItem', fileItem, response, status, headers);
      };

      $scope.uploader.onCompleteAll = function() {
          console.info('Se cargo con exito');
          var dato=JSON.stringify($scope.sucursal);
            fSucursales.Modificar(dato)
            .then(function(respuesta) {             
                 console.log("Sucursal modificada correctamente");
                 $state.go("persona.sucGrilla");
            },function errorCallback(response) {        
                 console.log(response);           
            });
      };

});

miAplicacion.controller('controlSucursalDetallar',function($scope, $state, $stateParams, $auth, fSucursales, fPersonas){
  var dato=JSON.parse($stateParams.sucursal);
  $scope.sucursal={};
  $scope.datoMap=dato;
  $scope.ListadoEmpleados = [];
  $scope.mapa = {};
  $scope.mapa.latitud = "-34.662189";
  $scope.mapa.longitud = "-58.364643";

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

    fPersonas.traerTodo()
    .then(function(respuesta) {       
         $scope.ListadoEmpleados = respuesta;
    },function errorCallback(response) {
         $scope.ListadoEmpleados= [];
        console.log(response);     
    });

  fSucursales.Detallar(dato.idSucursal)
  .then(function(respuesta) {             
      $scope.sucursal = respuesta;
    },function errorCallback(response) {
        console.log(response);     
   });

  $scope.VerOfertas=function(){
    var dato = JSON.stringify($scope.sucursal);
    $state.go('persona.oferGrilla',{sucursal : dato});
  }

  $scope.VerPedidos=function(){
    var dato = JSON.stringify($scope.sucursal);
    $state.go('persona.pedGrilla',{sucursal : dato});
  }

});