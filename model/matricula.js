var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Alumno = mongoose.model("Alumno");
var alumno = new Alumno;
var Asignatura = mongoose.model("Asignatura");
var asignatura = new Asignatura; 
var matriculaSchema = new mongoose.Schema({
    "id": Number,
    "alumno":{type: Schema.Types.Object, ref: "Alumno"},
    "fecha_ini": String,
    "fecha_fin": String,
    "asignatura": {type: Schema.Types.Object, ref: "Asignatura"}
});

mongoose.model('Matricula', matriculaSchema);