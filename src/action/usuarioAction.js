import {
    VER_USUARIOS,
    VER_USUARIOS_EXITO,
    VER_USUARIOS_ERROR,
    USUARIO_EDITAR,
    GUARDAR_USUARIO_EDITAR,
    GUARDAR_USUARIO,
    GUARDAR_USUARIO_EXITO,
    GUARDAR_USUARIO_ERROR,
    EDITAR_USUARIO_EXITO,
    EDITAR_USUARIO_ERROR,
    EDITAR_PAGO_USUARIO_EXITO,
    EDITAR_PAGO_USUARIO_ERROR,
    HABILITAR_PERFIL,
    DESHABILITAR_PERFIL,
    OBTENER_PUNTOS_TORNEO,
    OBTENER_PUNTOS_TORNEO_EXITO,
    OBTENER_PUNTOS_TORNEO_ERROR,
    IMFORMACION_VISTA
} from '../types';

import { obtenerposicionesAction } from './resultadoAction';
import { actualizarUsuarioColombia } from './authAction';

import clienteAxios from '../config/axios';
//////diseño de alerta
import Swal from 'sweetalert2'

/////traer usuarios de la DB
export function verUsuariosAction(id){
    return async (dispatch) => {
        dispatch(verusuarios());
        try {
            // console.log(id);
            const res = await clienteAxios.get(`/usuarios/${id}`);
            // console.log(res.data);
            if(res.data.msg !== 'noregistros'){
                dispatch(verusuariosExito(res.data));
            }            
        } catch (error) {
            console.log(error);
            dispatch(verusuariosError());
        }
    }
}
const verusuarios = () =>({
    type: VER_USUARIOS
});
const verusuariosExito = (usuarios) =>({
    type: VER_USUARIOS_EXITO,
    payload: usuarios
});
const verusuariosError = () =>({
    type: VER_USUARIOS_ERROR
});

//////funcion action para guardar cliente a editar
export function guardaUsuarioEditarAction (c){
    return dispatch =>{
        // console.log(c);
        dispatch(usuarioEditar());
        dispatch(guardaUsuarioEditar(c));
    }
}
const usuarioEditar = () =>({
    type: USUARIO_EDITAR
})
const guardaUsuarioEditar = (c) =>({
    type: GUARDAR_USUARIO_EDITAR,
    payload: c
});

//////funcion para editar los datos del cliente
export function editarUsuarioAction(c){
    return async dispatch =>{
        dispatch(usuarioEditar());
     try {
        // console.log(c);
        const res = await clienteAxios.put('/usuarios',c);
        //  console.log(res.data);
        if(res.data.msg === 'actualizado'){
            // console.log(res.data.user);
            dispatch(editarUsuarioExito(res.data.user));
            Swal.fire({
                icon: 'success',
                title: 'El usuario se actualizo correctamente!',
                showConfirmButton: false,
                timer: 1500
            })
            //refrescar los datos
            if(c.tipousuario === 'COLOMBIA'){
            dispatch(actualizarUsuarioColombia(res.data.user));
            }else{                
            dispatch(verUsuariosAction(c.pais));
            }
        }
 
     } catch (error) {
         console.log(error);
         dispatch(editarUsuarioError());
         //error del lado servidor
         Swal.fire({
             icon: 'error',
             title: 'Hubo un Error',
             text: 'Hubo un error, Intenta de nuevo',
             showConfirmButton: true
             //timer: 1500
         })
     }
    }
 }
 const editarUsuarioExito = (c) =>({
     type: EDITAR_USUARIO_EXITO,
     payload: c
 });
 const editarUsuarioError = () =>({
     type: EDITAR_USUARIO_ERROR
 });

 //////funcion para editar los datos del cliente
export function EditarPagoUsuarioAction(c){
    return async dispatch =>{
        // dispatch(EditarPagoUsuario());
     try {
        // console.log(c);
         const res = await clienteAxios.put('/usuarios/pago',c);
        //  console.log(res.data);
         if(res.data.msg === 'actualizado'){
             dispatch(EditarPagoUsuarioExito());
             Swal.fire({
                 icon: 'success',
                 title: 'El usuario se actualizo correctamente!',
                 showConfirmButton: false,
                 timer: 1500
             })
             //refrescar los datos
         dispatch(verUsuariosAction('COL'));
        }
 
     } catch (error) {
         console.log(error);
         dispatch(EditarPagoUsuarioError());
         //error del lado servidor
         Swal.fire({
             icon: 'error',
             title: 'Hubo un Error',
             text: 'Hubo un error, Intenta de nuevo',
             showConfirmButton: true
             //timer: 1500
         })
     }
    }
 }
 const EditarPagoUsuarioExito = (c) =>({
     type: EDITAR_PAGO_USUARIO_EXITO,
 });
 const EditarPagoUsuarioError = () =>({
     type: EDITAR_PAGO_USUARIO_ERROR
 });

/////funcion para agregar nuevo cliente
export function agregarUsuarioAction(c){
    return async dispatch =>{
        dispatch(guardarUsuario());
        try {
            const res = await clienteAxios.post('/usuarios', c);
            // console.log(res.data);
            if(res.data.msg === 'guardado'){
                dispatch(guardarUsuarioExito(c));
                Swal.fire({
                    icon: 'success',
                    title: 'El Usuario se guardo correctamente!',
                    showConfirmButton: false,
                    timer: 1500
                })
                //refrescar los datos
                dispatch(verUsuariosAction(c.pais));
                dispatch(obtenerposicionesAction());
            }
            if(res.data.msg === "existe"){
                Swal.fire({
                    icon: 'error',
                    title: 'El Usuario ya EXISTE!',
                    showConfirmButton: true,
                    //timer: 1500
                })
            }
        } catch (error) {
            console.log(error);
            dispatch(guardarUsuarioError());
            //error del lado servidor
            Swal.fire({
                icon: 'error',
                title: 'Hubo un Error',
                text: 'Hubo un error, Intenta de nuevo',
                showConfirmButton: true
                //timer: 1500
            })
        }
    }
}
const guardarUsuario = ()=>({
    type: GUARDAR_USUARIO
})
const guardarUsuarioExito = (c) =>({
    type: GUARDAR_USUARIO_EXITO,
    payload: c
})
const guardarUsuarioError = () =>({
    type: GUARDAR_USUARIO_ERROR
})

/////habilitar el perfil
export function habilitarPerfilAction(){
    return dispatch=>{
        dispatch(habilitarPerfil());
    }
}

const habilitarPerfil = () =>({
    type: HABILITAR_PERFIL
})
/////desabilitar el perfil
export function desahabilitarPerfilAction(){
    return dispatch=>{
        dispatch(desahabilitarPerfil());
    }
}

const desahabilitarPerfil = () =>({
    type: DESHABILITAR_PERFIL
})


////funcion para obtener los puntos del usuario en el torneo
export function obtenerPuntosTorneoAction(id){
    return async dispatch =>{
        dispatch(obtenerPuntos());
        try {
            const res = await clienteAxios.get(`/usuarios/puntostorneo/${id}`);
            // console.log(res.data);
            if(res.data.msg === 'exito'){
                dispatch(obtenerPuntosExito(res.data.result));
            }
            
        } catch (error) {
            console.log(error);
            dispatch(obtenerPuntosError());
            //error del lado servidor
            Swal.fire({
                icon: 'error',
                title: 'Hubo un Error',
                text: 'Hubo un error, Intenta de nuevo',
                showConfirmButton: true
                //timer: 1500
            })
        }
    }
}
const obtenerPuntos = ()=>({
    type: OBTENER_PUNTOS_TORNEO
})
const obtenerPuntosExito = (c) =>({
    type: OBTENER_PUNTOS_TORNEO_EXITO,
    payload: c
})
const obtenerPuntosError = () =>({
    type: OBTENER_PUNTOS_TORNEO_ERROR
})

/////true informacion vista el usuario
/////desabilitar el perfil
export function informacionvistaAction(id_usuario){
    return async dispatch=>{
        try {
            const result = await clienteAxios.put(`/usuarios/info/${id_usuario}`);
            console.log(result.data);
            if(result.data.msg === 'actualizado'){
                dispatch(informacionVista());
            }else{
                console.log('no actualizo la publicidad');
            }
            
        } catch (error) {
            console.log(error);
        }
        
    }
}

const informacionVista = () =>({
    type: IMFORMACION_VISTA
})