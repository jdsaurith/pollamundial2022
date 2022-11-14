export const  formatearFecha = fecha =>{
    const fechaNueva = new Date(fecha)

    const opciones = {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: 'numeric',
        minute: 'numeric'
        

    }

    return fechaNueva.toLocaleDateString('es-ES', opciones)
}

export const  formatearFechaValidacion = fecha =>{
    const fechaNueva = new Date(fecha)

    const opciones = {
        year: 'numeric',
        month: 'numeric',
        day: '2-digit',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'   

    }

    return fechaNueva.toLocaleDateString('es-ES', opciones)
}

export const  formatearFechaDoshoras = (fecha, hora) =>{
    // console.log(fecha - (hora * 60) * 60000);
    // var numberOfMlSeconds = fecha.getTime();
    // var addMlSeconds = (hora * 60) * 60000;
    // var newDateObj = new Date(numberOfMlSeconds - addMlSeconds);
    var newDate = new Date(fecha - (hora * 60) * 60000);
 
    // return newDateObj;
    return newDate;
}

export const formatearDinero = cantidad =>{
    return cantidad.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    })
}