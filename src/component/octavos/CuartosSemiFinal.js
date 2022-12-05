import React, { useEffect, useState } from 'react'
import { Alert, Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, MenuItem, Radio, RadioGroup, TableContainer, TextField, Typography } from '@mui/material'
import styles from '../../index.css';
import { useDispatch, useSelector } from 'react-redux';

import { obtenerEquiposFaseFinalesAction, agregarPartidoFinalesAction, limpiarDetallePosicionAction } from '../../action/resultadoAction';
import moment from 'moment';

const CuartosSemiFinal = () => {
  const [value, setValue] = React.useState('OCTAVOS');
  const [jornada, setJornada] = React.useState('CUARTOS');
  const [selectedDate, setSelectedDate] = useState(moment(new Date()).utc().format('YYYY-MM-DD HH:mm:ss'));
  const [error, guardarError] = useState(false);
  const [equipos, setEquipos] = useState({
    equipouno: '',
    equipodos: '',
    fecha: selectedDate,
  });
  const {  equipouno, equipodos, fecha } = equipos;
  const dispatch = useDispatch();
   ////buscar los equipos
   const obtenerEquiposFaseFinales = (f) =>dispatch(obtenerEquiposFaseFinalesAction(f));
   const agregarPartidoFinales = (p) =>dispatch(agregarPartidoFinalesAction(p));
   const equiposfinalistas = useSelector(state => state.resultado.equiposfinalistas);

  useEffect(() => {
    obtenerEquiposFaseFinales('OCTAVOS');
    // setSelectedDate(moment(new Date()).format('YYYY-MM-DD HH:mm:ss'));
  }, [])

  useEffect(()=>{
    setEquipos({
      ...equipos,
      fecha: selectedDate
    });
  },[selectedDate])

  const handleChange = (event) => {
    
    guardarError(false);
    if(event.target.value === 'OCTAVOS'){
        obtenerEquiposFaseFinales('OCTAVOS');
        setValue(event.target.value);
    }else if(event.target.value === 'CUARTOSFINAL'){
        obtenerEquiposFaseFinales('CUARTOSFINAL');
        setValue(event.target.value);
    }else if(event.target.value === 'SEMIFINAL'){
        obtenerEquiposFaseFinales('SEMIFINAL');
        setValue(event.target.value);
    }else if(event.target.value === 'TERCEROYCUARTO'){
        obtenerEquiposFaseFinales('TERCEROYCUARTO');
        setValue(event.target.value);
    }else if(event.target.value === 'FINAL'){
        obtenerEquiposFaseFinales('FINAL');
        setValue(event.target.value);
    }
    
  };

  const handleChangeJ = (event) => {
    
    guardarError(false);
    if(event.target.value === 'CUARTOSFINAL'){
        setJornada(event.target.value);
    }else if(event.target.value === 'SEMIFINAL'){
        setJornada(event.target.value);
    }else if(event.target.value === 'TERCEROYCUARTO'){
        setJornada(event.target.value);
    }else if(event.target.value === 'FINAL'){
        setJornada(event.target.value);
    }
    
  };

  const handleChangeF = React.useCallback(e =>{
    // console.log(e.currentTarget.value);
    // console.log(e.currentTarget.name);
    setEquipos({
        ...equipos,
        fecha: e.currentTarget.value
    })
    guardarError(false);
  },[equipos]);

  const  onSubmit = (e) =>{
    e.preventDefault();
    guardarError(false);
    ///validacion de datos
    if(!equipouno || !equipodos || !jornada || !fecha){
    guardarError(true);
    return;
    }
    console.log({...equipos, jornada, fecha, ganador_penales:0, estado:'INACTIVO'});
    //guardar en a base de datos
    agregarPartidoFinales({...equipos, jornada, fecha, ganador_penales:0, estado:'INACTIVO'});
    obtenerEquiposFaseFinales('OCTAVOS');
    Limpiar();
}

const Limpiar = () =>{
    setEquipos({
        equipouno: '',
        equipodos: '',
        fecha: selectedDate,
    })
    setJornada('CUARTOS');
    setValue('OCTAVOS');
}

  
  return (
    <Card sx={{ maxWidth: 600 }}>
        {error && (
            <Alert variant="filled" severity="error">
                Todos los select son obligatorios
            </Alert>
        )}
        <CardHeader>
            <Typography>
                AGREGAR FECHAS FINALES
            </Typography>
        </CardHeader>        
        <CardContent>
        <form
        alignItems="center"
        noValidate
        autoComplete="off"
        style={{ padding: 10 }}
        onSubmit={onSubmit}
        >
            <Grid container display='flex' spacing={2}>
                <Grid xs={12} display='flex' justifyContent='center' alignItems='center'>
                <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">Selecciona Fase Final</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-radio-buttons-group-label"
                        value={value}
                        onChange={handleChange}
                    >
                        <FormControlLabel value="OCTAVOS" control={<Radio />} label="Octavos de Final" />
                        <FormControlLabel value="CUARTOSFINAL" control={<Radio />} label="Cuartos de Final" />
                        <FormControlLabel value="SEMIFINAL" control={<Radio />} label="SemiFinal" />
                        <FormControlLabel value="TERCEROYCUARTO" control={<Radio />} label="Tercer y Cuarto Puesto" />
                        <FormControlLabel value="FINAL" control={<Radio />} label="Final" />
                    </RadioGroup>
                </FormControl>
                </Grid>
                <Grid xs={5} display='flex' justifyContent='center' alignItems='center' mt={3}>
                    <TextField
                    required
                    select
                    name="equipouno"
                    label="Equipo Uno"
                    variant="outlined"
                    color="secondary"
                    value={equipouno}
                    helperText="Selecione EquipoUno"
                    onChange={(e) => setEquipos({ ...equipos, equipouno: e.target.value })}
                    >
                    {equiposfinalistas.map((option) => (
                        <MenuItem key={option.id_equipo} value={option.id_equipo}>
                        {" "}
                        {option.equipo}{" "}
                        </MenuItem>
                    ))}
                    </TextField>     
                </Grid>
                <Grid xs={2} display='flex' justifyContent='center' alignItems='center' mt={3}>
                    <span>VS</span>
                </Grid>
                <Grid xs={5} display='flex' justifyContent='center' alignItems='center' mt={3}>
                    <TextField
                        required
                        select
                        name="equipodos"
                        label="Equipo Dos"
                        variant="outlined"
                        color="secondary"
                        value={equipodos}
                        helperText="Selecione EquipoDos"
                        onChange={(e) => setEquipos({ ...equipos, equipodos: e.target.value })}
                        >
                        {equiposfinalistas.map((option) => (
                            <MenuItem key={option.id_equipo} value={option.id_equipo}>
                            {" "}
                            {option.equipo}{" "}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
            </Grid>
            <Grid xs={12} display='flex' justifyContent='center' alignItems='center' mt={3}>
                <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">Selecciona Jornada</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-radio-buttons-group-label"
                        value={jornada}
                        onChange={handleChangeJ}
                    >
                        <FormControlLabel value="CUARTOSFINAL" control={<Radio />} label="Cuartos de Final" />
                        <FormControlLabel value="SEMIFINAL" control={<Radio />} label="SemiFinal" />
                        <FormControlLabel value="TERCEROYCUARTO" control={<Radio />} label="Tercer y Cuarto Puesto" />
                        <FormControlLabel value="FINAL" control={<Radio />} label="Finales" />
                    </RadioGroup>
                </FormControl>
                </Grid>
            <Grid xs={12} display='flex' justifyContent='center' alignItems='center' mt={3}>
            <TextField
                fullWidth
                id="fecha"
                label="Fecha y hora del Pago"
                type="datetime-local"
                name="fecha"
                defaultValue={fecha}
                value={fecha}
                onChange={handleChangeF} 
                // className={classes.textFieldFecha}
                InputLabelProps={{
                shrink: true,
                }}
            />
            </Grid>
            <Grid xs={12} display='flex' justifyContent='center' alignItems='center' mt={3} bgcolor='blueviolet'>
                <Button style={{  }} type="submit" fullWidth>
                    Guardar
                </Button>
            </Grid> 
        </form>
        </CardContent>
        
    </Card>
  )
}

export default CuartosSemiFinal
