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
    ACTUALIZAR_PERMISOS_AUTH,
} from '../types';

import clienteAxios from '../config/axios';
import tokenAuth from '../config/tokenAuth'; 

//diseño de alerta
import Swal from 'sweetalert2'

//iniciar sesion
export function iniciarSesionAction (datos){
    return async(dispatch) =>{
        dispatch(iniciarSesion());
        try {
            const res = await clienteAxios.post('auth', datos);
            // console.log(res.data);
            //validacion de la base de datos
            if(res.data.msg === 'nousuario' || res.data.msg === 'passworderror'){
               //mensaje error con diseño
                Swal.fire({
                    icon: 'error',
                    title: 'Usuario o Password incorrecto!',
                    showConfirmButton: false,
                    timer: 2000
                })
                dispatch(iniciarSesionError());
            }else {
                dispatch(iniciarSesionExito(res.data));
            }

        } catch (error) {
            console.log(error);
            dispatch(iniciarSesionError());
        }
    }
}

const iniciarSesion = () =>({
    type: INICIO_SESION
});
const iniciarSesionExito = (usuario) => ({
    type: INICIO_SESION_EXITO,
    payload: usuario
});
const iniciarSesionError = () => ({
    type: INICIO_SESION_ERROR
});

///cerrar sesion
export function cerrarSesionAction (usuario){
    return async dispatch =>{
        dispatch(cerrarsesion());
        try {
            // const result = await clienteAxios.put(`auth/cerrarsesion/${usuario}`);
            // console.log(result.data.msg);
            dispatch(cerrarsesionExito());
        } catch (error) {
            console.log("Error al cerrar sesión");
        }
    }
}

const cerrarsesion = () =>({
    type: CERRAR_SESION
});
const cerrarsesionExito = () =>({
    type: CERRAR_SESION_EXITO
});

////usuario autenticado
//Retornar al usuario autenticado
export function usuarioAutenticadoAction(){
    return async (dispatch) =>{
        dispatch(usuarioautenticado());
        try {
            const token= localStorage.getItem('token');
            
            if(token !== "null"){
                tokenAuth(token);
                const result = await clienteAxios.get('auth');
                // console.log(result.data);
                dispatch(usuarioautenticadoexitoso(result.data));
                // dispatch(activoautenticadoexito(activo));
            }else{
                tokenAuth(false);
                dispatch(usuarioautenticadoerror());
            }
          
        } catch (error) {
            console.log(error);
            dispatch(usuarioautenticadoerror());
        }
    }
}

//usuario autenticado
const usuarioautenticado = ()=>({
    type: USUARIO_AUTENTICADO
})


//usuario autenticado con exito
const usuarioautenticadoexitoso = datos => ({
    type: USUARIO_AUTENTICADO_EXITO,
    payload: datos
});

//usuario autenticado error
const usuarioautenticadoerror = ()=> ({
    type: USUARIO_AUTENTICADO_ERROR
});