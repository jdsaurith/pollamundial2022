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
import { Box, Divider, MenuItem } from '@mui/material';
import Menu from '@mui/material/Menu';

import { useDispatch, useSelector } from 'react-redux';
import { cerrarSesionAction } from '../action/authAction';
import { habilitarPerfilAction, desahabilitarPerfilAction } from '../action/usuarioAction';



const lightColor = 'rgba(255, 255, 255, 0.7)';

const settings = ['Perfil', 'Cerrar Sesión'];

const Header = (props) => {
    const dispatch = useDispatch();
    const { onDrawerToggle, nombre } = props; 
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const cerrarSesion = () => dispatch(cerrarSesionAction());
    const habilitarPerfil = () =>dispatch(habilitarPerfilAction());
    const desahabilitarPerfil = () => dispatch(desahabilitarPerfilAction());
    const usuario = useSelector(state => state.auth.usuario);
   
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = (setting) => {
        // console.log(setting);
        if(setting === 'Cerrar Sesión') {desahabilitarPerfil(); cerrarSesion();}
        if(setting === 'Perfil') habilitarPerfil();
        setAnchorElUser(null);
    };
    

    return ( 
        <React.Fragment>
            <AppBar color="primary" position="sticky" elevation={0}>
                <Toolbar>
                    <Grid container display='flex' justifyContent='space-between'  alignItems='center'>
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
                        <Grid item />                        
                        <Grid sx={{ lg: { display: 'flex', justifyContent:'flex-end' } }} item>                      
                      
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt="balon" src="/imagenes/card/balon.jpg" />
                                    </IconButton>                                   
                                </Tooltip>                                
                                <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                                >
                                <Typography display={'flex'} flexDirection='column' p={2}>
                                    <span style={{ fontSize:'1em', fontWeight:'bold', padding:'1', margin: '2'  }}>{nombre}</span>
                                    <span style={{ fontSize:'1em', fontWeight:'normal'  }}>@{ usuario?.usuario }</span>
                                </Typography>
                                
                                <Divider />
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                                </Menu>
                            </Box>                                              
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