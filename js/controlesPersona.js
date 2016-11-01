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
    $scope.dato.usuario="administrador@administrador.com";
    $scope.dato.clave="123456";
  }

  $scope.Encargado=function(){
    $scope.dato.usuario="encargado@encargado.com";
    $scope.dato.clave="123456";
  }

  $scope.Empleado=function(){
    $scope.dato.usuario="empleado@empleado.com";
    $scope.dato.clave="123456";
  }

  $scope.Cliente=function(){
    $scope.dato.usuario="cliente@cliente.com";
    $scope.dato.clave="123456";
  }

});



// PERSONAS

miAplicacion.controller('controlPersona',function($scope, $auth, $state){
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

    $scope.Logout=function(){
      $auth.logout();
      $state.go('inicio');
    }
});

miAplicacion.controller('controlPersonaMenu',function($scope, $state, $auth){

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

miAplicacion.controller('controlPersonaAlta',function($scope, FileUploader, $http, $state, cargadorDeFoto, $auth){

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

      $scope.uploader = new FileUploader({url: 'servidor/upload.php'});
      $scope.uploader.queueLimit = 1;
      $scope.persona={};
      $scope.persona.nombre= "Natalia Natalia" ;
      $scope.persona.perfil= "cliente" ;
      $scope.persona.email= "natalia@natalia.com" ;
      $scope.persona.password= "123456" ;
      $scope.persona.foto="pordefecto.png";
      $scope.persona.dni=12345678;
       
      cargadorDeFoto.CargarFoto($scope.persona.foto,$scope.uploader);


      $scope.Guardar = function(){
          if($scope.uploader.queue[0].file.name!='pordefecto.png')
          {
            var nombreFoto = $scope.uploader.queue[0].file.name;
            $scope.persona.foto=nombreFoto;
          }

          $scope.uploader.uploadAll();
      }

        $scope.uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };

        $scope.uploader.onCompleteAll = function() {
            console.info('Se cargo con exito');
            var dato=JSON.stringify($scope.persona);
            $http.post('http://localhost:8080/TPlaboratorioIV2016/ws/usuario/'+dato)
            .then(function(respuesta) {             
                 console.log(respuesta.data);
                 $state.go("persona.menu");

            },function errorCallback(response) {        
                console.log( response);           
            });
        };

});

miAplicacion.controller('controlPersonaGrilla',function($scope, $http, $state){
  $http.get('http://localhost:8080/TPlaboratorioIV2016/ws/usuarios')
  .then(function(respuesta) {       
         $scope.ListadoPersonas = respuesta.data.listado;
         console.log(respuesta.data);
    },function errorCallback(response) {
         $scope.ListadoPersonas= [];
        console.log( response);     
   });

  $scope.Borrar=function(persona){
    //console.log("borrar"+persona);
    var dato=JSON.stringify(persona);
    $http.delete('http://localhost:8080/TPlaboratorioIV2016/ws/usuario/'+dato)
         .then(function(respuesta) {              
                 console.log(respuesta.data);
                  $http.get('http://localhost:8080/TPlaboratorioIV2016/ws/usuarios')
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

  $scope.Informar = function(persona){
    console.log( JSON.stringify(persona));
    var dato=JSON.stringify(persona);
    $state.go('persona.detallar', {persona:dato});
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
            var nombreFoto = $scope.uploader.queue[0].file.name;
            $scope.persona.foto=nombreFoto;
          }

          $scope.uploader.uploadAll();
      }

    $scope.uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };

    $scope.uploader.onCompleteAll = function() {
            console.info('Se cargo con exito');
            var dato=JSON.stringify($scope.persona);
            $http.put('http://localhost:8080/TPlaboratorioIV2016/ws/usuario/'+dato)
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

miAplicacion.controller('controlPersonaDetallar',function($scope, $http, $state, $stateParams){
  var dato=JSON.parse($stateParams.persona);
  $scope.usuario={};

  $http.get('http://localhost:8080/TPlaboratorioIV2016/ws/usuario/'+dato.idPersona)
  .then(function(respuesta) {       
         $scope.usuario = respuesta.data;
         console.log(respuesta.data);
    },function errorCallback(response) {
        console.log( response);     
   });
});
