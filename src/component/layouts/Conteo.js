import React, { useState, useEffect } from 'react';
import { Box, Grid, Paper } from '@mui/material';
import { getRemainingTime } from '../../helpers';


const Conteo = (props) => {
    const {setViewconteo} = props;
    const [tiempo, setTiempo] = useState({});   
    console.log(getRemainingTime('Nov 20 2022 12:00:00 GMT-0300'));

    useEffect(() => {
        const timerUpdate = setInterval( () => {
            let t = getRemainingTime('Nov 20 2022 12:00:00 GMT-0300');
            setTiempo({dias: t.remainDays, horas: t.remainHours, minutos: t.remainMinutes, segundos: t.remainSeconds})       
        
            if(t.remainTime <= 1) {
              clearInterval(timerUpdate);
              setViewconteo(false);            
            }
        
        }, 1000)
    }, [])

  return (
    <div style={{ marginBottom: '1em' }}>
      <span style={{ fontSize: '3em', display:'flex', justifyContent: 'center' }}>Comienza en:</span>
      <Box
        sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
            m: 1,
            width: 200,
            height: 132,
        },
        }}
        >              
            <Paper elevation={3}>
                <Grid container direction="column" display="flex" justifyContent="center" alignItems="center">
                    <Grid xs={12}>
                        <span style={{ fontSize: '4em', margin: '0' }}>{tiempo?.dias || 0}</span>
                    </Grid>
                    <Grid xs={12}>
                        <span>DÍAS</span>
                    </Grid>
                </Grid>            
            </Paper>
            <Paper elevation={3}>
                <Grid container direction="column" display="flex" justifyContent="center" alignItems="center">
                    <Grid xs={12}>
                        <span style={{ fontSize: '4em', margin: '0' }}>{tiempo?.horas || 0}</span>
                    </Grid>
                    <Grid xs={12}>
                        <span>HORAS</span>
                    </Grid>
                </Grid>
            </Paper>
            <Paper elevation={3}>
                <Grid container direction="column" display="flex" justifyContent="center" alignItems="center">
                    <Grid xs={12}>
                        <span style={{ fontSize: '4em', margin: '0' }}>{tiempo?.minutos || 0}</span>
                    </Grid>
                    <Grid xs={12}>
                        <span>MINUTOS</span>
                    </Grid>
                </Grid>
            </Paper>
            <Paper elevation={3}>
                <Grid container direction="column" display="flex" justifyContent="center" alignItems="center">
                    <Grid xs={12}>
                        <span style={{ fontSize: '4em', margin: '0' }}>{tiempo?.segundos || 0}</span>
                    </Grid>
                    <Grid xs={12}>
                        <span>SEGUNDOS</span>
                    </Grid>
                </Grid>
            </Paper>
            
        </Box>
    </div>
  )
}

export default Conteo
