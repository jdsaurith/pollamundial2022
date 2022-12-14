import * as React from 'react';
import { useState, useEffect } from 'react';
import { useTheme, styled, alpha } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Card, CardContent, CardMedia, Grid, IconButton, TablePagination, Typography } from '@mui/material';

////buscado
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';

import { faClipboardList, faEye, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Paginacion from '../layouts/Paginacion';

import { useDispatch, useSelector } from 'react-redux';
import { obtenerPosicionesFinalesAction, limpiarDetallePosicionAction, consultarRecaudoAction, limpiarPodioAction } from '../../action/resultadoAction';
import ModalFinales from '../layouts/ModalFinales';
import { formatearDinero } from '../../helpers';
import ModalPodio from '../layouts/ModalPodio';


////buscador
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '80%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: '25%',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

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
  arr?.forEach(us => {
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


const PosicionesFinales = (props) => {
  const { sinpremio } = props;
  const theme = useTheme();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [openModal, setOpenModal] = useState(false);
    const [openModalFinal, setOpenModalFinal] = useState(false);
    const [posicionesfil, guardarposicionesFiltro] = useState([]);
    const [datos, setDatos] = useState();
    const [bolsa, setBolsa] = useState(0);
    const [pais, setPais] = useState();

    const dispatch = useDispatch();
    const obtenerposicionesfinales = () =>dispatch(obtenerPosicionesFinalesAction());
    const consultarRecaudo = () =>dispatch(consultarRecaudoAction());
    const limpiarDetallePosicion = () =>dispatch(limpiarDetallePosicionAction());
    const limpiarPodio = () =>dispatch(limpiarPodioAction());
    const posicionesfinales = useSelector(state => state.resultado.posicionesfinales);
    const recaudo = useSelector(state => state.resultado.recaudo);
    const usuario = useSelector(state => state.auth.usuario);
    
    // console.log(usuario);

    useEffect(() => {
      obtenerposicionesfinales();
      consultarRecaudo();
    }, [])

    useEffect(() => {      
      guardarposicionesFiltro(returnPosi(posicionesfinales));
    }, [posicionesfinales])

    useEffect(() => {
      if(usuario?.tipousuario === 'COLOMBIA'){
        setBolsa(recaudo * 20000)
      }else{
        setBolsa(recaudo * 1500)
      }
      
      // console.log(posicionesfinales)
    }, [bolsa, recaudo])

    const positionSearch = (ce) =>{
      // console.log(ce);
      const lowercasedValor = ce.toLowerCase().trim();
      if (lowercasedValor === "") guardarposicionesFiltro(posicionesfinales);
      else {
        const filteredData = posicionesfinales.filter(item => {
          return Object.keys(item).some(key =>
            item[key].toString().toLowerCase().includes(lowercasedValor)
          );
        });
        guardarposicionesFiltro(filteredData);
            // console.log(filteredData);
      }
    }

    const detalleApuesta = (row) =>{
      setDatos(row);
      setOpenModal(true);
    }

    const finalSo??ada = (row) =>{
      setDatos(row);
      setOpenModalFinal(true);
    }

    const handleCloseModal = () =>{
      limpiarDetallePosicion();
      setOpenModal(false);
    }

    const handleCloseModalFinal = () =>{
      limpiarPodio();
      setOpenModalFinal(false);
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
          <ModalFinales 
          keepMounted
          open={openModal}
          onClose={handleCloseModal}
          classes={{maxWidth:'900', maxHeight:'600' }}
          datos={datos}
        />}
        {openModalFinal &&
          <ModalPodio 
          keepMounted
          open={openModalFinal}
          onClose={handleCloseModalFinal}
          classes={{maxWidth:'900', maxHeight:'600' }}
          datos={datos}
        />}
        <Grid container direction='row' display='flex' spacing={4} >
          {!sinpremio && <Grid container xs={12} md={12} lg={12} display='flex' justifyContent='center' alignItems='center'>
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
                      <span>&#x1F948;</span> Puesto : { formatearDinero(bolsa * 0.3) }<br />
                      {/* <span>&#x1F949;</span> Puesto : { formatearDinero(bolsa * 0.1) } */}
                      {/* <span>&#x1F949;</span> Puesto : { formatearDinero(bolsa * 0.05 < 10000 ? bolsa * 0.05 : 10000) } */}
                    </Typography>
                  </CardContent>
                </Box>
              </Card>
            </Grid>

          </Grid>}
          <Grid item xs={12} md={12} lg={12}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 600 }} aria-label="customized table">
              <TableHead>
                  <TableRow>                  
                    <StyledTableCell colSpan={5}>                      
                      <Search>
                        <SearchIconWrapper>
                          <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                          placeholder="Search???"
                          inputProps={{ 'aria-label': 'search' }}
                          onChange={e => positionSearch(e.target.value)}
                        />
                      </Search>
                    </StyledTableCell>                 
                    
                  </TableRow>
                  <TableRow>
                  <StyledTableCell align="center">Posici??n</StyledTableCell>
                  <StyledTableCell>Nombres y Apellidos</StyledTableCell>
                  <StyledTableCell align="center">Puntos</StyledTableCell>
                  <StyledTableCell align="center">Resultados Exactos</StyledTableCell>
                  <StyledTableCell>Detalles</StyledTableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
                  {
                  posicionesfil.length === 0 ?(
                      <TableRow>
                          <StyledTableCell colSpan={4}>No hay registro a??n</StyledTableCell>
                      </TableRow>
                  )
                  :
                  posicionesfil.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row,i) => (
                  <StyledTableRow key={i}>
                      <StyledTableCell component="th" scope="row" align="center">
                        {(row.orden == 1 && (row.puntos && row.puntos != 0))  ? 
                        <span style={{fontSize: "2em"}}>&#x1F947; </span> : 
                        (row.orden == 2 && (row.puntos && row.puntos != 0)) ? 
                        <span style={{fontSize: "1.6em"}}>&#x1F948; </span> : row.orden}                        
                      </StyledTableCell>
                      <StyledTableCell>{(row.orden == 1 && (row.puntos && row.puntos != 0))  ? 
                        <><span style={{fontSize: "1.6em"}}>&#x1F451;</span> {row.nombres}</> : row.nombres}</StyledTableCell>
                      <StyledTableCell align="center">{row.puntos}</StyledTableCell>
                      <StyledTableCell align="center">{row.aciertos}</StyledTableCell>
                      <StyledTableCell>
                        {usuario.octavos === 'TRUE'}
                            <FontAwesomeIcon
                              style={{
                                margin:  '0 5px'
                              }}
                              title="Detalle"
                              name="detalle"
                              cursor={usuario.octavos === 'TRUE' ? 'pointer' :'not-allowed'}
                              icon={faEye}
                              color="#363636"
                              opacity={usuario.octavos !== 'TRUE' && "50%"}
                              size="2x"
                              onClick={usuario.octavos === 'TRUE' ? ()=>detalleApuesta(row) : null}
                            />
                            <FontAwesomeIcon
                              style={{
                                margin:  '0 5px'
                              }}
                              title="FinalSo??ada"
                              name="finalso??ada"
                              cursor={usuario.octavos === 'TRUE' ? 'pointer' :'not-allowed'}
                              icon={faTrophy}
                              color="#363636"
                              opacity={usuario.octavos !== 'TRUE' && "50%"}
                              size="2x"
                              onClick={usuario.octavos === 'TRUE' ? ()=>finalSo??ada(row) : null}
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
                          count={posicionesfil.length === 0 ? 0 : posicionesfil.length}
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
 
export default PosicionesFinales;