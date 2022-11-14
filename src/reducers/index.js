import { combineReducers } from 'redux';

import authReducer from './authReducer';
import usuarioReducer from './usuarioReducer';
import resultadoReducer from './resultadoReducer';

export default combineReducers ({
    auth: authReducer,
    usuario: usuarioReducer, 
    resultado: resultadoReducer,
});