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
import { obtenerposicionesAction } from '../action/resultadoAction';
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

// background: #1f4037;  /* fallback for old browsers */
// background: -webkit-linear-gradient(to right, #99f2c8, #1f4037);  /* Chrome 10-25, Safari 5.1-6 */
// background: linear-gradient(to right, #99f2c8, #1f4037); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */



const Posiciones = () => {
  const theme = useTheme();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openModal, setOpenModal] = useState(false);
    const [datos, setDatos] = useState();

    const dispatch = useDispatch();
    const obtenerposiciones = () =>dispatch(obtenerposicionesAction());
    const posiciones = useSelector(state => state.resultado.posiciones);

    // console.log(posiciones);

    useEffect(() => {
      obtenerposiciones();
    }, [])


    const detalleApuesta = (row) =>{
      setDatos(row);
      setOpenModal(true);
    }

    const handleCloseModal = () =>{
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
        <Grid container direction='row' display='flex' spacing={4}>
          <Grid item xs={12} md={12} lg={12} display='flex'>
            <Grid xs={12} md={6} lg={8}  display='flex' justifyContent='flex-end'>
              <Card sx={{ display: 'flex', bgcolor: '#006db3' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h6">
                      PREMIOS
                    </Typography>
                    <Typography variant="h6" component="div">
                      Primer Puesto : { formatearDinero(100000 * 0.6) } <br />
                      Segundo Puesto: { formatearDinero(100000 * 0.2) }<br />
                      Tercer Puesto : { formatearDinero(10000) }
                    </Typography>
                  </CardContent>                
                </Box>              
              </Card>
            </Grid>
            <Grid xs={12} md={6} lg={4} display='flex' justifyContent='flex-end'>
              <Card sx={{ display: 'flex', bgcolor: '#009be5'}}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h6">
                      RECAUDADO
                    </Typography>
                    <Typography variant="h5" component="div">
                      { formatearDinero(10*10000) }
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
            
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 600 }} aria-label="customized table">
              <TableHead>
                  <TableRow>
                  <StyledTableCell>Posición</StyledTableCell>
                  <StyledTableCell>Nombres y Apellidos</StyledTableCell>
                  <StyledTableCell>Puntos</StyledTableCell>
                  <StyledTableCell>Resultados Exactos</StyledTableCell> 
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
                  posiciones.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row,i) => (
                  <StyledTableRow key={i}>
                      <StyledTableCell component="th" scope="row">
                      {i + 1}
                      </StyledTableCell>
                      <StyledTableCell>{row.nombres}</StyledTableCell>
                      <StyledTableCell>{row.puntos}</StyledTableCell>
                      <StyledTableCell>{row.aciertos}</StyledTableCell>
                      <StyledTableCell>
                            <FontAwesomeIcon
                              style={{
                                margin:  '0 5px',
                                cursor: 'pointer'
                              }}
                              title="Detalle"
                              name="detalle"
                              icon={faEye}
                              color="#363636"
                              size="2x"
                              onClick={()=>detalleApuesta(row)}
                            />
                      </StyledTableCell>
                  </StyledTableRow>
                  ))}
                  
              </TableBody>
              <TableFooter>
                  <TableRow>
                      <TablePagination
                          rowsPerPageOptions={[10, 15, 30, { label: 'All', value: -1 }]}
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