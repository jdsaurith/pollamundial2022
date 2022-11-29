import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';

import styles from '../../index.css';
import Posiciones from '../Posiciones';
import Puntostorneo from '../puntos/Puntostorneo';
import PuntosFechas from '../puntos/PuntosFechas';

import { useDispatch, useSelector } from 'react-redux';
import { obtenerposicionesAction } from '../../action/resultadoAction';
import { obtenerPuntosTorneoAction } from '../../action/usuarioAction';

const background = '/imagenes/card/trofeo.jpg';
const background1 = '/imagenes/card/puntos.jpg';
const background2 = '/imagenes/card/balon02.jpg';

function returnPosi(arr) {
    let i = 1;
    let posant = 1;
    let sumatoria = 0;
    arr.forEach(us => {
        if((us.puntos + us.aciertos) == sumatoria){
            us.orden = posant;
        }else{
          us.orden = i;
          posant = i;
        }
        i+=1;
        sumatoria = us.puntos + us.aciertos;
    })
    return arr;
  }

const InfoGeneral = () => {
    const [posiciones, setPosiciones] = useState(false);
    const [puntostorneo, setPuntostorneo] = useState(false);
    const [puntosfecha2, setPuntosfecha2] = useState(false);
    const [posicionesfil, guardarposicionesFiltro] = useState();
    const [puntosfechax, setPuntosfechax] = useState();
    
    
    const dispatch = useDispatch();
    const obtenerposiciones = () =>dispatch(obtenerposicionesAction());
    const obtenerPuntosTorneo = (id) => dispatch(obtenerPuntosTorneoAction(id));
    const usuario = useSelector(state => state.auth.usuario);    
    const posicionestabla = useSelector(state => state.resultado.posiciones);
    const puntosfecha = useSelector(state => state.usuario.puntostorneo);
    
    

    useEffect(() => {
        obtenerposiciones();
      }, [])

    useEffect(() => {
        obtenerPuntosTorneo(usuario?.id_usuario);
    }, [])
  
    useEffect(() => {
        if(posicionestabla){
            returnPosi(posicionestabla).map(p => {
                if(p.id_usuario === usuario?.id_usuario){
                    guardarposicionesFiltro(p);
                    return
                }                
           })
        }     
        
    }, [posicionestabla])

    useEffect(() => {
        if(puntosfecha){
           const pf = puntosfecha.filter(f => f.fecha === 'FECHA2');
           setPuntosfechax(pf[0]?.puntos);
        }  
    }, [puntosfecha])


    const btnPosicionGeneral = () =>{
        setPosiciones(true);
        ///los pongo false
        setPuntostorneo(false);
        setPuntosfecha2(false);
    }
    const btnPuntosTorneo = () =>{
        setPuntostorneo(true);
        ///los pongo false
        setPosiciones(false);
        setPuntosfecha2(false);
    }
    const btnPuntosFecha2 = () =>{
        setPuntosfecha2(true);
        ///los pongo false
        setPosiciones(false);
        setPuntostorneo(false);
    }
    
  return (
        <Grid container>        
            <Grid container display='flex' flexDirection='row' justifyContent='center' alignItems='center' spacing={2}>
                <Grid item xs={12} md={4} lg={4} display='flex'>                
                    <div 
                        style={{
                            width: '297px',
                            height: '266px',
                            background: 'rgba(255, 255, 255, 0.48)',
                            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                            backdropFilter: 'blur(17.5px)',                        
                            borderRadius: '10px',  
                            backgroundImage: `url(${background})`,
                            backgroundSize:'cover',
                        }}
                    >
                        <Grid container direction='column' display='flex' justifyContent='center' alignItems='stretch'>                    
                            
                            <Grid xs={12} md={12} lg={12} display='flex' justifyContent='center' alignItems='center'>
                                
                                <div
                                    style={{
                                    // backgroundColor:'red',
                                    width:'113px',
                                    height:'115px', 
                                    marginTop:'60px',
                                    boxSizing: 'border-box',
                                    border: '1px solid rgba(255, 255, 255, 0.6)',
                                    borderRadius:'100%',
                                    background: '#000000',
                                    mixBlendMode: 'normal',
                                    opacity: '0.7',                                    
                                    backdropFilter: 'blur(10px)', 
                                    display:'flex',
                                    justifyContent:'center',
                                    alignItems:'center'
                                }}
                                >
                                    <span
                                    style={{
                                        width:'100px',
                                        height:'80px',
                                        textAlign:'center',
                                        color:'#FFFFFF',
                                        fontWeight:'bold',
                                        fontSize:'50px'
                                    }}
                                    >{posicionesfil?.orden || '-' }</span>
                                </div>
                            </Grid>
                            <Grid item xs={12} md={12} lg={12} display='flex' justifyContent='center'>                            
                                <button className={styles.button} onClick={btnPosicionGeneral} >
                                    Posición General
                                </button>
                            </Grid>
                            
                        </Grid>
                        
                        
                    </div>
                    

                </Grid>

                <Grid item xs={12} md={4} lg={4} display='flex'>
                    <div 
                        style={{
                            background: 'rgba(255, 255, 255, 0.48)',
                            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                            backdropFilter: 'blur(17.5px)',
                            width: '300px',
                            height: '270px',
                            borderRadius: '20px',
                            backgroundImage: `url(${background2})`,
                            backgroundSize:'cover',
                        }}
                    >
                    <Grid container direction='column' display='flex' justifyContent='center' alignItems='stretch' >
                            <Grid item xs={12} md={12} lg={12} display='flex' justifyContent='center' alignItems='center' >
                                <div
                                    style={{
                                        // backgroundColor:'red',
                                        width:'113px',
                                        height:'115px',
                                        marginTop:'60px', 
                                        boxSizing: 'border-box',
                                        border: '1px solid rgba(255, 255, 255, 0.6)',
                                        borderRadius:'100%',
                                        background: '#000000',
                                        mixBlendMode: 'normal',
                                        opacity: '0.7',                                    
                                        backdropFilter: 'blur(10px)', 
                                        display:'flex',
                                        justifyContent:'center',
                                        alignItems:'center'
                                    }}
                                    >
                                        <span
                                        style={{
                                            width:'100px',
                                            height:'80px',
                                            textAlign:'center',
                                            color:'#FFFFFF',
                                            fontWeight:'bold',
                                            fontSize:'50px'
                                        }}
                                        >{posicionesfil?.puntos || 0 }</span>
                                    </div>
                            </Grid>
                            <Grid item xs={12} md={12} lg={12} display='flex' justifyContent='center'>                            
                                <button className={styles.button} onClick={btnPuntosTorneo} >
                                    Puntos en el Torneo
                                </button>
                            </Grid>
                    </Grid>

                    </div>
                </Grid>
                
                <Grid item xs={12} md={4} lg={4}  display='flex' >
                    <div 
                        style={{
                            background: 'rgba(255, 255, 255, 0.48)',
                            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                            backdropFilter: 'blur(17.5px)',
                            width: '297px',
                            height: '266px',
                            borderRadius: '20px',
                            backgroundImage: `url(${background1})`,
                            backgroundSize:'cover',
                        }}
                    >
                    <Grid container direction='column' display='flex' justifyContent='center' alignItems='stretch' >
                            <Grid item xs={12} md={12} lg={12} display='flex' justifyContent='center' alignItems='center' >
                                <div
                                    style={{
                                        // backgroundColor:'red',
                                        width:'113px',
                                        height:'115px',
                                        marginTop:'60px', 
                                        boxSizing: 'border-box',
                                        border: '1px solid rgba(255, 255, 255, 0.6)',
                                        borderRadius:'100%',
                                        background: '#000000',
                                        mixBlendMode: 'normal',
                                        opacity: '0.7',                                    
                                        backdropFilter: 'blur(10px)', 
                                        display:'flex',
                                        justifyContent:'center',
                                        alignItems:'center'
                                    }}
                                    >
                                        <span
                                        style={{
                                            width:'100px',
                                            height:'80px',
                                            textAlign:'center',
                                            color:'#FFFFFF',
                                            fontWeight:'bold',
                                            fontSize:'50px'
                                        }}
                                        >{ puntosfechax || 0 }</span>
                                    </div>
                            </Grid>
                            <Grid item xs={12} md={12} lg={12} display='flex' justifyContent='center'>                            
                                <button onClick={btnPuntosFecha2}>
                                    Puntos Fecha 2
                                </button>
                            </Grid>
                    </Grid>

                    </div>
                        
                </Grid>                            

            </Grid>
            <Grid xs={12} display='flex' justifyContent='center' alignItems='center' mt='20px'>
                {posiciones && <Posiciones sinpremio={true}/>}
                {puntostorneo && <Puntostorneo /> }
                {puntosfecha2 && <PuntosFechas /> }

            </Grid>
        </Grid>
  )
}

export default InfoGeneral
