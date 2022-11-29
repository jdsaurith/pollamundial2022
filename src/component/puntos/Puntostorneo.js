import styled from '@emotion/styled';
import { Paper, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { obtenerPuntosTorneoAction } from '../../action/usuarioAction';

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

const Puntostorneo = () => {
    const dispatch = useDispatch();
    
    const obtenerPuntosTorneo = (id) => dispatch(obtenerPuntosTorneoAction(id));
    const usuario = useSelector(state => state.auth.usuario);
    const puntostorneo = useSelector(state => state.usuario.puntostorneo);

    // useEffect(() => {
    //   obtenerPuntosTorneo(usuario?.id_usuario);
    // }, [])
  
  
 return (
    <>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                    <StyledTableCell >Fecha</StyledTableCell>
                    <StyledTableCell >Posicion</StyledTableCell>
                    <StyledTableCell >Puntos</StyledTableCell>
                    <StyledTableCell >Aciertos</StyledTableCell>                
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                    puntostorneo.length === 0 ?(
                        <TableRow>
                            <StyledTableCell colSpan={4}>Cargando datos..</StyledTableCell>
                        </TableRow>
                    )
                    :
                    puntostorneo.map((row, i) => (
                    <StyledTableRow key={i}>
                        <StyledTableCell component="th" scope="row" >{row.fecha}</StyledTableCell>
                        <StyledTableCell > - </StyledTableCell>
                        <StyledTableCell >{row.puntos}</StyledTableCell>
                        <StyledTableCell >{row.aciertos}</StyledTableCell>                    
                    </StyledTableRow>
                    ))}
                    
                </TableBody>            
            </Table>
        </TableContainer>
    </>
  )
}

export default Puntostorneo
