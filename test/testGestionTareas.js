var assert = require('assert'),
	tareas = require('../src/GestionTareas.js');

var lista_tareas = new tareas.GestionTareas();

describe( "DATOS Gestion tarea", function() {
	it('Insertar tarea', function (done) {
		var tam = lista_tareas.numTareas();
		lista_tareas.pushTarea("Laboratorio", "15-01-2019", "16:00");
		assert.equal(tam+1, lista_tareas.numTareas());
		done();
	});
	
	it('Modificar acontecimiento', function (done) {
		var tam = lista_tareas.numTareas();
		assert.equal(true, lista_tareas.editAcontecimiento(0, "Laboratorio"));
		assert.equal(tam, lista_tareas.numTareas());
		done();
	});
	
	it('Error modificar acontecimiento', function (done) {
		var tam = lista_tareas.numTareas();
		assert.equal(false, lista_tareas.editAcontecimiento(790, "Laboratorio"));
		assert.equal(tam, lista_tareas.numTareas());
		done();
	});
	
	it('Modificar día', function (done) {
		var tam = lista_tareas.numTareas();
		assert.equal(true, lista_tareas.editDia(0, "15-01-2019"));
		assert.equal(tam, lista_tareas.numTareas());
		done();
	});
	
	it('Error modificar día', function (done) {
		var tam = lista_tareas.numTareas();
		assert.equal(false, lista_tareas.editDia(790, "15-01-2019"));
		assert.equal(tam, lista_tareas.numTareas());
		done();
	});
	
	it('Modificar hora', function (done) {
		var tam = lista_tareas.numTareas();
		assert.equal(true, lista_tareas.editHora(0, "16:00"));
		assert.equal(tam, lista_tareas.numTareas());
		done();
	});
	
	it('Error modificar hora', function (done) {
		var tam = lista_tareas.numTareas();
		assert.equal(false, lista_tareas.editHora(790, "16:00"));
		assert.equal(tam, lista_tareas.numTareas());
		done();
	});
	
	it('Eliminar tarea', function (done) {
		var tam = lista_tareas.numTareas();
		assert.equal(true,lista_tareas.deleteTarea(0));
		assert.equal(tam-1, lista_tareas.numTareas());
		done();
	});
	
	it('Error eliminar tarea', function (done) {
		var tam = lista_tareas.numTareas();
		assert.equal(false,lista_tareas.deleteTarea(790));
		assert.equal(tam, lista_tareas.numTareas());
		done();
	});
});

