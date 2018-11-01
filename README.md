# [Proyecto](https://maral15.github.io/ProyectoCC/) de la asignatura de Cloud Computing

Publicación de los ganadores del Premio Nobel de Física. 

## Descripción
En una época donde nos encontramos desbordados de información gracias a la web, la cultura científica se tiende a olvidar. Con este proyecto queremos volver a despertar la curiosidad científica en el ámbito de la física, a partir de los grandes descubridores que obtuvieron el Premio Nobel relacionada con esta rama, incitando a averiguar más sobre ellos y sobre su contribución a la ciencia, e impulsando la investigación y el aprendizaje.

En recordatorio de estos grandes genios y revolucionarios, que intentarón ir más allá de lo conocido hasta entonces, se desea realizar un servicio que muestre los ganadores del Premio Nobel de Física.

Este proyecto consiste en publicar una fotografía, acompañada de información relevante, del ganador de un premio Nobel de Física cuya fecha de nacimiento o fallecimiento coincida con la actual. Toda esta información se extraerá de la enciclopedia libre, políglota y editada de manera colaborativa, [Wikipedia](https://es.wikipedia.org/).

## Arquitectura
Se va a utilizar una arquitectura de microservicios ya que nos permite crear, testear y desplegar de forma independiente cada servicio, proporcionándonos mayor versatilidad y facilidad para integrar.
\quad

En este proyecto, se puede diferenciar cuatro microservicios principalmente:

- **Ganadores del Premio Nobel de Física**

Se pretende obtener la lista de ganadores del premio Nobel de Física de la API de Wikipedia. 

- **Obtención de los datos de los ganadores**

La información de interés de cada uno de ellos se obtendrá también a partir de la API de Wikipedia, en formato [JSON](https://www.json.org/).

- **Almacenamiento de la información**

Se almacenará los datos de los ganadores de este premio universalmente conocido utilizando una base de datos [MongoDB](https://www.mongodb.com/es) ya que nos ofrece mayor flexibilidad.

- **Publicación de la información de interés**

Cada día se comprobará si coincide la fecha de nacimiento o defunción de alguno de los galardonados, y en caso de que exista, se publicará algunos de los datos relevantes de este.

\quad

Para la comunicación entre estos servicios se utilizarán _brokers_ a partir del sistema de manejo de colas [RabbitMQ](https://www.rabbitmq.com/).

Por último, cabe destacar que este proyecto se realizará empleando [Python](https://www.python.org/) como lenguaje de programación principal, con ayuda de su microframework conocido como [Flask](http://flask.pocoo.org/), por su sencillez y facilidad de uso.

Para acceder a la información de Wikipedia nos ayudaremos de [MediaWiki](https://www.mediawiki.org/wiki/MediaWiki/es) y del asistente de consultas [Wikidata Query](https://query.wikidata.org/).



## Licencia
Este software se desarrollará bajo la licencia GNU General Public License v3.0
