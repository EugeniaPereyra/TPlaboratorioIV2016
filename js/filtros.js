miAplicacion.filter('perfil', function () {
  	var perfil = {
  		administrador: 'Administrador',
  		encargado: 'Encargado',
      empleado: 'Empleado',
      cliente: 'Cliente'
  	}
    return function (input) {
    	if (!input)
    		return '';
      return perfil[input];
    };
  });

miAplicacion.filter('estado', function () {
    var estado = {
      activo: 'Activo',
      bloqueado: 'Bloqueado'
    }
    return function (input) {
      if (!input)
        return '';
      return estado[input];
    };
  });

miAplicacion.filter('estadoPed', function () {
    var estadoPed = {
      procesando: 'En proceso',
      cancelado: 'Cancelado',
      finalizado: 'Finalizado'
    }
    return function (input) {
      if (!input)
        return '';
      return estadoPed[input];
    };
  });