import { useState, useEffect } from 'react';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { TablePagination } from '@mui/material';


import { faClipboardList, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Paginacion from './layouts/Paginacion';

import { useDispatch, useSelector } from 'react-redux';
import { obtenerposicionesAction } from '../action/resultadoAction';
import Modal from './layouts/Modal';


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


const Posiciones = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openModal, setOpenModal] = useState(false);
    const [datos, setDatos] = useState();

    const dispatch = useDispatch();
    const obtenerposiciones = () =>dispatch(obtenerposicionesAction());
    const posiciones = useSelector(state => state.resultado.posiciones);

    // console.log(posiciones);

    useEffect(() => {
      obtenerposiciones();
    }, [])


    const detalleApuesta = (row) =>{
      setDatos(row);
      setOpenModal(true);
    }

    const handleCloseModal = () =>{
      setOpenModal(false);
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    

    return ( 
      <>
        {openModal &&
          <Modal 
          keepMounted
          open={openModal}
          onClose={handleCloseModal}
          classes={{maxWidth:'900', maxHeight:'600' }}      
          datos={datos}
        />}
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 600 }} aria-label="customized table">
            <TableHead>
                <TableRow>
                <StyledTableCell>Posición</StyledTableCell>
                <StyledTableCell>Nombres y Apellidos</StyledTableCell>
                <StyledTableCell>Puntos</StyledTableCell>
                <StyledTableCell>Resultados Exactos</StyledTableCell> 
                <StyledTableCell>Detalles</StyledTableCell>                                
                </TableRow>
            </TableHead>
            <TableBody>
                {
                posiciones.length === 0 ?(
                    <TableRow>
                        <StyledTableCell colSpan={4}>No hay registro aún</StyledTableCell>
                    </TableRow>
                )
                :
                posiciones.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row,i) => (
                <StyledTableRow key={i}>
                    <StyledTableCell component="th" scope="row">
                    {i + 1}
                    </StyledTableCell>
                    <StyledTableCell>{row.nombres}</StyledTableCell>
                    <StyledTableCell>{row.puntos}</StyledTableCell>
                    <StyledTableCell>{row.aciertos}</StyledTableCell>
                    <StyledTableCell>
                          <FontAwesomeIcon
                            style={{
                              margin:  '0 5px',
                              cursor: 'pointer'
                            }}
                            title="Detalle"
                            name="detalle"
                            icon={faEye}
                            color="#363636"
                            size="2x"
                            onClick={()=>detalleApuesta(row)}
                          />
                    </StyledTableCell>
                </StyledTableRow>
                ))}
                
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                        colSpan={5}
                        count={posiciones.length === 0 ? 0 : posiciones.length}
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
        </TableContainer>
        
      </>
     );
}
 
export default Posiciones;