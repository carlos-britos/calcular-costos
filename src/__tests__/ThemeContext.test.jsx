import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, useTheme } from '../contexts/ThemeContext';

// Mock de localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock de matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })),
});

const TestComponent = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme-status">{isDarkMode ? 'dark' : 'light'}</span>
      <button onClick={toggleTheme} data-testid="toggle-theme">Toggle</button>
    </div>
  );
};

describe('ThemeContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  it('provides theme context', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme-status')).toHaveTextContent('light');
    expect(screen.getByTestId('toggle-theme')).toBeInTheDocument();
  });

  it('toggles theme', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByTestId('toggle-theme'));
    expect(screen.getByTestId('theme-status')).toHaveTextContent('dark');
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark');
  });
});