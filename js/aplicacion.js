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


        // OFERTAS

        .state(
          'persona.oferAlta',{
          url:'/ofertaAlta',
          views:
          {
            'contenido':
            {
              templateUrl:'templates/producto/productoAlta.html',
              controller:'controlOfertaAlta'
            }
          }
        })

        .state(
          'persona.oferGrilla',{
          url:'/ofertaGrilla',
          views:
          {
            'contenido':
            {
              templateUrl:'templates/producto/productoGrilla.html',
              controller:'controlOfertaGrilla'
            }
          }
        })

        .state(
          'persona.oferModificar',{
          url:'/ofertaModificar/:oferta',
          views:
          {
            'contenido':
            {
              templateUrl:'templates/producto/productoAlta.html',
              controller:'controlOfertaModificar'
            }
          }
        })

        // PEDIDOS

        .state(
          'persona.pedAlta',{
          url:'/pedidoAlta',
          views:
          {
            'contenido':
            {
              templateUrl:'templates/pedido/pedidoAlta.html',
              controller:'controlPedidoAlta'
            }
          }
        })

        .state(
          'persona.pedGrilla',{
          url:'/pedidoGrilla',
          views:
          {
            'contenido':
            {
              templateUrl:'templates/pedido/pedidoGrilla.html',
              controller:'controlPedidoGrilla'
            }
          }
        })

        .state(
          'persona.pedModificar',{
          url:'/pedidoModificar/:pedido',
          views:
          {
            'contenido':
            {
              templateUrl:'templates/pedido/pedidoAlta.html',
              controller:'controlPedidoModificar'
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


miAplicacion.controller('controlProductoAlta',function($scope, FileUploader, $http, $state, cargadoDeFotoProd){

      $scope.uploader = new FileUploader({url: 'servidor/uploadProd.php'});
      $scope.uploader.queueLimit = 1;

      $scope.producto={};
      $scope.producto.descripcion= "producto" ;
      $scope.producto.precio= "0.00" ;
      $scope.producto.foto="default.jpg";

      cargadoDeFotoProd.CargarFoto($scope.producto.foto,$scope.uploader);

      $scope.Guardar = function(){
          if($scope.uploader.queue[0].file.name!='default.jpg')
          {
            var nombreFoto = $scope.uploader.queue[0]._file.name;
            $scope.producto.foto=nombreFoto;
          }

          $scope.uploader.uploadAll();
      }

      $scope.uploader.onErrorItem = function(fileItem, response, status, headers) {
           console.info('onErrorItem', fileItem, response, status, headers);
      };

      $scope.uploader.onCompleteAll = function() {
          console.info('Se cargo con exito');
          $http.post('servidor/nexo.php', { datos: {accion :"insertarProd",producto:$scope.producto}})
          .then(function(respuesta) {             
               console.log(respuesta.data);
               $state.go("persona.menu");
          },function errorCallback(response) {        
               console.log( response);           
          });
      };

});

miAplicacion.controller('controlProductoGrilla',function($scope, $http, $state){
  $http.get('servidor/nexo.php', { params: {accion :"traerProd"}})
  .then(function(respuesta) {       
         $scope.ListadoProductos = respuesta.data.listado;
         console.log(respuesta.data);
    },function errorCallback(response) {
         $scope.ListadoProductos = [];
        console.log( response);     
   });

  $scope.Borrar=function(producto){
    $http.post("servidor/nexo.php",{datos:{accion :"borrarProd",producto:producto}})
         .then(function(respuesta) {              
                 console.log(respuesta.data);
                  $http.get('servidor/nexo.php', { params: {accion :"traerProd"}})
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
});

miAplicacion.controller('controlProductoModificar',function($scope, $http, $state, $stateParams, FileUploader, cargadoDeFotoProd){
  $scope.uploader = new FileUploader({url: 'servidor/uploadProd.php'});
  $scope.uploader.queueLimit = 1;
  var dato=JSON.parse($stateParams.producto);
  $scope.producto={};
  $scope.producto.idProducto=dato.idProducto;
  $scope.producto.descripcion=dato.descripcion;
  $scope.producto.precio=dato.precio;
  $scope.producto.foto=dato.foto;

  cargadoDeFotoProd.CargarFoto($scope.producto.foto,$scope.uploader);

      $scope.Guardar = function(){
          if($scope.uploader.queue[0].file.name!='default.jpg')
          {
            var nombreFoto = $scope.uploader.queue[0]._file.name;
            $scope.producto.foto=nombreFoto;
          }

          $scope.uploader.uploadAll();
      }

      $scope.uploader.onErrorItem = function(fileItem, response, status, headers) {
           console.info('onErrorItem', fileItem, response, status, headers);
      };

      $scope.uploader.onCompleteAll = function() {
          console.info('Se cargo con exito');
          $http.post('servidor/nexo.php', { datos: {accion :"modificarProd",producto:$scope.producto}})
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




// OFERTAS


miAplicacion.controller('controlOfertaAlta',function($scope, FileUploader, $http, $state, cargadoDeFotoOfer){

      $scope.uploader = new FileUploader({url: 'servidor/uploadOfer.php'});
      $scope.uploader.queueLimit = 1;

      $scope.oferta={};
      $scope.oferta.descripcion= "oferta" ;
      $scope.oferta.precio= "0.00" ;
      $scope.oferta.foto="default.jpg";

      cargadoDeFotoOfer.CargarFoto($scope.oferta.foto,$scope.uploader);

      $scope.Guardar = function(){
          if($scope.uploader.queue[0].file.name!='default.jpg')
          {
            var nombreFoto = $scope.uploader.queue[0]._file.name;
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

miAplicacion.controller('controlOfertaModificar',function($scope, $http, $state, $stateParams, FileUploader, cargadoDeFotoOfer){
  $scope.uploader = new FileUploader({url: 'servidor/uploadOfer.php'});
  $scope.uploader.queueLimit = 1;
  var dato=JSON.parse($stateParams.oferta);
  $scope.oferta={};
  $scope.oferta.idOferta=dato.idOferta;
  $scope.oferta.descripcion=dato.descripcion;
  $scope.oferta.precio=dato.precio;
  $scope.oferta.foto=dato.foto;

  cargadoDeFotoOfer.CargarFoto($scope.oferta.foto,$scope.uploader);

      $scope.Guardar = function(){
          if($scope.uploader.queue[0].file.name!='default.jpg')
          {
            var nombreFoto = $scope.uploader.queue[0]._file.name;
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



// PEDIDOS


miAplicacion.controller('controlPedidoAlta',function($scope, $http, $state){

      $scope.pedido={};

      $http.get('servidor/nexo.php', { params: {accion :"traerProd"}})
      .then(function(respuesta) {       
             $scope.ListadoProductos = respuesta.data.listado;
             console.log(respuesta.data);
        },function errorCallback(response) {
             $scope.ListadoProductos = [];
            console.log( response);     
       });

      $scope.Guardar=function(){
      $http.post('servidor/nexo.php', { datos: {accion :"insertarPed",pedido:$scope.pedido}})
          .then(function(respuesta) {             
               console.log(respuesta.data);
               $state.go("persona.menu");
          },function errorCallback(response) {        
               console.log( response);           
          });
      }

});

miAplicacion.controller('controlPedidoGrilla',function($scope, $http, $state){
  $http.get('servidor/nexo.php', { params: {accion :"traerPed"}})
  .then(function(respuesta) {       
         $scope.ListadoProductos = respuesta.data.listado;
         console.log(respuesta.data);
    },function errorCallback(response) {
         $scope.ListadoProductos = [];
        console.log( response);     
   });

  $scope.Borrar=function(pedido){
    $http.post("servidor/nexo.php",{datos:{accion :"borrarPed",pedido:pedido}})
         .then(function(respuesta) {              
                 console.log(respuesta.data);
                  $http.get('servidor/nexo.php', { params: {accion :"traerPed"}})
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

  $scope.Modificar = function(pedido){
    console.log( JSON.stringify(pedido));
    var dato=JSON.stringify(pedido);
    $state.go('persona.pedModificar', {pedido:dato});
  }
});

miAplicacion.controller('controlPedidoModificar',function($scope, $http, $state, $stateParams){
  var dato=JSON.parse($stateParams.oferta);
  $scope.pedido={};
  $scope.pedido.idPedido=dato.idPedido;
  $scope.pedido.producto=dato.producto;
  $scope.pedido.cantidad=dato.cantidad;


  $scope.Guardar = function(){
          $http.post('servidor/nexo.php', { datos: {accion :"modificarPed",pedido:$scope.pedido}})
          .then(function(respuesta) 
          {      
            console.log(respuesta.data);
            $state.go("persona.pedGrilla");
          },
          function errorCallback(response)
          {
            console.log( response);           
          });
      };

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

miAplicacion.service('cargadoDeFotoProd',function($http,FileUploader){
    this.CargarFoto=function(nombrefoto,objetoUploader){
        var direccion="fotosProd/"+nombrefoto;  
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


miAplicacion.service('cargadoDeFotoOfer',function($http,FileUploader){
    this.CargarFoto=function(nombrefoto,objetoUploader){
        var direccion="fotosOfer/"+nombrefoto;  
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