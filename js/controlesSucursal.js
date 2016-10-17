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
          $http.post('servidor/nexo.php', { datos: {accion :"insertarSuc",sucursal:$scope.sucursal}})
          .then(function(respuesta) {             
               console.log(respuesta.data);
               $state.go("persona.menu");
          },function errorCallback(response) {        
               console.log( response);           
          });
      };

});

miAplicacion.controller('controlSucursalGrilla',function($scope, $http, $state){
  $http.get('servidor/nexo.php', { params: {accion :"traerSuc"}})
  .then(function(respuesta) {       
         $scope.ListadoSucursales = respuesta.data.listado;
         console.log(respuesta.data);
    },function errorCallback(response) {
         $scope.ListadoSucursales = [];
        console.log( response);     
   });

  $scope.Borrar=function(sucursal){
    $http.post("servidor/nexo.php",{datos:{accion :"borrarSuc",sucursal:sucursal}})
         .then(function(respuesta) {              
                 console.log(respuesta.data);
                  $http.get('servidor/nexo.php', { params: {accion :"traerSuc"}})
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
          $http.post('servidor/nexo.php', { datos: {accion :"modificarSuc",sucursal:$scope.sucursal}})
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