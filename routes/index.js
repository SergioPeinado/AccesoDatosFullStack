var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/ProfesorRead', function(req, res, next){
   var Profesor = mongoose.model('Profesor');
     Profesor.find({}, function(error, datos){
         if(!error){
             res.render('ProfesorRead', {"profesores":datos});
        }
    });
});
router.get('/ProfesorCreate', function(req,res,next){
    res.render('ProfesorCreate');
})
router.post('/ProfesorCreate', function(req, res, next){
    var Profesor = mongoose.model('Profesor');   
    var nombre = req.body.nombre;
    var apellido = req.body.apellidos;
    var email = req.body.email;
    var id= req.body.id;
    var profesor = new Profesor ({
        "nombre": nombre,
        "apellido": apellido,
        "email": email,
        "id": id
    });
    profesor.save(profesor, function(error, datos){
        if(!error){
            res.redirect('/');
        }
    });
});
router.get('/ProfesorDelete', function(req,res, next){
     var Profesor = mongoose.model('Profesor');
     Profesor.find({}, function(error, datos){
         if(!error){
             res.render('ProfesorDelete', {"profesores":datos});
         }else{
             res.send('ERROR!');
         }
     })
});
 router.post('/ProfesorDelete', function(req,res, next){
     var id= req.body.id;
     var Profesor = mongoose.model('Profesor');
     Profesor.remove({"_id": id}, function (error, datos){
        if(!error){
            res.redirect('/ProfesorDelete');
        }else{
            res.send("Error: Profesor no borrado");
        }
     });
 });
 router.get('/ProfesorUpdate', function(req,res, next){
     var Profesor = mongoose.model('Profesor');
     Profesor.find({}, function(error, datos){
         if(!error){
             res.render('ProfesorUpdate', {"profesores":datos});
         }else{
             res.send('ERROR!');
         }
     })
});
router.post('/ProfesorUpdate', function(req, res, nexy){
    if(req.body._id===undefined){
        res.redirect('/ProfesorUpdate');
    }else{
        if(req.body.nombre && req.body.apellidos && req.body.email && req.body.id){
         var profesor = {
                "id" : req.body.id ,
                "nombre": req.body.nombre,
                "apellido": req.body.apellidos,
                "email":req.body.email
            };
            var Profesor = mongoose.model('Profesor');
            Profesor.update({"_id":req.body._id}, profesor, function(error, datos){
                if(!error){
                    res.redirect('/ProfesorUpdate');
                }else{
                    res.render('Error');
                }
            })
    }else{
      var Profesor = mongoose.model('Profesor');
          Profesor.findOne({"_id": req.body._id},{},function(error, datos){
               if(!error){
                   res.render('ProfesorUpdateForm',{profesor:datos});
               }else{
                   //Nunca llegamos aquí salvo con peticiones con CURL
                   res.redirect('/ProfesorUpdate');
               }   
         });
      }
    }
});
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//AQUI EMPIEZA LA PARTE DEL CRUD DEL ALUMNO
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
router.get('/AlumnoRead', function(req, res, next){
   var Alumno = mongoose.model('Alumno');
     Alumno.find({}, function(error, datos){
         if(!error){
             res.render('AlumnoRead', {"alumnos":datos});
        }
    });
});
router.get('/AlumnoCreate', function(req,res,next){
    res.render('AlumnoCreate');
})
router.post('/AlumnoCreate', function(req, res, next){
    var Alumno = mongoose.model('Alumno');
    var alumno = new Alumno({
        "nombre": req.body.nombre,
        "apellido": req.body.apellidos,
        "email" : req.body.emai,
        "id": req.body.id
    });
    alumno.save(alumno, function(error, datos){
        if(!error){
            res.redirect('/');
        }
    });
});
router.get('/AlumnoDelete', function(req,res, next){
     var Alumno = mongoose.model('Alumno');
     Alumno.find({}, function(error, datos){
         if(!error){
             res.render('AlumnoDelete', {"alumnos":datos});
         }else{
             res.send('ERROR!');
         }
     })
});
 router.post('/AlumnoDelete', function(req,res, next){
     var id= req.body.id;
     var Alumno = mongoose.model('Alumno');

     Alumno.remove({"_id": id}, function (error, datos){
        if(!error){
            res.redirect('/AlumnoDelete');
        }else{
            res.send("Error: Alumno no borrado");
        }
     });
 });
 router.get('/AlumnoUpdate', function(req,res, next){
     var Alumno = mongoose.model('Alumno');
     Alumno.find({}, function(error, datos){
         if(!error){
             res.render('AlumnoUpdate', {"alumnos":datos});
         }else{
             res.send('ERROR!');
         }
     })
});
router.post('/AlumnoUpdate', function(req, res, nexy){
    if(req.body._id===undefined){
        res.redirect('/AlumnoUpdate');
    }else{
        if(req.body.nombre && req.body.apellidos && req.body.email && req.body.id){
         var alumno = {
                "id" : req.body.id ,
                "nombre": req.body.nombre,
                "apellido": req.body.apellidos,
                "email":req.body.email
            };
            var Alumno = mongoose.model('Alumno');
            Alumno.update({"_id":req.body._id}, alumno, function(error, datos){
                if(!error){
                    res.redirect('/AlumnoUpdate');
                }else{
                    res.render('Error');
                }
            })
    }else{
      var Alumno = mongoose.model('Alumno');
          Alumno.findOne({"_id": req.body._id},{},function(error, datos){
               if(!error){
                   res.render('AlumnoUpdateForm',{alumno:datos});
               }else{
                   //Nunca llegamos aquí salvo con peticiones con CURL
                   res.redirect('/AlumnoUpdate');
               }   
         });
      }
    }
});
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//AQUI EMPIEZA EL CRUD DE LAS ASIGNATURAS
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
router.get('/AsignaturaRead', function(req, res, next){
   var Asignatura = mongoose.model('Asignatura');
     Asignatura.find({}, function(error, datos){
         if(!error){
             res.render('AsignaturaRead', {"asignaturas":datos});
        }
    });
});
router.get('/AsignaturaCreate', function(req,res,next){
    res.render('AsignaturaCreate');
})
router.post('/AsignaturaCreate', function(req, res, next){
    var Asignatura = mongoose.model('Asignatura');
    var asignatura = new Asignatura({
        "nombre": req.body.nombre,
        "curso": req.body.curso,
        "id": req.body.id
    });
    asignatura.save(asignatura, function(error, datos){
        if(!error){
            res.redirect('/');
        }
    });
});
router.get('/AsignaturaDelete', function(req,res, next){
     var Asignatura = mongoose.model('Asignatura');
     Asignatura.find({}, function(error, datos){
         if(!error){
             res.render('AsignaturaDelete', {"asignaturas":datos});
         }else{
             res.send('ERROR!');
         }
     })
});
 router.post('/AsignaturaDelete', function(req,res, next){
     var id= req.body.id;
     var Asignatura = mongoose.model('Asignatura');

     Asignatura.remove({"_id": id}, function (error, datos){
        if(!error){
            res.redirect('/AsignaturaDelete');
        }else{
            res.send("Error: Asignatura no borrada");
        }
     });
 });
 router.get('/AsignaturaUpdate', function(req,res, next){
     var Asignatura = mongoose.model('Asignatura');
     Asignatura.find({}, function(error, datos){
         if(!error){
             res.render('AsignaturaUpdate', {"asignaturas":datos});
         }else{
             res.send('ERROR!');
         }
     })
});
router.post('/AsignaturaUpdate', function(req, res, nexy){
    if(req.body._id===undefined){
        res.redirect('/AsignaturaUpdate');
    }else{
        if(req.body.nombre && req.body.curso && req.body.id){
         var asignatura = {
        "nombre": req.body.nombre,
        "curso": req.body.curso,
        "id": req.body.id
    };
            var Asignatura = mongoose.model('Asignatura');
            Asignatura.update({"_id":req.body._id}, asignatura, function(error, datos){
                if(!error){
                    res.redirect('/AsignaturaUpdate');
                }else{
                    res.render('Error');
                }
            })
    }else{
      var Asignatura = mongoose.model('Asignatura');
          Asignatura.findOne({"_id": req.body._id},{},function(error, datos){
               if(!error){
                   res.render('AsignaturaUpdateForm',{asignatura:datos});
               }else{
                   //Nunca llegamos aquí salvo con peticiones con CURL
                   res.redirect('/AsignaturaUpdate');
               }   
         });
      }
    }
});
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//AQUI EMPIEZA EL CRUD DE LAS MATRICULACIONES
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
router.get('/MatriculaRead', function(req, res, next){
   var Matricula = mongoose.model('Matricula');
     Matricula.find({}, function(error, datos){
         if(!error){
             res.render('MatriculaRead', {"matriculas":datos});
        }
    });
});
router.get('/MatriculaCreate', function(req,res,next){
    var Alumno = mongoose.model('Alumno');
    var Asignatura = mongoose.model('Asignatura');
    Alumno.find({}, function(error,datos){
        Asignatura.find({}, function(error, data){
        res.render('MatriculaCreate', {"alumnos": datos , "asignaturas": data});
        })
    })
    
})
router.post('/MatriculaCreate', function(req, res, next){
    var Matricula = mongoose.model('Matricula');
    var Alumno = mongoose.model('Alumno');
    var Asignatura = mongoose.model('Asignatura');
    Alumno.findOne({"_id": req.body.alumno},function(error, datos){
        var alumno = datos;
        Asignatura.findOne({"_id": req.body.asignatura},function(error, data){
            var asignatura = data;            
             var matricula= new Matricula({
                "id": req.body.id,
                "alumno": alumno,
                "fecha_ini": req.body.fecha_ini,
                "fecha_fin": req.body.fecha_fin,
                "asignatura": asignatura
            });
        matricula.save(matricula, function(error, datos){
            if(!error){
                res.redirect('/');
                }
             });      
         });
    });
});
router.get('/MatriculaDelete', function(req,res, next){
     var Matricula = mongoose.model('Matricula');
     Matricula.find({}, function(error, datos){
         if(!error){
             res.render('MatriculaDelete', {"matriculas":datos});
         }else{
             res.send('ERROR!');
         }
     })
});
router.post('/MatriculaDelete', function(req,res, next){
     var id= req.body.id;
     var Matricula = mongoose.model('Matricula');

     Matricula.remove({"_id": id}, function (error, datos){
        if(!error){
            res.redirect('/MatriculaDelete');
        }else{
            res.send("Error: Matricula no borrada");
        }
     });
 });
  router.get('/MatriculaUpdate', function(req,res, next){
     var Matricula = mongoose.model('Matricula');
     
     Matricula.find({}, function(error, datos){
         if(!error){
             res.render('MatriculaUpdate', {"matriculas":datos});
         }else{
             res.send('ERROR!');
         }
     })
});
router.post('/MatriculaUpdate', function(req, res, nexy){
    if(req.body._id===undefined){
        res.redirect('/MatriculaUpdate');
    }else{
        if( req.body.id && req.body.fecha_fin && req.body.fecha_ini){ 
            var Alumno = mongoose.model('Alumno');
            var Asignatura = mongoose.model('Asignatura'); 
            Alumno.findOne({"_id": req.body.alumno},function(error, datos){
                var alumno = datos;
            Asignatura.findOne({"_id": req.body.asignatura},function(error, data){
                var asignatura = data
             var matricula= {
                "id": req.body.id,
                "alumno": alumno,
                "fecha_ini": req.body.fecha_ini,
                "fecha_fin": req.body.fecha_fin,
                "asignatura": asignatura
            };
            var Matricula = mongoose.model('Matricula');
            Matricula.update({"_id":req.body._id}, matricula, function(error, datos){
                if(!error){
                    res.redirect('/MatriculaUpdate');
                }else{
                    res.render('Error');
                }
            })
         });
    });
    }else{
      var Matricula = mongoose.model('Matricula');
      var Alumno = mongoose.model('Alumno');
      var Asignatura = mongoose.model('Asignatura');
          Matricula.findOne({"_id": req.body._id},{},function(error, datos){
              Alumno.find({}, function(error,data){
                  Asignatura.find({}, function(error, dt){
                    if(!error){
                   res.render('MatriculaUpdateForm',{"matricula":datos, "alumnos":data, "asignaturas": dt});
                        }else{
                   //Nunca llegamos aquí salvo con peticiones con CURL
                   res.redirect('/MatriculaUpdate');
                     }
                  })
              })
                  
         });
      }
    }
});
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//AQUI EMPIEZA EL CRUD DE LAS ASIGNATURAS IMPARTIDAS
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
router.get('/ImpartirRead', function(req, res, next){
   var Asignar = mongoose.model('Asignar');
     Asignar.find({}, function(error, datos){
         if(!error){
             res.render('ImpartirRead', {"asignaciones":datos});
        }
    });
});
router.get('/ImpartirCreate', function(req,res,next){
    var Profesor = mongoose.model('Profesor');
    var Asignatura = mongoose.model('Asignatura');
    Profesor.find({}, function (error, datos){
        Asignatura.find({}, function(error, data){
            res.render('ImpartirCreate', {"profesores": datos, "asignaturas": data});
        })
    })
    
})
router.post('/ImpartirCreate', function(req, res, next){
    var Asignar = mongoose.model('Asignar');
    var Profesor = mongoose.model('Profesor');
    var Asignatura = mongoose.model('Asignatura');
    Profesor.findOne({"_id": req.body.profesor},function(error, datos){
        var profesor = datos;
        Asignatura.findOne({"_id": req.body.asignatura},function(error, data){
            var asignatura = data;           
             var asignar= new Asignar({
                "id": req.body.id,
                "profesor": profesor,
                "horas": req.body.horas,
                "fecha_ini": req.body.fecha_ini,
                "fecha_fin": req.body.fecha_fin,
                "asignatura": asignatura
            });
        asignar.save(asignar, function(error, datos){
            if(!error){
                res.redirect('/');
            }
        });      
      }); 
   });
});
router.get('/ImpartirDelete', function(req,res, next){
     var Asignar = mongoose.model('Asignar');
     Asignar.find({}, function(error, datos){
         if(!error){
             res.render('ImpartirDelete', {"asignaciones":datos});
         }else{
             res.send('ERROR!');
         }
     })
});
router.post('/ImpartirDelete', function(req,res, next){
     var id= req.body.id;
     var Asignar = mongoose.model('Asignar');

     Asignar.remove({"_id": id}, function (error, datos){
        if(!error){
            res.redirect('/ImpartirDelete');
        }else{
            res.send("Error: Matricula no borrada");
        }
     });
 });
  router.get('/ImpartirUpdate', function(req,res, next){
     var Asignar = mongoose.model('Asignar');
     Asignar.find({}, function(error, datos){
         
         if(!error){
             res.render('ImpartirUpdate', {"asignaciones":datos});
         }else{
             res.send('ERROR!');
         }
     })
});
 router.post('/ImpartirUpdate', function(req, res, nexy){
    if(req.body._id===undefined){
        res.redirect('/ImpartirUpdate');
    }else{
        if( req.body.id && req.body.fecha_fin && req.body.fecha_ini && req.body.horas){ 
            var Profesor = mongoose.model('Profesor');
            var Asignatura = mongoose.model('Asignatura');
            Profesor.findOne({"_id": req.body.profesor},function(error, datos){
             var profesor = datos;
            Asignatura.findOne({"_id": req.body.asignatura},function(error, data){
             var asignatura = data; 
             var asignar= {
                "id": req.body.id,
                "profesor": profesor,
                "horas": req.body.horas,
                "fecha_ini": req.body.fecha_ini,
                "fecha_fin": req.body.fecha_fin,
                "asignatura": asignatura
                };
                var Asignar = mongoose.model('Asignar');
                 Asignar.update({"_id":req.body._id}, asignar, function(error, datos){
                if(!error){
                    res.redirect('/ImpartirUpdate');
                }else{
                    res.render('Error');
                    }
                })
            });
         });           
    }else{
      var Asignar = mongoose.model('Asignar');
      var Profesor = mongoose.model('Profesor');
      var Asignatura = mongoose.model('Asignatura');
          Asignar.findOne({"_id": req.body._id},{},function(error, datos){
              Profesor.find({}, function(error, data){
                  Asignatura.find({}, function(error, dt){
                    if(!error){
                         res.render('ImpartirUpdateForm',{"impartir":datos, "profesores": data, "asignaturas": dt});
                    }else{
                        //Nunca llegamos aquí salvo con peticiones con CURL
                        res.redirect('/ImpartirUpdate');
                    }   
                  })
              })
               
         });
      }
    }
});
module.exports = router;
