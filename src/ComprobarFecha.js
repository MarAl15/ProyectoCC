const moment = require('moment');

// Comprobamos si es una fecha válida y posterior al día actual
exports.comprobarFecha = function(dia, mes, anio){
	var hoy = new Date(),
		mesM = mes-1; // 0-Enero, 1-Febrero,... , 11-Diciembre
	
	// Día real
	if(moment([anio, mesM, dia]).isValid()){
		// Fecha posterior a la actual
		if(anio > hoy.getFullYear())
			return true;
		else if(anio == hoy.getFullYear()){
			if(mesM > hoy.getMonth())
				return true;
			else if(mesM == hoy.getMonth() && dia >= hoy.getDate()){
				return true;
			}
		}
	}

	return false;
}
