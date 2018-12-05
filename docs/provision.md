# Aprovisionamiento

Ansible es un sistema de gestión remota de configuración que permite trabajar simultáneamente miles de sistemas diferentes. Está escrito en Python y para la descripción de las configuraciones de los sistemas usa YAML. Ansible simplemente tiene que estar instalado en el _anfitrión_ y permite que en la máquina virtual que vayamos a aprovisionar no tenga nada instalado, salvo Python.

<!--https://blog.deiser.com/es/primeros-pasos-con-ansible-->
Esta herramienta será usada para provisionar la máquina virtual creada en Azure debido a su sencillez de uso, a que no necesita agentes, no requiere configuraciones engorrosas y complicadas, y ofrece flexibilidad.

## Configuración Ansible

Tras la instalación de Ansible, se se copia el fichero de *\etc\ansible\ansible.cfg* en el directorio donde vamos a trabajar, realizando las siguiente modificaciones:

```
[dafaults]
host_key_checking = False
inventory = ./ansible_hosts
```

__Cabe notar que no es necesario copiar, descomentar y modificar, sino que se puede crear un fichero llamado `ansible.cfg` desde cero con esas tres líneas.__

Como podemos observar tiene dos partes claras:

1. Se evita que al conectarnos por SSH a la máquina virtual se haga una comprobación del host.

2. Se especifica el nombre del fichero de nodos en los cuales va a trabajar, conocido como inventario. En el fichero *ansible_hosts* se va a definir las máquinas con las que vamos a trabajar.


En este caso, se ha definido el fichero *ansible_hosts* de la siguiente manera: 

``` 
[azure]
ubuntu16 ansible_ssh_port=22 ansible_ssh_host=40.89.165.159

[azure:vars]
ansible_ssh_private_key_file=~/.ssh/id_rsa
ansible_ssh_user=usuario
```

Primero se le asigna un nombre a la máquina, en este caso `ubuntu16`, y se le especifica la dirección IP y el puerto por el que puede acceder a la máquina virtual para provisionarla. 

Inicialmente especificamos que el usuario que vamos a usar es `usuario`. Pero para acceder a la máquina virtual necesitamos una clave privada. Azure nos pide la clave pública de esa clave privada a la máquina virtual al crearla para subirla directamente y que cuando nos conectemos por SSH pueda acceder a esa máquina virtual.

Probamos que Ansible puede acceder a la máquina virtual ejecutando:

```console
mar@mar-SATELLITE-L750:~/UGR/CC/azure$ ansible ubuntu16 -m ping
ubuntu16 | SUCCESS => {
    "changed": false, 
    "ping": "pong"
}
```

## Playbook

Para el despliegue de nuestra aplicación se ha creado el _playbook_ [receta.yml](https://github.com/MarAl15/ProyectoCC/blob/master/provision/receta.yml):

```yaml
---
- hosts: ubuntu16

  vars:
    - directorio: ~/ProyectoCC
  
  tasks: 
    - name: Instala git
      become: yes
      apt: pkg=git state=present
    
    - name: Instala curl 
      become: yes
      apt: pkg=curl state=latest
      
    - name: Agrega PPA Node.js
      become: yes
      shell: curl -sL https://deb.nodesource.com/setup_11.x | sudo -E bash -
      args: 
        warn: no
      
    - name: Instala Node.js
      become: yes
      apt: pkg=nodejs state=latest
    
    - name: Instala forever
      become: yes
      npm: name=forever global=yes state=present
      
    - name: Crea directorio del proyecto
      file: path={{ directorio }} state=directory
      
    - name: Descarga el proyecto del repositorio
      git: 
        repo: https://github.com/MarAl15/ProyectoCC.git
        dest: "{{ directorio }}"
        force: yes
        
    - name: Instala dependencias basadas en package.json
      npm:
        path: "{{ directorio }}"
    
    - name: Redirige puertos
      become: yes
      shell: iptables -t nat -I PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 5000

    - name: Ejecución de la aplicación
      shell: cd {{directorio }}; npm start
```

El fichero yaml siempre se inicia con tres rayas que indican que es una página o un documento.

Con el `-` indicamos que va a comenzar un array, con pares de tipo `clave: valor`.

- `host:` se especifican los hosts sobre los que se va a trabajar.
- `become:` especificamos si necesitamos privilegios de superusuario o administrador para poder trabajar.
- `tasks:` tareas que vamos a hacer, estado que tiene que alcanzar la máquina sobre la que vamos a trabajar.

En esta _playbook_ se realizan los siguientes pasos:

- Instalación de `git`.
- Instalación de `Node.js`, instalando `curl` y agregando su PPA previamente.
- Instalación de `forever` para poder ejecutar en segundo plano la aplicación.
- Creación del directorio donde se albergará el proyecto posteriormente.
- Descarga de nuestro proyecto desde el repositorio.
- Instalación de las dependencias basadas en _package.json_.
- Redirección del tráfico de nuestra aplicación al puerto 80.
- Ejecución de la aplicación. 

Finalmente se comprueba que funciona:

<p align="center">
<img src="https://github.com/MarAl15/ProyectoCC/blob/77d30302d3269890acf83c3c72db33e988bb1581/docs/images/provisionamiento-mio.png" height="600">
</p>

Se puede observar que se han realizado todas las tareas satisfactoriamente. Comprobamos ahora que se ha desplegado correctamente nuestra aplicación accediendo a la dirección IP de la máquina virtual creada en Azure desde el navegador:

<p align="center">
<img src="https://github.com/MarAl15/ProyectoCC/blob/77d30302d3269890acf83c3c72db33e988bb1581/docs/images/comprobacion1-mio.png" weight="450">
</p>

<p align="center">
<img src="https://github.com/MarAl15/ProyectoCC/blob/77d30302d3269890acf83c3c72db33e988bb1581/docs/images/comprobacion2-mio.png" height="450">
</p>




