import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { TestDataGenerator } from '../utils/testData';

test.describe('User Registration - Critical Path', () => {
  let loginPage: LoginPage;
  let registerPage: RegisterPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    registerPage = new RegisterPage(page);
    await loginPage.navigate('/parabank/index.htm');
    await loginPage.goToRegistration();
  });

  test('TC004 - Verify successful user registration with valid data', async ({ page }) => {
    const userData = TestDataGenerator.generateUserData();

    await registerPage.fillRegistrationForm(userData);
    await registerPage.submitRegistration();
    await page.waitForLoadState('networkidle');

    const isSuccessful = await registerPage.isRegistrationSuccessful();
    expect(isSuccessful).toBeTruthy();
    
    const successMessage = await registerPage.getSuccessMessage();
    expect(successMessage).toContain('successfully');
  });

  test('TC005 - Verify registration validation with missing required fields', async ({ page }) => {
    const usernameInput = page.locator('input[id="customer.username"]');
    const passwordInput = page.locator('input[id="customer.password"]');
    const confirmPasswordInput = page.locator('input[id="repeatedPassword"]');
    
    await usernameInput.fill('testuser');
    await passwordInput.fill('Test123!');
    await confirmPasswordInput.fill('Test123!');

    await registerPage.submitRegistration();
    await page.waitForTimeout(1000);

    const errorMessage = await registerPage.getErrorMessage();
    expect(errorMessage).toBeTruthy();
  });
});