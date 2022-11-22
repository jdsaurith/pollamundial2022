import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import React from 'react'

const ModalInfoSave = (props) => {
  const {open, onClose, datos, ...other} = props;
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
            <strong>{ datos?.titulo }</strong>
          </div>
        </DialogTitle>
        <DialogContent dividers>
            <Typography>
                {
                    datos?.contenido
                }
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

export default ModalInfoSave
