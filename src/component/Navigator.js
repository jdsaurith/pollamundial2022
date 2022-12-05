import React from 'react';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';

//Icon //////
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import RuleIcon from '@mui/icons-material/Rule';
import SportsIcon from '@mui/icons-material/Sports';
import PublicIcon from '@mui/icons-material/Public';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import TimerIcon from '@mui/icons-material/Timer';
import SettingsIcon from '@mui/icons-material/Settings';
import PhonelinkSetupIcon from '@mui/icons-material/PhonelinkSetup';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';

import { useSelector, useDispatch } from 'react-redux';
import { desahabilitarPerfilAction } from '../action/usuarioAction';
const item = {
    py: '2px',
    px: 3,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover, &:focus': {
      bgcolor: 'rgba(255, 255, 255, 0.08)',
    },
  };  
const itemCategory = {
    boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
    py: 1.5,
    px: 3,
  };
const categories = [
    {
      id: 'DATOS DEL JUEGO',
      children: [
        {
          id: 'Usuarios',
          icon: <PeopleIcon />,
          // active: true,
        },
        { id: 'Reglas', icon: <RuleIcon /> },        
        { id: 'Resultados', icon: <SportsSoccerIcon /> },
        { id: 'Agregar Fechas', icon: <SportsIcon /> },
        // { id: 'Posiciones Fase Grupos', icon: <DnsRoundedIcon /> },
        
      ],
    },
    // {
    //   id: 'FECHAS FIFA',
    //   children: [
    //     { id: 'FECHA 1', icon: <SportsIcon /> },
    //     { id: 'FECHA 2', icon: <SportsIcon /> },
    //     { id: 'FECHA 3', icon: <SportsIcon /> },
        
    //   ],
    // },
    {
      id: 'FASES FINALES',
      children: [
        { id: 'Posiciones Finales', icon: <DnsRoundedIcon /> },
        { id: 'Octavos de Final', icon: <SportsIcon /> },
        { id: 'Reglas Fase Final', icon: <RuleIcon /> },
        { id: 'Final Soñada', icon: <SportsIcon /> },
      ],
    },
  ];

const Navigator = (props) => {
    const { setComponente, setMobileOpen, open, ...other} = props;
    const dispatch = useDispatch();

    const desahabilitarPerfil = () => dispatch(desahabilitarPerfilAction());
    const usuarioadmin = useSelector(state => state.auth.usuario);
    const tipousuario = useSelector(state => state.auth.tipousuario);
    
    // console.log(tipousuario);
    
    const btnListado = (id) => {
      setMobileOpen(!open)
      desahabilitarPerfil();
      return setComponente(id);
    }


    return ( 
        <Drawer variant="permanent" {...other} open={open}>
            <List disablePadding>
                <ListItem sx={{ ...item, ...itemCategory, fontSize: 16, color: '#fff' }}>
                    POLLA 2022
                </ListItem>
                {categories.map(({ id, children }) => (
                    <Box key={id} sx={{ bgcolor: '#101F33' }}>                      
                        <>
                          <ListItem sx={{ py: 2, px: 3 }}>
                              <ListItemText sx={{ color: '#fff' }}>{id}</ListItemText>
                          </ListItem>
                          {children.map(({ id: childId, icon, active }) => (
                            childId === 'Usuarios' 
                            ? 
                            <ListItem  button onClick={() => btnListado(childId)} disablePadding key={childId}>
                                <ListItemButton selected={active} sx={item}>
                                <ListItemIcon>{tipousuario === 'ROOT' ? icon : <HomeIcon /> }</ListItemIcon>
                                <ListItemText>{tipousuario === 'ROOT' ? childId : 'Home'}</ListItemText>
                                </ListItemButton>
                            </ListItem>
                            :    
                            childId === 'Agregar Fechas' 
                            ?                        
                            tipousuario === 'ROOT' ?
                            <ListItem  button onClick={() => btnListado(childId)} disablePadding key={childId}>
                              <ListItemButton selected={active} sx={item}>
                              <ListItemIcon>{icon}</ListItemIcon>
                              <ListItemText>{childId}</ListItemText>
                              </ListItemButton>
                            </ListItem>:null
                            :
                            <ListItem  button onClick={() => btnListado(childId)} disablePadding key={childId}>
                              <ListItemButton selected={active} sx={item}>
                              <ListItemIcon>{icon}</ListItemIcon>
                              <ListItemText>{childId}</ListItemText>
                              </ListItemButton>
                            </ListItem>
                          ))}

                          <Divider sx={{ mt: 2 }} />
                        </>                     
                    </Box>
                ))}
            </List>
        </Drawer>
     );
}
 
export default Navigator;