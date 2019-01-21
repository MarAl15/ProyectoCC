# Hito 4

## Máquina virtual

Se desea crear una máquina virtual en Azure con la siguiente configuración:

- **Ubicación:** Centro de Francia

Para tomar esta decisión se han comparado las dos regiones que menor latencia en media presentaban [[1](https://azurespeedtest.azurewebsites.net/)].

<p align="center">
<img src="https://github.com/MarAl15/ProyectoCC/blob/master/docs/images/latencia-azure.png" height="350">
</p>

- **Tamaño:** B1s estándar (1 vcpu, 1GB de memoria)
 
Este tamaño nos proporciona 1 CPU virtual, 1 GB de memoria RAM, 2 discos de datos, 400 E/S máxima por segundo, 4 GB de almacenamiento temporal y con un costo estimado de 8.16€ (0.0110€/h).

Se ha seleccionado este paquete ya que a pesar de que nos ofrece menos recursos es suficiente para la aplicación a desplegar y es el más barato (en la ubicación elegida previamente).

Para encontrar el nombre asociado se ha ejecutado el siguiente comando:
```console
$ az vm list-sizes --location francecentral | jq '.[] | select( .name | contains("B1s"))'
{
  "maxDataDiskCount": 2,
  "memoryInMb": 1024,
  "name": "Standard_B1s",
  "numberOfCores": 1,
  "osDiskSizeInMb": 1047552,
  "resourceDiskSizeInMb": 2048
}
```

- **Tipo de autentificación:** Clave pública SSH

Por comodidad, evitando así el uso de contraseña.

- **Nombre de usuario:** usuario

- **Puertos de entrada públicos:** HTTP(80), SSH(22)

A través del puerto de SSH se puede realizar el aprovisionamiento de la máquina virtual con Ansible, mientras que a través del puerto 80 accedemos a la aplicación desplegada.

- **Dirección IP pública:** Estática

- **Sistema Operativo:** Ubuntu Server 18.04 LTS 

	Para decidir el sistema operativo debemos de tener en cuenta que necesitamos poder instalar una de las últimas versiones de Node.js, además de MongoDB para que funcione correctamente. Para tomar la decisión final se ha testeado el rendimiento de la aplicación utilizando Apache Bench.

1. Inicialmente se han creado tres máquinas virtuales en Azure, cada una con uno de los siguientes sistemas operativos, mediante línea de comandos:

	- Ubuntu Server 18.04 LTS
	- Debian 9
	- CentOS 7.5
	
Para ello se han elegido las imágenes más recientes disponibles en el centro de Francia:

-
	- Ubuntu Server 18.04 LTS cuya URN asociada es `Canonical:UbuntuServer:18.04-LTS:18.04.201901140`
	
```console
$ az vm image list --offer buntu --location francecentral --all
[
  .....
  {
    "offer": "UbuntuServer",
    "publisher": "Canonical",
    "sku": "18.04-LTS",
    "urn": "Canonical:UbuntuServer:18.04-LTS:18.04.201812060",
    "version": "18.04.201812060"
  },
  {
    "offer": "UbuntuServer",
    "publisher": "Canonical",
    "sku": "18.04-LTS",
    "urn": "Canonical:UbuntuServer:18.04-LTS:18.04.201901140",
    "version": "18.04.201901140"
  },
  {
    "offer": "UbuntuServer",
    "publisher": "Canonical",
    "sku": "18.10",
    "urn": "Canonical:UbuntuServer:18.10:18.10.201810180",
    "version": "18.10.201810180"
  },
  ..... 
]
``` 

-
	- Debian 9 cuya URN asociada es `credativ:Debian:9:9.0.201901090`
```console
$ az vm image list --offer ebian --location francecentral --all
[
  .....
  {
    "offer": "Debian",
    "publisher": "credativ",
    "sku": "9",
    "urn": "credativ:Debian:9:9.0.201808270",
    "version": "9.0.201808270"
  },
  {
    "offer": "Debian",
    "publisher": "credativ",
    "sku": "9",
    "urn": "credativ:Debian:9:9.0.201901090",
    "version": "9.0.201901090"
  },
  {
    "offer": "Debian",
    "publisher": "credativ",
    "sku": "9-backports",
    "urn": "credativ:Debian:9-backports:9.0.201710090",
    "version": "9.0.201710090"
  },
  ..... 
]
```

- 
	- CentOS 7.5 cuya URN asociada es `OpenLogic:CentOS:7.5:7.5.20180815`
```console
$ az vm image list --offer entOS --location francecentral --all
[
  .....
  {
    "offer": "CentOS",
    "publisher": "OpenLogic",
    "sku": "7.5",
    "urn": "OpenLogic:CentOS:7.5:7.5.20180626",
    "version": "7.5.20180626"
  },
  {
    "offer": "CentOS",
    "publisher": "OpenLogic",
    "sku": "7.5",
    "urn": "OpenLogic:CentOS:7.5:7.5.20180815",
    "version": "7.5.20180815"
  },
  {
    "offer": "secured-nodejs-on-centos",
    "publisher": "cognosys",
    "sku": "hardened-nodejs-on-centos-7-3",
    "urn": "cognosys:secured-nodejs-on-centos:hardened-nodejs-on-centos-7-3:1.2.0",
    "version": "1.2.0"
  },
  ..... 
]
```

Análogamente se ha buscado en el sur de Reino Unido:

-
	- Ubuntu Server 18.04 LTS cuya URN asociada es `Canonical:UbuntuServer:18.04-LTS:18.04.201901140`

-
	- Debian 9 cuya URN asociada es `credativ:Debian:9:9.0.201901090`

- 
	- CentOS 7.5 cuya URN asociada es `OpenLogic:CentOS:7.5:7.5.20180815`


Creamos un nuevo grupo de recursos en el sur de Reino Unido:
```console
$ az group create -l uksouth -n CCGroupUKS
```

A continuación se instalan utilizando el grupo de recursos `CCGroupFC` creado en el [ejercicio 2 del Tema 4](https://github.com/MarAl15/EjerciciosCC/blob/master/Tema4/tema4.md#ejercicio-2) y el grupo de recursos `CCGroupUKS` creado anteriormente:

```console
$ az vm create --name <SO>H4 --image <URN_asociada> --resource-group CCGroup<localizacion> --admin-username usuario --size Standard_B1s --ssh-key-value ~/.ssh/id_rsa.pub --public-ip-address-allocation static
```

Y se abre el puerto 80:

```console
$ az vm open-port -g CCGroup<localizacion> -n <SO>H4 --port 80
``` 

2. Seguidamente se instala la aplicación con ayuda del playbook (de forma análoga a como se explica [aquí](https://github.com/MarAl15/ProyectoCC/blob/master/docs/hito3.md#aprovisionamiento)), excepto el archivo `/etc/yum.repos.d/mongodb-org-4.0.repo`, que se crea manualmente a partir de la información de [esta página](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-red-hat/).

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
	
- Centro de Francia
| 						 										   | [Ubuntu 18.04](https://github.com/MarAl15/ProyectoCC/blob/master/docs/images/h4-ubuntu.png) | [Debian 9](https://github.com/MarAl15/ProyectoCC/blob/master/docs/images/h4-debian.png) | [CentOS 7.5](https://github.com/MarAl15/ProyectoCC/blob/master/docs/images/h4-centos.png) |
|:----------------------------------------------------------------:|:----------:|:--------:|:----------:|
| **Requests per second** [#/sec]								   | 60.38	    | 56.57    |  55.63	    |
| **Time per request (mean):** [ms]								   | 331.230	| 353.553  |  359.506   |
| **Time per request (mean, across all concurrent requests)** [ms] | 16.562     | 17.678   |  17.975    |

- Sur de Reino Unido
| 						 										   | [Ubuntu 18.04](https://github.com/MarAl15/ProyectoCC/blob/master/docs/images/h4-ubuntuUKS.png) | [Debian 9](https://github.com/MarAl15/ProyectoCC/blob/master/docs/images/h4-debianUKS.png) | [CentOS 7.5](https://github.com/MarAl15/ProyectoCC/blob/master/docs/images/h4-centosUKS.png) |
|:----------------------------------------------------------------:|:----------:|:--------:|:----------:|
| **Requests per second** [#/sec]								   | 58.21      |  31.01   |  56.54	    |
| **Time per request (mean):** [ms]								   | 343.588	|  644.892 |  353.715   |
| **Time per request (mean, across all concurrent requests)** [ms] | 17.179     |  32.245  |  17.686    |

Aunque en peticiones atendidas por segundo durante la prueba hemos obtenido un resultado menor tanto en Debian como en CentOS, el tiempo medio que tarda el servidor en atender tanto peticiones concurrentes como individuales es menor. Por tanto, debido a que la diferencia no suele ser muy significativa en el caso de las peticiones atendidas, se ha decidido utilizar Ubuntu, el cual nos proporciona paquetes de software más actualizados que en Debian además de que, por lo general, los desarrolladores tienen gran interés en desarrollar software para este debido a su popularidad entre la comunidad [[3](https://www.linuxadictos.com/debian-vs-ubuntu.html)].

Además se han obtenido mejores resultados en el centro de Francia. Por lo tanto, como ya habiamos anticipado, se va a automatizar la creación de una máquina virtual con Ubuntu 18.04 LTS con ubicación en el centro de Francia. 


## Avance

Se ha modificado los ficheros [app.js](https://github.com/MarAl15/ProyectoCC/blob/master/src/app.js) para añadir el servicio de LOG de nuestra aplicación, utilizando para ello el paquete Winston.

En este caso, simplemente se almacena todas las salidas de las peticiones a nuestra APIRest en el fichero `app.log` contenido en la carpeta `logs`. Para ello se ha configurado de la siguiente manera:
```node
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: `${__dirname}/../logs/app.log` })
  ]
});
``` 

## Referencias principales
- [Winston](https://www.npmjs.com/package/winston)
- [Configurando Winston - Logger en Nodejs](https://www.youtube.com/watch?v=axOHMgZznpo)
- [How To Use Winston to Log Node.js Applications](https://www.digitalocean.com/community/tutorials/how-to-use-winston-to-log-node-js-applications)
- [Tema de "Automatizando el despliegue en la nube"](http://jj.github.io/CC/documentos/temas/Automatizando_cloud)
- [Azure CLI (Latest)](https://docs.microsoft.com/es-es/cli/azure/vm?view=azure-cli-latest)

