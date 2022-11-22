import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
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
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { Card, CardContent, CardMedia, Grid, IconButton, TablePagination, Typography } from '@mui/material';


import { faClipboardList, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Paginacion from './layouts/Paginacion';

import { useDispatch, useSelector } from 'react-redux';
import { obtenerposicionesAction, limpiarDetallePosicionAction } from '../action/resultadoAction';
import Modal from './layouts/Modal';
import { formatearDinero } from '../helpers';



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


function returnPosi(arr) {
  let i = 1;
  let posant = 1;
  let sumatoria = 0;
  arr.forEach(us => {
      if((us.puntos + us.aciertos) == sumatoria){
          us.orden = posant;
      }else{
        us.orden = i;
        posant = i;
      }
      i+=1;
      sumatoria = us.puntos + us.aciertos;
  })
  return arr;
}


const Posiciones = () => {
  const theme = useTheme();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [openModal, setOpenModal] = useState(false);
    const [datos, setDatos] = useState();
    const [bolsa, setBolsa] = useState(0);

    const dispatch = useDispatch();
    const obtenerposiciones = () =>dispatch(obtenerposicionesAction());
    const limpiarDetallePosicion = () =>dispatch(limpiarDetallePosicionAction());
    const posiciones = useSelector(state => state.resultado.posiciones);
    const usuario = useSelector(state => state.auth.usuario);

    // console.log(posiciones);

    useEffect(() => {
      obtenerposiciones();
    }, [])


    useEffect(() => {
      setBolsa(posiciones.length * 10000)
      // console.log(posiciones)
    }, [bolsa, posiciones])

    const detalleApuesta = (row) =>{
      setDatos(row);
      setOpenModal(true);
    }

    const handleCloseModal = () =>{
      limpiarDetallePosicion();
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
        <Grid container direction='row' display='flex' spacing={4} >
          <Grid container xs={12} md={12} lg={12} display='flex' justifyContent='center' alignItems='center'>
            <Grid xs={12} md={6} lg={6} display='flex' justifyContent='center' >
                <Card sx={{ display: 'flex', bgcolor: 'transparent'}} >
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                      <Typography component="div" variant="h6">
                        <strong> RECAUDO <span style={{fontSize: "2em"}}>&#x1F4B0;</span></strong>
                      </Typography>
                      <Typography variant="h5" component="div">
                        { formatearDinero(bolsa) }
                      </Typography>
                    </CardContent>
                  </Box>
                  <CardMedia
                    component="img"
                    sx={{ width: 170 }}
                    image="/imagenes/fondo2.jpg"
                    alt="POLLA QATAR 2022"
                  />
                </Card>
            </Grid>
            <Grid xs={12} md={6} lg={6}  display='flex' justifyContent='center'>
              <Card sx={{ display: 'flex', bgcolor: 'transparent' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h6">
                      <strong> PREMIOS <span style={{fontSize: "2em"}}>&#x1F3C6;</span></strong>
                    </Typography>
                    <Typography variant="h6" component="div">
                      <span>&#x1F947;</span> Puesto : { formatearDinero(bolsa * 0.6) } <br />
                      <span>&#x1F948;</span> Puesto : { formatearDinero(bolsa * 0.2) }<br />
                      <span>&#x1F949;</span> Puesto : { formatearDinero(bolsa * 0.05) }
                      {/* <span>&#x1F949;</span> Puesto : { formatearDinero(bolsa * 0.05 < 10000 ? bolsa * 0.05 : 10000) } */}
                    </Typography>
                  </CardContent>
                </Box>
              </Card>
            </Grid>

          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 600 }} aria-label="customized table">
              <TableHead>
                  <TableRow>
                  <StyledTableCell align="center">Posición</StyledTableCell>
                  <StyledTableCell>Nombres y Apellidos</StyledTableCell>
                  <StyledTableCell align="center">Puntos</StyledTableCell>
                  <StyledTableCell align="center">Resultados Exactos</StyledTableCell>
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
                  returnPosi(posiciones).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row,i) => (
                  <StyledTableRow key={i}>
                      <StyledTableCell component="th" scope="row" align="center">
                        {(row.orden == 1 && (row.puntos && row.puntos != 0))  ? 
                        <span style={{fontSize: "2em"}}>&#x1F947; {row.orden}</span> : 
                        (row.orden == 2 && (row.puntos && row.puntos != 0)) ? 
                        <span style={{fontSize: "1.6em"}}>&#x1F948; {row.orden }</span> : 
                        (row.orden == 3 && (row.puntos && row.puntos != 0)) ? 
                        <span style={{fontSize: "1.3em"}}>&#x1F949; {row.orden}</span> : 
                        (row.puntos && row.puntos != 0) ? row.orden : row.orden}
                      </StyledTableCell>
                      <StyledTableCell>{(row.orden == 1 && (row.puntos && row.puntos != 0))  ? 
                        <><span style={{fontSize: "1.6em"}}>&#x1F451;</span> {row.nombres}</> : row.nombres}</StyledTableCell>
                      <StyledTableCell align="center">{row.puntos}</StyledTableCell>
                      <StyledTableCell align="center">{row.aciertos}</StyledTableCell>
                      <StyledTableCell>
                        {usuario.estado === 'PAGO'}
                            <FontAwesomeIcon
                              style={{
                                margin:  '0 5px'
                              }}
                              title="Detalle"
                              name="detalle"
                              cursor={usuario.estado === 'PAGO' ? 'pointer' :'not-allowed'}
                              icon={faEye}
                              color="#363636"
                              opacity={usuario.estado !== 'PAGO' && "50%"}
                              size="2x"
                              onClick={usuario.estado === 'PAGO' ? ()=>detalleApuesta(row) : null}
                            />
                      </StyledTableCell>
                  </StyledTableRow>
                  ))}
              </TableBody>
              <TableFooter>
                  <TableRow>
                      <TablePagination
                          rowsPerPageOptions={[10, 15, 25, { label: 'All', value: -1 }]}
                          colSpan={10}
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
          </Grid>
        </Grid>
      </>
    );
}
 
export default Posiciones;