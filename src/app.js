const express = require('express'),
	  app = express(),
	  mongoose = require('mongoose');

var error405 = "ERROR Method Not Allowed";
	
const Acontecimiento = require("./Acontecimiento.js");

// Conectando a la base de datos (Si no existe la base de datos MongoDB la crea por nosotros)
mongoose.connect('mongodb://localhost/acontecimientodb', { useNewUrlParser: true })
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

// Mostrar los acontecimientos almacenados hasta el momento
app.get('/Acontecimientos', function( req, response ) {
	Acontecimiento.find(function(err, acontecimientos) {
		if(err) return response.status(500).send(err.message);

		response.status(200).jsonp(acontecimientos);
	});
});

// Agregar un acontecimiento
app.put('/Acontecimientos/:etiqueta/:dia-:mes-:anio/:hora::minutos', function( req, response ) {
	var acontecimiento = new Acontecimiento({
		Etiqueta: req.params.etiqueta,
		Fecha: req.params.dia+"-"+req.params.mes+"-"+req.params.anio,
		Hora: req.params.hora+":"+req.params.minutos
		//Fecha: new Date(req.params.anio+"-"+req.params.mes+"-"+req.params.dia+"T"+req.params.hora+":"+req.params.minutos+":00Z")//(req.params.anio,req.params.mes,req.params.dia).toISOString()
	});
	
	acontecimiento.save(function(err, acontecimiento) {
		if(err) return response.status(500).send(err.message);
		
    	response.status(200).jsonp(acontecimiento);
    });
});


// Modificar el acontecimiento de un acontecimiento
app.post('/Acontecimientos/:id/etiqueta=:etiqueta', function( req, response ) {
	Acontecimiento.findById(req.params.id, function(err, acontecimiento) {
		if(acontecimiento==null)
			response.status(405).send(
										{ "status": error405,
									  	  "Mensaje": "ID no existente."
									  	}
									 );
		else{
			acontecimiento.Etiqueta = req.params.etiqueta;

			acontecimiento.save(function(err) {
				if(err) return response.status(500).send(err.message);
		  		response.status(200).jsonp(acontecimiento);
			});
		}
	});
});

// Modificar el día de un acontecimiento
app.post('/Acontecimientos/:id/fecha=:dia-:mes-:anio', function( req, response ) {
	Acontecimiento.findById(req.params.id, function(err, acontecimiento) {
		if(acontecimiento==null)
			response.status(405).send(
										{ "status": error405,
									  	  "Mensaje": "ID no existente."
									  	}
									 );
		else{
			acontecimiento.Fecha = req.params.dia+"-"+req.params.mes+"-"+req.params.anio;

			acontecimiento.save(function(err) {
				if(err) return response.status(500).send(err.message);
		  		response.status(200).jsonp(acontecimiento);
			});
		}
	});
});

// Modificar la hora de un acontecimiento
app.post('/Acontecimientos/:id/hora=:hora::minutos', function( req, response ) {
	Acontecimiento.findById(req.params.id, function(err, acontecimiento) {
		if(acontecimiento==null)
			response.status(405).send(
										{ "status": error405,
									  	  "Mensaje": "ID no existente."
									  	}
									 );
		else{
			acontecimiento.Hora = req.params.hora+":"+req.params.minutos;

			acontecimiento.save(function(err) {
				if(err) return response.status(500).send(err.message);
		  		response.status(200).jsonp(acontecimiento);
			});
		}
	});
});
	
// Eliminar un acontecimiento
app.delete('/Acontecimientos/:id', function( req, response ) {
	Acontecimiento.findById(req.params.id, function(err, acontecimiento) {
		if(acontecimiento==null)
			response.status(405).send(
										{ "status": error405,
									  	  "Mensaje": "ID no existente."
									  	}
									 );
		else{
			acontecimiento.remove(function(err) {
				if(err) return response.status(500).send(err.message);
		  		response.status(200).send(
											{ "status": "OK",
										  	  "Mensaje": "Acontecimiento eliminado correctamente."
										  	}
										  );
			})
		}
	});
});

// Eliminar todas los acontecimientos almacenados
app.delete('/Acontecimientos', function( req, response ) {	
	Acontecimiento.deleteMany({}, function(err) {
		if(err) return response.status(500).send(err.message);
  		response.status(200).send(
									{ "status": "OK",
								  	  "Mensaje": "Acontecimientos eliminados."
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
