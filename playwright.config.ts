import { defineConfig } from '@playwright/test';
import { Environment } from './src/config/Environment';
import { Config } from './src/config/Config';

Environment.load();
//console.log(`BASE_URL from Config: ${Config.getBaseUrl()}`);

export default defineConfig({

  testDir: './src/tests',

  timeout: Config.getTimeout(),

  fullyParallel: true,

  reporter: [
    ['html'],
    ['list'],
    ['./src/utils/ApiPerformanceReporter.ts']
  ],

  use: {
    baseURL: Config.getBaseUrl(),
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }

});