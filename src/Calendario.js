"use strict";

/* 
  Definición de la clase Calendario: 
    var calendario = new Calendario();
    	-> Contiene una lista de tareas
*/
var tarea = require("./Tarea.js");

exports.Calendario = function(acontecimiento, dia, hora){
	this.tareas = new Array; 
	
	//métodos
	this.getCalendario = getCalendario;
	this.getTarea = getTarea;
	this.setTarea = setTarea;
	this.deleteTarea = deleteTarea;
	this.editTarea = editTarea;
}

// Devuelve todas las tareas
function getCalendario(){
    return tareas;
}

// Devuelve la tarea que está en la posición i
function getTarea(i){
    return tareas[i];
}

// Agregar una tarea
function setTarea(acontemiento, dia, hora){
	var nueva_tarea = tarea.Tarea(acontemiento, dia, hora);
	tareas.push(nueva_tarea);
}



