import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class AccountsPage extends BasePage {
  private readonly accountsOverviewLink: Locator;
  private readonly transferFundsLink: Locator;
  private readonly accountsTable: Locator;
  private readonly welcomeMessage: Locator;
  private readonly logoutLink: Locator;

  constructor(page: Page) {
    super(page);
    this.accountsOverviewLink = page.locator('a:has-text("Accounts Overview")');
    this.transferFundsLink = page.locator('a:has-text("Transfer Funds")');
    this.accountsTable = page.locator('#accountTable');
    this.welcomeMessage = page.locator('.smallText');
    this.logoutLink = page.locator('a:has-text("Log Out")');
  }

  async isLoggedIn(): Promise<boolean> {
    return await this.isElementVisible(this.welcomeMessage);
  }

  async getWelcomeMessage(): Promise<string> {
    return await this.getElementText(this.welcomeMessage);
  }

  async goToAccountsOverview() {
    await this.clickElement(this.accountsOverviewLink);
  }

  async goToTransferFunds() {
    await this.clickElement(this.transferFundsLink);
  }

  async getAccountNumbers(): Promise<string[]> {
    const rows = await this.accountsTable.locator('tbody tr').all();
    const accountNumbers: string[] = [];
    
    for (const row of rows) {
      const accountLink = row.locator('td:first-child a');
      if (await accountLink.isVisible()) {
        const accountNumber = await accountLink.textContent();
        if (accountNumber) accountNumbers.push(accountNumber);
      }
    }
    
    return accountNumbers;
  }

  async logout() {
    await this.clickElement(this.logoutLink);
  }
}