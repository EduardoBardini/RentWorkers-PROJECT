import React, { createContext, useState, useContext } from 'react';

// Criação do contexto
export const UserContext = createContext();

// Componente Provider
export const UserProvider = ({ children }) => {

  const [token, setToken] = useState(localStorage.getItem("token"));

  const login = (jwtToken) => {
    setToken("eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzci5qYWNrZGlhc0BnbWFpbC5jb20iLCJpYXQiOjE3MzE2MjM5MTYsImV4cCI6MTczMTYyMzk1Mn0.Yuj4SqyFplcoEKbuS9eEYjDwueVc-2o40JLqfhxyS_0");
    localStorage.setItem("token", "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzci5qYWNrZGlhc0BnbWFpbC5jb20iLCJpYXQiOjE3MzE2MjM5MTYsImV4cCI6MTczMTYyMzk1Mn0.Yuj4SqyFplcoEKbuS9eEYjDwueVc-2o40JLqfhxyS_0");
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
