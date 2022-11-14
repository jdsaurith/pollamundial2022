import React from 'react';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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

const Reglas = () => {
  return (
    <div>
      <h2>¿Cómo pronosticar y hasta cuándo tengo tiempo?</h2>
      <Typography paragraph>
        Dentro del juego podrás comenzar a pronosticar los partidos de las fechas habilitadas del mundial.
        Tendrás hasta una hora antes que comience el partido para pronosticar o modificar tu pronóstico,
        de lo contrario, una vez cumplida la hora, no podrás colocar resultados y por lo tanto no obtendrás puntos.
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
      <Typography paragraph>
        IMAGEN del resultado QATAR 3 - 1 ECUADOR
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
          {rows2.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">{row.local}</TableCell>
              <TableCell align="center">{row.pronostico}</TableCell>
              <TableCell align="center">{row.visitante}</TableCell>
              <TableCell align="center">{row.obtenido}</TableCell>
              <TableCell >{row.detalle}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
    </div>
  )
}

export default Reglas
