var request = require('supertest'),
	Tarea = require('../src/Tarea.js'),
	app = require('../src/app.js');
	
var ObjectId = require('mongodb').ObjectID;

var esta_tarea = new Tarea({
		_id: ObjectId("51c420ba77edcdc3ec709218"),
		Acontecimiento: "Otro",
		Fecha: "11-10-2019",
		Hora: "12:00"
	});
	
esta_tarea.save();

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
		.post('/Tareas/51c420ba77edcdc3ec709218/acontecimiento=Laboratorio')
		.expect('Content-Type', /json/)
		.expect(200, done);
	});
	
	it('Modificación día', function (done) {
	request(app)
		.post('/Tareas/51c420ba77edcdc3ec709218/fecha=11-01-2019')
		.expect('Content-Type', /json/)
		.expect(200, done);
	});
	
	it('Modificación hora', function (done) {
	request(app)
		.post('/Tareas/51c420ba77edcdc3ec709218/hora=16:00')
		.expect('Content-Type', /json/)
		.expect(200, done);
	});

	it('Error', function (done) {
	request(app)
		.post('/Tareas')
		.expect(404, done);
	});
});


describe( "DELETE App", function() {
	it('Eliminación Tarea', function (done) {
	request(app)
		.delete('/Tareas/51c420ba77edcdc3ec709218')
		.expect('Content-Type', /json/)
		.expect(200, done);
	});
	
	it('Eliminación completa', function (done) {
	request(app)
		.delete('/Tareas')
		.expect('Content-Type', /json/)
		.expect(200, done);
	});
});
