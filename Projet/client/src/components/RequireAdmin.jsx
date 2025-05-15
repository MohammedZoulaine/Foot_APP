import React from 'react';
import { Navigate } from 'react-router-dom';

export default function RequireAdmin({ children }) {
  const isAdmin = document.cookie
    .split('; ')
    .find((row) => row.startsWith('isAdmin='))
    ?.split('=')[1] === 'true';

  return isAdmin ? children : <Navigate to="/auth" replace />;
}
