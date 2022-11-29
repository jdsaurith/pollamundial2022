import React, { useState, useEffect } from 'react'
import { Table, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TableBody, Paper, TextField, Alert } from '@mui/material'
import styled from '@emotion/styled';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Paginacion from '../layouts/Paginacion';

//fortawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCancel, faEdit, faSave, faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons';

import { useDispatch, useSelector } from 'react-redux';

import { editarUsuarioAction, guardaUsuarioEditarAction } from '../../action/usuarioAction';
import Swal from 'sweetalert2';
import ModalPerfil from './ModalPerfil';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#006db3',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
}));

const Perfil = () => {
    const [error, guardarError] = useState(false);
    const [editar, setEditar] = useState(false);
    const [modalusuarioeditar, setModalUsuarioEditar] = useState(false);
    const [openUsuario, setOpenUsuario] = useState(false);

    const [usuarioeditar, setUsuarioeditar] = useState({
      usuario:'',
      password:''
    })

    const dispatch = useDispatch();
    const actualizarUsuario = (u) => dispatch(editarUsuarioAction(u));
    const obtenerEditarUsuario = (u) => dispatch(guardaUsuarioEditarAction(u));

    const infousuario = useSelector(state => state.auth.usuario);
    
    ///destructuring del state
    const {usuario, password } = usuarioeditar;

    useEffect(() => {
      if(editar){
        setUsuarioeditar({
          id_usuario: infousuario?.id_usuario,
          nombres: infousuario?.nombres,
          usuario: infousuario?.usuario,
          password: '',
          tipousuario: infousuario?.tipousuario,
          recaudado: infousuario?.recaudado,
          estado: infousuario?.estado
        })
      }
    }, [editar])

    useEffect(() => {
      if(modalusuarioeditar){
        setOpenUsuario(true);
      }
      // eslint-disable-next-line
    }, [modalusuarioeditar])

    //Leer los valores del formulario
    const handleChange = React.useCallback((e) => {
      setUsuarioeditar(
        {
          ...usuarioeditar,
          [e.currentTarget.name]: e.currentTarget.value
        },
        [usuarioeditar]
      );
      guardarError(false);
    });
    
    const editarUsuario = (u) =>{ 
      obtenerEditarUsuario(u);
      // setEditar(true);
      setModalUsuarioEditar(true);
    }
    
    const guardarEditar = (usuario) =>{
      const pais = 'COL';
      if(usuario.usuario.trim() === '' || usuario.password.trim() === '' ){
        guardarError(true);
        return;
      }
      Swal.fire({
        icon: 'info',
        title: 'Desea Actualizar sus datos?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: `Si, Actualizar`,
        denyButtonText: `No`,
      }).then(result =>{
        if (result.isConfirmed){
          actualizarUsuario({usuario, pais});
        }

      })
    }
    const cancelarEditar = () =>{
      setEditar(false);
    }

    ///cerrar modales
    const handleClose =  () =>{
      setOpenUsuario(false);
      // cerrarModalUsuario();
    }

  return (
    <>
    {modalusuarioeditar &&
        <ModalPerfil
          classes={{maxWidth:'600', maxHeight:'600' }}
          id="newusuario"
          keepMounted
          open={openUsuario}
          onClose={handleClose}
          datos={usuarioeditar}
        />}
        <TableContainer component={Paper}>
            {error && (
              <Alert variant="filled" severity="error">
                Todos los campos son obligatorios
              </Alert>
            )}
            <Table sx={{ minWidth: 400 }} aria-label="customized table">
            <TableHead>
                <TableRow>
                <StyledTableCell >Nombres</StyledTableCell>
                <StyledTableCell >Usuario</StyledTableCell>
                <StyledTableCell >Contraseña</StyledTableCell>
                <StyledTableCell >Acciones</StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {infousuario === null ? (
                    <TableRow>
                        <StyledTableCell colSpan={4}>Cargando datos..</StyledTableCell>
                    </TableRow>
                ):
                <StyledTableRow key={infousuario?.idusuario}>
                    <StyledTableCell component="th" scope="row" >{infousuario?.nombres}</StyledTableCell>
                    {!editar ?
                    <StyledTableCell >{infousuario?.usuario}</StyledTableCell>
                    :
                    <StyledTableCell >
                      <TextField
                        required
                        name="usuario"
                        margin="normal"
                        label="Usuario"
                        placeholder="Usuario"
                        variant="outlined"
                        // className={classes.textmulti}
                        value={usuario}
                        onChange={handleChange}
                        color="secondary"
                      />
                    </StyledTableCell>
                    }
                    {!editar ?
                      <StyledTableCell>**********</StyledTableCell>
                      :
                      <StyledTableCell>
                        <TextField
                          required
                          name="password"
                          margin="normal"
                          label="Password"
                          placeholder="Password"
                          variant="outlined"
                          value={password}
                          onChange={handleChange}
                          color="secondary"
                        />
                      </StyledTableCell>
                    }
                    <StyledTableCell >
                      {!editar ? null
                    //   <FontAwesomeIcon
                    //   style={{
                    //     margin:  '1px',
                    //     cursor: 'pointer'
                    //   }}
                    //   title="Editar"
                    //   name="editar"
                    //   icon={faEdit}
                    //   color="#363636"
                    //   size="2x"
                    //   // onClick={()=>editarUsuario()}
                    //   onClick={()=>editarUsuario(infousuario)}
                    // />
                    :
                    <>
                    <FontAwesomeIcon
                      style={{
                        margin:  '1px',
                        cursor: 'pointer'
                      }}
                      title="Guardar"
                      name="guardar"
                      icon={faSave}
                      color="#363636"
                      size="2x"
                      onClick={()=>guardarEditar(usuarioeditar)}
                    />
                    <FontAwesomeIcon
                      style={{
                        margin:  '1px',
                        cursor: 'pointer'
                      }}
                      title="Cancelar"
                      name="cancelar"
                      icon={faCancel}
                      color="#363636"
                      size="2x"
                      onClick={()=>cancelarEditar()}
                    />
                    </>
                  
                  }                       
                    </StyledTableCell>
                </StyledTableRow>
            }
            </TableBody>
            {/* <TableFooter>
                <TableRow>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                        colSpan={5}
                        count={usuarios.length === 0 ? 0 : usuarios.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                            inputProps: {
                            'aria-label': 'rows per page',
                            },
                            native: true,
                        }}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        ActionsComponent={Paginacion}
                    />
                </TableRow>
            </TableFooter> */}
            </Table>
        </TableContainer>        
    </>
  )
}

export default Perfil