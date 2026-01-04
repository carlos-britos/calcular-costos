import { describe, it, expect, vi } from 'vitest';

// Mock modules before importing
vi.mock('firebase/auth', () => ({
  signOut: vi.fn(),
}));

vi.mock('../firebase', () => ({
  auth: {},
}));

import handleLogout from '../utils/logout';
import { signOut } from 'firebase/auth';

describe('handleLogout', () => {
  it('calls signOut', async () => {
    await handleLogout();
    expect(signOut).toHaveBeenCalledWith({});
  });
});