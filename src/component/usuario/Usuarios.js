import { Grid } from '@mui/material'
import React from 'react'
import RegistroUsuarios from './RegistroUsuarios'
import UsuariosInfo from './UsuariosInfo'

const Usuarios
 = ({perfil}) => {
  
  return (
    <>
      <Grid container spacing={2} >      
        <Grid item xs={12} md={5} lg={5}>
        <RegistroUsuarios />
        </Grid>        
        <Grid item xs={12} md={7} lg={7}>
        <UsuariosInfo />
        </Grid>      
      </Grid>
    </>
  )
}

export default Usuarios

