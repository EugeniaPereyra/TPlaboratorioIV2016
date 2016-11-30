// OFERTAS


miAplicacion.controller('controlOfertaAlta',function($scope, FileUploader, $state, cargadorDeFotoOfer, fOfertas, fSucursales, $auth){
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
      $scope.uploader = new FileUploader({url: 'servidor/uploadOfer.php'});
      $scope.uploader.queueLimit = 3;

      $scope.producto={};
      $scope.producto.descripcion= "oferta" ;
      $scope.producto.precio= 0 ;
      $scope.producto.foto1="default.jpg";
      $scope.producto.foto2="default.jpg";
      $scope.producto.foto3="default.jpg";
      $scope.producto.idSucursal="";
      $scope.ListadoSucursales = [];

      cargadorDeFotoOfer.CargarFoto($scope.producto.foto1,$scope.producto.foto2,$scope.producto.foto3,$scope.uploader);

      fSucursales.traerTodo()
      .then(function(respuesta) {       
             $scope.ListadoSucursales = respuesta;
        },function errorCallback(response) {
             $scope.ListadoSucursales = [];
            console.log(response);     
       });
      
      $scope.Guardar = function(){
          if($scope.uploader.queue[0].file.name!='default.jpg')
          {
            var nombreFoto = $scope.uploader.queue[0].file.name;
            $scope.producto.foto1=nombreFoto;
          }
          if($scope.uploader.queue[1].file.name!='default.jpg')
          {
            var nombreFoto = $scope.uploader.queue[1].file.name;
            $scope.producto.foto2=nombreFoto;
          }
          if($scope.uploader.queue[2].file.name!='default.jpg')
          {
            var nombreFoto = $scope.uploader.queue[2].file.name;
            $scope.producto.foto3=nombreFoto;
          }

          $scope.uploader.uploadAll();
      }

      $scope.uploader.onErrorItem = function(fileItem, response, status, headers) {
           console.info('onErrorItem', fileItem, response, status, headers);
      };

      $scope.uploader.onCompleteAll = function() {
          var dato=JSON.stringify($scope.producto);
          fOfertas.Agregar(dato)
          .then(function(respuesta) {             
               console.log("Oferta agregada correctamente");
               alert("Oferta agregada correctamente");
               $state.go("persona.menu");
          },function errorCallback(response) {        
               console.log(response);   
              alert("Error al agregar oferta!!");     
          });
      };

});

miAplicacion.controller('controlOfertaGrilla',function($scope, $state, $auth, $stateParams, fOfertas, uiGridConstants, i18nService){
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

  if($stateParams.sucursal != "")
  {
  $scope.sucursal={};
  var dato = JSON.parse($stateParams.sucursal);
   $scope.sucursal.idSucursal= dato.idSucursal;
 }

  $scope.titulo = "Listado de Ofertas";
  $scope.gridOptions = {
      exporterCsvFilename: 'ofertas.csv',
      exporterCsvColumnSeparator: ';',
      exporterPdfDefaultStyle: {fontSize: 9},
      exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
      exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
      exporterPdfHeader: { text: "Listado de Ofertas", style: 'headerStyle' },
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
  var productos = [];
  var puente = [];

  function columnDefs(){
      if($scope.UsuarioLogueado.perfil=='cliente')
      {
        return [
            { field: 'foto1', name: 'foto', cellTemplate:"<center><img height='70px' ng-src='fotosOfer/{{grid.getCellValue(row, col)}}' lazy-src></center>", enableFiltering: false},
            { field: 'descripcion', name: 'descripcion', enableFiltering: false, width:200, resizable: false},     
            { field: 'precio', name: 'precio', cellTemplate:'<center><p style="margin-top: 20px">{{row.entity.precio | currency}}</p/></center/>', enableFiltering: false},  
            { field: 'Detalle', displayName: 'Detalle', cellTemplate:"<center><button class='btn btn-info' style='height:60px; width:70px;margin-top:5px' ng-click='grid.appScope.Informar(row.entity)'><span class='glyphicon glyphicon-list-alt'></button></center>", enableFiltering: false}
          ];
      }
      else{
        return [
            { field: 'foto1', name: 'foto', cellTemplate:"<center><img height='70px' ng-src='fotosOfer/{{grid.getCellValue(row, col)}}' lazy-src /></center>", enableFiltering: false},
            { field: 'descripcion', name: 'descripcion', enableFiltering: false, width:200, resizable: false},    
            { field: 'precio', name: 'precio', cellTemplate:"<center><p style='margin-top: 20px'>{{row.entity.precio | currency}}</p/></center>", enableFiltering: false},  
            { field: 'Borrar', displayName: 'Borrar', cellTemplate:"<center><button class='btn btn-danger' style='height:60px; width:70px;margin-top:5px' ng-click='grid.appScope.Borrar(row.entity)'><span class='glyphicon glyphicon-remove-circle'></button></center>", enableFiltering: false},
            { field: 'Modificar', displayName: 'Modificar', cellTemplate:"<center><button class='btn btn-success' style='height:60px; width:70px;margin-top:5px' ng-click='grid.appScope.Modificar(row.entity)'><span class='glyphicon glyphicon-edit'></button></center>", enableFiltering: false},
            { field: 'Detalle', displayName: 'Detalle', cellTemplate:"<center><button class='btn btn-info' style='height:60px; width:70px;margin-top:5px' ng-click='grid.appScope.Informar(row.entity)'><span class='glyphicon glyphicon-list-alt'></button></center>", enableFiltering: false}
          ];
      }
    };

    fOfertas.traerTodo()
    .then(function(respuesta) { 
          if($scope.UsuarioLogueado.perfil=='cliente')
          {
            $scope.gridOptions.data=respuesta;
          }
          if($scope.UsuarioLogueado.perfil=='encargado' || $scope.UsuarioLogueado.perfil=='empleado')
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
          if($scope.sucursal != undefined)
          {
            productos = respuesta;      
            puente = productos.map(function(dato){
              if(dato.idSucursal==$scope.sucursal.idSucursal)
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

  $scope.Borrar=function(oferta){
    var dato=JSON.stringify(oferta);
    fOfertas.Borrar(dato)
    .then(function(respuesta) {              
        console.log("oferta borrada correctamente");
        alert("Oferta borrada correctamente");
        fOfertas.traerTodo()
        .then(function(respuesta) { 
              if($scope.UsuarioLogueado.perfil=='cliente')
              {
                $scope.gridOptions.data=respuesta;
              }
              if($scope.UsuarioLogueado.perfil=='encargado' || $scope.UsuarioLogueado.perfil=='empleado')
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
              if($scope.sucursal.idSucursal)
              {
                productos = respuesta;      
                puente = productos.map(function(dato){
                  if(dato.idSucursal==$scope.sucursal.idSucursal)
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
              alert("Error al borrar oferta!!");          
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

miAplicacion.controller('controlOfertaModificar',function($scope, $state, $stateParams, FileUploader, cargadorDeFotoOfer, fOfertas, $auth, fSucursales){
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

  $scope.uploader = new FileUploader({url: 'servidor/uploadOfer.php'});
  $scope.uploader.queueLimit = 3;
  var dato=JSON.parse($stateParams.oferta);
  $scope.producto={};
  $scope.producto.idOferta=dato.idOferta;
  $scope.producto.descripcion=dato.descripcion;
  $scope.producto.precio=dato.precio;
  $scope.producto.foto1=dato.foto1;
  $scope.producto.foto2=dato.foto2;
  $scope.producto.foto3=dato.foto3;

      fSucursales.traerTodo()
      .then(function(respuesta) {       
             $scope.ListadoSucursales = respuesta;
        },function errorCallback(response) {
             $scope.ListadoSucursales = [];
            console.log(response);     
       });

  cargadorDeFotoOfer.CargarFoto($scope.producto.foto1,$scope.producto.foto2,$scope.producto.foto3,$scope.uploader);

      $scope.Guardar = function(){
          if($scope.uploader.queue[0].file.name!='default.jpg')
          {
            var nombreFoto = $scope.uploader.queue[0].file.name;
            $scope.producto.foto1=nombreFoto;
          }
          if($scope.uploader.queue[1].file.name!='default.jpg')
          {
            var nombreFoto = $scope.uploader.queue[1].file.name;
            $scope.producto.foto2=nombreFoto;
          }
          if($scope.uploader.queue[2].file.name!='default.jpg')
          {
            var nombreFoto = $scope.uploader.queue[2].file.name;
            $scope.producto.foto3=nombreFoto;
          }

          $scope.uploader.uploadAll();
      }

      $scope.uploader.onErrorItem = function(fileItem, response, status, headers) {
           console.info('onErrorItem', fileItem, response, status, headers);
      };

      $scope.uploader.onCompleteAll = function() {
          var dato=JSON.stringify($scope.producto);
          fOfertas.Modificar(dato)
          .then(function(respuesta){      
            console.log("oferta modificada");
            alert("Oferta modificada correctamente");
            $state.go("persona.oferGrilla");
            },function errorCallback(response){
              console.log(response); 
              alert("Error al modificar oferta");          
          });
      };
});

miAplicacion.controller('controlOfertaDetallar',function($scope, $state, $stateParams, fOfertas, fSucursales, $auth){
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

  var dato=JSON.parse($stateParams.oferta);
  $scope.producto={};
  var listadoSucursales = [];


  fOfertas.Detallar(dato.idOferta)
  .then(function(respuesta) {       
         $scope.producto = respuesta;
         fSucursales.traerTodo()
          .then(function(respuesta) {       
                   listadoSucursales = respuesta;
                   listadoSucursales.map(function(dato){
                      if($scope.producto.idSucursal == dato.idSucursal)
                      {
                        $scope.producto.sucursalDir = dato.direccion;
                        $scope.producto.sucursalTel = dato.telefono;
                      }
                    });
                  },function errorCallback(response) {
                   listadoSucursales = [];
                  console.log( response);     
             });
    },function errorCallback(response) {
        console.log(response);     
   });
});