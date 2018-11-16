# Despliegue de un microservicio

## Microservicio Gestión de tareas

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

-

Para cada uno de estos ficheros contenidos en la carpeta `src` se ha creado un test de verificación de código contenido en la carpeta `test` con ayuda de la herramienta `SuperTest`.


## Despliegue en Heroku

Inicialmente se crea el fichero `Procfile` para indicar a [Heroku](https://www.heroku.com/) debe ejecutar la línea de comandos `node src/app.js` para _levantar_ la web que hemos creado, especificándole además que es una aplicación web.  
```
web: node app.js
```

Después de habernos registrado, e instalado y configurado heroku localmente, creamos una aplicación mediante línea de comandos:
```console
$ heroku create calprenob
Creating ⬢ calprenob... done
https://calprenob.herokuapp.com/ | https://git.heroku.com/calprenob.git
```
En este caso, se ha decidido especificar el nombre `calprenob` a la aplicación para mayor comodidad y relación con la aplicación, aunque Heroku nos permite omitir este, generando un nombre aleatorio en dicho caso.

Sin embargo, no se desea realizar el despliegue directamente a Heroku sino que previamente se verifiquen los tests. Para este fin se usa [Travis CI](https://travis-ci.org/), donde nos tenemos que registrar con nuestra cuenta de GitHub y seleccionar nuestro repositorio.

Para indicarle a Travis CI qué debe de realizar para testear y, seguidamente, desplegar en Heroku debemos de crear el fichero `.travis.yml`:
```yml
language: node_js
node_js:
  - node
deploy:
  provider: heroku
  api_key:
    secure: <clave_encriptada>
  app: calprenob
```

En donde se especifica el lenguaje utilizado, la versión o versiones del lenguaje (en este caso, sólo node) y además establecemos que se despliegue automáticamente en Heroku cada vez que se haga un `push` y se pasen satisfactoriamente las pruebas en Travis CI.

Para la obtención de la `<clave_encriptada>` se ha obtenido siguiendo los pasos que aparencen en [este enlace](https://docs.travis-ci.com/user/deployment/heroku/):

1. Instalamos [Heroku](https://devcenter.heroku.com/articles/heroku-cli) y [Travis CI](https://gist.github.com/jarun/df5d864f0b2600564c9bc13cfaca7497) si no lo teníamos instalado.
2. Nos colamos dentro de la carpeta del proyecto.
3. Ejecutamos el siguiente comando:
```console
$ travis encrypt $(heroku auth:token) --add deploy.api_key
```

Y automáticamente se añade la clave encriptada al fichero de travis.

Además se añade el nombre de la aplicación especificándolo con `app` ya que por defecto coincide con el nombre del repositorio, y Travis CI intentaría desplegar a Heroku la app llamada con ese nombre.
