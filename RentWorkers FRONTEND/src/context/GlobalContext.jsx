import React, { createContext, useState, useContext } from 'react';

// Criação do contexto
export const UserContext = createContext();

// Componente Provider
export const UserProvider = ({ children }) => {

  const [token, setToken] = useState(localStorage.getItem("token"));

  const login = (jwtToken) => {
    setToken(jwtToken);
    localStorage.setItem("token", jwtToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const isAuthenticated = () => !!token;  

  return (
    <UserContext.Provider value={{ token, login, logout, isAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook para acessar o contexto
export const useUserContext = () => useContext(UserContext);
