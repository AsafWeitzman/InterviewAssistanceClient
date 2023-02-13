import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { authState } = useContext(AuthContext);

  if (!authState) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
