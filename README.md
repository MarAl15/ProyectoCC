[![Status](https://img.shields.io/badge/Status-Documenting-green.svg)](https://github.com/MarAl15/ProyectoCC/blob/master/README.md)
[![Language](https://img.shields.io/badge/Language-Node.js-blue.svg)](https://nodejs.org/es/)
[![DBMS](https://img.shields.io/badge/DBMS-MongoDB-orange.svg)](https://www.mongodb.com/es)
[![License](https://img.shields.io/badge/License-GPL-red.svg)](https://github.com/MarAl15/ProyectoCC/blob/master/LICENSE)
# [Proyecto](https://maral15.github.io/ProyectoCC/) de la asignatura de Cloud Computing

## Calendario Premios Nobel. 

### Descripción
En una época donde nos encontramos desbordados de información gracias a la web, la cultura científica se tiende a olvidar. Con este proyecto queremos volver a despertar la curiosidad científica en algunos de los ámbitos de la ciencia, a partir de los grandes descubridores que obtuvieron el Premio Nobel, incitando a averiguar más sobre ellos y sobre su contribución a la ciencia, e impulsando la investigación y el aprendizaje.

En recordatorio de estos grandes genios y revolucionarios, que intentarón ir más allá de lo conocido hasta entonces, se desea realizar un calendario en el que se muestre los ganadores de algún Premio Nobel.

Este proyecto consiste en crear un calendario en el que se muestre una fotografía del ganador de un premio Nobel cuya fecha de nacimiento o fallecimiento coincida con la indicada. Toda esta información se extraerá de la enciclopedia libre, políglota y editada de manera colaborativa llamada [Wikipedia](https://es.wikipedia.org/).

Para una mayor utilidad de este, se ha decidido añadir la posibilidad de especificar tareas simples como reuniones, días de laboratorio (para las carreras universitarias de biología, medicina...) o cualquier otra cita importante, estableciendo una hora e incorporando, si desea, una pequeña nota con aclaraciones.

### Arquitectura
Se va a utilizar una arquitectura de microservicios ya que nos permite crear, testear y desplegar de forma independiente cada servicio, proporcionándonos mayor versatilidad y facilidad para integrar.

En este proyecto, se puede diferenciar principalmente estos microservicios:

- Ganadores del Premio Nobel

- Almacenamiento de la información

- Gestión de tareas simples

- Gestión del calendario


Para la comunicación entre los distintos servicios se utilizará el _broker_ [RabbitMQ](https://www.rabbitmq.com/), que es un sistema de manejo de colas que permite que un servicio que quiere enviar un mensaje a otro pueda continuar su tarea sin tener que esperar a la entrega de dicho mensaje.

#### Lenguaje y microframework

Por último, cabe destacar que este proyecto se realizará empleando [Node.js](https://nodejs.org/es/) como lenguaje de programación principal, con ayuda de su microframework conocido como [Express](https://expressjs.com/es/).

### Despliegue

Despliegue: https://calprenob.herokuapp.com/

Para el despliegue del microservicio se ha utilizado [Heroku](https://www.heroku.com/). Pero antes de desplegar dicho microservicio debemos de verificar que el código es correcto, por lo que se utiliza [Travis CI](https://travis-ci.org/), un servicio distribuido de integración continua que se usa en GitHub para levantar y realizar pruebas sobre el software cada vez que se hace un `push`, siendo gratuito para proyectos de código abierto.

Para más información acerca del microservicio consulte [este enlace](https://github.com/MarAl15/ProyectoCC/blob/master/docs/microservicios.md#gesti%C3%B3n-de-tareas) y para la explicación más detallada del despliegue acceda [aquí](https://github.com/MarAl15/ProyectoCC/blob/master/docs/despliegue.md).

### Aprovisionamiento

MV: 40.89.153.203

Para el aprovisionamiento se ha utilizado Ansible, desplegando el servicio en una máquina virtual creada en Azure siguiendo los pasos de [este tutorial](https://docs.microsoft.com/es-es/azure/virtual-machines/linux/quick-create-portal?toc=%2Fazure%2Fvirtual-machines%2Flinux%2Ftoc.json). Para más información sobre la configuración de la máquina virtual consulte [este enlace](https://github.com/MarAl15/ProyectoCC/blob/master/docs/hito3.md#m%C3%A1quina-virtual-azure).

Dicha máquina se ha aprovisionado con todas las dependencias necesarias para poder desplegar nuestra aplicación. Los pasos seguidos para realizar este se pueden consultar [aquí](https://github.com/MarAl15/ProyectoCC/blob/master/docs/hito3.md#aprovisionamiento).

- [Comprobación de provisionamiento](https://github.com/MarAl15/ProyectoCC/blob/master/docs/provision-adritake.md) a mi compañero [Adrián de la Torre Rodríguez](https://github.com/adritake)
- Aprovisionamiento comprobado por [Adrián de la Torre Rodríguez](https://github.com/adritake) en este [documento](
https://github.com/adritake/CC_UGR_Personal/blob/master/docs/Provision.md#comprobaci%C3%B3n-de-provisi%C3%B3n-de-un-compa%C3%B1ero)


## Licencia
Este software se desarrollará bajo la licencia GNU General Public License v3.0
