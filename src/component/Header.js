import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Link from '@mui/material/Link';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import { useDispatch, useSelector } from 'react-redux';
import { cerrarSesionAction } from '../action/authAction';

const lightColor = 'rgba(255, 255, 255, 0.7)';

const Header = (props) => {
    const dispatch = useDispatch();
    const { onDrawerToggle, nombre } = props; 
    const cerrarSesion = () => dispatch(cerrarSesionAction());
    
    
    const bntcerrarSesion = () =>{
        cerrarSesion();
    }
   

    return ( 
        <React.Fragment>
            <AppBar color="primary" position="sticky" elevation={0}>
                <Toolbar>
                    <Grid container spacing={1} alignItems="center">
                        <Grid sx={{ display: { sm: 'none', xs: 'block' } }} item>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={onDrawerToggle}
                                edge="start"
                            >
                                <MenuIcon />
                            </IconButton>
                        </Grid>
                        <Grid item xs />
                        <Grid container alignItems="center" spacing={1} padding={1.5}>
                        <Grid item xs>
                            <Typography color="inherit" variant="h6" component="h3">
                                {nombre}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button
                                sx={{ borderColor: lightColor }}
                                variant="outlined"
                                color="inherit"
                                size="small"
                                onClick={() => bntcerrarSesion()}
                            >
                                Cerrar Sesión
                            </Button>
                        </Grid>                        
                    </Grid>                 
                    </Grid>
                </Toolbar>
            </AppBar>
            
        </React.Fragment>
     );
}

Header.propTypes = {
    onDrawerToggle: PropTypes.func.isRequired,
};
 
export default Header;