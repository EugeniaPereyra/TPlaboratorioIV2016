// OFERTAS


miAplicacion.controller('controlOfertaAlta',function($scope, FileUploader, $http, $state, cargadorDeFotoOfer){

      $scope.uploader = new FileUploader({url: 'servidor/uploadOfer.php'});
      $scope.uploader.queueLimit = 1;

      $scope.producto={};
      $scope.producto.descripcion= "oferta" ;
      $scope.producto.precio= "0.00" ;
      $scope.producto.foto="default.jpg";

      cargadorDeFotoOfer.CargarFoto($scope.producto.foto,$scope.uploader);

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
          $http.post('http://localhost:8080/TPlaboratorioIV2016/ws/oferta/'+dato)
          .then(function(respuesta) {             
               console.log(respuesta.data);
               $state.go("persona.menu");
          },function errorCallback(response) {        
               console.log( response);           
          });
      };

});

miAplicacion.controller('controlOfertaGrilla',function($scope, $http, $state){
  $http.get('http://localhost:8080/TPlaboratorioIV2016/ws/ofertas')
  .then(function(respuesta) {       
         $scope.ListadoProductos = respuesta.data.listado;
         console.log(respuesta.data);
    },function errorCallback(response) {
         $scope.ListadoProductos = [];
        console.log( response);     
   });

  $scope.Borrar=function(oferta){
    var dato=JSON.stringify(oferta);
    $http.delete('http://localhost:8080/TPlaboratorioIV2016/ws/oferta/'+dato)
         .then(function(respuesta) {              
                 console.log(respuesta.data);
                  $http.get('http://localhost:8080/TPlaboratorioIV2016/ws/ofertas')
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

  $scope.Informar = function(oferta){
    console.log( JSON.stringify(oferta));
    var dato=JSON.stringify(oferta);
    $state.go('persona.oferDetallar', {oferta:dato});
  }
});

miAplicacion.controller('controlOfertaModificar',function($scope, $http, $state, $stateParams, FileUploader, cargadorDeFotoOfer){
  $scope.uploader = new FileUploader({url: 'servidor/uploadOfer.php'});
  $scope.uploader.queueLimit = 1;
  var dato=JSON.parse($stateParams.oferta);
  $scope.producto={};
  $scope.producto.idOferta=dato.idOferta;
  $scope.producto.descripcion=dato.descripcion;
  $scope.producto.precio=dato.precio;
  $scope.producto.foto=dato.foto;

  cargadorDeFotoOfer.CargarFoto($scope.producto.foto,$scope.uploader);

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
          $http.put('http://localhost:8080/TPlaboratorioIV2016/ws/oferta/'+dato)
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

miAplicacion.controller('controlOfertaDetallar',function($scope, $http, $state, $stateParams){
  var dato=JSON.parse($stateParams.oferta);
  $scope.producto={};

  $http.get('http://localhost:8080/TPlaboratorioIV2016/ws/oferta/'+dato.idOferta)
  .then(function(respuesta) {       
         $scope.producto = respuesta.data;
         console.log(respuesta.data);
    },function errorCallback(response) {
        console.log( response);     
   });
});