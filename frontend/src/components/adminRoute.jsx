import { Navigate } from "react-router-dom";
import useAuth from "../context/useAuth";
import ProtectedRoute from "./protectedRoute";

function AdminRoute({ children }) {
  const { customer, loader } = useAuth();

  return (
    <ProtectedRoute>
      {loader ? null : customer?.role === "admin" ? children : <Navigate to="/" replace />}
    </ProtectedRoute>
  );
}

export default AdminRoute;