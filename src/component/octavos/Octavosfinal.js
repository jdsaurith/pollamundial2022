import { Alert, Avatar, Card, CardActions, CardContent, CardHeader, Collapse, FormControl, FormControlLabel, FormLabel, Grid, IconButton, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch, useSelector } from 'react-redux';

import moment from 'moment/moment';

import { formatearFechaDoshoras } from '../../helpers';
import { obtenerResultadosAction, updateStatePartidoAction } from '../../action/resultadoAction';
import styled from '@emotion/styled';


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Octavosfinal = ({ id_partido, datosapuesta, fecha, fechavalidacion, idequipo1, equipo1, icon1, idequipo2, equipo2, icon2, descripcion, estado, setPendientes }) => {

  const dispatch = useDispatch();    
  let fecha2 = new Date(fechavalidacion);
  let numeros = /^[0-9]+$/;
  const [expanded, setExpanded] = React.useState(false);
  const [tiempo, setTiempo] = useState(Date.now()  >= formatearFechaDoshoras(fecha2, 0));
  const [resultadoapostador, setResultadoapostador] = useState();
  const [radiobtn, setRadiobtn] = useState({
    equipoA: false,
    equipoB: false
  });
  const [error, guardarError] = useState(false);
  const [input, setInput] = React.useState({
    retornandovalores: false,
    ganador_penales: 0
  });

  const usuario = useSelector(state => state.auth.usuario);
  const obtenerResultados = (id) =>dispatch(obtenerResultadosAction(id));
  const resultadosapostados = useSelector(state => state.resultado.resultadosapostados);
 
  ///actualizar partido a enjuego
  const updateStatePartido = (id) => dispatch(updateStatePartidoAction(id));
 
  const {retornandovalores, ganador_penales} = input;
  const { equipoA, equipoB } = radiobtn;

  // console.log(fechavalidacion);

  useEffect(() => {
    obtenerResultados(usuario?.id_usuario);
  },[]);

  useEffect(() => {
    setInterval(() => {
      setTiempo(Date.now()  >= formatearFechaDoshoras(fecha2, 0));
    }, 60000);
    if(tiempo && estado ==='INACTIVO'){
      updateStatePartido(id_partido);
    }

  }, [tiempo]);

  useEffect(() => {
    resultadosapostados.map((item) =>{
      if(item.id_partido === id_partido){
        setInput({
          golesequipo1 : item.goles_equipo_uno,
          golesequipo2 : item.goles_equipo_dos,
          ganador_penales: item.ganador_penales,
          puntos: item.puntos,
          aciertos: item.acierto,
          retornandovalores: true
        })
        if(item.ganador_penales === idequipo1){
          setRadiobtn({
            equipoA : true,
            equipoB : false
          })
        }else{
          setRadiobtn({
            equipoA : false,
            equipoB : true
          })
        }
      }

    })

  }, [resultadosapostados])

  useEffect(() => {
    const resultado = localStorage.getItem("resultado");  
    const datos = JSON.parse(resultado);
    if(datos){
      datos.map((item) =>{
        if(item.id_partido === id_partido){
          setInput({
            golesequipo1 : item.golesequipo1,
            golesequipo2 : item.golesequipo2,
            ganador_penales : item.ganador_penales,
            retornandovalores: true
          })
          if(item.ganador_penales === idequipo1){
            setRadiobtn({
              equipoA : true,
              equipoB : false
            })
          }else{
            setRadiobtn({
              equipoA : false,
              equipoB : true
            })
          }
        }

      })
      setPendientes(datos.length);
    }
  },[])

  useEffect(() => {
    // console.log(input);
    if(retornandovalores === false && input.golesequipo1 && input.golesequipo2 && error === false && ganador_penales !== ''){
      let fechajuego = moment().format('yyyy/MM/DD HH:mm:ss');
      setResultadoapostador({...input, id_usuario: usuario.id_usuario, fecha: fechajuego, id_partido});
      // console.log(fechajuego);
    }
  }, [input])

  useEffect(() => {
    // console.log(resultadoapostador);
    if(retornandovalores === false && input.golesequipo1 && input.golesequipo2 && error === false && ganador_penales !== ''){
      // console.log('guardando los valores de input');
      var ban = false;
      const resultado = localStorage.getItem("resultado");  
      const datos = JSON.parse(resultado); 
      // console.log(datos);
        if(datos){ 
          // console.log('entro Datos');
          datosapuesta = datos;
          // console.log(datosapuesta);
          if(datos.length !== 0){
            datos.map( element => {
              if(element.id_partido === id_partido){
                // console.log('BAN TRUE');
                ban = true;

                element.golesequipo1 = input.golesequipo1
                element.golesequipo2 = input.golesequipo2
                element.ganador_penales = input.ganador_penales

                const resultadofinal = JSON.stringify(datos);
                localStorage.removeItem('resultado');
                localStorage.setItem('resultado', resultadofinal);

              }
            })
            setPendientes(datos.length);
          }
        }else{
          ban = true;
          // console.log('primer nuevo resultado');
          // console.log(resultadoapostador);
          datosapuesta.push(resultadoapostador);
          const resultado = JSON.stringify(datosapuesta);
          localStorage.setItem('resultado', resultado);
          setPendientes(datosapuesta.length);
        }

        if(!ban){            
          datosapuesta.push(resultadoapostador);            
          localStorage.removeItem('resultado');
          const resultado = JSON.stringify(datosapuesta);
          localStorage.setItem('resultado', resultado);
          setPendientes(datosapuesta.length);
          datosapuesta = [];
        }
    }
  }, [resultadoapostador])


  const handleResultado = React.useCallback(e =>{      
    if((e.target.value).length > 2){
      // guardarError(true);
      return
    }else if(!numeros.test(e.target.value)){
      
      guardarError(true);
      setInput({
        ...input,
        [e.currentTarget.name]: '',
        retornandovalores: false
      })
      return
    }else if(e.target.value === '00'){
      return
    }else if(Number(e.target.value) < 0 || e.target.value < 0){
      guardarError(true);
      return
    }
    
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value,
      retornandovalores: false
    })  
    guardarError(false);    
  },[input])



  const handleChange = (event) => { 
   
    if(event.target.name === 'equipouno'){
      setRadiobtn({
        equipoA : true,
        equipoB : false
      })
      setInput({
        ...input,
        ganador_penales: Number(event.target.value),
        retornandovalores: false
      })
    }else{
      setRadiobtn({
        equipoA : false,
        equipoB : true
      })
      setInput({
        ...input,
        ganador_penales: Number(event.target.value),
        retornandovalores: false
      })
    }
     
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  return (
    <Card sx={{ maxWidth: 430, margin: 1 }}>
      <CardHeader
        title={ equipo1 +' vs '+ equipo2  }
        subheader={fecha}
      />
      {error && (
        <Alert variant="filled" severity="error">
          Error al ingresar el resultado
        </Alert>
      )}
      <CardContent>
        <Grid container spacing={2} ddisplay='flex' justifyContent='center' alignItems='center'>
            <Grid item xs={6} md={6} lg={6} spacing={2} >
              <Grid container justifyContent='center' alignItems='center' >
                <Grid item xs={6} md={6} lg={6}>
                    <Avatar src={`/imagenes/${icon1}.png`}  sx={{ width: 46, height: 46 }} alt={equipo1} />
                </Grid>
                <Grid item xs={6} md={6} lg={6}>
                  <TextField 
                  required
                  type="number"
                  size="small"
                  name='golesequipo1'
                  label=""
                  value={input.golesequipo1}
                  onChange={handleResultado}
                  disabled={tiempo}
                  color="secondary"
                  InputProps={{ inputProps: { min: "0", max: "99", step: "1" } }}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={6} md={6} lg={6}>
              <Grid container justifyContent='center' alignItems='center' >
                  <Grid item xs={6} md={6} lg={6}>
                    <TextField 
                    required
                    type="number"
                    size="small"
                    name='golesequipo2'
                    label=""
                    value={input.golesequipo2}
                    onChange={handleResultado}
                    disabled={tiempo}
                    color="secondary"
                    InputProps={{ inputProps: { min: "0", max: "99", step: "1" } }}
                    />
                  </Grid>
                  <Grid item xs={6} md={6} lg={6}  direction='row' display='flex' justifyContent='flex-end' alignItems='center' >
                    <Avatar src={`/imagenes/${icon2}.png`} sx={{ width: 46, height: 46 }} alt={equipo2} />
                  </Grid>
              </Grid>
            </Grid>
            <Grid container mt={2} display='flex' justifyContent='center' alignItems='center'>
              <Grid item xs={12} display='flex' justifyContent='center' alignItems='center'>
                <Typography>¿QUIÉN GANA SI HAY PENALES?</Typography>
              </Grid>
              <Grid item xs={12} display='flex' justifyContent='space-evenly' alignItems='center' mt={1}>
                <span>{equipo1}  
                  <Radio
                    disabled={tiempo}
                    checked={equipoA}
                    onChange={handleChange}
                    value={idequipo1}
                    name="equipouno"
                    inputProps={{ 'aria-label': 'A' }}
                  />
                </span>
                <span>  
                  <Radio
                    disabled={tiempo}
                    checked={equipoB}
                    onChange={handleChange}
                    value={idequipo2}
                    name="equipodos"
                    inputProps={{ 'aria-label': 'B' }}
                  />
                  {equipo2}
                </span>
              </Grid>
            </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {/* <Typography paragraph>{equipo1 + ' VS ' + equipo2}</Typography> */}
          <Typography paragraph>
            { descripcion }
          </Typography>
          {estado === 'ACTIVO' ? <>
          <Typography paragraph>Obtuviste  <strong>{input.puntos} pts </strong> con este partido
          </Typography>
          <Typography paragraph>
          {input.aciertos != 0 && <span>Bonus de {input.aciertos} acierto por resultado exacto</span> }
          </Typography></> :
          <Typography paragraph>Esperando resultado FIFA...</Typography>}
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default Octavosfinal
