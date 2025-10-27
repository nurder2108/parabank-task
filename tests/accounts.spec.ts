import { test, expect } from '@playwright/test';
import { AccountsPage } from '../pages/AccountsPage';
import { TestHelpers } from '../utils/testHelpers';

test.describe('Account Management - Critical Path', () => {
  let accountsPage: AccountsPage;

  test.beforeEach(async ({ page }) => {
    accountsPage = new AccountsPage(page);
    await TestHelpers.loginAsValidUser(page);
    await page.waitForLoadState('networkidle');
  });

  test('TC006 - Verify accounts overview displays correctly', async ({ page }) => {
    await accountsPage.goToAccountsOverview();
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveURL(/.*overview.htm/);
    const accountNumbers = await accountsPage.getAccountNumbers();
    expect(accountNumbers.length).toBeGreaterThan(0);
  });

  test('TC007 - Verify account balance format and display', async ({ page }) => {
    await accountsPage.goToAccountsOverview();
    await page.waitForLoadState('networkidle');

    const balanceElements = page.locator('#accountTable tbody tr td:nth-child(2)');
    const balanceCount = await balanceElements.count();

    expect(balanceCount).toBeGreaterThan(0);
    
    for (let i = 0; i < balanceCount; i++) {
      const balanceText = await balanceElements.nth(i).textContent();
      expect(balanceText).toMatch(/\$[\d,]+\.\d{2}/);
    }
  });
});