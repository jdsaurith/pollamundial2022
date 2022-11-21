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

export const  formatearFechaModal = fecha =>{
    // console.log(fecha);
    const fechaNueva = new Date(fecha);
    
    const opciones = {
        year: 'numeric',
        month: 'numeric',
        day: '2-digit',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZone: 'UTC'

    }
// console.log(fecha)
// console.log(fecha.toLocaleString('es-ES', opciones))
// console.log(fechaNueva)
// console.log(fechaNueva.toLocaleString('es-ES', opciones))
    return fechaNueva.toLocaleDateString('es-ES', opciones)
}

export const  formatearFechaDoshoras = (fecha, hora) =>{
    
    var newDate = new Date(fecha - ((hora * 60) * 60000));
    
    return newDate;
}

export const formatearDinero = cantidad =>{
    return cantidad.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    })
}

// export const getRemainingTime = deadline => {
//     let now = new Date(),
//         remainTime = (new Date(deadline) - now + 1000) / 1000,
//         remainSeconds = ('0' + Math.floor(remainTime % 60)).slice(-2),
//         remainMinutes = ('0' + Math.floor(remainTime / 60 % 60)).slice(-2),
//         remainHours = ('0' + Math.floor(remainTime / 3600 % 24)).slice(-2),
//         remainDays = Math.floor(remainTime / (3600 * 24));
  
//     return {
//       remainSeconds,
//       remainMinutes,
//       remainHours,
//       remainDays,
//       remainTime
//     }
//   };