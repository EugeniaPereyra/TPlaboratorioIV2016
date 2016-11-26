// PEDIDOS


miAplicacion.controller('controlPedidoAlta',function($scope, $state, $stateParams, $auth, fPedidos, fSucursales, fProductos, fOfertas){
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

      $scope.mostrarEstado=false;
      $scope.pedido={};
      $scope.pedido.idSucursal="";
      $scope.pedido.clienteNombre="";
      $scope.pedido.idPersona=0;
      $scope.pedido.total=0;
      $scope.pedido.cantidad=0;
      $scope.pedido.idOferta=0;
      $scope.pedido.idProducto=0;
      $scope.pedido.sucursalDireccion = "";
      $scope.pedido.productoDescripcion = "";
      $scope.pedido.ofertaDescripcion = "";
      $scope.pedido.estado="procesando";
      $scope.pedido.fecha=new Date();
      $scope.pedido.encuesta=0;

      if($scope.UsuarioLogueado.perfil=='cliente')
      {
        $scope.pedido.clienteNombre=$scope.UsuarioLogueado.nombre;
        $scope.pedido.idPersona=$scope.UsuarioLogueado.id;
      }

      fSucursales.traerTodo()
      .then(function(respuesta) {       
             $scope.ListadoSucursales = respuesta;
        },function errorCallback(response) {
             $scope.ListadoSucursales = [];
            console.log(response);     
       });

      fProductos.traerTodo()
      .then(function(respuesta) {       
           $scope.ListadoProductos = respuesta;
      },function errorCallback(response) {
           $scope.ListadoProductos = [];
          console.log(response);     
      });

      fOfertas.traerTodo()
      .then(function(respuesta) {       
           $scope.ListadoOfertas = respuesta;
      },function errorCallback(response) {
           $scope.ListadoOfertas = [];
          console.log(response);     
      });

      $scope.Guardar=function(){
          console.info($scope.pedido);
          if($scope.pedido.idSucursal != 0){
            var id = parseInt($scope.pedido.idSucursal);
            $scope.ListadoSucursales.map(function(dato){
              if(id==dato.idSucursal)
              {
                $scope.pedido.sucursalDireccion = dato.direccion;
              }
            })
          }
          if($scope.pedido.idProducto != 0){
            var id = parseInt($scope.pedido.idProducto);
            $scope.ListadoProductos.map(function(dato){
              if(id==dato.idProducto)
              {
                $scope.pedido.total=$scope.pedido.cantidad * dato.precio;
                $scope.pedido.productoDescripcion = dato.descripcion;
              }
            })
          }
          if($scope.pedido.idOferta != 0)
          {
            var id = parseInt($scope.pedido.idOferta);
            $scope.ListadoOfertas.map(function(dato){
              if(id==dato.idOferta)
              {
                $scope.pedido.total=$scope.pedido.cantidad * dato.precio;
                $scope.pedido.ofertaDescripcion = dato.descripcion;
              }
            })
          }
        var dato=JSON.stringify($scope.pedido);
        fPedidos.Agregar(dato)
        .then(function(respuesta) {             
            console.log("pedido agregado correctamente");
            if($scope.UsuarioLogueado.perfil=='cliente')
            {
              $state.go('persona.menu');
            }
            else
            {
              $state.go('persona.pedGrilla');
            }
          },function errorCallback(response) {        
            console.log( response);           
        });
      }

});

miAplicacion.controller('controlPedidoGrilla',function($scope, $state, $stateParams, $auth, fPedidos, uiGridConstants, i18nService){
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


    $scope.titulo = "Listado de Pedidos";
    $scope.gridOptions = {
      exporterCsvFilename: 'pedidos.csv',
      exporterCsvColumnSeparator: ';',
      exporterPdfDefaultStyle: {fontSize: 9},
      exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
      exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
      exporterPdfHeader: { text: "Listado de Pedidos", style: 'headerStyle' },
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
    var pedidos = [];
    var puente = [];

   function columnDefs(){
      if($scope.UsuarioLogueado.perfil=='empleado')
      {
            return [
                { field: 'fecha', name: 'fecha', type: 'date', cellFilter: "date: 'dd-MM-yyyy'", enableFiltering: false},
                { field: 'producto', name: 'producto', cellTemplate:'<center><p style="margin-top:25px" ng-if="row.entity.productoDescripcion">{{row.entity.productoDescripcion}}</p/><p style="line-height:4em;" ng-if="row.entity.ofertaDescripcion">{{row.entity.ofertaDescripcion}}</p/></center/>', enableFiltering: false ,  width: 110, resizable: false },
                { field: 'cantidad', name: 'cantidad',  enableFiltering: false},
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
                { field: 'clienteNombre', name: 'cliente', enableFiltering: false},   
                { field: 'Modificar', displayName: 'Modificar', cellTemplate:"<center><button class='btn btn-success' style='height:60px; width:70px;margin-top:5px' ng-click='grid.appScope.Modificar(row.entity)'><span class='glyphicon glyphicon-edit'></button></center>", enableFiltering: false},
                { field: 'Detalle', displayName: 'Detalle', cellTemplate:"<center><button class='btn btn-info' style='height:60px; width:70px;margin-top:5px' ng-click='grid.appScope.Informar(row.entity)'><span class='glyphicon glyphicon-list-alt'></button></center>", enableFiltering: false}
              ];
            }
    else
    {
            return [
                { field: 'fecha', name: 'fecha', type: 'date', cellFilter: "date: 'dd-MM-yyyy'", enableFiltering: false},
                { field: 'producto', name: 'producto', cellTemplate:'<center><p style="margin-top:25px" ng-if="row.entity.productoDescripcion">{{row.entity.productoDescripcion}}</p/><p style="line-height:4em;" ng-if="row.entity.ofertaDescripcion">{{row.entity.ofertaDescripcion}}</p/></center/>', enableFiltering: false ,  width: 110, resizable: false },
                { field: 'cantidad', name: 'cantidad',  enableFiltering: false},
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
                { field: 'clienteNombre', name: 'cliente', enableFiltering: false},   
                { field: 'Borrar', displayName: 'Borrar', cellTemplate:"<center><button class='btn btn-danger' style='height:60px; width:70px;margin-top:5px' ng-click='grid.appScope.Borrar(row.entity)'><span class='glyphicon glyphicon-remove-circle'></button></center>", enableFiltering: false},
                { field: 'Modificar', displayName: 'Modificar', cellTemplate:"<center><button class='btn btn-success' style='height:60px; width:70px;margin-top:5px' ng-click='grid.appScope.Modificar(row.entity)'><span class='glyphicon glyphicon-edit'></button></center>", enableFiltering: false},
                { field: 'Detalle', displayName: 'Detalle', cellTemplate:"<center><button class='btn btn-info' style='height:60px; width:70px;margin-top:5px' ng-click='grid.appScope.Informar(row.entity)'><span class='glyphicon glyphicon-list-alt'></button></center>", enableFiltering: false}
              ];
            }
    };

      fPedidos.traerTodo()
      .then(function(respuesta) {  
          if($scope.UsuarioLogueado.perfil=='empleado' || $scope.UsuarioLogueado.perfil=='encargado')
          {
            pedidos = respuesta;
            puente = pedidos.map(function(dato){
              console.info(dato);
              if(dato.idSucursal==$scope.UsuarioLogueado.idSucursal)
              {
                return dato;
              }
            });
            console.info(puente);
            pedidos = [];
            for(var i=0;i<puente.length;i++)
            {
              if(puente[i]!=undefined)
              {
                pedidos.push(puente[i]);
              }
            }
            $scope.gridOptions.data=pedidos;
          }
          else
          {
            $scope.gridOptions.data = respuesta;
          }
      },function errorCallback(response) {
          console.log(response);     
      });
      

  $scope.Borrar=function(pedido){
    fPedidos.Borrar(pedido.idPedido)
    .then(function(respuesta) {              
        console.log("pedido borrado correctamente");
          fPedidos.traerTodo()
          .then(function(respuesta) {  
              if($scope.UsuarioLogueado.perfil=='empleado' || $scope.UsuarioLogueado.perfil=='encargado')
              {
                pedidos = respuesta;
                puente = pedidos.map(function(dato){
                  console.info(dato);
                  if(dato.idSucursal==$scope.UsuarioLogueado.idSucursal)
                  {
                    return dato;
                  }
                });
                console.info(puente);
                pedidos = [];
                for(var i=0;i<puente.length;i++)
                {
                  if(puente[i]!=undefined)
                  {
                    pedidos.push(puente[i]);
                  }
                }
                $scope.gridOptions.data=pedidos;
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

  $scope.Modificar = function(pedido){
    var dato=JSON.stringify(pedido);
    $state.go('persona.pedModificar', {pedido:dato});
  }

  $scope.Informar = function(pedido){
    var dato=JSON.stringify(pedido);
    $state.go('persona.pedDetallar', {pedido:dato});
  }
});

miAplicacion.controller('controlPedidoModificar',function($scope, $state, $stateParams, fPedidos){
  var dato=JSON.parse($stateParams.pedido);
  console.log(dato);
  $scope.mostrarEstado=true;
  $scope.pedido={};
  $scope.pedido=dato;
  //console.info($scope.pedido);

  $scope.Guardar = function(){
        var datoPed=JSON.stringify($scope.pedido);
        fPedidos.Modificar(datoPed)
        .then(function(respuesta) {             
            console.log("pedido modificado correctamente");
            $state.go('persona.pedGrilla');
         },function errorCallback(response) {        
            console.log(response);           
        });
      }

});

miAplicacion.controller('controlPedidoDetallar',function($scope, $state, $stateParams, fPedidos, fSucursales){
  var dato=JSON.parse($stateParams.pedido);
  $scope.pedido={};
  var listadoSucursales = [];
  var listadoUsuarios = [];

  fPedidos.Detallar(dato.idPedido)
  .then(function(respuesta) {       
         $scope.pedido = respuesta;
         fSucursales.traerTodo()
          .then(function(respuesta) {       
                   listadoSucursales = respuesta;
                   listadoSucursales.map(function(dato){
                      if($scope.pedido.idSucursal == dato.idSucursal)
                      {
                        $scope.pedido.sucursalDir = dato.direccion;
                        $scope.pedido.sucursalTel = dato.telefono;
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