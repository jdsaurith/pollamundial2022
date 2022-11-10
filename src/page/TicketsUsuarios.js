import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Box, CssBaseline } from '@mui/material';

import Header from '../component/Header';
import Formulario from '../component/Formulario';

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

const TicketsUsuarios = () => {

    const [mobileOpen, setMobileOpen] = useState(false);
    // const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return ( 
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <CssBaseline />
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Header nombre="Soporte de Tickets" vista="ticket"/>
                    <Box component="main" sx={{ flex: 1, py: 6, px: 4, bgcolor: '#eaeff1' }}>
                        <Formulario />
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
     );
}
 
export default TicketsUsuarios;