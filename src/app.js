var express = require('express');
var app = express();

var tareas = require("./GestionTareas.js");
var version = "2.0.0",
	lista_tareas = new tareas.GestionTareas();

// Establecer el puerto dependiendo del PaaS que sea
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

// Mostrar que funciona
app.get('/', function(request, response) {
	response.status(200).send(
		{
			"status": "OK",
			"ejemplo": { "ruta": "/Tareas",
						 "valor": { "Version": version,
								  	"Tareas": lista_tareas.getTareas()
								  }
					   }
		}
	);
});

// Mostrar la versión del calendario y las tareas almacenadas hasta el momento
app.get('/Tareas', function( req, response ) {
	response.status(200).send(
								{ "Version": version,
								  "Tareas": lista_tareas.getTareas()
								}
	);
});

// Agregar una tarea
app.put('/Tareas/:acontecimiento/:dia/:hora', function( req, response ) {
	lista_tareas.pushTarea(req.params.acontecimiento,req.params.dia,req.params.hora);
	response.status(200).send(lista_tareas.getUltimaTarea());
});


// Modificar el acontecimiento de una tarea
app.post('/Tareas/:id/:acontecimiento', function( req, response ) {
	if( lista_tareas.editAcontecimiento(req.params.id, req.params.acontecimiento) ){
		response.status(200).send(lista_tareas.getTarea(req.params.id));
	}
	else{
		response.status(404).send("Tarea inexistente.\n");
	}
	
});

// Modificar el día de una tarea
app.post('/Tareas/:id//:dia', function( req, response ) {
	if( lista_tareas.editDia(req.params.id, req.params.dia) ){
		response.status(200).send(lista_tareas.getTarea(req.params.id));
	}
	else{
		response.status(404).send("Tarea inexistente.\n");
	}
});

// Modificar la hora de una tarea
app.post('/Tareas/:id///:hora', function( req, response ) {
	if( lista_tareas.editHora(req.params.id, req.params.hora) ){
		response.status(200).send(lista_tareas.getTarea(req.params.id));
	}
	else{
		response.status(404).send("Tarea inexistente.\n");
	}
});
	
// Eliminar una tarea
app.delete('/Tareas/:id', function( req, response ) {
	if( lista_tareas.deleteTarea(req.params.id) ){
		response.status(200).send("Tarea eliminada.\n");
	}
	else{
		response.status(404).send("Tarea inexistente.\n");
	}
});

// Escucha en un puerto determinado
if(!module.parent){
	app.listen(app.get('port'), function() {
		console.log("Node app is running at localhost:" + app.get('port'));
	});
}

// Exporta la variable para poder hacer tests
module.exports = app;
