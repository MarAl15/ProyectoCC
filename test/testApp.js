var request = require('supertest'),
app = require('../src/app.js');


describe( "GET App", function() {
	it('Devolución de la dirección raíz', function (done) {
	request(app)
		.get('/')
		.expect('Content-Type', /json/)
		.expect(200, done);
	});

	it('Devolución tareas', function (done) {
	request(app)
		.get('/Tareas')
		.expect('Content-Type', /json/)
		.expect(200, done);
	});
	
	it('Error', function (done) {
	request(app)
		.get('/Tareas/DiezNegritos')
		.expect(404, done);
	});
});


describe( "PUT App", function() {
	it('Creación', function (done) {
	request(app)
		.put('/Tareas/Reunion/12-12-2018/13:00')
		.expect('Content-Type', /json/)
		.expect(200, done);
	});

	it('Error', function (done) {
	request(app)
		.put('/Tareas')
		.expect(404, done);
	});
});


describe( "POST App", function() {
	it('Modificación acontecimiento', function (done) {
	request(app)
		.post('/Tareas/0/Laboratorio')
		.expect('Content-Type', /json/)
		.expect(200, done);
	});
	
	it('Modificación día', function (done) {
	request(app)
		.post('/Tareas/0//11-01-2019')
		.expect('Content-Type', /json/)
		.expect(200, done);
	});
	
	it('Modificación hora', function (done) {
	request(app)
		.post('/Tareas/0///16:00')
		.expect('Content-Type', /json/)
		.expect(200, done);
	});

	it('Error id', function (done) {
	request(app)
		.post('/Tareas')
		.expect(404, done);
	});
	
	it('Error', function (done) {
	request(app)
		.post('/Tareas')
		.expect(404, done);
	});
});


describe( "DELETE App", function() {
	it('Creación', function (done) {
	request(app)
		.delete('/Tareas/0')
		.expect('Content-Type', "text/html; charset=utf-8")
		.expect(200, done);
	});
	
	it('Error id', function (done) {
	request(app)
		.delete('/Tareas/790')
		.expect(404, done);
	});

	it('Error', function (done) {
	request(app)
		.delete('/Tareas')
		.expect(404, done);
	});
});
