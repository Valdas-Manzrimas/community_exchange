import React, { ReactNode } from 'react';

interface ProviderProps<T> {
  value: T;
  children?: ReactNode;
}

// Create the context
const AppContext = React.createContext<{
  state: {};
  setState: React.Dispatch<React.SetStateAction<{}>>;
} | null>(null);

// Create a provider component
export const AppProvider = ({
  children,
}: ProviderProps<{
  state: {};
  setState: React.Dispatch<React.SetStateAction<{}>>;
}>) => {
  const [state, setState] = React.useState({}); // Replace with your own state

  // Any additional logic goes here

  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
