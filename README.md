[![Status](https://img.shields.io/badge/Status-Documenting-green.svg)](https://github.com/MarAl15/ProyectoCC/blob/master/README.md)
[![Language](https://img.shields.io/badge/Language-Node.js-blue.svg)](https://nodejs.org/es/)
[![DBMS](https://img.shields.io/badge/DBMS-MongoDB-orange.svg)](https://www.mongodb.com/es)
[![License](https://img.shields.io/badge/License-GPL-red.svg)](https://github.com/MarAl15/ProyectoCC/blob/master/LICENSE)
# [Proyecto](https://maral15.github.io/ProyectoCC/) de la asignatura de Cloud Computing

## Calendario 

### Descripción
Hoy en día nos vemos comprometidos a asistir a diversos acontecimientos importantes como reuniones o citas médicas en nuestra vida diaria, por ello se propone desarrollar un calendario simple que nos sirva de ayuda para recordar dichos acontecimientos, pudiendo así tenerlos presentes para que no se nos olviden y podamos organizarnos mejor. 

### Arquitectura
Se va a utilizar una arquitectura de microservicios ya que nos permite crear, testear y desplegar de forma independiente cada servicio, proporcionándonos mayor versatilidad y facilidad para integrar.

En este proyecto, se puede diferenciar principalmente estos microservicios:

- Almacenamiento de los acontecimientos que se desean recordar, así como la fecha y la hora de comienzo de este.
- Servicio de gestión de los acontecimientos previstos.
- Servicio de LOG para monitorización de la aplicación.

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

### Automatización de la creación de máquinas virtuales desde línea de órdenes

MV2: 40.89.157.192

Se ha construido un script para automatizar la creación de una máquina virtual en Azure mediante las órdenes del CLI de este. Para más información sobre la elección de la máquina virtual a instalar, la creación del script y el despliegue de la aplicación, consulte [este documento](https://github.com/MarAl15/ProyectoCC/blob/master/docs/hito4.md). 


### Orquestación de máquinas virtuales 

Despliegue Vagrant: 52.143.160.195

Se ha creado y aprovisionados dos máquinas virtuales en Azure con la ayuda de Vagrant y Ansible, una de ellas contendrá nuestra aplicación y la otra servirá para almacenar la base de datos de esta. Para más información consulte [este documento](https://github.com/MarAl15/ProyectoCC/blob/master/docs/hito5.md).

- [Comprobación del Vagrantfile](https://github.com/MarAl15/ProyectoCC/blob/master/docs/comprobacionVagrantfileJesus.md) a mi compañero [Jesús Mesa González](https://github.com/mesagon)
- Vagrantfile comprobado por [Jesús Mesa González](https://github.com/mesagon) en este [documento](https://github.com/mesagon/Proyecto-CC-MII/blob/master/docs/hito5/comprobacionVagrantfileMar.md)

## Licencia
Este software se desarrollará bajo la licencia GNU General Public License v3.0
