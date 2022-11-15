import React, { useState, useEffect } from 'react'
import { Table, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TableBody, Paper } from '@mui/material'
import styled from '@emotion/styled';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Paginacion from './layouts/Paginacion';

//fortawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

import { useDispatch, useSelector } from 'react-redux';

import { verUsuariosAction, guardaUsuarioEditarAction } from '../action/usuarioAction';

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

const UsuariosInfo = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const dispatch = useDispatch();
    const verUsuarios = (tipo) => dispatch(verUsuariosAction(tipo));
    const obtenerEditarUsuario = (u) => dispatch(guardaUsuarioEditarAction(u));

    const usuarios = useSelector(state => state.usuario.usuarios);
    const usuarioadmin = useSelector(state => state.auth.usuario);
    
    useEffect(() => {
      if(usuarioadmin !== null){
        verUsuarios(usuarioadmin.tipousuario === 'ADMIN' ? 'ARG' : 'COL');
      }      
    }, [usuarioadmin])

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    const editarUsuario = (usuario) =>{
      console.log(usuario);
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
                {
                usuarios.length === 0 ?(
                    <TableRow>
                        <StyledTableCell colSpan={4}>No hay datos</StyledTableCell>
                    </TableRow>
                )
                :
                usuarios.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <StyledTableRow key={row.usuario}>
                    <StyledTableCell component="th" scope="row" >{row.nombres}</StyledTableCell>
                    <StyledTableCell >{row.usuario}</StyledTableCell>
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
                      onClick={()=>editarUsuario(row)}
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
            </TableFooter>
            </Table>
        </TableContainer>        
    </>
  )
}

export default UsuariosInfo
