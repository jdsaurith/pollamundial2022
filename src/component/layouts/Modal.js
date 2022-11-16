import React, { useEffect } from 'react'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, tableCellClasses, TableHead, TableRow } from '@mui/material';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';

import { obtenerdetallesposicionesAction } from '../../action/resultadoAction';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#006db3',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
}));

const Modal = (props) => {
  const {open, onClose, datos, ...other} = props;
  const dispatch = useDispatch();
  const handleClose = () => onClose(false);
  const obtenerdetallesposiciones = (id)=>dispatch(obtenerdetallesposicionesAction(id));
  const detallesposiciones = useSelector(state =>state.resultado.detallesposiciones);
  
//   console.log(datos);
  
  useEffect(() => {
    obtenerdetallesposiciones(datos?.id_usuario);
  }, [])


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
            <strong>APUESTAS REALIZADAS</strong>
          </div>
        </DialogTitle>
        <DialogContent dividers>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell> PARTIDO </StyledTableCell>
                  <StyledTableCell> APUESTA </StyledTableCell>
                  <StyledTableCell> RESULTADO FIFA </StyledTableCell>
                  <StyledTableCell> PUNTOS </StyledTableCell>
                  <StyledTableCell> ACIERTOS </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {
                  detallesposiciones.length === 0 ?
                  (
                  <TableRow>
                      <StyledTableCell colSpan={5}>No hay registro aún.</StyledTableCell>
                  </TableRow>
                  )
                  :
                  detallesposiciones.map((row) =>(
                  <StyledTableRow key={ row.id_partido }>
                    <StyledTableCell >{  row.equipouno +' vs '+ row.equipodos }</StyledTableCell>
                    <StyledTableCell align='center'>{  row.golesuno +" - "+ row.golesdos }</StyledTableCell>
                    <StyledTableCell align='center'>{  row.goles_equipo_uno +" - "+ row.goles_equipo_dos }</StyledTableCell>
                    <StyledTableCell align='center'>{ row.puntos }</StyledTableCell>
                    <StyledTableCell align='center'>{ row.acierto }</StyledTableCell>                    
                  </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
        </DialogContent>
        <DialogActions>
          <Button 
           onClick={handleClose}
           color="primary">
            Cerrar
          </Button>
        </DialogActions>
    </Dialog>
  )
}

export default Modal
