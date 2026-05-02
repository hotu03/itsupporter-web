import { Navigate, Outlet } from 'react-router';

export default function CustomerProtectedRoute() {
  const auth = sessionStorage.getItem("customer_auth");

  if (!auth) {
    return <Navigate to="/login" replace />;
  }

  try {
    const { email } = JSON.parse(auth);
    if (!email) {
      return <Navigate to="/login" replace />;
    }
  } catch {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}