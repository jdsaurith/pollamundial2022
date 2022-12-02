import React, { useState, useEffect } from 'react'
import { Alert, Button, Grid, MenuItem, Paper,styled, Table, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { useDispatch, useSelector } from 'react-redux';
import { obtenerEquiposAction } from '../action/resultadoAction';


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

    const [error, guardarError] = useState(false);
    const [input, setInput] = useState({
        campeon: 0,
        subcampeon: 0,
        tercero: 0,
        cuarto: 0,
    })
    const [campeonlist, setcampeonlist] = useState([]);
    const [subcampeonlist, setsubcampeonlist] = useState([]);
    const [tercerolist, settercerolist] = useState([]);
    const [cuartolist, setcuartolist] = useState([]);

    const {campeon, subcampeon, tercero, cuarto} = input;
    const dispatch = useDispatch();
    ////buscar los equipos
    const obtenerEquipos = () =>dispatch(obtenerEquiposAction());
    ////obtener si ya habia guardado para mostrar
    // const obtenerPodio = (id) =>dispatch(obtenerPodioAction(id));
    ////mandar seleccionados
    // const agregarPodio = (input) =>dispatch(agregarPodioAction(input));
    ////variable que tiene los equipos
    const usuario = useSelector(state => state.auth.usuario);
    const equiposlist = useSelector(state => state.resultado.equiposlist);
    const podioequipos = useSelector(state => state.resultado.podioequipos);

    useEffect(() => {
        obtenerEquipos();
        //obtenerPodio(usuario?.id_usuario);
    },[]);

    useEffect(() => {
        if(podioequipos){
            setInput({
                ...input,
                campeon: podioequipos.campeon,
                subcampeon: podioequipos.subcampeon,
                tercero: podioequipos.tercero,
                cuarto: podioequipos.cuarto,
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
        const aux = equiposlist.filter(und => tercero !== und.id_equipo);
        setcampeonlist(aux);
        setsubcampeonlist(aux);
        setcuartolist(aux);
    },[tercero])

    useEffect(()=>{
        const aux = equiposlist.filter(und => cuarto !== und.id_equipo);
        setcampeonlist(aux);
        setsubcampeonlist(aux);
        settercerolist(aux);
    },[cuarto])

    const  onSubmit = (e) =>{
        e.preventDefault();
        //validacion de datos
        if(campeon === 0 || subcampeon === 0 || tercero === 0 || cuarto === 0){
        guardarError(true);
        return;
        }
        console.log(input)
        //guardar en a base de datos
        // agregarPodio(input);
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
                    name="tercero"
                    label="Tercer puesto"
                    variant="outlined"
                    color="secondary"
                    value={tercero}
                    helperText="Selecione el tercer puesto"
                    onChange={(e) => setInput({ ...input, tercero: e.target.value })}
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
                    name="cuarto"
                    label="Cuarto puesto"
                    variant="outlined"
                    color="secondary"
                    value={cuarto}
                    helperText="Selecione el cuarto puesto"
                    onChange={(e) => setInput({ ...input, cuarto: e.target.value })}
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
                    // className={classes.submit}
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