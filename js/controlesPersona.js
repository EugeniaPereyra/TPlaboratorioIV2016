miAplicacion.controller('controlInicio',function($scope){
});

miAplicacion.controller('controlLogin',function($scope, $auth, $state){

  // $scope.authenticate = function(provider) {
  //   $auth.authenticate(provider);
  // };

  $scope.dato={};

  $scope.Login=function(){

    $auth.login(
            {
              usuario:$scope.dato.usuario,
              clave:$scope.dato.clave
            })

        .then( function(response){
          if($auth.isAuthenticated())
          {
            console.log("Logueado");
            console.info("Info login: ", $auth.getPayload());
            $state.go('persona.menu');
          }
          else
          {
            console.log("No logueado");
            console.info("Info login:",$auth.getPayload());
          }

        }, function(response){
           console.log(response);
        })
  }

  $scope.Administrador=function(){
    $scope.dato.usuario="pepe@pepe.com";
    $scope.dato.clave="123456";
  }

  $scope.Encargado=function(){
    $scope.dato.usuario="marty@marty.com";
    $scope.dato.clave="123456";
  }

  $scope.Empleado=function(){
    $scope.dato.usuario="maria@maria.com";
    $scope.dato.clave="123456";
  }

  $scope.Cliente=function(){
    $scope.dato.usuario="rob@rob.com";
    $scope.dato.clave="123456";
  }

});



// PERSONAS

miAplicacion.controller('controlPersona',function($scope, $auth, $state){
    if($auth.isAuthenticated()){
        console.log("Sesión iniciada!");
    }
    else{
        console.log("No hay sesión!");
        $state.go('login');
    }

    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };

    $scope.Logout=function(){
      $auth.logout();
      $state.go('inicio');
    }
});

miAplicacion.controller('controlPersonaMenu',function($scope, $state){

  $scope.IrAltaUsuario=function(){
    $state.go('persona.alta');
  }

  $scope.IrGrillaUsuario=function(){
    $state.go('persona.grilla');
  }

  $scope.IrAltaProducto=function(){
    $state.go('persona.prodAlta');
  }

  $scope.IrGrillaProducto=function(){
    $state.go('persona.prodGrilla');
  }

  $scope.IrAltaOferta=function(){
    $state.go('persona.oferAlta');
  }

  $scope.IrGrillaOferta=function(){
    $state.go('persona.oferGrilla');
  }

  $scope.IrAltaPedido=function(){
    $state.go('persona.pedAlta');
  }

  $scope.IrGrillaPedido=function(){
    $state.go('persona.pedGrilla');
  }

  $scope.IrAltaSucursal=function(){
    $state.go('persona.sucAlta');
  }

  $scope.IrGrillaSucursal=function(){
    $state.go('persona.sucGrilla');
  }
});

miAplicacion.controller('controlPersonaAlta',function($scope, FileUploader, $http, $state, cargadorDeFoto){

      $scope.uploader = new FileUploader({url: 'servidor/upload.php'});
      $scope.uploader.queueLimit = 1;
      $scope.persona={};
      $scope.persona.nombre= "natalia natalia" ;
      $scope.persona.perfil= "cliente" ;
      $scope.persona.email= "na@na.com" ;
      $scope.persona.password= "123456" ;
      $scope.persona.foto="pordefecto.png";
       
      cargadorDeFoto.CargarFoto($scope.persona.foto,$scope.uploader);


      $scope.Guardar = function(){
          if($scope.uploader.queue[0].file.name!='pordefecto.png')
          {
            var nombreFoto = $scope.uploader.queue[0]._file.name;
            $scope.persona.foto=nombreFoto;
          }

          $scope.uploader.uploadAll();
      }

        $scope.uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };

        $scope.uploader.onCompleteAll = function() {
            console.info('Se cargo con exito');
            $http.post('servidor/nexo.php', { datos: {accion :"insertar",persona:$scope.persona}})
            .then(function(respuesta) {             
                 console.log(respuesta.data);
                 $state.go("persona.menu");

            },function errorCallback(response) {        
                console.log( response);           
            });
        };

});

miAplicacion.controller('controlPersonaGrilla',function($scope, $http, $state){
  $http.get('servidor/nexo.php', { params: {accion :"traer"}})
  .then(function(respuesta) {       
         $scope.ListadoPersonas = respuesta.data.listado;
         console.log(respuesta.data);
    },function errorCallback(response) {
         $scope.ListadoPersonas= [];
        console.log( response);     
   });

  $scope.Borrar=function(persona){
    console.log("borrar"+persona);
    $http.post("servidor/nexo.php",{datos:{accion :"borrar",persona:persona}})
         .then(function(respuesta) {              
                 console.log(respuesta.data);
                  $http.get('servidor/nexo.php', { params: {accion :"traer"}})
                  .then(function(respuesta) {       
                         $scope.ListadoPersonas = respuesta.data.listado;
                         console.log(respuesta.data);
                    },function errorCallback(response) {
                         $scope.ListadoPersonas= [];
                        console.log( response);     
                   });

          },function errorCallback(response) {        
              console.log( response);           
      });
  }

  $scope.Modificar = function(persona){
    console.log( JSON.stringify(persona));
    var dato=JSON.stringify(persona);
    $state.go('persona.modificar', {persona:dato});
  }
});

miAplicacion.controller('controlPersonaModificar',function($scope, $http, $state, $stateParams, FileUploader, cargadorDeFoto){
  $scope.uploader = new FileUploader({url: 'servidor/upload.php'});
  $scope.uploader.queueLimit = 1;
  var dato=JSON.parse($stateParams.persona);
  $scope.persona={};
  $scope.persona.idPersona=dato.idPersona;
  $scope.persona.nombre=dato.nombre;
  $scope.persona.perfil=dato.perfil;
  $scope.persona.email=dato.email;
  $scope.persona.password=dato.password;
  $scope.persona.foto=dato.foto;

  cargadorDeFoto.CargarFoto($scope.persona.foto,$scope.uploader);

    $scope.Guardar = function(){
          if($scope.uploader.queue[0].file.name!='pordefecto.png')
          {
            var nombreFoto = $scope.uploader.queue[0]._file.name;
            $scope.persona.foto=nombreFoto;
          }

          $scope.uploader.uploadAll();
      }

    $scope.uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };

    $scope.uploader.onCompleteAll = function() {
            console.info('Se cargo con exito');
            $http.post('servidor/nexo.php', { datos: {accion :"modificar",persona:$scope.persona}})
              .then(function(respuesta) 
              {      
                console.log(respuesta.data);
                $state.go("persona.grilla");
              },
              function errorCallback(response)
              {
                console.log( response);           
              });
        }

});
