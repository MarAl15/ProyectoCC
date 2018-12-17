# Microservicios

## Gestión de tareas

Se ha creado un microservicio simplificado para la gestión de tareas con la ayuda de express y Node.js, implementando la clase:

- [`Tarea:`](https://github.com/MarAl15/ProyectoCC/blob/master/src/Tarea.js) estructura para almacenar el acontecimiento importante que queremos recordar, la fecha y la hora de inicio de este. 

Además también se ha implementado en el fichero [`app.js`](https://github.com/MarAl15/ProyectoCC/blob/master/src/app.js) un servicio web que permite realizar las siguientes operaciones:

- Operación GET para mostrar simplemente `status Ok`.

- Operación PUT para agregar una tarea, mediante la ruta `/Tareas/:acontecimiento/:dia-:mes-:anio/:hora::minutos`.

- Operación POST para la modificación de algún atributo de la tarea identificada por su posición en la lista:
	- Acontecimiento: `/Tareas/:id/acontecimiento=:acontecimiento'`
	- Fecha: `/Tareas/:id/fecha=:dia-:mes-:anio`
	- Hora de inicio: `/Tareas/:id/hora=:hora::minutos` 
	
- Operación DELETE para la eliminación de la tarea especificada. Dicha eliminación se realiza mediante la ruta `/Tareas/:id`.

- Operación DELETE para la eliminación de todas las tareas almacenadas en la base de datos. Dicha eliminación se realiza mediante la ruta `/Tareas`.

Dichas operaciones devuelven el estado de código correspondiente y, en caso de ser una operación contemplada se retorna información en JSON.

# Verificación

Para cada uno de los ficheros contenidos en la carpeta `src` se ha creado un test de verificación de código contenido en la carpeta `test` con ayuda de la herramienta `SuperTest`.



