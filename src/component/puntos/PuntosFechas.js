import styled from '@emotion/styled';
import { Paper, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { obtenerdetallesposicionesAction, obtenerPuntosFechaAction } from '../../action/resultadoAction';

import { formatearFechaModal } from '../../helpers';

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

const PuntosFechas = () => {
  const dispatch = useDispatch();

  const obtenerPuntosFecha = (datos) => dispatch(obtenerPuntosFechaAction(datos));
  const puntosfechas = useSelector(state =>state.resultado.puntosfechas);
  const usuario = useSelector(state => state.auth.usuario);
  

  
  useEffect(() => {
    obtenerPuntosFecha({id_usuario: usuario?.id_usuario, fecha:'FECHA2'});
  }, [])

  return (
    <>
      <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell> PARTIDO </StyledTableCell>
                <StyledTableCell> APUESTA </StyledTableCell>
                <StyledTableCell> RESULTADO FIFA </StyledTableCell>
                <StyledTableCell> PUNTOS </StyledTableCell>
                <StyledTableCell> ACIERTOS </StyledTableCell>
                {/* <StyledTableCell> REGISTRO </StyledTableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
            {
                puntosfechas.length === 0 ?
                (
                <TableRow>
                    <StyledTableCell colSpan={5}>No hay registro aún.</StyledTableCell>
                </TableRow>
                )
                :
                puntosfechas.map((row) =>(
                <StyledTableRow key={ row.id_partido }>
                  <StyledTableCell >{  row.equipouno +' vs '+ row.equipodos }</StyledTableCell>
                  <StyledTableCell align='center'>{  row.golesuno +" - "+ row.golesdos }</StyledTableCell>
                  <StyledTableCell align='center'>{  row.goles_equipo_uno +" - "+ row.goles_equipo_dos }</StyledTableCell>
                  <StyledTableCell align='center'>{ row.puntos }</StyledTableCell>
                  <StyledTableCell align='center'>{ row.acierto }</StyledTableCell>
                  {/* <StyledTableCell align='center'>{ formatearFechaModal(row.fecha) }</StyledTableCell> */}
                </StyledTableRow>
                ))}
            </TableBody>            
          </Table>
      </TableContainer>
    </>
  )
}

export default PuntosFechas
