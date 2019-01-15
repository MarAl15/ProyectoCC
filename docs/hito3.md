# Hito 3

## Máquina virtual Azure

Se ha creado una máquina virtual en Azure con la siguiente configuración:

- **Ubicación:** Centro de Francia

Se ha elegido la región que presenta menos latencia en media [[1](https://azurespeedtest.azurewebsites.net/)].

<p align="center">
<img src="https://github.com/MarAl15/ProyectoCC/blob/master/docs/images/latencia-azure.png" height="350">
</p>

- **Tamaño:** B1s estándar (1 vcpu, 1GB de memoria)
 
Este tamaño nos proporciona 1 CPU virtual, 1 GB de memoria RAM, 2 discos de datos, 400 E/S máxima por segundo, 4 GB de almacenamiento temporal y con un costo estimado de 8.16€ (0.0110€/h).

Se ha seleccionado este paquete ya que a pesar de que nos ofrece menos recursos es suficiente para la aplicación a desplegar y es el más barato (en la ubicación elegida previamente).

- **Tipo de autentificación:** Clave pública SSH

Por comodidad, evitando así el uso de contraseña.

- **Nombre de usuario:** usuario

- **Puertos de entrada públicos:** HTTP(80), SSH(22)

A través del puerto de SSH se puede realizar el aprovisionamiento de la máquina virtual con Ansible, mientras que a través del puerto 80 accedemos a la aplicación desplegada.

- **Dirección IP pública:** Estática

- **Sistema Operativo:** Ubuntu Server 18.04 LTS 

	Para decidir el sistema operativo se ha testeado el rendimiento de la aplicación utilizando Apache Bench. Para ello, se han seguido los siguientes pasos:

1. Inicialmente se han creado tres máquinas virtuales en Azure:

	- Ubuntu Server 18.04 LTS
	- Debian 9
	- CentOS 7.5
	
	Además se ha instalado el paquete `ab`:
```console
$ sudo apt install apache2-utils
```

2. Seguidamente se instala la aplicación con ayuda del playbook (de forma análoga a como se explica [aquí](https://github.com/MarAl15/ProyectoCC/blob/master/docs/hito3.md#aprovisionamiento)), excepto el archivo `/etc/yum.repos.d/mongodb-org-4.0.repo`, que se crea como nos indica [esta página](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-red-hat/), manualmente.

3. Se ejecuta el siguiente comando[[2](https://blog.diacode.com/testeando-el-rendimiento-de-tu-aplicacion-con-apache-bench)]:
```console
$ ab -n 1000 -c 20 http://<IP_MV>/Acontecimientos
```
donde:

-
	- `-n 1000` indica que se harán 1000 peticiones
	- `-c 20` indica que se harán 20 peticiones concurrentes
	- `http://<IP_MV>/Acontecimientos` es la URL que vamos a testear, donde `IP_MV` es la dirección IP de la máquina virtual a probar.
	
Y seleccionamos para comparar, como se nos aconseja en [[2](https://blog.diacode.com/testeando-el-rendimiento-de-tu-aplicacion-con-apache-bench)], los siguientes resultados:

-
	- **Requests per second:** peticiones atendidas por segundo durante la prueba.
	- **Time per request (mean):** tiempo medio que el servidor ha tardado en atender a un grupo de peticiones concurrentes.
	- **Time per request (mean, across all concurrent requests):** tiempo medio que el servidor ha tardado en atender una petición individual.
	
| 						 										   | [Ubuntu 18.04](https://github.com/MarAl15/ProyectoCC/blob/master/docs/images/h3-ubuntu.png) | [Debian 9](https://github.com/MarAl15/ProyectoCC/blob/master/docs/images/h3-debian.png) | [CentOS 7.5](https://github.com/MarAl15/ProyectoCC/blob/master/docs/images/h3-centos.png) |
|:------------------------------------------------------------------:|:--------------:|:----------:|:------------:|
| **Requests per second** [#/sec]								   | 65.14	      | 56.76   |  58.05	  |
| **Time per request (mean):** [ms]								   | 307.009	  | 352.387  | 344.552    |
| **Time per request (mean, across all concurrent requests)** [ms] | 15.350       | 17.619  | 17.228     |

Aunque en peticiones atendidas por segundo durante la prueba hemos obtenido un resultado menor tanto en Debian como en CentOS, el tiempo medio que tarda el servidor en atender tanto peticiones concurrentes como individuales es menor. Por tanto, debido a que la diferencia no es muy significativa en el caso de las peticiones atendidas, se ha decidido utilizar Ubuntu, el cual nos proporciona paquetes de software más actualizados que en Debian, con un instalador mucho más fácil e intuitivo y, por lo general, los desarrolladores tienen gran interés en desarrollar software para este debido a su popularidad entre la comunidad [[3](https://www.linuxadictos.com/debian-vs-ubuntu.html)]. 

- **Nombre del equipo:** ubuntu18

## Avance y modificaciones

Se ha modificado los ficheros [app.js](https://github.com/MarAl15/ProyectoCC/blob/master/src/app.js) para manejar la base de datos `acontecimientosdb` para la gestión de acontecimientos utilizando mongoose. Para ello se ha creado el siguiente objeto _Schema_ para definir la lista de propiedades que queremos que tenga la clase `Acontecimiento` en el archivo [Acontecimiento.js](https://github.com/MarAl15/ProyectoCC/blob/master/src/Acontecimiento.js):
```node
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var acontecimiento = new Schema({
	Etiqueta: { 
		type: String, 
		required: [true, "Etiqueta no puede ser vacio"]
	},
	Fecha: { 
		type: String, 
		required: [true, "Fecha no puede ser vacia"]
	},
	Hora: String
});

module.exports = mongoose.model('Acontecimientos',acontecimiento)
```
donde se define el objeto `acontecimiento` usando el constructor Schema, y luego se utiliza la instancia del esquema para definir el modelo Acontecimientos.


Además se han modificado alguna de las rutas y se ha añadido la posibilidad de eliminar todas las tareas almacenadas en la base de datos.

## Aprovisionamiento

Como se nos explica en el [seminario de "Introducción a Ansible"](https://www.youtube.com/watch?v=gFd9aj78_SM&feature=youtu.be), Ansible es un sistema de gestión remota de configuración que permite trabajar simultáneamente con miles de sistemas diferentes. Está escrito en Python y para la descripción de las configuraciones de los sistemas usa YAML. Ansible simplemente tiene que estar instalado en el _anfitrión_ y permite que en la máquina virtual que vayamos a aprovisionar no tenga nada instalado, salvo Python.


Esta herramienta será usada para provisionar la máquina virtual creada en Azure debido a su sencillez de uso, a que no necesita agentes, no requiere configuraciones engorrosas y complicadas, y ofrece flexibilidad [[4](https://blog.deiser.com/es/primeros-pasos-con-ansible)].

### Configuración Ansible

Siguiendo los pasos del [seminario](https://www.youtube.com/watch?v=gFd9aj78_SM&feature=youtu.be), tras la instalación de Ansible, se copia el fichero de *\etc\ansible\ansible.cfg* en el directorio donde vamos a trabajar, realizando las siguiente modificaciones:

```
[dafaults]
host_key_checking = False
inventory = ./ansible_hosts
```

Como podemos observar tiene dos partes claras:

1. Se evita que al conectarnos por SSH a la máquina virtual se haga una comprobación del host.

2. Se especifica el nombre del fichero de nodos en los cuales va a trabajar, conocido como inventario. En el fichero *ansible_hosts* se va a definir las máquinas que vamos a utilizar.


En este caso, se ha definido el fichero *ansible_hosts* de la siguiente manera: 

``` 
[azure]
<nombre_MV> ansible_ssh_host=<IP_MV>

[azure:vars]
ansible_ssh_private_key_file=~/.ssh/id_rsa
ansible_ssh_user=usuario
```

Primero se le asigna un nombre a la máquina y se le especifica la dirección IP por la que puede acceder a la máquina virtual para provisionarla. 

Inicialmente especificamos que el usuario que vamos a usar es `usuario`. Pero para acceder a la máquina virtual necesitamos una clave privada. Azure nos pide la clave pública de esa clave privada a la máquina virtual al crearla para subirla directamente y que cuando nos conectemos por SSH pueda acceder a esa máquina virtual.

### Playbook

Para el despliegue de nuestra aplicación se ha creado el _playbook_ [receta.yml](https://github.com/MarAl15/ProyectoCC/blob/master/provision/receta.yml):


El fichero YAML siempre se inicia con tres rayas que indican que es una página o un documento.

Con el `-` indicamos que va a comenzar un array, con pares de tipo `clave-valor`.

- `host:` se especifican los _hosts_ sobre los que se va a trabajar.
- `become:` especificamos si necesitamos privilegios de superusuario o administrador para poder trabajar.
- `tasks:` tareas que vamos a hacer, estado que tiene que alcanzar la máquina sobre la que vamos a trabajar.

En este _playbook_ se realizan los siguientes pasos:

- Instalación de `git` para poder clonar nuestro proyecto posteriormente.
- Instalación de `Node.js`, instalando `curl` y agregando su PPA previamente.[[5](https://github.com/nodesource/distributions/blob/master/README.md)]
	
	Se ha elegido instalar `curl` en vez de, por ejemplo, `wget` ya que, aunque ambos nos permite descargar contenido desde `FTP`, `HTTP` y `HTTPS`, `curl` nos ofrece soporte para más protocolos, además de ejecutarse en más plataformas. Cabe notar que `curl` ofrece capacidades de subida y envío, mientras que `wget` sólo ofrece soporte HTTP POST simple. [[6](https://maslinux.es/curl-vs-wget-sus-diferencias-uso-y-cual-deberias-usar/),[7](https://www.quora.com/Whats-the-difference-between-curl-and-wget)]	
- Instalación de `forever` para poder ejecutar en segundo plano la aplicación. Se ha elegido `forever` en vez de `pm2`, por ejemplo, ya que es una herramienta de interfaz de línea de mandatos simple que permite garantizar la ejecución continua de un determinado script y gracias a su sencilla interfaz es ideal para ejecutar los despliegues más pequeños de scripts y aplicaciones Node.js. [[8](https://expressjs.com/es/advanced/pm.html#sl)]
- Instalación de MongoDB, importando previamente la clave pública y creando un archivo de lista para este.[[9](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/), [10](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-debian/)] 
- Iniciación de MongoDB.
- Descarga de nuestro proyecto desde el repositorio.
- Instalación de las dependencias basadas en _package.json_.

A continuación se comprueba que funciona:

<p align="center">
<img src="https://github.com/MarAl15/ProyectoCC/blob/master/docs/images/verificacion-receta.png" height="600">
</p>

Se puede observar que se han realizado todas las tareas satisfactoriamente. 

Finalmente desplegamos nuestra aplicación en la máquina virtual provisionada conectándonos por SSH a esta:
```console
$ ssh usuario@<IP_MV>
usuario@ubuntu18:~$ cd ProyectoCC/
usuario@ubuntu18:~/ProyectoCC$ sudo npm start
```

Por último, comprobamos que se ha desplegado correctamente nuestra aplicación accediendo a la dirección IP de la máquina virtual creada en Azure desde el navegador:

<p align="center">
<img src="https://github.com/MarAl15/ProyectoCC/blob/master/docs/images/comprobacion.png" weight="450">
</p>


## Referencias principales
- [Seminario de "Introducción a Ansible"](https://www.youtube.com/watch?v=gFd9aj78_SM&feature=youtu.be)
- [Tema "Provisionamiento en infraestructuras virtuales"](https://jj.github.io/CC/documentos/temas/Provision)
- [Documentación oficial _playbook_ Ansible](https://docs.ansible.com/ansible/latest/user_guide/playbooks.html)

