import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import React from 'react'
import { useSelector, useDispatch  } from 'react-redux';
import { informacionvistaAction } from '../../action/usuarioAction';


const ModalInformativo = (props) => {
  const {open, onClose, ...other} = props;
  const dispatch = useDispatch();
  const informacionvista = (id) =>dispatch(informacionvistaAction(id));
  
  const usuario = useSelector(state => state.auth.usuario);
  
  const handleClose = () => {
    // informacionvista(usuario?.id_usuario);
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
            <strong>FINAL DE LA POLLAFUTBOLERA.NET (FASE DE GRUPOS)</strong>
          </div>
        </DialogTitle>
        <DialogContent dividers>
            <Typography>
            Estimados y estimadas, como están estipuladas las reglas, 
            la polla <strong style={{backgroundColor: '#C8EDF3'}}>finaliza con el último partido de la fecha 3 </strong>, 
            los tres participantes que más puntos obtengan serán los ganadores;
            </Typography>
            <Typography>
            Estamos muy agradecidos con su participación, felicidades al ganador o ganadora y 
            los que no ganaron no me queda más que desearle mucha suerte para la próxima polla.
            </Typography>
            {/* <Typography>
            A pedido de la mayoría de ustedes me solicitaron realizar otra <strong style={{backgroundColor: '#C8EDF3'}}>polla con los partidos de la 
            fase final del mundial con un valor de 20.000 pesos </strong>para quien quiera ser parte nuevamente 
            comunicarse con al WhatsApp +54 1127492450 (Jefferson Saurith)  o +57 3023015168 (Kevin Florez).
            <strong style={{backgroundColor: '#C8EDF3'}}>Las reglas se van a especificar el viernes por la noche. 
            (está vez el empate suma puntos y en caso de penales sumaran puntos si eligen al equipo ganador.)</strong>
            </Typography> */}
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
