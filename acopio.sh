#!/bin/bash

# Creación del grupo de recursos
echo "Creando el grupo de recursos..."
az group create -l francecentral -n CCGroupH4

# Creación de la máquina virtual
echo "Creando la MV Ubuntu18H4..."
az vm create --name Ubuntu18H4 --image Canonical:UbuntuServer:18.04-LTS:18.04.201901140 --resource-group CCGroupH4 --admin-username usuario --size Standard_B1s --ssh-key-value ~/.ssh/id_rsa.pub --public-ip-address-allocation static

# Habilitación del puerto 80
echo "Abriendo el puerto 80..."
az vm open-port -g CCGroupH4 -n Ubuntu18H4 --port 80
