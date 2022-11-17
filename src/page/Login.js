import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { 
    Card, CardContent, Container, Box, 
    TextField, Button, FormControlLabel,
    Typography, Checkbox, Link, Grid 
} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { useSelector, useDispatch } from 'react-redux';
import { iniciarSesionAction } from '../action/authAction';

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
      usuario: '',
      password: '',
      error: false,
  });

  //Manda a llamar el action por medio de dispatch de authAction
  const iniciarSesion = (datos) => dispatch(iniciarSesionAction(datos));
  //mostrar los datos del state
  const conectado = useSelector(state => state.auth.conectado);
  const { usuario, password } = input;

  useEffect(() => {
    setInput({
      usuario: '',
      password: '',
      error: false,
    })
  }, [])

    //efect para redireccionar al Home
  useEffect(() => {
    if(conectado){      
      history.push('/home');
    }else{
      history.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conectado])

    //obtener los datos que se van escriibiendo en los campos
  const onChange = e =>{
    setInput({
      ...input,
      error: false,
      [e.target.name] : e.target.value
    })
  } 

    const handleSubmit = (event) => {
      event.preventDefault();
       //validar los campos
      if(usuario.trim() === '' ||  password.trim() === ''){
        setInput({
          ...input,
          error: true
        })
        return;
      }
      //enviar los datos 
      // console.log(input);
      iniciarSesion({usuario, password});

    };

    const aRegistro = () =>{
      history.push('/registro');
    }

    return ( 
      <div style={{ 
        display: 'flex',
        margin: '0',
        justifyContent:'center',
        // backgroundImage: 'url("/imagenes/Harvey.jpg")',
        // // backgroundRepeat: 'repeat-y',
        // width:'100vw',
        // height: '100vh'
      }}>
        {/* <ThemeProvider theme={theme}> */}
          
            {/* <Container component="main" maxWidth="lg" > */}
                {/* <CssBaseline /> */}
                {/* sx={{ minWidth: 275 , maxWidth: 900}} */}
                <Card sx={{minWidth: 275 , maxWidth: 400, maxHeight: 500, margin: 2 }}>
                    <CardContent>
                        <Box
                            sx={{
                                marginTop: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ width: 100, height: 98, bgcolor: 'white' }}>
                                <img width={200} height={140} src={'/imagenes/logo.png'} />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                POLLA MUNDIALISTA
                            </Typography>
                            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                                <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="usuario"
                                label="Usuario"
                                name="usuario"
                                autoFocus
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
                                <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                >
                                Ingresar
                                </Button>
                            </Box>   
                        <Link
                          component="button"
                          variant="body2"
                          onClick={() => {
                            aRegistro();
                          }}
                        >
                          Crear cuenta
                        </Link>
                        </Box>                    
                    </CardContent>
                </Card>
            {/* </Container> */}
          
        {/* </ThemeProvider> */}
     </div>
    );
}
 
export default Login;