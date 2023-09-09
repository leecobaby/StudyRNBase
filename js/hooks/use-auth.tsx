import React, {PropsWithChildren, createContext, useContext, useState} from 'react';

type AuthContextType = {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
};
type AuthContextProviderProps = PropsWithChildren<{}>;

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({children}) => {
  const [isLogin, setIsLogin] = useState(false);

  return <AuthContext.Provider value={{isLogin, setIsLogin}}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthContextProvider');
  }

  return context;
};
