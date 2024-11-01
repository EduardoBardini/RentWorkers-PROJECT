import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8080/usuarios'
})

export const listaUsuarios = () => {
    return axios.get('http://localhost:8080/usuarios')
}

export const criarUsuario = (usuario) => axios.post('http://localhost:8080/usuarios', usuario);

export default api;