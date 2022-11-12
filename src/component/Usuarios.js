import { Grid } from '@mui/material'
import React from 'react'
import RegistroUsuarios from './RegistroUsuarios'
import UsuariosInfo from './UsuariosInfo'

const Usuarios
 = () => {
  return (
    <>
      <Grid container spacing={2}>      
        <Grid xs={12} md={7} lg={7}>
          <UsuariosInfo />
        </Grid>        
        <Grid xs={12} md={5} lg={5}>
          <RegistroUsuarios />
        </Grid>      
      </Grid>
    </>
  )
}

export default Usuarios

