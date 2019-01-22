# Microservicios

## Gestión de acontecimientos

Se ha creado un microservicio simplificado para la gestión de acontecimientos con la ayuda de express, mongoose y Node.js, implementando la clase:

- [`Acontecimiento:`](https://github.com/MarAl15/ProyectoCC/blob/master/src/Tarea.js) esquema para almacenar el acontecimiento importante que queremos recordar, la fecha y la hora de inicio de este en una base de datos MongoDB. 

Además también se ha implementado en el fichero [`app.js`](https://github.com/MarAl15/ProyectoCC/blob/master/src/app.js) un servicio web que permite realizar las siguientes operaciones:

- Operación GET para mostrar simplemente `status Ok`.

- Operación GET para visualizar los acontecimientos almacenados hasta el momento en la base de datos `acontecimientodb`, mediante la ruta `/Acontecimientos`.

- Operación PUT para agregar un acontecimiento a la base de datos, mediante la ruta `/Acontecimientos/:acontecimiento/:dia-:mes-:anio/:hora::minutos`.

- Operación POST para la modificación de algún atributo del acontecimiento identificado mediante la `_id` que se le asigna al crearse:
	- Acontecimiento: `/Acontecimientos/:id/acontecimiento=:acontecimiento'`
	- Fecha: `/Acontecimientos/:id/fecha=:dia-:mes-:anio`
	- Hora de inicio: `/Acontecimientos/:id/hora=:hora::minutos` 
	
- Operación DELETE para la eliminación del acontecimiento especificado. Dicha eliminación se realiza mediante la ruta `/Acontecimientos/:id`.

- Operación DELETE para la eliminación de todas las tareas almacenadas en la base de datos, mediante la ruta `/Acontecimientos`.

Dichas operaciones devuelven el estado de código correspondiente y, en caso de ser una operación contemplada se retorna información en JSON.

## Servicio de LOG

Se ha modificado el fichero [app.js](https://github.com/MarAl15/ProyectoCC/blob/master/src/app.js) para añadir un servicio de LOG a nuestra aplicación, utilizando para ello el paquete Winston.

En este caso, simplemente se almacena todas las salidas de las peticiones a nuestra APIRest en el fichero `app.log` contenido en la carpeta `logs`. 

# Verificación

Para cada uno de los ficheros contenidos en la carpeta `src` se ha creado un test de verificación de código contenido en la carpeta `test` con ayuda de la herramienta `SuperTest`.



