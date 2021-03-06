var miAplicacion = angular.module('angularABM',[
  'ui.router', 
  'ui.grid',
  'ui.grid.pagination',
  'ui.grid.resizeColumns',
  'ui.grid.selection',
  'ui.grid.exporter',
  'ui.grid.edit',
  'angularFileUpload', 
  'satellizer',
  'highcharts-ng',
  'ngMap'
  ]);

miAplicacion.config(function($stateProvider,$urlRouterProvider, $authProvider){

$authProvider.loginUrl='TPlaboratorioIV2016/servidor/php/auth.php';
$authProvider.tokenName='PizzeriaToken';
$authProvider.tokenPrefix='angularABM';
$authProvider.authHearder='data';

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
          templateUrl:'templates/registro.html',
          controller:'controlPersonaRegistro'
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
              templateUrl:'templates/grilla.html',
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

        .state(
          'persona.detallar',{
          url:'/personaDetallar/:persona',
          views:
          {
            'contenido':
            {
              templateUrl:'templates/persona/personaPerfil.html',
              controller:'controlPersonaDetallar'
            }
          }
        })

        .state(
          'persona.historial',{
          url:'/personaHistorial',
          views:
          {
            'contenido':
            {
              templateUrl:'templates/grilla.html',
              controller:'controlPersonaHistorial'
            }
          }
        })

        .state(
          'persona.encuesta',{
          url:'/personaEncuesta/:pedido',
          views:
          {
            'contenido':
            {
              templateUrl:'templates/encuesta.html',
              controller:'controlPersonaEncuesta'
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
              templateUrl:'templates/grilla.html',
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

        .state(
          'persona.prodDetallar',{
          url:'/productoDetallar/:producto',
          views:
          {
            'contenido':
            {
              templateUrl:'templates/producto/productoPerfil.html',
              controller:'controlProductoDetallar'
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
          url:'/ofertaGrilla/:sucursal',
          views:
          {
            'contenido':
            {
              templateUrl:'templates/grilla.html',
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

        .state(
          'persona.oferDetallar',{
          url:'/ofertaDetallar/:oferta',
          views:
          {
            'contenido':
            {
              templateUrl:'templates/producto/ofertaPerfil.html',
              controller:'controlOfertaDetallar'
            }
          }
        })

        // PEDIDOS

        .state(
          'persona.pedAlta',{
          url:'/pedidoAlta/:usuario',
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
          url:'/pedidoGrilla/:sucursal',
          views:
          {
            'contenido':
            {
              templateUrl:'templates/grilla.html',
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

        .state(
          'persona.pedDetallar',{
          url:'/pedidoDetallar/:pedido',
          views:
          {
            'contenido':
            {
              templateUrl:'templates/pedido/pedidoPerfil.html',
              controller:'controlPedidoDetallar'
            }
          }
        })

        // SUCURSALES

        .state(
          'persona.sucAlta',{
          url:'/sucursalAlta',
          views:
          {
            'contenido':
            {
              templateUrl:'templates/sucursal/sucursalAlta.html',
              controller:'controlSucursalAlta'
            }
          }
        })

        .state(
          'persona.sucGrilla',{
          url:'/sucursalGrilla',
          views:
          {
            'contenido':
            {
              templateUrl:'templates/grilla.html',
              controller:'controlSucursalGrilla'
            }
          }
        })

        .state(
          'persona.sucModificar',{
          url:'/sucursalModificar/:sucursal',
          views:
          {
            'contenido':
            {
              templateUrl:'templates/sucursal/sucursalAlta.html',
              controller:'controlSucursalModificar'
            }
          }
        })

        .state(
          'persona.sucDetallar',{
          url:'/sucursalDetallar/:sucursal',
          cache: false,
          views:
          {
            'contenido':
            {
              templateUrl:'templates/sucursal/sucursalPerfil.html',
              controller:'controlSucursalDetallar'
            }
          }
        })

        // ESTADISTICAS

        .state(
          'persona.estadisticaMenu',{
          url:'/estadisticaMenu',
          views:
          {
            'contenido':
            {
              templateUrl:'templates/estadistica/estadisticaMenu.html',
              controller:'controlEstadisticaMenu'
            }
          }
        })

        .state(
          'persona.estadisticaVentasLocal',{
          url:'/estadisticaVentasLocal',
          cache: false,
          views:
          {
            'contenido':
            {
              templateUrl:'templates/estadistica/estadistica.html',
              controller:'controlEstadisticaVentasLocal'
            }
          }
        })

        .state(
          'persona.estadisticaProductos',{
          url:'/estadisticaProductos',
          cache: false,
          views:
          {
            'contenido':
            {
              templateUrl:'templates/estadistica/estadistica.html',
              controller:'controlEstadisticaProductos'
            }
          }
        })

        .state(
          'persona.estadisticaEncuesta',{
          url:'/estadisticaEncuesta',
          cache: false,
          views:
          {
            'contenido':
            {
              templateUrl:'templates/estadistica/estadistica.html',
              controller:'controlEstadisticaEncuesta'
            }
          }
        })

        // RESERVAS

        .state(
          'persona.reservaGrilla',{
          url:'/reservaGrilla',
          cache: false,
          views:
          {
            'contenido':
            {
              templateUrl:'templates/grilla.html',
              controller:'controlReservaGrilla'
            }
          }
        })

        .state(
          'persona.reservaAlta',{
          url:'/reservaAlta',
          cache: false,
          views:
          {
            'contenido':
            {
              templateUrl:'templates/reserva/reservaAlta.html',
              controller:'controlReservaAlta'
            }
          }
        })

        .state(
          'persona.resModificar',{
          url:'/reservaModificar/:pedido',
          views:
          {
            'contenido':
            {
              templateUrl:'templates/reserva/reservaAlta.html',
              controller:'controlReservaModificar'
            }
          }
        })

        .state(
          'persona.resDetallar',{
          url:'/reservaDetallar/:pedido',
          views:
          {
            'contenido':
            {
              templateUrl:'templates/reserva/reservaPerfil.html',
              controller:'controlReservaDetallar'
            }
          }
        })


  $urlRouterProvider.otherwise('/inicio');


});
