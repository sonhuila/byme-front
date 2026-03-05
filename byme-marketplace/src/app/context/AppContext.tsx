import React, { createContext, useContext, useState } from 'react';
import { IMGS } from '../data/mockData';

export type DemoRole = 'visitor' | 'usuario' | 'profesional' | 'admin';

interface AppContextType {
  role: DemoRole;
  setRole: (role: DemoRole) => void;
  userName: string;
  userPhoto: string;
  isLoggedIn: boolean;
}

const AppContext = createContext<AppContextType>({
  role: 'visitor',
  setRole: () => {},
  userName: '',
  userPhoto: '',
  isLoggedIn: false,
});

const ROLE_DATA: Record<DemoRole, { userName: string; userPhoto: string }> = {
  visitor: { userName: '', userPhoto: '' },
  usuario: { userName: 'Felipe Arango', userPhoto: IMGS.man2 },
  profesional: { userName: 'Carlos Ramírez', userPhoto: IMGS.man1 },
  admin: { userName: 'Administrador', userPhoto: '' },
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<DemoRole>('visitor');

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        userName: ROLE_DATA[role].userName,
        userPhoto: ROLE_DATA[role].userPhoto,
        isLoggedIn: role !== 'visitor',
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
