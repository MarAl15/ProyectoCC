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

// https://carlosazaustre.es/como-crear-una-api-rest-usando-node-js/

/*
https://docs.mongodb.com/manual/reference/operator/aggregation/hour/
https://www.mongodb.com/blog/post/schema-design-for-time-series-data-in-mongodb
https://stackoverflow.com/questions/17008683/doing-range-queries-in-mongoose-for-hour-day-month-year
https://stackoverflow.com/questions/47887357/mongoose-query-for-hour-range-with-counter-filed/47893996

https://docs.mongodb.com/manual/reference/bson-types/#document-bson-type-timestamp
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
	//Notas: String
});

// Para guardarlo en una colección llamadas Tareas de mongodb
module.exports = mongoose.model('Tareas',tarea)
