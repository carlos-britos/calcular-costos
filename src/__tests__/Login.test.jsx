import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '../contexts/ThemeContext';
import Login from '../pages/Login';

// Mock de firebase
vi.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: vi.fn(() => Promise.resolve({ user: { uid: '123' } })),
  signInWithEmailAndPassword: vi.fn(() => Promise.resolve()),
}));

vi.mock('firebase/firestore', () => ({
  doc: vi.fn(),
  setDoc: vi.fn(),
}));

vi.mock('../firebase', () => ({
  auth: {},
  db: {},
}));

// Mock de useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
 });

// Mock de localStorage para ThemeContext
const localStorageMock = {
  getItem: vi.fn(() => null),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
global.localStorage = localStorageMock;

// Mock de matchMedia para ThemeContext
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

describe('Login', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders login form', () => {
    render(
      <BrowserRouter>
        <ThemeProvider>
          <Login />
        </ThemeProvider>
      </BrowserRouter>
    );

    expect(screen.getByRole('heading', { name: 'Iniciar Sesión' })).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Contraseña')).toBeInTheDocument();
  });

  it('switches to register form', () => {
    render(
      <BrowserRouter>
        <ThemeProvider>
          <Login />
        </ThemeProvider>
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText('Regístrate'));
    expect(screen.getByRole('heading', { name: 'Registrarse' })).toBeInTheDocument();
  });
});