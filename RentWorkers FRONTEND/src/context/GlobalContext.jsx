import React, { createContext, useState, useContext } from 'react';

// Criação do contexto
export const UserContext = createContext();

// Componente Provider
export const UserProvider = ({ children }) => {
  const [idUsuarioLogado, setIdUsuarioLogado] = useState(null);

  // Lógica para definir o idUsuarioLogado (por exemplo, a partir do login)
  const login = (id) => {
    setIdUsuarioLogado(id); // Atualiza o id do usuário logado
  };

  return (
    <UserContext.Provider value={{ idUsuarioLogado, login }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook para acessar o contexto
export const useUserContext = () => useContext(UserContext);
