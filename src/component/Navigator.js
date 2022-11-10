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
import PermMediaOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActual';
import PublicIcon from '@mui/icons-material/Public';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import TimerIcon from '@mui/icons-material/Timer';
import SettingsIcon from '@mui/icons-material/Settings';
import PhonelinkSetupIcon from '@mui/icons-material/PhonelinkSetup';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';

import Contenedor from './Contenedor';

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
      id: 'Administración',
      children: [
        {
          id: 'Usuarios',
          icon: <PeopleIcon />,
          // active: true,
        },
        { id: 'Reglas', icon: <DnsRoundedIcon /> },
        { id: 'Resultados', icon: <PermMediaOutlinedIcon /> },
      ],
    },
    {
      id: 'Jugar',
      children: [
        { id: 'FECHA 1', icon: <SettingsIcon /> },
        { id: 'FECHA 2', icon: <TimerIcon /> },
        { id: 'FECHA 3', icon: <PhonelinkSetupIcon /> },
      ],
    },
  ];

const Navigator = (props) => {
    const { ...other } = props;
    
    const btnListado = (id) => {
      console.log("click en el boton" + " " + id);
      return (<Contenedor nombre="Navigator" />)
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
                        <ListItem button onClick={() => btnListado(childId)} disablePadding key={childId} >
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