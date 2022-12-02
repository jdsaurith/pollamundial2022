import React , { useState, useEffect } from 'react';
import localStorage from 'localStorage';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Fab, Badge, Button, Grid, IconButton, Paper, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from '@mui/material';
import styled from '@emotion/styled';
import SaveIcon from '@mui/icons-material/Save';

import NotificationsIcon from '@mui/icons-material/Notifications'

import HelpOutlineIcon from '@mui/icons-material/HelpOutline'; //no tiene resultado
import AnnouncementIcon from '@mui/icons-material/Announcement'; // localStorage
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; //guardado
import Zoom from '@mui/material/Zoom';
import Header from '../component/Header';
import Navigator from '../component/Navigator';
import Contenedor from '../component/Contenedor';
import Partidos from '../component/Partidos';
import Usuarios from '../component/usuario/Usuarios';
import Reglas from '../component/Reglas';
import Posiciones from '../component/Posiciones';
import Resultados from '../component/Resultados';

import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch  } from 'react-redux'
import {  obtenerResultadosAction, resultadopartidosAction, obtenerPartidosAction } from '../action/resultadoAction';
import { formatearFecha } from '../helpers';
import ModalInfoSave from '../component/layouts/ModalInfoSave';
import InfoGeneral from '../component/layouts/InfoGeneral';
import Perfil from '../component/perfil/Perfil';
import Octavosfinal from '../component/octavos/Octavosfinal';
import PosicionesFinales from '../component/octavos/PosicionesFinales';
import ModalInformativo from '../component/layouts/ModalInformativo';
import ReglasFinales from '../component/octavos/ReglasFinales';
import FinalDeseada from '../component/octavos/FinalDeseada';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#006db3',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

let theme = createTheme({
    palette: {
      primary: {
        light: '#63ccff',
        main: '#009be5',
        dark: '#006db3',
      },
    },
    typography: {
      h5: {
        fontWeight: 500,
        fontSize: 26,
        letterSpacing: 0.5,
      },
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiTab: {
        defaultProps: {
          disableRipple: true,
        },
      },
    },
    mixins: {
      toolbar: {
        minHeight: 48,
      },
    },
});
  
theme = {
    ...theme,
    components: {
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: '#081627',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
          },
          contained: {
            boxShadow: 'none',
            '&:active': {
              boxShadow: 'none',
            },
          },
        },
      },
      MuiTabs: {
        styleOverrides: {
          root: {
            marginLeft: theme.spacing(1),
          },
          indicator: {
            height: 3,
            borderTopLeftRadius: 3,
            borderTopRightRadius: 3,
            backgroundColor: theme.palette.common.white,
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            margin: '0 16px',
            minWidth: 0,
            padding: 0,
            [theme.breakpoints.up('md')]: {
              padding: 0,
              minWidth: 0,
            },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            padding: theme.spacing(1),
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            borderRadius: 4,
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            backgroundColor: 'rgb(255,255,255,0.15)',
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            '&.Mui-selected': {
              color: '#4fc3f7',
            },
          },
        },
      },
      MuiListItemText: {
        styleOverrides: {
          primary: {
            fontSize: 14,
            fontWeight: theme.typography.fontWeightMedium,
          },
        },
      },
      MuiListItemIcon: {
        styleOverrides: {
          root: {
            color: 'inherit',
            minWidth: 'auto',
            marginRight: theme.spacing(2),
            '& svg': {
              fontSize: 20,
            },
          },
        },
      },
      MuiAvatar: {
        styleOverrides: {
          root: {
            width: 32,
            height: 32,
          },
        },
      },
    },
};
  
const drawerWidth = 250;
var datosapuesta = [];

const Home = () => {  
  const history = useHistory();
  const dispatch = useDispatch();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openModalInfo, setOpenModalInfo] = useState(true);
  const [datos, setDatos] = useState();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
  const [componente, setComponente] = useState('Usuarios');
  const [pendientes, setPendientes] = useState(0);
 

  const resultadopartidos = (rp) => dispatch(resultadopartidosAction(rp));
  const obtenerPartidos = () =>dispatch(obtenerPartidosAction());
  const obtenerResultados = (id) =>dispatch(obtenerResultadosAction(id));
  const usuario = useSelector(state => state.auth.usuario);
  const conectado = useSelector(state =>state.auth.conectado);
  const obtenerpartidos = useSelector(state => state.resultado.obtenerpartidos);
  const consultarresultados = useSelector(state => state.resultado.consultarresultados);
  const resultadosapostados = useSelector(state => state.resultado.resultadosapostados);
  const habilitarperfil = useSelector(state=>state.usuario.habilitarperfil);

  // console.log(usuario?.publicidad);
  
  useEffect(() => {
    if(!conectado) history.push("/");
  }, [conectado]);
  
  useEffect(() => {
    obtenerPartidos();
  }, []);

  useEffect(() => {
    obtenerResultados(usuario?.id_usuario);
  }, [consultarresultados]);

  useEffect(() => {
    if (habilitarperfil) setComponente('Perfil');
  }, [habilitarperfil])

  // useEffect(() => {

  //   if(usuario?.publicidad === 'FALSE'){
  //     setOpenModalInfo(true);
  //   }
  // }, [!usuario])

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const btnResultados = (rondas) => { 
    const datos = JSON.parse(localStorage.getItem('resultado'));
    // console.log(datos);
    resultadopartidos({datos, rondas});
    datosapuesta = [];
    setPendientes(0);

  }

  const btnInfoSave = () =>{
    setDatos({
      titulo: 'RESULTADO GUARDADO',
      contenido: 'Resultado registrado con éxito :)'
    });
    setOpenModal(true);
  }

  const btnInfoNoSave = () =>{
    setDatos({
      titulo: 'PENDIENTE POR REGISTRAR',
      contenido: `Puedes guardar el resultado en cualqueir momento,
                  siempre y cuando sea una hora antes del partido :).`
    });
    setOpenModal(true);
  }

  const handleCloseModal = () =>{
    setOpenModal(false);
  }

  const handleCloseModalInfo = () =>{
    setOpenModalInfo(false);
  }
  
    function addIcon(idpartido){
    let ban = false;
    let r;
    for(let i = 0; i < resultadosapostados.length; i++){
      r = resultadosapostados[i];
      if(r.id_partido === idpartido){
        ban = true;
        break;
      }
    }
    return ban;
  }

  return (
    <>
    {openModal &&
      <ModalInfoSave 
      keepMounted
      open={openModal}
      onClose={handleCloseModal}
      classes={{maxWidth:'200', maxHeight:'400' }}
      datos={datos}
    />}

    {openModalInfo &&
          <ModalInformativo 
          keepMounted
          open={openModalInfo}
          onClose={handleCloseModalInfo}
          classes={{maxWidth:'200', maxHeight:'400' }}
        />}
    
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <CssBaseline />
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          {isSmUp ? null : (
            <Navigator
              PaperProps={{ style: { width: drawerWidth } }}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              setComponente={setComponente}
              setMobileOpen={setMobileOpen}
            />
          )}
          <Navigator
            PaperProps={{ style: { width: drawerWidth } }}
            sx={{ display: { sm: 'block', xs: 'none' } }}
            setComponente={setComponente}
            open={mobileOpen}
            setMobileOpen={setMobileOpen}
          />
        </Box>


        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Header onDrawerToggle={handleDrawerToggle} nombre={usuario?.nombres || ''} vista="home"/>
          <Box component="main" sx={{ flex: 1, py: componente === 'Reglas' ? 3 : 6, px: componente === 'Usuarios' ? 3 : 1, bgcolor: '#eaeff1' }}>
           <Contenedor>
                  {componente === 'Perfil' && <Perfil  />}
                  {componente === 'Usuarios' ? usuario?.tipousuario === 'ROOT' || usuario?.tipousuario === 'ADMIN' ? <Usuarios /> : <InfoGeneral /> : null}
                  {componente === 'Reglas' && <Reglas  />}
                  {componente === 'Reglas Fase Final' && <ReglasFinales  />}
                  {componente === 'Posiciones' && <Posiciones  sinpremio={false} />}
                  {componente === 'Posiciones Finales' && <PosicionesFinales />}
                  {componente === 'Final Soñada' && <FinalDeseada />}
                  {componente === 'Resultados' && <Resultados  />}
                  {componente === 'FECHA 1' && 
                  <>
                  <Grid container spacing={2} display='flex' justifyContent='center' alignItems='center'>
                    {obtenerpartidos.filter(f => f.jornada === 'FECHA1').map((row) =>( 
                        <Grid item xs={12} md={12} lg={5}>
                          <TableContainer> 
                            <Table sx={{ minWidth: 230, maxWidth: 430 }} aria-label="simple table">
                              <TableHead>
                                <TableRow key={row.id_partido}>
                                  <StyledTableCell style={{ display: 'flex' }}>
                                    <Grid xs={10} md={10} lg={10}>
                                      GRUPO { row.grupo }
                                    </Grid>
                                    <Grid xs={2} md={2} lg={2}>
                                  	{addIcon(row.id_partido)?
                                      <IconButton
                                        size="large"
                                        color="inherit"
                                        onClick={() => btnInfoSave()}
                                        >
                                          <CheckCircleIcon />
                                        </IconButton>:
                                        <IconButton
                                        size="large"
                                        color="inherit"
                                        onClick={() => btnInfoNoSave()}
                                        >
                                          <Badge badgeContent={'i'} color="error">
                                            <HelpOutlineIcon /> 
                                          </Badge>
                                        </IconButton>}
                                    </Grid>
                                  </StyledTableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                <Partidos
                                  key={row.id_partido}
                                  datosapuesta={datosapuesta}
                                  id_partido={row.id_partido}
                                  fecha={formatearFecha(row.fecha)}
                                  fechavalidacion={row.fecha}
                                  equipo1={row.equipouno}
                                  icon1={row.iconuno}
                                  equipo2={row.equipodos}
                                  icon2={row.icondos}
                                  descripcion = 'MUNDIAL QATAR 2022'
                                  estado={row.estado}
                                  setPendientes={setPendientes}
                                />
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Grid>
                    ))}
                    {/* <Grid item xs={12} display='flex' justifyContent='center' alignItems='center'>
                      <Button
                        type='button'
                        variant='contained'
                        color='primary'
                        onClick={() => btnResultados()}
                      >
                        GUARDAR RESULTADOS
                      </Button>

                    </Grid> */}

                  </Grid>
                  <Box style={{ bottom:'30px', right:'30px', position:'fixed' }} >
                      {usuario.estado === 'DEBE' ?
                        <>
                        <Typography style={{ fontSize:'1em' }} color='red'>CANCELA LA CUOTA PARA PARTICIPAR</Typography>

                        </> 
                      :<Fab color='primary' aria-label="add"  onClick={() => btnResultados('GRUPOS')}>
                        <SaveIcon /> {pendientes === 0 ? '' :  pendientes > 9 ? <b> 9+</b> : <b> {pendientes}</b> }
                        {/* <SaveIcon /> {pendientes !== 0 && <b> {pendientes}</b> } */}
                      </Fab> }
                  </Box>

                  </>
                }
                {componente === 'FECHA 2' &&
                <>
                <Grid container spacing={2} display='flex' justifyContent='center' alignItems='center'>
                    {obtenerpartidos.filter(f => f.jornada === 'FECHA2').map((row) =>( 
                        <Grid item xs={12} md={12} lg={5}>
                          <TableContainer> 
                            <Table sx={{ minWidth: 230, maxWidth: 430 }} aria-label="simple table">
                              <TableHead>
                                <TableRow key={row.id_partido}>
                                  <StyledTableCell style={{ display: 'flex' }}>
                                    <Grid xs={10} md={10} lg={10}>
                                      GRUPO { row.grupo }
                                    </Grid>
                                    <Grid xs={2} md={2} lg={2}>
                                    {addIcon(row.id_partido)?
                                      <IconButton
                                        size="large"
                                        color="inherit"
                                        onClick={() => btnInfoSave()}
                                        >
                                          <CheckCircleIcon />
                                        </IconButton>:
                                        <IconButton
                                        size="large"
                                        color="inherit"
                                        onClick={() => btnInfoNoSave()}
                                        >
                                          <Badge badgeContent={'i'} color="error">
                                            <HelpOutlineIcon /> 
                                          </Badge>
                                        </IconButton>}
                                    </Grid>
                                  </StyledTableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                <Partidos
                                  key={row.id_partido}
                                  datosapuesta={datosapuesta}
                                  id_partido={row.id_partido}
                                  fecha={formatearFecha(row.fecha)}
                                  fechavalidacion={row.fecha}
                                  equipo1={row.equipouno}
                                  icon1={row.iconuno}
                                  equipo2={row.equipodos}
                                  icon2={row.icondos}
                                  descripcion = 'MUNDIAL QATAR 2022 FECHA 2'
                                  estado={row.estado}
                                  setPendientes={setPendientes}
                                />
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Grid>
                    ))}
                    {/* <Grid item xs={12} display='flex' justifyContent='center' alignItems='center'>
                      <Button
                        type='button'
                        variant='contained'
                        color='primary'
                        onClick={() => btnResultados()}
                      >
                        GUARDAR RESULTADOS
                      </Button>
                    </Grid> */}
                  </Grid>
                  <Box style={{ bottom:'30px', right:'30px', position:'fixed' }} >
                      {usuario.estado === 'DEBE' ?
                        <>
                        <Typography style={{ fontSize:'1em' }} color='red'>CANCELA LA CUOTA PARA PARTICIPAR</Typography>
                        </> 
                      :
                      <Fab color='primary' aria-label="add"  onClick={() => btnResultados('GRUPOS')}>
                        <SaveIcon /> {pendientes === 0 ? '' :  pendientes > 9 ? <b> 9+</b> : <b> {pendientes}</b> }
                      </Fab> }
                </Box>
                </> 
                }
                {componente === 'FECHA 3' && 
                <>
                <Grid container spacing={2} display='flex' justifyContent='center' alignItems='center'>
                  {obtenerpartidos.filter(f => f.jornada === 'FECHA3').map((row) =>( 
                      <Grid item xs={12} md={12} lg={5}>
                        <TableContainer> 
                          <Table sx={{ minWidth: 230, maxWidth: 430 }} aria-label="simple table">
                            <TableHead>
                              <TableRow key={row.id_partido}>
                              <StyledTableCell style={{ display: 'flex' }}>
                                    <Grid xs={10} md={10} lg={10}>
                                      GRUPO { row.grupo }
                                    </Grid>
                                    <Grid xs={2} md={2} lg={2}>
                                    {addIcon(row.id_partido)?
                                      <IconButton
                                        size="large"
                                        color="inherit"
                                        onClick={() => btnInfoSave()}
                                        >
                                          <CheckCircleIcon />
                                        </IconButton>:
                                        <IconButton
                                        size="large"
                                        color="inherit"
                                        onClick={() => btnInfoNoSave()}
                                        >
                                          <Badge badgeContent={'i'} color="error">
                                            <HelpOutlineIcon /> 
                                          </Badge>
                                        </IconButton>}
                                    </Grid>
                                  </StyledTableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <Partidos
                                key={row.id_partido}
                                datosapuesta={datosapuesta}
                                id_partido={row.id_partido}
                                fecha={formatearFecha(row.fecha)}
                                fechavalidacion={row.fecha}
                                equipo1={row.equipouno}
                                icon1={row.iconuno}
                                equipo2={row.equipodos}
                                icon2={row.icondos}
                                descripcion = 'MUNDIAL QATAR 2022 FECHA 3'
                                estado={row.estado}
                                setPendientes={setPendientes}
                              />
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Grid>
                  ))}
                  {/* <Grid item xs={12} display='flex' justifyContent='center' alignItems='center'>
                    <Button
                      type='button'
                      variant='contained'
                      color='primary'
                      onClick={() => btnResultados()}
                    >
                      GUARDAR RESULTADOS
                    </Button>
                  </Grid> */}
                </Grid> 
                <Box style={{ bottom:'30px', right:'30px', position:'fixed' }} >
                    {usuario.estado === 'DEBE' ?
                      <>
                      <Typography style={{ fontSize:'1em' }} color='red'>CANCELA LA CUOTA PARA PARTICIPAR</Typography>

                      </> 
                      :
                      <Fab color='primary' aria-label="add"  onClick={() => btnResultados('GRUPOS')}>
                      <SaveIcon /> {pendientes === 0 ? '' :  pendientes > 9 ? <b> 9+</b> : <b> {pendientes}</b> }
                      </Fab> }
                  </Box>
                  </>
              }
              {componente === 'Octavos de Final' && 
              <>
              <Grid container spacing={2} display='flex' justifyContent='center' alignItems='center'>
                {obtenerpartidos.filter(f => f.jornada === 'OCTAVOS').map((row) =>( 
                  <Grid item xs={12} md={12} lg={5}>
                    <TableContainer> 
                      <Table sx={{ minWidth: 230, maxWidth: 430 }} aria-label="simple table">
                        <TableHead>
                          <TableRow key={row.id_partido}>
                            <StyledTableCell style={{ display: 'flex' }}>
                              <Grid xs={10} md={10} lg={10}>
                                OCTAVOS DE FINAL
                              </Grid>
                              <Grid xs={2} md={2} lg={2}>
                              {addIcon(row.id_partido)?
                                <IconButton
                                  size="large"
                                  color="inherit"
                                  onClick={() => btnInfoSave()}
                                  >
                                    <CheckCircleIcon />
                                  </IconButton>:
                                  <IconButton
                                  size="large"
                                  color="inherit"
                                  onClick={() => btnInfoNoSave()}
                                  >
                                    <Badge badgeContent={'i'} color="error">
                                      <HelpOutlineIcon /> 
                                    </Badge>
                                  </IconButton>}
                              </Grid>
                            </StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <Octavosfinal
                            key={row.id_partido}
                            datosapuesta={datosapuesta}
                            id_partido={row.id_partido}
                            fecha={formatearFecha(row.fecha)}
                            fechavalidacion={row.fecha}
                            idequipo1={row.equipo_uno}
                            idequipo2={row.equipo_dos}
                            equipo1={row.equipouno}
                            icon1={row.iconuno}
                            equipo2={row.equipodos}
                            icon2={row.icondos}
                            descripcion = 'MUNDIAL QATAR 2022'
                            estado={row.estado}
                            setPendientes={setPendientes}
                          />
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                ))} 
              </Grid>
              <Box style={{ bottom:'30px', right:'30px', position:'fixed' }} >
                {usuario.octavos === 'FALSE' ?
                  <>
                  <Typography style={{ fontSize:'1em' }} color='red'>CANCELA LA CUOTA PARA PARTICIPAR</Typography>
                  </> 
                  :
                  <Fab color='primary' aria-label="add"  onClick={() => btnResultados('FINALES')}>
                    <SaveIcon /> {pendientes === 0 ? '' :  pendientes > 9 ? <b> 9+</b> : <b> {pendientes}</b> }
                  </Fab> }
              </Box>
              </>             
              }
            </Contenedor> 
          </Box>
          <Box component="footer" sx={{ p: 2, bgcolor: '#eaeff1' }}>
            <Copyright />
          </Box>
        </Box>

      </Box>
    </ThemeProvider>
    </>
  );
}

function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="">
          UPARSOFT
        </Link>{' '}
        {new Date().getFullYear()}.
      </Typography>
    );
}
 
export default Home;