import {
    INICIO_SESION,
    INICIO_SESION_EXITO,
    INICIO_SESION_ERROR,
    CERRAR_SESION,
    CERRAR_SESION_EXITO,
    USUARIO_AUTENTICADO,
    ACTIVO_AUTENTICADO,
    USUARIO_AUTENTICADO_EXITO,
    USUARIO_AUTENTICADO_ERROR,
} from '../types';


const initialState = {
    usuario: null,
    error: null,
    loading: false,
    autenticado: null,
    conectado: false,
    cargando: true,
    nombreuser: null,
    cedula: null,
    tipousuario: null
}
const authReducer = (state = initialState, action) =>{
// export default function (state = initialState, action){
    switch (action.type) {
        case USUARIO_AUTENTICADO:
        case INICIO_SESION:
            return{
                ...state,
                loading: true,
                error: null,
            }
        case INICIO_SESION_EXITO:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                loading: false,
                error: null,
                usuario: action.payload.result,
                tipousuario: action.payload.tipousuario,               
                conectado: true,
                cargando: false
            }
        case USUARIO_AUTENTICADO_EXITO:
            return{
                ...state,
                loading: false,
                error: null,
                conectado: true,
                cargando: false,
                usuario: action.payload,
            }
        case USUARIO_AUTENTICADO_ERROR:
        case CERRAR_SESION_EXITO:
            localStorage.removeItem('token');
            localStorage.removeItem('resultado');
            localStorage.removeItem('resultadofifa');
            return {
                ...state,
                loading: false,
                error: null,
                usuario: null,
                conectado: false,
                cargando: false,
            }
        case INICIO_SESION_ERROR:
        case CERRAR_SESION:
            localStorage.removeItem('token');
            return {
                ...state,
                error: true,
                loading: false,
                conectado: false,
                cargando: false,
            }
        default:
            return state;
    }
}

export default authReducer;