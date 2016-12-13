   function profesor() {
       var datos = {
           "nombre": $("#nombre").val(),
           "apellidos":$("#apellidos").val(),
           "email":$("#email").val(),
           "id":$("#id").val()
       };
       $.ajax({
           url: '/ProfesorCreate'
           data: datos
       })
   }