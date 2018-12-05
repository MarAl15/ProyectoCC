var express = require('express');
var app = express();

var tareas = require("./GestionTareas.js");
var prenobfisica = require("./PreNobFisica.js");
var version = "3.0.0",
	error405 = "ERROR Method Not Allowed",
	ok = "OK",
	lista_tareas = new tareas.GestionTareas(),
	fisica = new prenobfisica.PreNobFisica();
	

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

// Mostrar la lista de ganadores del premio Nobel de Física
app.get('/PreNobFisica', function( req, response ) {
	response.status(200).send(
								{ "status": ok,
							  	  "Ganadores": fisica.getGalardonados()
							  	}
					);
});/**/

// Agregar una tarea
app.put('/Tareas/:acontecimiento/:dia/:hora', function( req, response ) {
	lista_tareas.pushTarea(req.params.acontecimiento,req.params.dia,req.params.hora);
	response.status(200).send(
								{ "status": ok,
							  	  "Mensaje": lista_tareas.getUltimaTarea()
							  	}
							 );
});


// Modificar el acontecimiento de una tarea
app.post('/Tareas/:id/acontecimiento=:acontecimiento', function( req, response ) {
	if( lista_tareas.editAcontecimiento(req.params.id, req.params.acontecimiento) ){
		response.status(200).send(
								 	{ "status": ok,
								  	  "Añadida": lista_tareas.getTarea(req.params.id)
								  	}
								 );
	}
	else{
		response.status(405).send(
									{ "status": error405,
								  	  "Mensaje": "Tarea inexistente."
								  	}
								  );
	}
	
});

// Modificar el día de una tarea
app.post('/Tareas/:id/fecha=:dia', function( req, response ) {
	if( lista_tareas.editDia(req.params.id, req.params.dia) ){
		response.status(200).send(
								 	{ "status": ok,
								  	  "Añadida": lista_tareas.getTarea(req.params.id)
								  	}
								 );
	}
	else{
		response.status(405).send(
									{ "status": error405,
								  	  "Mensaje": "Tarea inexistente."
								  	}
								  );
	}
});

// Modificar la hora de una tarea
app.post('/Tareas/:id/hora=:hora', function( req, response ) {
	if( lista_tareas.editHora(req.params.id, req.params.hora) ){
		response.status(200).send(
								 	{ "status": ok,
								  	  "Añadida": lista_tareas.getTarea(req.params.id)
								  	}
								 );
	}
	else{
		response.status(405).send(
									{ "status": error405,
								  	  "Mensaje": "Tarea inexistente."
								  	}
								  );
	}
});
	
// Eliminar una tarea
app.delete('/Tareas/:id', function( req, response ) {
	if( lista_tareas.deleteTarea(req.params.id) ){
		response.status(200).send(
									{ "status": "OK",
								  	  "Mensaje": "Tarea eliminada."
								  	}
								  );
	}
	else{
		response.status(405).send(
									{ "status": error405,
								  	  "Mensaje": "Tarea inexistente."
								  	}
								  );
	}
});

// Escucha en un puerto determinado
if(!module.parent){
	app.listen(app.get('port'), function() {
		console.log("Node app is running");
	});
}

// Exporta la variable para poder hacer tests
module.exports = app;
