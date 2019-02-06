# Comprobación del Vagrantfile de Jesús Mesa González

Como nos indica en [este documento](https://github.com/mesagon/Proyecto-CC-MII/blob/master/docs/hito5/Documentacion.md) mi compañero Jesús Mesa González creamos una carpeta llamada "Proyecto-CC-MII" en la carpeta personal de mi PC local que contiene únicamente los ficheros necesarios para el despliegue de la aplicación. Además se ha modificado el nombre de las dos máquinas virtuales para evitar los conflictos de DNS que se produjeron y se ha añadido `ansible.host_vars = {"<alias>" => {"ansible_connection" => "paramiko"}}` en el Vagrantfile debido a un error que me surgió en la conexión con Ansible [[1](https://github.com/ansible/ansible/issues/16354), [2](https://docs.ansible.com/ansible/latest/reference_appendices/faq.html)].

A continuación creamos las variables de entorno necesarias para posteriormente ejecutar el Vagrantfile como nos indica:
```console
vagrant up --no-parallel
```

Procedemos al despliegue, para ello primero tenemos que acceder a la MV que contiene la base de datos:
```console
vagrant ssh db
```

Dentro de dicha máquina modificamos el archivo `/etc/mongodb.conf` y comentamos la línea que aparece `bind_ip` y reiniciamos el servicio de mongodb:
``` console
sudo service mongodb restart
```

Por último, accedemos a la MV con el microservicio de gestión de clientes:
```console
$ vagrant ssh clientes
```

Exportamos la variable de entorno `IP_MONGODB`:
```console
$ export IP_MONGODB=10.0.0.4
```

Y ejecutamos los test y seguidamente gunicorn para desplegar el microservicio.
```console
$ pipenv run gunicorn --log-config gunicorn-logging.conf --reload -D -b 0.0.0.0:80 app:app
```

Una vez desplegado el microservicio, lanzamos logstash para que realice la gestión de logs con el comando.
```console
$ /usr/share/logstash/bin/logstash -f logstash.conf
``` 

Y verificamos que se ha realizado el despliegue correctamente:

