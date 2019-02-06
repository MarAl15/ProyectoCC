# Comprobación del Vagrantfile de Jesús Mesa González

Como nos indica en [este documento](https://github.com/mesagon/Proyecto-CC-MII/blob/master/docs/hito5/Documentacion.md) mi compañero Jesús Mesa González creamos una carpeta llamada "Proyecto-CC-MII" en la carpeta personal de mi PC local que contiene únicamente los ficheros necesarios para el despliegue de la aplicación. Además se ha modificado el nombre de las dos máquinas virtuales para evitar los conflictos de DNS que se produjeron y se ha añadido `ansible.host_vars = {"<aliasMV>" => {"ansible_connection" => "paramiko"}}` en el Vagrantfile debido a un error que me surgió en la conexión con Ansible [[1](https://github.com/ansible/ansible/issues/16354), [2](https://docs.ansible.com/ansible/latest/reference_appendices/faq.html)].

A continuación creamos las variables de entorno necesarias para posteriormente ejecutar el Vagrantfile como nos indica:
```console
$ vagrant up --no-parallel
```
Inicialmente se crea y provisiona la máquina relacionada con la base de datos:
<p align="center">
<img src="https://github.com/MarAl15/ProyectoCC/blob/master/docs/images/comprobacionJesus-app1.png" weight="450">
</p>

<p align="center">
<img src="https://github.com/MarAl15/ProyectoCC/blob/master/docs/images/comprobacionJesus-app2.png" weight="450">
</p>

Y seguidamente se crea y provisiona la máquina virtual que contendrá la aplicación:
<p align="center">
<img src="https://github.com/MarAl15/ProyectoCC/blob/master/docs/images/comprobacionJesus-db1.png" weight="450">
</p>

<p align="center">
<img src="https://github.com/MarAl15/ProyectoCC/blob/master/docs/images/comprobacionJesus-db2.png" weight="450">
</p>

<p align="center">
<img src="https://github.com/MarAl15/ProyectoCC/blob/master/docs/images/comprobacionJesus-db3.png" weight="450">
</p>

Procedemos al despliegue, para ello primero tenemos que acceder a la MV que contiene la base de datos:
```console
$ vagrant ssh db
```

Dentro de dicha máquina modificamos el archivo `/etc/mongodb.conf` y comentamos la línea que aparece `bind_ip` y reiniciamos el servicio de mongodb:
``` console
$ sudo service mongodb restart
```

Por último, accedemos a la MV con el microservicio de gestión de clientes:
```console
$ vagrant ssh clientes
```

Exportamos la variable de entorno `IP_MONGODB`:
```console
$ export IP_MONGODB=10.0.0.4
```

A continuación ejecutamos los test, y gunicorn para desplegar el microservicio.
```console
$ pipenv run gunicorn --log-config gunicorn-logging.conf --reload -D -b 0.0.0.0:80 app:app
```

Una vez desplegado el microservicio, lanzamos logstash para que realice la gestión de logs con el comando.
```console
$ /usr/share/logstash/bin/logstash -f logstash.conf
``` 

Y verificamos que se ha realizado el despliegue correctamente:
<p align="center">
<img src="https://github.com/MarAl15/ProyectoCC/blob/master/docs/images/h5-comprobacionJesus.png" weight="450">
</p>
