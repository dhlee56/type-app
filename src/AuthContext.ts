import React, { createContext, useState, ReactNode, useContext } from 'react';

// Define the shape of our context
interface AuthContextType {
  authUser: string | null;
  setAuthUser: (user: string | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  isAuthenticated: boolean;
}

// Create the context with a default value
export const AuthContext = createContext<AuthContextType>({
  authUser: null,
  setAuthUser: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Props for the AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}

// Create a provider component
export const AuthProvider = ({ children }: AuthProviderProps): React.ReactElement => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authUser, setAuthUser] = useState<string | null>(null);

  const value = {
    isAuthenticated,
    setIsAuthenticated,
    authUser,
    setAuthUser
  };

  return React.createElement(
    AuthContext.Provider,
    { value },
    children
  );
  // return (
  //   <AuthContext.Provider value={value}>
  //     {children}
  //   </AuthContext.Provider>
  // );
};
