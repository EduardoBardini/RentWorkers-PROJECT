import React, { createContext, useState, useContext } from 'react';

// Criação do contexto
export const UserContext = createContext();

// Componente Provider
export const UserProvider = ({ children }) => {

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [usuario, setUsuario] = useState(JSON.parse(localStorage.getItem("usuario")));

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

  const isAuthenticated = () => !!token;  

  return (
    <UserContext.Provider value={{ token, login, logout, isAuthenticated, usuario }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook para acessar o contexto
export const useUserContext = () => useContext(UserContext);
