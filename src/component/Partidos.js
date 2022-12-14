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
import { Alert, Fab, Grid, TableBody, TableCell, TableRow, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { useDispatch, useSelector } from 'react-redux';
import { faIgloo } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment/moment';
import { formatearFechaDoshoras } from '../helpers';
import { obtenerResultadosAction, updateStatePartidoAction } from '../action/resultadoAction';

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
  
  

const Partidos = ({datosapuesta, id_partido, fecha, fechavalidacion, equipo1, equipo2, icon1, icon2, descripcion,estado,setPendientes }) => {
    const dispatch = useDispatch();    
    let fecha2 = new Date(fechavalidacion);
    let numeros = /^[0-9]+$/;
    const [expanded, setExpanded] = React.useState(false);
    const [tiempo, setTiempo] = useState(Date.now()  >= formatearFechaDoshoras(fecha2, 1));
    const [resultadoapostador, setResultadoapostador] = useState();
    const [error, guardarError] = useState(false);
    const [input, setInput] = React.useState({
      retornandovalores: false,      
    });

    const usuario = useSelector(state => state.auth.usuario);
    const obtenerResultados = (id) =>dispatch(obtenerResultadosAction(id));
    const resultadosapostados = useSelector(state => state.resultado.resultadosapostados);
    const {retornandovalores} = input;

    ///actualizar partido a enjuego
    const updateStatePartido = (id) => dispatch(updateStatePartidoAction(id));

    // console.log(input);

    useEffect(() => {
      obtenerResultados(usuario?.id_usuario);
    },[]);

    useEffect(() => {
      setInterval(() => {
        setTiempo(Date.now()  >= formatearFechaDoshoras(fecha2, 1));
      }, 1200000);
      // console.log(tiempo);
      // console.log(estado);
      // console.log(id_partido);
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
            puntos: item.puntos,
            aciertos: item.acierto,
            retornandovalores: true
          })
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
              retornandovalores: true
            })
          }

        })
        setPendientes(datos.length);
      }
    },[])

    useEffect(() => {
      if(retornandovalores === false && input.golesequipo1 && input.golesequipo2 && error === false){
        let fechajuego = moment().format('yyyy/MM/DD HH:mm:ss');
        setResultadoapostador({...input, id_usuario: usuario.id_usuario, fecha: fechajuego, id_partido, ganador_penales: 0});
        // console.log(fechajuego);
      }
    }, [input])

    useEffect(() => {
      if(retornandovalores === false && input.golesequipo1 && input.golesequipo2 && error === false){
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
                  // className={}
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

export default Partidos
