const { test, expect, devices } = require('@playwright/test');
const { faker } = require('@faker-js/faker');

test.describe('Cross-browser Testing on Form Submission and Validation with Debugging and Log Output', () => {
    const browsers = ['chromium', 'firefox', 'webkit']; // List of browsers to test

    browsers.forEach(browserType => {
        test(browserType, async ({ browser }) => {
            // Create a new context for the specific browser
            const context = await browser.newContext(devices['iPhone 6']);
            const page = await context.newPage();

            // Enable verbose logging
            page.on('console', msg => console.log(`BROWSER LOG (${browserType}): ${msg.text()}`));

            try {
                // Navigate to the cats page
                console.log(`Navigating to the cats page in ${browserType}`);
                await page.goto('http://localhost:3000/cats');
                console.log(`Cats page loaded in ${browserType}`);

                // Verify the page title
                console.log(`Verifying page title in ${browserType}`);
                await expect(page).toHaveTitle(/Angular Full Stack ST/);
                console.log(`Page title verified in ${browserType}`);

                // Verify the page content
                console.log(`Verifying page content in ${browserType}`);
                await expect(await page.locator('h4.card-header:has-text("Current cats")').innerText()).toContain('Current cats');
                console.log(`Page content verified in ${browserType}`);
                await page.waitForTimeout(500);

                // Generate dynamic data using faker
                const catName = faker.animal.cat(); // Generate a random cat name
                const catAge = faker.number.int({ min: 1, max: 15 }); // Generate a random age between 1 and 15
                const catWeight = faker.number.float({ min: 1, max: 10, multipleOf: 0.1 }); // Generate a random weight with 0.1 multiple

                console.log(`Generated cat data: ${catName}, Age: ${catAge}, Weight: ${catWeight} in ${browserType}`);

                // Fill out the form fields with dynamic data
                console.log(`Filling out the form fields in ${browserType}`);
                await page.fill('input[name="name"]', catName);
                await page.fill('input[name="age"]', catAge.toString()); // Ensure age is converted to string
                await page.fill('input[name="weight"]', catWeight.toString()); // Ensure weight is converted to string
                console.log(`Form fields filled in ${browserType}`);
                await page.waitForTimeout(1000);

                // Submit the form
                console.log(`Submitting the form in ${browserType}`);
                await page.click('app-add-cat-form button[type="submit"]');
                console.log(`Form submitted in ${browserType}`);

                // Wait for the form submission to complete and the new cat to appear in the list
                console.log(`Waiting for the form submission to complete in ${browserType}`);
                await page.waitForSelector('tbody > tr:has(td:has-text("' + catName + '"))');
                console.log(`Form submission completed and new cat appeared in the list in ${browserType}`);

                // Validate that the new cat appears in the list with correct data
                console.log(`Validating the new cat data in ${browserType}`);
                const newCatRow = page.locator('tbody > tr:has(td:has-text("' + catName + '"))');
                await expect(newCatRow).toContainText(catName);
                await expect(newCatRow).toContainText(catAge.toString());
                await expect(newCatRow).toContainText(catWeight.toString());
                console.log(`New cat data validated in ${browserType}`);

                await page.waitForTimeout(1000);
            } finally {
                // Close the context after each test
                console.log(`Closing the context in ${browserType}`);
                await context.close();
            }
        });
    });
});
