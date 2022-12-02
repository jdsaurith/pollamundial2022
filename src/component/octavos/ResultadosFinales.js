import React, { useEffect, useState} from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Grid, Radio, TableBody, TableCell, TableRow, TextField } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment/moment';


const ResultadosFinales = ({id_partido, datosapuesta, fecha, idequipo1, equipo1, idequipo2, equipo2, ganador_penales, icon1, icon2, descripcion, estado }) => {

    const dispatch = useDispatch();
    let fechajuego = moment()
    .format('yyyy/MM/DD HH:mm:ss');
    const [resultadoapostador, setResultadoapostador] = useState();
    const [radiobtn, setRadiobtn] = useState({
        equipoA: false,
        equipoB: false,
        disable: false
    });
    const [input, setInput] = React.useState({
      retornandovalores: false,
    });

    const usuario = useSelector(state => state.auth.usuario);
    const obtenerpartidos = useSelector(state => state.resultado.obtenerpartidos);
    // const resultadosFinales = useSelector(state =>state.resultado.resultadosFinales);
    const tipousuario = useSelector(state=> state.auth.tipousuario);
    
    const {retornandovalores } = input;
    const { equipoA, equipoB, disable } = radiobtn;


    /// OBTENER LOS GOLES DE LOS EQUIPOS - RESULTADOS FIFA
    useEffect(() => {
      obtenerpartidos?.filter(r => r.estado === 'ACTIVO').map((item) =>{
        if(item.id_partido === id_partido){
          setInput({
            golesequipo1 : item.goles_equipo_uno,
            golesequipo2 : item.goles_equipo_dos,
            ganador_penales: item.ganador_penales,
            retornandovalores: true
          })

          if(item.ganador_penales === idequipo1){
            setRadiobtn({
              equipoA : true,
              equipoB : false,
              disable : true
            })
          }else{
            setRadiobtn({
              equipoA : false,
              equipoB : true,
              disable : true
            })
          }
        }

      })

    }, [obtenerpartidos])

    //// OBTENER LOS GOLES ESCRITOS POR EL ADMIN O ROOT 
    useEffect(() => {
      if(retornandovalores === false && input.golesequipo1 && input.golesequipo2 && input.ganador_penales !== ''){
        setResultadoapostador({...input, fecha_update: fechajuego, id_partido});
      }
    }, [input])

    useEffect(() => {
      if(retornandovalores === false && input.golesequipo1 && input.golesequipo2 && input.ganador_penales !== ''){
        // console.log('guardando los valores de input');
        var ban = false;
        const resultado = localStorage.getItem("resultadofifa");
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
                  localStorage.removeItem('resultadofifa');
                  localStorage.setItem('resultadofifa', resultadofinal);

                }
              })
            }
          }else{
            ban = true;
            // console.log('primer nuevo resultado');
            // console.log(resultadoapostador);
            datosapuesta.push(resultadoapostador);
            const resultado = JSON.stringify(datosapuesta);
            localStorage.setItem('resultadofifa', resultado);
          }

          if(!ban){            
            datosapuesta.push(resultadoapostador);
            localStorage.removeItem('resultadofifa');
            const resultado = JSON.stringify(datosapuesta);
            localStorage.setItem('resultadofifa', resultado);
            datosapuesta = [];
          }
      }

    }, [resultadoapostador])

    const handleResultado = React.useCallback(e =>{
        setInput({
          ...input,
          [e.currentTarget.name]: e.currentTarget.value,
          retornandovalores: false
        })
      },[input])
  
      const onfocusEquipouno = () =>{ 
        const resultado = localStorage.getItem("resultadofifa");  
        const datos = JSON.parse(resultado);
        if(datos){
          if(datos.length !== 0){
            datos.map( element => {
              if(element.id_partido === id_partido){
                setInput({
                  golesequipo1 : element.golesequipo1,
                  golesequipo2 : element.golesequipo2,
                  ganador_penales : element.ganador_penales,
                  retornandovalores: true
                })
              }
            })

          }
        }
      }  
      

      const handleChange = (event) => { 
        console.log(event.target.value);
        console.log(event.target.name);
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
  
    return (
    <Card sx={{ maxWidth: 430, margin: 1 }}>
      <CardHeader
        title={ equipo1 +' vs '+ equipo2  }
        subheader={fecha}
      />

      <CardContent>
        <Grid container spacing={2}>
            <Grid item xs={6} md={6} lg={6} spacing={2} >
              <Grid container justifyContent='center' alignItems='center' >
                <Grid item xs={6}>
                    <Avatar src={`/imagenes/${icon1}.png`}  sx={{ width: 46, height: 46 }} alt={equipo1} />
                </Grid>
                <Grid item xs={6}>
                  {(tipousuario === 'ROOT' || tipousuario === 'ADMIN') && estado !== 'ACTIVO' ?
                    <TextField 
                    required
                    type="number"
                    size="small"
                    name='golesequipo1'
                    label=""
                    value={input.golesequipo1}
                    onChange={handleResultado}
                    onFocus={onfocusEquipouno}
                    // disabled={estado === 'ACTIVO'?true:false}
                    color="secondary"
                    InputProps={{ inputProps: { min: "0", max: 5, step: "1" } }}
                    />
                    :
                    <>
                      <h1 style={{ display:'flex', justifyContent: 'center', alignContent: 'center'}}>
                        {input?.golesequipo1 || '-'}
                      </h1>
                    </>
                  }
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={6} md={6} lg={6}>
              <Grid container justifyContent='center' alignItems='center' >
                  <Grid item xs={6}>
                    {(tipousuario === 'ROOT' || tipousuario === 'ADMIN') && estado !== 'ACTIVO' ? 
                      <TextField 
                      required
                      type="number"
                      size="small"
                      name='golesequipo2'
                      label=""
                      value={input.golesequipo2}
                      onChange={handleResultado}
                      onFocus={onfocusEquipouno}
                      // disabled={estado === 'ACTIVO'?true:false}
                      color="secondary"
                      InputProps={{ inputProps: { min: "0", max: "5", step: "1" } }}
                      />
                      :
                      <>
                        <h1 style={{ display:'flex', justifyContent: 'center', alignContent: 'center' }}>
                          {input.golesequipo2 || '-'}
                        </h1>
                      </>
                    }
                  </Grid>
                  <Grid item xs={6} direction='row' display='flex' justifyContent='flex-end' alignItems='center' >
                    <Avatar src={`/imagenes/${icon2}.png`} sx={{ width: 46, height: 46 }} alt={equipo2} />
                  </Grid>
              </Grid>
            </Grid>

            <Grid container mt={2} display='flex' justifyContent='center' alignItems='center'>
              <Grid item xs={12} display='flex' justifyContent='center' alignItems='center'>
                <Typography>EQUIPO GANADOR EN PENALES</Typography>
              </Grid>
              <Grid item xs={12} display='flex' justifyContent='space-evenly' alignItems='center' mt={1}>
                <span>{equipo1}  
                  <Radio
                    disabled={(tipousuario === 'ROOT' || tipousuario === 'ADMIN') ? disable : true}
                    checked={equipoA}
                    onChange={handleChange}
                    value={idequipo1}
                    name="equipouno"
                    inputProps={{ 'aria-label': 'A' }}
                  />
                </span>
                <span>  
                  <Radio
                   disabled={(tipousuario === 'ROOT' || tipousuario === 'ADMIN') ? disable : true}
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
    </Card>
  )
}

export default ResultadosFinales
