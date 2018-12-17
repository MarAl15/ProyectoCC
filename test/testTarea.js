var assert = require('assert'),
	Tarea = require('../src/Tarea.js');

var ObjectId = require('mongodb').ObjectID;

describe( "DATOS Tarea", function() {
	// Comprobación de almacenamiento y eliminación verificando que no ha ocurrido ningún error
	it('Almacenamiento y eliminación correcta', function (done) {
		var esta_tarea = new Tarea({
			_id: ObjectId("51c420ba77edcdc3ec709219"),
			Acontecimiento: "Uno",
			Fecha: "11-10-2019",
			Hora: "12:00"
		});
	
		esta_tarea.save(function(err, tarea) {
			assert(err);
			
			tarea.remove(function(err) {
				assert(err);
			})
		});
		
		
		done();
	});
});
