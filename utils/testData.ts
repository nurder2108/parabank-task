import * as dotenv from 'dotenv';
dotenv.config();

export class TestDataGenerator {
  static generateRandomString(length: number): string {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  static generateUsername(): string {
    return `user_${this.generateRandomString(8)}`;
  }

  static generatePassword(): string {
    return `Pass${this.generateRandomString(6)}!`;
  }

  static generateUserData() {
    return {
      firstName: 'John',
      lastName: 'Doe',
      address: '123 Main Street',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62701',
      phone: '555-1234',
      ssn: '123-45-6789',
      username: this.generateUsername(),
      password: this.generatePassword()
    };
  }
}
export const TEST_USERS = {
  valid: {
    username: process.env.TEST_USERNAME || 'john',
    password: process.env.TEST_PASSWORD || 'demo'
  },
  invalid: {
    username: 'invaliduser123',
    password: 'wrongpassword456'
  }
};