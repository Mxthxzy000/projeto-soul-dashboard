import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="spinner">Carregando...</div> // Pode criar um spinner melhor
  }

  return user ? children : <Navigate to="/login" replace />
}