import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export default function RequireAuth({ children }) {
  const getToken = () => {
    const cookies = document.cookie.split(';');
    const token = cookies.find(c => c.trim().startsWith('authToken='));
    return token ? token.split('=')[1] : null;
  };

  try {
    const token = getToken();
    if (!token) throw new Error('Pas de token');
    jwtDecode(token); // Vérifie la validité
    return children;
  } catch (error) {
    return <Navigate to="/auth" replace />;
  }
}
