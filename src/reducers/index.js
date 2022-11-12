import { combineReducers } from 'redux';

import authReducer from './authReducer';
import usuarioReducer from './usuarioReducer';

export default combineReducers ({
    auth: authReducer,
    usuario: usuarioReducer, 
});