import React, {PropsWithChildren, createContext, useContext, useState} from 'react';

type ContextType = {
  isShow: boolean;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
};
type WelcomeContextProviderProps = PropsWithChildren<{}>;

export const Context = createContext<ContextType | null>(null);

export const WelcomeContextProvider: React.FC<WelcomeContextProviderProps> = ({children}) => {
  const [isShow, setIsShow] = useState(true);

  return <Context.Provider value={{isShow, setIsShow}}>{children}</Context.Provider>;
};

export const useWelcome = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useAuth must be used within a  WelcomeContextProvider');
  }

  return context;
};
