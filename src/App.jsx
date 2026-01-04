import { useTheme } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';

function App() {
  const { isDarkMode } = useTheme();

  return (
    <div className={`min-h-screen w-screen bg-bg-light dark:bg-bg-dark text-textPrimary-light dark:text-textPrimary-dark px-4`}>
      <Navbar />
      <main className="container mx-auto py-8">
        <Dashboard />
      </main>
    </div>
  );
}

export default App;