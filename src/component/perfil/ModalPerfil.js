import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, tableCellClasses, TableFooter, TableHead, TablePagination, TableRow, TextField } from '@mui/material';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'moment';
import Paginacion from '../layouts/Paginacion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCancel, faSave} from '@fortawesome/free-solid-svg-icons';
import { editarUsuarioAction } from '../../action/usuarioAction';


const ModalPerfil = (props) => {
  const {open, onClose, datos, ...other} = props;

  ///el que mando por props
  const {infousuario} = datos;

  const [error, guardarError] = useState(false);
  const [msgError, guardarMsgError] = useState('');
  const [usuarioeditar, setUsuarioeditar] = useState({
    nombres: '',
    usuario:'',
    password:''
  })

  const dispatch = useDispatch();
  const actualizarUsuario = (u) => dispatch(editarUsuarioAction(u));

  ///el que viene del reducer
  const useredit = useSelector(state => state.usuario.usuarioeditar);

  const { nombres, usuario, password } = usuarioeditar;
 
  useEffect(() => {
    if(infousuario){
      setUsuarioeditar({
        id_usuario: infousuario?.id_usuario,
        nombres: infousuario?.nombres,
        usuario: infousuario?.usuario,
        password: '',
        tipousuario: infousuario?.tipousuario,
        recaudado: infousuario?.recaudado,
        estado: infousuario?.estado
      })
    }
  }, [infousuario])

    //Leer los valores del formulario
    const handleChange = React.useCallback((e) => {
      setUsuarioeditar(
        {
          ...usuarioeditar,
          [e.currentTarget.name]: e.currentTarget.value
        },
        [usuarioeditar]
      );
      guardarError(false);
    });

  const guardarEditar = (usuarioeditar) =>{
    const pais = 'COL';
    if(usuarioeditar.usuario.trim() === '' || usuarioeditar.password.trim() === '' ){
      guardarError(true);
      guardarMsgError('El usuario y la password son obligatorios');
      return;
    }
    actualizarUsuario({usuarioeditar, pais});
    setUsuarioeditar({
      id_usuario: 0,
      nombres: '',
      usuario: '',
      password: '',
      tipousuario: '',
      recaudado: 0,
      estado: ''
    })
  }

  const handleClose = () => onClose(false);

  return (
    <Dialog
    disableBackdropClick
    disableEscapeKeyDown
    maxWidth="lg"
    aria-labelledby="confirmation-dialog-title"
    open={open}
    {...other}
    >
        <DialogTitle id="confirmation-dialog-title">
          <div style={{ textAlign: 'center', }}> 
          <Typography component="h1" variant="h5">
              {error ? (
              <Alert variant="filled" severity="error">
                  {msgError}
              </Alert>
              ) :
              <strong>ACTUALIZAR PERFIL</strong>
              }
          </Typography>
          </div>
        </DialogTitle>
        <DialogContent dividers>
          <Box component="form" sx={{ mt: 1 }}>
              <TextField
              disabled
              margin="normal"
              required
              fullWidth
              id="nombres"
              label="Nombres"
              name="nombres"
              value={nombres}
              onChange={handleChange}
              />
              <TextField
              autoFocus
              margin="normal"
              required
              fullWidth
              id="usuario"
              label="Usuario"
              name="usuario"
              value={usuario}
              onChange={handleChange}
              />
              <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              autoComplete="current-password"
              onChange={handleChange}
              />
          </Box>
        </DialogContent>
        <DialogActions>
        <Button
            onClick={()=>guardarEditar(usuarioeditar)}
            color="primary"
        >
          <FontAwesomeIcon
            style={{
              margin:  '1px',
              cursor: 'pointer'
            }}
            title="Guardar"
            name="guardar"
            icon={faSave}
            color="#363636"
            size="2x"
          />
          Guardar
        </Button>
          <Button 
            onClick={handleClose}
            color="primary">
            Cerrar
          </Button>
        </DialogActions>
    </Dialog>
  )
}

export default ModalPerfil

