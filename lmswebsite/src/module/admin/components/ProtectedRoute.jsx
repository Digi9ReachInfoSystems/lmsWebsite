// src/module/admin/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
 
const ProtectedRoute = ({ children, allowedRoles  }) => {
  // Retrieve the session data from localStorage
  const sessionData = JSON.parse(localStorage.getItem("sessionData")) || {};
  const { userId, role } = sessionData;
 
  // 1. If there's no userId, the user is not logged in
  if (!userId) {
    return <Navigate to="/" replace />;
  }
 
  // 2. If the route is restricted to certain roles and the current role is not included, redirect
  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }
 
  // 3. If authenticated and has the correct role, render the protected component
  return children;
};
 
export default ProtectedRoute;