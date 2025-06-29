
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests/e2e',
  
  timeout: 60000,
  
  retries: 1,
  
  reporter: [
    ['list'],
    ['html', { outputFolder: './src/tests/e2e/reports' }]
  ],
  
  use: {
    baseURL: 'http://localhost:5173',
    
    video: 'retain-on-failure',
    
    screenshot: 'only-on-failure',
    
    trace: 'retain-on-failure',
  },

  projects: [
    {
      name: 'Chromium',
      use: { 
        browserName: 'chromium',
        viewport: { width: 1920, height: 1080 },
        contextOptions: {
          permissions: ['clipboard-read', 'clipboard-write']
        }
      },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 120000 
  },
});
