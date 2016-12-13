var mongoose= require('mongoose')
var AlumnoSchema= new mongoose.Schema({
    "nombre": String,
    "apellido": String,
    "email": String,
    "id": Number
})

mongoose.model('Alumno',AlumnoSchema);