import React, { useState, useEffect } from 'react';
import { Alert, AppBar, Button, Grid, Paper, styled, Table, TableContainer, TableHead, TableRow, TextField} from '@mui/material'
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

import { useDispatch, useSelector } from 'react-redux';
import { editarUsuarioAction, agregarUsuarioAction } from '../action/usuarioAction';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#006db3',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const RegistroUsuarios = () => {
    const [error, guardarError] = useState(false);
    const [actualizar, setActualizar] = useState(false)
    const [input, setInput] = useState({
        id: 0,
        nombres: '',
        usuario: '',
        password: '',
    })

    ///utilizar useDispatch para ejecutar la funcion del action
    const dispatch = useDispatch();

    ///llamar funicones de los action
    const actualizarUsuario = (u) => dispatch(editarUsuarioAction(u));
    const agregarUsuario = (u) => dispatch(agregarUsuarioAction(u));

    const usuarioeditar = useSelector(state => state.usuario.usuarioeditar);
    const usuarioadmin = useSelector(state => state.auth.usuario);
    
    ///destructuring del state
    const {nombres, usuario, password } = input;

    useEffect(() => {
      if(usuarioeditar !== null){
        setActualizar(true);
        setInput({
          id: usuarioeditar.id_usuario,
          nombres: usuarioeditar.nombres,
          usuario: usuarioeditar.usuario,
          password: usuarioeditar.password
        })
      }
    }, [usuarioeditar])

    //Leer los valores del formulario
    const handleChangeT = React.useCallback((e) => {
        setInput(
          {
            ...input,
            [e.currentTarget.name]: e.currentTarget.value.toUpperCase()
          },
          [input]
        );
        guardarError(false);
      });

    const  onSubmitUsuario = (e) =>{
      e.preventDefault();
        const pais = usuarioadmin.tipousuario === 'ADMIN' ? 'ARG' : 'COL';
        const tipousuario = usuarioadmin.tipousuario === 'ADMIN' ? 'ARGENTINA' : 'COLOMBIA'
         //validacion de datos
        if(nombres.trim() === "" || usuario.trim() === '' || password.trim() === '' ){
          guardarError(true);
          return;
        }
        if (actualizar) {
            actualizarUsuario({...input, pais});
            guardarError(false);
        } else {
            agregarUsuario({...input, tipousuario, pais});
            guardarError(false);
        }
        setInput({
          id: 0,
          nombres: "",
          usuario: "",
          password: "",
        })
      }

      const limpiar = ()=>{
        setInput({
          id: 0,
          nombres: "",
          usuario: "",
          password: "",
        })
        setActualizar(false);
      }
  return (
    <view style={{ display:'flex', padding: 2, marginLeft: 5}}>      
      <TableContainer component={Paper}>            
            {error && (
              <Alert variant="filled" severity="error">
                Todos los campos son obligatorios
              </Alert>
            )}
          <Table sx={{ minWidth: 400 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell>REGISTRO DE USUARIO</StyledTableCell>                
              </TableRow>
            </TableHead>
          </Table>
            <form
              alignItems="center"
              noValidate
              autoComplete="off"
              style={{ padding: 10 }}
              onSubmit={onSubmitUsuario}
            >
              <Grid container spacing={2} >
                <Grid item xs={12}>
                  <TextField
                    required
                    name="nombres"
                    label="Nombres"
                    variant="outlined"
                    autoFocus
                    value={nombres}
                    onChange={handleChangeT}
                    fullWidth
                    color="secondary"
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    required
                    name="usuario"
                    margin="normal"
                    label="Usuario"
                    placeholder="Usuario"
                    variant="outlined"
                    // className={classes.textmulti}
                    value={usuario}
                    onChange={handleChangeT}
                    color="secondary"
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    required
                    name="password"
                    margin="normal"
                    label="Password"
                    placeholder="Password"
                    variant="outlined"
                    value={password}
                    onChange={handleChangeT}
                    color="secondary"
                  />
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
                      {actualizar ? "Actualizar" : "Guardar"}
                    </Button>
                  </Grid>
                  <Grid item xs={4} >
                    <Button
                      type="button"
                      variant="contained"
                      color="primary"
                      fullWidth
                      // className={classes.limpiar}
                      onClick={limpiar}
                    >
                      Limpiar
                    </Button>
                  </Grid>
                </Grid>             
              </Grid>
            </form>
        </TableContainer>
    </view>
  )
}

export default RegistroUsuarios
