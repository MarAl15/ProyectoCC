"use strict";

/* 
  Definición de la clase Tarea: 
    var esta_tarea = new Tarea(acontecimiento,dia,hora);
    	`acontecimiento` = acontecimiento relacionado con la tarea.
		`dia` = día que tiene lugar.
		`hora` = hora a la que se prevé que empiece.
*/

exports.Tarea = function(acontecimiento, dia, hora){
	this.acontecimiento = acontecimiento;
	this.dia = dia;
	this.hora = hora;
	
	//métodos
	this.vars = vars;
	this.getAcontecimiento = getAcontecimiento;
	this.getDia = getDia;
	this.getHora = getHora;
	this.setAcontecimiento = setAcontecimiento;
	this.setDia = setDia;
	this.setHora = setHora;
}

// Devuelve las variables de instancia
function vars(){
    return ['acontecimiento', 'dia', 'hora'];
}

// Devuelve el acotecimiento relacionado con la tarea
function getAcontecimiento(){
	return this.acontecimiento;
}

// Devuelve el dia que tiene lugar la tarea
function getDia(){
	return this.dia;
}

// Devuelve la hora a la que se tiene previsto que empiece
function getHora(){
	return this.hora;
}

// Modificación del acontemiento
function setAcontecimiento(acontecimiento){
	this.acontecimiento = acontecimiento;
}

// Modificación del día
function setDia(dia){
	this.dia = dia;
}

// Modificación de la hora
function setHora(hora){
	this.hora = hora;
}
