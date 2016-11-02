// SUCURSALES


miAplicacion.controller('controlSucursalAlta',function($scope, FileUploader, $http, $state, cargadorDeFotoSuc){

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
          $http.post('http://localhost:8080/TPlaboratorioIV2016/ws/sucursal/'+dato)
          .then(function(respuesta) {             
               console.log(respuesta.data);
               $state.go("persona.menu");
          },function errorCallback(response) {        
               console.log( response);           
          });
      };

});

miAplicacion.controller('controlSucursalGrilla',function($scope, $http, $state, $auth){
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

  $http.get('http://localhost:8080/TPlaboratorioIV2016/ws/sucursales')
  .then(function(respuesta) {       
         $scope.ListadoSucursales = respuesta.data.listado;
         console.log(respuesta.data);
    },function errorCallback(response) {
         $scope.ListadoSucursales = [];
        console.log( response);     
   });

  $scope.Borrar=function(sucursal){
    var dato=JSON.stringify(sucursal);
    $http.delete('http://localhost:8080/TPlaboratorioIV2016/ws/sucursal/'+dato)
         .then(function(respuesta) {              
                 console.log(respuesta.data);
                  $http.get('http://localhost:8080/TPlaboratorioIV2016/ws/sucursales')
                  .then(function(respuesta) {       
                         $scope.ListadoSucursales = respuesta.data.listado;
                         console.log(respuesta.data);
                    },function errorCallback(response) {
                         $scope.ListadoSucursales = [];
                        console.log( response);     
                   });

          },function errorCallback(response) {        
              console.log( response);           
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

miAplicacion.controller('controlSucursalModificar',function($scope, $http, $state, $stateParams, FileUploader, cargadorDeFotoSuc){
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
          $http.put('http://localhost:8080/TPlaboratorioIV2016/ws/sucursal/'+dato)
          .then(function(respuesta) 
          {      
            console.log(respuesta.data);
            $state.go("persona.sucGrilla");
          },
          function errorCallback(response)
          {
            console.log( response);           
          });
      };

});

miAplicacion.controller('controlSucursalDetallar',function($scope, $http, $state, $stateParams){
  var dato=JSON.parse($stateParams.sucursal);
  $scope.sucursal={};

  $http.get('http://localhost:8080/TPlaboratorioIV2016/ws/sucursal/'+dato.idSucursal)
  .then(function(respuesta) {       
         $scope.sucursal = respuesta.data;
         console.log(respuesta.data);
    },function errorCallback(response) {
        console.log( response);     
   });
});