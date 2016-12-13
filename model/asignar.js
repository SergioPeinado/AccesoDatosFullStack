var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Profesor = mongoose.model("Profesor");
var profesor = new Profesor;
var Asignatura = mongoose.model("Asignatura");
var asignatura = new Asignatura; 
var asignarSchema = new mongoose.Schema({
    "id": Number,
    "profesor":{type: Schema.Types.Object, ref: "Profesor"},
    "horas": Number,
    "fecha_ini": String,
    "fecha_fin": String,
    "asignatura": {type: Schema.Types.Object, ref: "Asignatura"}
});

mongoose.model('Asignar', asignarSchema);