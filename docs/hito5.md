# Hito 5

## Orquestación

En este hito hemos realizado la creación de dos máquinas virtuales, así como la descripción y el aprovisionamiento correspondiente, con ayuda de Vagrant que nos permite crear cualquier entorno basado en máquinas virtuales de una manera rápida y replicable.

Para ello se seguirán los pasos que nos indican en el [GitHub oficial de Azure](https://github.com/Azure/vagrant-azure).

Previamentente instalamos el CLI de Azure (en caso de que no lo tuviésemos ya instalado previamente) e iniciamos sesión en Azure. A continuación creamos un directorio de aplicacion activo de Azure con acceso al gestor de recursos.
```console
$ az ad sp create-for-rbac
```

Los valores `tenant`, `appId` y `password` se utilizan para los valores de configuración `azure.tenant_id`, `azure.client_id` y `azure.client_secret` del Vagrantfile, donde describimos el tipo de máquinas que vamos a crear.

Seguidamente añadimos la _dummy box_ e instalamos el _plugin_ de `vagrant-azure`.
```console
$ vagrant box add azure https://github.com/azure/vagrant-azure/raw/v2.0/dummy.box --provider azure
$ vagrant plugin install vagrant-azure
```

### Vagrantfile

Creamos el directorio denominado `orquestacion`, y añadimos el contenido del las máquinas virtuales que queremos crear y provisionar en el archivo `Vagrantfile`. 

Se crearán dos máquinas virtuales con las características vistas y justificadas en hitos anteriores, una de ellas nos servirá para el despliegue de nuestra aplicación y la otra contendrá todo lo relacionado con el almacenamiento. En consecuencia, se ha separado el _playbook_ original en dos: [`recetaApp.yml`](https://github.com/MarAl15/ProyectoCC/blob/master/orquestacion/recetaApp.yml) y [`recetaDB.yml
`](https://github.com/MarAl15/ProyectoCC/blob/master/orquestacion/recetaDB.yml).

A continuación desglosamos un poco el [`Vagrantfile`](https://github.com/MarAl15/ProyectoCC/blob/master/orquestacion/Vagrantfile) que hemos creado para ver la configuración que va a tener nuestras máquinas virtuales:

```vagrant
Vagrant.configure('2') do |config|
	# ....
end
```

El "2" en la primera línea de arriba representa la versión del objeto de configuración que se utilizará para la configuración de ese bloque. Actualmente, sólo hay dos versiones soportadas: "1" y "2". La versión 1 representa la configuración de Vagrant 1.0.x. y "2" representa la configuración para 1.1+ , la 2.0.x. [[1](https://www.vagrantup.com/docs/vagrantfile/version.html)]

```vagrant
config.vm.box = 'azure'
```

Con esta opción elegimos el _box_ con el que vamos a crear la máquina virtual, en este caso a partir del _dummy box_ que añadimos anteriormente.

```vagrant
# Clave ssh
config.ssh.private_key_path = '~/.ssh/id_rsa'
```

Le indicamos a Azure la clave pública asociada a nuestra clave privada para que cuando nos conectemos por SSH podamos acceder a la máquina virtual.

A continuación especificamos que queremos definir dos máquinas virtuales [[2](https://www.vagrantup.com/docs/multi-machine/)]
```
config.vm.define "<alias>" do |<alias>|
	# ...
end	
```

donde `<alias>` es `app` o `db`. Dentro de esta se define las características concretas que tendrá cada máquina virtual donde podemos distinguir tres bloques principalmente:

```
<alias>.vm.provider :azure do |azure, override|
	# ...
end

# Nombre de usuario predeterminado para SSH
<alias>.ssh.username = "usuario"

<alias>.vm.provision "ansible" do |ansible|
	# ...
end
```

El bloque primero (`<alias>.vm.provider :azure`) nos permitirá definir las características que queremos que tenga nuestra máquina virtual en Azure. El segundo parámetro nos sirve para establecer el nombre de usuario que Vagrant usará para conectarse por SSH como predeterminado ya que por defecto es "vagrant" [[3](https://www.vagrantup.com/docs/vagrantfile/ssh_settings.html#config-ssh-username)]. Y el último bloque (`<alias>.vm.provision "ansible"`) nos sirve para realizar el provisionamiento de la máquina virtual relacionada con dicho `<alias>`.

Empecemos explicando el contenido de `<alias>.vm.provider :azure`:

```
# Cuenta de Azure
azure.tenant_id = ENV['AZURE_TENANT_ID']
azure.client_id = ENV['AZURE_CLIENT_ID']
azure.client_secret = ENV['AZURE_CLIENT_SECRET']
# Subcripción de Azure
azure.subscription_id = ENV['AZURE_SUBSCRIPTION_ID']
```

- `tenant_id:` El identificador de `tenant` del directorio de aplicacion activo de Azure.
- `client_id:` El identificador de `client` del directorio de aplicacion activo de Azure.
- `azure.client_secret:` La contraseña del directorio de aplicacion activo de Azure.
- `azure.subscription_id:` El ID de la subripción de Azure que queremos utilizar.

Cabe notar que se usan variables de entorno para todos los IDs y claves tanto por seguridad como por el hecho de que usar variables de entorno (u otro sistema análogo) es configurable por cada uno de los usuarios de forma sencilla.


```
# Nombre de la MV
azure.vm_name = '<nombre>'
# Nombre del grupo de recursos
azure.resource_group_name = 'CCGroupH5'
# Nombre de usuario
azure.admin_username ='usuario'
```

- `vm_name:` Nombre de la máquina virtual a crear. En este caso, se ha utilizado `calendar` para la que contiendrá la aplicación y `database` para la relacionada con la base de datos.
- `resource_group_name:` Nombre del grupo de recursos a usar. Si no existe, lo crea.
- `admin_username:` Nombre del administrador/root de la MV.

```
# Localización de la MV
azure.location =  'francecentral'

# Imagen a instalar en la MV
azure.vm_image_urn = 'Canonical:UbuntuServer:18.04-LTS:18.04.201901140'	

# Tamaño
azure.vm_size = 'Standard_B1s'
``` 

Como ya especificamos en el hito anterior se va a crear una máquina virtual con Ubuntu Server 18.04 LTS en el centro de Francia (con la que obtuvimos relativamente mejores resultados al testear el rendimiento de la aplicación utilizando Apache Benc) y con el paquete más barato de dicha ubicación. Para ello se utiliza la URN que obtuvimos (`Canonical:UbuntuServer:18.04-LTS:18.04.201901140`).

```
# Puertos a abrir
azure.tcp_endpoints = [80,27017]
```

Con el parámetro `tcp_endpoints` especificamos que queremos abrir el puerto 80 para comprobar posteriormente que se ha desplegado correctamente nuestra aplicación, y además habilitamos el puerto por defecto relacionado con MongoDB, 27017, para comunicarnos con nuestra base de datos. Si deseásemos que escuchase por otro deberíamos modificar el campo `port` del fichero `/etc/mongod.conf` de la máquina virtual cuyo alias es `db`, es decir, la relacionada con la base de datos [[4](https://carlosazaustre.es/como-conectarte-remotamente-a-tu-base-de-datos-mongodb/)].

Y por último se explica la parte de aprovisionamiento `app.vm.provision "ansible"`:

```
ansible.host_vars = {
  "app" => {"ansible_user" => "usuario"}
}
ansible.playbook = "recetaApp.yml"
```

Inicialmente especificamos que el usuario que vamos a usar es `usuario`. Cabe notar que se ha utilizado `ansible_user` en vez de `ansible_ssh_user` ya que Ansible 2.0 ha modificado dicho nombre [[5](https://docs.ansible.com/ansible/2.4/intro_inventory.html)]. 


```
# Red virtual
azure.virtual_network_name = "redH5"
```

Por último, se crea la red virtual privada `redH5` para que las máquinas virtuales se puedan comunicar a través de ella.

## Creación, provisionamiento y despliegue

Como se anticipó anteriormente se crean las variables de entorno `AZURE_TENANT_ID`, `AZURE_CLIENT_ID` y `AZURE_CLIENT_SECRET` con los valores de `tenant`, `appId` y `password`, respectivamente, devueltos al ejecutar el comando `az ad sp create-for-rbac`. Además también se añade la variable de entorno `AZURE_SUBSCRIPTION_ID` especificando la subcripción de azure, dicho Id se puede consultar ejecutando `az account list --query "[?isDefault].id" -o tsv` para obtener la subcripción de por defecto que tenemos activa en ese momento.

Como varios compañeros recomendarón por el grupo se utiliza la opción `--no-parralel`:
```console
$ vagrant up --provider=azure --no-parallel
```

Dicha opción evita que las máquinas se generen en paralelo, lo que suele provocar errores, creándose por tanto de forma secuencial. [[6](https://www.vagrantup.com/docs/cli/up.html)]


Inicialmente se crea y provisiona la máquina virtual que contendrá la aplicación.

<p align="center">
<img src="https://github.com/MarAl15/ProyectoCC/blob/master/docs/images/vagrant-app.png" weight="450">
</p>

A continuación se crea y provisiona la máquina virtual que contendrá la base de datos relacionada.

<p align="center">
<img src="https://github.com/MarAl15/ProyectoCC/blob/master/docs/images/vagrant-db.png" weight="600">
</p>


Entramos a la máquina virtual que va a contener la base de datos:
```console
$ vagrant ssh db
```

Para poder acceder a la base de datos remótamente debemos editar el fichero `/etc/mongod.conf` modificando el campo `bind_ip` por la IP interna (como se nos recomienda en [esta página](https://carlosazaustre.es/como-conectarte-remotamente-a-tu-base-de-datos-mongodb/)), en este caso, `10.0.0.5`. Este valor se puede consultar a través de Azure accediendo al recurso `redH5`. Y posteriomente reiniciamos mongo para que se puedan aplicar los cambios:
```console
$ sudo service mongod restart
```

Entramos en la máquina virtual que contiene nuestro proyecto y lo desplegamos especificando que la ip de mongo es ahora `10.0.0.5` [[7](https://www.twilio.com/blog/working-with-environment-variables-in-node-js-html)]:
```console
$ vagrant ssh app
usuario@calendar:~$ cd ProyectoCC/
usuario@calendar:~$ sudo IP_MONGO="10.0.0.5" npm start
```

Por último, verificamos que todo se ha realizado correctamente:

<p align="center">
<img src="https://github.com/MarAl15/ProyectoCC/blob/master/docs/images/h5-comprobacion.png" weight="450">
</p>

<p align="center">
<img src="https://github.com/MarAl15/ProyectoCC/blob/master/docs/images/h5-comprobacionDB.png" weight="400">
</p>

## Avance y modificaciones

Se ha añadido una función de comprobación de la validez de la fecha utilizando el paquete `moment`, además de verificar que la fecha introducida es posterior al día actual ya que en un calendario no tiene sentido introducir nuevos acontecimientos anteriores.

A continuación se muestra la función implementada en el fichero `ComprobarFecha.js`:
```node
exports.comprobarFecha = function(dia, mes, anio){
	var hoy = new Date(),
		mesM = mes-1; // 0-Enero, 1-Febrero,... , 11-Diciembre
	
	// Día real
	if(moment([anio, mesM, dia]).isValid()){
		// Fecha posterior a la actual
		if(anio > hoy.getFullYear())
			return true;
		else if(anio == hoy.getFullYear()){
			if(mesM > hoy.getMonth())
				return true;
			else if(mesM == hoy.getMonth() && dia >= hoy.getDate()){
				return true;
			}
		}
	}

	return false;
}
```

Cabe notar tanto en `moment` como `Date` se representan los meses con valores enteros de 0 (Enero) a 11 (Diciembre). [[8](https://momentjs.com/docs/), [9](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Date), [10](https://desarrolloweb.com/articulos/mostrar-fecha-actual-javascript.html)] 

Dicha función se ha empleado para verificar la fecha antes de insertarla el acontecimiento en la base de datos o modificar la fecha de uno ya existente. Además se ha añadido un test de verificación de dicha función en [testFecha.js](https://github.com/MarAl15/ProyectoCC/blob/master/test/testFecha.js).

También se ha modificado la URL de la conexión a MongoDB para que podamos acceder desde otra máquina virtual utilizando para ello una variable de entorno.

```node
var ip_mongodb = process.env.IP_MONGO || 'localhost';

var url = 'mongodb://'+ip_mongodb+'/acontecimientodb';
``` 

## Otras referencias

- [GitHub oficial de Azure](https://github.com/Azure/vagrant-azure)

- [Tema "Gestión de infraestructuras virtuales"](http://jj.github.io/CC/documentos/temas/Orquestacion)

- [Usa Vagrant con Microsoft Azure](https://www.returngis.net/2015/11/usa-vagrant-con-microsoft-azure/)

- [Gestionando máquinas virtuales con Vagrant](https://www.josedomingo.org/pledin/2013/09/gestionando-maquinas-virtuales-con-vagrant/)

