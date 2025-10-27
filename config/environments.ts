import * as dotenv from 'dotenv';
dotenv.config();

export interface Environment {
  baseURL: string;
  timeout: number;
  retries: number;
}

export const environments: Record<string, Environment> = {
  UAT: {
    baseURL: 'https://parabank.parasoft.com',
    timeout: 30000,
    retries: 2
  },
  QA: {

    baseURL: 'https://parabank.parasoft.com',
    timeout: 30000,
    retries: 1
  }
};
export function getEnvironment(): Environment {
  const env = process.env.TEST_ENV || 'QA';
  
  const environment = environments[env] || environments.QA;
  
  // Allow BASE_URL override from .env file
  if (process.env.BASE_URL) {
    environment.baseURL = process.env.BASE_URL;
  }
  
  return environment;
}