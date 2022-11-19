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
import { Fab, Grid, TableBody, TableCell, TableRow, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { useDispatch, useSelector } from 'react-redux';
import { faIgloo } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment/moment';
import { formatearFechaDoshoras, formatearFechaValidacion } from '../helpers';
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
  
  

const Partidos = ({datosapuesta, id_partido, fecha, fechavalidacion, equipo1, equipo2, icon1, icon2, descripcion,estado }) => {
    const dispatch = useDispatch();
    let fechajuego = moment().format('yyyy/MM/DD HH:mm:ss');
    let fecha2 = new Date(fechavalidacion);
    const [expanded, setExpanded] = React.useState(false);
    const [tiempo, setTiempo] = useState(Date.now()  >= formatearFechaDoshoras(fecha2, 2));
    const [resultadoapostador, setResultadoapostador] = useState();
    const [input, setInput] = React.useState({
      retornandovalores: false
    });

    const usuario = useSelector(state => state.auth.usuario);
    const obtenerResultados = (id) =>dispatch(obtenerResultadosAction(id));
    const resultadosapostados = useSelector(state => state.resultado.resultadosapostados);
    const {retornandovalores} = input;

    ///actualizar partido a enjuego
    const updateStatePartido = (id) => dispatch(updateStatePartidoAction(id));

    useEffect(() => {
      obtenerResultados(usuario?.id_usuario);
    },[]);

    useEffect(() => {
      setInterval(() => {
        setTiempo(Date.now()  >= formatearFechaDoshoras(fecha2, 2));
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
      }
    },[])

    useEffect(() => {
      if(retornandovalores === false && input.golesequipo1 && input.golesequipo2){
        setResultadoapostador({...input, id_usuario: usuario.id_usuario, fecha: fechajuego, id_partido});
      }
    }, [input])

    useEffect(() => {
      if(retornandovalores === false && input.golesequipo1 && input.golesequipo2){
        console.log('guardando los valores de input');
        var ban = false;
        const resultado = localStorage.getItem("resultado");  
        const datos = JSON.parse(resultado); 
        // console.log(datos);
          if(datos){ 
            console.log('entro Datos');
            datosapuesta = datos;
            // console.log(datosapuesta);
            if(datos.length !== 0){
              datos.map( element => {
                if(element.id_partido === id_partido){
                  console.log('BAN TRUE');
                  ban = true;

                  element.golesequipo1 = input.golesequipo1
                  element.golesequipo2 = input.golesequipo2

                  const resultadofinal = JSON.stringify(datos);
                  localStorage.removeItem('resultado');
                  localStorage.setItem('resultado', resultadofinal);

                }
              })
            }
          }else{
            ban = true;
            console.log('primer nuevo resultado');
            // console.log(resultadoapostador);
            datosapuesta.push(resultadoapostador);
            const resultado = JSON.stringify(datosapuesta);
            localStorage.setItem('resultado', resultado);

          }

          if(!ban){
            console.log('creando el nuevo resultado');
            // console.log(resultadoapostador);
            console.log(datosapuesta);
            datosapuesta.push(resultadoapostador);
            // console.log(datosapuesta);
            console.log('removiendo resultado');
            localStorage.removeItem('resultado');
            const resultado = JSON.stringify(datosapuesta);
            localStorage.setItem('resultado', resultado);
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
      // console.log('entro on focus')  
      // console.log(id_partido);
      const resultado = localStorage.getItem("resultado");  
      const datos = JSON.parse(resultado);
      // console.log(datos);
      if(datos){
        // console.log('entro datos');
        if(datos.length !== 0){
          datos.map( element => {
            if(element.id_partido === id_partido){ 
              // console.log('encontro el idpartido en onfocus');  
              // console.log(input.golesequipo1);
              // console.log(input.golesequipo2);
              setInput({
                golesequipo1 : element.golesequipo1,
                golesequipo2 : element.golesequipo2,
                retornandovalores: true
              })
            }
          })
        }
      }
    }

    const onblurEquipouno = () =>{  
      // console.log('entro on focus');  
      // console.log(id_partido);
    }

    const handleExpandClick = () => {
        setExpanded(!expanded);
      };

  return (
    <Card sx={{ maxWidth: 430, margin: 1 }}>
      <CardHeader
        title={ equipo1 +' vs '+ equipo2  }
        subheader={fecha}
      />

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
                  onFocus={onfocusEquipouno}
                  onBlur={onblurEquipouno}
                  disabled={tiempo}
                  // className={}
                  color="secondary"
                  InputProps={{ inputProps: { min: "0", max: "100", step: "1" } }}
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
                    onFocus={onfocusEquipouno}
                    onBlur={onblurEquipouno}
                    disabled={tiempo}
                    color="secondary"
                    InputProps={{ inputProps: { min: "0", max: "5", step: "1" } }}
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
