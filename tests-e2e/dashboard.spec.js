import { test, expect } from '@playwright/test';

test.describe('Dashboard', () => {
  test('should redirect to login when not authenticated', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForURL('http://localhost:5173/login');
    await expect(page).toHaveURL(/login/);
  });
});