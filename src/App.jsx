import { Routes, Route } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { useTheme } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const { loading } = useAuth();
  const { isDarkMode } = useTheme();

  if (loading) {
    return (
      <div className={`min-h-screen w-screen flex items-center justify-center bg-bg-light dark:bg-bg-dark`}>
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-light dark:border-accent-dark"></div>
          <div className="text-xl font-medium text-textSecondary-light dark:text-textSecondary-dark">Cargando...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen w-screen bg-bg-light dark:bg-bg-dark text-textPrimary-light dark:text-textPrimary-dark px-4`}>
      <Navbar />
      <main className="w-full py-8">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute adminOnly>
              <AdminPanel />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
    </div>
  );
}

export default App;