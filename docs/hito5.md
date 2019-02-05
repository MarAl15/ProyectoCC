# Hito 5


## Avance y modificaciones

Se ha añadido una función de comprobación de la validez de la fecha utilizando el paquete `moment`, además de verificar que la fecha introducida es posterior al día actual ya que en un calendario no tiene sentido introducir nuevos acontecimientos anteriores.

A continuación se muestra la función implementada en el fichero `ComprobarFecha.js`:
```node
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
```

Cabe notar tanto en `moment` como `Date` se representan los meses con valores enteros de 0 (Enero) a 11 (Diciembre). [[1](https://momentjs.com/docs/), [2](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Date), [3](https://desarrolloweb.com/articulos/mostrar-fecha-actual-javascript.html)] 

Dicha función se ha empleado para verificar la fecha antes de insertarla el acontecimiento en la base de datos o modificar la fecha de uno ya existente. Además se ha añadido un test de verificación de dicha función en [testFecha.js](https://github.com/MarAl15/ProyectoCC/blob/master/test/testFecha.js).
