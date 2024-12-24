// src/module/admin/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Retrieve the session data from localStorage
  const sessionData = JSON.parse(localStorage.getItem("sessionData")) || {};

  if (!sessionData.role) {
    console.log("heheh", 11)
    return children
  }


  if (sessionData.role) {
    const { userId, role } = sessionData;

   
    // 2. If the route is restricted to certain roles and the current role is not included, redirect
    if (role == "teacher") {
      return <Navigate to="/teacher/dashboard" replace />;
    } else if (role == "student") {
      console.log("student");
      return <Navigate to="/student/dashboard" replace />;
    } else if (role == "admin") {
      return <Navigate to="/admin" replace />
    }
  }
  // 3. If authenticated and has the correct role, render the protected component
  return children;
};

export default ProtectedRoute;
