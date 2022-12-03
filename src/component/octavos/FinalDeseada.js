import React, { useState, useEffect } from 'react'
import { Alert, Button, Grid, MenuItem, Paper,styled, Table, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { useDispatch, useSelector } from 'react-redux';
import { obtenerEquiposAction, agregarPodioAction, obtenerPodioAction } from '../../action/resultadoAction';
import moment from 'moment';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#006db3',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  

const FinalDeseada = () => {
    let fecha_podio = moment().utc()
    .format('yyyy/MM/DD HH:mm:ss');
    const [error, guardarError] = useState(false);
    const [input, setInput] = useState({
        campeon: 0,
        subcampeon: 0,
        tercerpuesto: 0,
        cuartopuesto: 0,
    })
    const [campeonlist, setcampeonlist] = useState([]);
    const [subcampeonlist, setsubcampeonlist] = useState([]);
    const [tercerolist, settercerolist] = useState([]);
    const [cuartolist, setcuartolist] = useState([]);

    const {campeon, subcampeon, tercerpuesto, cuartopuesto} = input;
    const dispatch = useDispatch();
    ////buscar los equipos
    const obtenerEquipos = () =>dispatch(obtenerEquiposAction());
    ////obtener si ya habia guardado para mostrar
    const obtenerPodio = (id) =>dispatch(obtenerPodioAction(id));
    ////mandar seleccionados
    const agregarPodio = (input) =>dispatch(agregarPodioAction(input));
    ////variable que tiene los equipos
    const usuario = useSelector(state => state.auth.usuario);
    const equiposlist = useSelector(state => state.resultado.equiposlist);
    const podioequipos = useSelector(state => state.resultado.podioequipos);
    const podio = useSelector(state => state.resultado.podio);
    
    console.log(podioequipos);
    
    useEffect(() => {
        obtenerEquipos();
        obtenerPodio(usuario?.id_usuario);
    },[]);

    useEffect(() => {
        if(podioequipos){
            setInput({
                ...input,
                campeon: podioequipos.campeon,
                subcampeon: podioequipos.subcampeon,
                tercerpuesto: podioequipos.tercerpuesto,
                cuartopuesto: podioequipos.cuartopuesto,
            })
        }
    },[podioequipos]);

    useEffect(() => {
        console.log(equiposlist);
        setcampeonlist(equiposlist);
        setsubcampeonlist(equiposlist);
        settercerolist(equiposlist);
        setcuartolist(equiposlist);
    },[equiposlist]);

    useEffect(()=>{
        const aux = equiposlist.filter(und => campeon !== und.id_equipo);
        setsubcampeonlist(aux);
        settercerolist(aux);
        setcuartolist(aux);
    },[campeon])

    useEffect(()=>{
        const aux = equiposlist.filter(und => subcampeon !== und.id_equipo);
        setcampeonlist(aux);
        settercerolist(aux);
        setcuartolist(aux);
    },[subcampeon])

    useEffect(()=>{
        const aux = equiposlist.filter(und => tercerpuesto !== und.id_equipo);
        setcampeonlist(aux);
        setsubcampeonlist(aux);
        setcuartolist(aux);
    },[tercerpuesto])

    useEffect(()=>{
        const aux = equiposlist.filter(und => cuartopuesto !== und.id_equipo);
        setcampeonlist(aux);
        setsubcampeonlist(aux);
        settercerolist(aux);
    },[cuartopuesto])

    const  onSubmit = (e) =>{
        e.preventDefault();
        //validacion de datos
        if(campeon === 0 || subcampeon === 0 || tercerpuesto === 0 || cuartopuesto === 0){
        guardarError(true);
        return;
        }
        // console.log(fecha_podio);
        //guardar en a base de datos
        agregarPodio({...input, id_usuario: usuario?.id_usuario, fecha_podio});
    }

    return ( 
        <view style={{ display:'flex', padding: 2, marginLeft: 5}}>
        <TableContainer component={Paper}>
            {error && (
            <Alert variant="filled" severity="error">
                Todos los select son obligatorios
            </Alert>
            )}
        <Table sx={{ minWidth: 400 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <StyledTableCell>PODIO MUNDIAL</StyledTableCell>
            </TableRow>
            </TableHead>
        </Table>
            <form
                alignItems="center"
                noValidate
                autoComplete="off"
                style={{ padding: 10 }}
                onSubmit={onSubmit}
            >
            <Grid container spacing={2} >
                <Grid item xs={12}>
                <TextField
                    required
                    select
                    name="campeon"
                    label="Campeon"
                    variant="outlined"
                    color="secondary"
                    value={campeon}
                    helperText="Selecione campeon"
                    onChange={(e) => setInput({ ...input, campeon: e.target.value })}
                    >
                    {campeonlist.map((option) => (
                        <MenuItem key={option.id_equipo} value={option.id_equipo}>
                        {" "}
                        {option.equipo}{" "}
                        </MenuItem>
                    ))}
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                <TextField
                    required
                    select
                    name="subcampeon"
                    label="Subcampeon"
                    variant="outlined"
                    color="secondary"
                    value={subcampeon}
                    helperText="Selecione el subcampeon"
                    onChange={(e) => setInput({ ...input, subcampeon: e.target.value })}
                    >
                    {subcampeonlist.map((option) => (
                        <MenuItem key={option.id_equipo} value={option.id_equipo}>
                        {" "}
                        {option.equipo}{" "}
                        </MenuItem>
                    ))}
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                <TextField
                    required
                    select
                    name="tercerpuesto"
                    label="Tercer puesto"
                    variant="outlined"
                    color="secondary"
                    value={tercerpuesto}
                    helperText="Selecione el tercer puesto"
                    onChange={(e) => setInput({ ...input, tercerpuesto: e.target.value })}
                    >
                    {tercerolist.map((option) => (
                        <MenuItem key={option.id_equipo} value={option.id_equipo}>
                        {" "}
                        {option.equipo}{" "}
                        </MenuItem>
                    ))}
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                <TextField
                    required
                    select
                    name="cuartopuesto"
                    label="Cuarto puesto"
                    variant="outlined"
                    color="secondary"
                    value={cuartopuesto}
                    helperText="Selecione el cuarto puesto"
                    onChange={(e) => setInput({ ...input, cuartopuesto: e.target.value })}
                    >
                    {cuartolist.map((option) => (
                        <MenuItem key={option.id_equipo} value={option.id_equipo}>
                        {" "}
                        {option.equipo}{" "}
                        </MenuItem>
                    ))}
                    </TextField>
                </Grid>

                <Grid container spacing={2} display='flex' justifyContent='center' alignContent='center' padding='2'>
                <Grid item xs={6}>
                    <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    // onClick={guardarFinalDeseada}
                    >
                    Registrar
                    </Button>
                </Grid>
                <Grid item xs={4} >
                </Grid>
                </Grid>
            </Grid>
            </form>
        </TableContainer>
    </view>
    );
}
 
export default FinalDeseada;