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

  $scope.IrAltaReserva=function(){
    $state.go('persona.reservaAlta');
  }

  $scope.IrGrillaSucursal=function(){
    $state.go('persona.sucGrilla');
  }

  $scope.IrGrillaReserva=function(){
    $state.go('persona.reservaGrilla');
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

miAplicacion.controller('controlPersonaAlta',function($scope, FileUploader, $state, cargadorDeFoto, $auth, fPersonas, fSucursales, $timeout){

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
      $scope.persona.direccion="Av. Mitre 707 Avellaneda Buenos Aires";
      $scope.persona.latitud=0;
      $scope.persona.longitud=0;
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
        funcionGeo();
          if($scope.uploader.queue[0].file.name!='pordefecto.png')
          {
            var nombreFoto = $scope.uploader.queue[0].file.name;
            $scope.persona.foto=nombreFoto;
          }

          $scope.uploader.uploadAll();
      }

      function funcionGeo(){
              var gCoder=new google.maps.Geocoder();
              var objInf = {
                address: $scope.persona.direccion
              }
              gCoder.geocode(objInf,fn_coder);
      }

      function fn_coder(datos){
        $scope.persona.latitud = datos[0].geometry.location.lat();
        $scope.persona.longitud = datos[0].geometry.location.lng();
      }

        $scope.uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };

        $scope.uploader.onCompleteAll = function() {
          $timeout(function(){
            var dato=JSON.stringify($scope.persona);
            fPersonas.Agregar(dato)
            .then(function(respuesta) {             
                 console.log("Se agregó al usuario correctamente");
                 $state.go("persona.menu");
            },function errorCallback(response) {        
                 console.log(response);           
            });
          },1000);
        };

});

miAplicacion.controller('controlPersonaGrilla',function($scope, $state, $auth, fPersonas, uiGridConstants, i18nService){
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
    $scope.gridOptions = {
      exporterCsvFilename: 'usuarios.csv',
      exporterCsvColumnSeparator: ';',
      exporterPdfDefaultStyle: {fontSize: 9},
      exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
      exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
      exporterPdfHeader: { text: "Listado de Usuarios", style: 'headerStyle' },
      exporterPdfFooter: function ( currentPage, pageCount ) {
        return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
      },
      exporterPdfCustomFormatter: function ( docDefinition ) {
        docDefinition.styles.headerStyle = { fontSize: 22, bold: true };
        docDefinition.styles.footerStyle = { fontSize: 10, bold: true };
        return docDefinition;
      },
      exporterPdfOrientation: 'portrait',
      exporterPdfPageSize: 'LETTER',
      exporterPdfMaxGridWidth: 500,
      exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
      onRegisterApi: function(gridApi){
        $scope.gridApi = gridApi;
      }
    };
    $scope.gridOptions.enableGridMenu = true;
    $scope.gridOptions.selectAll = true;
    $scope.gridOptions.paginationPageSizes = [10, 50, 75];
    $scope.gridOptions.paginationPageSize = 10;
    $scope.gridOptions.columnDefs = columnDefs();
    $scope.gridOptions.enableFiltering = true;
    $scope.gridOptions.rowHeight= 70;
    $scope.gridOptions.enableSorting= false;
    i18nService.setCurrentLang('es');
    var usuarios = [];
    var puente = [];

   function columnDefs(){
    if($scope.UsuarioLogueado.perfil=='empleado')
    {
        return [
                { field: 'foto', name: 'foto', cellTemplate:"<center><img style='line-height:3em;' width='70px' ng-src='fotos/{{grid.getCellValue(row, col)}}' lazy-src></center>", enableFiltering: false},
                { field: 'nombre',
                    filter:{
                        condition: uiGridConstants.filter.STARTS_WITH,
                        placeholder: 'Comienza con...'
                    }
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
                  }, cellFilter: 'perfil'
                },
                { field: 'estado', name: 'estado'
                  ,filter:{
                    type: uiGridConstants.filter.SELECT,
                    selectOptions:[
                      {value: 'activo', label: 'Activo'},
                      {value: 'bloqueado', label: 'Bloqueado'}
                    ]
                  }, cellFilter: 'estado'
                },    
                { field: 'email', name: 'email', enableFiltering: false},  
                { field: 'dni', name: 'dni', enableFiltering: false},   
                { field: 'Detalle', displayName: 'Detalle', cellTemplate:"<center><button class='btn btn-info' style='height:60px;width:70px;margin-top:5px' ng-click='grid.appScope.Informar(row.entity)'><span class='glyphicon glyphicon-list-alt'></button></center>", enableFiltering: false}
              ];
    }
    else
    {
            return [
                { field: 'foto', name: 'foto', cellTemplate:"<center><img style='line-height:3em;' width='70px' ng-src='fotos/{{grid.getCellValue(row, col)}}' lazy-src></center>", enableFiltering: false},
                { field: 'nombre',
                    filter:{
                        condition: uiGridConstants.filter.STARTS_WITH,
                        placeholder: 'Comienza con...'
                    }
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
                  }, cellFilter: 'perfil'
                },
                { field: 'estado', name: 'estado'
                  ,filter:{
                    type: uiGridConstants.filter.SELECT,
                    selectOptions:[
                      {value: 'activo', label: 'Activo'},
                      {value: 'bloqueado', label: 'Bloqueado'}
                    ]
                  }, cellFilter: 'estado'
                },    
                { field: 'email', name: 'email', enableFiltering: false},  
                { field: 'dni', name: 'dni', enableFiltering: false},   
                { field: 'Borrar', displayName: 'Borrar', cellTemplate:"<center><button class='btn btn-danger' style='height:60px; width:70px;margin-top:5px' ng-click='grid.appScope.Borrar(row.entity)'><span class='glyphicon glyphicon-remove-circle'></button></center>", enableFiltering: false},
                { field: 'Modificar', displayName: 'Modificar', cellTemplate:"<center><button class='btn btn-success' style='height:60px;width:70px;margin-top:5px' ng-click='grid.appScope.Modificar(row.entity)'><span class='glyphicon glyphicon-edit'></button></center>", enableFiltering: false},
                { field: 'Detalle', displayName: 'Detalle', cellTemplate:"<center><button class='btn btn-info' style='height:60px;width:70px;margin-top:5px' ng-click='grid.appScope.Informar(row.entity)'><span class='glyphicon glyphicon-list-alt'></button></center>", enableFiltering: false}
              ];
      }
   };

    fPersonas.traerTodo()
    .then(function(respuesta){
          if($scope.UsuarioLogueado.perfil=='empleado')
          {
            usuarios = respuesta;
            puente = usuarios.map(function(dato){
              if(dato.perfil=='cliente' && dato.idSucursal==$scope.UsuarioLogueado.idSucursal)
              {
                return dato;
              }
            });
            usuarios = [];
            for(var i=0;i<puente.length;i++)
            {
              if(puente[i]!=undefined)
              {
                usuarios.push(puente[i]);
              }
            }
            $scope.gridOptions.data=usuarios;
          }
          else
          {
            if($scope.UsuarioLogueado.perfil=='encargado')
            {
              usuarios = respuesta;
              puente = usuarios.map(function(dato){
                if(dato.perfil=='cliente' && dato.idSucursal==$scope.UsuarioLogueado.idSucursal || dato.perfil=='empleado' && dato.idSucursal==$scope.UsuarioLogueado.idSucursal)
                {
                  return dato;
                }
              });
              usuarios = [];
              for(var i=0;i<puente.length;i++)
              {
                if(puente[i]!=undefined)
                {
                  usuarios.push(puente[i]);
                }
              }
              $scope.gridOptions.data=usuarios;
            }
            else
            {
              $scope.gridOptions.data = respuesta;
            }
          }
    },function errorCallback(response) {
        console.log(response);     
    }); 


  $scope.Borrar=function(row){
    var dato=JSON.stringify(row);
    fPersonas.Borrar(dato)
         .then(function(respuesta) {              
                 console.log("Usuario borrado");
                fPersonas.traerTodo()
                    .then(function(respuesta){
                          if($scope.UsuarioLogueado.perfil=='empleado')
                          {
                            usuarios = respuesta;
                            puente = usuarios.map(function(dato){
                              if(dato.perfil=='cliente')
                              {
                                return dato;
                              }
                            });
                            usuarios = [];
                            for(var i=0;i<puente.length;i++)
                            {
                              if(puente[i]!=undefined)
                              {
                                usuarios.push(puente[i]);
                              }
                            }
                            $scope.gridOptions.data=usuarios;
                          }
                          else
                          {
                            $scope.gridOptions.data = respuesta;
                          }
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

miAplicacion.controller('controlPersonaModificar',function($scope, $state, $stateParams, FileUploader, cargadorDeFoto, $auth, fPersonas, fSucursales, $timeout){
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
  $scope.persona.direccion=dato.direccion;
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
      funcionGeo();
          if($scope.uploader.queue[0].file.name!='pordefecto.png')
          {
            var nombreFoto = $scope.uploader.queue[0].file.name;
            $scope.persona.foto=nombreFoto;
          }

          $scope.uploader.uploadAll();
      }

      function funcionGeo(){
              var gCoder=new google.maps.Geocoder();
              var objInf = {
                address: $scope.persona.direccion
              }
              gCoder.geocode(objInf,fn_coder);
      }

      function fn_coder(datos){
        $scope.persona.latitud = datos[0].geometry.location.lat();
        $scope.persona.longitud = datos[0].geometry.location.lng();
      }

    $scope.uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };

    $scope.uploader.onCompleteAll = function() {
      $timeout(function(){
            var dato=JSON.stringify($scope.persona);
            fPersonas.Modificar(dato)
            .then(function(respuesta) {             
                 console.log("Usuario modificado correctamente");
                 $state.go("persona.menu");
            },function errorCallback(response) {        
                 console.log( response);           
            });
          },1000);
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

miAplicacion.controller('controlPersonaHistorial',function($scope, $stateParams, $state, $auth, fPedidos, uiGridConstants, i18nService){

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

    $scope.titulo = "Historial de Pedidos";
    $scope.gridOptions = {};
    $scope.gridOptions.paginationPageSizes = [10, 50, 75];
    $scope.gridOptions.paginationPageSize = 10;
    $scope.gridOptions.columnDefs = columnDefs();
    $scope.gridOptions.enableFiltering = true;
    $scope.gridOptions.rowHeight= 70;
    $scope.gridOptions.enableSorting= false;
    i18nService.setCurrentLang('es');
    var pedidos = [];
    var puente = [];

   function columnDefs(){
            return [
                { field: 'fecha', name: 'fecha', type: 'date', cellFilter: "date: 'dd-MM-yyyy'", enableFiltering: false},
                { field: 'pedido', name:'pedido', cellTemplate:'<center><p style="margin-top: 25px" ng-if="row.entity.productoDescripcion">{{row.entity.productoDescripcion}}</p/><p style="line-height:4em;" ng-if="row.entity.ofertaDescripcion">{{row.entity.ofertaDescripcion}}</p/></center/>', enableFiltering: false ,  width: 110, resizable: false},
                { field: 'cantidad', name: 'cantidad', enableFiltering: false},
                { field: 'estado', name: 'estado'
                  ,filter:{
                    type: uiGridConstants.filter.SELECT,
                    selectOptions:[
                      {value: 'procesando', label: 'En proceso'},
                      {value: 'cancelado', label: 'Cancelado'},
                      {value: 'finalizado', label: 'Finalizado'}
                    ]
                  }, cellFilter: 'estadoPed'
                },    
                { field: 'total', name: 'total', cellTemplate:'<center><p style="margin-top: 25px">{{row.entity.total | currency}}</p/></center/>', enableFiltering: false},    
                { field: 'sucursalDireccion', name: 'sucursal', enableFiltering: false,  width: 150, resizable: false},
                { field: 'encuesta', displayName: 'encuesta', cellTemplate:'<center><button ng-if="row.entity.encuesta == 0" class="btn btn-danger" style="height:60px; width:70px;margin-top:5px" ng-click="grid.appScope.Responder(row.entity)"><span class="glyphicon glyphicon-edit"></span/></button/><span ng-if="row.entity.encuesta == 1" class="glyphicon glyphicon-ok" style="color:limegreen;line-height:3em;"></span/></center/>', enableFiltering: false}
             ];
        };

    fPedidos.traerTodo()
    .then(function(respuesta) {  
          pedidos = respuesta;
          puente = pedidos.map(function(dato){
            if(dato.idPersona==$scope.UsuarioLogueado.idPersona)
            {
              return dato;
            }
         })
          pedidos=[];
          for(var i=0;i<puente.length;i++)
          {
            if(puente[i]!=undefined)
            {
              pedidos.push(puente[i]);
            }
          }
        $scope.gridOptions.data=pedidos;
      },function errorCallback(response) {
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
  $scope.encuesta.uno = "mucho";
  $scope.encuesta.dos = "mucho";
  $scope.encuesta.tres = "unico";
  $scope.encuesta.cuatro = "mucho";
  $scope.encuesta.cinco = "alta";
  $scope.encuesta.seis = "excelente";
  $scope.encuesta.siete = "mucho";
  $scope.encuesta.ocho = "primera_compra";
  $scope.encuesta.nueve = "mucho";
  $scope.encuesta.diez = " ";
  $scope.encuesta.idProducto=dato.idProducto;

  fProductos.Detallar(dato.idProducto)
  .then(function(respuesta) {       
         $scope.producto = respuesta;
    },function errorCallback(response) {
        console.log(response);     
   }); 

   $scope.Guardar = function(){
        dato.encuesta=1;
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