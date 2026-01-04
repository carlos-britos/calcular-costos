import { test, expect } from '@playwright/test';

test.describe('Login', () => {
  test('should show login form', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await expect(page.getByRole('heading', { name: 'Iniciar Sesión' })).toBeVisible();
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Contraseña')).toBeVisible();
  });

  test('should switch to register form', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await page.getByText('Regístrate').click();
    await expect(page.getByRole('heading', { name: 'Registrarse' })).toBeVisible();
  });
});