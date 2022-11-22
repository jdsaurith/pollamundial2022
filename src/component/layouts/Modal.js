import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, tableCellClasses, TableFooter, TableHead, TablePagination, TableRow } from '@mui/material';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'moment';
import { obtenerdetallesposicionesAction } from '../../action/resultadoAction';
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

const Modal = (props) => {
  const {open, onClose, datos, ...other} = props;
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);

  const handleClose = () => onClose(false);

  const dispatch = useDispatch();
  const obtenerdetallesposiciones = (id)=>dispatch(obtenerdetallesposicionesAction(id));
  const detallesposiciones = useSelector(state =>state.resultado.detallesposiciones);

  useEffect(() => {
    obtenerdetallesposiciones(datos?.id_usuario);
  }, [])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


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
                  <StyledTableCell> REGISTRO </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {
                  detallesposiciones.length === 0 ?
                  (
                  <TableRow>
                      <StyledTableCell colSpan={6}>No hay registro aún.</StyledTableCell>
                  </TableRow>
                  )
                  :
                  detallesposiciones.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) =>(
                  <StyledTableRow key={ row.id_partido }>
                    <StyledTableCell >{  row.equipouno +' vs '+ row.equipodos }</StyledTableCell>
                    <StyledTableCell align='center'>{  row.golesuno +" - "+ row.golesdos }</StyledTableCell>
                    <StyledTableCell align='center'>{  row.goles_equipo_uno +" - "+ row.goles_equipo_dos }</StyledTableCell>
                    <StyledTableCell align='center'>{ row.puntos }</StyledTableCell>
                    <StyledTableCell align='center'>{ row.acierto }</StyledTableCell>
                    {/* <StyledTableCell align='center'>{ Moment(row.fecha).add(5, 'h').format('YYYY-MM-DD, HH:mm:ss') }</StyledTableCell> */}
                    <StyledTableCell align='center'>{ formatearFechaModal(row.fecha) }</StyledTableCell>
                  </StyledTableRow>
                  ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                    <TablePagination
                        rowsPerPageOptions={[4, 10, 25, { label: 'All', value: -1 }]}
                        colSpan={6}
                        count={detallesposiciones.length === 0 ? 0 : detallesposiciones.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                            inputProps: {
                            'aria-label': 'rows per page',
                            },
                            native: true,
                        }}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        ActionsComponent={Paginacion}
                    />
                </TableRow>
            </TableFooter>
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
