// SUCURSALES


miAplicacion.controller('controlEstadisticaMenu',function($scope, $state){

  $scope.VentasLocal=function(){
    $state.go('persona.estadisticaVentasLocal');
  }

  $scope.VentasProductos=function(){
    $state.go('persona.estadisticaProductos');
  }

  $scope.EncuestaSatisfaccion=function(){
    $state.go('persona.estadisticaEncuesta');
  }
      
});

miAplicacion.controller('controlEstadisticaVentasLocal',function($scope, fPedidos){

 // Sample options for first chart
  $scope.pedidos= [];
  $scope.sucursal1=0;
  $scope.sucursal2=0;
  $scope.sucursal3=0;

  fPedidos.traerTodo()
  .then(function(respuesta) {       
         $scope.pedidos = respuesta;
         //console.info($scope.pedidos);
         angular.forEach($scope.pedidos,function(value){
            //console.log(value);
            if(value.idSucursal==1&&value.estado=="finalizado")
            {
              $scope.sucursal1 += 1;
            }
            if(value.idSucursal==2&&value.estado=="finalizado")
            {
              $scope.sucursal2 += 1;
            }
            if(value.idSucursal==3&&value.estado=="finalizado")
            {
              $scope.sucursal3 += 1;
            }
          });
         $scope.chartConfig.series[0].data = [$scope.sucursal1, $scope.sucursal2, $scope.sucursal3];
    },function errorCallback(response) {
         $scope.pedidos = [];
        console.log(response);     
   });
    

$scope.chartConfig = {

  options: {
      //This is the Main Highcharts chart config. Any Highchart options are valid here.
      //will be overriden by values specified below.
      chart: {
          type: 'line'
      },
      tooltip: {
          style: {
              padding: 10,
              fontWeight: 'bold'
          }
      }
  },
  //The below properties are watched separately for changes.

  //Series object (optional) - a list of series using normal Highcharts series options.
  series: [{
     name: 'Ventas por local',
     data: [0, 0, 0]
  }],
  //Title configuration (optional)
  title: {
     text: ''
  },
  //Boolean to control showing loading status on chart (optional)
  //Could be a string if you want to show specific loading text.
  loading: false,
  //Configuration for the xAxis (optional). Currently only one x axis can be dynamically controlled.
  //properties currentMin and currentMax provided 2-way binding to the chart's maximum and minimum
  xAxis: {
          title: {
            text: 'Sucursales'
          },
          categories: ['Sucursal 1', 'Sucursal 2', 'Sucursal 3']
        },
  yAxis: {
          // Pongo el título para el eje de las 'Y'
          title: {
            text: 'N° de ventas'
          }
        },
  //Whether to use Highstocks instead of Highcharts (optional). Defaults to false.
  useHighStocks: false,
  
  //function (optional)
  func: function (chart) {
   //setup some logic for the chart
  }
};
      
});


miAplicacion.controller('controlEstadisticaProductos',function($scope, fPedidos){

 // Sample options for first chart
  $scope.pedidos= [];
  $scope.productos = [];
  $scope.ofertas = [];
  $scope.sucursal1=0;
  $scope.sucursal2=0;
  $scope.sucursal3=0;
  $scope.prodCont = 0;
  $scope.prodDescr = "";
  $scope.oferCont = 0;
  $scope.oferDescr = "";
  $scope.mayor = 0;
  $scope.mayorOfer = 0;
  $scope.prodMayorDescr = "";
  $scope.prodMayorCont = 0;
  $scope.oferMayorDescr = "";
  $scope.oferMayorCont = 0;

  fPedidos.traerTodo()
  .then(function(respuesta) {       
         $scope.pedidos = respuesta;
         //console.info($scope.pedidos);
         angular.forEach($scope.pedidos,function(value){
            //console.log(value);
            if(value.idSucursal==1&&value.estado=="finalizado")
            {
              if(value.idProducto!=0)
                $scope.productos.push(value);
              if(value.idOferta!=0)
                $scope.ofertas.push(value);              
            }
            if(value.idSucursal==2&&value.estado=="finalizado")
            {
              if(value.idProducto!=0)
                $scope.productos.push(value);
              if(value.idOferta!=0)
                $scope.ofertas.push(value);  
            }
            if(value.idSucursal==3&&value.estado=="finalizado")
            {
              if(value.idProducto!=0)
                $scope.productos.push(value);
              if(value.idOferta!=0)
                $scope.ofertas.push(value);  
            }
          });

         for(var i=0;i<$scope.productos.length;i++)
         {
            $scope.prodCont =1;
            $scope.prodDescr = $scope.productos[i].productoDescripcion;
            for(var j=i+1;j<$scope.productos.length;j++)
            {
              if($scope.productos[j].productoDescripcion == $scope.prodDescr)
                  $scope.prodCont +=1;
            }
            if($scope.prodCont>$scope.mayor)
              {
                $scope.mayor=$scope.prodCont;
                $scope.prodMayorDescr = $scope.prodDescr;
                $scope.prodMayorCont = $scope.prodCont;
              }
         }

         for(var i=0;i<$scope.ofertas.length;i++)
         {
            $scope.oferCont =1;
            $scope.oferDescr = $scope.ofertas[i].ofertaDescripcion;
            for(var j=i+1;j<$scope.ofertas.length;j++)
            {
              if($scope.ofertas[j].ofertaDescripcion == $scope.oferDescr)
                  $scope.oferCont +=1;
            }
            if($scope.oferCont>$scope.mayorOfer)
              {
                $scope.mayorOfer=$scope.oferCont;
                $scope.oferMayorDescr = $scope.oferDescr;
                $scope.oferMayorCont = $scope.oferCont;
              }
         }

         $scope.chartConfig.series[0].data = [$scope.prodMayorCont, $scope.oferMayorCont];
         $scope.chartConfig.xAxis.categories = ['Producto: ' + $scope.prodMayorDescr, 'Oferta: '+$scope.oferMayorDescr];
    },function errorCallback(response) {
         $scope.pedidos = [];
        console.log(response);     
   });
    

$scope.chartConfig = {

  options: {
      //This is the Main Highcharts chart config. Any Highchart options are valid here.
      //will be overriden by values specified below.
      chart: {
          type: 'bar'
      },
      tooltip: {
          style: {
              padding: 10,
              fontWeight: 'bold'
          }
      }
  },
  //The below properties are watched separately for changes.

  //Series object (optional) - a list of series using normal Highcharts series options.
  series: [{
     name: 'Productos y ofertas más vendidos',
     data: [0, 0]
  }],
  //Title configuration (optional)
  title: {
     text: ''
  },
  //Boolean to control showing loading status on chart (optional)
  //Could be a string if you want to show specific loading text.
  loading: false,
  //Configuration for the xAxis (optional). Currently only one x axis can be dynamically controlled.
  //properties currentMin and currentMax provided 2-way binding to the chart's maximum and minimum
  xAxis: {
          title: {
            text: 'Productos y Ofertas'
          },
          categories: ['Producto: ' + $scope.prodMayorDescr, 'Oferta: '+$scope.oferMayorDescr]
        },
  yAxis: {
          // Pongo el título para el eje de las 'Y'
          title: {
            text: 'Cantidad de veces vendidos'
          }
        },
  //Whether to use Highstocks instead of Highcharts (optional). Defaults to false.
  useHighStocks: false,
  
  //function (optional)
  func: function (chart) {
   //setup some logic for the chart
  }
};
      
});


miAplicacion.controller('controlEstadisticaEncuesta',function($scope, fEncuestas){

 // Sample options for first chart
  $scope.unoA=0;
  $scope.unoB=0;
  $scope.unoC=0;
  $scope.dosA=0;
  $scope.dosB=0;
  $scope.dosC=0;
  $scope.cuatroA=0;
  $scope.cuatroB=0;
  $scope.cuatroC=0;
  $scope.sieteA=0;
  $scope.sieteB=0;
  $scope.sieteC=0;
  $scope.nueveA=0;
  $scope.nueveB=0;
  $scope.nueveC=0;

  fEncuestas.traerTodo()
  .then(function(respuesta) {       
         $scope.encuestas = respuesta;
         angular.forEach($scope.encuestas,function(value){
            //console.log(value);
            if(value.uno=='mucho')
            {
              $scope.unoA +=1;
            }
            if(value.uno=='poco')
            { 
              $scope.unoB +=1;
            }
            if(value.uno=='nada')
            { 
              $scope.unoC +=1;
            }

            if(value.dos=='mucho')
            {
              $scope.dosA +=1;
            }
            if(value.dos=='poco')
            { 
              $scope.dosB +=1;
            }
            if(value.dos=='nada')
            { 
              $scope.dosC +=1;
            }

            if(value.cuatro=='mucho')
            {
              $scope.cuatroA +=1;
            }
            if(value.cuatro=='poco')
            { 
              $scope.cuatroB +=1;
            }
            if(value.cuatro=='nada')
            { 
              $scope.cuatroC +=1;
            }

            if(value.siete=='mucho')
            {
              $scope.sieteA +=1;
            }
            if(value.siete=='poco')
            { 
              $scope.sieteB +=1;
            }
            if(value.siete=='nada')
            { 
              $scope.sieteC +=1;
            }

            if(value.nueve=='mucho')
            {
              $scope.nueveA +=1;
            }
            if(value.nueve=='poco')
            { 
              $scope.nueveB +=1;
            }
            if(value.nueve=='nada')
            { 
              $scope.nueveC +=1;
            }
          });

         $scope.chartConfig.series = [{
              name: 'Mucho',
              data: [$scope.unoA, $scope.dosA, $scope.cuatroA, $scope.sieteA, $scope.nueveA]

          }, {
              name: 'Poco',
              data: [$scope.unoB, $scope.dosB, $scope.cuatroB, $scope.sieteB, $scope.nueveB]

          }, {
              name: 'Nada',
              data: [$scope.unoC, $scope.dosC, $scope.cuatroC, $scope.sieteC, $scope.nueveC]

          }];
    },function errorCallback(response) {
         $scope.encuestas = [];
        console.log(response);     
   });
    

    $scope.chartConfig = {
          title: {
                 text: ""
              },
          options: {
                chart: {
                      type: 'column'
                   },
                plotOptions: {
                       series: {
                            stacking: ''
                             }
                    },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:black;padding:0">{series.name}: </td>' +
                '<td style="padding:0;color:black"><b>{point.y}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        }
             },
          xAxis: {
                  title: {
                    text: 'Encuestas'
                  },
                categories: [
                'Nos recomiendan',
                'Clientes satisfechos',
                'Necesidades satisfechas',
                'Nuestra responsabilidad',
                'Comprarían denuevo'
            ]
             },
        yAxis: {
                // Pongo el título para el eje de las 'Y'
                title: {
                  text: 'Clientes'
                }
              },
          credits: {
                enabled: true
             },
        series: [{
            name: 'Mucho',
            data: [$scope.unoA, $scope.dosA, $scope.cuatroA, $scope.sieteA, $scope.nueveA]

        }, {
            name: 'Poco',
            data: [$scope.unoB, $scope.dosB, $scope.cuatroB, $scope.sieteB, $scope.nueveB]

        }, {
            name: 'Nada',
            data: [$scope.unoC, $scope.dosC, $scope.cuatroC, $scope.sieteC, $scope.nueveC]

        }],
          loading: false
    }
      
});
