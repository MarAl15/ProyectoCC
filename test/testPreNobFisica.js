var assert = require('assert'),
	request = require('request'),
	prenobfisica = require('../src/PreNobFisica.js');

var galardonados = new prenobfisica.PreNobFisica();

describe( "DATOS PreNobFisica", function() {
	// Se comprueba que la url devuelva no devuelva error y el status 200
	it('URL premiados', function (done) {
		var url = galardonados.urlPremiadosWiki();
		request(url, function (error, response, body) {
			assert(!error);
			assert.equal(response.statusCode, 200);
		});
		done();
	});
	
	// Se comprueba que el número de los galardonados extraidos de la Wiki sean igual que el devuelto con getGalardonados 
	it('Premiados', function (done) {
		var premiados1 = galardonados.premiadosWiki();
		var premiados2 = galardonados.getGalardonados();
		assert.equal(premiados1.length,premiados2.length);
		done();
	});
});

