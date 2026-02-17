import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }) {
  const token = localStorage.getItem("token");

  // already logged in -> go to home
  if (token) {
    return <Navigate to="/home" replace />;
  }

  return children;
}
