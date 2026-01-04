import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';

// Mock useAuth
vi.mock('../contexts/AuthContext', () => ({
  useAuth: vi.fn(),
}));

import { useAuth } from '../contexts/AuthContext';

describe('ProtectedRoute', () => {
  it('redirects to login if no user', () => {
    useAuth.mockReturnValue({ currentUser: null, userRole: null });
    const { container } = render(
      <MemoryRouter>
        <ProtectedRoute>
          <div>Protected Content</div>
        </ProtectedRoute>
      </MemoryRouter>
    );
    expect(container.innerHTML).toBe('');
  });

  it('renders children if user exists', () => {
    useAuth.mockReturnValue({ currentUser: { uid: '123' }, userRole: 'user' });
    const { getByText } = render(
      <MemoryRouter>
        <ProtectedRoute>
          <div>Protected Content</div>
        </ProtectedRoute>
      </MemoryRouter>
    );
    expect(getByText('Protected Content')).toBeInTheDocument();
  });
});