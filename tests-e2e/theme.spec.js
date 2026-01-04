import { test, expect } from '@playwright/test';

test.describe('Theme Toggle', () => {
  test('should toggle theme from navbar', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    // Find button containing SVG
    const themeButton = page.locator('button').locator('svg').locator('..');
    await expect(themeButton).toBeVisible();

    // Click to toggle
    await themeButton.click();

    // Check if html has dark class
    const html = page.locator('html');
    await expect(html).toHaveClass(/dark/);
  });
});