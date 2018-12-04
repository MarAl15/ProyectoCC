# Microservicios

## Gestión de tareas

Se ha creado un microservicio simplificado para la gestión de tareas con la ayuda de express y Node.js, implementando dos clases:

- `Tarea:` donde almacenamos el acontecimiento importante que queremos recordar, y la fecha y la hora de inicio de este. Un objeto de tipo `Tarea` nos permite, una vez creado, la modificación y consulta de dichos atributos.

- `GestionTareas:` formado por una lista de tareas, inicialmente vacía, donde podemos insertar, consultar, modificar o eliminar alguna tarea, además de consultar todas las almacenadas hasta dicho momento.

Además también se ha implementado en el fichero `app.js` un servicio web que permite realizar las siguientes operaciones:

- Operación GET para mostrar la versión y las tareas almacenadas hasta el momento, accediendo a través de la ruta `/Tareas`.

- Operación PUT para agregar una tarea, mediante la ruta `/Tareas/:acontecimiento/:dia/:hora`.

- Operación POST para la modificación de algún atributo de la tarea identificada por su posición en la lista:
	- Acontecimiento: `/Tareas/:id/acontecimiento=:acontecimiento'`
	- Fecha: `/Tareas/:id/fecha=:dia`
	- Hora de inicio: `/Tareas/:id/hora=:hora` 
	
- Operación DELETE para la eliminación de la tarea especificada. Dicha eliminación se realiza mediante la ruta `/Tareas/:id`.

Dichas operaciones devuelven el estado de código correspondiente y, en caso de ser una operación contemplada (las cuales devuelven el estado 200 ó 405) se retorna información en JSON.

## Ganadores del premio Nobel de Física

Se ha desarrollado un microservicio para extraer los ganadores del premio Nobel de Física de la Wikidata, para ello se ha creado la clase `PreNobFisica` donde se puede consultar los datos relacionados con los galardonados:

- Nombre del científico premiado
- Fecha de nacimiento 
- Fecha de defunción (en caso de que haya fallecido)

Además también se ha implementado en el fichero `app.js` una operación GET para la consulta de dicha lista, mediante la ruta `/PreNobFisica`.

# Verificación

Para cada uno de los ficheros contenidos en la carpeta `src` se ha creado un test de verificación de código contenido en la carpeta `test` con ayuda de la herramienta `SuperTest`.



