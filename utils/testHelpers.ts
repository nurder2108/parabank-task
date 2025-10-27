import { Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { TestDataGenerator, TEST_USERS } from './testData';

export class TestHelpers {
  static async loginAsValidUser(page: Page) {
    const loginPage = new LoginPage(page);
    await loginPage.navigate('/parabank/index.htm');
    await loginPage.login(TEST_USERS.valid.username, TEST_USERS.valid.password);
  }

  static async registerNewUser(page: Page) {
    const loginPage = new LoginPage(page);
    const registerPage = new RegisterPage(page);
    
    await loginPage.navigate('/index.htm');
    await loginPage.goToRegistration();
    
    const userData = TestDataGenerator.generateUserData();
    await registerPage.fillRegistrationForm(userData);
    await registerPage.submitRegistration();
    
    return userData;
  }

  static async waitForNetworkIdle(page: Page, timeout: number = 5000) {
    await page.waitForLoadState('networkidle', { timeout });
  }
}