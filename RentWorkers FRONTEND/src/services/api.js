import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8080/usuarios'
})


api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzci5qYWNrZGlhc0BnbWFpbC5jb20iLCJpYXQiOjE3MzE2MjM5MTYsImV4cCI6MTczMTYyMzk1Mn0.Yuj4SqyFplcoEKbuS9eEYjDwueVc-2o40JLqfhxyS_0"');  // Pegue o token de onde estiver armazenado (localStorage, cookies, etc.)
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;  // Adiciona o token ao cabeçalho Authorization
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);


export const listaUsuarios = () => {
    return axios.get('http://localhost:8080/usuarios')
}

export const criarUsuario = (usuario) => axios.post('http://localhost:8080/usuarios', usuario);

// Corrigir a exportação da função atualizarUsuario
export const atualizarUsuario = async (dadosAtualizado) => {
    try {
        const response = await api.put(`/usuarios/${dadosAtualizado.id_usuario}`, dadosAtualizado);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export default api;
