'use client'
import React, { createContext, useContext, useState } from 'react';

export const GlobalContext = createContext<any>(null);

export const useGlobalContext = () => useContext(GlobalContext);

interface GlobalProviderProps {
  user: any;
  children: React.ReactNode;
}

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ user, children }) => {
  const [activeUserId, setActiveUserID] = useState<any>(user);

  return (
    <GlobalContext.Provider value={{ activeUserId, setActiveUserID }}>
      {children}
    </GlobalContext.Provider>
  );
};