import { useState } from 'react';
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

import Paginacion from './layouts/Paginacion';
import Contenedor from './Contenedor';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
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

function createData(
    posicion,
    nombres,
    resultados,
    puntos,
) {
return { posicion, nombres, resultados, puntos };
}

const rows = [
  createData(1,'Jefferson Saurith', 159, 6.0),
  createData(2,'Jesus David', 237, 9.0),
  createData(3,'Dainer Lascarro', 262, 16.0),
  createData(4,'Jose Jimenes', 305, 3.7),
  createData(5,'Juan Jose', 356, 16.0),
  createData(6,'Marcos Julio', 356, 16.0),
];

const Posiciones = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return ( 
      <>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 600 }} aria-label="customized table">
            <TableHead>
                <TableRow>
                <StyledTableCell>Posición</StyledTableCell>
                <StyledTableCell align="right">Nombres y Apellidos</StyledTableCell>
                <StyledTableCell align="right">Resultados Exactos</StyledTableCell>
                <StyledTableCell align="right">Puntos</StyledTableCell>                
                </TableRow>
            </TableHead>
            <TableBody>
                {
                rows.length === 0 ?(
                    <TableRow>
                        <StyledTableCell colSpan={5}>No hay datos</StyledTableCell>
                    </TableRow>
                )
                :
                rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <StyledTableRow key={row.posicion}>
                    <StyledTableCell component="th" scope="row">
                    {row.posicion}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.nombres}</StyledTableCell>
                    <StyledTableCell align="right">{row.resultados}</StyledTableCell>
                    <StyledTableCell align="right">{row.puntos}</StyledTableCell>
                </StyledTableRow>
                ))}
                
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                        colSpan={5}
                        count={rows.length === 0 ? 0 : rows.length}
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