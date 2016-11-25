miAplicacion.controller('controlInicio',function($scope){
});

miAplicacion.controller('controlLogin',function($scope, $auth, $state){

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
            console.log("Error en el token o usuario bloqueado");
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
    var dato = JSON.stringify($scope.UsuarioLogueado);
    $state.go('persona.pedAlta', {usuario:dato} );
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

  $scope.IrHistorial=function(){
    $state.go('persona.historial');
  }
  
  $scope.IrLocal=function(){
    $state.go('persona.sucGrilla');
  }

  $scope.IrEstadisticas=function(){
    $state.go('persona.estadisticaMenu');
  }
});

miAplicacion.controller('controlPersonaAlta',function($scope, FileUploader, $state, cargadorDeFoto, $auth, fPersonas, fSucursales){

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
      $scope.persona.perfil= "" ;
      $scope.persona.email= "natalia@natalia.com" ;
      $scope.persona.password= "123456" ;
      $scope.persona.foto="pordefecto.png";
      $scope.persona.dni=12345678;
      $scope.persona.idSucursal="";
      $scope.persona.estado="activo";
      $scope.ListadoSucursales = [];

      navigator.geolocation.getCurrentPosition(obtenerPosicion,error, {
          enableHighAccuracy: true,
          timeout: 30000,
          maximumAge: 30000
        });

      function obtenerPosicion(posicion){
            $scope.persona.latitud=posicion.coords.latitude;
            $scope.persona.longitud=posicion.coords.longitude;
      }

      function error(error){
        console.log(error);
      }
       
      cargadorDeFoto.CargarFoto($scope.persona.foto,$scope.uploader);

    fSucursales.traerTodo()
    .then(function(respuesta) {       
           $scope.ListadoSucursales = respuesta;
      },function errorCallback(response) {
           $scope.ListadoSucursales = [];
          console.log(response);     
     });

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
            var dato=JSON.stringify($scope.persona);
            fPersonas.Agregar(dato)
            .then(function(respuesta) {             
                 console.log("Se agregó al usuario correctamente");
                 $state.go("persona.menu");
            },function errorCallback(response) {        
                 console.log(response);           
            });
        };

});

miAplicacion.controller('controlPersonaGrilla',function($scope, $state, $auth, fPersonas, uiGridConstants){
    if($auth.isAuthenticated()){
      console.log("Sesión iniciada!");
      $scope.UsuarioLogueado= $auth.getPayload();
    }
    else{
      console.log("No hay sesión!");
      $state.go('login');
    }

    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };

    $scope.titulo = "Listado de Usuarios";
    $scope.gridOptions = {};
    $scope.gridOptions.paginationPageSizes = [10, 50, 75];
    $scope.gridOptions.paginationPageSize = 10;
    $scope.gridOptions.columnDefs = columnDefs();
    $scope.gridOptions.enableFiltering = true;
    $scope.gridOptions.rowHeight= 65;
    $scope.gridOptions.enableSorting= false;

   function columnDefs(){
            return [
                { field: 'foto', name: 'foto', cellTemplate:"<center><img style='line-height:3em;' width='40px' ng-src='fotos/{{grid.getCellValue(row, col)}}' lazy-src></center>", enableHiding: false, enableFiltering: false},
                { field: 'nombre',
                    filter:{
                        condition: uiGridConstants.filter.STARTS_WITH,
                        placeholder: 'Comienza con...'
                    }, enableHiding: false, enableFiltering: false
                },
                { field: 'perfil', name: 'perfil'
                  ,filter:{
                    type: uiGridConstants.filter.SELECT,
                    selectOptions:[
                      {value: 'administrador', label: 'Administrador'},
                      {value: 'encargado', label: 'Encargado'},
                      {value: 'empleado', label: 'Empleado'},
                      {value: 'cliente', label: 'Cliente'}
                    ]
                  }, cellFilter: 'perfil',enableHiding: false
                },
                { field: 'estado', name: 'estado'
                  ,filter:{
                    type: uiGridConstants.filter.SELECT,
                    selectOptions:[
                      {value: 'activo', label: 'Activo'},
                      {value: 'bloqueado', label: 'Bloqueado'}
                    ]
                  }, cellFilter: 'estado',enableHiding: false
                },        
                { field: 'Borrar', displayName: 'Borrar', cellTemplate:"<center><button class='btn btn-danger' style='line-height:3em; width:60px' ng-click='grid.appScope.Borrar(row.entity)'><span class='glyphicon glyphicon-remove-circle'></button></center>", enableHiding: false, enableFiltering: false},
                { field: 'Modificar', displayName: 'Modificar', cellTemplate:"<center><button class='btn btn-success' style='line-height:3em;width:60px' ng-click='grid.appScope.Modificar(row.entity)'><span class='glyphicon glyphicon-edit'></button></center>", enableHiding: false, enableFiltering: false},
                { field: 'Detalle', displayName: 'Detalle', cellTemplate:"<center><button class='btn btn-info' style='line-height:3em;width:60px' ng-click='grid.appScope.Informar(row.entity)'><span class='glyphicon glyphicon-list-alt'></button></center>", enableHiding: false, enableFiltering:false}
              ];
        };

    fPersonas.traerTodo()
    .then(function(respuesta){
          $scope.gridOptions.data = respuesta;
    },function errorCallback(response) {
        console.log(response);     
    }); 


  $scope.Borrar=function(row){
    var dato=JSON.stringify(row);
    fPersonas.Borrar(dato)
         .then(function(respuesta) {              
                 console.log("Usuario borrado");
                  fPersonas.traerTodo()
                  .then(function(respuesta) {       
                       $scope.gridOptions.data = respuesta;
                  },function errorCallback(response) {
                      console.log(response);     
                  });
          },function errorCallback(response) {        
              console.log(response);           
      });
  }

  $scope.Modificar = function(row){
    var dato=JSON.stringify(row);
    $state.go('persona.modificar', {persona:dato});
  }

  $scope.Informar = function(row){
    var dato=JSON.stringify(row);
    $state.go('persona.detallar', {persona:dato});
  }

});

miAplicacion.controller('controlPersonaModificar',function($scope, $state, $stateParams, FileUploader, cargadorDeFoto, $auth, fPersonas, fSucursales){
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
  var dato=JSON.parse($stateParams.persona);
  $scope.persona={};
  $scope.persona.idPersona=dato.idPersona;
  $scope.persona.nombre=dato.nombre;
  $scope.persona.perfil=dato.perfil;
  $scope.persona.email=dato.email;
  $scope.persona.password=dato.password;
  $scope.persona.foto=dato.foto;
  $scope.persona.dni=parseInt(dato.dni);
  $scope.persona.idSucursal=parseInt(dato.idSucursal);
  $scope.persona.estado=dato.estado;
  $scope.persona.latitud=dato.latitud;
  $scope.persona.longitud=dato.longitud;
  $scope.ListadoSucursales = [];

  cargadorDeFoto.CargarFoto($scope.persona.foto,$scope.uploader);

  fSucursales.traerTodo()
  .then(function(respuesta) {       
         $scope.ListadoSucursales = respuesta;
    },function errorCallback(response) {
         $scope.ListadoSucursales = [];
        console.log(response);     
   });

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
            var dato=JSON.stringify($scope.persona);
            fPersonas.Modificar(dato)
            .then(function(respuesta) {             
                 console.log("Usuario modificado correctamente");
                 $state.go("persona.menu");
            },function errorCallback(response) {        
                 console.log( response);           
            });
        }

});

miAplicacion.controller('controlPersonaDetallar',function($scope, $state, $stateParams, fPersonas, fSucursales){
  var dato=JSON.parse($stateParams.persona);
  $scope.usuario={};
  var listadoSucursales = [];

  fPersonas.Detallar(dato.idPersona)
  .then(function(respuesta) {             
      $scope.usuario = respuesta;
        fSucursales.traerTodo()
        .then(function(respuesta) {       
          listadoSucursales = respuesta;
          listadoSucursales.map(function(dato){
                    if($scope.usuario.idSucursal == dato.idSucursal)
                    {
                      $scope.usuario.sucursalDir = dato.direccion;
                      $scope.usuario.sucursalTel = dato.telefono;
                    }
            });
          },function errorCallback(response) {
                 listadoSucursales = [];
                console.log(response);     
        });
  },function errorCallback(response) {        
      console.log(response);           
  });
});

miAplicacion.controller('controlPersonaRegistro',function($scope, FileUploader, $state, cargadorDeFoto, fPersonas, fSucursales){

      $scope.uploader = new FileUploader({url: 'servidor/upload.php'});
      $scope.uploader.queueLimit = 1;
      $scope.persona={};
      $scope.persona.nombre= "Natalia Natalia" ;
      $scope.persona.perfil= "" ;
      $scope.persona.email= "natalia@natalia.com" ;
      $scope.persona.password= "123456" ;
      $scope.persona.foto="pordefecto.png";
      $scope.persona.idSucursal="";
      $scope.persona.dni=12345678;
      $scope.persona.estado="activo";
      $scope.ListadoSucursales = [];
       
      navigator.geolocation.getCurrentPosition(obtenerPosicion,error, {
          enableHighAccuracy: true,
          timeout: 30000,
          maximumAge: 30000
        });

      function obtenerPosicion(posicion){
            $scope.persona.latitud=posicion.coords.latitude;
            $scope.persona.longitud=posicion.coords.longitude;
      }

      function error(error){
        console.log(error);
      }
      cargadorDeFoto.CargarFoto($scope.persona.foto,$scope.uploader);

      fSucursales.traerTodo()
      .then(function(respuesta) {       
             $scope.ListadoSucursales = respuesta;
        },function errorCallback(response) {
             $scope.ListadoSucursales = [];
            console.log(response);     
       });

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
            fPersonas.Agregar(dato)
            .then(function(respuesta) {             
                 console.log("Se agregó al usuario correctamente");
                 $state.go("persona.menu");
            },function errorCallback(response) {        
                 console.log( response);           
            });
        };

});

miAplicacion.controller('controlPersonaHistorial',function($scope, $stateParams, $state, $auth, fPedidos){

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

    fPedidos.traerTodo()
    .then(function(respuesta) {       
           $scope.ListadoPedidos = respuesta;
      },function errorCallback(response) {
           $scope.ListadoPedidos= [];
          console.log(response);     
     });

    $scope.Responder = function(pedido){
      var dato=JSON.stringify(pedido);
      $state.go('persona.encuesta', {pedido:dato});
    }

});

miAplicacion.controller('controlPersonaEncuesta',function($scope, $state, $stateParams, fProductos, fPedidos, fEncuestas){

  var dato=JSON.parse($stateParams.pedido);
  console.log(dato);
  $scope.encuesta = {};
  $scope.encuesta.uno = "si";
  $scope.encuesta.dos = "mucho";
  $scope.encuesta.tres = "unico";
  $scope.encuesta.cuatro = "mucho";
  $scope.encuesta.cinco = "alta";
  $scope.encuesta.seis = "excelente";
  $scope.encuesta.siete = "mucho";
  $scope.encuesta.ocho = "primera_compra";
  $scope.encuesta.nueve = "mucho";
  $scope.encuesta.diez = "";
  $scope.encuesta.idProducto=dato.idProducto;

  fProductos.Detallar(dato.idProducto)
  .then(function(respuesta) {       
         $scope.producto = respuesta;
    },function errorCallback(response) {
        console.log(response);     
   }); 

   $scope.Guardar = function(){
        dato.encuesta="si";
        var datoPed=JSON.stringify(dato);
        fPedidos.Modificar(datoPed)
        .then(function(respuesta) {             
            console.log("pedido modificado correctamente");
         },function errorCallback(response) {        
            console.log(response);           
        });

        var datoEncuesta=JSON.stringify($scope.encuesta);
        console.info(datoEncuesta);
        fEncuestas.Agregar(datoEncuesta)
        .then(function(respuesta) {             
            console.log("Encuesta enviada correctamente");
            $state.go('persona.menu');
         },function errorCallback(response) {        
            console.log(response);           
        });
   } 

});