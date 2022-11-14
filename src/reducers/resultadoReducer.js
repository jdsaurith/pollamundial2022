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
    OBTENER_DETALLES_POSICIONES_ERROR
} from '../types'

const initialState = {
    resultadosfecha: [],
    resultados: [],
    resultadoapostador: [],
    obtenerpartidos: [],
    resultadosapostados: [],
    resultadosfifa: [],
    posiciones: [],
    detallesposiciones: [],
    consultarresultados: false,
    resultado: null,
    resultadoapuesta: false,
    loading: null,
    error: null,
}

const resultadoReducer = (state = initialState, action) =>{
    switch (action.type) {
        case OBTENER_DETALLES_POSICIONES:
        case OBTENER_POSICIONES:
        case ENVIAR_RESULTADOS_FIFA:
        case OBTENER_RESULTADOS_FIFA:
        case OBTENER_RESULTADOS:
        case OBTENER_PARTIDOS:
        case RESULTADO_PARTIDOS:
            return{
                ...state,
                loading: true,
                error: null,
                consultarresultados: false
            }
        case RESULTADO_PARTIDOS_EXITO:
            localStorage.removeItem('resultado');
            return{
                ...state,
                loading: false,
                error: null,
                consultarresultados: true
            }
        case RESULTADO_APUESTA:
            return{
                ...state,
                resultadoapuesta: false
            }
        case RESULTADO_APUESTA_EXITO:
            return{
                ...state,
                resultadoapuesta: true
            }
        case GUARDAR_RESULTADO_APOSTADOR:
            return{
                resultadoapostador: action.payload
            }
        case OBTENER_PARTIDOS_EXITO:
            return{
                ...state,
                loading: false,
                error: null,
                obtenerpartidos: action.payload
            }
        case OBTENER_RESULTADOS_EXITO:            
            return{
                ...state,
                loading: false,
                error: null,
                resultadosapostados: action.payload
            }
        case OBTENER_RESULTADOS_FIFA_EXITO:
            return{
                ...state,
                loading: false,
                error: null,
                resultadosfifa: action.payload
            }
        case ENVIAR_RESULTADOS_FIFA_EXITO:
            localStorage.removeItem('resultadofifa');
            return{
                ...state,
                loading: false,
                error: null,                
            }
        case OBTENER_POSICIONES_EXITO:
            return{
                ...state,
                loading: false,
                error: null,
                posiciones: action.payload
            }
        case OBTENER_DETALLES_POSICIONES_EXITO:
            return{
               ...state,
               loading: false,
               error: null,
               detallesposiciones: action.payload
            }

        case OBTENER_DETALLES_POSICIONES_ERROR:
        case OBTENER_POSICIONES_ERROR:
        case ENVIAR_RESULTADOS_FIFA_ERROR:
        case OBTENER_RESULTADOS_FIFA_ERROR:
        case OBTENER_RESULTADOS_ERROR:
        case OBTENER_PARTIDOS_ERROR:
        case RESULTADO_PARTIDOS_ERROR:
            return{
                ...state,
                loading: false,
                error: true
            }
        default:
            return state;
    }
}

export default resultadoReducer;