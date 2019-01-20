const express = require('express'),
	  app = express(),
	  mongoose = require('mongoose');

var error404 = "ERROR Not Found";
	
const Acontecimiento = require("./Acontecimiento.js");

// Si no existe la base de datos MongoDB la crea por nosotros
var url = 'mongodb://localhost/acontecimientodb';

	
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
app.get('/Acontecimientos', function( req, response, next ) {
	mongoose.connect(url, { useNewUrlParser: true }, function(err, db) {
	  	if (err) return next(err);
	  	
	  	Acontecimiento.find(function(error, acontecimientos) {
			// https://mongoosejs.com/docs/middleware.html
			if (error) return next(err);
			
			response.status(200).jsonp(acontecimientos);
			db.close();
		});
	});
});

// Agregar un acontecimiento
app.put('/Acontecimientos/:etiqueta/:dia-:mes-:anio/:hora::minutos', function( req, response, next ) {
	mongoose.connect(url, { useNewUrlParser: true }, function(err, db) {
	  	if (err) return next(err);
	  	
		var acontecimiento = new Acontecimiento({
			Etiqueta: req.params.etiqueta,
			Fecha: req.params.dia+"-"+req.params.mes+"-"+req.params.anio,
			Hora: req.params.hora+":"+req.params.minutos
			//Fecha: new Date(req.params.anio+"-"+req.params.mes+"-"+req.params.dia+"T"+req.params.hora+":"+req.params.minutos+":00Z")//(req.params.anio,req.params.mes,req.params.dia).toISOString()
		});

		acontecimiento.save(function(error, acontecimiento) {
			if (error) return next(error);
			
			response.status(200).jsonp(acontecimiento);
			db.close();
		});
	});
});


// Modificar la etiqueta de un acontecimiento
app.post('/Acontecimientos/:id/etiqueta=:etiqueta', function( req, response, next ) {
	mongoose.connect(url, { useNewUrlParser: true }, function(err, db) {
	  	if (err) return next(err);
	  	
		Acontecimiento.findById(req.params.id, function(err, acontecimiento) {
			if (err) return next(err);

			if(acontecimiento==null){
				response.status(404).send(
											{ "status": error404,
										  	  "Mensaje": "No encontrado."
										  	}
										 );
				db.close();
			}else{
				acontecimiento.Etiqueta = req.params.etiqueta;

				acontecimiento.save(function(err) {
					if (err) return next(err);
			  		
			  		response.status(200).jsonp(acontecimiento);
			  		db.close();
				});
			}	
		});
	});
});

// Modificar el día de un acontecimiento
app.post('/Acontecimientos/:id/fecha=:dia-:mes-:anio', function( req, response, next ) {
	mongoose.connect(url, { useNewUrlParser: true }, function(err, db) {
	  	if (err) return next(err);
	  	
		Acontecimiento.findById(req.params.id, function(err, acontecimiento) {
			if (err) return next(err);
			
			if(acontecimiento==null){
				response.status(404).send(
											{ "status": error404,
										  	  "Mensaje": "No encontrado."
										  	}
										 );
				db.close();
			}else{
				acontecimiento.Fecha = req.params.dia+"-"+req.params.mes+"-"+req.params.anio;

				acontecimiento.save(function(err) {
					if (err) return next(err);
					
			  		response.status(200).jsonp(acontecimiento);
			  		db.close();
				});
			}
		});
	});
});

// Modificar la hora de un acontecimiento
app.post('/Acontecimientos/:id/hora=:hora::minutos', function( req, response, next ) {
	mongoose.connect(url, { useNewUrlParser: true }, function(err, db) {
	  	if (err) return next(err);
	  	
		Acontecimiento.findById(req.params.id, function(err, acontecimiento) {
			if (err) return next(err);
			
			if(acontecimiento==null){
				response.status(404).send(
											{ "status": error404,
										  	  "Mensaje": "No encontrado."
										  	}
										 );
				db.close();
			}else{
				acontecimiento.Hora = req.params.hora+":"+req.params.minutos;

				acontecimiento.save(function(err) {
					if (err) return next(err);
			  		
			  		response.status(200).jsonp(acontecimiento);
			  		db.close();
				});
			}
		});
	});
});
	
// Eliminar un acontecimiento
app.delete('/Acontecimientos/:id', function( req, response, next ) {
	mongoose.connect(url, { useNewUrlParser: true }, function(err, db) {
	  	if (err) return next(err);
	  	
		Acontecimiento.findById(req.params.id, function(err, acontecimiento) {
			if (err) return next(err);
			
			if(acontecimiento==null){
				response.status(404).send(
											{ "status": error404,
										  	  "Mensaje": "No encontrado."
										  	}
										 );
				db.close();
			}else{
				acontecimiento.remove(function(err) {
					if (err) return next(err);
			  			
		  			response.status(200).send(
											{ "status": "OK",
										  	  "Mensaje": "Acontecimiento eliminado correctamente."
										  	}
										  );
					db.close();
				})
			}
		});
	});
});

// Eliminar todas los acontecimientos almacenados
app.delete('/Acontecimientos', function( req, response, next ) {
	mongoose.connect(url, { useNewUrlParser: true }, function(err, db) {
	  	if (err) return next(err);
	  		
		Acontecimiento.deleteMany({}, function(err) {
			if (err) return next(err);
	  		
	  		response.status(200).send(
										{ "status": "OK",
									  	  "Mensaje": "Acontecimientos eliminados."
									  	}
									  );
			db.close();
		});
	});
});

// Escucha en un puerto determinado
if(!module.parent){
	app.listen(app.get('port'), function() {
		console.log("CalPreNob ejecutandose...");
	});
}


// Exporta la variable para poder hacer tests
module.exports = app;
