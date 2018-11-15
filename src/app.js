var express = require('express');
var app = express();

var version = "2.0.0"
var tarea = require("./Tarea.js");
var calendario = new Array;

// Establecer el puerto dependiendo del PaaS que sea
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

// Mostrar que funciona
app.get('/', function(request, response) {
	response.status(200).send(
		{
			"status": "OK",
			"ejemplo": { "ruta": "/Calendario",
						 "valor": { "Version": version,
								  	"Tareas": calendario
								  }
					   }
		}
	);
});

// Mostrar la versión del calendario y las tareas almacenadas hasta el momento
app.get('/Calendario', function( req, response ) {
	response.status(200).send(
								{ "Version": version,
								  "Tareas": calendario
								}
	);
});

// Agregar una tarea
app.put('/Calendario/:acontecimiento/:dia/:hora', function( req, response ) {
	var nueva_tarea = new tarea.Tarea(req.params.acontecimiento,req.params.dia,req.params.hora);
	calendario.push(nueva_tarea);
	response.status(200).send(nueva_tarea);
});


// Modificar el acontecimiento de una tarea
app.post('/Calendario/:id/:acontecimiento', function( req, response ) {
	if( req.params.id < calendario.length ){
		calendario[req.params.id].setAcontecimiento(req.params.acontecimiento);
		response.status(200).send(calendario[req.params.id]);
	}
	else{
		response.status(404).send("Tarea inexistente.\n");
	}
});

// Modificar el día de una tarea
app.post('/Calendario/:id//:dia', function( req, response ) {
	if( req.params.id < calendario.length ){
		calendario[req.params.id].setDia(req.params.dia);
		response.status(200).send(calendario[req.params.id]);
	}
	else{
		response.status(404).send("Tarea inexistente.\n");
	}
});

// Modificar la hora de una tarea
app.post('/Calendario/:id///:hora', function( req, response ) {
	if( req.params.id < calendario.length ){
		calendario[req.params.id].setHora(req.params.hora);
		response.status(200).send(calendario[req.params.id]);
	}
	else{
		response.status(404).send("Tarea inexistente.\n");
	}
});
	
// Eliminar una tarea
app.delete('/Calendario/:id', function( req, response ) {
	if( req.params.id < calendario.length ){
		calendario.splice(req.params.id, 1);
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
