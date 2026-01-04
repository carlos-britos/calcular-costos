import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../components/Navbar';
import { AuthProvider } from '../contexts/AuthContext';
import { ThemeProvider } from '../contexts/ThemeContext';
import { BrowserRouter } from 'react-router-dom';

// Mock de firebase auth
vi.mock('firebase/auth', () => ({
  onAuthStateChanged: vi.fn((auth, callback) => {
    // Simular que no hay usuario autenticado
    callback(null);
    return vi.fn(); // unsubscribe function
  }),
}));

// Mock de firebase firestore
vi.mock('firebase/firestore', () => ({
  doc: vi.fn(),
  getDoc: vi.fn(() => ({
    exists: vi.fn(() => false),
    data: vi.fn(() => ({})),
  })),
}));

// Mock de firebase local
vi.mock('../firebase', () => ({
  auth: {},
  db: {},
}));

// Mock de logout
vi.mock('../utils/logout', () => ({
  default: vi.fn(),
}));

describe('Navbar', () => {
  it('renders correctly', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider>
            <Navbar />
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    expect(screen.getByText('Seguimiento de Gastos')).toBeInTheDocument();
  });
});