var request = require('supertest'),
	cf = require('../src/ComprobarFecha.js'),
	assert = require('assert');

describe( "Comprobación fecha", function() {
	it('Fecha correcta', function (done) {
		assert.equal(true, cf.comprobarFecha(10, 10, 2030));
		done();
	});
	
	it('Fecha invalida', function (done) {
		assert.equal(false, cf.comprobarFecha(10, 13, 2030));
		done();
	});
	
	it('Fecha anterior', function (done) {
		assert.equal(false, cf.comprobarFecha(10, 10, 2010));
		done();
	});
});
