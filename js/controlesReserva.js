// RESERVAS


miAplicacion.controller('controlReservaAlta',function($scope, $state, $stateParams, $auth, fPedidos, fSucursales, fProductos, fOfertas, fReservas){
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
      $scope.pedido.cantidad=1;
      $scope.pedido.idOferta=0;
      $scope.pedido.idProducto=0;
      $scope.pedido.sucursalDireccion = "";
      $scope.pedido.productoDescripcion = "";
      $scope.pedido.ofertaDescripcion = "";
      $scope.pedido.estado="procesando";
      $scope.pedido.fecha=new Date();
      var fecha1=new Date();
      var fecha2=new Date();
      $scope.pedido.encuesta=0;
      $scope.reserva = {};
      $scope.reserva.fechaInicio = $scope.pedido.fecha;
      $scope.reserva.fechaFin=new Date();
      $scope.reserva.fechaMin=fecha1.setDate(fecha1.getDate() + 2);
      $scope.reserva.fechaMax=fecha2.setDate(fecha2.getDate() + 6);

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
          $scope.reserva.idSucursal=$scope.pedido.idSucursal;
        var dato=JSON.stringify($scope.pedido);
        fPedidos.Agregar(dato)
        .then(function(respuesta) {             
            $scope.reserva.idPedido=respuesta;
            var datoRes=JSON.stringify($scope.reserva);
            fReservas.Agregar(datoRes).
            then(function(res){
              console.log("Reserva generada correctamente");
              alert("Reserva generada correctamente");
                if($scope.UsuarioLogueado.perfil=='cliente')
                {
                  $state.go('persona.menu');
                }
                else
                {
                  $state.go('persona.reservaGrilla');
                }
              },function errorCallback(response) {        
                console.log( response);
                alert("Error al generar la reserva");           
            });
          },function errorCallback(response) {        
            console.log( response);           
        });
      }

});

miAplicacion.controller('controlReservaGrilla',function($scope, $state, $stateParams, $auth, fPedidos, uiGridConstants, i18nService, fReservas){
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


    $scope.titulo = "Listado de Reservas";
    $scope.gridOptions = {
      exporterCsvFilename: 'reservas.csv',
      exporterCsvColumnSeparator: ';',
      exporterPdfDefaultStyle: {fontSize: 9},
      exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
      exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
      exporterPdfHeader: { text: "Listado de Reservas", style: 'headerStyle' },
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
    $scope.pedidos = [];
    var datos=[];
    var puente=[];

   function columnDefs(){
      if($scope.UsuarioLogueado.perfil=='empleado')
      {
            return [
                { field: 'fechaInicio', name: 'fecha Inicio', type: 'date', cellFilter: "date: 'dd-MM-yyyy'", enableFiltering: false},
                { field: 'fechaFin', name: 'fecha Fin', type: 'date', cellFilter: "date: 'dd-MM-yyyy'", enableFiltering: false},
                { field: 'idPedido', name: 'producto', cellTemplate:'<center><p ng-repeat="ped in grid.appScope.pedidos" ng-if="row.entity.idPedido == ped.idPedido && ped.productoDescripcion ||row.entity.idPedido == ped.idPedido && ped.ofertaDescripcion" style="margin-top:25px">{{ped.productoDescripcion}}{{ped.ofertaDescripcion}}</p/></center/>', enableFiltering: false ,  width: 150, resizable: false },
                { field: 'Modificar', displayName: 'Modificar', cellTemplate:"<center><button class='btn btn-success' style='height:60px; width:70px;margin-top:5px' ng-click='grid.appScope.Modificar(row.entity)'><span class='glyphicon glyphicon-edit'></button></center>", enableFiltering: false},
                { field: 'Detalle', displayName: 'Detalle', cellTemplate:"<center><button class='btn btn-info' style='height:60px; width:70px;margin-top:5px' ng-click='grid.appScope.Informar(row.entity)'><span class='glyphicon glyphicon-list-alt'></button></center>", enableFiltering: false}
              ];
            }
    else
    {
            return [
                { field: 'fechaInicio', name: 'fecha Inicio', type: 'date', cellFilter: "date: 'dd-MM-yyyy'", enableFiltering: false},
                { field: 'fechaFin', name: 'fecha Fin', type: 'date', cellFilter: "date: 'dd-MM-yyyy'", enableFiltering: false},
                { field: 'idPedido', name: 'producto', cellTemplate:'<center><p ng-repeat="ped in grid.appScope.pedidos" ng-if="row.entity.idPedido == ped.idPedido && ped.productoDescripcion ||row.entity.idPedido == ped.idPedido && ped.ofertaDescripcion" style="margin-top:25px">{{ped.productoDescripcion}}{{ped.ofertaDescripcion}}</p/></center/>', enableFiltering: false ,  width: 150, resizable: false },
                { field: 'Borrar', displayName: 'Borrar', cellTemplate:"<center><button class='btn btn-danger' style='height:60px; width:70px;margin-top:5px' ng-click='grid.appScope.Borrar(row.entity)'><span class='glyphicon glyphicon-remove-circle'></button></center>", enableFiltering: false},
                { field: 'Modificar', displayName: 'Modificar', cellTemplate:"<center><button class='btn btn-success' style='height:60px; width:70px;margin-top:5px' ng-click='grid.appScope.Modificar(row.entity)'><span class='glyphicon glyphicon-edit'></button></center>", enableFiltering: false},
                { field: 'Detalle', displayName: 'Detalle', cellTemplate:"<center><button class='btn btn-info' style='height:60px; width:70px;margin-top:5px' ng-click='grid.appScope.Informar(row.entity)'><span class='glyphicon glyphicon-list-alt'></button></center>", enableFiltering: false}
              ];
            }
    };

      fPedidos.traerTodo()
      .then(function(respuesta) {  
        $scope.pedidos=respuesta;
      },function errorCallback(response) {
          console.log(response);     
      });
 
        fReservas.traerTodo()
                  .then(function(respuesta) {  
                    datos=respuesta;
                    puente=datos.map(function(dato){
                      if(dato.idSucursal==$scope.UsuarioLogueado.idSucursal)
                      {
                        return dato;
                      }
                    })
                    datos=[];
                    for(var i=0;i<puente.length;i++)
                    {
                      if(puente[i]!=undefined)
                      {
                        datos.push(puente[i]);
                      }
                    }
                    $scope.gridOptions.data=datos;
      },function errorCallback(response) {
          console.log(response);     
      });
      

  $scope.Borrar=function(reserva){
    console.log(reserva);
    fPedidos.Borrar(reserva.idPedido)
    .then(function(respuesta) {              
        console.log("pedido borrado correctamente");
          fReservas.Borrar(reserva.idReserva)
          .then(function(respuesta) {  
            alert("Reserva borrada correctamente");
                  fReservas.traerTodo()
                  .then(function(respuesta) {  
                    datos=respuesta;
                    puente=datos.map(function(dato){
                      if(dato.idSucursal==$scope.UsuarioLogueado.idSucursal)
                      {
                        return dato;
                      }
                    })
                    datos=[];
                    for(var i=0;i<puente.length;i++)
                    {
                      if(puente[i]!=undefined)
                      {
                        datos.push(puente[i]);
                      }
                    }
                    $scope.gridOptions.data=datos;
                  },function errorCallback(response) {
                      console.log(response);     
                  });
              console.log("reserva borrada correctamente");
          },function errorCallback(response) {
              console.log(response); 
              alert("Error al borrar la reserva");    
          });
      },function errorCallback(response) {        
          console.log(response);           
    });
  }

  $scope.Modificar = function(reserva){
    var dato=JSON.stringify(reserva);
    $state.go('persona.resModificar', {pedido:dato});
  }

  $scope.Informar = function(reserva){
    var dato=JSON.stringify(reserva);
    $state.go('persona.resDetallar', {pedido:dato});
  }
});

miAplicacion.controller('controlReservaModificar',function($scope, $state, $stateParams, fPedidos, fReservas, fSucursales, $auth){
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

  var dato=JSON.parse($stateParams.pedido);
  $scope.reserva={};
  $scope.reserva=dato;
  $scope.mostrarEstado=true;

  $scope.pedido={};

  fPedidos.Detallar($scope.reserva.idPedido)
  .then(function(respuesta) {       
         $scope.pedido = respuesta;
    },function errorCallback(response) {
        console.log(response);     
   }); 

  $scope.reserva.fechaFin=new Date($scope.reserva.fechaFin);


  $scope.Guardar = function(){
        var datoPed=JSON.stringify($scope.pedido);
        var datoRes=JSON.stringify($scope.reserva);
        fPedidos.Modificar(datoPed)
        .then(function(respuesta) {             
            console.log("pedido modificado correctamente");
            fReservas.Modificar(datoRes)
            .then(function(res){
              console.log("reserva modificada correctamente");
              alert("Reserva modificada correctamente");
              $state.go('persona.reservaGrilla');
            },function errorCallback(response) {        
                console.log(response);   
                alert("Error al modificar la reserva");        
            });
         },function errorCallback(response) {        
            console.log(response);        
        });
      }

});

miAplicacion.controller('controlReservaDetallar',function($scope, $state, $stateParams, fPedidos, fSucursales){
  var dato=JSON.parse($stateParams.pedido);
  console.log(dato);
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