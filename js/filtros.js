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
