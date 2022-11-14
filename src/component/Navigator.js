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

import { useSelector } from 'react-redux'

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
        { id: 'Posiciones', icon: <DnsRoundedIcon /> },
      ],
    },
    {
      id: 'FECHAS FIFA',
      children: [
        { id: 'FECHA 1', icon: <SportsIcon /> },
        { id: 'FECHA 2', icon: <SportsIcon /> },
        { id: 'FECHA 3', icon: <SportsIcon /> },
      ],
    },
  ];

const Navigator = (props) => {
    const { setComponente, ...other} = props;
    const usuarioadmin = useSelector(state => state.auth.usuario);
    
    
    const btnListado = (id) => {
      return setComponente(id);
    }
    return ( 
        <Drawer variant="permanent" {...other}>
            <List disablePadding>
                <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, color: '#fff' }}>
                    POLLA 2022
                </ListItem>
                {categories.map(({ id, children }) => (
                    <Box key={id} sx={{ bgcolor: '#101F33' }}>
                        <ListItem sx={{ py: 2, px: 3 }}>
                            <ListItemText sx={{ color: '#fff' }}>{id}</ListItemText>
                        </ListItem>
                        {children.map(({ id: childId, icon, active }) => (
                          childId === 'Usuarios' ? usuarioadmin?.tipousuario === 'ROOT' || usuarioadmin?.tipousuario === 'ADMIN' 
                          ? 
                          <ListItem  button onClick={() => btnListado(childId)} disablePadding key={childId}>
                              <ListItemButton selected={active} sx={item}>
                              <ListItemIcon>{icon}</ListItemIcon>
                              <ListItemText>{childId}</ListItemText>
                              </ListItemButton>
                          </ListItem>
                          :null
                          :
                          <ListItem  button onClick={() => btnListado(childId)} disablePadding key={childId}>
                            <ListItemButton selected={active} sx={item}>
                            <ListItemIcon>{icon}</ListItemIcon>
                            <ListItemText>{childId}</ListItemText>
                            </ListItemButton>
                          </ListItem>
                            
                        ))}

                        <Divider sx={{ mt: 2 }} />
                    </Box>
                ))}
            </List>
        </Drawer>
     );
}
 
export default Navigator;