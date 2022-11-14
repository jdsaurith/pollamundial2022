import React, { useEffect, useState } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styled from '@emotion/styled';
import { useSelector, useDispatch  } from 'react-redux';
import ResultadosFifa from './ResultadosFifa';
import { formatearFecha } from '../helpers';
import { Grid, Table, TableCell, IconButton, TableBody, tableCellClasses, TableContainer, TableHead, TableRow, Button } from '@mui/material';

import HelpOutlineIcon from '@mui/icons-material/HelpOutline'; //no tiene resultado
import AnnouncementIcon from '@mui/icons-material/Announcement'; // localStorage
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; //guardado

import { obtenerResultadosFifaAction, resultadopartidosfifaAction } from '../action/resultadoAction';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#006db3',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

var datosapuesta = [];

const Resultados = () => {
  const dispatch = useDispatch();
  const obtenerResultadosFifa = () => dispatch(obtenerResultadosFifaAction());
  const resultadopartidosfifa = (f) => dispatch(resultadopartidosfifaAction(f));
  const obtenerpartidos = useSelector(state => state.resultado.obtenerpartidos);
  const usuario = useSelector(state => state.auth.usuario);

  useEffect(() => {
    // obtenerResultadosFifa();
  }, [])
  
  const btnResultados = () =>{
    console.log('click en enviar resultados a BD');
    const datos = JSON.parse(localStorage.getItem('resultadofifa'));
    // console.log(datos);    
    resultadopartidosfifa(datos);
    datosapuesta = [];
  }

  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>FECHA 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
        {usuario?.tipousuario === 'ROOT' || usuario?.tipousuario === 'ADMIN' ?
          <Grid container spacing={2} display='flex' justifyContent='center' alignItems='center'>
            {obtenerpartidos.filter(f => f.jornada === 'FECHA1').map(row =>(
              <Grid item>
              <TableContainer>
                <Table sx={{ minWidth: 430 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell style={{ display: 'flex' }}>
                        <Grid xs={10}>
                          GRUPO { row.grupo }                          
                        </Grid>                                                                         
                        <Grid xs={2}>                               
                          <IconButton
                          size="large"
                          aria-label="show 17 new notifications"
                          color="inherit"
                          >
                            <CheckCircleIcon /> 
                          </IconButton>
                        </Grid>
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>                    
                      <ResultadosFifa 
                        key={row.id_partido}
                        id_partido={row.id_partido}
                        datosapuesta={datosapuesta}                        
                        fecha={formatearFecha(row.fecha)}
                        equipo1={row.equipouno}
                        icon1={row.iconuno}
                        equipo2={row.equipodos}
                        icon2={row.icondos}
                        descripcion = 'MUNDIAL QATAR 2022 FECHA 1'
                        />                      
                    </TableBody>
                    
                  </Table>
              </TableContainer>
              </Grid>
            ))}
               <Grid item xs={12} display='flex' justifyContent='center' alignItems='center'>
                  <Button
                    type='button'
                    variant='contained'
                    color='primary'
                    onClick={() => btnResultados()}
                  >
                    GUARDAR RESULTADOS
                  </Button>
                </Grid>
          </Grid>
          :
          <Grid container spacing={2} display='flex' justifyContent='center' alignItems='center'>
            {obtenerpartidos.filter(f => f.jornada === 'FECHA1' && f.estado === 'ACTIVO').map(row =>(
              <Grid item>
              <TableContainer>
                <Table sx={{ minWidth: 430 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell style={{ display: 'flex' }}>
                        <Grid xs={10}>
                          GRUPO { row.grupo }                          
                        </Grid>                                                                         
                        <Grid xs={2}>                               
                          <IconButton
                          size="large"
                          aria-label="show 17 new notifications"
                          color="inherit"
                          >
                            <CheckCircleIcon /> 
                          </IconButton>
                        </Grid>
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>                    
                      <ResultadosFifa 
                        key={row.id_partido}
                        id_partido={row.id_partido}
                        datosapuesta={datosapuesta}                        
                        fecha={formatearFecha(row.fecha)}
                        equipo1={row.equipouno}
                        icon1={row.iconuno}
                        equipo2={row.equipodos}
                        icon2={row.icondos}
                        descripcion = 'MUNDIAL QATAR 2022 FECHA 1'
                        />                      
                    </TableBody>
                    
                  </Table>
              </TableContainer>
              </Grid>
            ))}
          </Grid>
        }
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>FECHA 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2} display='flex' justifyContent='center' alignItems='center'>
            {obtenerpartidos.filter(f => f.jornada === 'FECHA2').map(row =>(
              <Grid item>
              <TableContainer>
                <Table sx={{ minWidth: 430 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell style={{ display: 'flex' }}>
                        <Grid xs={10}>
                          GRUPO { row.grupo }                          
                        </Grid>                                                                         
                        <Grid xs={2}>                               
                          <IconButton
                          size="large"
                          aria-label="show 17 new notifications"
                          color="inherit"
                          >
                            <CheckCircleIcon /> 
                          </IconButton>
                        </Grid>
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>                    
                      <ResultadosFifa 
                        key={row.id_partido}
                        id_partido={row.id_partido}
                        datosapuesta={datosapuesta}
                        fecha={formatearFecha(row.fecha)}
                        equipo1={row.equipouno}
                        icon1={row.iconuno}
                        equipo2={row.equipodos}
                        icon2={row.icondos}
                        descripcion = 'MUNDIAL QATAR 2022 FECHA 1'
                        />                      
                    </TableBody>
                    
                  </Table>
              </TableContainer>
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>FECHA 3</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2} display='flex' justifyContent='center' alignItems='center'>
            {obtenerpartidos.filter(f => f.jornada === 'FECHA3').map(row =>(
              <Grid item>
              <TableContainer>
                <Table sx={{ minWidth: 430 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell style={{ display: 'flex' }}>
                        <Grid xs={10}>
                          GRUPO { row.grupo }                          
                        </Grid>                                                                         
                        <Grid xs={2}>                               
                          <IconButton
                          size="large"
                          aria-label="show 17 new notifications"
                          color="inherit"
                          >
                            <CheckCircleIcon /> 
                          </IconButton>
                        </Grid>
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>                    
                      <ResultadosFifa 
                        key={row.id_partido}
                        id_partido={row.id_partido}
                        fecha={formatearFecha(row.fecha)}
                        tipousuario = {(usuario?.tipousuario === 'ROOT' || usuario?.tipousuario === 'ADMIN') ? true : false}
                        equipo1={row.equipouno}
                        idequipouno={row.equipo_uno}
                        idequipodos={row.equipo_dos}
                        icon1={row.iconuno}
                        equipo2={row.equipodos}
                        icon2={row.icondos}
                        descripcion = 'MUNDIAL QATAR 2022 FECHA 1'
                        />                      
                    </TableBody>
                    
                  </Table>
              </TableContainer>
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export default Resultados
