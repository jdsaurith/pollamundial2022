import {
    RESULTADO_PARTIDOS,
    RESULTADO_PARTIDOS_EXITO,
    RESULTADO_PARTIDOS_ERROR,
    RESULTADO_APUESTA,
    RESULTADO_APUESTA_EXITO,
    GUARDAR_RESULTADO_APOSTADOR,
    OBTENER_PARTIDOS,
    OBTENER_PARTIDOS_EXITO,
    OBTENER_PARTIDOS_ERROR,
    OBTENER_RESULTADOS,
    OBTENER_RESULTADOS_EXITO,
    OBTENER_RESULTADOS_ERROR,
    OBTENER_RESULTADOS_FIFA,
    OBTENER_RESULTADOS_FIFA_EXITO,
    OBTENER_RESULTADOS_FIFA_ERROR,
    ENVIAR_RESULTADOS_FIFA,
    ENVIAR_RESULTADOS_FIFA_EXITO,
    ENVIAR_RESULTADOS_FIFA_ERROR,
    OBTENER_POSICIONES,
    OBTENER_POSICIONES_EXITO,
    OBTENER_POSICIONES_ERROR,
    OBTENER_DETALLES_POSICIONES,
    OBTENER_DETALLES_POSICIONES_EXITO,
    OBTENER_DETALLES_POSICIONES_ERROR,
    LIMPIAR_DETALLE_APUESTA,
    OBTENER_PUNTOS_FECHA,
    OBTENER_PUNTOS_FECHA_EXITO,
    OBTENER_PUNTOS_FECHA_ERROR
} from '../types';

import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

export function resultadopartidosAction(result){
    return async (dispatch) =>{
        dispatch(resultadopartidos());
        try {
            // console.log(result);
            if(!result){
                Swal.fire({
                    icon: 'info',
                    title: 'Ingresa tu pronóstico',
                    text: 'Debes ingresar por lo menos un resultado',
                    showConfirmButton: true
                    //timer: 1500
                })
            }else{
                const res = await clienteAxios.post('/resultados',result);
                // console.log(res.data);
                if(res.data.msg === 'exito'){                
                    Swal.fire({
                        icon: 'success',
                        title: 'El o los Partidos se guardaron correctamente!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    dispatch(obtenerPartidosAction());                
                    dispatch(resultadopartidosExito());
                } else if(res.data.msg === 'noexito'){
                    Swal.fire({
                        icon: 'error',
                        title: 'Hubo un Error',
                        text: 'Intenta de nuevo o comunicate con el ADMIN.',
                        showConfirmButton: true
                        //timer: 1500
                    })
                } 
            }
                     
            
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Hubo un Error',
                text: 'Intenta de nuevo o comunicate con el ADMIN.',
                showConfirmButton: true
                //timer: 1500
            })
            dispatch(resultadopartidosError());
        }
    }
    
}
const resultadopartidos = () => ({
    type: RESULTADO_PARTIDOS
})
const resultadopartidosExito = () => ({
    type: RESULTADO_PARTIDOS_EXITO,
    // payload: res
})
const resultadopartidosError = () => ({
    type: RESULTADO_PARTIDOS_ERROR
})

////obtener resultados agregados por el usuario
export function obtenerResultadosAction(id){
    return async (dispatch) =>{
        dispatch(obtenerresultados());
        try {            
            const res = await clienteAxios.get(`/resultados/${id}`);
            // console.log(res.data);
            if(res.data.msg === 'exito'){                
                dispatch(obtenerresultadosExito(res.data.result));
            }else if(res.data.msg === 'noregistros'){
                dispatch(obtenerresultadosExito([]));
            }
            
        } catch (error) {
            console.log(error);            
            dispatch(obtenerresultadosError());
        }
    }
    
}
const obtenerresultados = () => ({
    type: OBTENER_RESULTADOS
})
const obtenerresultadosExito = (res) => ({
    type: OBTENER_RESULTADOS_EXITO,
    payload: res
})
const obtenerresultadosError = () => ({
    type: OBTENER_RESULTADOS_ERROR
})

export function obtenerPartidosAction(){
    return async (dispatch) =>{
        dispatch(obtenerPartidos());
        try {
            
            const res = await clienteAxios.get('/resultados/partidos');
            // console.log(res.data);
            if(res.data.msg === 'exito'){
                dispatch(obtenerPartidosExito(res.data.result));
            }
            
        } catch (error) {
            console.log(error);
            dispatch(obtenerPartidosError());
        }
    }
    
}
const obtenerPartidos = () => ({
    type: OBTENER_PARTIDOS
})
const obtenerPartidosExito = (res) => ({
    type: OBTENER_PARTIDOS_EXITO,
    payload: res
})
const obtenerPartidosError = () => ({
    type: OBTENER_PARTIDOS_ERROR
})

////OBTENER LOS RESULTADOS DE LOS PARTIDOS FIFA
export function obtenerResultadosFifaAction(){
    return async (dispatch) =>{
        dispatch(obtenerResultadosFifa());
        try {
            
            const res = await clienteAxios.get('/resultados/fifa');
            // console.log(res.data);
            if(res.data.msg === 'exito'){
                dispatch(obtenerResultadosFifaExito(res.data.result));
            }else if(res.data.msg === 'noregistros'){
                dispatch(obtenerResultadosFifaExito([]));
            }
            
        } catch (error) {
            console.log(error);
            dispatch(obtenerResultadosFifaError());
        }
    }
    
}
const obtenerResultadosFifa = () => ({
    type: OBTENER_RESULTADOS_FIFA
})
const obtenerResultadosFifaExito = (res) => ({
    type: OBTENER_RESULTADOS_FIFA_EXITO,
    payload: res
})
const obtenerResultadosFifaError = () => ({
    type: OBTENER_RESULTADOS_FIFA_ERROR
})

////obtener resultados agregados FIFA
export function resultadopartidosfifaAction(f){
    return async (dispatch) =>{
        dispatch(resultadopartidosfifa());
        try {
            // console.log(f);
            const res = await clienteAxios.put('/resultados/resultadosfifa',f);
            // console.log(res.data);
            if(res.data.msg === 'exito'){   
                Swal.fire({
                    icon: 'success',
                    title: 'Los Partidos se guardaron correctamente!',
                    showConfirmButton: false,
                    timer: 1500
                })             
                dispatch(resultadopartidosfifaExito());
                dispatch(obtenerPartidosAction());
            }else if(res.data.msg === 'noexito'){
                Swal.fire({
                    icon: 'error',
                    title: 'Hubo un Error',
                    text: 'Intenta de nuevo o comunicate con el ADMIN.',
                    showConfirmButton: true
                    //timer: 1500
                })
                dispatch(resultadopartidosfifaExito([]));
            }
            
        } catch (error) {
            console.log(error);            
            dispatch(resultadopartidosfifaError());
        }
    }
    
}
const resultadopartidosfifa = () => ({
    type: ENVIAR_RESULTADOS_FIFA
})
const resultadopartidosfifaExito = () => ({
    type: ENVIAR_RESULTADOS_FIFA_EXITO,
    // payload: res
})
const resultadopartidosfifaError = () => ({
    type: ENVIAR_RESULTADOS_FIFA_ERROR
})

////actualizar estado partido inactivo a enjuego
export function updateStatePartidoAction(id){
    return async (dispatch) =>{
        dispatch(resultadopartidosfifa());
        try {
            // console.log(id);
            const res = await clienteAxios.put(`/resultados/updatestate/${id}`);
            // console.log(res.data);
            if(res.data.msg === 'exito'){
                dispatch(resultadopartidosfifaExito());
                dispatch(obtenerPartidosAction());
            }else if(res.data.msg === 'noexito'){
                dispatch(resultadopartidosfifaExito([]));
            }

        } catch (error) {
            console.log(error);
            dispatch(resultadopartidosfifaError());
        }
    }
}

///obtener las posiciones de los usuarios
export function obtenerposicionesAction(){
    return async (dispatch) =>{
        dispatch(obtenerposiciones());
        try {
            
            const res = await clienteAxios.get('resultados/posiciones');
            // console.log(res.data);
            if(res.data.msg === 'exito'){                
                dispatch(obtenerposicionesExito(res.data.result));
            }else if(res.data.msg === 'noregistros'){
                dispatch(obtenerposicionesExito([]));
            }
            
        } catch (error) {
            console.log(error);            
            dispatch(obtenerposicionesError());
        }
    }
    
}
const obtenerposiciones = () => ({
    type: OBTENER_POSICIONES
})
const obtenerposicionesExito = (res) => ({
    type: OBTENER_POSICIONES_EXITO,
    payload: res
})
const obtenerposicionesError = () => ({
    type: OBTENER_POSICIONES_ERROR
})

///obtener las posiciones de los usuarios
export function obtenerdetallesposicionesAction(id){
    return async (dispatch) =>{
        dispatch(obtenerdetallesposiciones());
        try {
            
            const res = await clienteAxios.get(`resultados/detalles/${id}`);
            // console.log(res.data);
            if(res.data.msg === 'exito'){                
                dispatch(obtenerdetallesposicionesExito(res.data.result));
            }else if(res.data.msg === 'noregistros'){
                dispatch(obtenerdetallesposicionesExito([]));
            }
            
        } catch (error) {
            console.log(error);            
            dispatch(obtenerdetallesposicionesError());
        }
    }
    
}
const obtenerdetallesposiciones = () => ({
    type: OBTENER_DETALLES_POSICIONES
})
const obtenerdetallesposicionesExito = (res) => ({
    type: OBTENER_DETALLES_POSICIONES_EXITO,
    payload: res
})
const obtenerdetallesposicionesError = () => ({
    type: OBTENER_DETALLES_POSICIONES_ERROR
})

////limpiar datos de detalle apuesta
export function limpiarDetallePosicionAction(){
    return dispatch =>{
        dispatch(limpiarDetalle());
    }
}

const limpiarDetalle = () =>({
    type: LIMPIAR_DETALLE_APUESTA
})

////obtener puntos por fecha
///obtener las posiciones de los usuarios
export function obtenerPuntosFechaAction(datos){
    return async (dispatch) =>{
        dispatch(obtenerpuntosFecha());
        try {
            console.log(datos);
            const res = await clienteAxios.post('resultados/puntosfecha', datos);
            // console.log(res.data);
            if(res.data.msg === 'exito'){                
                dispatch(obtenerpuntosFechaExito(res.data.result));
            }else if(res.data.msg === 'noregistros'){
                dispatch(obtenerpuntosFechaExito([]));
            }
            
        } catch (error) {
            console.log(error);            
            dispatch(obtenerpuntosFechaError());
        }
    }
    
}
const obtenerpuntosFecha = () => ({
    type: OBTENER_PUNTOS_FECHA
})
const obtenerpuntosFechaExito = (res) => ({
    type: OBTENER_PUNTOS_FECHA_EXITO,
    payload: res
})
const obtenerpuntosFechaError = () => ({
    type: OBTENER_PUNTOS_FECHA_ERROR
})