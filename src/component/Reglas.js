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
import { formatearDinero } from '../helpers';

function createData(id, metodo, puntos) {
  return { id, metodo, puntos };
}

const rows = [
  createData(1,'Acierto de resultado y marcador exacto (cantidad de goles de cada equipo)', '12 puntos'),
  createData(2,'Acierto de resultado (ganador) y goles de 1 equipo', '7 puntos'),
  createData(3,'Acierto de resultado (ganador)', '5 puntos'),
  createData(4,'Acierto de goles 1 equipo', '2 puntos'),
  createData(5,'Ninguna situación anterior', '0 puntos')
];

function createData2(id, local, pronostico, visitante, obtenido, detalle) {
  return { id, local, pronostico, visitante, obtenido, detalle };
}

const rows2 = [
  createData2(1, 'Qatar', '3 - 1', 'Ecuador', '12', 'Por acertar el resultado exacto'),
  createData2(2, 'Qatar', '3 - 0', 'Ecuador', '7', 'Por acertar al ganador y los goles de 1 equipo'),
  createData2(3, 'Qatar', '2 - 1', 'Ecuador', '7', 'Por acertar al ganador y los goles de 1 equipo'),
  createData2(4, 'Qatar', '2 - 0', 'Ecuador', '5', 'Por acertar sólo al ganador del partido'),
  createData2(5, 'Qatar', '0 - 1', 'Ecuador', '2', 'Por acertar sólo la cantidad de goles de 1 equipo'),
  createData2(6, 'Qatar', '3 - 3', 'Ecuador', '2', 'Por acertar sólo la cantidad de goles de 1 equipo'),
  createData2(7, 'Qatar', '0 - 2', 'Ecuador', '0', 'No hay ningún acierto'),
  createData2(8, 'Qatar', '0 - 0', 'Ecuador', '0', 'No hay ningún acierto')
];

const ejemploBolsa = 1000000;

const Reglas = () => {
  return (
    <div style={{ padding: '1em' }}>
      <h2>¿Cómo pronosticar y hasta cuándo tengo tiempo?</h2>
      <Typography paragraph>
        Dentro del juego podrás comenzar a pronosticar los partidos de las fechas habilitadas del mundial.
        Tendrás <strong style={{backgroundColor: '#C8EDF3'}}>hasta dos(2) horas antes</strong> que comience el partido para pronosticar o modificar tu pronóstico,
        de lo contrario, pasadas las dos horas previas, no podrás cambiar tu pronóstico del partido.
        Los puntos que se obtienen una vez finalizado el partido estarán dados de la siguiente forma:
      </Typography>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><strong>Método de calificación</strong></TableCell>
            <TableCell align="left"><strong>Puntos</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{row.metodo}</TableCell>
              <TableCell align="left">{row.puntos}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
      <h2>Ejemplo de cómo sumar puntos</h2>
      <Grid container style={{marginBottom: '1em'}}>
            <Grid item xs={5} bgcolor="transparent" display="flex" justifyContent="flex-end" alignItems="center">
              <img src='/imagenes/qat.png' alt='Qatar' loading='Qatar'/>
              <h2 style={{margin: 'auto 0.5em'}}>QATAR</h2>
            </Grid>
            <Grid item xs={2} bgcolor="transparent" display="flex" justifyContent="center" alignItems="center">
              <h1>3 - 1</h1>
            </Grid>
            <Grid item xs={5} bgcolor="transparent" display="flex" justifyContent="flex-start" alignItems="center">
              <h2 style={{margin: 'auto 0.5em'}}>ECUADOR</h2>
              <img src='/imagenes/ecu.png' alt='Ecuador' loading='Ecuador'/>
            </Grid>
      </Grid>
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
          {rows2.map((row) => (
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
              <TableCell align="center">{row.pronostico}</TableCell>
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
      <Typography paragraph variant="body2"  style={{marginTop: '1em'}}>
        <i>*Recuerda que tienes <strong style={{backgroundColor: '#C8EDF3'}}>hasta dos(2) horas antes</strong> que comience el partido para pronosticar o modificar tu pronóstico </i> <br /><br />
        <i>*El costo de participación es de: <strong style={{backgroundColor: '#C8EDF3'}}>{formatearDinero(10000)}</strong> pesos.</i> <br />
        <i>*El primer (1) lugar obtendra <strong style={{backgroundColor: '#C8EDF3'}}>un 60% de lo recaudado</strong> por ejemplo si el total de lo recaudado es {formatearDinero(ejemploBolsa)} el 60% corresponde a {formatearDinero(ejemploBolsa*0.6)} mil pesos. </i><br />
        <i>*El segundo (2) lugar obtendra <strong style={{backgroundColor: '#C8EDF3'}}>un 20% de lo recaudado</strong> por ejemplo si el total de lo recaudado es {formatearDinero(ejemploBolsa)} el 20% corresponde a {formatearDinero(ejemploBolsa*0.2)} mil pesos. </i><br />
        <i>*El tercer (3) lugar obtendra <strong style={{backgroundColor: '#C8EDF3'}}>un 5% de lo recaudado</strong> por ejemplo si el total de lo recaudado es {formatearDinero(ejemploBolsa)} el 5% corresponde a {formatearDinero(ejemploBolsa*0.05)} mil pesos. </i><br />
        <i>*El procentaje restante sera para gastos de administracion y servicios de la plataforma.</i><br />

      </Typography>
      </div>
  )
}

export default Reglas
