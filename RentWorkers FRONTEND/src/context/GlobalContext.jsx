import React, { createContext, useState, useContext } from 'react';
import { dadosUsuarioLogado } from '../config/axios';

// Criação do contexto
export const UserContext = createContext();

// Componente Provider
export const UserProvider = ({ children }) => {

  const [token, setToken] = useState();
  const [usuario, setUsuario] = useState();
  const [count, setCount] = useState()

  

  const login = (jwtToken, usuario) => {
    setToken(jwtToken);
    localStorage.setItem("token", jwtToken);
    setUsuario(usuario)
    localStorage.setItem("usuario", JSON.stringify(usuario));
  };

  const logout = () => {
    setToken(null);
    setUsuario(null);
    localStorage.clear();
  };
 if(usuario != null && count < 1) {
    dadosUsuarioLogado(usuario.id_usuario).then((response) => {
    setUsuario(response.data)
    localStorage.setItem("usuario", JSON.stringify(response.data))
  }).catch((error) => {
    console.log("Não existe um usuario com este ID")
    console.log(error)
  })
 }
  


  return (
    <UserContext.Provider value={{ token, login, logout, usuario }}>
      {children}
    </UserContext.Provider>
  );
};


export const useUserContext = () => useContext(UserContext);
