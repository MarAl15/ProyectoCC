const express = require('express'),
	  app = express(),
	  mongoose = require('mongoose');

const Tarea = require("./Tarea.js");

// Conectando a la base de datos (Si no existe la base de datos MongoDB la crea por nosotros)
mongoose.connect('mongodb://localhost/tareasdb', { useNewUrlParser: true })
	.then(db => console.log('Conectado a la base de datos')) // Para verificar que se ha conectado. Si se conecta se va a generar un objeto de db pero no se va a utilizar, tan suelo se muestra un mensaje por consola
	.catch(err => console.log(err)); // Si existe un error, lo mostramos por consola
	
// Establecer el puerto dependiendo del PaaS que sea
app.set('port', (process.env.PORT || 80));
app.use(express.static(__dirname + '/public'));

// Mostrar que funciona
app.get('/', function(request, response) {	
	response.status(200).send(
		{
			"status": "OK"
		}
	);
});

// Mostrar las tareas almacenadas hasta el momento
app.get('/Tareas', function( req, response ) {
	Tarea.find(function(err, tareas) {
		if(err) return response.status(500).send(err.message);

		response.status(200).jsonp(tareas);
	});
});

// Agregar una tarea
app.put('/Tareas/:acontecimiento/:dia-:mes-:anio/:hora::minutos', function( req, response ) {
	var tarea = new Tarea({
		Acontecimiento: req.params.acontecimiento,
		Fecha: req.params.dia+"-"+req.params.mes+"-"+req.params.anio,
		Hora: req.params.hora+":"+req.params.minutos
		//Fecha: new Date(req.params.anio+"-"+req.params.mes+"-"+req.params.dia+"T"+req.params.hora+":"+req.params.minutos+":00Z")//(req.params.anio,req.params.mes,req.params.dia).toISOString()
	});
	
	tarea.save(function(err, tarea) {
		if(err) return response.status(500).send(err.message);
		
    	response.status(200).jsonp(tarea);
    });
});


// Modificar el acontecimiento de una tarea
app.post('/Tareas/:id/acontecimiento=:acontecimiento', function( req, response ) {
	Tarea.findById(req.params.id, function(err, tarea) {
		if(err) return response.status(500).send(err.message);
		tarea.Acontecimiento = req.params.acontecimiento;

		tarea.save(function(err) {
			if(err) return response.status(500).send(err.message);
      		response.status(200).jsonp(tarea);
		});
	});	
});

// Modificar el día de una tarea
app.post('/Tareas/:id/fecha=:dia-:mes-:anio', function( req, response ) {
	Tarea.findById(req.params.id, function(err, tarea) {
		if(err) return response.status(500).send(err.message);
		tarea.Fecha = req.params.dia+"-"+req.params.mes+"-"+req.params.anio;

		tarea.save(function(err) {
			if(err) return response.status(500).send(err.message);
      		response.status(200).jsonp(tarea);
		});
	});
});

// Modificar la hora de una tarea
app.post('/Tareas/:id/hora=:hora::minutos', function( req, response ) {
	Tarea.findById(req.params.id, function(err, tarea) {
		if(err) return response.status(500).send(err.message);
		tarea.Hora = req.params.hora+":"+req.params.minutos;

		tarea.save(function(err) {
			if(err) return response.status(500).send(err.message);
      		response.status(200).jsonp(tarea);
		});
	});
});
	
// Eliminar una tarea
app.delete('/Tareas/:id', function( req, response ) {
	Tarea.findById(req.params.id, function(err, tarea) {
		if(err) return response.status(500).send(err.message);
		tarea.remove(function(err) {
			if(err) return response.status(500).send(err.message);
      		response.status(200).send(
										{ "status": "OK",
									  	  "Mensaje": "Tarea eliminada."
									  	}
									  );
		})
	});
});

// Eliminar todas las tareas
app.delete('/Tareas', function( req, response ) {	
	Tarea.deleteMany({}, function(err) {
		if(err) return response.status(500).send(err.message);
  		response.status(200).send(
									{ "status": "OK",
								  	  "Mensaje": "Tareas eliminadas."
								  	}
								  );
	})
});

// Escucha en un puerto determinado
if(!module.parent){
	app.listen(app.get('port'), function() {
		console.log("CalPreNob ejecutandose...");
	});
}

// Exporta la variable para poder hacer tests
module.exports = app;
