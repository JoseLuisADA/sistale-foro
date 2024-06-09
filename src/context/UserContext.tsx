//sistaleforo-web-final/src/context/UserContext.tsx
'use client';
import React, { createContext, useContext, useState } from 'react';
import { UserProps } from '../types/userProps';

export interface UserContextType {
  user: UserProps;
  setUser: React.Dispatch<React.SetStateAction<UserProps>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProps>({ username: '', role: '', token: '' });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
