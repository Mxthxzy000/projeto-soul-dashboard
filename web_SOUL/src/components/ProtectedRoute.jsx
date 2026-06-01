import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ADMIN_EMAIL = 'admin@gmail.com'

export function ProtectedRoute({ children, adminOnly = false }) {
  const { userAuth, usuario, loading } = useAuth()

  if (loading) {
    return <div className="spinner">Carregando...</div>
  }

  if (!userAuth) {
    return <Navigate to="/login" replace />
  }

  if (adminOnly && usuario?.email?.toLowerCase() !== ADMIN_EMAIL) {
    return <Navigate to="/conta" replace />
  }

  return children
}