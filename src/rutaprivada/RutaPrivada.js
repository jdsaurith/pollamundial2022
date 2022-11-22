import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { usuarioAutenticadoAction } from '../action/authAction';

const Rutaprivada = ({ component: Component, ...props}) => {

    const dispatch = useDispatch();
    const { path } = props

    const validarsesion = () => dispatch( usuarioAutenticadoAction());

    const conectado = useSelector(state => state.auth.conectado);
    const cargando = useSelector(state => state.auth.cargando);

    
    useEffect(() => {
        validarsesion();
    },[path])

    return (
        
        <Route { ...props } render={ props => !conectado && !cargando ? (
            <Redirect to='/' />
        ) : <React.Fragment>{conectado &&  (
            <Component {...props } />
        )}  </React.Fragment> }
        />
     );
}

export default Rutaprivada;