// SUCURSALES


miAplicacion.controller('controlSucursalAlta',function($scope, FileUploader, $state, cargadorDeFotoSuc, fSucursales, $timeout){

      $scope.uploader = new FileUploader({url: 'servidor/uploadSuc.php'});
      $scope.uploader.queueLimit = 3;

      $scope.sucursal={};
      $scope.sucursal.direccion= "Av. Cordoba 5432 Caba" ;
      $scope.sucursal.telefono= "4832-3030" ;
      $scope.sucursal.foto1="default.jpg";
      $scope.sucursal.foto2="default.jpg";
      $scope.sucursal.foto3="default.jpg";
      $scope.sucursal.latitud=0;
      $scope.sucursal.longitud=0;

      cargadorDeFotoSuc.CargarFoto($scope.sucursal.foto1,$scope.sucursal.foto2,$scope.sucursal.foto3,$scope.uploader);

      $scope.Guardar = function(){

          funcionGeo();

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

      function funcionGeo(){
              var gCoder=new google.maps.Geocoder();
              var objInf = {
                address: $scope.sucursal.direccion
              }
              gCoder.geocode(objInf,fn_coder);
      }

      function fn_coder(datos){
        $scope.sucursal.latitud = datos[0].geometry.location.lat();
        $scope.sucursal.longitud = datos[0].geometry.location.lng();
      }

      $scope.uploader.onErrorItem = function(fileItem, response, status, headers) {
           console.info('onErrorItem', fileItem, response, status, headers);
      };

      $scope.uploader.onCompleteAll = function() {
        $timeout(function(){
          var dato=JSON.stringify($scope.sucursal);
          fSucursales.Agregar(dato)
          .then(function(respuesta) {             
              console.log("Se agregó la sucursal correctamente");
              $state.go("persona.menu");
          },function errorCallback(response) {        
              console.log(response);           
          });
        },1000);
      };
});

miAplicacion.controller('controlSucursalGrilla',function($scope, $state, $auth, fSucursales, uiGridConstants, i18nService){
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

  $scope.titulo = "Listado de Sucursales";
  $scope.gridOptions = {};
  $scope.gridOptions.paginationPageSizes = [10, 50, 75];
  $scope.gridOptions.paginationPageSize = 10;
  $scope.gridOptions.columnDefs = columnDefs();
  $scope.gridOptions.enableFiltering = true;
  $scope.gridOptions.rowHeight= 70;
  $scope.gridOptions.enableSorting= false;
  i18nService.setCurrentLang('es');
  var productos = [];
  var puente = [];

  function columnDefs(){
      if($scope.UsuarioLogueado.perfil=='cliente')
      {
        return [
            { field: 'foto1', name: 'foto', cellTemplate:"<center><img height='70px' ng-src='fotosSuc/{{grid.getCellValue(row, col)}}' lazy-src></center>", enableFiltering: false},
            { field: 'direccion', name: 'direccion', enableFiltering: false, width:200, resizable: false},     
            { field: 'telefono', name: 'telefono', enableFiltering: false},  
            { field: 'Detalle', displayName: 'Detalle', cellTemplate:"<center><button class='btn btn-info' style='height:60px; width:70px;margin-top:5px' ng-click='grid.appScope.Informar(row.entity)'><span class='glyphicon glyphicon-list-alt'></button></center>", enableFiltering: false}
          ];
      }
      if($scope.UsuarioLogueado.perfil=='administrador'){
        return [
            { field: 'foto1', name: 'foto', cellTemplate:"<center><img height='70px' ng-src='fotosSuc/{{grid.getCellValue(row, col)}}' lazy-src /></center>", enableFiltering: false},
            { field: 'direccion', name: 'direccion', enableFiltering: false, width:200, resizable: false},    
            { field: 'telefono', name: 'telefono', enableFiltering: false},  
            { field: 'Borrar', displayName: 'Borrar', cellTemplate:"<center><button class='btn btn-danger' style='height:60px; width:70px;margin-top:5px' ng-click='grid.appScope.Borrar(row.entity)'><span class='glyphicon glyphicon-remove-circle'></button></center>", enableFiltering: false},
            { field: 'Modificar', displayName: 'Modificar', cellTemplate:"<center><button class='btn btn-success' style='height:60px; width:70px;margin-top:5px' ng-click='grid.appScope.Modificar(row.entity)'><span class='glyphicon glyphicon-edit'></button></center>", enableFiltering: false},
            { field: 'Detalle', displayName: 'Detalle', cellTemplate:"<center><button class='btn btn-info' style='height:60px; width:70px;margin-top:5px' ng-click='grid.appScope.Informar(row.entity)'><span class='glyphicon glyphicon-list-alt'></button></center>", enableFiltering: false}
          ];
      }
      if($scope.UsuarioLogueado.perfil=='encargado'){
        return [
            { field: 'foto1', name: 'foto', cellTemplate:"<center><img height='70px' ng-src='fotosSuc/{{grid.getCellValue(row, col)}}' lazy-src /></center>", enableFiltering: false},
            { field: 'direccion', name: 'direccion', enableFiltering: false, width:200, resizable: false},    
            { field: 'telefono', name: 'telefono', enableFiltering: false},
            { field: 'Modificar', displayName: 'Modificar', cellTemplate:"<center><button class='btn btn-success' style='height:60px; width:70px;margin-top:5px' ng-click='grid.appScope.Modificar(row.entity)'><span class='glyphicon glyphicon-edit'></button></center>", enableFiltering: false},
            { field: 'Detalle', displayName: 'Detalle', cellTemplate:"<center><button class='btn btn-info' style='height:60px; width:70px;margin-top:5px' ng-click='grid.appScope.Informar(row.entity)'><span class='glyphicon glyphicon-list-alt'></button></center>", enableFiltering: false}
          ];
      }
      if($scope.UsuarioLogueado.perfil=='empleado'){
        return [
            { field: 'foto1', name: 'foto', cellTemplate:"<center><img height='70px' ng-src='fotosSuc/{{grid.getCellValue(row, col)}}' lazy-src /></center>", enableFiltering: false},
            { field: 'direccion', name: 'direccion', enableFiltering: false, width:200, resizable: false},    
            { field: 'telefono', name: 'telefono', enableFiltering: false},
            { field: 'Detalle', displayName: 'Detalle', cellTemplate:"<center><button class='btn btn-info' style='height:60px; width:70px;margin-top:5px' ng-click='grid.appScope.Informar(row.entity)'><span class='glyphicon glyphicon-list-alt'></button></center>", enableFiltering: false}
          ];
      }
    };

    fSucursales.traerTodo()
    .then(function(respuesta) { 
          if($scope.UsuarioLogueado.perfil=='cliente' || $scope.UsuarioLogueado.perfil=='administrador' )
          {
            $scope.gridOptions.data=respuesta;
          }
          else
          {
            productos = respuesta;      
            puente = productos.map(function(dato){
              if(dato.idSucursal==$scope.UsuarioLogueado.idSucursal)
              {
                return dato;
              }
           })
            productos=[];
            for(var i=0;i<puente.length;i++)
            {
              if(puente[i]!=undefined)
              {
                productos.push(puente[i]);
              }
            }
          $scope.gridOptions.data=productos;
        }
    },function errorCallback(response) {
        console.log(response);     
    });

  $scope.Borrar=function(sucursal){
    var dato=JSON.stringify(sucursal);
    fSucursales.Borrar(dato)
    .then(function(respuesta){
      console.log("Sucursal borrada");
        fSucursales.traerTodo()
        .then(function(respuesta) { 
              if($scope.UsuarioLogueado.perfil=='cliente' || $scope.UsuarioLogueado.perfil=='administrador' )
              {
                $scope.gridOptions.data=respuesta;
              }
              else
              {
                productos = respuesta;      
                puente = productos.map(function(dato){
                  if(dato.idSucursal==$scope.UsuarioLogueado.idSucursal)
                  {
                    return dato;
                  }
               })
                productos=[];
                for(var i=0;i<puente.length;i++)
                {
                  if(puente[i]!=undefined)
                  {
                    productos.push(puente[i]);
                  }
                }
              $scope.gridOptions.data=productos;
            }
        },function errorCallback(response) {
            console.log(response);     
        });
    },function errorCallback(response) {        
          console.log(response);           
    });
  }

  $scope.Modificar = function(sucursal){
    var dato=JSON.stringify(sucursal);
    $state.go('persona.sucModificar', {sucursal:dato});
  }

  $scope.Informar = function(sucursal){
    var dato=JSON.stringify(sucursal);
    $state.go('persona.sucDetallar', {sucursal:dato});
  }
});

miAplicacion.controller('controlSucursalModificar',function($scope, $state, $stateParams, FileUploader, cargadorDeFotoSuc, fSucursales, $timeout){
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
  $scope.sucursal.latitud=dato.latitud;
  $scope.sucursal.longitud=dato.longitud;
  
  cargadorDeFotoSuc.CargarFoto($scope.sucursal.foto1,$scope.sucursal.foto2,$scope.sucursal.foto3,$scope.uploader);

    $scope.Guardar = function(){
          funcionGeo();
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

      function funcionGeo(){
              var gCoder=new google.maps.Geocoder();
              var objInf = {
                address: $scope.sucursal.direccion
              }
              gCoder.geocode(objInf,fn_coder);
      }

      function fn_coder(datos){
        $scope.sucursal.latitud = datos[0].geometry.location.lat();
        $scope.sucursal.longitud = datos[0].geometry.location.lng();
      }

      $scope.uploader.onErrorItem = function(fileItem, response, status, headers) {
           console.info('onErrorItem', fileItem, response, status, headers);
      };

      $scope.uploader.onCompleteAll = function() {
        $timeout(function(){
          var dato=JSON.stringify($scope.sucursal);
            fSucursales.Modificar(dato)
            .then(function(respuesta) {             
                 console.log("Sucursal modificada correctamente");
                 $state.go("persona.sucGrilla");
            },function errorCallback(response) {        
                 console.log(response);           
            });
          },1000);
      };

});

miAplicacion.controller('controlSucursalDetallar',function($scope, $state, $stateParams, $auth, fSucursales, fPersonas){
  var dato=JSON.parse($stateParams.sucursal);
  $scope.sucursal={};
  $scope.datoMap=dato;
  $scope.ListadoEmpleados = [];
  $scope.mapa = {};
  $scope.mapa.latitud = "-34.662189";
  $scope.mapa.longitud = "-58.364643";

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

    fPersonas.traerTodo()
    .then(function(respuesta) {       
         $scope.ListadoEmpleados = respuesta;
    },function errorCallback(response) {
         $scope.ListadoEmpleados= [];
        console.log(response);     
    });

  fSucursales.Detallar(dato.idSucursal)
  .then(function(respuesta) {             
      $scope.sucursal = respuesta;
    },function errorCallback(response) {
        console.log(response);     
   });

  $scope.VerOfertas=function(){
    var dato = JSON.stringify($scope.sucursal);
    $state.go('persona.oferGrilla',{sucursal : dato});
  }

  $scope.VerPedidos=function(){
    var dato = JSON.stringify($scope.sucursal);
    $state.go('persona.pedGrilla',{sucursal : dato});
  }

});