# Hito 3

## Máquina virtual Azure

Se ha creado una máquina virtual en Azure con la siguiente configuración:

- **Nombre del equipo:** ubuntu18

- **Sistema Operativo:** Ubuntu Server 18.04 LTS 

Está decisión fue tomada ya que Ubuntu es un sistema operativo de código abierto con paquetes de software más actualizados que en Debian, con un instalador mucho más fácil e intuitivo y, por lo general, los desarrolladores tienen gran interés en desarrollar software para este debido a su popularidad entre la comunidad [[1](https://www.linuxadictos.com/debian-vs-ubuntu.html)]. 

Por último, cabe notar que se utiliza la última versión de soporte extendido LTS (_Long Term Service_) que nos ofrece un soporte de hasta 5 años.

- **Ubicación:** Centro de Francia

Se ha elegido la región que presenta menos latencia en media.

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

## Avance y [modificaciones](https://github.com/MarAl15/ProyectoCC/blob/master/docs/microservicios.md)

Se ha modificado los ficheros [app.js](https://github.com/MarAl15/ProyectoCC/blob/master/src/app.js) y [Tarea.js](https://github.com/MarAl15/ProyectoCC/blob/master/src/Tarea.js) para manejar la base de datos `tareasdb` para la gestión de tareas utilizando mongoose. Además se han modificado alguna de las rutas y se ha añadido la posibilidad de eliminar todas las tareas almacenadas en la base de datos.

## Aprovisionamiento

Como se nos explica en el [seminario de "Introducción a Ansible"](https://www.youtube.com/watch?v=gFd9aj78_SM&feature=youtu.be), Ansible es un sistema de gestión remota de configuración que permite trabajar simultáneamente con miles de sistemas diferentes. Está escrito en Python y para la descripción de las configuraciones de los sistemas usa YAML. Ansible simplemente tiene que estar instalado en el _anfitrión_ y permite que en la máquina virtual que vayamos a aprovisionar no tenga nada instalado, salvo Python.


Esta herramienta será usada para provisionar la máquina virtual creada en Azure debido a su sencillez de uso, a que no necesita agentes, no requiere configuraciones engorrosas y complicadas, y ofrece flexibilidad [[2](https://blog.deiser.com/es/primeros-pasos-con-ansible)].

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
ubuntu18 ansible_ssh_port=22 ansible_ssh_host=40.89.153.203

[azure:vars]
ansible_ssh_private_key_file=~/.ssh/id_rsa
ansible_ssh_user=usuario
```

Primero se le asigna un nombre a la máquina, en este caso `ubuntu18`, y se le especifica la dirección IP y el puerto por el que puede acceder a la máquina virtual para provisionarla. 

Inicialmente especificamos que el usuario que vamos a usar es `usuario`. Pero para acceder a la máquina virtual necesitamos una clave privada. Azure nos pide la clave pública de esa clave privada a la máquina virtual al crearla para subirla directamente y que cuando nos conectemos por SSH pueda acceder a esa máquina virtual.

### Playbook

Para el despliegue de nuestra aplicación se ha creado el _playbook_ [receta.yml](https://github.com/MarAl15/ProyectoCC/blob/master/provision/receta.yml):


El fichero YAML siempre se inicia con tres rayas que indican que es una página o un documento.

Con el `-` indicamos que va a comenzar un array, con pares de tipo `clave-valor`.

- `host:` se especifican los _hosts_ sobre los que se va a trabajar.
- `become:` especificamos si necesitamos privilegios de superusuario o administrador para poder trabajar.
- `tasks:` tareas que vamos a hacer, estado que tiene que alcanzar la máquina sobre la que vamos a trabajar.

En este _playbook_ se realizan los siguientes pasos:

- Instalación de `git`.
- Instalación de `Node.js`, instalando `curl` y agregando su PPA previamente.[[3](https://github.com/nodesource/distributions/blob/master/README.md)]
- Instalación de `forever` para poder ejecutar en segundo plano la aplicación.
- Instalación de MongoDB, importanto previamente la clave pública y creando un archivo de lista para este.[[4](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)]
- Iniciación de MongoDB.
- Creación del directorio donde se albergará el proyecto posteriormente.
- Descarga de nuestro proyecto desde el repositorio.
- Instalación de las dependencias basadas en _package.json_.

A continuación se comprueba que funciona:

<p align="center">
<img src="https://github.com/MarAl15/ProyectoCC/blob/master/docs/images/verificacion-playbook.png" height="600">
</p>

Se puede observar que se han realizado todas las tareas satisfactoriamente. 

Finalmente desplegamos nuestra aplicación en la máquina virtual provisionada conectándonos por SSH a esta:
```console
$ ssh usuario@40.89.153.203
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

