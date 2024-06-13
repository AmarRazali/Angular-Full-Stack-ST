const { test, expect } = require('@playwright/test');

test('Handling Authentication or Pop-ups with Debugging and Log Output', async ({ page }) => {
    // Enable verbose logging
    page.on('console', msg => console.log(`BROWSER LOG: ${msg.text()}`));

    // Navigate to the login page
    console.log('Navigating to the login page: http://localhost:3000/login');
    await page.goto('http://localhost:3000/login');
    console.log('Login page loaded');

    // Verify the page title
    console.log('Verifying page title');
    await expect(page).toHaveTitle(/Angular Full Stack ST/);
    console.log('Page title verified');

    // Verify the page content
    console.log('Verifying page content');
    await expect(page.locator('h4.card-header')).toHaveText('Login');
    console.log('Page content verified');
    await page.waitForTimeout(500);

    // Fill out the login form
    console.log('Filling out the login form');
    await page.fill('input[name="email"]', 'user@gmail.com'); // Replace with your email
    await page.fill('input[name="password"]', 'user123'); // Replace with your password
    console.log('Login form filled');
    await page.waitForTimeout(1500);

    // Submit the form
    console.log('Submitting the login form');
    await page.click('button[type="submit"]');
    console.log('Login form submitted');

    // Wait for navigation to complete
    console.log('Waiting for navigation to complete');
    await page.waitForNavigation();
    console.log('Navigation complete');

    // Assert successful navigation to the main page
    console.log('Asserting successful navigation to the main page');
    await expect(page).toHaveURL('http://localhost:3000/');
    console.log('Successfully navigated to the main page');
    await page.waitForTimeout(1000);

    // Click the logout link
    console.log('Clicking the logout link');
    await page.click('a.nav-link >> text=Logout');
    console.log('Logout link clicked');

    // Verify that the user is navigated to the main page
    console.log('Verifying that the user is navigated to the main page');
    await expect(page).toHaveURL('http://localhost:3000/');
    console.log('User successfully navigated to the main page after logout');
});
