var Reserva = function (horario, cantidaPersonas, precioPersona, codigoDescuento, ) {
    this.horario = horario;
    this.cantidaPersonas = cantidaPersonas;
    this.precioPersona = precioPersona;
    this.codigoDescuento = codigoDescuento;

}

Reserva.prototype.precioReservaBase = function () {
    var precioBase = this.cantidaPersonas * this.precioPersona;
    return precioBase;
}

Reserva.prototype.descuentosPorGruposGrandes = function () {
    let precioBase = this.precioReservaBase()
    if (this.cantidaPersonas >= 4 && this.cantidaPersonas <= 6) {
        return precioBase * 0.05;

    } else if (this.cantidaPersonas >= 7 && this.cantidaPersonas <= 8) {
        return precioBase * 0.10;
    }
    else if (this.cantidaPersonas > 8) {
        return precioBase * 0.15;
    }
    else {
        return 0;
    }
}

Reserva.prototype.descuentosPorCodigos = function () {
    let precioBase = this.precioReservaBase()
    if (this.codigoDescuento == "DES15") {
        return precioBase * 0.15;

    } else if (this.codigoDescuento == "DES200") {
        return 200;

    } else if (this.codigoDescuento == "DES1") {
        return this.precioPersona;

    } else {
        return 0;
    }
}

Reserva.prototype.precioTotalReserva = function () {
    var basePrecioFinal = this.precioReservaBase() + this.adicionales - this.descuentos
    result = basePrecioFinal;
}

Reserva.prototype.adicionalesPorSemana = function () {
    let precioBase = this.precioReservaBase()
    const arraysSemana = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
    const diaSemana = this.horario.getDay();
    if (arraysSemana[diaSemana] == "Viernes" || arraysSemana[diaSemana] == "Sabado" || arraysSemana[diaSemana] == "Domingo") {
        return precioBase * 0.10;
    }
}

Reserva.prototype.adicionalesPorHorarios = function(){
    let precioBase = this.precioReservaBase()
    const horaAdicionales = [13 , 14 , 20, 21];
    const horas = this.horario.getUTCHours();
    if(horaAdicionales == horas || horaAdicionales == horas || horaAdicionales == horas || horaAdicionales == horas){
        return precioBase * 0.05
    }
}