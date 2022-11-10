import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { 
    Card, CardContent, Container, Box, 
    TextField, Button, FormControlLabel,
    Typography, Checkbox, Link, Grid 
} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

let theme = createTheme({
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

    const [datos, setDatos] = useState({
        usuario: '',
        password: ''
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        console.log({
          usuario: data.get('usuario'),
          password: data.get('password'),
        });

        if(data.get('usuario') === "jdsaurith" & data.get('password') === "123"){
            history.push("/home");
        }else if(data.get('usuario') === "ciac" & data.get('password') === "123"){
            history.push("/ticketusuario");
        }else{
            console.log("Usuario Erroneo")
        }
    };

    return ( 
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs" >
                <CssBaseline />
                {/* sx={{ minWidth: 275 , maxWidth: 900}} */}
                <Card sx={{ minWidth: 400, margin: 2 }}>
                    <CardContent>                  
                        <Box
                            sx={{
                                marginTop: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ width: 82, height: 72, bgcolor: 'white' }}>
                                <img src={'/static/images/avatar/ausol-logo.png'} />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                SISTEMA GROOT
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
                                />
                                <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                                />

                                <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                >
                                Ingresar
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                        <Link href="#" variant="body2">
                                        Forgot password?
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link href="#" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>   
                        </Box>                    
                    </CardContent>
                </Card>
            </Container>
        </ThemeProvider>
    );
}
 
export default Login;