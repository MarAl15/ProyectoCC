# Máquina virtual Azure

Se ha creado una máquina virtual en Azure con la siguiente configuración:

- **Nombre del equipo:** ubuntu16

- **Sistema Operativo:** Ubuntu Server 16.04 LTS 

Está decisión fue tomada ya que Ubuntu es un sistema operativo de código abierto con paquetes de software más actualizados que en Debian, con un instalador mucho más fácil e intuitivo y, por lo general, los desarrolladores tienen gran interés en desarrollar software para esta debido a su popularidad entre la comunidad [[1](https://www.linuxadictos.com/debian-vs-ubuntu.html),[2](http://www.servidorinfo.info/que-servidor-os-elegir-en-2018-debian-server-vs-ubuntu-server/)].
<!-- 
https://www.linuxadictos.com/debian-vs-ubuntu.html
http://www.servidorinfo.info/que-servidor-os-elegir-en-2018-debian-server-vs-ubuntu-server/ 
-->

Por otra parte, como podemos leer [aquí](https://www.solvetic.com/page/recopilaciones/s/ordenadores/diferencias-entre-ubuntu-desktop-escritorio-y-ubuntu-server), Ubuntu Desktop es un sistema que por defecto viene con múltiples aplicaciones de oficina, sistema, multimedia enfocadas en un entorno grafico que tras cada actualización presenta mejoras; mientras que Ubuntu Server es un sistema que ofrece por defecto una interfaz de línea de comandos mediante la cual podemos instalar aplicativos enfocados al desarrollo y administración de una organización como MySQL, Apache, Python, Node, entre muchos otros. Como en nuestro caso nos interesa un sistema operativo original lo más básico posible, optamos por la segunda opción.

<!--
https://www.solvetic.com/page/recopilaciones/s/ordenadores/diferencias-entre-ubuntu-desktop-escritorio-y-ubuntu-server
-->

La versión 16.04 se eligió ya que para versiones anteriores se probó, pero actualmente Node no ofrece mantenimiento para versiones anteriores por lo que no pudo desplegarse la aplicación satisfactoriamente. 

Por último, cabe notar que LTS (_Long Term Service_) nos ofrece un soporte de hasta 5 años.

- **Ubicación:** Centro de Francia

Se ha elegido la región más cercana posible para intentar que la conexión presente menos latencia.

- **Tamaño:** B1s estándar (1 vcpu, 1GB de memoria)
 
Este tamaño nos proporciona 1 CPU virtual, 1 GB de memoria RAM, 2 discos de datos, 400 E/S máxima por segundo, 4 GB de almacenamiento temporal y con un costo estimado de 8.16€ (0.0110€/h).

Se ha seleccionado este paquete ya que a pesar de que nos ofrece menos recursos es suficiente para la aplicación a desplegar y es el más barato.

- **Tipo de autentificación:** Clave pública SSH

Por comodidad, evitando así el uso de contraseña.

- **Nombre de usuario:** usuario

- **Puertos de entrada públicos:** HTTP(80), SSH(22)

A través del puerto de SSH se puede realizar el aprovisionamiento de la máquina virtual con Ansible, mientras que a través del puerto 80 accedemos a la aplicación desplegada.

- **Dirección IP pública:** Estática

