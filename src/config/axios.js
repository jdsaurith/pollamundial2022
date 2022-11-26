import axios from 'axios';

const clienteAxios = axios.create({
    // baseURL: 'https://servidorrissetto.de:443/api/'
    baseURL: 'http://localhost:5000/api/'
    // baseURL: 'https://servidormercadocentral-production.up.railway.app/api/'
});

export default clienteAxios;