// PRODUCTOS


miAplicacion.controller('controlProductoAlta',function($scope, FileUploader, $state, cargadorDeFotoProd, fProductos, fSucursales, $auth){
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

      $scope.uploader = new FileUploader({url: 'servidor/uploadProd.php'});
      $scope.uploader.queueLimit = 3;

      $scope.producto={};
      $scope.producto.descripcion= "producto" ;
      $scope.producto.precio=0 ;
      $scope.producto.foto1="default.jpg";
      $scope.producto.foto2="default.jpg";
      $scope.producto.foto3="default.jpg";
      $scope.producto.idSucursal="";
      $scope.ListadoSucursales = [];

      cargadorDeFotoProd.CargarFoto($scope.producto.foto1,$scope.producto.foto2,$scope.producto.foto3,$scope.uploader);

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
          fProductos.Agregar(dato)
          .then(function(respuesta) {             
               console.log("Se agrego el id "+respuesta);
               $state.go("persona.menu");
          },function errorCallback(response) {        
               console.log( response);           
          });
      };

});

miAplicacion.controller('controlProductoGrilla',function($scope, $state, $auth, fProductos, uiGridConstants, i18nService){
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

  $scope.titulo = "Listado de Productos";
  $scope.gridOptions = {
      exporterCsvFilename: 'productos.csv',
      exporterCsvColumnSeparator: ';',
      exporterPdfDefaultStyle: {fontSize: 9},
      exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
      exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
      exporterPdfHeader: { text: "Listado de Productos", style: 'headerStyle' },
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
            { field: 'foto1', name: 'foto', cellTemplate:"<center><img height='70px' ng-src='fotosProd/{{grid.getCellValue(row, col)}}' lazy-src></center>", enableFiltering: false},
            { field: 'descripcion', name: 'descripcion', enableFiltering: false, width:200, resizable: false},     
            { field: 'precio', name: 'precio', cellTemplate:'<center><p style="margin-top: 20px">{{row.entity.precio | currency}}</p/></center/>', enableFiltering: false},  
            { field: 'Detalle', displayName: 'Detalle', cellTemplate:"<center><button class='btn btn-info' style='height:60px; width:70px;margin-top:5px' ng-click='grid.appScope.Informar(row.entity)'><span class='glyphicon glyphicon-list-alt'></button></center>", enableFiltering: false}
          ];
      }
      else{
        return [
            { field: 'foto1', name: 'foto', cellTemplate:"<center><img height='70px' ng-src='fotosProd/{{grid.getCellValue(row, col)}}' lazy-src /></center>", enableFiltering: false},
            { field: 'descripcion', name: 'descripcion', enableFiltering: false, width:200, resizable: false},    
            { field: 'precio', name: 'precio', cellTemplate:"<center><p style='margin-top: 20px'>{{row.entity.precio | currency}}</p/></center>", enableFiltering: false},  
            { field: 'Borrar', displayName: 'Borrar', cellTemplate:"<center><button class='btn btn-danger' style='height:60px; width:70px;margin-top:5px' ng-click='grid.appScope.Borrar(row.entity)'><span class='glyphicon glyphicon-remove-circle'></button></center>", enableFiltering: false},
            { field: 'Modificar', displayName: 'Modificar', cellTemplate:"<center><button class='btn btn-success' style='height:60px; width:70px;margin-top:5px' ng-click='grid.appScope.Modificar(row.entity)'><span class='glyphicon glyphicon-edit'></button></center>", enableFiltering: false},
            { field: 'Detalle', displayName: 'Detalle', cellTemplate:"<center><button class='btn btn-info' style='height:60px; width:70px;margin-top:5px' ng-click='grid.appScope.Informar(row.entity)'><span class='glyphicon glyphicon-list-alt'></button></center>", enableFiltering: false}
          ];
      }
    };

    fProductos.traerTodo()
    .then(function(respuesta) { 
        if($scope.UsuarioLogueado.perfil=='cliente')
        {
          $scope.gridOptions.data = respuesta;
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

  $scope.Borrar=function(producto){
    var dato=JSON.stringify(producto);
    fProductos.Borrar(dato)
         .then(function(respuesta) {              
                 console.log("Producto borrado");
                fProductos.traerTodo()
                .then(function(respuesta) { 
                    if($scope.UsuarioLogueado.perfil=='cliente')
                    {
                      $scope.gridOptions.data = respuesta;
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

  $scope.Modificar = function(producto){
    console.log( JSON.stringify(producto));
    var dato=JSON.stringify(producto);
    $state.go('persona.prodModificar', {producto:dato});
  }

  $scope.Informar = function(producto){
    console.log( JSON.stringify(producto));
    var dato=JSON.stringify(producto);
    $state.go('persona.prodDetallar', {producto:dato});
  }
});

miAplicacion.controller('controlProductoModificar',function($scope, $state, $stateParams, FileUploader, cargadorDeFotoProd, fProductos, fSucursales, $auth){
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

  $scope.uploader = new FileUploader({url: 'servidor/uploadProd.php'});
  $scope.uploader.queueLimit = 3;
  var dato=JSON.parse($stateParams.producto);
  $scope.producto={};
  $scope.producto.idProducto=dato.idProducto;
  $scope.producto.descripcion=dato.descripcion;
  $scope.producto.precio=dato.precio;
  $scope.producto.foto1=dato.foto1;
  $scope.producto.foto2=dato.foto2;
  $scope.producto.foto3=dato.foto3;
  $scope.producto.idSucursal=dato.idSucursal;
  $scope.ListadoSucursales = [];

  cargadorDeFotoProd.CargarFoto($scope.producto.foto1,$scope.producto.foto2,$scope.producto.foto3,$scope.uploader);

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
          fProductos.Modificar(dato)
          .then(function(respuesta) {             
               console.log("producto modificado");
               $state.go("persona.prodGrilla");
          },function errorCallback(response) {        
               console.log( response);           
          });
      };

});

miAplicacion.controller('controlProductoDetallar',function($scope, $state, $stateParams, fProductos, fSucursales){
  var dato=JSON.parse($stateParams.producto);
  $scope.producto={};
  var listadoSucursales = [];

  fProductos.Detallar(dato.idProducto)
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
                  console.log(response);     
        });
  },function errorCallback(response) {        
      console.log(response);           
  });
});