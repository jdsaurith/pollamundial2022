import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import React from 'react'
import { useSelector, useDispatch  } from 'react-redux';
import { informacionvistaAction } from '../../action/usuarioAction';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ModalInformativo = (props) => {
  const {open, onClose, ...other} = props;
  const dispatch = useDispatch();
  const informacionvista = (id) =>dispatch(informacionvistaAction(id));
  
  const usuario = useSelector(state => state.auth.usuario);
  
  const handleClose = () => {
    informacionvista(usuario?.id_usuario);
    onClose(false);
  }



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
            <strong>NUEVA FUNCIONALIDAD</strong>
          </div>
        </DialogTitle>
        <DialogContent dividers>
            <Typography>
             Ya puedes ver la final soñada o podio de tus rivales. <br />
            </Typography>            
            <Typography>
              En la tabla Posiciones Finales encontraras un nuevo icono en forma de trofeo   
              <FontAwesomeIcon
              style={{
                margin:  '0 5px'
              }}
              icon={faTrophy}/>, dale click y veras la final soñada del usuario.
            </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="primary">
            Ok
          </Button>
        </DialogActions>

    </Dialog>
  )
}

export default ModalInformativo
