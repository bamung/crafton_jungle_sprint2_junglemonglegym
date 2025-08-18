// client/src/components/Protected.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../store/auth";

export default function Protected({ children }: { children: JSX.Element }) {
  const token = useAuth((s) => s.token);
  if (!token) return <Navigate to="/login" replace />;
  return children;
}
