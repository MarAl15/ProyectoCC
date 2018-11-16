"use strict";

/* 
  Definición de la clase GestionTareas: 
    var esta_tarea = new GestionTareas();
    	-> Lista de tareas
*/

var tarea = require("./Tarea.js");

exports.GestionTareas = function(){
	this.lista_tareas = new Array;
	
	//métodos
	this.pushTarea = pushTarea;
	this.getTareas = getTareas;
	this.getTarea = getTarea;
	this.getUltimaTarea = getUltimaTarea;
	this.editAcontecimiento = editAcontecimiento;
	this.editDia = editDia;
	this.editHora = editHora;
	this.deleteTarea = deleteTarea;
	this.numTareas = numTareas;
}

// Insertar una nueva tarea
function pushTarea(acontecimiento, dia, hora){
	var nueva_tarea = new tarea.Tarea(acontecimiento, dia, hora);
	this.lista_tareas.push(nueva_tarea)
}

// Devuelve la lista de tareas
function getTareas(){
	return this.lista_tareas;
}

// Devuelve la tarea en la posición id
function getTarea(id){
	return this.lista_tareas[id];
}

// Devuelve la última tarea de la tarea id
function getUltimaTarea(){
	return this.getTarea(this.lista_tareas.length-1);
}

// Modificación del acontemiento de la tarea id
function editAcontecimiento(id, acontecimiento){
	if( id < this.lista_tareas.length ){
		this.lista_tareas[id].setAcontecimiento(acontecimiento);
		return true;
	}
	else{
		return false;
	}
}

// Modificación del día de la tarea id
function editDia(id, dia){
	if( id < this.lista_tareas.length ){
		this.lista_tareas[id].setDia(dia);
		return true;
	}
	else{
		return false;
	}
}

// Modificación de la hora de la tarea id
function editHora(id, hora){
	if( id < this.lista_tareas.length ){
		this.lista_tareas[id].setHora(hora);
		return true;
	}
	else{
		return false;
	}
}

// Eliminación de la tarea id
function deleteTarea(id){
	if( id < this.lista_tareas.length ){
		this.lista_tareas.splice(id, 1);
		return true;
	}
	else{
		return false;
	}
}

// Número de tareas
function numTareas(){
	return this.lista_tareas.length;
}

