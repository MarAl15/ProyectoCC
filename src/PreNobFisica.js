var wdk = require('wikidata-sdk')
var request = require('request');


/* 
  Definición de la clase PreNobFisica que contiene los ganadores del premio Nobel de Física: 
    var lista_galardonados = new PreNobFisica();
*/

exports.PreNobFisica = function(){
	this.galardonados = premiadosWiki();
	
	// métodos
	this.getGalardonados = getGalardonados;
	this.urlPremiadosWiki = urlPremiadosWiki;
	this.premiadosWiki = premiadosWiki;
}

// Devuelve la lista con los ganadores del premio Nobel de Física
function getGalardonados(){
	return this.galardonados;
}

function urlPremiadosWiki(){
	// Obtención de la lista de científicos ganadores del Premio Nobel de Física de la Wiki
	const sparql = `
	SELECT ?Premio_NobelLabel ?fecha_de_nacimiento ?fecha_de_fallecimiento WHERE {
	  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es". }
	  ?Premio_Nobel wdt:P166 wd:Q38104.
	  OPTIONAL { ?Premio_Nobel wdt:P569 ?fecha_de_nacimiento. }
	  OPTIONAL { ?Premio_Nobel wdt:P570 ?fecha_de_fallecimiento. }
	}
	`

	// URL asociada a los datos
	return wdk.sparqlQuery(sparql);
}

// Lista de ganadores del premio Nobel de Física
function premiadosWiki(){
	var url = urlPremiadosWiki();

	// Creamos un JSON con los datos obtenidos del galardonado: nombre, fecha de nacimiento y fecha de defunción (en caso de que haya fallecido ya).
	var premiados = new Array;
	request(url, function (error, response, body) {
		if (!error && response.statusCode === 200){
			var info = JSON.parse(body).results.bindings 
		
			for(var i in info) {
				var birth = info[i]['fecha_de_nacimiento']['value'] 
				if(info[i]['fecha_de_fallecimiento']){
					var death = info[i]['fecha_de_fallecimiento']['value']
					var galardonado = { 
						nombre: info[i]['Premio_NobelLabel']['value'],
						fecha_de_nacimiento: birth.substring(8,10)+'-'+birth.substring(5,7)+'-'+birth.substring(0,4),
						fecha_de_fallecimiento: death.substring(8,10)+'-'+death.substring(5,7)+'-'+death.substring(0,4)
					}
				}else{
					var galardonado = {
						nombre: info[i]['Premio_NobelLabel']['value'],
						fecha_de_nacimiento: birth.substring(8,10)+'-'+birth.substring(5,7)+'-'+birth.substring(0,4)
					}
				}
			
				premiados.push(galardonado);	
			}
		}
	});

	return premiados;
}
