import React from 'react';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
  const storedUser = localStorage.getItem("currentUser");

  if (!storedUser) return <Navigate to="/" />;

  try {
    const user = JSON.parse(storedUser);
    const isAuthenticated = !!user.token;

    return isAuthenticated ? children : <Navigate to="/" />;
  } catch (e) {

    return <Navigate to="/" />;
  }
}
