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
	
	it('Devolución galardonados física', function (done) {
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
		.post('/Tareas/0/acontecimiento=Laboratorio')
		.expect('Content-Type', /json/)
		.expect(200, done);
	});
	
	it('Modificación día', function (done) {
	request(app)
		.post('/Tareas/0/fecha=11-01-2019')
		.expect('Content-Type', /json/)
		.expect(200, done);
	});
	
	it('Modificación hora', function (done) {
	request(app)
		.post('/Tareas/0/hora=16:00')
		.expect('Content-Type', /json/)
		.expect(200, done);
	});

	it('Error id', function (done) {
	request(app)
		.post('/Tareas/790/acontecimiento=Cita')
		.expect('Content-Type', /json/)
		.expect(405, done);
	});
	
	it('Error', function (done) {
	request(app)
		.post('/Tareas')
		.expect(404, done);
	});
});


describe( "DELETE App", function() {
	it('Eliminación', function (done) {
	request(app)
		.delete('/Tareas/0')
		.expect('Content-Type', /json/)
		.expect(200, done);
	});
	
	it('Error id', function (done) {
	request(app)
		.delete('/Tareas/790')
		.expect('Content-Type', /json/)
		.expect(405, done);
	});

	it('Error', function (done) {
	request(app)
		.delete('/Tareas')
		.expect(404, done);
	});
});
