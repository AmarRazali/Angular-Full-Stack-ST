const { test, expect } = require('@playwright/test');

test('Basic Navigation and Element Interaction with Debugging and Log Output', async ({ browser }) => {
  // Create a new context with video recording enabled
  const context = await browser.newContext({
    recordVideo: {
      dir: './tests/videos/',
      size: { width: 1280, height: 720 }
    }
  });

  // Create a new page in the context
  const page = await context.newPage();

  // Enable verbose logging
  page.on('console', msg => console.log(`BROWSER LOG: ${msg.text()}`));

  // Navigate to the homepage
  console.log('Navigating to the homepage: http://localhost:3000');
  await page.goto('http://localhost:3000');
  console.log('Homepage loaded');
  await page.waitForTimeout(500); 

  // Verify the page title
  console.log('Verifying page title');
  await expect(page).toHaveTitle(/Angular Full Stack ST/);
  console.log('Page title verified');
  await page.waitForTimeout(500); 

  // Verify the page content
  console.log('Verifying page content');
  await expect(page.locator('h4.card-header')).toHaveText('PLAYWRIGHT TESTING TOOL DEMO: SOFTWARE TESTING(SSE5304)');
  console.log('Page content verified');
  await page.waitForTimeout(500); 

  // Navigate to the Cats page
  console.log('Navigating to the Cats page');
  await page.click('a[routerLink="/cats"]');
  console.log('Cats page loaded');
  await page.waitForTimeout(500); 

  // Verify Cats page content
  console.log('Verifying Cats page content');
  await expect(page.locator('h4.card-header:has-text("Current cats")')).toContainText('Current cats');
  console.log('Cats page content verified');
  await page.waitForTimeout(500); 

  // Navigate to the Login page
  console.log('Navigating to the Login page');
  await page.click('a[routerLink="/login"]');
  console.log('Login page loaded');
  await page.waitForTimeout(500); 

  // Verify Login page content
  console.log('Verifying Login page content');
  await expect(page.locator('h4.card-header')).toHaveText('Login');
  console.log('Login page content verified');
  await page.waitForTimeout(500); 

  // Navigate to the Register page
  console.log('Navigating to the Register page');
  await page.click('a[routerLink="/register"]');
  console.log('Register page loaded');
  await page.waitForTimeout(500); 

  // Verify Register page content
  console.log('Verifying Register page content');
  await expect(page.locator('h4.card-header')).toHaveText('Register');
  console.log('Register page content verified');
  await page.waitForTimeout(500); 

  // Close the context to ensure the video is saved
  await context.close();
});
