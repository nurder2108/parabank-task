import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class RegisterPage extends BasePage {
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly addressInput: Locator;
  private readonly cityInput: Locator;
  private readonly stateInput: Locator;
  private readonly zipCodeInput: Locator;
  private readonly phoneInput: Locator;
  private readonly ssnInput: Locator;
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly confirmPasswordInput: Locator;
  private readonly registerButton: Locator;
  private readonly successMessage: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.locator('input[id="customer.firstName"]');
    this.lastNameInput = page.locator('input[id="customer.lastName"]');
    this.addressInput = page.locator('input[id="customer.address.street"]');
    this.cityInput = page.locator('input[id="customer.address.city"]');
    this.stateInput = page.locator('input[id="customer.address.state"]');
    this.zipCodeInput = page.locator('input[id="customer.address.zipCode"]');
    this.phoneInput = page.locator('input[id="customer.phoneNumber"]');
    this.ssnInput = page.locator('input[id="customer.ssn"]');
    this.usernameInput = page.locator('input[id="customer.username"]');
    this.passwordInput = page.locator('input[id="customer.password"]');
    this.confirmPasswordInput = page.locator('input[id="repeatedPassword"]');
    this.registerButton = page.locator('input[value="Register"]');
    this.successMessage = page.locator('#rightPanel p');
    this.errorMessage = page.locator('.error').first();
  }

  async fillRegistrationForm(userData: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
    ssn: string;
    username: string;
    password: string;
  }) {
    await this.fillInput(this.firstNameInput, userData.firstName);
    await this.fillInput(this.lastNameInput, userData.lastName);
    await this.fillInput(this.addressInput, userData.address);
    await this.fillInput(this.cityInput, userData.city);
    await this.fillInput(this.stateInput, userData.state);
    await this.fillInput(this.zipCodeInput, userData.zipCode);
    await this.fillInput(this.phoneInput, userData.phone);
    await this.fillInput(this.ssnInput, userData.ssn);
    await this.fillInput(this.usernameInput, userData.username);
    await this.fillInput(this.passwordInput, userData.password);
    await this.fillInput(this.confirmPasswordInput, userData.password);
  }

  async submitRegistration() {
    await this.clickElement(this.registerButton);
    await this.page.waitForLoadState("networkidle",{timeout:30000});
  }

  async getSuccessMessage(): Promise<string> {
    return await this.getElementText(this.successMessage);
  }

  async isRegistrationSuccessful(): Promise<boolean> {
    return await this.isElementVisible(this.successMessage);
  }

  async getErrorMessage(): Promise<string> {
    return await this.getElementText(this.errorMessage);
  }
}