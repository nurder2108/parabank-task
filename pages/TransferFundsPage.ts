import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class TransferFundsPage extends BasePage {
  private readonly amountInput: Locator;
  private readonly fromAccountSelect: Locator;
  private readonly toAccountSelect: Locator;
  private readonly transferButton: Locator;
  private readonly successMessage: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.amountInput = page.locator('input[id="amount"]');
    this.fromAccountSelect = page.locator('select[id="fromAccountId"]');
    this.toAccountSelect = page.locator('select[id="toAccountId"]');
    this.transferButton = page.locator('input[value="Transfer"]');
    this.successMessage = page.locator('#showResult');
    this.errorMessage = page.locator('.error');
  }

  async transferFunds(amount: string, fromAccountIndex: number, toAccountIndex: number) {
  await this.waitForAccountsToLoad();  // Wait for dropdowns to load
  await this.fillInput(this.amountInput, amount);
  await this.fromAccountSelect.selectOption({ index: 0});  // Select by index
  await this.toAccountSelect.selectOption({ index: 0 });
  await this.clickElement(this.transferButton);
  await this.page.waitForLoadState('networkidle', { timeout: 30000 });
}
// Gracefully handle if message doesn't appear
  async isTransferSuccessful(): Promise<boolean> {
  try {
    await this.successMessage.waitFor({ state: 'visible', timeout: 5000 });
    return await this.isElementVisible(this.successMessage);
  } catch {
    return false;  
  }
}

  async getSuccessMessage(): Promise<string> {
    return await this.getElementText(this.successMessage);
  }

  async getErrorMessage(): Promise<string> {
    return await this.getElementText(this.errorMessage.first());
  }

  async waitForAccountsToLoad(){
await this.fromAccountSelect.waitFor({state:'visible',timeout:10000});
await this.page.waitForTimeout(1000);
  }
}