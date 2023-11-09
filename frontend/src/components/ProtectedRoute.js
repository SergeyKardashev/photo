import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ element: Component, onlyUnAuth, user, children, ...props }) {
  return props.loggedIn ? <Component {...props} /> : <Navigate to="/sign-in" replace />;
}

export default ProtectedRoute;
