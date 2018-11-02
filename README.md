## Calendario Premios Nobel. 

### Descripción
En una época donde nos encontramos desbordados de información gracias a la web, la cultura científica se tiende a olvidar. Con este proyecto queremos volver a despertar la curiosidad científica en algunos de los ámbitos de la ciencia, a partir de los grandes descubridores que obtuvieron el Premio Nobel, incitando a averiguar más sobre ellos y sobre su contribución a la ciencia, e impulsando la investigación y el aprendizaje.

En recordatorio de estos grandes genios y revolucionarios, que intentarón ir más allá de lo conocido hasta entonces, se desea realizar un calendario en el que se muestre los ganadores de algún Premio Nobel.

Este proyecto consiste en crear un calendario en el que se muestre una fotografía del ganador de un premio Nobel cuya fecha de nacimiento o fallecimiento coincida con la indicada. Toda esta información se extraerá de la enciclopedia libre, políglota y editada de manera colaborativa llamada [Wikipedia](https://es.wikipedia.org/).

Para una mayor utilidad de este, se ha decidido añadir la posibilidad de especificar tareas simples como reuniones, días de laboratorio (para las carreras universitarias de biología, medicina...) o cualquier otra cita importante, estableciendo una hora e incorporando, si desea, una pequeña nota con aclaraciones.

### Arquitectura
Se va a utilizar una arquitectura de microservicios ya que nos permite crear, testear y desplegar de forma independiente cada servicio, proporcionándonos mayor versatilidad y facilidad para integrar.

En este proyecto, se puede diferenciar principalmente estos microservicios:

- **Ganadores del Premio Nobel:** Se pretende obtener la lista de los ganadores de algún premio Nobel de la API de Wikipedia. 

- **Obtención de los datos de los ganadores:** La información de interés de cada uno de ellos se obtendrá también a partir de la API de Wikipedia, en formato [JSON](https://www.json.org/).

- **Almacenamiento de la información:** Tanto los datos relevantes relacionadas con los ganadores de este premio universalmente conocido como los relativos a las tareas simples se almacenarán utilizando el sistema de gestión de bases de datos NoSQL [MongoDB](https://www.mongodb.com/es) ya que nos ofrece mayor flexibilidad.

- **Gestión de tareas simples:** Se permite añadir tareas simples agregando el acontecimiento importante, la hora a la que se prevé que empieza y, si se desea, alguna nota complementaria. Por otro lado, también se puede modificar o eliminar dicha tarea.

- **Gestión del calendario:** Se pretende visualizar las fotografías acompañadas de un pequeño texto que especifique el acontecimiento importante de un premiado relacionado con una fecha determinada, además de las tareas descritas por el usuario.

Para la comunicación entre estos servicios se utilizarán _brokers_ a partir del sistema de manejo de colas [RabbitMQ](https://www.rabbitmq.com/).

Por último, cabe destacar que este proyecto se realizará empleando [Python](https://www.python.org/) como lenguaje de programación principal, con ayuda de su microframework conocido como [Flask](http://flask.pocoo.org/), elegido por su sencillez y facilidad de uso.

Para acceder a la información de Wikipedia nos ayudaremos de [MediaWiki](https://www.mediawiki.org/wiki/MediaWiki/es) y del asistente de consultas [Wikidata Query](https://query.wikidata.org/).



## Licencia
Este software se desarrollará bajo la licencia GNU General Public License v3.0
