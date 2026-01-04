import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
   const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/');
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Crear documento de usuario
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          role: 'user',
          approved: false,
          email: email,
        });
        setError('Registro exitoso. Espera aprobación del administrador.');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-xl">
      <div className="bg-surface-light dark:bg-surface-dark p-xl rounded-lg shadow-md border border-border-light dark:border-border-dark">
        <h2 className="text-2xl font-bold mb-lg text-center text-textPrimary-light dark:text-textPrimary-dark">
          {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
        </h2>
        {error && <p className="text-danger-light dark:text-danger-dark mb-md">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-md">
            <label htmlFor="email" className="block text-sm font-medium mb-sm text-textPrimary-light dark:text-textPrimary-dark">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-md border border-border-light dark:border-border-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark focus:shadow-[0_0_0_3px_rgba(48,110,232,0.2)] bg-surface-light dark:bg-surface-dark text-textPrimary-light dark:text-textPrimary-dark"
              required
            />
          </div>
          <div className="mb-lg">
            <label htmlFor="password" className="block text-sm font-medium mb-sm text-textPrimary-light dark:text-textPrimary-dark">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-md border border-border-light dark:border-border-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark focus:shadow-[0_0_0_3px_rgba(48,110,232,0.2)] bg-surface-light dark:bg-surface-dark text-textPrimary-light dark:text-textPrimary-dark"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-accent-light dark:bg-accent-dark text-textPrimary-dark py-md rounded-lg font-medium hover:transform hover:-translate-y-1 hover:shadow-md transition-all"
          >
            {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
          </button>
        </form>
        <p className="mt-md text-center text-textSecondary-light dark:text-textSecondary-dark">
          {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-accent-light dark:text-accent-dark ml-sm hover:underline"
          >
            {isLogin ? 'Regístrate' : 'Inicia Sesión'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;