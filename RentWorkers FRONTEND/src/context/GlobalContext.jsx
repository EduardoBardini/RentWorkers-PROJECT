import React, { createContext, useContext, useState } from 'react';

export const UserContext = createContext();

export function UserProvider({ children }) {
    const [idUsuarioLogado, setIdUsuarioLogado ] = useState();
    
    function usuarioLogado( id ) {
        setIdUsuarioLogado(id);
    }
    
    return (
      <UserContext.Provider value={{ idUsuarioLogado, setIdUsuarioLogado }}>
        {children}
      </UserContext.Provider>
    );
}

export function useUserProvider() {
    return useContext(UserContext);
}
  
  
