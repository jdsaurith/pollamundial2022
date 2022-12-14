import {
    VER_USUARIOS,
    VER_USUARIOS_EXITO,
    VER_USUARIOS_ERROR,
    USUARIO_EDITAR,
    GUARDAR_USUARIO_EDITAR,    
    EDITAR_USUARIO_EXITO,
    EDITAR_USUARIO_ERROR,
    GUARDAR_USUARIO,
    GUARDAR_USUARIO_EXITO,
    GUARDAR_USUARIO_ERROR,
    EDITAR_PAGO_USUARIO_EXITO,
    EDITAR_PAGO_USUARIO_ERROR,
    HABILITAR_PERFIL,
    DESHABILITAR_PERFIL,
    OBTENER_PUNTOS_TORNEO,
    OBTENER_PUNTOS_TORNEO_EXITO,
    OBTENER_PUNTOS_TORNEO_ERROR   
} from '../types';

const initialState = {
    usuario: null,
    usuarios: [],
    usuariosfiltro: [],
    usuarioseliminados: [],
    usuarioseliminadosfiltro: [],
    usuariosactivos: [],
    puntostorneo: [],
    habilitarperfil: null,
    usuarioeditar: null,
    usuarioeliminar: null,
    usuarioactivo: null,
    loading: null,
    error: null,
}

const usuarioReducer = (state = initialState, action) =>{
// export default function (state = initialState, action){
    switch (action.type){ 
        case OBTENER_PUNTOS_TORNEO:
        case GUARDAR_USUARIO:
        case USUARIO_EDITAR:
        case VER_USUARIOS:
            return {
                ...state,
               loading: true,
               error: null,
               usuarioeditar: null,
               usuarioactivo: null,
            }
        case VER_USUARIOS_EXITO:
            return{
                ...state,
                loading: false,
                error: null,
                usuarios: action.payload.result,
            }
        case GUARDAR_USUARIO_EDITAR:
            return{
                ...state,
                usuarioeditar: action.payload
            }        
        case GUARDAR_USUARIO_EXITO:
            return{
                ...state,
                loading: false,
                error: null,
                usuarios: [...state.usuarios, action.payload]
            }
        
        case EDITAR_USUARIO_EXITO:
            return{
                ...state,
                loading: false,
                error: null,
                usuarios: state.usuarios.map(c => c.id_usuario === action.payload.usuario
                   ? c = action.payload
                   : c),
                usuarioeditar: null
            }
        case HABILITAR_PERFIL:
            return{
                ...state,
                habilitarperfil: true
                
            }
        case DESHABILITAR_PERFIL:
            return{
                ...state,
                habilitarperfil: false
            }
        case OBTENER_PUNTOS_TORNEO_EXITO:
            return{
                ...state,
                loading: false,
                error: false,
                puntostorneo: action.payload
            }
        
        case OBTENER_PUNTOS_TORNEO_ERROR:
        case GUARDAR_USUARIO_ERROR:
        case EDITAR_USUARIO_ERROR:
        case VER_USUARIOS_ERROR:
            return{
                ...state,
                loading: false,
                error: true
            }
        default:
        return state;
    }
}

export default usuarioReducer;
