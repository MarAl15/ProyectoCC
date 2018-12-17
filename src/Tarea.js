"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* 
  Definición de la clase Tarea: 
    var esta_tarea = new Tarea({
		Acontecimiento: acontecimiento,
		Fecha: dia-mes-anio,
		Hora: hora:minutos
	});
    	`Acontecimiento` = acontecimiento relacionado con la tarea.
		`Fecha` = día que tiene lugar.
		`Hora` = hora a la que empieza.
*/

var tarea = new Schema({
	Acontecimiento: { 
		type: String, 
		required: [true, "Acontecimiento no puede ser vacio"]
	},
	Fecha: { 
		type: String, 
		required: [true, "Fecha no puede ser vacia"]
	},
	Hora: String
});

// Para guardarlo en una colección llamadas Tareas de mongodb
module.exports = mongoose.model('Tareas',tarea)
