# Comprobación de aprovisionamiento al compañero Adrián de la Torre Rodríguez

Se ha realizado la comprobación del funcionamiento del _playbook_ de provisionamiento del compañero [Adrián de la Torre Rodríguez](https://github.com/adritake).

Siguiendo los pasos que nos explica en [este documento](https://github.com/adritake/CC_UGR_Personal/blob/master/docs/Provision.md) se ha procedido primero a crear y configurar una máquina en Azure con Ubuntu Server 18.04 LTS, tamaño Básico A0, apertura de los puertos de entrada 80 (HTTP) y 22(SSH), y disco HDD Estándar.

Posteriormente se ha modificado el archivo */etc/ansible/hosts*:
```
[webservers]
MIMV ansible_host=40.122.73.132
```

Ejecutando desde nuestro sistema su _playbook_ obtenemos:

<p align="center">
<img src="https://github.com/MarAl15/ProyectoCC/blob/master/docs/images/provisionamiento-adritake.png" height="600">
</p>

Y accediendo a la dirección IP de la máquina virtual creada en Azure desde el navegador verificamos el despliegue correcto de la aplicación:

<p align="center">
<img src="https://github.com/MarAl15/ProyectoCC/blob/master/docs/images/comprobacion-adritake.png" weight="450">
</p>

