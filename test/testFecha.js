var request = require('supertest'),
	cf = require('../src/ComprobarFecha.js'),
	assert = require('assert');

describe( "Comprobación fecha", function() {
	// Fecha correcta al ser posterior al día actual 
	it('Fecha correcta', function (done) {
		assert.equal(true, cf.comprobarFecha(10, 10, 2030));
		done();
	});
	
	// Fecha inválida debido a que el año solo tiene 12 meses
	it('Fecha invalida', function (done) {
		assert.equal(false, cf.comprobarFecha(10, 15, 2030));
		done();
	});
	
	// Fecha invalida debido a que es anterior a la fecha actual
	it('Fecha anterior', function (done) {
		assert.equal(false, cf.comprobarFecha(10, 10, 2010));
		done();
	});
});
