import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8080/usuarios'
})

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
