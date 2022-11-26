import React, { useState, useEffect } from 'react';
import { Avatar, Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Paper } from '@mui/material';

const background = '/imagenes/card/copaeditada.jpg'
const background2 = '/imagenes/card/copaverde.jpg'
const background3 = '/imagenes/card/logo.png'
const InfoGeneral = () => {
  return (
    <div style={{ marginBottom: '1em', display: 'flex', justifyContent: 'center' }}>
      <Box
        sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
            m: 1,
            width: 150,
            height: 150,
        },
        }}
        >              
           <Paper elevation={3}>
            <Grid container  >
                <Grid item xs={3} display='flex' justifyContent='flex-start' >
                    <Avatar 
                    variant="rounded"
                    alt="trofeo"
                    style={{ width: '50px', height: '100px',  }}
                    src={background}
                    >
                        Copa
                    </Avatar>
                </Grid>
                <Grid item xs={9} display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                    <Grid container>
                        <Grid item xs={12} display='flex' justifyContent='center' alignItems='center' >
                            {/* <Avatar 
                            style={{ width: '60px', height: '60px',  }}
                            >
                                <span style={{ fontSize:'2em', color:'black' }}>12</span>
                            </Avatar> */}
                            <span style={{ fontSize:'3em', color:'black' }}>12</span>
                        </Grid>
                        <Grid xs={12} display='flex' justifyContent='center' alignItems='flex-end'>
                            <span style={{ fontSize:'0.9em',  }}>Posición General</span>
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>
                     
            </Paper>

            <Paper elevation={3}>            
                <div style={{ display:'flex', justifyContent:'center', alignItems:'flex-start', width:'150px', height:'150px', backgroundImage: `url(${background3})`, backgroundSize:'cover' }}>
                
                    <Grid container display='flex' flexDirection={'column'} justifyContent='space-between'>
                        <Grid xs={12} display='flex' justifyContent='center' alignItems='flex-end' mt={2} >                            
                            <span style={{ fontSize:'3em', color:'black'}}>12</span>
                        </Grid>
                        <Grid xs={12} display='flex' justifyContent='center' alignItems='flex-end' mt={1} >
                            <span style={{ fontSize:'0.9em',  }}>Posición General</span>
                        </Grid>
                    </Grid>
                    
                </div>
            </Paper>
        
        </Box>
    </div>
  )
}

export default InfoGeneral
