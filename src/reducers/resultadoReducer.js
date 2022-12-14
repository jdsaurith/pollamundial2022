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
    OBTENER_PUNTOS_FECHA_ERROR,
    OBTENER_POSICIONES_FINALES,
    OBTENER_POSICIONES_FINALES_EXITO,
    OBTENER_POSICIONES_FINALES_ERROR,
    OBTENER_DETALLES_POSICIONES_FINALES,
    OBTENER_DETALLES_POSICIONES_FINALES_EXITO,
    OBTENER_DETALLES_POSICIONES_FINALES_ERROR,
    CONSULTAR_RECAUDO,
    CONSULTAR_RECAUDO_EXITO,
    CONSULTAR_RECAUDO_ERROR,
    OBTENER_EQUIPOS,
    OBTENER_EQUIPOS_EXITO,
    OBTENER_EQUIPOS_ERROR,
    AGREGAR_PODIO,
    AGREGAR_PODIO_EXITO,
    AGREGAR_PODIO_ERROR,
    OBTENER_PODIO,
    OBTENER_PODIO_EXITO,
    OBTENER_PODIO_ERROR,
    OBTENER_EQUIPOS_FASES_FINALES,
    OBTENER_EQUIPOS_FASES_FINALES_EXITO,
    OBTENER_EQUIPOS_FASES_FINALES_ERROR,
    AGREGAR_PARTIDOS_FINALES,
    AGREGAR_PARTIDOS_FINALES_EXITO,
    AGREGAR_PARTIDOS_FINALES_ERROR,
    LIMPIAR_PODIO
} from '../types'

const initialState = {
    resultadosfecha: [],
    resultados: [],
    resultadoapostador: [],
    obtenerpartidos: [],
    resultadosapostados: [],
    resultadosfifa: [],
    posiciones: [],
    posicionesfinales: [],
    detallesposiciones: [],
    detallesposicionesfinales: [],
    puntosfechas: [],
    equiposlist: [],
    podio: [],
    equiposfinalistas: [],
    podioequipos: [],
    consultarresultados: false,
    recaudo: 0,
    resultado: null,
    resultadoapuesta: false,
    loading: null,
    error: null,
}

const resultadoReducer = (state = initialState, action) =>{
    switch (action.type) {
        case AGREGAR_PARTIDOS_FINALES:
        case OBTENER_EQUIPOS_FASES_FINALES:
        case OBTENER_PODIO:
        case AGREGAR_PODIO:
        case OBTENER_EQUIPOS:
        case CONSULTAR_RECAUDO:
        case OBTENER_DETALLES_POSICIONES_FINALES:
        case OBTENER_POSICIONES_FINALES:
        case OBTENER_PUNTOS_FECHA:
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
        case LIMPIAR_PODIO:
            return{
                ...state,
                podioequipos: []
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
        case LIMPIAR_DETALLE_APUESTA:
            return{
                ...state,
                detallesposiciones: [],
                detallesposicionesfinales: []
            }
        case OBTENER_PUNTOS_FECHA_EXITO:
            return{
                ...state,
                loading: false,
                error: false,
                puntosfechas: action.payload
            }
        case OBTENER_POSICIONES_FINALES_EXITO:{
            return{
                ...state,
                loading: false,
                error: null,
                posicionesfinales: action.payload
            }
        }
        case OBTENER_DETALLES_POSICIONES_FINALES_EXITO:
            return{
                ...state,
                loading: false,
                error: null,
                detallesposicionesfinales: action.payload
            }
        case CONSULTAR_RECAUDO_EXITO:{
            return{
                ...state,
                loading: false,
                error: null,
                recaudo: action.payload
            }
        }
        case OBTENER_EQUIPOS_EXITO:
            return{
                ...state,
                loading: false,
                error: null,
                equiposlist: action.payload
            }
        case AGREGAR_PODIO_EXITO:
            return{
                ...state,
                loading: false,
                error: null,
                podio: action.payload
            }
        case OBTENER_PODIO_EXITO:
            return{
                ...state,
                loading: false,
                error: null,
                podioequipos: action.payload
            }
        case OBTENER_EQUIPOS_FASES_FINALES_EXITO:
            return{
                ...state,
                loading: false,
                error: null,
                equiposfinalistas: action.payload
            }
        case AGREGAR_PARTIDOS_FINALES_EXITO:
            return{
                ...state,
                loading: false,
                error: null
            }

        case AGREGAR_PARTIDOS_FINALES_ERROR:
        case OBTENER_EQUIPOS_FASES_FINALES_ERROR:
        case OBTENER_PODIO_ERROR:
        case AGREGAR_PODIO_ERROR:
        case OBTENER_EQUIPOS_ERROR:
        case CONSULTAR_RECAUDO_ERROR:
        case OBTENER_DETALLES_POSICIONES_FINALES_ERROR:
        case OBTENER_POSICIONES_FINALES_ERROR:
        case OBTENER_PUNTOS_FECHA_ERROR:
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