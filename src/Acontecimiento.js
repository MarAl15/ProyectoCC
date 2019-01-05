"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* 
  Definición de la clase Acontecimiento: 
    var este_acontecimiento = new Acontecimiento({
		Etiqueta: etiqueta,
		Fecha: dia-mes-anio,
		Hora: hora:minutos
	});
    	`Etiqueta` = etiqueta clarificativa sobre el acontecimiento.
		`Fecha` = día que tiene lugar.
		`Hora` = hora a la que empieza.
*/

var acontecimiento = new Schema({
	Etiqueta: { 
		type: String, 
		required: [true, "Etiqueta no puede ser vacio"]
	},
	Fecha: { 
		type: String, 
		required: [true, "Fecha no puede ser vacia"]
	},
	Hora: String
});

// Para guardarlo en una colección llamadas Acontecimientos de mongodb
module.exports = mongoose.model('Acontecimientos',acontecimiento)
