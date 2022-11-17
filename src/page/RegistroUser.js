import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { 
    Card, CardContent, Container, Box, 
    TextField, Button, FormControlLabel,
    Typography, Checkbox, Link, Grid , Alert, Paper
} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { useSelector, useDispatch } from 'react-redux';
import { agregarUsuarioPageAction } from '../action/authAction';

let theme = createTheme({
  body:{
    margin: 0
  },
    palette: {
      primary: {
        light: '#63ccff',
        main: '#009be5',
        dark: '#006db3',
      },
    },
    typography: {
      h5: {
        fontWeight: 500,
        fontSize: 26,
        letterSpacing: 0.5,
      },
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiTab: {
        defaultProps: {
          disableRipple: true,
        },
      },
    },
    mixins: {
      toolbar: {
        minHeight: 48,
      },
    },
});

    const Login  = ({history}) => {
    const dispatch = useDispatch();
    const [input, setInput] = useState({
        nombres: '',
        usuario: '',
        password: '',
        password2: '',
        error: false,
        error2: false,
    });

    //Manda a llamar el action por medio de dispatch de authAction
    const agregarUsuario = (u) => dispatch(agregarUsuarioPageAction(u));
    //mostrar los datos del state
    const conectado = useSelector(state => state.auth.conectado);
    const { nombres, usuario, password, password2, error, error2 } = input;

    useEffect(() => {
        setInput({
        nombres: '',
        usuario: '',
        password: '',
        password2: '',
        error: false,
        error2: false,
        })
    }, [])

    //efect para redireccionar al Home
    useEffect(() => {
        if(conectado){
        history.push('/home');
        }else{
        history.push('/registro');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [conectado])

    //obtener los datos que se van escriibiendo en los campos
    const onChange = e =>{
    setInput({
        ...input,
        error: false,
        error2: false,
        [e.target.name] : e.target.value
        })
    }

    //Leer los valores del formulario
    const handleChangeT = React.useCallback((e) => {
        setInput(
            {
            ...input,
            error: false,
            error2: false,
            [e.currentTarget.name]: e.currentTarget.value.toUpperCase()
            },
            [input]
        );
        console.log(nombres)
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        const pais = 'COL';
        const tipousuario = 'COLOMBIA';
        //validar los campos
        if(nombres.trim() === '' || usuario.trim() === '' ||  password.trim() === ''){
        setInput({
            ...input,
            error: true
        })
        return;
        }
        if(password.trim() !== password2.trim()){
            setInput({
                ...input,
                error2: true
            })
            return;
        }
        //enviar los datos 
        console.log(input);
        agregarUsuario({...input, tipousuario, pais});
        setInput({
            nombres: '',
            usuario: '',
            password: '',
            password2: '',
            error: false,
            error2: false,
            })
    };

    const aLogin = () =>{
        history.push('/');
    }

    return ( 
        <div style={{
        display: 'flex',
        margin: '0',
        justifyContent:'center',
        }}>
        {/* <ThemeProvider theme={theme}> */}

            {/* <Container component="main" maxWidth="lg" > */}
                {/* <CssBaseline /> */}
                {/* sx={{ minWidth: 275 , maxWidth: 900}} */}
                <Paper sx={{minWidth: 275 , maxWidth: 400, maxHeight: '300' }} elevation={6}>
                    <CardContent>
                        <Box
                            sx={{
                                marginTop: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ width: 100, height: 94, bgcolor: 'white' }}>
                                <img width={200} height={120} src={'/imagenes/logo.png'} />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                {error ? (
                                <Alert variant="filled" severity="error">
                                    Todos los campos son obligatorios
                                </Alert>
                                ) : error2 ? (
                                <Alert variant="filled" severity="error">
                                    Los password no coinciden
                                </Alert>
                                ) : 'REGISTRO USUARIO'}
                            </Typography>
                            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                                <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="nombres"
                                label="Nombres"
                                name="nombres"
                                autoFocus
                                onChange={handleChangeT}
                                />
                                <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="usuario"
                                label="Usuario"
                                name="usuario"
                                onChange={onChange}
                                />

                                <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={onChange}
                                />
                                <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password2"
                                label="Repetir Password"
                                type="password"
                                id="password2"
                                onChange={onChange}
                                />
                                <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                >
                                Registrar
                                </Button>
                            </Box>
                        <Link
                        component="button"
                        variant="body2"
                        onClick={() => {
                            aLogin();
                        }}
                        >
                        Iniciar sesion
                        </Link>
                        </Box>
                    </CardContent>
                </Paper>
            {/* </Container> */}

        {/* </ThemeProvider> */}
        </div>
    );
}
 
export default Login;