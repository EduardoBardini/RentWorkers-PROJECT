import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/", 
  timeout: 10000, 
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});



api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); 

    console.log(token)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export const listaUsuarios = () => {
    return axios.get('http://localhost:8080/usuarios')
}

export const listaTrabalhadores = () => {
    return axios.get('http://localhost:8080/usuarios/trabalhadores')
}

export const validaCep = (cep) => {
    return axios.get(`viacep.com.br/ws/${cep}/json/`)
}


// Corrigir a exportação da função atualizarUsuario
export const atualizarUsuario = async (dadosAtualizado) => {
    try {
        const response = await api.patch(`/usuarios/${dadosAtualizado.id_usuario}`, dadosAtualizado);
        return response.data; // Alterado para retornar os dados da resposta
    } catch (error) {
        throw error;
    }
};



export default api;
