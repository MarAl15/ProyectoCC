var request = require('supertest'),
	Acontecimiento = require('../src/Acontecimiento.js'),
	app = require('../src/app.js'),
	mongoose = require('mongoose');
	
var ObjectId = require('mongodb').ObjectID;

var esta_acontecimiento = new Acontecimiento({
		_id: ObjectId("51c420ba77edcdc3ec709218"),
		Etiqueta: "Otro",
		Fecha: "11-10-2019",
		Hora: "12:00"
	});
	
esta_acontecimiento.save();

describe( "GET App", function() {
	it('Devolución de la dirección raíz', function (done) {
	request(app)
		.get('/')
		.expect('Content-Type', /json/)
		.expect(200, done);
	});

	it('Devolución acontecimientos', function (done) {
	request(app)
		.get('/Acontecimientos')
		.expect('Content-Type', /json/)
		.expect(200, done);
	});
	
	it('Error', function (done) {
	request(app)
		.get('/Acontecimientos/DiezNegritos')
		.expect(404, done);
	});
});


describe( "PUT App", function() {
	it('Creación', function (done) {
	request(app)
		.put('/Acontecimientos/Reunion/12-12-2018/13:00')
		.expect('Content-Type', /json/)
		.expect(200, done);
	});

	it('Error', function (done) {
	request(app)
		.put('/Acontecimientos')
		.expect(404, done);
	});
});


describe( "POST App", function() {
	it('Modificación etiqueta', function (done) {
	request(app)
		.post('/Acontecimientos/51c420ba77edcdc3ec709218/etiqueta=Laboratorio')
		.expect('Content-Type', /json/)
		.expect(200, done);
	});
	
	it('Modificación día', function (done) {
	request(app)
		.post('/Acontecimientos/51c420ba77edcdc3ec709218/fecha=11-01-2019')
		.expect('Content-Type', /json/)
		.expect(200, done);
	});
	
	it('Modificación hora', function (done) {
	request(app)
		.post('/Acontecimientos/51c420ba77edcdc3ec709218/hora=16:00')
		.expect('Content-Type', /json/)
		.expect(200, done);
	});

	it('Error ID Etiqueta', function (done) {
	request(app)
		.post('/Acontecimientos/63c420ba75edcdc3ec709218/etiqueta=Laboratorio')
		.expect('Content-Type', /json/)
		.expect(405, done);
	});
	
	it('Error ID Fecha', function (done) {
	request(app)
		.post('/Acontecimientos/63c420ba75edcdc3ec709218/fecha=11-01-2019')
		.expect('Content-Type', /json/)
		.expect(405, done);
	});
	
	it('Error ID Hora', function (done) {
	request(app)
		.post('/Acontecimientos/63c420ba75edcdc3ec709218/hora=16:00')
		.expect('Content-Type', /json/)
		.expect(405, done);
	});
	
	it('Error', function (done) {
	request(app)
		.post('/Acontecimientos')
		.expect(404, done);
	});
});

describe( "DELETE App", function() {
	it('Eliminación acontecimiento', function (done) {
	request(app)
		.delete('/Acontecimientos/51c420ba77edcdc3ec709218')
		.expect('Content-Type', /json/)
		.expect(200, done);
	});
	
	it('Error ID', function (done) {
	request(app)
		.delete('/Acontecimientos/63c420ba75edcdc3ec709218')
		.expect('Content-Type', /json/)
		.expect(405, done);
	});
	
	it('Eliminación completa', function (done) {
	request(app)
		.delete('/Acontecimientos')
		.expect('Content-Type', /json/)
		.expect(200, done);
	});
});

/*
// https://github.com/visionmedia/supertest/issues/437 - Arreglar el error de no terminar
describe( "Finalizar", function() {
	it('Cierre conexión MongoDB', function (done) {
		mongoose.connection.close();
		done();
	});
});*/

