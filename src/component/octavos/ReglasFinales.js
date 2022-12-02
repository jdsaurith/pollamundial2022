import React, { Fragment } from 'react';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar, Grid } from '@mui/material';
import { formatearDinero } from '../../helpers';

function createData3(id, local, pronostico, penales, visitante, obtenido, detalle) {
  return { id, local, pronostico, penales, visitante, obtenido, detalle };
}

const rows3 = [
  createData3(1, 'Qatar', '1 - 1', 'Penales: Qatar','Ecuador', '17', '12 puntos por acertar el resultado exacto + 5 puntos por acertar el ganador de los penales.'),
  createData3(2, 'Qatar', '1 - 1', 'Penales: Ecuador','Ecuador', '12', '12 puntos por acertar el resultado exacto del partido (120’), 0 puntos por no acertar el ganador de los penales.'),
  createData3(3, 'Qatar', '0 - 0', 'Penales: Qatar','Ecuador', '10', '5 puntos por acertar el marcado del partido (empate), 5 puntos por acertar el ganador de los penales.'),
  createData3(4, 'Qatar', '0 - 1', 'Penales: Qatar','Ecuador', '7', '2 puntos por acertar sólo la cantidad de goles de 1 equipo + 5 puntos por acertar el ganador de los penales'),
  createData3(5, 'Qatar', '0 - 0', 'Penales: Ecuador','Ecuador', '5', '5 puntos por acertar el marcador del partido (empate), 0 puntos por no acertar el ganador de los penales.'),
  createData3(6, 'Qatar', '1 - 0', 'Penales: Ecuador','Ecuador', '2', '2 puntos por acertar sólo la cantidad de goles de 1 equipo, 0 puntos por no acertar el ganador de los penales.'),
  createData3(7, 'Qatar', '0 - 2', 'Penales: Ecuador','Ecuador', '0', 'No hay ningún acierto')
];

const ejemploBolsa = 1000000;

const ReglasFinales = () => {
  return (
    <div style={{ padding: '1em' }}>      
      <h2 align='center'>Fases finales</h2>
      <Typography paragraph>
        A partir de OCTAVOS DE FINAL y en adelante, podrás sumar puntos por pronosticar resultados con empates, también seleccionar un ganador por penales. 
        Seleccionas sólo al ganador de los penales sin importar la cantidad de goles.
      </Typography>
      <Typography paragraph align='center'>
        Resultado final dentro de los 120'
      </Typography>
      <Grid container style={{marginBottom: '1em'}}>
            <Grid item xs={5} bgcolor="transparent" display="flex" justifyContent="flex-end" alignItems="center">
              <img src='/imagenes/qat.png' alt='Qatar' loading='Qatar'/>
              <h2 style={{margin: 'auto 0.5em'}}>QATAR</h2>
            </Grid>
            <Grid item xs={2} bgcolor="transparent" display="flex" justifyContent="center" alignItems="center">
              <h1>1 - 1</h1>
            </Grid>
            <Grid item xs={5} bgcolor="transparent" display="flex" justifyContent="flex-start" alignItems="center">
              <h2 style={{margin: 'auto 0.5em'}}>ECUADOR</h2>
              <img src='/imagenes/ecu.png' alt='Ecuador' loading='Ecuador'/>
            </Grid>
      </Grid>
      <Typography paragraph align='center'>
      GANADOR POR PENALES: QATAR
      </Typography>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center"><strong>Local</strong></TableCell>
            <TableCell align="center"><strong>Tú pronóstico</strong></TableCell>
            <TableCell align="center"><strong>Visitante</strong></TableCell>
            <TableCell align="center"><strong>Puntos obtenidos</strong></TableCell>
            <TableCell align="center"><strong>Detalle</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows3.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">
                <Grid xs={12} direction="column" display="flex" justifyContent="space-evenly" alignItems="center">
                <img src='/imagenes/qat.png' alt='Qatar' loading='Qatar' width="45" height="30"/>
                <span style={{marginTop: '0.2em'}}>{row.local}</span>
                </Grid>
              </TableCell>
              <TableCell align="center">
                <Grid xs={12} direction="column" display="flex" justifyContent="space-evenly" alignItems="center">
                {row.pronostico}<br/>
                {row.penales}
                </Grid>
              </TableCell>
              <TableCell align="center">
                <Grid xs={12} direction="column" display="flex" justifyContent="space-evenly" alignItems="center">
                <img src='/imagenes/ecu.png' alt='Ecuador' loading='Ecuador' width="45" height="30"/>
                <span style={{marginTop: '0.2em'}}>{row.visitante}</span>
                </Grid>
              </TableCell>
              <TableCell align="center">{row.obtenido}</TableCell>
              <TableCell >{row.detalle}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
      <h2 align='center'>Tu Final Soñada</h2>
      <Typography paragraph align='left'>
      En la pestaña FINAL SOÑADA podrás completar 4 espacios en donde debes indicar qué países ocuparán el Top #4 al final de la competencia.<br/>
      Esto deberá ser en orden: primero el Campeón, al Subcampeón, Tercero y Cuarto. Se otorgarán 10 (diez) puntos adicionales por posición acertada, hasta 40 (cuarenta) puntos en total.<br/>
      Tendrás tiempo de cargar o modificar los cuatros países hasta que comiencen los Octavos de Final del Mundial.<br/><br/>
      No se podrá repetir los países en ninguna posición, por ejemplo: 1er puesto del torneo, ARGENTINA; 2do puesto, ARGENTINA; 3er puesto, ARGENTINA; 4to puesto, ARGENTINA. 
      </Typography>


      <h2 align='center'>Situación de empate</h2>
      <Typography paragraph align='left'>
        En caso de empate en una fecha, se posicionará primero al participante que:<br/><br/>
        <b>PRIMERA CLÁUSULA:</b> Haya obtenido la mayor cantidad de puntos.<br/>
        <b>SEGUNDA CLÁUSULA:</b> Haya obtenido más aciertos exactos.<br/>
        <b>TERCERA CLÁUSULA:</b> Haya registrado sus pronosticos con mayor anticipación.<br/>
      </Typography>
    </div>
  )
}

export default ReglasFinales
