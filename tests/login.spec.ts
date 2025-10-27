import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AccountsPage } from '../pages/AccountsPage';
import { TEST_USERS } from '../utils/testData';

test.describe('Login Functionality - Critical Path', () => {
  let loginPage: LoginPage;
  let accountsPage: AccountsPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    accountsPage = new AccountsPage(page);
    await loginPage.navigate('/parabank/index.htm');
    // Note: ParaBank URL uses index.htm, not index.html
  });

  test('TC001 - Verify successful login with valid credentials', async ({ page }) => {
    const { username, password } = TEST_USERS.valid;

    await loginPage.login(username, password);
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveURL(/.*overview.htm/);
    const isLoggedIn = await accountsPage.isLoggedIn();
    expect(isLoggedIn).toBeTruthy();
    
    const welcomeText = await accountsPage.getWelcomeMessage();
    expect(welcomeText).toContain('Welcome');
  });

  test('TC002 - Verify login failure with invalid credentials', async ({ page }) => {
    const { username, password } = TEST_USERS.invalid;

    await loginPage.login(username, password);
    await page.waitForTimeout(1000);

    const isErrorDisplayed = await loginPage.isErrorDisplayed();
    expect(isErrorDisplayed).toBeTruthy();
  });

  test('TC003 - Verify logout functionality', async ({ page }) => {
    const { username, password } = TEST_USERS.valid;
    await loginPage.login(username, password);
    await page.waitForLoadState('networkidle');

    await accountsPage.logout();
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveURL(/.*index.htm/);
    const loginButton = page.locator('input[type="submit"][value="Log In"]');
    await expect(loginButton).toBeVisible();
  });
});