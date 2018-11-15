var request = require('supertest'),
app = require('../src/app.js');


describe( "GET Calendario", function() {
	it('Devolución de la dirección raíz', function (done) {
	request(app)
		.get('/')
		.expect('Content-Type', /json/)
		.expect(200, done);
	});

	it('Devolución calendario', function (done) {
	request(app)
		.get('/Calendario')
		.expect('Content-Type', /json/)
		.expect(200, done);
	});
	
	it('Error', function (done) {
	request(app)
		.get('/Calendario/DiezNegritos')
		.expect(404, done);
	});
});

describe( "PUT Calendario", function() {
	it('Creación', function (done) {
	request(app)
		.put('/Calendario/Reunion/12-12-2018/13:00')
		.expect('Content-Type', /json/)
		.expect(200, done);
	});

	it('Error', function (done) {
	request(app)
		.put('/Calendario')
		.expect(404, done);
	});
});


describe( "POST Calendario", function() {
	it('Modificación acontecimiento', function (done) {
	request(app)
		.post('/Calendario/0/Laboratorio')
		.expect('Content-Type', /json/)
		.expect(200, done);
	});
	
	it('Modificación día', function (done) {
	request(app)
		.post('/Calendario/0//11-01-2019')
		.expect('Content-Type', /json/)
		.expect(200, done);
	});
	
	it('Modificación hora', function (done) {
	request(app)
		.post('/Calendario/0///16:00')
		.expect('Content-Type', /json/)
		.expect(200, done);
	});

	it('Error id', function (done) {
	request(app)
		.post('/Calendario')
		.expect(404, done);
	});
	
	it('Error', function (done) {
	request(app)
		.post('/Calendario')
		.expect(404, done);
	});
});


describe( "DELETE Calendario", function() {
	it('Creación', function (done) {
	request(app)
		.delete('/Calendario/0')
		.expect('Content-Type', "text/html; charset=utf-8")
		.expect(200, done);
	});
	
	it('Error id', function (done) {
	request(app)
		.delete('/Calendario/790')
		.expect(404, done);
	});

	it('Error', function (done) {
	request(app)
		.delete('/Calendario')
		.expect(404, done);
	});
});
