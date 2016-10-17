// OFERTAS


miAplicacion.controller('controlOfertaAlta',function($scope, FileUploader, $http, $state, cargadorDeFotoOfer){

      $scope.uploader = new FileUploader({url: 'servidor/uploadOfer.php'});
      $scope.uploader.queueLimit = 1;

      $scope.oferta={};
      $scope.oferta.descripcion= "oferta" ;
      $scope.oferta.precio= "0.00" ;
      $scope.oferta.foto="default.jpg";

      cargadorDeFotoOfer.CargarFoto($scope.oferta.foto,$scope.uploader);

      $scope.Guardar = function(){
          if($scope.uploader.queue[0].file.name!='default.jpg')
          {
            var nombreFoto = $scope.uploader.queue[0].file.name;
            $scope.oferta.foto=nombreFoto;
          }

          $scope.uploader.uploadAll();
      }

      $scope.uploader.onErrorItem = function(fileItem, response, status, headers) {
           console.info('onErrorItem', fileItem, response, status, headers);
      };

      $scope.uploader.onCompleteAll = function() {
          console.info('Se cargo con exito');
          $http.post('servidor/nexo.php', { datos: {accion :"insertarOfer",oferta:$scope.oferta}})
          .then(function(respuesta) {             
               console.log(respuesta.data);
               $state.go("persona.menu");
          },function errorCallback(response) {        
               console.log( response);           
          });
      };

});

miAplicacion.controller('controlOfertaGrilla',function($scope, $http, $state){
  $http.get('servidor/nexo.php', { params: {accion :"traerOfer"}})
  .then(function(respuesta) {       
         $scope.ListadoProductos = respuesta.data.listado;
         console.log(respuesta.data);
    },function errorCallback(response) {
         $scope.ListadoProductos = [];
        console.log( response);     
   });

  $scope.Borrar=function(oferta){
    $http.post("servidor/nexo.php",{datos:{accion :"borrarOfer",oferta:oferta}})
         .then(function(respuesta) {              
                 console.log(respuesta.data);
                  $http.get('servidor/nexo.php', { params: {accion :"traerOfer"}})
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

  $scope.Modificar = function(oferta){
    console.log( JSON.stringify(oferta));
    var dato=JSON.stringify(oferta);
    $state.go('persona.oferModificar', {oferta:dato});
  }
});

miAplicacion.controller('controlOfertaModificar',function($scope, $http, $state, $stateParams, FileUploader, cargadorDeFotoOfer){
  $scope.uploader = new FileUploader({url: 'servidor/uploadOfer.php'});
  $scope.uploader.queueLimit = 1;
  var dato=JSON.parse($stateParams.oferta);
  $scope.oferta={};
  $scope.oferta.idOferta=dato.idOferta;
  $scope.oferta.descripcion=dato.descripcion;
  $scope.oferta.precio=dato.precio;
  $scope.oferta.foto=dato.foto;

  cargadorDeFotoOfer.CargarFoto($scope.oferta.foto,$scope.uploader);

      $scope.Guardar = function(){
          if($scope.uploader.queue[0].file.name!='default.jpg')
          {
            var nombreFoto = $scope.uploader.queue[0].file.name;
            $scope.oferta.foto=nombreFoto;
          }

          $scope.uploader.uploadAll();
      }

      $scope.uploader.onErrorItem = function(fileItem, response, status, headers) {
           console.info('onErrorItem', fileItem, response, status, headers);
      };

      $scope.uploader.onCompleteAll = function() {
          console.info('Se cargo con exito');
          $http.post('servidor/nexo.php', { datos: {accion :"modificarOfer",oferta:$scope.oferta}})
          .then(function(respuesta) 
          {      
            console.log(respuesta.data);
            $state.go("persona.oferGrilla");
          },
          function errorCallback(response)
          {
            console.log( response);           
          });
      };

});