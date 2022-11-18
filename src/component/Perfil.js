import React, { useState, useEffect } from 'react'
import { Table, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TableBody, Paper } from '@mui/material'
import styled from '@emotion/styled';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Paginacion from './layouts/Paginacion';

//fortawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons';

import { useDispatch, useSelector } from 'react-redux';

import { guardaUsuarioEditarAction } from '../action/usuarioAction';

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

const Perfil = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const dispatch = useDispatch();
    const obtenerEditarUsuario = (u) => dispatch(guardaUsuarioEditarAction(u));

    const usuario = useSelector(state => state.auth.usuario);
    
    const editarUsuario = (usuario) =>{        
      obtenerEditarUsuario(usuario);
    }
  return (
    <>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }} aria-label="customized table">
            <TableHead>
                <TableRow>
                <StyledTableCell >Nombres</StyledTableCell>
                <StyledTableCell >Usuario</StyledTableCell>
                <StyledTableCell >Contraseña</StyledTableCell>
                <StyledTableCell >Acciones</StyledTableCell>                
                </TableRow>
            </TableHead>
            <TableBody>
            {usuario === null ? (
                    <TableRow>
                        <StyledTableCell colSpan={4}>Cargando datos..</StyledTableCell>
                    </TableRow>
                ):
                <StyledTableRow key={usuario?.idusuario}>
                    <StyledTableCell component="th" scope="row" >{usuario?.nombres}</StyledTableCell>
                    <StyledTableCell >{usuario?.usuario}</StyledTableCell>
                    {/* <StyledTableCell >{row.password}</StyledTableCell> */}
                    <StyledTableCell >**********</StyledTableCell>
                    <StyledTableCell >
                      <FontAwesomeIcon
                        style={{
                          margin:  '1px',
                          cursor: 'pointer'
                        }}
                        title="Editar"
                        name="editar"
                        icon={faEdit}
                        color="#363636"
                        size="2x"
                        onClick={()=>editarUsuario(usuario)}
                      />                       
                    </StyledTableCell>
                </StyledTableRow>
            }
            </TableBody>
            {/* <TableFooter>
                <TableRow>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                        colSpan={5}
                        count={usuarios.length === 0 ? 0 : usuarios.length}
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
            </TableFooter> */}
            </Table>
        </TableContainer>        
    </>
  )
}

export default Perfil
