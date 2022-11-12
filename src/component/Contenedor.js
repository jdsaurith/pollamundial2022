import React, { useState } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { color } from '@mui/system';


const DashboardLayoutRoot = styled('div')(({ theme }) => ({
    display: 'flex',
    flex: '1 1 auto',
    maxWidth: '100%',
    // paddingTop: 64,
    // [theme.breakpoints.up('lg')]: {
    //   paddingLeft: 1
    // }
  }));

const Contenedor = (props) => {
    const { children } = props;
    return ( 
        <>
            <DashboardLayoutRoot>
                <Box
                    sx={{
                        display: 'flex',
                        flex: '1 1 auto',
                        flexDirection: 'row',
                        width: '100%',
                    }}
                >
                    {children}
                </Box>
            </DashboardLayoutRoot>
        </>
     );
}
 
export default Contenedor;