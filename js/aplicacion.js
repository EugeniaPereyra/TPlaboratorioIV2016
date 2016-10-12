var miAplicacion = angular.module('angularABM',['ui.router', 'angularFileUpload', 'satellizer']);

miAplicacion.config(function($stateProvider,$urlRouterProvider, $authProvider){

$authProvider.loginUrl='TPlaboratorioIV2016/servidor/php/auth.php';
$authProvider.tokenName='miToken';
$authProvider.tokenPrefix='angularABM';
$authProvider.authHearder='data';
// $authProvider.github({
//     clientId: 'e6ff35c81000243ceb47',
//     responseType: 'token'
//     });

  $stateProvider

        .state(
          'inicio',{
          url:'/inicio',
          templateUrl:'templates/inicio.html',
          controller:"controlInicio"
        })

        .state(
          'login',{
          url:'/login',
          templateUrl:'templates/login.html',
          controller:"controlLogin"
        })

        .state(
          'registro',{
          url:'/registro',
          templateUrl:'templates/persona/personaAlta.html',
          controller:'controlPersonaAlta'
        })


        // PERSONAS

        .state(
          'persona',{
          url:'/persona',
          abstract:true,
          templateUrl:'templates/persona/personaAbstracta.html',
          controller:'controlPersona'
        })

        .state(
          'persona.menu',{
          url:'/personaMenu',
          views:
          {
            'contenido':
            {
              templateUrl:'templates/persona/personaMenu.html',
              controller:'controlPersonaMenu'
            }
          }
        })

        .state(
          'persona.alta',{
          url:'/personaAlta',
          views:
          {
            'contenido':
            {
              templateUrl:'templates/persona/personaAlta.html',
              controller:'controlPersonaAlta'
            }
          }
        })

        .state(
          'persona.grilla',{
          url:'/personaGrilla',
          views:
          {
            'contenido':
            {
              templateUrl:'templates/persona/personaGrilla.html',
              controller:'controlPersonaGrilla'
            }
          }
        })

        .state(
          'persona.modificar',{
          url:'/personaModificar/:persona',
          views:
          {
            'contenido':
            {
              templateUrl:'templates/persona/personaAlta.html',
              controller:'controlPersonaModificar'
            }
          }
        })


        // PRODUCTOS

        .state(
          'persona.prodAlta',{
          url:'/productoAlta',
          views:
          {
            'contenido':
            {
              templateUrl:'templates/producto/productoAlta.html',
              controller:'controlProductoAlta'
            }
          }
        })

        .state(
          'persona.prodGrilla',{
          url:'/productoGrilla',
          views:
          {
            'contenido':
            {
              templateUrl:'templates/producto/productoGrilla.html',
              controller:'controlProductoGrilla'
            }
          }
        })

        .state(
          'persona.prodModificar',{
          url:'/productoModificar/:producto',
          views:
          {
            'contenido':
            {
              templateUrl:'templates/producto/productoAlta.html',
              controller:'controlProductoModificar'
            }
          }
        })


  $urlRouterProvider.otherwise('/inicio');


});


miAplicacion.controller('controlInicio',function($scope){
});

miAplicacion.controller('controlLogin',function($scope, $auth, $state){

    // $scope.authenticate = function(provider) {
    //   $auth.authenticate(provider);
    // };

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
});

miAplicacion.controller('controlPersonaAlta',function($scope, FileUploader, $http, $state, cargadoDeFoto){

        $scope.uploader = new FileUploader({url: 'servidor/upload.php'});
        $scope.uploader.queueLimit = 1;

        $scope.persona={};
        $scope.persona.nombre= "natalia" ;
        $scope.persona.perfil= "usuario" ;
        $scope.persona.email= "na@na.com" ;
        $scope.persona.password= "123456" ;
        $scope.persona.foto="pordefecto.png";
        
        cargadoDeFoto.CargarFoto($scope.persona.foto,$scope.uploader);


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

miAplicacion.controller('controlPersonaModificar',function($scope, $http, $state, $stateParams, FileUploader, cargadoDeFoto){
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

  cargadoDeFoto.CargarFoto($scope.persona.foto,$scope.uploader);

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



// PRODUCTOS


miAplicacion.controller('controlProductoAlta',function($scope, FileUploader, $http, $state){

        $scope.uploader = new FileUploader({url: 'servidor/upload.php'});
        $scope.uploader.queueLimit = 1;

        $scope.persona={};


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

miAplicacion.controller('controlProductoGrilla',function($scope, $http, $state){
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

miAplicacion.controller('controlProductoModificar',function($scope, $http, $state, $stateParams){
  var dato=JSON.parse($stateParams.persona);
  $scope.persona={};
  $scope.persona.id=dato.id;
  $scope.persona.nombre=dato.nombre;
  $scope.persona.perfil=dato.perfil;
  $scope.persona.email=dato.email;
  $scope.persona.password=dato.password;

  $scope.Guardar=function(){
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


// SERVICIOS

miAplicacion.service('cargadoDeFoto',function($http,FileUploader){
    this.CargarFoto=function(nombrefoto,objetoUploader){
        var direccion="fotos/"+nombrefoto;  
      $http.get(direccion,{responseType:"blob"})
        .then(function (respuesta){
            console.info("datos del cargar foto",respuesta);
            var mimetype=respuesta.data.type;
            var archivo=new File([respuesta.data],direccion,{type:mimetype});
            var dummy= new FileUploader.FileItem(objetoUploader,{});
            dummy._file=archivo;
            dummy.file={};
            dummy.file= new File([respuesta.data],nombrefoto,{type:mimetype});

              objetoUploader.queue.push(dummy);
         });
    }

});