// @ts-check
import { defineConfig, devices } from '@playwright/test';
import testsConfig from "./config/config.js";
import dotenv from 'dotenv'

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
dotenv.config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = defineConfig({
  // testDir: './tests',
  // testMatch: '/tests/**/*.spec.js',
  testMatch: /tests\/.*\/*.spec.js/,
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: 3,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
      [
          'html', {open: process.env.CI ? 'never' : 'on-failure'}
      ],
      [
        process.env.CI ? 'github' : 'list'
      ]
      // ["playwright-testrail-reporter"]
      // [
      //   'playwright-html'
      // ]
      // [
      //     'json', { outputFile: 'report.json'}
      // ],
      // [
      //   'junit', { outputFile: 'report.xml'}
      // ]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    headless: true,
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: testsConfig.baseUrl,
    httpCredentials: testsConfig.httpCredentials,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on',
    screenshot: 'only-on-failure',
    video: 'on',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'setup',
      use: { ...devices['Desktop Chrome'] },
      testMatch: /tests\/setup\/.*\/*.setup.js/
    },
    {
      name: 'chromium UI tests',
      use: { ...devices['Desktop Chrome'] },
      testMatch: /tests\/e2e\/.*\/*.spec.js/,
      dependencies: ['setup']
    },
    {
      name: 'API tests',
      testMatch: /tests\/api\/.*\/*.spec.js/,
      use: { ...devices['Desktop Chrome'] },
      dependencies: ['setup']
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    //
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
    //
    // /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

export default config;

