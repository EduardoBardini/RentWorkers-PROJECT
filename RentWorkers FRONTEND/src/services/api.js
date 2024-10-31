import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8080'
})

export const criarUsuario = (usuario) => axios.post('http://localhost:8080/criarUsuario', usuario);

export default api;