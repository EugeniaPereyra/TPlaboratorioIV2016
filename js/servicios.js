// SERVICIOS

miAplicacion.service('cargadorDeFoto',function($http,FileUploader){
    this.CargarFoto=function(nombrefoto,objetoUploader){
        var direccion="fotos/"+nombrefoto;  
      $http.get(direccion,{responseType:"blob"})
        .then(function (respuesta){
            var mimetype=respuesta.data.type;
            var archivo=new File([respuesta.data],direccion,{type:mimetype});
            var dummy= new FileUploader.FileItem(objetoUploader,{});
            dummy._file=archivo;
            dummy.file={};
            dummy.file= new File([respuesta.data],nombrefoto,{type:mimetype});

              objetoUploader.queue.push(dummy);
         });
    }

});

miAplicacion.service('cargadorDeFotoProd',function($http,FileUploader){
    this.CargarFoto=function(nombrefoto1,nombrefoto2,nombrefoto3,objetoUploader){
        var direccion1="fotosProd/"+nombrefoto1; 
        var direccion2="fotosProd/"+nombrefoto2;
        var direccion3="fotosProd/"+nombrefoto3;

      $http.get(direccion1,{responseType:"blob"})
        .then(function (respuesta){
            var mimetype=respuesta.data.type;
            var archivo=new File([respuesta.data],direccion1,{type:mimetype});
            var dummy= new FileUploader.FileItem(objetoUploader,{});
            dummy._file=archivo;
            dummy.file={};
            dummy.file= new File([respuesta.data],nombrefoto1,{type:mimetype});

              objetoUploader.queue.push(dummy);
         });

      $http.get(direccion2,{responseType:"blob"})
        .then(function (respuesta){
            var mimetype=respuesta.data.type;
            var archivo=new File([respuesta.data],direccion2,{type:mimetype});
            var dummy= new FileUploader.FileItem(objetoUploader,{});
            dummy._file=archivo;
            dummy.file={};
            dummy.file= new File([respuesta.data],nombrefoto2,{type:mimetype});

              objetoUploader.queue.push(dummy);
         });

      $http.get(direccion3,{responseType:"blob"})
        .then(function (respuesta){
            var mimetype=respuesta.data.type;
            var archivo=new File([respuesta.data],direccion3,{type:mimetype});
            var dummy= new FileUploader.FileItem(objetoUploader,{});
            dummy._file=archivo;
            dummy.file={};
            dummy.file= new File([respuesta.data],nombrefoto3,{type:mimetype});

              objetoUploader.queue.push(dummy);
         });
    }

});


miAplicacion.service('cargadorDeFotoOfer',function($http,FileUploader){
    this.CargarFoto=function(nombrefoto,objetoUploader){
        var direccion="fotosOfer/"+nombrefoto;  
      $http.get(direccion,{responseType:"blob"})
        .then(function (respuesta){
            var mimetype=respuesta.data.type;
            var archivo=new File([respuesta.data],direccion,{type:mimetype});
            var dummy= new FileUploader.FileItem(objetoUploader,{});
            dummy._file=archivo;
            dummy.file={};
            dummy.file= new File([respuesta.data],nombrefoto,{type:mimetype});

              objetoUploader.queue.push(dummy);
         });
    }

});


miAplicacion.service('cargadorDeFotoSuc',function($http,FileUploader){
    this.CargarFoto=function(nombrefoto1,nombrefoto2,nombrefoto3,objetoUploader){
        var direccion1="fotosSuc/"+nombrefoto1; 
        var direccion2="fotosSuc/"+nombrefoto2;
        var direccion3="fotosSuc/"+nombrefoto3;

      $http.get(direccion1,{responseType:"blob"})
        .then(function (respuesta){
            var mimetype=respuesta.data.type;
            var archivo=new File([respuesta.data],direccion1,{type:mimetype});
            var dummy= new FileUploader.FileItem(objetoUploader,{});
            dummy._file=archivo;
            dummy.file={};
            dummy.file= new File([respuesta.data],nombrefoto1,{type:mimetype});

              objetoUploader.queue.push(dummy);
         });

      $http.get(direccion2,{responseType:"blob"})
        .then(function (respuesta){
            var mimetype=respuesta.data.type;
            var archivo=new File([respuesta.data],direccion2,{type:mimetype});
            var dummy= new FileUploader.FileItem(objetoUploader,{});
            dummy._file=archivo;
            dummy.file={};
            dummy.file= new File([respuesta.data],nombrefoto2,{type:mimetype});

              objetoUploader.queue.push(dummy);
         });

      $http.get(direccion3,{responseType:"blob"})
        .then(function (respuesta){
            var mimetype=respuesta.data.type;
            var archivo=new File([respuesta.data],direccion3,{type:mimetype});
            var dummy= new FileUploader.FileItem(objetoUploader,{});
            dummy._file=archivo;
            dummy.file={};
            dummy.file= new File([respuesta.data],nombrefoto3,{type:mimetype});

              objetoUploader.queue.push(dummy);
         });

    }

});