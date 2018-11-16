var assert = require('assert'),
	tarea = require('../src/Tarea.js');

var nueva_tarea = new tarea.Tarea("Reunion","12-12-2018","13:00");

describe( "DATOS Tarea", function() {
	it('Acontecimiento', function (done) {
		nueva_tarea.setAcontecimiento("Laboratorio");
		assert.equal("Laboratorio", nueva_tarea.getAcontecimiento());
		done();
	});
	
	it('Día', function (done) {
		nueva_tarea.setDia("15-01-2019");
		assert.equal("15-01-2019", nueva_tarea.getDia());
		done();
	});
	
	it('Hora', function (done) {
		nueva_tarea.setHora("16:00");
		assert.equal("16:00", nueva_tarea.getHora());
		done();
	});
});

