import React , { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

import Header from '../component/Header';
import Navigator from '../component/Navigator';
import Contenedor from '../component/Contenedor';
import Partidos from '../component/Partidos';
import Usuarios from '../component/Usuarios';
import Reglas from '../component/Reglas';
import Posiciones from '../component/Posiciones';
import Resultados from '../component/Resultados';

import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch  } from 'react-redux'
import { Grid, Paper, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from '@mui/material';
import styled from '@emotion/styled';

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

const equipos = [
  {
    id: 'GrupoA',
    fecha1: [
      {
        equipo1: 'Qatar',
        icon1: '/imagenes/qat.png',
        equipo2: 'Ecuador',
        icon2: '/imagenes/ecu.png', 
        descripcion: 'partido interesante Qatar vs Ecuador',
        fecha: '20 de Nov 13:00',    
      },
      {
        equipo1: 'Senegal',
        equipo2: 'Paises Bajos',
        icon1: '/imagenes/sen.png',
        icon2: '/imagenes/hol.png',
        descripcion: 'partido interesante  Senegal de mane vs Holanda ',
        fecha: '21 de Nov 13:00',
      },
    ],
    // fecha2: [
    //   {
    //     equipo1: 'Qatar',
    //     icon1: '/imagenes/qat.png',
    //     equipo2: 'Ecuador',
    //     icon2: '/imagenes/ecu.png', 
    //     descripcion: 'partido interesante Qatar vs Ecuador',
    //     fecha: '20 de Nov 13:00',    
    //   },
    //   {
    //     equipo1: 'Senegal',
    //     equipo2: 'Paises Bajos',
    //     icon1: '/imagenes/sen.png',
    //     icon2: '/imagenes/hol.png',
    //     descripcion: 'partido interesante  Senegal de mane vs Holanda ',
    //     fecha: '21 de Nov 13:00',
    //   },
    // ],
  },

  {
    id: 'GrupoB',
    fecha1: [
      {
        equipo1: 'Inglaterra',
        icon1: '/imagenes/ing.png',
        equipo2: 'Irán',
        icon2: '/imagenes/ira.png',
        descripcion: 'partido interesante Inglaterra Favorito',
        fecha: '21 de Nov 10:00',
      },
      {
        equipo1: 'Estados Unidos',
        icon1: '/imagenes/usa.png',
        equipo2: 'Gales',
        icon2: '/imagenes/gal.png',
        descripcion: 'partido interesante',
        fecha: '21 de Nov 16:00',
      },
    ],
    // fecha2: [
    //   {
    //     equipo1: 'Inglaterra',
    //     icon1: '/imagenes/ing.png',
    //     equipo2: 'Irán',
    //     icon2: '/imagenes/ira.png',
    //     descripcion: 'partido interesante Inglaterra Favorito',
    //     fecha: '21 de Nov 10:00',
    //   },
    //   {
    //     equipo1: 'Estados Unidos',
    //     icon1: '/imagenes/usa.png',
    //     equipo2: 'Gales',
    //     icon2: '/imagenes/gal.png',
    //     descripcion: 'partido interesante',
    //     fecha: '21 de Nov 16:00',
    //   },
    // ],
  },

  {
    id: 'GrupoC',   
    fecha1: [
      {
        equipo1: 'Argentina',
        icon1: '/imagenes/arg.png',
        equipo2: 'Arabia Saudí',
        icon2: '/imagenes/ara.png',
        descripcion: 'partido interesante Gana Argentina',
        fecha: '22 de Nov 7:00',
      },
      {
        equipo1: 'México',
        icon1: '/imagenes/mex.png',
        equipo2: 'Polonia',
        icon2: '/imagenes/pol.png',
        descripcion: 'partido interesante',
        fecha: '22 de Nov 13:00',
      },
    ],
  },

  {
    id: 'GrupoD',   
    fecha1: [
      {
        equipo1: 'Dinamarca',
        icon1: '/imagenes/din.png',
        equipo2: 'Túnez',
        icon2: '/imagenes/tun.png',
        descripcion: 'partido interesante ',
        fecha: '22 de Nov 10:00',
      },
      {
        equipo1: 'Francia',
        icon1: '/imagenes/fra.png',
        equipo2: 'Australia',
        icon2: '/imagenes/aus.png',
        descripcion: 'partido interesante',
        fecha: '22 de Nov 16:00',
      },
    ],
  },

  {
    id: 'GrupoE',   
    fecha1: [
      {
        equipo1: 'Alemania',
        icon1: '/imagenes/ale.png',
        equipo2: 'Japón',
        icon2: '/imagenes/jap.png',
        descripcion: 'partido interesante ',
        fecha: '23 de Nov 10:00',
      },
      {
        equipo1: 'España',
        icon1: '/imagenes/esp.png',
        equipo2: 'Costa Rica',
        icon2: '/imagenes/cos.png',
        descripcion: 'partido interesante',
        fecha: '23 de Nov 13:00',
      },
    ],
  },

  {
    id: 'GrupoF',   
    fecha1: [
      {
        equipo1: 'Marruecos',
        icon1: '/imagenes/marr.png',
        equipo2: 'Croacia',
        icon2: '/imagenes/cro.png',
        descripcion: 'partido interesante ',
        fecha: '23 de Nov 07:00',
      },
      {
        equipo1: 'Bélgica',
        icon1: '/imagenes/bel.png',
        equipo2: 'Canadá',
        icon2: '/imagenes/can.png',
        descripcion: 'partido interesante',
        fecha: '23 de Nov 16:00',
      },
    ],
  },

  {
    id: 'GrupoG',   
    fecha1: [
      {
        equipo1: 'Suiza',
        icon1: '/imagenes/sui.png',
        equipo2: 'Camerún',
        icon2: '/imagenes/cam.png',
        descripcion: 'partido interesante ',
        fecha: '24 de Nov 07:00',
      },
      {
        equipo1: 'Brasil',
        icon1: '/imagenes/bra.png',
        equipo2: 'Serbia',
        icon2: '/imagenes/ser.png',
        descripcion: 'partido interesante',
        fecha: '24 de Nov 16:00',
      },
    ],
  },

  {
    id: 'GrupoH',   
    fecha1: [
      {
        equipo1: 'Uruguay',
        icon1: '/imagenes/uru.png',
        equipo2: 'Corea del Sur',
        icon2: '/imagenes/kor.png',
        descripcion: 'partido interesante ',
        fecha: '24 de Nov 07:00',
      },
      {
        equipo1: 'Portugal',
        icon1: '/imagenes/por.png',
        equipo2: 'Ghana',
        icon2: '/imagenes/gha.png',
        descripcion: 'partido interesante',
        fecha: '24 de Nov 13:00',
      },
    ],
  }
    
    
    
  
]


const Home = () => {  
  const history = useHistory();
  const [cerrarsesion, setCerrarSesion] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
  const [componente, setComponente] = useState('Usuarios');

  const usuario = useSelector(state => state.auth.usuario);
  const conectado = useSelector(state =>state.auth.conectado);

  useEffect(() => {
    if(!conectado) history.push("/");
  }, [conectado])

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
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
              
            />
          )}
          <Navigator
            PaperProps={{ style: { width: drawerWidth } }}
            sx={{ display: { sm: 'block', xs: 'none' } }}
            setComponente={setComponente}
          />
        </Box>


        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Header onDrawerToggle={handleDrawerToggle} nombre={usuario.nombres} vista="home"/>
          <Box component="main" sx={{ flex: 1, py: 6, px: 4, bgcolor: '#eaeff1' }}>
           <Contenedor>
                 {componente === 'Usuarios' ? usuario.tipousuario === 'ROOT' || usuario.tipousuario === 'ADMIN' ? <Usuarios  /> : <Reglas  /> : null}
                 {componente === 'Reglas' && <Reglas  />}
                 {componente === 'Posiciones' && <Posiciones  />}
                 {componente === 'Resultados' && <Resultados  />}
                 {componente === 'FECHA 1' && 
                  <Grid container spacing={2} display='flex' justifyContent='center' alignItems='center'>
                    {equipos.map((row) =>( 
                        <Grid item xs={5}>               
                          <TableContainer > 
                            <Table sx={{ minWidth: 350 }} aria-label="simple table">
                              <TableHead>
                                <TableRow key={row.id}>
                                  <StyledTableCell>{ row.id }</StyledTableCell>                                            
                                </TableRow>
                              </TableHead>
                              <TableBody>
                              {row.fecha1.map(({ fecha, equipo1, equipo2, icon1, icon2, descripcion }) =>(
                                <Partidos 
                                  key={fecha}
                                  partidos={'f1'}
                                  fecha={fecha}
                                  equipo1={equipo1}
                                  icon1={icon1}
                                  equipo2={equipo2}
                                  icon2={icon2}
                                  descripcion = {descripcion} 
                                /> 
                              ))}
                              </TableBody>                                            
                            </Table>                                        
                          </TableContainer>
                        </Grid>                
                    ))}
                  </Grid> 
                 }
                 {componente === 'FECHA 2' && <Partidos partidos='f2' />}
                 {componente === 'FECHA 3' && <Partidos  partidos='f3' />}
            </Contenedor> 
          </Box>
          <Box component="footer" sx={{ p: 2, bgcolor: '#eaeff1' }}>
            <Copyright />
          </Box>
        </Box>
        
      </Box>
    </ThemeProvider>
    
  );
}

function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="">
          JDSAURITH
        </Link>{' '}
        {new Date().getFullYear()}.
      </Typography>
    );
}
 
export default Home;