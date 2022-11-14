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
    EDITAR_USUARIO_ERROR
} from '../types';

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
        console.log(c.pais);
         const res = await clienteAxios.put('/usuarios',c);
        //  console.log(res.data);
         if(res.data.msg === 'actualizado'){
             dispatch(editarUsuarioExito(c));
             Swal.fire({
                 icon: 'success',
                 title: 'El usuario se actualizo correctamente!',
                 showConfirmButton: false,
                 timer: 1500
             })
             //refrescar los datos
         dispatch(verUsuariosAction(c.pais));
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