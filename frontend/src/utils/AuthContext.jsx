import React, { createContext, useContext, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => (AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    // Pas besoin de récupérer l'utilisateur du localStorage ici
  }, []);

  const login = (token, userInfo) => {
    localStorage.setItem('token', token); // On garde le token dans le localStorage pour persister la session
    setIsAuthenticated(true);
    setUser(userInfo); // On met à jour l'état avec les informations de l'utilisateur
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
    Navigate('/');  // Redirige vers la page d'accueil après une connexion réussie
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
