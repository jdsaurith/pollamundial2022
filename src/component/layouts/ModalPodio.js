import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, tableCellClasses, TableFooter, TableHead, TablePagination, TableRow } from '@mui/material';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'moment';
import { obtenerPodioAction } from '../../action/resultadoAction';
import { formatearFechaModal } from '../../helpers';
import Paginacion from './Paginacion';

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

const ModalPodio = (props) => {
  const {open, onClose, datos, ...other} = props;

  const handleClose = () => onClose(false);

  const dispatch = useDispatch();
  const obtenerPodio = (id)=>dispatch(obtenerPodioAction(id));
  const podioequipos = useSelector(state =>state.resultado.podioequipos);
  
  // console.log(podioequipos);

  useEffect(() => {
    obtenerPodio(datos?.id_usuario);
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
            <strong>PODIO SOÑADO</strong>
          </div>
        </DialogTitle>
        <DialogContent dividers>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell> NOMBRE </StyledTableCell>
                  <StyledTableCell> CAMPEON </StyledTableCell>                  
                  <StyledTableCell> SUBCAMPEON </StyledTableCell>
                  <StyledTableCell> TERCER PUESTO </StyledTableCell>
                  <StyledTableCell> CUARTO PUESTO </StyledTableCell>
                  <StyledTableCell> PUNTOS PODIO </StyledTableCell>
                  <StyledTableCell> FECHA </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {
                  podioequipos?.length === 0 ?
                  (
                  <TableRow>
                      <StyledTableCell colSpan={7}>No hay registro aún.</StyledTableCell>
                  </TableRow>
                  )
                  :                 
                  <StyledTableRow key={ podioequipos.id_podio }>
                    <StyledTableCell >{  podioequipos.nombres }</StyledTableCell>
                    <StyledTableCell align='center'>{  podioequipos.namecampeon }</StyledTableCell>
                    <StyledTableCell align='center'>{  podioequipos.namesubcampeon }</StyledTableCell>
                    <StyledTableCell align='center'>{ podioequipos.nametercerpuesto }</StyledTableCell>
                    <StyledTableCell align='center'>{ podioequipos.namecuartopuesto}</StyledTableCell>
                    <StyledTableCell align='center'>{ podioequipos.puntos_podio }</StyledTableCell>                   
                    <StyledTableCell align='center'>{ formatearFechaModal(podioequipos.fecha_podio) }</StyledTableCell>
                  </StyledTableRow> 
              }                
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

export default ModalPodio
